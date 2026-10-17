<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as stages } from './course.data'

// "Giai đoạn 2 — C# Professional: OOP, ..." → nhãn "Giai đoạn 2", tên "C# Professional"
const head = (title: string) => {
  const [label, rest = ''] = title.split(/\s+—\s+/)
  return { label, name: rest.split(':')[0] }
}
// "Module 4 - C# Core" → số "04", tên "C# Core"
const mod = (title: string) => {
  const m = title.match(/^Module (\d+) - (.+)$/)
  return m ? { no: m[1].padStart(2, '0'), name: m[2] } : { no: '', name: title }
}

const cards = stages.map((s) => ({ ...s, ...head(s.title) }))
const projects = stages.flatMap((s, i) => s.projects.map((p) => ({ ...p, stage: i + 1 })))
const lessonCount = stages.reduce((n, s) => n + s.modules.reduce((k, m) => k + m.lessons.length, 0), 0)
// Module 0 là phần chuẩn bị môi trường, không tính vào 19 module của lộ trình
const moduleCount = stages.reduce((n, s) => n + s.modules.filter((m) => mod(m.title).no !== '00').length, 0)
</script>

<template>
  <div class="home-content">
    <section class="section">
      <h2>Lộ trình 5 giai đoạn</h2>
      <p class="lead">
        {{ moduleCount }} module, {{ lessonCount }} bài học và {{ projects.length }} dự án, mở đầu bằng Module 0 để chuẩn bị môi trường.
        Giai đoạn 1 tới 4 là phần chính, giai đoạn 5 là phần nâng cao không bắt buộc. Xem
        <a :href="withBase('/lessons/roadmap-dotnet-backend-zero-to-senior')">lộ trình tổng quan</a>
        để biết vì sao các module được xếp như vậy.
      </p>
      <div class="stages">
        <div v-for="s in cards" :key="s.link" class="stage" :class="{ advanced: s.advanced }">
          <a class="stage-head" :href="withBase(s.link)">
            <span class="badge">{{ s.label }}</span>
            <span v-if="s.advanced" class="tag">Nâng cao · tùy chọn</span>
            <h3>{{ s.name }}</h3>
          </a>
          <ul>
            <li v-for="m in s.modules" :key="m.link">
              <a :href="withBase(m.link)" :title="m.summary">
                <span class="no">{{ mod(m.title).no }}</span>
                <span class="name">{{ mod(m.title).name }}</span>
                <span class="count">{{ m.lessons.length }} bài</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Một bài toán CRM lớn dần qua 4 dự án</h2>
      <p class="lead">
        Thay vì học rời rạc từng công cụ, cả khóa xoay quanh một hệ CRM quản lý khách hàng: bắt đầu từ
        <code>List</code> trong bộ nhớ, kết thúc bằng hệ phân tán nhiều bounded context. Mỗi giai đoạn khép lại bằng một dự án.
      </p>
      <ol class="projects">
        <li v-for="p in projects" :key="p.link">
          <span class="step">Giai đoạn {{ p.stage }}</span>
          <a :href="withBase(p.link)">{{ p.title }}</a>
        </li>
      </ol>
    </section>

    <section class="section cta">
      <h2>Bắt đầu từ con số không</h2>
      <p class="lead">
        Chưa từng viết C#? Module 0 hướng dẫn cài .NET, chạy chương trình đầu tiên và dùng debugger. Đã làm backend rồi? Đọc lộ trình,
        chọn giai đoạn hợp trình độ và làm bài đánh giá cuối mỗi module để biết mình còn hổng ở đâu.
      </p>
      <a class="button" :href="withBase(stages[0].modules[0].link)">Vào Module 0</a>
    </section>
  </div>
</template>

<style scoped>
.home-content {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 48px;
}
.section { margin-top: 80px; }
/* Trang home vẫn nằm trong .vp-doc: bỏ đường kẻ và khoảng cách mặc định của tiêu đề, danh sách */
.home-content h2 {
  border-top: none;
  padding-top: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 12px;
}
h3 { font-size: 17px; font-weight: 600; margin: 0; line-height: 1.4; color: var(--vp-c-text-1); }
.lead { color: var(--vp-c-text-2); max-width: 720px; margin: 0 0 28px; line-height: 1.7; }
a { color: var(--vp-c-brand-1); font-weight: 500; text-decoration: none; }
a:hover { text-decoration: underline; }
.home-content li { margin: 0; }

.stages {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.stage {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px 16px 12px;
  background: var(--vp-c-bg-soft);
}
.stage-head {
  display: block;
  padding: 0 4px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 8px;
}
.stage-head:hover { text-decoration: none; }
.stage-head:hover h3 { color: var(--vp-c-brand-1); }
.badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.tag {
  display: inline-block;
  margin-left: 8px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
}
/* Giai đoạn nâng cao: viền nét đứt để tách khỏi phần chính */
.stage.advanced { border-style: dashed; background: transparent; }
.stage ul { list-style: none; padding: 0; margin: 0; }
.stage li a {
  display: flex;
  gap: 10px;
  align-items: baseline;
  padding: 6px 4px;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
}
.stage li a:hover { background: var(--vp-c-default-soft); text-decoration: none; color: var(--vp-c-brand-1); }
.no, .count {
  flex: none;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.name { flex: 1; }

.projects {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  counter-reset: p;
}
.projects li {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}
.step { display: block; font-size: 12px; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 6px; }
.projects a { font-size: 15px; font-weight: 600; line-height: 1.5; }

.cta {
  border-radius: 16px;
  padding: 48px 40px;
  background: var(--vp-c-brand-soft);
  text-align: center;
}
.cta .lead { margin: 0 auto 24px; }
.button {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 20px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  font-weight: 600;
}
.button:hover { background: var(--vp-button-brand-hover-bg); text-decoration: none; }

@media (max-width: 960px) {
  .stages, .projects { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .home-content { padding: 0 16px 64px; }
  .section { margin-top: 56px; }
  .home-content h2 { font-size: 24px; }
  .stages, .projects { grid-template-columns: 1fr; }
  .cta { padding: 32px 20px; }
}
</style>
