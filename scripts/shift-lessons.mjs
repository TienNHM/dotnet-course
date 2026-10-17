// Dời số các bài từ a.from trở đi lên 1 để chèn bài mới vào vị trí a.from:
// đổi tên file (git mv), H1 và tiêu đề mục trong bài bị dời, tên file trong mọi link,
// nhãn số trong link tới bài bị dời và chữ "mục a.b.n".
// Chạy xong thì dựng lại mục lục module và dòng "Bài trước / Bài tiếp theo", rồi `npm run check`.
//
//   node scripts/shift-lessons.mjs lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals 10
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const [dir, fromArg] = process.argv.slice(2)
const from = Number(fromArg)
if (!dir || !from) throw new Error('Cách dùng: node scripts/shift-lessons.mjs <thư mục module> <số bài bắt đầu dời>')

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])

// Bài bị dời: a.b với b >= from
const moved = fs.readdirSync(dir)
  .map((f) => ({ f, m: f.match(/^(\d+)\.(\d+)-(.+)$/) }))
  .filter((x) => x.m && +x.m[2] >= from)
  .map(({ f, m }) => ({ oldName: f, newName: `${m[1]}.${+m[2] + 1}-${m[3]}`, a: +m[1], b: +m[2] }))
if (!moved.length) throw new Error('Không có bài nào để dời')
const a = moved[0].a
const byOld = new Map(moved.map((x) => [x.oldName, x]))
const shiftNo = (b) => (b >= from && moved.some((x) => x.b === b) ? b + 1 : b)

// 1. Đổi tên, từ số lớn xuống để không đè nhau
for (const x of [...moved].sort((p, q) => q.b - p.b))
  execFileSync('git', ['mv', path.join(dir, x.oldName), path.join(dir, x.newName)])

// Thay toàn bộ trong một lượt, tránh đổi dây chuyền 8.10 → 8.11 → 8.12
// (?<![\w.]) để "8.10-advanced-notes.md" không khớp vào giữa "18.10-advanced-notes.md"
const nameRe = new RegExp(`(?<![\\w.])(?:${moved.map((x) => x.oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
const files = [...walk('lessons'), ...walk('review'), 'README.md'].filter((f) => f.endsWith('.md'))
let changedFiles = 0
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const inMoved = path.resolve(path.dirname(f)) === path.resolve(dir) && /^(\d+)\.(\d+)-/.test(path.basename(f))
    && moved.some((x) => x.newName === path.basename(f))
  let out = src
    // tên file trong link và trong chữ
    .replace(nameRe, (n) => byOld.get(n).newName)
    // nhãn số trong link tới bài bị dời: [bài 8.10](8.11-advanced-notes.md) → [bài 8.11](...)
    .replace(/\[([^\]]*)\]\(([^)\s]*?(\d+)\.(\d+)-[^)\s]*\.md)(#[^)]*)?\)/g, (m, label, href, ta, tb, hash = '') => {
      if (+ta !== a || !moved.some((x) => x.newName === path.basename(href))) return m
      const nl = label.replace(/(?<![\d.])(\d+)\.(\d+)(?![\d.]*\d)/g, (n, x, y) => (+x === a && +y === +tb - 1 ? `${a}.${tb}` : n))
      return `[${nl}](${href}${hash})`
    })
    // "mục a.b.n" trỏ tới bài bị dời
    .replace(/([Mm]ục|[Pp]hần|§) ?(\d+)\.(\d+)\.(\d+)\b/g, (m, w, x, y, n) =>
      +x === a && shiftNo(+y) !== +y ? m.replace(`${x}.${y}.${n}`, `${x}.${+y + 1}.${n}`) : m)
  if (inMoved) {
    const nb = +path.basename(f).match(/^\d+\.(\d+)-/)[1]
    out = out
      .replace(/^(# )(\d+)\.(\d+)( - )/m, (m, h, x, y, s) => (+x === a ? `${h}${a}.${nb}${s}` : m))
      .replace(/^(#{2,4} )(\d+)\.(\d+)\.(\d+)/gm, (m, h, x, y, n) => (+x === a && +y === nb - 1 ? `${h}${a}.${nb}.${n}` : m))
  }
  if (out !== src) { fs.writeFileSync(f, out); changedFiles++ }
}
console.log(`Đã dời ${moved.length} bài, sửa ${changedFiles} file:`)
for (const x of moved) console.log(`  ${x.oldName} → ${x.newName}`)
