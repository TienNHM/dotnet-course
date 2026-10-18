// Kiểm tra tĩnh nội dung bài học, chạy trên mỗi PR (xem .github/workflows/check.yml):
//   - link tương đối trỏ tới file có thật
//   - bài a.b chỉ có tiêu đề mục "### a.b.n"
//   - nhãn số trong link tới bài khác khớp với tên file đích ("[bài 4.2](4.2-...md)")
//   - không có "Task<T>" trần ngoài code (Vue hiểu là thẻ HTML, website không build được)
//   - bản SQL Server (x.sqlserver.md) có bản chính x.md, cả hai có dòng chuyển phiên bản trỏ nhau
//
//   node scripts/check-lessons.mjs
import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'lessons'
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])
const lessonNo = (f) => path.basename(f).match(/^(\d+)\.(\d+)-/)?.slice(1).map(Number)

const htmlTags = new Set(['details', 'summary', 'strong', 'em', 'b', 'i', 'br', 'img', 'a', 'p', 'div', 'span',
  'sup', 'sub', 'small', 'kbd', 'code', 'pre', 'picture', 'source', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'hr'])
const errors = []
const files = walk(ROOT).filter((f) => f.endsWith('.md'))

for (const f of files) {
  const no = lessonNo(f)
  let fence = null
  fs.readFileSync(f, 'utf8').split(/\r?\n/).forEach((line, i) => {
    const at = `${f.replace(/\\/g, '/')}:${i + 1}`
    const fm = line.match(/^\s*(`{3,}|~{3,})/)
    if (fm) {
      if (!fence) fence = fm[1]
      else if (line.trim().replace(/[`~]/g, '') === '' && line.trim().length >= fence.length) fence = null
      return
    }
    if (fence) return

    const h = line.match(/^#{2,4} (\d+)\.(\d+)\.\d+/)
    if (no && h && (+h[1] !== no[0] || +h[2] !== no[1]))
      errors.push(`${at}: tiêu đề mục ${h[1]}.${h[2]}.x nằm trong bài ${no.join('.')}`)

    const text = line.replace(/`[^`]*`/g, '')
    // VitePress dịch markdown qua Vue: "Task<T>" ngoài code bị hiểu là thẻ HTML chưa đóng và làm hỏng build
    for (const m of text.matchAll(/<\/?([A-Za-z][\w.-]*)/g))
      if (!htmlTags.has(m[1].toLowerCase()) && !/^https?$/i.test(m[1]))
        errors.push(`${at}: "<${m[1]}" ngoài code sẽ làm hỏng build website, đặt trong \`...\``)
    for (const m of text.matchAll(/\[([^\]]*)\]\(([^)\s]+)\)/g)) {
      const [, label, href] = m
      if (/^([a-z]+:|#)/i.test(href)) continue
      const target = path.join(path.dirname(f), decodeURI(href.split('#')[0]))
      if (!fs.existsSync(target)) { errors.push(`${at}: link hỏng ${href}`); continue }
      const tno = lessonNo(target)
      if (!tno || !target.endsWith('.md')) continue
      for (const n of label.matchAll(/(?<![\d.])(\d+)\.(\d+)(?![\d.]*\d)/g))
        if (+n[1] === tno[0] && +n[2] !== tno[1])
          errors.push(`${at}: nhãn "${n[0]}" nhưng link tới bài ${tno.join('.')}`)
    }
  })
  if (fence) errors.push(`${f}: code block chưa đóng`)
}

// Hai phiên bản database: xem CONTRIBUTING.md, mục "Hai phiên bản database"
const banner = (f) => fs.readFileSync(f, 'utf8').normalize('NFC').match(/^> \*\*Phiên bản database:\*\* (.+)$/m)?.[1]
for (const f of files.filter((x) => x.endsWith('.sqlserver.md'))) {
  const main = f.replace(/\.sqlserver\.md$/, '.md')
  const mainName = path.basename(main), variantName = path.basename(f)
  if (!fs.existsSync(main)) { errors.push(`${f}: không có bản chính ${mainName}`); continue }
  if (banner(main) !== `PostgreSQL · [SQL Server](${variantName})`)
    errors.push(`${main}: thiếu hoặc sai dòng "> **Phiên bản database:** PostgreSQL · [SQL Server](${variantName})"`)
  if (banner(f) !== `[PostgreSQL](${mainName}) · SQL Server`)
    errors.push(`${f}: thiếu hoặc sai dòng "> **Phiên bản database:** [PostgreSQL](${mainName}) · SQL Server"`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  console.error(`\n${errors.length} lỗi trong ${files.length} file`)
  process.exit(1)
}
console.log(`OK: ${files.length} file`)
