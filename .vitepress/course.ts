import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

// Cấu trúc khóa học đọc thẳng từ thư mục lessons/: giai đoạn → module → bài.
// Tiêu đề lấy từ dòng "# ..." đầu tiên, tóm tắt từ dòng "> **Tóm tắt:** ...".

export const lessonsDir = resolve(__dirname, '../lessons')

export interface Page {
  title: string
  summary: string
  link: string
}

export interface Module extends Page {
  lessons: Page[]
}

export interface Stage extends Page {
  modules: Module[]
  projects: Page[]
}

function page(rel: string): Page {
  const src = readFileSync(join(lessonsDir, rel), 'utf8')
  return {
    title: src.match(/^# (.+)$/m)?.[1] ?? rel,
    summary: (src.match(/^> \*\*Tóm tắt:\*\* (.+)$/m)?.[1] ?? '').replace(/[`*]/g, ''),
    link: `/lessons/${rel.replace(/\.md$/, '')}`,
  }
}

// "1.10-loops.md" xếp sau "1.9-...": so theo số, không theo chữ
const lessonNo = (f: string) => (f.match(/^(\d+)\.(\d+)-/) ?? []).slice(1).map(Number)
const byLessonNo = (a: string, b: string) => {
  const [x, y] = [lessonNo(a), lessonNo(b)]
  return x[0] - y[0] || x[1] - y[1]
}

export function courseTree(): Stage[] {
  return readdirSync(lessonsDir)
    .filter((d) => d.startsWith('stage-'))
    .sort()
    .map((stage) => {
      const entries = readdirSync(join(lessonsDir, stage))
      return {
        ...page(`${stage}/README.md`),
        modules: entries
          .filter((d) => d.startsWith('module-'))
          .sort()
          .map((mod) => ({
            ...page(`${stage}/${mod}/README.md`),
            lessons: readdirSync(join(lessonsDir, stage, mod))
              .filter((f) => /^\d+\.\d+-.*\.md$/.test(f))
              .sort(byLessonNo)
              .map((f) => page(`${stage}/${mod}/${f}`)),
          })),
        projects: entries.filter((f) => f.endsWith('.md') && f !== 'README.md').map((f) => page(`${stage}/${f}`)),
      }
    })
}

export const roadmap = () => page('roadmap-dotnet-backend-zero-to-senior.md')
export const glossary = () => (existsSync(join(lessonsDir, 'glossary.md')) ? page('glossary.md') : null)
