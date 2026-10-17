import { cpSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { type DefaultTheme, defineConfigWithTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { courseTree, glossary, roadmap } from './course'

const root = resolve(__dirname, '..')
// Workflow truyền REPO_URL của repo đang build, nên bản fork tự trỏ về chính nó
const repo = process.env.REPO_URL || 'https://github.com/TienNHM/dotnet-course'

function sidebar(): DefaultTheme.SidebarItem[] {
  const start = [roadmap(), glossary()].filter((p) => p !== null)
  return [
    { text: 'Bắt đầu', items: start.map((p) => ({ text: p.title, link: p.link })) },
    ...courseTree().map((stage, i) => ({
      // "Giai đoạn 1 — Foundation: tư duy lập trình, ..." → "Giai đoạn 1 — Foundation"
      text: stage.title.split(':')[0] + (stage.advanced ? ' (nâng cao)' : ''),
      collapsed: i > 0,
      items: [
        { text: 'Tổng quan giai đoạn', link: stage.link },
        ...stage.modules.map((m) => ({
          text: m.title,
          collapsed: true,
          link: m.link,
          items: m.lessons.map((l) => ({ text: l.title, link: l.link })),
        })),
        ...stage.projects.map((p) => ({ text: `🎯 ${p.title}`, link: p.link })),
      ],
    })),
  ]
}

export default withMermaid(
  defineConfigWithTheme<DefaultTheme.Config & { repoUrl: string }>({
    lang: 'vi-VN',
    title: '.NET Backend: Zero → Senior',
    description:
      'Lộ trình học .NET backend bằng tiếng Việt: 5 giai đoạn, 19 module và 4 dự án, từ tư duy lập trình tới Clean Architecture, hệ phân tán và microservices.',
    // GitHub Pages phục vụ ở /dotnet-course/; chạy local thì để BASE trống
    base: process.env.BASE ?? '/',
    cleanUrls: true,
    lastUpdated: true,
    // README.md ở gốc là mục lục cho GitHub; website dùng index.md
    srcExclude: ['README.md', 'CONTRIBUTING.md', 'review/**', 'diagrams/**', 'scripts/**', 'node_modules/**'],
    // Link "File gốc" của sơ đồ trỏ sang diagrams/*.html, được chép sang lúc build (xem buildEnd)
    ignoreDeadLinks: [/^https?:\/\/localhost/, /\/diagrams\//],
    head: [['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🟣</text></svg>' }]],

    // Thẻ description của mỗi bài lấy từ dòng tóm tắt
    transformPageData(pageData, { siteConfig }) {
      if (pageData.frontmatter.description) return
      const src = readFileSync(join(siteConfig.srcDir, pageData.relativePath), 'utf8')
      const summary = src.match(/^> \*\*Tóm tắt:\*\* (.+)$/m)?.[1]
      if (summary) pageData.description = summary.replace(/[`*]/g, '')
    },

    markdown: {
      lineNumbers: false,
      // Tắt cú pháp {...} gắn thuộc tính: nhiều đoạn văn và bảng kết thúc bằng {...} của C#/JSON
      attrs: { disable: true },
      config(md) {
        // Inline code như `${{ github.sha }}` hay `{3}`: không để Vue hiểu là biểu thức template
        const codeInline = md.renderer.rules.code_inline!
        md.renderer.rules.code_inline = (tokens, idx, ...rest) => {
          tokens[idx].attrSet('v-pre', '')
          return codeInline(tokens, idx, ...rest)
        }

        md.core.ruler.push('repo_links', (state) => {
          state.tokens.forEach((block, i) => {
            // Danh sách rà soát "- [ ] ..." (task list của GitHub): markdown-it không tự hiển thị ô đánh dấu
            const box = block.type === 'inline' && state.tokens[i - 2]?.type === 'list_item_open'
              && block.children?.[0]?.content.match(/^\[( |x)\] /)
            if (box) {
              const first = block.children![0]
              first.content = first.content.slice(4)
              const input = new state.Token('html_inline', '', 0)
              input.content = `<input type="checkbox" disabled${box[1] === 'x' ? ' checked' : ''}> `
              block.children!.unshift(input)
            }
          })
          for (const block of state.tokens) {
            for (const tok of block.children ?? []) {
              // File HTML gốc của sơ đồ: mở tab mới để router của VitePress không chặn
              if (tok.type === 'link_open' && (tok.attrGet('href') ?? '').includes('/diagrams/')) {
                tok.attrSet('target', '_blank')
              }
              // Ảnh "x.png#gh-light-mode-only" / "#gh-dark-mode-only" (quy ước của GitHub):
              // bỏ fragment để Vite xử lý được ảnh, gắn class để CSS ẩn hiện theo giao diện
              if (tok.type === 'image') {
                const src = tok.attrGet('src') ?? ''
                const mode = src.match(/#gh-(light|dark)-mode-only$/)?.[1]
                if (!mode) continue
                tok.attrSet('src', src.replace(/#gh-(light|dark)-mode-only$/, ''))
                tok.attrJoin('class', `only-${mode}`)
              }
            }
          }
        })
      },
    },

    themeConfig: {
      // Dùng ở trang chủ (lệnh git clone)
      repoUrl: repo,
      nav: [
        { text: 'Lộ trình', link: '/lessons/roadmap-dotnet-backend-zero-to-senior' },
        { text: 'Thuật ngữ', link: '/lessons/glossary' },
        { text: 'Dự án cuối khóa', link: '/lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp' },
      ],
      sidebar: { '/lessons/': sidebar() },
      socialLinks: [{ icon: 'github', link: repo }],
      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' },
            modal: {
              noResultsText: 'Không tìm thấy kết quả cho',
              resetButtonTitle: 'Xóa',
              footer: { selectText: 'chọn', navigateText: 'di chuyển', closeText: 'đóng' },
            },
          },
        },
      },
      editLink: { pattern: `${repo}/edit/master/:path`, text: 'Sửa trang này trên GitHub' },
      outline: { level: [2, 3], label: 'Trong bài này' },
      docFooter: { prev: 'Bài trước', next: 'Bài sau' },
      lastUpdated: { text: 'Cập nhật lần cuối' },
      returnToTopLabel: 'Lên đầu trang',
      sidebarMenuLabel: 'Danh sách bài',
      darkModeSwitchLabel: 'Giao diện',
      lightModeSwitchTitle: 'Chuyển sang nền sáng',
      darkModeSwitchTitle: 'Chuyển sang nền tối',
      notFound: { title: 'Không tìm thấy trang', quote: 'Có thể bài đã đổi tên.', linkText: 'Về trang chủ' },
      footer: {
        message: 'Phát hành theo giấy phép MIT.',
        copyright: 'Nội dung gốc của TienNHM',
      },
    },

    buildEnd(site) {
      cpSync(join(root, 'diagrams'), join(site.outDir, 'diagrams'), { recursive: true })
    },

    mermaid: {},
  }),
)
