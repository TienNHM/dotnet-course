# Quy ước viết và sửa bài học

Tài liệu cho người viết, sửa bài. Người học đọc [README.md](README.md).

Người học là thành viên CLB: sinh viên IT năm 1 tới 3, có bạn chưa từng viết C#. Mỗi bài phải **dễ hiểu, đầy đủ, chính xác và thực tế** với đối tượng này.

## Phiên bản chuẩn

| Thành phần | Phiên bản |
|---|---|
| .NET SDK, ASP.NET Core, EF Core | 10 (LTS, hỗ trợ tới 11/2028) |
| C# | 14 |
| Database mặc định | PostgreSQL 16, provider `Npgsql.EntityFrameworkCore.PostgreSQL` |
| Database bản phụ | SQL Server 2022, provider `Microsoft.EntityFrameworkCore.SqlServer` |
| Image Docker | `mcr.microsoft.com/dotnet/sdk:10.0`, `mcr.microsoft.com/dotnet/aspnet:10.0` (Ubuntu 24.04), bản chiseled `10.0-noble-chiseled` |
| Test | xUnit, `Assert` có sẵn của xUnit |
| Tài liệu API | `Microsoft.AspNetCore.OpenApi` (có sẵn trong template), giao diện Scalar |

Nhắc tới phiên bản cũ chỉ khi so sánh hoặc cảnh báo ("từ .NET 9 template không còn Swagger UI"). Số liệu đo được (thời gian, kích thước image, bộ nhớ) phải đo lại khi đổi phiên bản, không sửa tay con số.

**Thư viện có giấy phép thương mại.** FluentAssertions từ v8, MediatR từ v13 và AutoMapper từ v15 không còn miễn phí cho mọi trường hợp. Bài học không dùng chúng làm mặc định. Khi nhắc tới thì ghi rõ giấy phép và nêu lựa chọn thay thế (assert của xUnit hoặc Shouldly, tự viết mediator đơn giản, map tay).

## Khuôn một bài học

```markdown
# a.b - Tiêu đề

> **Tóm tắt:** 2 tới 5 câu: bài giải quyết vấn đề gì, điều quan trọng nhất cần nhớ.

## Mục tiêu bài học
Sau bài này bạn có thể: (3 tới 6 gạch đầu dòng, động từ đo được)

**Cần biết trước:** link tới các bài tiên quyết.

## Nội dung bài học
### a.b.1 — ...
### a.b.2 — ...
### a.b.n — Lỗi thường gặp

**Danh sách rà soát ...**
- [ ] ...

## Bài tập áp dụng
#### Bài 1 — ...
**Tiêu chí hoàn thành:** ...
<details>
<summary><strong>Gợi ý và lời giải — Bài 1</strong></summary>
...
</details>

## Tự kiểm tra
<details>
<summary>Câu hỏi?</summary>
Đáp án.
</details>

## Kết luận
## Tham khảo
## Điều hướng
- **Bài trước:** [a.(b-1) — Tiêu đề](...)
- **Bài tiếp theo:** [a.(b+1) — Tiêu đề](...)
- **Về module:** [Trang mục lục](README.md)
```

- Bài `a.b` chỉ có mục đánh số `a.b.n`. Nhãn trong link khớp với bài đích: `[bài 4.2](4.2-encapsulation.md)`.
- **Không dùng kiến thức chưa dạy.** Bắt buộc phải dùng thì giải thích một câu tại chỗ và link tới bài sẽ dạy kỹ.
- **Đáp án luôn nằm trong `<details>`**, kể cả quiz ở bài review-and-assessment. Lab có lời giải hoặc tiêu chí chấm kiểm tra được.
- **Không viết đoạn văn mẫu dùng chung cho mọi bài.** Đoạn nào thay tên bài vẫn đúng thì bỏ đi.
- Tiếng Việt tự nhiên. Thuật ngữ tiếng Anh phổ biến (middleware, endpoint, migration) giữ nguyên, giải thích ở lần đầu xuất hiện trong bài.

## Code trong bài

- **Phải chạy được** trên .NET 10. Output, thông báo lỗi và số đo trong bài là kết quả chạy thật, không viết theo trí nhớ.
- Ví dụ một file dùng top-level statements: mọi khai báo `class`, `record`, `enum` đặt **sau** code chạy (đặt trước là lỗi CS8803).
- Ví dụ gắn với bài toán CRM xuyên suốt: `Customer`, `Lead`, `Deal`, `CrmDbContext`.
- Code minh họa sai thì ghi rõ ngay trên khối code (`// SAI: ...`) và có bản sửa đi kèm.

## Hai phiên bản database

PostgreSQL là mặc định. Chỉ bài **phụ thuộc database** mới có bản SQL Server, theo một trong hai cách.

**Bài phụ thuộc nặng** (phần lớn nội dung là SQL, execution plan, khóa, isolation level, hành vi riêng của database: Module 12, một số bài Module 13, 17, 19 và dự án): tạo file anh em `.sqlserver.md` cạnh bài chính.

```text
12.4-indexing.md             ← PostgreSQL
12.4-indexing.sqlserver.md   ← SQL Server
```

Ngay dưới H1 của mỗi bản có dòng chuyển phiên bản, đúng định dạng sau:

```markdown
# 12.4 - Indexing

> **Phiên bản database:** PostgreSQL · [SQL Server](12.4-indexing.sqlserver.md)
```

```markdown
# 12.4 - Indexing (SQL Server)

> **Phiên bản database:** [PostgreSQL](12.4-indexing.md) · SQL Server
```

Bản SQL Server không xuất hiện trên sidebar. Dòng điều hướng của nó trỏ tới bản SQL Server của bài kề bên nếu có, không thì tới bản chính. Phần không phụ thuộc database (mục tiêu, khái niệm chung) giữ giống nhau giữa hai bản.

**Bài chỉ khác vài dòng** (chuỗi kết nối, `UseNpgsql` so với `UseSqlServer`, một câu SQL): viết bản PostgreSQL trong bài, đặt bản SQL Server ngay bên dưới:

````markdown
```csharp
options.UseNpgsql(builder.Configuration.GetConnectionString("Crm"));
```

<details>
<summary>SQL Server</summary>

```csharp
options.UseSqlServer(builder.Configuration.GetConnectionString("Crm"));
```

</details>
````

**Quy ước chung:**

- Database chạy bằng [docker-compose.yml](docker-compose.yml) ở gốc repo. Chuỗi kết nối chuẩn ghi ở đầu file đó.
- Tên bảng và cột theo mặc định của EF Core (`Customers`, `CustomerId`). Trong SQL viết tay cho PostgreSQL phải đặt trong nháy kép: `SELECT "Id" FROM "Customers"`.
- Bài 8.10 dùng SQLite để người mới không phải cài database; từ Module 12 dùng database thật.

## Kiểm tra trước khi tạo PR

```sh
npm run check        # link, đánh số mục, nhãn tham chiếu, hai bản database
npm run docs:build   # website build được
```

Chèn bài mới vào giữa module thì dùng `node scripts/shift-lessons.mjs <thư mục module> <số bài>` để dời số các bài phía sau, rồi sửa dòng điều hướng của hai bài kề bên.
