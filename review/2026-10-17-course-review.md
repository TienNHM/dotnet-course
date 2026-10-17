# Review khóa học .NET Backend: Zero → Senior (17/10/2026)

Review bởi 21 agent: 10 agent soát toàn bộ bài học theo cụm module, 1 agent đánh giá chương trình, 10 agent phản biện các lỗi critical/major. Tiêu chí: **dễ hiểu, đầy đủ, chính xác, thực tế**, với người học là thành viên CLB (sinh viên IT năm 1 đến 3, có bạn chưa từng viết C#). Mốc phiên bản: .NET 10 LTS, C# 14.

Tổng cộng 574 lỗi. 431 lỗi critical/major đã qua phản biện: 352 giữ nguyên, 78 điều chỉnh mức độ hoặc cách sửa (`adjusted`), 1 bị bác bỏ. Lỗi `minor` ban đầu chưa qua phản biện.

Sau phản biện: **59 critical, 340 major, 174 minor**.

> **Đã xử lý sau review:** thiếu hướng dẫn cài đặt môi trường, tạo project, debugger và unit test nhập môn (lỗi critical đầu tiên của Module 1 và mục đầu tiên ở "Chủ đề còn thiếu"). Đã bổ sung [Module 0 — Chuẩn bị môi trường](../lessons/stage-01-foundation/module-00-setup/README.md). Các lỗi còn lại chưa sửa.

## 1. Đánh giá chương trình

### Tổng quan

Chưa sẵn sàng để dạy CLB nguyên trạng. Bài viết có chất lượng nội dung khá cao. Phần lớn bài lõi mở bằng một tình huống cụ thể, có bảng so sánh, checklist, 3 bài tập kèm lời giải ẩn trong <details> và câu tự kiểm tra. 232/232 bài không phải review đều có lời giải. Nhiều bài bổ trợ (mini-case-study, quick-real-world-example, crm-context) có nội dung thật, không rỗng như dự đoán. Vấn đề nằm ở cấp chương trình, có năm điểm.

(1) Quy mô và độ sâu không hợp với sinh viên năm 1-3. Khóa có khoảng 1,04 triệu từ (khoảng 164.000 dòng) trong 251 bài. Riêng giai đoạn 1 đã khoảng 135.000 từ, trong khi roadmap ghi "Tuần 1-2". Ngay từ Module 1-2 đã có yield return, ref/out/in, pattern matching, LINQ, Server GC, multi-stage Dockerfile, JWT, correlation id, dotnet-trace.

(2) Thiếu bài khởi động cho người chưa từng viết C#. Không có bài cài .NET SDK/IDE, `dotnet new console`, Hello World, nhập/xuất console, string, try/catch hay dùng debugger. Bài 1.1 vào thẳng decimal, DateTimeOffset, `.csproj`, `new Customer { Name = "A" }` và struct.

(3) Nhiều chỗ dùng kiến thức trước khi dạy. Có 20/58 bài giai đoạn 3 dùng DbContext trong khi EF Core ở Module 13. Project 2 bắt buộc EF Core, mock và integration test. xUnit `[Fact]` xuất hiện từ bài 1.4 nhưng không bài nào dạy tạo test project.

(4) Độ chính xác về phiên bản lỗi thời. Không bài nào nhắc .NET 10 hay C# 14. Image Docker toàn bộ là sdk/aspnet:9.0, có 72 chỗ nhắc ".NET 8" và 123 chỗ nhắc ".NET 9". Bài 2.9 ghi STS hỗ trợ 18 tháng, nhưng từ .NET 9 đã là 24 tháng. Bài 9.3 lấy Swashbuckle làm mặc định. Bài 16.6 ghi MediatR chuyển giấy phép thương mại từ v12, thực tế là từ v13 (2025). Có 9 file còn dẫn RFC 7807 thay vì RFC 9457. FluentAssertions được dùng ở 65 file mà không cảnh báo v8 đã có giấy phép thương mại.

(5) Lỗi hệ thống và boilerplate. Cả 251 bài đánh số mục lệch 1 so với tên file, ví dụ bài 1.1 có mục "1.2.1". Có 759/963 tham chiếu dạng "bài X.Y" mang nhãn lệch 1 so với file được link, ví dụ "bài 4.3 về đóng gói" lại trỏ tới 4.2-encapsulation.md. Cả 19 bài review-and-assessment cùng 4 file dự án chứa các khối văn mẫu giống hệt nhau. Lab ở bài review không có lời giải.

Không có repo code mẫu, solution khởi đầu hay dataset nào: repo chỉ có Markdown và VitePress.

Kết luận: dùng được làm tài liệu đọc cho giai đoạn 2-4 sau khi sửa phiên bản và đánh số. Cần viết thêm một "Module 0" và một bộ starter code. Giai đoạn 5 và một phần giai đoạn 4 nên tách thành track nâng cao, không bắt buộc.

### Khuyến nghị (theo ưu tiên)

1. Sửa lỗi đánh số hàng loạt bằng script, trước mọi việc khác. Đổi heading `### X.(Y+1).N` thành `### X.Y.N` ở cả 251 bài. Sửa 759 nhãn 'bài X.Y' cho khớp file đích. Sửa tiêu đề trong mục 'Điều hướng' như '1.2 — 2. Điều Kiện (Conditions)' thành '1.2 — Điều kiện'. Sau đó thêm vào CI một bước kiểm tra: nhãn số trong link phải khớp tiền tố tên file.
2. Viết 'Module 0 — Chuẩn bị môi trường và chương trình đầu tiên', đặt trước 1.1. Nội dung gồm: cài .NET 10 SDK và chọn VS Code + C# Dev Kit, Visual Studio 2026 hoặc Rider; `dotnet --info`; `dotnet new console`; `dotnet run`; cấu trúc .csproj; Console.ReadLine/WriteLine và string interpolation; đặt breakpoint, Step Over/Into, xem biến trong Watch; đọc stack trace; try/catch cơ bản. Kèm một checklist 'máy bạn đã sẵn sàng' để mentor kiểm tra trong buổi 1.
3. Nâng toàn khóa lên .NET 10 / C# 14 và ghi rõ phiên bản ở đầu mỗi giai đoạn. Cụ thể: thay `sdk:9.0`/`aspnet:9.0` (58 chỗ) bằng 10.0. Sửa 2.9 thành STS 24 tháng, ghi .NET 8 và .NET 9 cùng hết hỗ trợ 10/11/2026, .NET 10 LTS đến 11/2028. Viết lại 9.3 lấy `Microsoft.AspNetCore.OpenApi` + Scalar làm mặc định, Swashbuckle chuyển thành phần phụ. Sửa 16.6 thành MediatR v13+. Đổi RFC 7807 thành RFC 9457 (9 file). Thêm cảnh báo giấy phép cho FluentAssertions v8 và AutoMapper (hoặc chuyển sang Shouldly/assert thường). Viết lại 15.10: đổi tên thành 'Aspire', cập nhật lệnh `aspire publish`/`deploy`. Đổi tên 14.5 'HybridCache (.NET 9)' thành '(.NET 9+)'.
4. Tạo repo `dotnet-course-labs` song song. Mỗi module có `start/` (solution khởi đầu biên dịch được, có TODO) và `solution/` (mentor giữ ở nhánh riêng). Kèm `tests/` có sẵn test để học viên tự chạy `dotnet test` kiểm tra bài, và dataset CRM chung (`seed/customers.json`, script SQL seed khoảng 10.000 khách hàng cho bài N+1/index). Mỗi bài lý thuyết link tới thư mục lab tương ứng.
5. Sửa thứ tự dạy-trước-dùng. Nên thêm bài 'EF Core tối thiểu' (DbContext, migration đầu tiên, SQLite) vào cuối Module 8, hoặc dùng repository in-memory cho toàn giai đoạn 3. Đồng thời thay 20 bài giai đoạn 3 đang dùng DbContext. Thêm bài 'Unit test với xUnit' (tạo test project, Arrange-Act-Assert, chạy `dotnet test`) vào Module 4 hoặc đầu Module 5. Bài 1.4 và 1.9 đổi `[Fact]` thành `Debug.Assert`/in kết quả, hoặc ghi chú link sang bài test.
6. Giảm tải giai đoạn 1 cho người mới. Chuyển các phần sau thành 'Đọc thêm (tùy chọn)': `yield return` (1.3), `ref/out/in` và extension method (1.4), pattern matching (1.2 §7), LINQ trong 1.8 (trùng 5.3), Workstation/Server GC (2.9), multi-stage Dockerfile trong 2.8/2.10, `git bisect`/correlation id/dotnet-trace (3.9). Bài 3.9 Debugging nên tách khỏi Module Git và đưa phần debugger cơ bản vào Module 0.
7. Viết lại 19 bài review-and-assessment. Bỏ các khối mẫu lặp lại: 'Bối cảnh giáo trình' (23 file), 'Quy trình làm bài', 'Bài tập tổng hợp', 'Tự kiểm tra' và 'Kết luận' chung chung (19 file). Tăng quiz từ 5 lên khoảng 10 câu và giấu đáp án trong &lt;details&gt;, vì hiện đáp án nằm ngay dưới câu hỏi, mâu thuẫn với 'Không xem đáp án'. Thêm lời giải hoặc test tự chấm cho các lab. Sửa lỗi đề trong 1.11: đề gọi hàm `TinhToan` nhưng code là `Calculate`; rubric nhắc `TongDoanhThu`/`LocTheoLoai` nhưng đề dùng `TotalRevenue`/`FilterByTier`.
8. Dọn 4 file dự án. Xóa 'Phương pháp học tập', 'Câu hỏi khởi động' và các mục rỗng ở cuối file ('Mở rộng và đào sâu / Góc nhìn sư phạm', 'Mini case study / Tình huống' chỉ có câu mẫu, 'Ví dụ thực tế nhanh' 3 gạch đầu dòng). Sửa bảng 'Mapping Module → Feature' của Project 2: hiện ghi Module 9 = JWT, Module 10 = authorization nâng cao, sai với thực tế (Module 9 = Web API, Module 10 = Auth). Sửa yêu cầu 'WebApplicationFactory + in-memory database' trong Project 2, vì nó mâu thuẫn với bài 9.8 ('UseInMemoryDatabase nói dối'). Xóa dòng `# Project 1 - Inventory System` lạc trong khối bash ở Project 1 §7, và thay `dotnet sln add src/**/*.csproj` bằng lệnh chạy được trên cả Windows.
9. Viết rubric có mô tả mức độ (4 mức: chưa đạt/đạt/khá/giỏi, có mô tả hành vi cụ thể cho từng tiêu chí) cho 4 dự án, thay cho chỉ chia điểm và '−3 mỗi bullet lớn'. Thêm 'Definition of Done' kiểm được tự động: build xanh, `dotnet test` xanh, không secret, README có lệnh chạy.
10. Đồng bộ thông điệp giữa roadmap, README module và nội dung. Roadmap nói 'Mỗi module lõi có mục Liên hệ CRM' và 'trong từng chương có Bổ sung roadmap.sh', nhưng thực tế chỉ Module 16-19 có. Tóm tắt Module 5 nhắc 'spans, exception semantics' nhưng không có bài nào. Module 10 nhắc 'OAuth2/OIDC, cookie, đa tenant'. Stage 3 README gán validation/xử lý lỗi cho Module 9 (thực ra ở Module 8). Project 1 là Inventory, phá trục CRM mà roadmap mô tả ('Giai đoạn 1-2: khách hàng là vài object trong bộ nhớ'): nên đổi P1 thành 'CRM Console' (Customer/Lead in-memory → JSON) hoặc nói rõ lý do.
11. Thêm phần 'Kiến thức tiên quyết' (2-3 dòng, có link) và 'Thời lượng ước tính' vào đầu mỗi bài. Hiện không bài lõi nào có, chỉ 10 file nhắc tới. Bỏ checklist 'Rà lại code của bạn' ở những bài không có code (2.1, 2.3, 16.11, 17.9...) hoặc đổi tên cho đúng nội dung. Đổi tên file và tiêu đề vô nghĩa: 2.1-concept-learning-path ('Concept learning path'), 2.3-client.md, 5.7-overview.md, 10.8-overview.md, 10.9-overview.md, 14.7-alternative-overview.md, 15.9-awareness-level.md, 16.3-uncle-bob.md, 16.8-in-process.md.
12. Bổ sung các chủ đề thiếu, liệt kê trong missing_topics, theo thứ tự: cài đặt/IDE/debugger → exception cơ bản → string/collection cơ bản → unit test → Minimal API 'hello API' và file .http → HttpClient/IHttpClientFactory → logging mặc định ILogger trước Serilog → EF Core tối thiểu với SQLite.

### Thực hành

Môi trường: không có hướng dẫn cài đặt nào. Lệnh `dotnet --version` chỉ xuất hiện trong bài review 2.13. Bài 3.2 hướng dẫn cài Git nhưng không cài .NET SDK hay IDE. Lời giải ghi 'Kết quả thật trên .NET 9', trong khi học viên năm 2026 sẽ cài .NET 10.

Code mẫu: chỉ là snippet trong Markdown. Repo không có file .cs, .csproj, .sln hay .http nào. Nhiều bài tập yêu cầu 'một dự án có sẵn' (ví dụ 1.1 Bài 3 bảo grep `DateTime.Now` trong một dự án bất kỳ, 1.10 Bài 3 'Rà dự án'). Sinh viên năm 1 không có dự án nào để làm việc này.

Bài tập trong bài lõi: tốt. Mỗi bài có 3 bài tập, tiêu chí hoàn thành rõ, gợi ý và lời giải ẩn kèm giải thích 'Vì sao' và 'Hệ quả thực tế'. Đây là điểm mạnh nhất của khóa.

Bài review-and-assessment (19 bài): yếu. Quiz chỉ 5 câu và lộ đáp án. Lab không có lời giải hay test chấm. Rubric chỉ chia điểm, có chỗ sai tên hàm (1.11). Nửa sau mỗi bài là văn mẫu lặp lại. Giai đoạn 5 (16.16-19.13) chỉ khoảng 147 dòng, rubric gọn và hợp lý hơn (ví dụ 16.16: Command+Handler 30, invariant 15, test 25, ADR 10).

Dự án: Project 1 (Inventory) và Project 2 có đặc tả tốt: domain model, interface, business rule, 12 test case, endpoint list, state machine. Nhưng chúng thiếu starter solution, thiếu test tự chấm và thiếu dataset. Rubric chỉ là 'cộng từ checklist, −3 mỗi bullet lớn', không có mô tả mức độ nên mentor khác nhau sẽ chấm khác nhau. Project 2 đòi EF Core, mock và Postman script khi chưa học EF. Project 3 (1263 dòng) có multi-tenant, approval engine, Hangfire, SignalR, k6, CI, Aspire: quá tải với sinh viên trong 'Tuần 11-14'. Final Project chỉ có khung 272 dòng, phù hợp làm đồ án nhóm tự chọn cho thành viên giỏi.

Chấm điểm: thang 100 (Quiz 20 + Lab 80, Đạt ≥ 70) thống nhất và dùng được. Tuy vậy khóa chưa có quy trình nộp bài cụ thể ('Repo / zip + ảnh dotnet run'), chưa có CI tự chấm và chưa có mẫu PR/issue. Cần bổ sung template repo nộp bài, kèm workflow GitHub Actions chạy `dotnet build` + `dotnet test`.

### Chủ đề còn thiếu

| Mức | Chủ đề | Đặt ở đâu | Lý do |
|---|---|---|---|
| critical | Cài đặt môi trường: .NET 10 SDK, IDE (VS Code + C# Dev Kit / Visual Studio / Rider), dotnet CLI, Hello World, cấu trúc .csproj | Thêm Module 0 trước lessons/stage-01-foundation/module-01-programming-logic/1.1-variables-and-data-types.md | Nhóm học viên mục tiêu có bạn chưa từng viết C#. Bài 1.1 đã dùng `.csproj`, `<Nullable>enable</Nullable>`, class Customer mà không nói cách tạo hay chạy project. |
| critical | Dùng debugger cơ bản: breakpoint, step, watch, call stack, đọc stack trace | Module 0 hoặc Module 1. Hiện chỉ có 1 mục trong 3.9-debugging-workflow.md (Module Git) và 1 link ở 1.6 | Đây là kỹ năng giúp người mới tự gỡ lỗi. Bài 3.9 lại trộn phần này với git bisect, correlation id, dotnet-trace, quá sâu cho tuần 2. |
| critical | Unit test nhập môn: tạo project xUnit, Arrange-Act-Assert, dotnet test | Module 4 hoặc Module 5. Hiện `[Fact]` đã dùng từ 1.4-functions-methods.md, 1.9-mini-case-study.md mà không có bài dạy | Mọi dự án đều yêu cầu test (Project 1 có 12 TC, Project 2 có unit và integration test). Test tự chấm cũng là nền cho việc chấm bài trong CLB. |
| critical | EF Core tối thiểu, hoặc lưu trữ đơn giản, trước giai đoạn 3 | Cuối Module 8, hoặc chuyển phần 13.1-13.4 lên trước Project 2 | 20/58 bài giai đoạn 3 và Project 2 dùng DbContext, Include, ToListAsync, global query filter khi Module 13 chưa học. |
| major | Exception cơ bản: try/catch/finally, throw, custom exception | Module 1, ngay sau 1.4. Hiện chỉ có mục '1.5.8 — Ném ngoại lệ hay trả về false?' và 4.9 common mistakes | Project 1 yêu cầu InventoryException, Module 8 dạy global exception handling, nhưng chưa có bài dạy cơ chế exception. |
| major | String và nhập/xuất console: interpolation, Split/Trim, parse an toàn (int.TryParse) | Module 1 (1.1 hoặc bài mới) | Bài review 1.11 (Calculate, đếm từ) và menu console của Project 1 cần các thao tác này, nhưng không bài nào dạy. |
| major | Gọi HTTP ra ngoài: HttpClient, IHttpClientFactory, typed client, timeout và retry cơ bản | Module 7 (DI) hoặc Module 9. Hiện chỉ rải rác trong 2.4, 7.4, 7.5, 9.6, chưa có bài riêng | Gọi API bên thứ ba là việc hằng ngày của backend. new HttpClient trong vòng lặp là lỗi kinh điển mà người mới hay mắc. |
| major | Minimal API 'hello API' và cách gọi thử bằng file .http / curl / Scalar | Đầu Module 8, trước 8.1. Bài 8.1 hiện mở đầu bằng 'Khác biệt so với ASP.NET (.NET Framework)' | Người học cần thấy một endpoint chạy trong 10 phút trước khi đọc về Kestrel, Generic Host, pipeline. Template .NET 10 dùng Minimal API và file .http mặc định. |
| major | Logging cơ bản bằng ILogger&lt;T&gt; có sẵn trước khi dùng Serilog | Module 8, trước 8.7-logging-with-serilog.md | Cần nắm abstraction mặc định trước khi dùng thư viện bên thứ ba. Bài 3.9 đã nói về 'log có cấu trúc' từ giai đoạn 1. |
| minor | Tính năng C# 13/14 và .NET 10: field keyword, extension members, null-conditional assignment, OpenAPI 3.1, validation cho Minimal API | Ghi chú trong Module 4/5 và 9.3 | Khóa tự nhận cập nhật nhưng không nhắc tới .NET 10 hay C# 14 lần nào. |
| minor | Làm việc nhóm trên GitHub cho bài nộp: fork/template repo, issue, PR review theo checklist | Module 3 (3.6) gắn với quy trình nộp bài của CLB | Biến Module Git thành quy trình nộp bài thật, thay vì lý thuyết rời. |

### Thứ tự bài

- Bài 1.1 dùng `class Customer` với object initializer, `struct`, `record struct`, file `.csproj` và `<Nullable>`. Class và record chỉ được dạy ở 4.1 và 4.7.
- Bài 1.2 dạy switch expression và pattern matching. 1.3 dạy `yield return` và 'gọi I/O trong vòng lặp' (link sang async 6.6). 1.4 dạy extension method và `[Fact]`. 1.8 dạy LINQ và deferred execution. Tất cả nằm ở Module 1, trong khi LINQ chính thức ở 5.3 và async ở Module 6.
- Module 2 (tuần 1-2) có multi-stage Dockerfile `sdk:9.0` (2.8, 2.10), JWT và nơi lưu token (2.7), Workstation/Server GC (2.9). Docker chỉ được dạy ở Module 15, JWT ở Module 10.
- Bài 3.3 'Checklist an toàn khi làm Git' đứng trước 3.4 'Workflow cơ bản': học viên đọc quy tắc an toàn cho lệnh mình chưa biết. Bài 3.9 'Debugging Workflow' nằm trong Module Git và dùng correlation id, structured logging, dotnet-trace, những thứ chỉ có nghĩa sau Module 8.
- Bài 7.6 'Program.cs và WebApplicationBuilder' ở Module 7 (DI) đứng trước Module 8 ASP.NET Core. Hợp lý nếu chỉ giới thiệu, nhưng cần ghi rõ là xem trước.
- Project 1 yêu cầu chia 4 project Domain/Application/Infrastructure/Console và nói về 'sức mạnh của Clean Architecture', trong khi Clean Architecture ở Module 16. Project này còn dùng Host.CreateDefaultBuilder và extension method đăng ký DI.
- Project 2 (cuối giai đoạn 3) bắt buộc AppDbContext, override SaveChangesAsync, global query filter, mock repository, integration test. EF Core (Module 13) và global query filter (13.10) ở giai đoạn 4.
- Bài 9.8 API Testing dùng CrmDbContext và Testcontainers (cần Docker), trước Module 13 và Module 15.
- Bài 9.9 'Hosted Service/Background Jobs' ở Module 9, rồi Module 14 lại có Hangfire, Quartz, message bus. Nên gom vào một chỗ hoặc ghi rõ quan hệ giữa hai phần.
- Module 12 SQL Deep Dive (index, execution plan, isolation) đứng trước Module 13 EF Core, nhưng khóa không có bài SQL nhập môn (SELECT/JOIN/GROUP BY). Phần này chỉ được link ra ngoài sang sql-challenge. Cần nói rõ đó là điều kiện tiên quyết bắt buộc.
- Thông điệp 'trục CRM xuyên suốt từ giai đoạn 1' không khớp: Project 1 là Inventory, không phải CRM.

### Nên rút gọn, gộp hoặc chuyển thành đọc thêm

- Văn mẫu lặp trong 19 bài review-and-assessment và 4 file dự án: khối 'Bối cảnh giáo trình (mục tiêu xuyên suốt)' cùng bảng 5 giai đoạn (23 file), 'Quy trình làm bài (hệ thống)', 'Phần C — Reflect' 3 câu giống nhau, cùng 'Mục tiêu bài học', 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' chung chung ('Hoàn thành bài này giúp bạn có góc nhìn đầy đủ hơn...'). Nên đưa phần này một lần vào roadmap hoặc trang 'Cách học và chấm điểm', mỗi bài chỉ để link.
- Trong 4 file dự án (project-01, project-02, project-03, final-project): xóa 'Phương pháp học tập', 'Câu hỏi khởi động' và 4 mục rỗng ở cuối ('Mở rộng và đào sâu / Góc nhìn sư phạm / Khung học thuật cốt lõi', 'Mini case study / Tình huống / Đáp án gợi ý' chỉ có câu mẫu, 'Ví dụ thực tế nhanh' 3 gạch đầu dòng, 'Checklist trước khi sang bài tiếp theo').
- Các bài *-advanced-notes, *-mini-case-study, *-quick-real-world-example (57 bài, khoảng 40.000 dòng, cùng crm-context và roadmap-sh-supplement là khoảng 26% tổng số từ) có nội dung thật nhưng hay trùng bài lõi. Ví dụ 1.10 (Dictionary thay vòng lặp lồng) trùng 1.7 §4 và 1.5 §5, còn 1.8 (LINQ) trùng 5.3. Đề xuất: giữ mini-case-study làm bài luyện tập của module; gộp quick-real-world-example vào mục 'Lỗi thường gặp' của bài lõi liên quan; chuyển advanced-notes thành 'Đọc thêm' ngoài lộ trình bắt buộc.
- Bỏ checklist '### Rà lại code của bạn' (211 bài) ở các bài không có code như 2.1, 2.3, 2.6, 16.11, 17.9, 18.8, 19.8, hoặc đổi tên cho phù hợp.
- Các bài roadmap-sh-supplement (16.11, 17.9, 18.8, 19.8): nên chuyển thành một trang phụ lục 'Đối chiếu roadmap.sh' thay vì 4 bài trong lộ trình.
- Giai đoạn 1 nên chuyển thành 'Đọc thêm': `yield return` (1.3 §7), `ref/out/in` (1.4 §4), đệ quy và bất biến vòng lặp (1.8), Workstation/Server GC (2.9 §3), Dockerfile trong 2.8 và 2.10, `git bisect`/correlation id/bộ công cụ chẩn đoán (3.9 §2, §5, §6), Conventional Commits có thể rút gọn.
- Giai đoạn 2 quá sâu cho sinh viên, nên để tùy chọn: 5.7 Expression Trees và Reflection, 6.3 ConfigureAwait (chỉ giữ một đoạn 'ASP.NET Core không cần'), 6.5 TPL và 6.8 Channels, 7.8 Keyed Services, phần ValueTask ở 6.2 §4.
- Giai đoạn 3-4 nên chuyển sang track nâng cao: 9.2 API Versioning, 10.7 Permission System, 11.9 Presence và 11.10 Scale-out, 12.2 SQL Server vs PostgreSQL (rút còn một bảng), 12.7 Stored procedures, 14.7 Quartz, 14.8 Message bus intro (trùng Module 17), 15.7 Azure, 15.9 Kubernetes, 15.10 Aspire.
- Cả giai đoạn 5 (Module 16-19, khoảng 270.000 từ) nên là track 'Senior/Advanced' tự chọn cho thành viên đã đi thực tập hoặc đi làm, không thuộc chương trình CLB bắt buộc. Riêng 16.2 Layered, 16.7 FluentValidation và 16.9 Testing strategy có thể kéo về giai đoạn 3.
- Bài 8.1 §1 'Khác biệt so với ASP.NET (.NET Framework)' không cần với sinh viên chưa từng dùng .NET Framework. Rút còn một câu.

### Tổ chức dạy trong CLB

Đề xuất chia khóa thành 2 track.

**Track Core (bắt buộc, khoảng 16 tuần, 1 học kỳ):** Module 0 (mới), Module 1, 3, phần cần thiết của Module 2, Module 4-7 đã giảm tải, Project 1, Module 8, 9 (phần lõi), 10 (10.1-10.4), Project 2 thu gọn, Module 13 (13.1-13.6), 15.1-15.3.

**Track Advanced (tự chọn, học kỳ sau):** phần còn lại của giai đoạn 4, cùng giai đoạn 5 và Final Project làm đồ án nhóm.

**Nhịp tuần**
- Thứ 2: mentor đăng 'gói tuần' gồm 2-3 bài đọc bắt buộc (ghi rõ bài nào là 'Đọc thêm'), lab trong repo `dotnet-course-labs` và quiz 10 câu (Google Form hoặc quiz trên VitePress).
- Học viên tự học khoảng 4-6 giờ mỗi tuần.
- Buổi sinh hoạt 2 giờ, theo thứ tự:
  1. 10 phút: chữa nhanh quiz, tập trung câu sai nhiều nhất.
  2. 40 phút: mentor live-coding từ nhánh `start` của lab, cố ý gây lỗi và debug trước lớp.
  3. 50 phút: pair programming theo cặp, lệch trình độ (1 bạn năm 1 + 1 bạn năm 2-3), làm phần TODO của lab.
  4. 20 phút: 2-3 nhóm demo, mentor nhận xét theo rubric.

**Mentor**
- Tỉ lệ 1 mentor cho 6-8 học viên. Mỗi mentor phụ trách một nhóm cố định trong cả kỳ.
- Mentor là thành viên đã qua Track Core hoặc đã đi thực tập .NET.
- Trước mỗi tuần, mentor tự làm lab ở nhánh `solution` và ghi chú các 'lỗi hay gặp' để chuẩn bị.
- Tổ chức 1 kênh Discord/Zalo hỏi đáp, kèm quy tắc 'hỏi kèm lỗi, đoạn code và điều đã thử'.

**Nộp bài**
- Dùng GitHub Classroom hoặc template repo. Mỗi lab là một PR vào repo cá nhân, mentor được thêm làm reviewer.
- GitHub Actions tự chạy `dotnet build` + `dotnet test` với bộ test có sẵn, chiếm 60% điểm lab.
- Mentor review PR theo rubric 4 mức, chiếm 40% (đặt tên, cấu trúc, xử lý lỗi, commit message theo Conventional Commits đã học ở Module 3).
- Hạn nộp trước buổi sinh hoạt tuần sau. Cho nộp lại 1 lần.

**Mốc đánh giá**
- Cuối tuần 6: Project 1, rút gọn thành 'CRM Console' để giữ trục CRM. Làm cá nhân.
- Cuối tuần 12: Project 2 thu gọn (Customer/Lead CRUD + JWT + EF Core SQLite + integration test). Làm theo nhóm 2-3 bạn, chia việc bằng issue/PR.
- Tuần 16: demo day, mỗi nhóm trình bày 10 phút và trả lời vấn đáp 5 phút, dùng mục 'Reflect' làm câu hỏi.
- Ngưỡng 'Đạt ≥ 70' giữ nguyên. Hoàn thành Track Core (đạt ≥ 70 ở cả 2 dự án và ≥ 80% lab) thì được cấp chứng nhận nội bộ và mời làm mentor kỳ sau.

**Theo dõi**
- Bảng tiến độ chung (Google Sheet hoặc GitHub Project): lab đã nộp, điểm quiz, điểm dự án.
- Mentor họp 15 phút mỗi tuần để đánh dấu học viên tụt lại và ghép cặp hỗ trợ.

## 2. Đánh giá từng module

Thang 1 đến 5. Cột cuối là số lỗi sau phản biện (critical / major / minor).

| Module | Dễ hiểu | Đầy đủ | Chính xác | Thực tế | Lỗi |
|---|:-:|:-:|:-:|:-:|:-:|
| Module 1 - Programming Logic | 2 | 3 | 3 | 3 | 3 / 12 / 15 |
| Module 2 - Computer Science Basics | 3 | 4 | 3 | 4 | 2 / 14 / 10 |
| Module 3 - Git + Developer Workflow | 3 | 2 | 3 | 2 | 1 / 21 / 4 |
| Module 4 - C# Core | 3 | 3 | 2 | 3 | 3 / 15 / 7 |
| Module 5 - Advanced C# | 3 | 3 | 3 | 3 | 0 / 14 / 10 |
| Module 6 - Async Programming | 3 | 4 | 2 | 4 | 0 / 20 / 10 |
| Module 7 - Dependency Injection | 2 | 3 | 3 | 3 | 2 / 16 / 10 |
| Project 1 - Inventory System (Console + API) | 3 | 2 | 2 | 3 | 1 / 4 / 2 |
| Module 8 - ASP.NET Core Fundamentals | 3 | 4 | 3 | 3 | 3 / 13 / 11 |
| Module 9 - Web API Professional | 3 | 3 | 2 | 4 | 7 / 21 / 9 |
| Module 10 - Authentication + Authorization | 4 | 3 | 2 | 4 | 4 / 12 / 5 |
| Module 11 - SignalR | 3 | 3 | 2 | 3 | 1 / 13 / 7 |
| Project 2 — CRM Backend API | 3 | 2 | 3 | 3 | 0 / 4 / 1 |
| Module 12 - SQL Deep Dive | 3 | 3 | 2 | 3 | 0 / 11 / 8 |
| Module 13 - Entity Framework Core | 2 | 3 | 2 | 3 | 13 / 23 / 7 |
| Module 14 - Caching + Background Jobs | 2 | 3 | 2 | 3 | 7 / 21 / 9 |
| Module 15 - Docker + Deployment | 3 | 3 | 2 | 3 | 1 / 22 / 6 |
| Project 3 — Production CRM Platform | 2 | 2 | 1 | 3 | 2 / 4 / 0 |
| Module 16 - Clean Architecture | 3 | 4 | 3 | 3 | 1 / 13 / 6 |
| Module 17 - Distributed Systems | 2 | 3 | 2 | 4 | 4 / 21 / 13 |
| Module 18 - Microservices | 3 | 3 | 3 | 4 | 0 / 15 / 9 |
| Module 19 - Performance Engineering | 3 | 3 | 2 | 3 | 4 / 27 / 9 |
| Final Project — Enterprise CRM / ERP Platform | 3 | 2 | 3 | 3 | 0 / 3 / 2 |
| Lộ trình .NET Backend: From Zero → Senior (Backend-first) | 4 | 3 | 4 | 3 | 0 / 0 / 2 |
| Bảng thuật ngữ | 4 | 2 | 4 | 4 | 0 / 1 / 2 |

### Module 1 - Programming Logic

Chưa sẵn sàng dạy ngay cho sinh viên năm 1–3 chưa từng viết C#. Bài nào cũng có ví dụ CRM, bẫy thực tế, bài tập kèm lời giải và tiêu chí hoàn thành, nhiều đoạn viết rất tốt (decimal/double, guard clause, N+1, Contains trong vòng lặp, tư duy bảng ví dụ). Điểm yếu lớn: không có bài chuẩn bị môi trường; ngay từ 1.1–1.5 đã dùng class, LINQ/lambda, async, EF Core, xUnit trước khi dạy; vài đoạn code không biên dịch được (khai báo type trước top-level statements, thiếu using System.Diagnostics) và có vài khẳng định kỹ thuật sai (biến for bị bắt trong lambda, fall-through của switch trong quiz). Bài 1.11 vẫn là boilerplate, không có lời giải.

**Cải thiện quan trọng nhất:**

- Thêm bài 1.0 'Chuẩn bị môi trường' (cài .NET 10 SDK, VS Code + C# Dev Kit, dotnet new console, top-level statements, dùng `dotnet run app.cs` của .NET 10 để chạy nhanh từng snippet) và bổ sung phần cú pháp nền còn thiếu: toán tử, chuỗi/nội suy, nhập xuất Console, ép kiểu/Parse, khai báo hàm static trong Program.cs, đệ quy cơ bản.
- Sắp lại thứ tự hoặc gắn nhãn 'Xem trước – sẽ học ở Module X' cho mọi ví dụ dùng class/record, LINQ/lambda, async/await, EF Core, xUnit/FluentAssertions; tách các bài tập cần DbContext/SQL Server/dự án thật (1.3 Bài 2, 1.7 Bài 3, 1.4 Bài 3) ra thành phần 'Nâng cao (tuỳ chọn)'.
- Rà và sửa toàn bộ code để biên dịch được trên .NET 10: chuyển class/struct/enum/record xuống cuối file, thêm `using System.Diagnostics;` cho Stopwatch, không khai báo trùng biến trong cùng snippet, định nghĩa các kiểu Order/Customer/Lead dùng chung trong một file mẫu CRM; cập nhật mọi dòng 'Kết quả trên .NET 9' sang .NET 10.
- Sửa các lỗi kiến thức: biến vòng for bị bắt chung (1.8), câu trả lời về break/fall-through (1.11), khoá trùng trong Dictionary initializer (1.2), lời khẳng định về EF Core phát hiện N+1 (1.3), tỉ lệ 880 lần (1.5), số byte mỗi stack frame (1.8), các con số 40 giây/0,4 giây mâu thuẫn trong 1.10.
- Viết lại 1.11 thành bài ôn tập thật: mục tiêu cụ thể, 10–15 câu hỏi có đáp án ẩn trong &lt;details&gt;, lời giải/tiêu chí cho Bài 1–4, bỏ các mục boilerplate; thống nhất định danh tiếng Anh (bỏ ĐủĐiềuKiện..., TinhHoaHong..., danhSachLead) và sửa đánh số mục (1.2.x trong bài 1.1, ...).

### Module 2 - Computer Science Basics

Nội dung phong phú, thực tế, sát công việc backend (DNS TTL, HTTP semantics, IDOR, ProblemDetails, CORS, connection pool, health check), có phương pháp chẩn đoán theo từng chặng và lời giải chi tiết. Có thể dùng làm tài liệu cho mentor, nhưng để sinh viên tự học thì còn nặng, do nhiều bài tập đòi sẵn một API có đăng nhập, PostgreSQL, Docker hoặc máy ảo mà không có hướng dẫn chuẩn bị. Có một số lỗi chính xác đáng kể: NumberToStringConverter không tồn tại, middleware Server-Timing ghi header sau khi response đã bắt đầu, lời giải 2.13 deserialize sai do phân biệt hoa thường, ca lệch đồng hồ trong 2.11 phi logic, chính sách STS 18 tháng đã cũ, bỏ qua DATAS của GC. Nhiều chỗ vẫn bám .NET 8/9 và đánh số mục lệch một bậc trong toàn module.

**Cải thiện quan trọng nhất:**

- Sửa đánh số mục và nhãn liên kết lệch một bậc trong toàn module (2.2.x trong bài 2.1, 'bài 2.3' trỏ tới 2.2, 'bài 10.7' trỏ tới 10.6, ...); đổi tiêu đề 'Concept learning path' thành tên có nghĩa, ví dụ 'Bản đồ module: chuyện gì xảy ra khi bấm Đăng nhập'.
- Cung cấp một 'môi trường thực hành chung' cho cả module: repo CRM mẫu có login JWT, 2 role, PostgreSQL và Redis qua docker compose. Các bài tập 'gọi API của bạn' (2.3, 2.4, 2.6, 2.7, 2.8, 2.12) chạy được trên repo này, kèm lệnh thay thế cho Windows (Resolve-DnsName, curl.exe, PowerShell).
- Sửa các lỗi code/kỹ thuật: NumberToStringConverter đổi thành [JsonNumberHandling]; Server-Timing ghi trong Response.OnStarting; 2.13 dùng JsonSerializerDefaults.Web; thống nhất chỗ HttpClient ném lỗi header non-ASCII (lúc SendAsync, không phải lúc Add); viết lại kịch bản lệch đồng hồ 2.11 với hai máy; sửa logic phát hiện lệch đồng hồ.
- Cập nhật lên .NET 10 LTS: STS nay được hỗ trợ 24 tháng, .NET 8 và 9 cùng hết hỗ trợ ngày 10/11/2026; image aspnet:10.0 (tag mặc định là Ubuntu); bổ sung DATAS khi nói về Server GC; OWASP Top 10:2025; `dotnet --version` cho ra 10.0.x; cổng mặc định của template webapi.
- Thống nhất các khuyến nghị giữa các bài: email trùng trả 409 hay 422; 400 hay 422 cho lỗi validation; PostgreSQL hay SQL Server; Azure App Service hay container; danh sách 'bốn thứ JSON không có'. Viết lại 2.13 bỏ boilerplate, thêm đáp án ẩn và sửa câu quiz PUT/PATCH.

### Module 3 - Git + Developer Workflow

Chưa sẵn sàng để dạy sinh viên mới học. Điểm mạnh: văn phong tiếng Việt mạch lạc, có lời giải chi tiết, nhiều kịch bản dựng repo thử có output thật, giải thích rõ vì sao. Điểm yếu chính: thiếu hẳn phần nhập môn (cài Git, remote/clone/fetch/pull, git switch/restore). Thứ tự bài đảo ngược (bài 3.3 dạy reflog, rebase, force push trước khi dạy add/commit ở 3.4). Bài tập giả định người học đang làm trong đội ở công ty. Bài 3.9 và 3.13 nhồi Serilog, dotnet-counters, EF Core migrations vào Stage 1. Còn một số lỗi kỹ thuật làm lệnh không chạy (reset HEAD~3, migrations --dry-run, commit không add, rebase sau migrations remove).

**Cải thiện quan trọng nhất:**

- Thêm bài mở đầu thực hành: cài Git (Git for Windows/winget, git --version), cấu hình, tạo tài khoản và repo GitHub, xác thực bằng HTTPS + Git Credential Manager trước rồi mới tới SSH. Thêm khái niệm remote/origin/clone/fetch/pull/push -u và hai lệnh git switch/git restore.
- Sắp xếp lại thứ tự: 3.1, 3.2, rồi workflow cơ bản (3.4), branching (3.5), GitHub/PR (3.6), conflict (3.7), rồi mới tới bài an toàn và cứu dữ liệu (3.3). Gộp 3.11 (trùng 3.3, 3.5, 3.9) vào các bài gốc hoặc bỏ đi.
- Chuyển phần .NET nâng cao ra khỏi Stage 1: correlation id/Serilog/dotnet-counters (3.9) sang Module 8/19, conflict EF Core migration (3.13) sang Module 13. Ở Stage 1 chỉ giữ bisect với ví dụ đơn giản.
- Cung cấp một repo luyện tập của CLB (script tạo lịch sử, tag v1.2.0, PR mẫu) để thay cho các đề 'lấy 10 PR của đội', 'kho của đội', '30 commit gần nhất'. Học viên làm theo cặp: một người push, một người review.
- Sửa toàn bộ đánh số mục (3.1 đang dùng 3.2.x…) và 60 link có số bài lệch với file đích. Thống nhất ngôn ngữ commit message, thời hạn reflog 90/30 ngày, nâng CI lên .NET 10, viết lại 3.14 thành bài đánh giá có lời giải và bỏ boilerplate.

### Module 4 - C# Core

Nội dung sâu, nhiều nhận định thiết kế có giá trị: bất biến qua constructor, collection trap, value object, composition so với kế thừa, Turkish I. Bài tập có lời giải dài. Nhưng chưa thể đưa cho CLB dùng ngay. Còn vài lỗi kỹ thuật nghiêm trọng đã kiểm chứng bằng .NET 10 SDK: field initializer KHÔNG gây NRE khi gọi virtual trong ctor, enum switch đủ nhánh vẫn sinh CS8524, compiler KHÔNG kiểm tra vét cạn cho phân cấp sealed, struct không có == mặc định, test TimeProvider sai ở múi giờ UTC+7. Ví dụ dùng sớm EF Core, DI, ASP.NET, NSubstitute, Clean Architecture với sinh viên mới học OOP. Tên entity CRM và chữ ký constructor không thống nhất giữa các bài.

**Cải thiện quan trọng nhất:**

- Sửa ngay các lỗi kỹ thuật đã xác minh: 4.3 (bẫy virtual-in-ctor chỉ xảy ra khi gán field trong thân ctor), 4.8 (CS8524 so với CS8509, không có vét cạn trên kiểu sealed), 4.1 và 4.12 (struct không có == mặc định), 4.4 (DateTime so với DateTimeOffset), 4.7 (default(Email) né validation), 4.12 (GroupBy().ToList() không deferred), 4.11 (HasIndex trên owned type).
- Cung cấp một project CRM khởi đầu (console + class library) có sẵn Customer, Lead, Order, Money, Email thống nhất, để mọi ví dụ và bài tập 'tìm trong dự án của bạn' đều chạy được. Mỗi đoạn code chính phải biên dịch được trên net10.0 với Nullable bật, kèm using cần thiết.
- Tách lớp kiến thức: phần chính chỉ dùng console và xUnit cơ bản. Chuyển ví dụ Minimal API, EF Core, DI, NSubstitute, FluentValidation, NetArchTest, Clean Architecture vào mục 'Đọc thêm' có ghi rõ 'sẽ học ở Module 7/8/13/16'.
- Thống nhất quy ước: định danh tiếng Anh (bỏ TaoLeadRequest, HoTen, ĐủĐiềuKiện…), cùng một bộ entity CRM (Lead, Customer, Deal, Order) với chữ ký constructor cố định, cùng enum OrderStatus. Sửa 4.13 để không mâu thuẫn bài 'trạng thái không phải kiểu' (Lead → Customer qua Convert()).
- Giảm trùng lặp (4.4 với 4.5 về khi nào cần interface, 4.7 với 4.12 về equality), sửa đánh số mục và link lệch số. Đổi 'chạy trên .NET 9' thành .NET 10. Viết lại 4.13 với quiz sát nội dung, lời giải hoặc rubric cho từng lab, bỏ boilerplate và tham khảo gắn sai link.

### Module 5 - Advanced C#

Chưa sẵn sàng để dạy nguyên trạng cho sinh viên năm 1-3. Điểm mạnh: mỗi bài có mục tiêu, bài tập kèm lời giải, tự kiểm tra, và phần cảnh báo lạm dụng SOLID, bẫy ToList, rò rỉ event rất thực tế. Điểm yếu: nhiều bài dùng EF Core, async/await, DI, FluentValidation trước khi các khái niệm này được dạy. Có một số lỗi kỹ thuật làm code không biên dịch được hoặc dạy sai, ví dụ ví dụ Normalize trái ngược với quy tắc, interface covariant chứa Task&lt;T&gt;, OnDoi không tồn tại và tuple serialize tự mâu thuẫn. Đánh số mục và link nội bộ bị lệch một bài trên toàn module. Bài 5.12 có quiz quá dễ và boilerplate.

**Cải thiện quan trọng nhất:**

- Sắp lại thứ tự hoặc thêm phần dẫn dắt: dạy delegate/lambda (5.4) trước LINQ (5.3). Tách phần LINQ-to-objects (chạy được trong console) khỏi phần EF Core, phần EF Core đánh dấu 'đọc trước, làm lại ở Module 13'. Thêm mục 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường' cho mỗi bài.
- Sửa các lỗi kỹ thuật: Normalize trùng tên string.Normalize (5.5); IReadOnlyRepository&lt;out T&gt; với Task&lt;T?&gt; không biên dịch (5.9); OnDoi/OnNotified (5.4); JSON tuple ra {} chứ không phải Item1 (5.8); EF inline hằng số chứ không thành @p0 (5.7, 5.9); CA1815 không liên quan boxing (5.2); required được STJ hỗ trợ từ .NET 7 (5.6).
- Cập nhật lên .NET 10/C# 14: thêm extension members (khối extension) vào 5.5. Cập nhật Span trong async (C# 13), RespectNullableAnnotations của STJ, NRT bật sẵn trong template. Đổi mọi 'đo thật trên .NET 9' sang .NET 10 hoặc ghi rõ phiên bản.
- Sửa toàn bộ đánh số mục (5.2.x trong bài 5.1, …) và nhãn link lệch một (ví dụ 'bài 4.4' trỏ tới 4.3). Thống nhất tên entity CRM (Lead.Value/Name so với HoTen/GiaTri, Customer so với KhachHang).
- Viết lại 5.12: quiz bám các bẫy chính (ToList, event leak, tuple serialize, NRT không kiểm tra lúc chạy), lab có starter và lời giải mẫu. Bỏ yêu cầu 'dùng event để trigger email' và 'class ≤ 80 dòng' vì mâu thuẫn bài 5.1/5.4. Giảm trùng lặp giữa 5.4 và 5.11, giữa 5.7 và 5.9.

### Module 6 - Async Programming

Nội dung chiều sâu tốt, gắn với sự cố backend thật (starvation, DbContext song song, cache stampede, consumer chết), có lời giải chi tiết. Muốn dạy cho CLB cần sửa trước một nhóm lỗi chính xác quan trọng. Các lỗi đó gồm: ShutdownTimeout mặc định là 30s chứ không phải 5s; BackgroundServiceExceptionBehavior mặc định StopHost mâu thuẫn với kịch bản 'consumer chết im lặng'; PeriodicTimer ném OCE khi huỷ; .NET 10 đổi cách BackgroundService chạy ExecuteAsync; StopAsync huỷ token nên không drain được channel. Ngoài ra có nhiều mâu thuẫn giữa các bài: CA2007, Task.Run cho CPU-bound, async void top-level. Bài 6.12 không có lời giải và có quiz/bảng Do-Don't trái với nội dung module. Khối lượng ValueTask, PeriodicTimer, IAsyncDisposable lặp ở 3-4 bài.

**Cải thiện quan trọng nhất:**

- Sửa nhóm lỗi hosting/BackgroundService trong 6.8, 6.9 và 6.6: ShutdownTimeout mặc định 30s; mặc định StopHost khi ExecuteAsync ném; .NET 10 chạy toàn bộ ExecuteAsync trên luồng nền; StopAsync gọi base sẽ huỷ stoppingToken nên ReadAllAsync(stoppingToken) không drain; PeriodicTimer.WaitForNextTickAsync ném OperationCanceledException khi token huỷ; không fire-and-forget EnqueueAsync.
- Thống nhất thông điệp giữa các bài: CA2007 chỉ bật cho thư viện (6.1 và 6.7 đang bật cho app); Task.Run cho CPU-bound trong ASP.NET Core (6.1 khuyên dùng, 6.7 bảo vô ích); async void chỉ cho UI event handler (quiz 6.12 lại cho phép fire-and-forget); Task mặc định, ValueTask khi đo được (bảng Do/Don't 6.12 ngược lại).
- Sửa các khẳng định sai về luồng: Task.Delay không chiếm luồng (6.4 Bài 1); Task.Run(async …) không chiếm hai luồng (6.11); Task.Run + await không bắt thread hiện tại chờ (6.7). Sửa bảng 6.1 về 50 request với truy vấn 50ms. Sửa kịch bản '20 lần/ngày' làm starvation và tốc độ nở thread trên .NET 6+ (6.11).
- Sửa code dùng chung DbContext trong ví dụ đồng thời (6.6 stampede, 6.6 _inFlight, 6.7 Bài 3) và bug TryRemove khi task hoàn tất đồng bộ. Thêm cảnh báo deadlock khi consumer tự re-enqueue vào bounded channel (6.8).
- Bổ sung lời giải cho 3 bài thực hành ở 6.12, bỏ yêu cầu 'mock DbContext'. Gộp phần trùng lặp (ValueTask, PeriodicTimer, IAsyncDisposable) vào một chỗ. Sửa đánh số mục (6.2.x trong 6.1, …) và nhãn link lệch một. Cung cấp phương án tái hiện deadlock chạy được trên macOS/Linux (SynchronizationContext đơn luồng trong console) thay vì chỉ WPF.

### Module 7 - Dependency Injection

Chưa sẵn sàng để dạy CLB nếu chưa chỉnh. Điểm mạnh: nội dung sâu, bài nào cũng có bài tập kèm lời giải và tự kiểm tra, nhiều lỗi thực tế (captive dependency, BuildServiceProvider, đăng ký trùng) được giải thích kỹ. Điểm yếu chính: module nằm ở Stage 2 nhưng dùng liên tục ASP.NET Core, EF Core, JWT, middleware, Kubernetes, những thứ người học chưa được học. Có vài lỗi kỹ thuật nghiêm trọng: chia lưu lượng bằng Random trong factory Singleton, sửa captive dependency bằng CreateScope, đăng ký sau Build() và kết quả 'đo thật' sai. Số mục và nhãn link lệch 1 đơn vị trên toàn module. 7.10, 7.11 và 7.12 lặp lại nội dung các bài trước.

**Cải thiện quan trọng nhất:**

- Viết lại mở đầu module theo hướng console app (Host.CreateApplicationBuilder, ServiceCollection) cho mọi ví dụ và bài tập ở 7.1–7.9. Đưa các phần dùng middleware, JWT, EF Core, Kubernetes sang Module 8–15, hoặc gắn nhãn 'đọc thêm, sẽ học ở Module X'.
- Sửa các lỗi chính xác kỹ thuật: Random trong factory Singleton (7.1), kết quả Bài 2 (7.2), hành vi đăng ký sau Build() (7.6), CreateScope không lấy được scope của request (7.11), mâu thuẫn về ValidateScopes với factory và IOptionsSnapshot (7.5, 7.7), giá trị mặc định của ValidateOnBuild (7.11).
- Đánh số lại mục X.Y.z cho khớp số bài, sửa nhãn link ('bài 7.10' đang trỏ tới 7.9…). Chạy lại các khối 'kết quả đo thật trên .NET 9' trên .NET 10 và sửa code không biên dịch (khai báo type đặt trước top-level statements, biến sai tên).
- Gộp hoặc cắt bớt 7.10, 7.11, 7.12 vì đang lặp decorator, keyed services, options và captive dependency. Mỗi bài chỉ nên có 1–2 bài tập cốt lõi, phần còn lại chuyển thành 'mở rộng'.
- Viết lại 7.13: bỏ boilerplate, viết đề Bài 3 dựa trên nội dung có thật, thêm lời giải hoặc tiêu chí chấm cho lab, thống nhất NSubstitute (hoặc Moq) với các bài trước, sửa 'module tiếp theo'.

### Project 1 - Inventory System (Console + API)

Chưa sẵn sàng làm dự án tổng kết cho CLB. Điểm mạnh: yêu cầu chức năng, business rule và test case TC-01..TC-12 rõ ràng, cấu trúc layered dễ theo. Điểm yếu chính: thiết kế đưa IInventoryService (dùng DTO của Application) vào Domain nên không biên dịch được. Wiring DI mâu thuẫn với chính Module 7 (resolve từ root, repository JSON nhận string qua constructor), vòng lặp menu không thoát được. Không có starter/lời giải mẫu hay ước lượng thời gian, cuối bài còn nhiều đoạn boilerplate rỗng.

**Cải thiện quan trọng nhất:**

- Chuyển IInventoryService và các DTO/request vào Application (Domain chỉ giữ entity, enum và interface repository), sửa cây thư mục cho khớp.
- Sửa Program.cs: dùng Host.CreateApplicationBuilder, CreateScope (hoặc đăng ký Singleton có chủ đích), đăng ký JsonProductRepository bằng factory hoặc Options cho dataDirectory, thống nhất ConsoleApplication/MainMenu, sửa lựa chọn '0' để thoát vòng lặp.
- Bổ sung repo starter (khung solution và test) cùng lời giải mẫu tham khảo cho mentor, ước lượng thời gian theo tuần và rubric chấm cụ thể cho từng TC.
- Xoá các mục boilerplate ('Phương pháp học tập', 'Câu hỏi khởi động', 'Mở rộng và đào sâu', 'Mini case study' rỗng, 'Ví dụ thực tế nhanh' rỗng), bỏ rubric yêu cầu map sang Lead/Customer/Deal vì không hợp với Inventory.
- Cập nhật cho .NET 10 (dotnet new sln tạo .slnx, lệnh chạy được trên PowerShell), định nghĩa ValidationException, sửa quiz (IInventoryRepository không tồn tại) và gợi ý Level 4 (khoá ở tầng service, không phải repository).

### Module 8 - ASP.NET Core Fundamentals

Gần dạy được nhưng phải sửa một số lỗi kỹ thuật trước. Điểm mạnh: bao phủ đủ pipeline, routing, controller, validation, configuration, Serilog, exception handling, health check, nhiều lỗi thực tế có giá trị (HasStarted, mảng cấu hình, rò rỉ thông tin). Điểm yếu chính: một số khẳng định sai trên .NET 8–10 (ShutdownTimeout 5 giây, hậu quả khi đặt UseAuthorization trước UseRouting, ForwardedHeaders/KnownNetworks, Swagger trong template). Nhiều bài tập cần Nginx/Docker/Kubernetes/JWT, những thứ chưa học. 8.12 lặp lại 8.8. 8.13 còn boilerplate và mâu thuẫn với 8.8.

**Cải thiện quan trọng nhất:**

- Sửa các khẳng định sai: ShutdownTimeout mặc định 30 giây (8.1); UseAuthorization trước UseRouting không gây '401 mọi request' mà endpoint [Authorize] ném lỗi 500 (8.11); UseCors phải trước UseAuthorization (8.11); health check ném exception được framework bắt và trả Unhealthy/503 (8.9); thứ tự arm trong switch gây lỗi biên dịch (8.12).
- Cập nhật cho .NET 10: AddOpenApi/MapOpenApi thay cho Swashbuckle, KnownIPNetworks thay cho KnownNetworks, hành vi bỏ qua proxy lạ từ 8.0.17/9.0.6, Minimal API validation (AddValidation), không dùng FluentValidation.AspNetCore, cài đủ package (Serilog enrichers, AspNetCore.HealthChecks.*).
- Với bài tập cần Nginx, Kubernetes, JWT: thêm phương án chạy cục bộ (docker compose có sẵn, `dotnet run` với hai cửa sổ) hoặc đánh dấu 'tuỳ chọn, làm sau Module 10/15'.
- Gộp 8.12 vào 8.8 (đang trùng phần rò rỉ thông tin và traceId), cắt phần OpenTelemetry propagators. 8.10 thêm phần output caching hoặc hạ ưu tiên, sửa ví dụ rate limiter cho đúng 'theo người dùng/IP'.
- Viết lại 8.13: lab dùng giá trị trả về thay vì ném NotFoundException (khớp 8.8), sửa 'Module 9 = EF Core', bỏ heading rỗng và boilerplate, thêm lời giải hoặc checklist chấm cho mentor.

### Module 9 - Web API Professional

Nội dung có chiều sâu, nhiều bài tập có lời giải chi tiết, và gắn khá sát với tình huống backend thật: idempotency, offset với cursor, upload an toàn. Tuy vậy module chưa dạy được ngay cho CLB. Lý do: còn nhiều lỗi kỹ thuật làm người học hiểu sai, gồm khoá cache mặc định của output cache, hành vi BackgroundService trên .NET 6+, lệnh `redocly diff` không tồn tại và hành vi NSwag với 404. Code dùng API của Swashbuckle cũ, không chạy trên .NET 10. Hai bài review 9.11 và 9.12 lặp lại nội dung của 9.1 và 9.2. Bài 9.13 mâu thuẫn trực tiếp với các bài trước (bắt lưu file vào wwwroot, bắt dùng InMemory DB). Khối lượng kiến thức cấp senior (GraphQL, brownout, webhook HMAC, metric cardinality) quá nặng với sinh viên năm 1-3.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi kỹ thuật nghiêm trọng: khoá cache mặc định của output cache (đã gồm query string, mặc định không cache request đã xác thực), mặc định BackgroundServiceExceptionBehavior.StopHost và ShutdownTimeout 30 giây, rate limiter mặc định trả 503, thay `redocly diff` bằng `oasdiff breaking`, sửa ví dụ NSwag 404, sửa ETag nội suy byte[] thành chuỗi.
- Cập nhật lên .NET 10: dùng Microsoft.AspNetCore.OpenApi + Scalar làm đường chính (XML comment đã được hỗ trợ sẵn), cập nhật cú pháp Swashbuckle 10 / Microsoft.OpenApi 2.x, đổi mọi đường dẫn net9.0 thành net10.0, dùng gói Redis output cache có sẵn.
- Sửa lỗi đánh số hệ thống: mục '9.2.x' nằm trong bài 9.1, các link 'bài 9.5' lại trỏ file 9.4, v.v. Thống nhất một CSDL (PostgreSQL hoặc SQL Server), một tên DbContext và một envelope phân trang (`items` hay `data`).
- Viết lại 9.13 cho khớp các bài trước, có lời giải và tiêu chí chấm. Gộp phần trùng lặp của 9.11 và 9.12 vào 9.2 và 9.1. Đánh dấu rõ phần 'nâng cao/tuỳ chọn' (GraphQL, webhook, brownout, metric).
- Mỗi bài thêm mục 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường' (gói NuGet cần cài, Docker cho Testcontainers, Nginx cho bài load balancer). Thay các bài tập cần hệ thống production thật (đọc git log 6 tháng, log một tuần) bằng bản làm được trên project CRM mẫu.

### Module 10 - Authentication + Authorization

Phần giải thích khái niệm rất tốt: 401 với 403, ba tầng Claim, AND/OR của policy, IDOR, rotation kèm phát hiện tái sử dụng. Ví dụ CRM xuyên suốt rõ ràng. Nhưng có lỗi kỹ thuật nghiêm trọng. Bài 10.2 cấu hình `MapInboundClaims = false` mà các bài sau vẫn đọc `ClaimTypes.NameIdentifier`/`ClaimTypes.Role`, nên code ghép lại sẽ không chạy. Bài này còn khẳng định sai rằng tắt `ValidateIssuerSigningKey` sẽ bỏ qua kiểm chữ ký. Cửa sổ ân hạn của refresh token lại đòi trả token thô trong khi server chỉ lưu hash. Bitmask `1L << 64` được nói là gây lỗi biên dịch, thực tế thì không. Bài 10.14 bắt làm đúng những gì bài 10.7 cấm. Các bài 10.12 và 10.13 lặp lại phần lớn 10.3 và 10.6.

**Cải thiện quan trọng nhất:**

- Thống nhất chiến lược claim cho cả module: hoặc giữ ánh xạ mặc định, hoặc dùng `MapInboundClaims=false` kèm `NameClaimType="sub"`/`RoleClaimType="role"` và đọc claim bằng tên ngắn. Ghi rõ trên .NET 8+ handler là JsonWebTokenHandler nên `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` không có tác dụng.
- Sửa các khẳng định sai: ValidateIssuerSigningKey không tắt việc kiểm chữ ký; `1L<<64 == 1`; Nginx trả 400 chứ không phải 431; Identity trên .NET 7+ dùng PBKDF2-HMAC-SHA512; đổi vai trò không tự đổi SecurityStamp; AddGoogle là handler OAuth2 gọi userinfo, không validate id_token/nonce.
- Thiết kế lại cửa sổ ân hạn của refresh token cho đúng: không thể trả lại R2 khi chỉ lưu hash. Thêm cơ chế chống race khi rotate (cập nhật có điều kiện `RevokedAt IS NULL` hoặc concurrency token). Thống nhất schema RefreshToken giữa 10.3, 10.12 và 10.14.
- Viết lại 10.14 cho khớp 10.7 (bỏ bitmask và claim quyền trong token), có lời giải và tiêu chí. Gộp phần trùng lặp của 10.12 và 10.13 vào 10.3 và 10.6. Thống nhất tên vai trò (SalesRep/Manager), mã quyền (`customers.delete`) và kiểu Id (string hay Guid).
- Đưa Identity (10.8) lên trước hoặc giới thiệu ngắn trước khi 10.2 dùng `UserManager`. Thêm `.AddSignInManager()` và cấu hình external cookie scheme cho 10.9. Thêm phần chuẩn bị môi trường (gói JwtBearer, Identity.EntityFrameworkCore, user-secrets) và một project mẫu tối thiểu chạy được.

### Module 11 - SignalR

Chưa sẵn sàng để dạy CLB nếu giữ nguyên. Điểm mạnh: nhiều tình huống production thật, có lời giải chi tiết, nêu rõ nguyên tắc 'database là nguồn sự thật, push chỉ để tăng tốc'. Điểm yếu chính: có lỗi kỹ thuật nghiêm trọng (DI scope của Hub, EnableDetailedErrors gửi stack trace, bỏ qua CloseOnAuthenticationExpiration và Stateful Reconnect, bug TTL presence, nói sai thời điểm OnDisconnectedAsync chạy). Bài không có phần dựng môi trường hay một ví dụ 'hello SignalR' chạy được từ đầu đến cuối. Nội dung nặng về quy mô senior (backplane, nginx, k8s) và lặp lại nhiều giữa các bài 11.5/11.13, 11.10/11.11/11.12.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi kỹ thuật cốt lõi: Hub resolve scope theo từng lần gọi (tiêm DbContext vào Hub là đúng), EnableDetailedErrors chỉ gửi thông điệp chứ không gửi stack trace, giới thiệu CloseOnAuthenticationExpiration (.NET 7+) và Stateful Reconnect (.NET 8+), sửa bug TTL của Set presence, sửa khẳng định 'OnDisconnectedAsync không chạy khi mạng đứt'.
- Thêm bài 11.0 hoặc mục mở đầu 11.3 gồm: dotnet new webapi (.NET 10), AddSignalR/MapHub, npm i @microsoft/signalr hoặc thẻ script có ghim phiên bản, một trang HTML client và lệnh chạy thử. Code phải là một Program.cs hoàn chỉnh, định nghĩa sẵn NotificationDto và INotificationClient.
- Thống nhất mô hình CRM xuyên suốt: chỉ một interface INotificationClient, một lớp GroupNames và một định dạng tên nhóm, entity Notification dùng ReadAt (bỏ IsRead), entity Lead khớp với Project 2.
- Gộp hoặc cắt phần trùng lặp (11.13 gần như chép lại 11.5; 11.11 và 11.12 lặp lại 11.3 và 11.10). Chuyển phần nginx, k8s và Azure SignalR sang mục 'đọc thêm' để giảm tải cho sinh viên.
- Viết lại 11.14: bỏ boilerplate và câu hỏi quiz có đáp án đùa (UDP, FTP, SMTP), bổ sung đáp án hoặc lời giải mẫu cho 3 bài thực hành và rubric gắn với Project 2. Sửa đánh số mục (11.x.y bị lệch +1) và nhãn link 'bài N' lệch một số.

### Project 2 — CRM Backend API

Đề bài có khung domain, endpoint và checklist khá rõ, nhưng chưa đủ để sinh viên năm 1-3 tự làm. Bài thiếu hướng dẫn dựng dự án, mốc theo tuần, starter code và lời giải tham khảo. Phần mapping module sai, và dự án yêu cầu EF Core (query filter, override SaveChanges) trong khi EF Core chỉ được dạy ở Module 13. Có nhiều đoạn boilerplate rỗng (Phương pháp học tập, Câu hỏi khởi động, Mini case study 'chọn một use case…'). Một số chỉ dẫn là anti-pattern nhưng không có cảnh báo (InvalidOperationException→422, EF InMemory, secret trong appsettings).

**Cải thiện quan trọng nhất:**

- Thêm phần 'Chuẩn bị & khởi tạo': .NET 10 SDK, dotnet new webapi, danh sách package có phiên bản, SQLite cùng lệnh migration, user-secrets cho JWT key. Kèm repo starter hoặc lời giải tham khảo.
- Chia dự án thành các mốc (Sprint 1: CRUD Customer; Sprint 2: Auth/JWT; Sprint 3: Authorization; Sprint 4: SignalR và test), mỗi mốc có tiêu chí hoàn thành và thời lượng ước tính.
- Sửa bảng mapping Module→Feature theo đúng nội dung các module 8/9/10/11. Thêm mục 'EF Core tối thiểu' hoặc link tới 13.x vì dự án dùng EF trước khi Module 13 dạy.
- Thay các chỉ dẫn sai bằng cách làm đúng và nêu lý do: tạo LeadTransitionException riêng thay vì bắt InvalidOperationException; dùng SQLite in-memory hoặc Testcontainers thay EF InMemory; dùng IHubContext&lt;THub,TClient&gt; thay SendAsync chuỗi; Notification dùng ReadAt cho khớp 11.8; type ProblemDetails theo RFC 9457.
- Xoá boilerplate cuối file và thay bằng một mini case thật (ví dụ: assign Lead nhưng SalesRep đang offline thì sao), sửa '24 endpoint' thành 25.

### Module 12 - SQL Deep Dive

Nội dung SQL phong phú, nhiều thí nghiệm đo bằng logical reads, giải thích cơ chế tốt (SARGable, NOT IN với NULL, MVCC, expand-contract). Tuy vậy module có lỗi kỹ thuật quan trọng: mô hình khoá trong ví dụ deadlock sai (SELECT dưới READ COMMITTED không giữ khoá) và cách bắt lỗi retry sai. UUIDv7 bị khẳng định là tuần tự trên SQL Server. Quy tắc APPLY/ROW_NUMBER bị đảo. Ngưỡng auto-update statistics lỗi thời. Nói EnableRetryOnFailure không retry 1205 là sai. Bài 12.12 yêu cầu 'toàn bộ schema' nhưng 12.1 không định nghĩa Leads, Contacts và Notifications. Module không có hướng dẫn dựng SQL Server/PostgreSQL hay dữ liệu mẫu 1 triệu dòng để làm bài tập. Khối lượng cũng ở mức senior.

**Cải thiện quan trọng nhất:**

- Viết lại phần deadlock (12.6 bài 1, 12.10): SELECT không giữ khoá dưới READ COMMITTED/RCSI. Muốn khoá theo thứ tự cần UPDLOCK hoặc UPDATE theo thứ tự. Bắt DbUpdateException có inner SqlException 1205. Mọi transaction tường minh đi kèm EnableRetryOnFailure phải bọc trong CreateExecutionStrategy. Bỏ câu 'mặc định không retry 1205'.
- Sửa khẳng định UUIDv7 trên SQL Server (12.1, 11.8): uniqueidentifier so sánh theo byte 10-15 nên Guid.CreateVersion7 không tuần tự. Dùng NEWSEQUENTIALID hoặc SequentialGuidValueGenerator của EF, còn UUIDv7 chỉ tuần tự trên PostgreSQL.
- Thêm 12.0 'Chuẩn bị môi trường': docker run SQL Server 2022/2025 và Postgres 17, công cụ (SSMS/Azure Data Studio/DBeaver), script tạo đầy đủ schema CRM (Users, Customers, Leads, Contacts, Notifications) và script sinh 1 triệu dòng chạy được. Thay generate_series bằng GENERATE_SERIES(...).value hoặc bảng số.
- Thống nhất schema với Project 2 (tên cột, kiểu khoá, trạng thái Converted/Won, IsDeleted/DeletedAt) và nêu rõ lý do khi chuyển từ Guid sang INT.
- Sửa các chi tiết sai: quy tắc APPLY và ROW_NUMBER, RANGE n PRECEDING (SQL Server không hỗ trợ), ngưỡng auto-stats động từ 2016, filtered index không cho NOT IN, cột tính toán JSON_VALUE index được mà không cần PERSISTED, thứ tự precedence datetimeoffset. Bỏ boilerplate và quiz đáp án đùa ở 12.12.

### Module 13 - Entity Framework Core

Chưa nên đem dạy CLB nếu chưa sửa. Điểm mạnh: nội dung sâu và gắn với CRM, mỗi bài có bài tập kèm lời giải dài, nhiều bẫy thực tế (N+1, cartesian explosion, lost update, đổi tên cột). Điểm yếu chính: có nhiều lỗi kỹ thuật nghiêm trọng. FindAsync không phải luôn bỏ qua query filter; filter theo tenant đọc từ field của context không hề bị 'đóng băng'; required navigation cộng filter sinh INNER JOIN chứ không ra null; các demo lost update cho kết quả sai; ExecuteUpdate wrapper không biên dịch trên EF Core 10; bài không nhắc named query filter của EF 10. Ngoài ra, lượng kiến thức cấp senior quá dày so với sinh viên năm 1-3, nhãn link và số mục (13.x.y) lệch hàng loạt, và bài 13.14 mâu thuẫn trực tiếp với 13.9 và 13.10.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi kỹ thuật critical đã liệt kê, trước hết ở FindAsync/query filter (13.5, 13.10), lost update (13.8, 13.13), ExecuteUpdate với UpdateSettersBuilder của EF 10 (13.2, 13.7), OwnsMany cho List&lt;string&gt; (13.2), GroupJoin không dịch được (13.6), SQL Server không tự cắt dữ liệu khi thu hẹp cột (13.4, 13.12). Sau đó chạy lại toàn bộ snippet trên .NET 10 / EF Core 10 và đo lại các bảng số liệu (hiện đang ghi là đo trên .NET 9).
- Cập nhật cho EF Core 10: named query filters cùng IgnoreQueryFilters(["name"]), lệnh dotnet ef migrations has-pending-model-changes, migration bundle, UseSeeding/UseAsyncSeeding, complex type ánh xạ sang JSON, primitive collection (List&lt;string&gt; tự lưu thành JSON từ EF 8), và cách đặt tên tham số mới.
- Tách mỗi bài thành phần 'cốt lõi' cho người mới (khái niệm, ví dụ chạy được, lỗi thường gặp) và phần 'nâng cao' tuỳ chọn (interceptor test, analyzer, CI script, IModelCacheKeyFactory, bulk). Thêm bài 0 hướng dẫn dựng môi trường: SQL Server/PostgreSQL bằng Docker, cài dotnet-ef, tạo project CRM mẫu với Customer/Contact/Lead/User thống nhất.
- Thống nhất mô hình CRM: Lead.Status dùng enum hay string, IAuditable với CreatedUtc/UpdatedUtc, soft delete dùng IsDeleted hay DeletedAt, ISoftDelete hay ISoftDeletable, Contact.FullName, int Id hay strongly-typed id. Sửa toàn bộ khoảng 40 nhãn 'bài X.Y' lệch số và đánh lại số mục cho khớp tên bài (13.1.x chứ không phải 13.2.x).
- Viết lại 13.14 cho khớp nội dung module: bỏ yêu cầu IRepository&lt;T&gt;/UoW + MockRepository và InMemory provider, sửa yêu cầu IgnoreQueryFilters cho admin để vẫn giữ cách ly tenant, thêm lời giải hoặc repo mẫu cho lab, thay quiz có phương án nhiễu vô lý, và bỏ các mục boilerplate cùng tiêu đề rỗng '13.15.4'.

### Module 14 - Caching + Background Jobs

Nội dung phong phú, nhiều bẫy vận hành rất thực tế: stampede, khoá cache thiếu tenant, Redis noeviction, job chạy trùng khi scale out, timezone, outbox. Có điều này có giá trị lớn cho mentor. Tuy vậy chưa sẵn sàng để dạy sinh viên vì còn các lỗi kỹ thuật lớn. Bài viết khẳng định HybridCache đồng bộ L1 giữa các instance, trong khi tài liệu Microsoft nói không. Interceptor xoá cache trong SavedChanges không bắt được entry nào. Bài dạy gọi Publish sau SaveChanges với IBus nên outbox mất message. Outbox tự viết dùng lead.Id trước khi lưu. Nhiều lời gọi HybridCache dùng `ct:` không biên dịch. Hangfire ContinueJobWith/misfire bị mô tả sai. Khối lượng kiến thức cấp senior rất lớn, các bài lặp nhau (timezone xuất hiện 3 lần), khuyến nghị mâu thuẫn giữa các bài (TZ container, ngưỡng hit rate, Channel cho email) và bài 14.13 dạy ngược lại chính module.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi critical: phần HybridCache về backplane và đồng bộ L1 (14.4, 14.5), interceptor SavedChanges (14.4), thứ tự Publish/SaveChanges và IPublishEndpoint của MassTransit outbox (14.8), lead.Id = 0 trong outbox tự viết (14.8), ChangeTracker.Clear sau lỗi unique (14.11), chuỗi 'DbContext bị giữ vì entity tracked' (14.2), DropWrite/TryWrite (14.10), byte[].Reverse() trên C# 14 (14.4).
- Biên dịch lại toàn bộ snippet trên .NET 10. Sửa `ct:` thành `cancellationToken:` cho HybridCache, BulkInsertAsync, AddSerializer&lt;MessagePack...&gt;, IAsyncEnumerable.Buffer(count, time), DailyCalendar. Đổi tiêu đề 'HybridCache (.NET 9)' và các image aspnet:9.0 sang .NET 10.
- Thêm hướng dẫn môi trường: docker run cho Redis, RabbitMQ (management) và SQL Server; danh sách package (Hangfire.AspNetCore, Hangfire.SqlServer, Quartz.Extensions.Hosting, AspNetCore.HealthChecks.Redis, Microsoft.Extensions.Http.Resilience). Ghi chú license cho MassTransit v9, AutoMapper, MediatR, EFCore.BulkExtensions và FluentAssertions để sinh viên không vướng khi cài bản mới nhất.
- Thống nhất khuyến nghị giữa các bài: TZ của container (UTC hay Asia/Ho_Chi_Minh), ngưỡng hit rate (50% hay phụ thuộc chi phí miss), Channel có dùng cho email không, chỉ truyền id vào job (kể cả fallback ở 14.13), số request khi retry chồng tầng (27 hay 64). Gộp phần timezone vào một bài, phần còn lại chỉ dẫn link.
- Giảm tải cho sinh viên: đánh dấu rõ phần nâng cao (RedLock, decorrelated jitter, deadline propagation, retry budget, misfire chi tiết, write-behind). Thêm một lab CRM xuyên suốt có lời giải (cache-aside cho danh sách Customer theo tenant, job Hangfire idempotent, Polly cho email). Viết lại 14.13 (bỏ boilerplate, sửa DailyDigestJob cho idempotent và sargable, đề bài theo tag thay vì 'invalidate trang').

### Module 15 - Docker + Deployment

Chưa sẵn sàng dạy nguyên trạng cho thành viên CLB. Kiến thức vận hành sâu và có nhiều tình huống thật (OOM, SIGTERM, ufw/Docker, cardinality). Tuy vậy, bài có nhiều lỗi kỹ thuật ảnh hưởng trực tiếp tới người học: giá trị GC env sai hệ cơ số, image .NET 8+ thường được mô tả là non-root, ShutdownTimeout mặc định sai, script deploy kéo nhầm image, KnownProxies không khớp mạng Docker, Aspire/HybridCache đã lỗi thời. Toàn bộ dùng .NET 9 thay vì .NET 10, thiếu phần cài Docker, và độ sâu ở mức senior/SRE nên quá tải với sinh viên năm 1-3.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi chính xác kỹ thuật (xem findings critical): DOTNET_GCHeapHardLimitPercent dạng hex, non-root chỉ mặc định ở chiseled, ShutdownTimeout mặc định 30s, script deploy.sh, KnownProxies với mạng Docker, Password_File trong connection string, HybridCache không invalidate L1 trên instance khác, đặc điểm của Aspire 13.
- Nâng toàn bộ tag image và CI lên .NET 10 (sdk:10.0, aspnet:10.0-noble-chiseled, dotnet-version 10.0.x), cập nhật phiên bản action, và thống nhất số liệu kích thước image (110/68/50 MB đang mâu thuẫn).
- Thêm bài 15.0 'Chuẩn bị môi trường': cài Docker Desktop + WSL2, máy Mac Apple Silicon với SQL Server (hoặc dùng PostgreSQL), lệnh kiểm tra, cách dùng VPS miễn phí hoặc credit Azure for Students.
- Tách 'lõi bắt buộc' (15.1-15.4, 15.6 rút gọn) và 'nâng cao/đọc thêm' (OOM sâu, CFS throttling, mutation của cgroup, tail sampling, K8s). Gộp ba lần lặp chủ đề shell form, exec form và preStop (15.2, 15.9, 15.13) thành một chỗ.
- Sửa đánh số mục (15.2.x trong bài 15.1...), sửa 97 link 'bài X.Y' trỏ lệch một bài, và viết lại 15.14: bỏ boilerplate, sửa yêu cầu mâu thuẫn (tag latest, HTTPS trong Kestrel, .env cho secret), thêm lời giải/tiêu chí cho lab.

### Project 3 — Production CRM Platform

Chưa dạy được. Đây là bản đặc tả với code mẫu rời rạc, không phải một project có lộ trình. Code mẫu có lỗi nghiêm trọng như query filter đa tenant rò rỉ dữ liệu, healthcheck SQL Server luôn fail, thiếu DbSet và schema lệch entity. Bài cũng mâu thuẫn với module 15 (publish cổng 1433, tag latest, không có permissions) và còn nhiều đoạn boilerplate rỗng. Điểm mạnh là phạm vi tính năng sát CRM thật (multi-tenant, approval, audit, export) và có checklist nộp bài.

**Cải thiện quan trọng nhất:**

- Sửa global query filter để tham chiếu thuộc tính của DbContext (ví dụ `CurrentTenantId`) thay vì tham số `tenant` được capture lúc build model. Thêm integration test 'tenant B không thấy dữ liệu tenant A' làm test mẫu bắt buộc.
- Chia project thành các milestone (M1 schema + migration + seed, M2 multi-tenant + auth, M3 approval + audit, M4 cache + jobs, M5 SignalR + export, M6 Docker + CI + k6), mỗi milestone có tiêu chí hoàn thành, starter repo và lời giải tham khảo.
- Đồng bộ compose và CI với module 15: dùng MSSQL_SA_PASSWORD, mssql-tools18 kèm -C, không publish 1433, bỏ `version:`, tag theo sha, `permissions: packages: write`, .NET 10. Cung cấp nginx.conf.
- Thống nhất schema SQL với entity C# (enum lưu dạng string, cột Source, Email nullable, DbSet Tenants/AppUsers, ApprovalRequest đa hình hay có DealId) và chọn một nguồn sự thật là EF migrations.
- Xoá các mục boilerplate 'Phương pháp học tập', 'Câu hỏi khởi động', 'Mở rộng và đào sâu', 'Mini case study', 'Ví dụ thực tế nhanh' rỗng. Thay bằng mục 'Lỗi thường gặp' cụ thể (job không có HttpContext nên TenantId rỗng, cache L1 lệch giữa các instance...).

### Module 16 - Clean Architecture

Nội dung tư duy kiến trúc tốt và trung thực: bài nêu cả cái giá của Clean Architecture, phân biệt đường đọc với đường ghi, và đặt câu hỏi khi nào kiến trúc là thừa. Tuy vậy, để dạy CLB còn một số vấn đề. Code mẫu không nhất quán giữa các bài (Money vừa là class vừa là struct, Lead.Create và Lead.Tao, Result.Success và ThanhCong, LeadId với int/Guid, Value/Won lúc thuộc Lead lúc thuộc Deal). Có lỗi biên dịch và lỗi sự kiện (giấy phép MediatR từ v13, IDomainEvent không kế thừa INotification, Guid v7 trên SQL Server). Nhiều bài lặp lại cùng kịch bản 500 triệu, grep và ratchet. Bài tập giả định học viên có codebase doanh nghiệp lớn.

**Cải thiện quan trọng nhất:**

- Viết một 'mô hình CRM chuẩn của module' dùng chung cho mọi bài: Lead (không có Value/Won), Deal (Value, Won), Money (một định nghĩa duy nhất, có toán tử), Result (một API, một ngôn ngữ đặt tên), LeadId. Cung cấp kèm repo mẫu biên dịch được trên .NET 10 để mọi snippet copy là chạy.
- Sửa các lỗi sự kiện: MediatR chuyển sang thương mại từ v13 (v12.5 là bản Apache cuối, có Community edition miễn phí); IDomainEvent phải kế thừa INotification; dispatch domain event trong transaction không ngăn email gửi sai; Guid.CreateVersion7 không tuần tự theo thứ tự sắp xếp uniqueidentifier của SQL Server; FluentAssertions v8 cần licence.
- Giới thiệu MediatR và FluentValidation trước khi dùng, hoặc thêm ghi chú 'xem 16.6/16.7' ở 16.2-16.4. Hiện các bài này dùng IRequestHandler, AbstractValidator, ISender mà chưa giải thích.
- Giải quyết các chỉ dẫn mâu thuẫn: validator có được gọi DB không, Result hay exception cho bất biến, mã 400 hay 422, test handler có dùng fake repo không (16.16 yêu cầu fake repo trong khi 16.9 cấm mock repo), dispatch event trước hay sau commit, tách khi 'lần thứ hai' hay 'lần thứ ba'.
- Cắt lặp và giảm tải: gom kịch bản ngưỡng 500 triệu, grep và ratchet (16.1, 16.2, 16.4, 16.10, 16.11, 16.15) về một case study. Thay bài tập 'trên dự án thật của bạn' bằng một repo legacy mẫu do CLB cung cấp. Sửa đánh số mục (16.2.x trong 16.1...), các link lệch một bài và boilerplate ở 16.16.

### Module 17 - Distributed Systems

Nội dung có chiều sâu thực chiến hiếm thấy: dual write, outbox, inbox, chống trùng bằng unique constraint, retry có jitter, CDC, DLQ, kèm sự cố có số liệu. Tuy vậy, chưa nên đưa module này vào dạy CLB khi chưa sửa. Có nhiều lỗi kỹ thuật khiến code không chạy hoặc dạy sai: dispatcher READPAST không có transaction, Type.GetType với nameof, ExecuteUpdate được cho là chung transaction, khẳng định sai về System.Text.Json và bảng tương thích, thứ tự UseScheduledRedelivery, MassTransit giới thiệu poison message quay vòng vô hạn. Khối lượng ở mức senior, quá dày với sinh viên năm 1-3. Bài nào cũng thiếu mục kiến thức tiên quyết và hướng dẫn dựng môi trường. Tên định danh lẫn Việt/Anh, mỗi bài một kiểu entity, đánh số mục lệch và 71 nhãn link nội bộ sai số bài.

**Cải thiện quan trọng nhất:**

- Sửa ngay các lỗi critical làm code không chạy hoặc dạy sai: dispatcher ở 17.7 (thiếu transaction, IPublishEndpoint scoped, Type.GetType với nameof), interceptor ở 17.3 publish domain event chứa entity, 'cùng transaction' với ExecuteUpdate ở 17.10, poison message ở 17.13, khoá idempotency invoice.Id ở 17.12, khẳng định về System.Text.Json và bảng tương thích ở 17.1/17.11.
- Thống nhất một bộ hợp đồng CRM xuyên module: một bảng outbox (OutboxMessages hoặc Outbox, chọn một), một bảng inbox, một định nghĩa LeadConvertedIntegrationEvent/LeadDaChotV1 duy nhất. Chọn một quy ước tên (khuyến nghị: định danh tiếng Anh, chú thích tiếng Việt) rồi áp dụng cho mọi bài.
- Thêm mục 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường' cho từng bài: docker-compose RabbitMQ/SQL Server/Kafka đã kiểm chứng, package NuGet kèm phiên bản cho .NET 10, chạy được bằng một lệnh. Tách phần nâng cao (CDC/Debezium, schema registry, Marten, saga state machine) thành nhánh 'đọc thêm' để giảm tải cho sinh viên.
- Bổ sung khái niệm nền mà README hứa nhưng chưa dạy: consistency models/CAP, fallacies of distributed computing, ACK/NACK cơ bản của broker. Viết lại 17.14 theo đúng chuẩn (bỏ boilerplate, có đáp án ẩn, có lab mẫu và lời giải).
- Đánh số lại mục (17.1.x thay vì 17.2.x…) và sửa toàn bộ nhãn link 'bài X.Y' cho khớp file đích. Cập nhật thông tin giấy phép MassTransit v9 và giới thiệu các lựa chọn MIT (Wolverine, Rebus) cho người học.

### Module 18 - Microservices

Lập trường đúng và rất có giá trị cho người học: 'khi nào không nên', modular monolith trước, đo bằng số liệu, gộp service là hợp lệ. Các bài về gateway, observability, identity, probe có nhiều mẹo vận hành thật. Module dùng được cho buổi thảo luận của CLB sau khi sửa một số lỗi kỹ thuật: rate limiter 'per-user' thực chất là global, timeout YARP cấu hình sai chỗ, HybridCache.GetOrDefaultAsync không tồn tại, WithReference không đảm bảo thứ tự khởi động, docker restart không xử lý unhealthy, timeline sự cố probe tự mâu thuẫn. Các bài còn mâu thuẫn nhau ở vài điểm: readiness có gọi service khác hay không, Notification có phải 'tách theo tầng kỹ thuật' hay không, dùng chung database có còn 80% lợi ích hay không. Ví dụ và quy mô (đội 8-10 kỹ sư, K8s, Prometheus/Grafana) xa với sinh viên, và chưa có lab hướng dẫn từng bước.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi API và cấu hình: rate limiter theo user (AddPolicy với PartitionedRateLimiter), timeout YARP (HttpRequest/ActivityTimeout của cluster thay cho AddHttpClient("yarp")), transform X-Forwarded, HybridCache GetOrDefaultAsync, Aspire WaitFor, AddAsyncCheck, docker compose healthcheck/restart, metric time_in_queue.
- Hoà giải các mâu thuẫn giữa các bài: readiness có/không kiểm tra service khác (18.9), Notification là 'tầng kỹ thuật' hay 'ứng viên tách số một' (18.2/18.7/18.9), dùng chung database ở bước Strangler 4 (18.2), p99 khi đúng 1% request chậm (18.5), Order dùng ExecuteUpdate trên bảng tồn kho của Inventory (18.7).
- Xây một lab xuyên module, chạy được bằng .NET Aspire 9/13 trên .NET 10: Gateway YARP + Sales.Api + Billing.Api + RabbitMQ + OTel dashboard. Có hướng dẫn từng bước, lời giải mẫu và tiêu chí chấm, thay cho 18.13 đang là boilerplate.
- Sửa timeline sự cố probe ở 18.12 cho khớp số học (failureThreshold × period) và sửa ví dụ chống trùng ở 18.11 vốn có thể làm mất email (commit trước rồi mới gửi).
- Giảm tải cho sinh viên: đánh dấu rõ phần 'senior/đọc thêm' (service mesh, Orleans, RLS, tail sampling, cardinality). Thêm sơ đồ CRM tổng thể của các service được nhắc tới và cập nhật lên phiên bản .NET 10 (bỏ các mốc '.NET 9.0.203').

### Module 19 - Performance Engineering

Nội dung sâu, có số đo thật, mạch 'đo trước, sửa sau' rõ và nhiều bài tập có lời giải chi tiết. Đây là chất liệu tốt cho mentor. Tuy vậy, chưa nên dạy thẳng cho thành viên CLB năm 1-3. Có nhiều sai kỹ thuật dễ khiến người học hiểu sai: HybridCache được mô tả là chống stampede xuyên instance và tự phát tin xoá L1; bài nói .NET không biết giới hạn bộ nhớ của container; mảng 64 KB bị gán là vào LOH; khẳng định span không dùng được trong async; profile cpu-sampling đã bị gỡ; sp_getapplock viết sai; Dockerfile cài tool trên image runtime. Mọi số đo đều chạy trên .NET 9. Đánh số mục và chữ trên link lệch một bậc trong toàn module (bài 19.1 có mục 19.2.x). Không bài nào có mục tiên quyết hay hướng dẫn dựng môi trường. Bài tập dựa nhiều vào production, Kubernetes và Prometheus, sinh viên không có. Bài 19.13 gần như toàn văn mẫu.

**Cải thiện quan trọng nhất:**

- Sửa các lỗi kỹ thuật critical: HybridCache (19.5) phải nói rõ chống stampede chỉ trong một tiến trình và RemoveAsync không xoá L1 ở instance khác. Viết lại phần GC/OOM (19.10, 19.12) theo đúng mặc định: trong container, runtime tự đặt heap hard limit bằng 75% giới hạn bộ nhớ, và bổ sung DATAS (bật mặc định với Server GC từ .NET 9). Sửa ví dụ 64 KB/LOH, khẳng định ref struct trong async (C# 13+), MemoryExtensions.Split (.NET 9+), sp_getapplock và Dockerfile.
- Nâng toàn bộ code và số đo lên .NET 10 / C# 14 (RuntimeMoniker.Net10_0, setup-dotnet 10.0.x, image aspnet:10.0). Đổi `--profile cpu-sampling` thành `dotnet-sampled-thread-time`. Cập nhật tên counter theo meter System.Runtime mới. Mỗi bảng kết quả ghi rõ phiên bản đã đo.
- Đánh số lại các mục cho khớp tên file (19.1.x trong bài 19.1, ...) và sửa chữ trên mọi link nội bộ ('bài 19.4' đang trỏ tới 19.3, 'bài 13.7' trỏ tới 13.6, ...).
- Thêm vào mỗi bài phần 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường' (dotnet tool, k6, SQL Server/PostgreSQL và Redis bằng docker compose). Tách bài tập thành hai mức: mức CLB chạy được trên laptop với SQLite/Docker, và mức nâng cao cần production/Kubernetes, đánh dấu 'đọc thêm'.
- Viết lại 19.13 thành bài ôn thật: 10-15 câu tự kiểm tra có đáp án ẩn trong &lt;details&gt;, lab trên CRM mẫu, bỏ các mục văn mẫu ('Bài tập tổng hợp', 'Kết luận' chung chung). Gom các kỹ thuật cấp senior (fencing token, parameter sniffing, PgBouncer, GC tuning) vào phần 'nâng cao' để giảm tải cho sinh viên.

### Final Project — Enterprise CRM / ERP Platform

Có khung mục tiêu, tiêu chí theo cấp và rubric 80 điểm hợp lý về hướng (vài luồng end-to-end sâu, ADR, CI). Tuy nhiên, khoảng một nửa file là văn mẫu hoặc mục để trống (Phương pháp học tập, Câu hỏi khởi động, Mở rộng và đào sâu, Mini case study, Ví dụ thực tế nhanh). Phạm vi quá rộng so với nhóm sinh viên: thanh toán, omnichannel, microservice, OpenTelemetry. Không có thời lượng tổng, không có repo khởi đầu hay mô hình domain mẫu, không có hướng dẫn làm nhóm và mốc review với mentor. Tên entity (Account, Contact, Opportunity) lệch với phần còn lại của khóa (Customer/KhachHang, Deal). Chưa sẵn sàng làm đề capstone cho CLB.

**Cải thiện quan trọng nhất:**

- Xoá các mục văn mẫu và mục rỗng. Thay bằng một mini case thật, ví dụ luồng 'convert lead → tạo subscription draft qua outbox' có sơ đồ, hợp đồng event và tiêu chí kiểm thử.
- Định rõ phạm vi theo quy mô CLB: một 'gói tối thiểu' cho nhóm 3-4 sinh viên trong 6-8 tuần, mỗi tuần có mốc demo hoặc review với mentor, kèm danh sách phần được phép stub (SMS, payment).
- Cung cấp repo khởi đầu hoặc mô hình domain mẫu và thống nhất tên entity với Project 2/3 và Module 19 (Lead, Customer, Deal, Activity). Ghi rõ .NET 10, EF Core 10, Docker Compose.
- Đồng bộ rubric với tiêu chí Pass (unit test và integration test đang nằm ngoài rubric). Thêm tiêu chí hiệu năng từ Module 19 (test đếm truy vấn, đo p95/p99 trước và sau). Bỏ câu 'đủ nền để học module kế' vì đây là bài cuối.
- Thêm template ADR, template docs/architecture.md và ví dụ README 'Decision log' mẫu để sinh viên có điểm bắt đầu.

### Lộ trình .NET Backend: From Zero → Senior (Backend-first)

Viết mạch lạc, có sơ đồ phụ thuộc kiến thức và trục CRM xuyên suốt. Đây là trang mở đầu tốt. Còn thiếu thông tin thực dụng cho CLB: phiên bản .NET và cách chuẩn bị môi trường, cách học kết hợp tự học với buổi sinh hoạt, link tới glossary. Mốc thời gian 'Tuần 15+' cho mức Senior với người chưa biết lập trình là không thực tế.

**Cải thiện quan trọng nhất:**

- Thêm mục 'Chuẩn bị môi trường': .NET 10 SDK (LTS hiện hành), IDE (VS 2026, Rider hoặc VS Code + C# Dev Kit), Docker Desktop, Git. Ghi rõ toàn khóa nhắm .NET 10 / C# 14.
- Thêm mục 'Dùng lộ trình trong CLB': tự học theo bài, buổi live-coding mỗi tuần, các mốc review dự án, và đánh dấu phần nào là bắt buộc, phần nào là nâng cao (giai đoạn 5).
- Điều chỉnh bảng thời gian cho thực tế với người mới hoàn toàn: tách giai đoạn 5 thành 'đọc hiểu' và 'thực hành sâu'. Nói rõ 'Senior' ở đây là mục tiêu kiến thức, không phải kỳ vọng sau một học kỳ.
- Thêm link tới glossary.md và giải thích ngắn các ký hiệu P1/P2/P3 ngay đầu trang.

### Bảng thuật ngữ

Định nghĩa ngắn, đúng trọng tâm, có link tới bài đầy đủ và link đều hợp lệ. Nhưng bảng còn thiếu nhiều thuật ngữ xuất hiện dày ở Module 19 và ở các module đầu mà sinh viên cần tra. Có một vài điểm lệch với nội dung bài: định nghĩa Distributed lock, ProblemDetails dẫn RFC 7807 đã bị thay.

**Cải thiện quan trọng nhất:**

- Bổ sung thuật ngữ của Module 19 và giai đoạn 5: p50/p95/p99, SLO, thread pool starvation, sync-over-async, cache stampede, keyset pagination, parameter sniffing, execution plan/index, LOH/GC gen, bounded context, ADR, CQRS, noisy neighbour.
- Bổ sung thuật ngữ nền cho người mới: Task/async-await, interface, record, migration, REST/HTTP status code, Docker image/container, CI.
- Sửa Distributed lock cho khớp bài 19.7: khoá phân tán giảm làm trùng, không bảo đảm tuyệt đối. Sửa ProblemDetails: RFC 9457 (thay RFC 7807).
- Thêm chỉ mục chữ cái hoặc nhóm theo giai đoạn, và gợi ý thuật ngữ tiếng Việt tương đương cho mỗi mục.

## 3. Danh sách lỗi theo module

Mỗi lỗi ghi mức độ sau phản biện, tiêu chí, vị trí, mô tả, bằng chứng, cách sửa và ghi chú của người phản biện (nếu có).

### Module 1 - Programming Logic

- **critical** · đầy đủ · [1.1-variables-and-data-types.md:1](../lessons/stage-01-foundation/module-01-programming-logic/1.1-variables-and-data-types.md): Module 1 là điểm bắt đầu cho người chưa từng viết C#, nhưng không có bài nào hướng dẫn cài .NET SDK, IDE, tạo project hay chạy code. Lệnh `dotnet new console` lần đầu xuất hiện ở bài 2.13, cuối Module 2. Bài 1.1 lại yêu cầu 'chạy thử đoạn này' và 'project console rỗng'.
  - Bằng chứng: `Bài 1 và 2 chạy được trong một project console rỗng; bài 3 cần một dự án có sẵn`
  - Sửa: Thêm bài 1.0 'Chuẩn bị môi trường': cài .NET 10 SDK, VS Code + C# Dev Kit (hoặc Rider/VS 2026), `dotnet --version` (kỳ vọng 10.0.x), `dotnet new console -n CrmPlayground`, giải thích top-level statements, cách chạy nhanh một file bằng `dotnet run app.cs` (.NET 10), bật Nullable. Đưa phần 'Bài 3 — Tạo Project .NET đầu tiên' của 2.13 về đây.
- **critical** · chính xác · [1.11-review-and-assessment.md:205](../lessons/stage-01-foundation/module-01-programming-logic/1.11-review-and-assessment.md): Đáp án quiz sai và mâu thuẫn với bài 1.2. Trong C#, thiếu `break` ở một case có lệnh là lỗi biên dịch CS0163, không có chuyện 'rơi' xuống case dưới.
  - Bằng chứng: `> **Đáp án:** B — không 'break' sẽ “rơi” xuống case dưới (trừ pattern mới).`
  - Sửa: Sửa đáp án: 'B — kết thúc case. C# không cho phép fall-through ngầm: thiếu break/return/throw/goto case là lỗi biên dịch CS0163 (xem 1.2).' Có thể đổi câu hỏi thành 'Thiếu break trong một case của C# thì sao?' với đáp án 'Lỗi biên dịch'.
- **critical** · chính xác · [1.8-advanced-notes.md:441](../lessons/stage-01-foundation/module-01-programming-logic/1.8-advanced-notes.md): Khẳng định sai: từ C# 5 chỉ biến lặp của `foreach` mới được tạo mới ở mỗi vòng. Biến `i` của `for` vẫn là MỘT biến dùng chung, nên cả ba truy vấn đều chạy với i = 3 và trả về kết quả giống nhau. Đây chính là cái bẫy mà ví dụ muốn cảnh báo, nhưng bài lại bảo là an toàn.
  - Bằng chứng: `Trong C# hiện đại, 'i' của 'for' được bắt đúng giá trị từng vòng, nên ví dụ này an toàn`
  - Sửa: Sửa thành: 'Với `for`, `i` là một biến dùng chung; khi truy vấn chạy, i đã bằng 3 nên cả ba truy vấn đều lọc x &gt; 3. C# 5 chỉ sửa hành vi này cho `foreach`.' Cho in kết quả để sinh viên thấy, và chỉ cách sửa: `int nguong = i; cacTruyVan.Add(ds.Where(x => x > nguong));`. Sửa luôn chú thích dòng 438.
- **major** (ban đầu critical) · chính xác · [1.1-variables-and-data-types.md:245](../lessons/stage-01-foundation/module-01-programming-logic/1.1-variables-and-data-types.md): Lời giải khai báo `class Customer` và `struct Point` trước các câu lệnh top-level. Dán vào Program.cs sẽ bị lỗi biên dịch CS8803 (Top-level statements must precede namespace and type declarations). Người mới không hiểu vì sao lời giải mẫu không chạy.

  ```text
  class Customer { public string Name { get; set; } = ""; }
  struct Point   { public int X { get; set; } }
  
  var c1 = new Customer { Name = "An" };
  ```

  - Sửa: Đặt các câu lệnh lên trước, khai báo class/struct ở cuối file. Thêm một ghi chú chung cho cả module: 'Trong Program.cs dùng top-level statements, mọi khai báo kiểu phải nằm sau code chạy'. Áp dụng cho 1.2 (enum LeadStatus dòng 318), 1.5 (CustomerKeyCls dòng 246) và các snippet tương tự.
  - Phản biện (adjusted): Lỗi có thật: đã chạy thử trên SDK 10.0.401, khai báo class trước top-level statement cho ra error CS8803. Hạ xuống major vì thông báo lỗi rõ ràng và sửa một dòng là xong. Cách sửa đề xuất giữ nguyên, kể cả việc áp dụng cho 1.2 và 1.5.
- **major** · chính xác · [1.10-quick-real-world-example.md:455](../lessons/stage-01-foundation/module-01-programming-logic/1.10-quick-real-world-example.md): Lệnh đếm vòng lặp lồng không hoạt động: `grep -A5` in ra từng dòng riêng, nên mẫu `foreach.*foreach` trên một dòng gần như không bao giờ khớp. Kết quả '18' trình bày như kết quả thật là không tái hiện được. Thêm nữa, sinh viên trên Windows không có grep/wc nếu không dùng Git Bash.
  - Bằng chứng: `grep -rn -A5 "foreach" --include=*.cs src/ | grep -c "foreach.*foreach"`
  - Sửa: Dùng mẫu nhiều dòng: `rg -U --count 'foreach[^{]*\{[^}]*foreach' --type cs src/`, hoặc hướng dẫn dùng tính năng 'Find in Files' với regex của VS Code. Ghi rõ output '18/31/7' là ví dụ minh hoạ. Đổi 'dự án thật' thành repo CRM mẫu của khoá.
- **major** · cấu trúc · [1.11-review-and-assessment.md:3](../lessons/stage-01-foundation/module-01-programming-logic/1.11-review-and-assessment.md): Bài ôn tập là boilerplate: mục tiêu chung chung ('Nắm được ý chính của bài'), có heading rỗng '1.12.5 — Kiểm tra & Thực hành (100 điểm)', các mục 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' viết theo mẫu. Bốn bài thực hành không có lời giải hay test mong đợi (trừ Bài 2). Quiz chỉ có 5 câu dễ, đáp án hiện sẵn ngay dưới câu hỏi.

  ```text
  - Nắm được ý chính của bài và mối liên hệ với module. ... ### 1.12.5 — Kiểm tra & Thực hành (100 điểm)
  
  ### 1.12.6
  ```

  - Sửa: Viết lại: mục tiêu đo được; 12–15 câu quiz phủ các bẫy chính của module (decimal, tham chiếu, guard clause, sửa collection khi duyệt, N+1, HashSet, deferred execution), đáp án đặt trong &lt;details&gt;; lời giải mẫu và bộ test kỳ vọng cho Bài 1–4 (Bài 1 nêu rõ 10.0/0 trả Infinity chứ không ném lỗi); xoá heading rỗng và các mục boilerplate cuối bài.
- **major** · dễ hiểu · [1.2-conditions.md:176](../lessons/stage-01-foundation/module-01-programming-logic/1.2-conditions.md): Bài 1.2 (bài thứ hai cho người mới) dùng property pattern, type pattern trên CardPayment/BankTransfer/CashPayment, `Customer.IsVip`, Dictionary, `private static readonly`, `public decimal` method. Đây là những khái niệm OOP và collection chưa được dạy (method ở 1.4, collection ở 1.5, class ở Module 4) và các kiểu trên không được định nghĩa ở đâu.

  ```text
  decimal fee = payment switch
  {
      CardPayment c     => c.Amount * 0.022m,
      BankTransfer      => 11_000m,
  ```

  - Sửa: Tách 1.2 thành phần cốt lõi (if/else, toán tử so sánh/logic, switch, switch expression trên int/string/enum) và một khung 'Xem trước – học kỹ ở Module 4'. Hoặc cung cấp file `CrmModels.cs` định nghĩa sẵn Customer, Order, Payment, kèm 3–4 dòng giải thích 'class là gì' trước khi dùng.
- **major** · thực tế · [1.3-loops.md:300](../lessons/stage-01-foundation/module-01-programming-logic/1.3-loops.md): Bài tập 2 của bài vòng lặp, Module 1, yêu cầu dựng DbContext với SQLite, EF Core logging và async, nhưng không hướng dẫn cài package, viết entity, seed dữ liệu. Thiếu cả `using Microsoft.Extensions.Logging` cho LogLevel. Sinh viên mới học vòng lặp gần như không làm được.
  - Bằng chứng: `Dựng một 'DbContext' với logging ở mức 'Information', viết vòng lặp N+1 như mục 1.4.5 với 50 bản ghi`
  - Sửa: Đánh dấu bài này là 'Nâng cao — làm lại sau Module 13', hoặc cung cấp project mẫu dựng sẵn (lệnh `dotnet add package Microsoft.EntityFrameworkCore.Sqlite`, entity Order/Customer, seed 50 dòng). Với Module 1, thay bằng bài mô phỏng: hàm `FakeDb.GetCustomer(id)` có `Thread.Sleep(5)` và biến đếm số lần gọi.
- **major** · chính xác · [1.3-loops.md:358](../lessons/stage-01-foundation/module-01-programming-logic/1.3-loops.md): EF Core không có cơ chế phát hiện và báo lỗi N+1 trong vòng lặp. Ví dụ trong bài là các truy vấn tường minh, không phải lazy loading. Thứ EF Core có là cảnh báo/lỗi cho lazy loading sau khi context bị dispose, hoặc tắt lazy loading.
  - Bằng chứng: `EF Core có thể được cấu hình để **báo lỗi** khi phát hiện truy vấn tải lười trong vòng lặp.`
  - Sửa: Sửa thành: 'EF Core không tự phát hiện N+1. Cách phòng: không bật lazy loading proxies, dùng Include/projection, theo dõi số lệnh SQL mỗi request bằng log hoặc interceptor, và viết test đếm số truy vấn.'
- **major** · đầy đủ · [1.4-functions-methods.md:9](../lessons/stage-01-foundation/module-01-programming-logic/1.4-functions-methods.md): Mục tiêu bài hứa dạy `params` nhưng nội dung không có mục nào về `params`. Bài cũng thiếu những kiến thức nền mà sinh viên cần: cách khai báo và gọi hàm static trong Program.cs, truyền tham số theo giá trị, overloading, đệ quy cơ bản (base case). Thay vào đó bài dùng `_logger`, `_db`, SqlConnection, async Task, xUnit.
  - Bằng chứng: `- Viết hàm với tham số mặc định, tham số đặt tên và 'params', và biết khi nào mỗi cái gây hại.`
  - Sửa: Thêm mục 'params' (ví dụ `decimal Sum(params decimal[] amounts)`, C# 13 có thêm `params ReadOnlySpan<T>`) và mục 'Khai báo, gọi hàm, truyền theo giá trị, overload' với ví dụ chạy được trong console. Đổi các ví dụ dùng `_db`/`_logger`/SqlConnection sang dạng giả lập, hoặc gắn nhãn 'minh hoạ, sẽ học ở Module 7/13'.
- **major** · nhất quán · [1.4-functions-methods.md:261](../lessons/stage-01-foundation/module-01-programming-logic/1.4-functions-methods.md): Bài 1.1 dặn đặt tên bằng tiếng Anh theo quy ước .NET, nhưng lời giải ở đây dùng định danh tiếng Việt có dấu, và còn đưa nó ra làm ví dụ 'tên tốt'. Lỗi lặp ở 1.8 (danhSachLead, TrangThaiLead.DangXuLy), 1.9 (TinhHoaHongToanBo, doanhSo), 1.10 (KhachHang, DonHang, BaoCao), 2.10 và 2.12 (noiDung, Preflight_khong_bi_chan...).
  - Bằng chứng: `private static bool ĐủĐiềuKiệnKháchThânThiết(Customer c) =>`
  - Sửa: Đổi thành `IsEligibleForLoyaltyProgram(Customer c)`. Đồng bộ toàn module sang định danh tiếng Anh (Lead.Status, LeadStatus.InProgress, CalculateCommission...), giữ tiếng Việt trong chú thích và chuỗi hiển thị.
- **major** (ban đầu critical) · chính xác · [1.5-arrays-and-lists.md:200](../lessons/stage-01-foundation/module-01-programming-logic/1.5-arrays-and-lists.md): Code dùng `Stopwatch` nhưng không có `using System.Diagnostics;`. Implicit usings của console app không gồm System.Diagnostics, nên code lỗi CS0103. Lỗi này lặp ở 1.5 Bài 3, 1.10 Bài 1 (dòng 214), 2.2 Bài 3 (dòng 250), 2.7 Bài 3 (dòng 302, kèm thiếu System.Security.Cryptography và System.Text), 2.9 Bài 2 (dòng 239, kèm thiếu System.Text.Json), 2.1 và 2.11 (middleware).
  - Bằng chứng: `var sw = Stopwatch.StartNew();`
  - Sửa: Thêm dòng `using System.Diagnostics;` (và các using cần thiết khác) ở đầu mọi lời giải có Stopwatch, SHA256, Rfc2898DeriveBytes, JsonSerializer. Nên đính kèm file .cs đầy đủ, chạy được cho mỗi bài đo.
  - Phản biện (adjusted): Lỗi có thật: chạy thử `Stopwatch.StartNew()` trên .NET 10 không có using thì ra CS0103. Implicit usings của Microsoft.NET.Sdk và Sdk.Web không gồm System.Diagnostics, System.Security.Cryptography hay System.Text.Json. Grep xác nhận 9 snippet (1.5, 1.10, 2.1, 2.2, 2.7, 2.9, 2.11) đều thiếu, riêng 2.13 có ghi using. Hạ xuống major vì IDE gợi ý sửa ngay (Ctrl+.). Vẫn nên thêm using vào mọi lời giải.
- **major** · chính xác · [1.5-arrays-and-lists.md:365](../lessons/stage-01-foundation/module-01-programming-logic/1.5-arrays-and-lists.md): Câu trả lời ngầm cho rằng TryGetValue giúp `Dictionary` an toàn khi nhiều luồng cùng ghi. Thực tế `Dictionary<K,V>` không thread-safe: đọc khi có luồng khác đang ghi có thể hỏng cấu trúc hoặc lặp vô hạn, bất kể dùng API nào.
  - Bằng chứng: `Ngoài nhanh hơn, nó còn tránh được lỗi khi khoá bị xoá giữa hai lần tra trong môi trường nhiều luồng.`
  - Sửa: Bỏ vế này, thay bằng: 'Lưu ý: Dictionary không an toàn khi có nhiều luồng cùng ghi; khi đó dùng ConcurrentDictionary (TryGetValue/GetOrAdd).'
- **major** · dễ hiểu · [1.8-advanced-notes.md:16](../lessons/stage-01-foundation/module-01-programming-logic/1.8-advanced-notes.md): LINQ và lambda chỉ được giới thiệu ở 1.8, nhưng đã được dùng dày đặc từ 1.3 (Where/Select/ToDictionaryAsync), 1.4 (orders.Sum(o =&gt; o.Total)), 1.5 (RemoveAll(c =&gt; ...), GroupBy...). Người học gặp cú pháp `=>` mà không có lời giải thích nào trước đó.
  - Bằng chứng: `### 1.9.1 — LINQ: học sớm`
  - Sửa: Chuyển phần 'LINQ cơ bản và lambda' lên ngay sau 1.5, hoặc thêm một khung 'Đọc nhanh: lambda `x => x.Total` là gì' ở lần đầu xuất hiện (1.3.3) và trỏ tới bài LINQ.
- **major** · đầy đủ · [1.9-mini-case-study.md:305](../lessons/stage-01-foundation/module-01-programming-logic/1.9-mini-case-study.md): Lời giải dùng xUnit [Theory]/[InlineData] và FluentAssertions `.Should()` nhưng không hướng dẫn tạo test project hay thêm package. Hàm `TinhHoaHong`, `TinhLuyTien`, `TranMoiThang` cũng không được định nghĩa (code chính tên là CalculateCommission). Ngoài ra, FluentAssertions từ v8 dùng giấy phép thương mại.
  - Bằng chứng: `(tai - duoi).Should().BeLessThan(1_000,`
  - Sửa: Thêm khung 'Tạo test project: dotnet new xunit -n Crm.Tests; dotnet add reference ...', dùng Assert của xUnit (hoặc Shouldly) thay cho FluentAssertions, và đổi tên hàm cho khớp CalculateCommission/CalculateFlatCommission/CommissionCap.
- **minor** · nhất quán · [1.1-variables-and-data-types.md:17](../lessons/stage-01-foundation/module-01-programming-logic/1.1-variables-and-data-types.md): Số mục bị lệch một bậc trong toàn module: bài 1.1 đánh số 1.2.x, bài 1.2 đánh số 1.3.x, ..., bài 1.11 đánh số 1.12.x. Nhãn liên kết chéo cũng lệch theo, ví dụ '[bài 1.8 Big-O]' trỏ tới 1.7, '[bài 1.3]' trỏ tới 1.2, '[bài 4.3 về đóng gói]' trỏ tới 4.2, '[bài 4.8]' trỏ tới 4.7, '[Module 6 bài 6.7]' trỏ tới 6.6.
  - Bằng chứng: `### 1.2.1 — Biến là một cái tên gắn với ô nhớ`
  - Sửa: Viết script đánh số lại theo tên file (bài 1.1 thì mục 1.1.x) và sửa mọi nhãn '[bài X.Y]' cho khớp file đích. Sửa luôn tiêu đề điều hướng kiểu '1.2 — 2. Điều Kiện (Conditions)'.
- **minor** · thực tế · [1.1-variables-and-data-types.md:133](../lessons/stage-01-foundation/module-01-programming-logic/1.1-variables-and-data-types.md): Bài bảo người học chạy thử, nhưng snippet gán `email = null` rồi gọi `email.Length`. Chạy thật sẽ ném NullReferenceException và chương trình dừng trước hai dòng sau. Bài cũng không nói rằng template từ .NET 6 đã bật sẵn &lt;Nullable&gt;enable&lt;/Nullable&gt;.
  - Bằng chứng: `Console.WriteLine(email.Length);    // Cảnh báo: có thể NullReferenceException`
  - Sửa: Ghi rõ 'Dòng này sẽ ném NullReferenceException nếu chạy; hãy comment lại sau khi đã thấy cảnh báo', và thêm câu 'Project tạo bằng dotnet new từ .NET 6 đã bật Nullable sẵn'.
- **minor** · chính xác · [1.1-variables-and-data-types.md:197](../lessons/stage-01-foundation/module-01-programming-logic/1.1-variables-and-data-types.md): Thông tin đã cũ: từ .NET Core 3.0, `double.ToString()` mặc định đã in chuỗi ngắn nhất có thể round-trip, nên `Console.WriteLine(d)` cũng in 99.9999999999986. Định dạng "R" không còn cần thiết, và câu 'ToString() làm tròn đi' chỉ đúng với .NET Framework.
  - Bằng chứng: `nên nó lộ ra phần sai số mà 'ToString()' thường làm tròn đi. Nếu bạn in bằng 'Console.WriteLine(d)' mà thấy đúng 100 thì hãy đổi sang '"R"'.`
  - Sửa: Sửa thành: 'Trên .NET hiện đại, Console.WriteLine(d) đã in đủ chữ số (99.9999999999986); "R" chỉ cần trên .NET Framework cũ.' Cập nhật dòng 'Kết quả thật trên .NET 9' thành .NET 10.
- **minor** (ban đầu major) · nhất quán · [1.10-quick-real-world-example.md:40](../lessons/stage-01-foundation/module-01-programming-logic/1.10-quick-real-world-example.md): Phần thân bài và tóm tắt khẳng định 1 tỷ phép so sánh mất 40 giây, bản sửa mất 0,4 giây và nhanh hơn gần 5.000 lần. Chính Bài 1 của bài này đo được 3,7 giây và 8,9 ms. Con số 0,4 giây cho 205.000 thao tác còn trùng với con số của bản lặp lồng 10 triệu phép so sánh, nên phi lý.
  - Bằng chứng: `Một tỷ phép so sánh — đó là 40 giây. ... 200.000 + 5.000 = 205.000 thao tác    ->  0,4 giây`
  - Sửa: Thay số trong tóm tắt, mục 1.11.1–1.11.3 bằng số đo thật trên .NET 10 (khoảng 3–4 giây so với khoảng 10 ms, nhanh hơn vài trăm lần) và ghi rõ 'số đo trên máy X'. Giữ thông điệp '10 lần dữ liệu thì khoảng 100 lần thời gian'.
  - Phản biện (adjusted): Một phần đã được giải thích: dòng 250–300 của chính bài cố ý đối chiếu '40 giây' với số đo 3,7 giây và rút ra bài học 'tỉ lệ đáng tin hơn con số tuyệt đối', nên con số 40 giây là chủ ý sư phạm. Phần còn sai: dòng 80 ghi bản Dictionary 205.000 thao tác mất 0,4 giây, trùng với con số 10 triệu phép so sánh ở dòng 47; 'nhanh hơn gần 5.000 lần' (dòng 84) mâu thuẫn với số đo 419 lần. Cách sửa: chỉ sửa 0,4 giây/5.000 lần (khoảng vài chục ms, vài trăm lần), có thể giữ 40 giây kèm ghi chú.
- **minor** · nhất quán · [1.2-conditions.md:252](../lessons/stage-01-foundation/module-01-programming-logic/1.2-conditions.md): Đề bài nhắc tới hàm `TinhGiam`, nhưng ví dụ ở mục 1.3.1 tên là `CalculateDiscount`. Enum LeadStatus ở thân bài là {New, Contacted, Qualified, Lost} còn ở Bài 2 là {New, Contacted, Qualified, Won}.
  - Bằng chứng: `Lấy hàm 'TinhGiam' bốn tầng ở mục 1.3.1.`
  - Sửa: Đổi thành 'hàm `CalculateDiscount`' và dùng một định nghĩa LeadStatus thống nhất cho cả khoá (ví dụ New, Contacted, Qualified, Won, Lost).
- **minor** (ban đầu major) · chính xác · [1.2-conditions.md:405](../lessons/stage-01-foundation/module-01-programming-logic/1.2-conditions.md): Bài nói `Dictionary` 'phát hiện ngay' khoá trùng, nhưng code mẫu dùng indexer initializer `["HN"] = ...`, vốn gọi setter: khoá trùng bị ghi đè âm thầm. Chỉ cú pháp `{ "HN", ... }` (gọi Add) mới ném ArgumentException, và chỉ lúc chạy.
  - Bằng chứng: `Trong 'Dictionary', khoá trùng lặp bị phát hiện ngay.`
  - Sửa: Sửa thành: 'Nếu khởi tạo bằng `{ "HN", 25_000m }` (gọi Add) thì khoá trùng ném ArgumentException ngay khi khởi động lớp; dạng `["HN"] = ...` thì ghi đè âm thầm, nên với bảng tra nên dùng dạng Add hoặc FrozenDictionary.' Nên kèm ví dụ minh hoạ.
  - Phản biện (adjusted): Đã chạy thử: `new Dictionary<string,int>{["HN"]=1,["HN"]=2}` ghi đè âm thầm, kết quả là 2, không có lỗi hay cảnh báo. Khẳng định 'khoá trùng bị phát hiện ngay' sai với chính code mẫu. Hạ xuống minor vì đây chỉ là một gạch đầu dòng phụ trong lời giải, không ảnh hưởng mạch chính. Cách sửa đề xuất đúng.
- **minor** · chính xác · [1.3-loops.md:212](../lessons/stage-01-foundation/module-01-programming-logic/1.3-loops.md): Snippet khai báo `decimal total` hai lần trong cùng một khối, nên dán vào sẽ lỗi CS0128. Lỗi tương tự có ở 1.4 dòng 327/331 (`var stats`), 1.5 dòng 100/103 (`var map`), 1.8 dòng 22/31.

  ```text
  decimal total = 0;
  foreach (var o in orders)
      if (o.IsPaid) total += o.Total;
  
  // LINQ
  decimal total = orders.Where(o => o.IsPaid).Sum(o => o.Total);
  ```

  - Sửa: Đặt tên khác cho từng phiên bản (totalLoop/totalLinq) hoặc tách thành hai khối code riêng, ghi rõ 'hai phiên bản thay thế nhau'.
- **minor** (ban đầu major) · chính xác · [1.5-arrays-and-lists.md:226](../lessons/stage-01-foundation/module-01-programming-logic/1.5-arrays-and-lists.md): Lập luận Big-O sai. Tỉ lệ thời gian O(n²)/O(n) tăng tỉ lệ thuận với n, nên khi n gấp 10 thì tỉ lệ lý thuyết khoảng 88 × 10 = 880 lần. Câu 'không phải 880 lần mà lớn hơn nữa' mâu thuẫn với chính lý do được đưa ra. Ngoài ra, ở dòng 222, cách đếm '200 triệu phép so sánh' bỏ qua việc một nửa phần tử của a không có trong b nên phải quét toàn bộ 20.000 (tổng khoảng 250 triệu).
  - Bằng chứng: `Thử lại với 200.000 phần tử thì chênh lệch không phải 880 lần mà lớn hơn nữa, vì một bên tăng theo bình phương còn một bên tăng tuyến tính.`
  - Sửa: Sửa thành: 'Lý thuyết dự đoán tỉ lệ tăng tỉ lệ thuận với n: khoảng 880 lần ở 200.000 phần tử, thực đo có thể lệch do cache.' Sửa dòng 222: '10.000 phần tử không có trong b phải quét đủ 20.000, 10.000 phần tử còn lại trung bình 5.000 → khoảng 250 triệu phép so sánh'.
  - Phản biện (adjusted): Lỗi có thật. Với a=0..19999 và b=10000..29999: 10.000 phần tử không có trong b phải quét đủ 20.000 (200 triệu phép so sánh), 10.000 phần tử còn lại trung bình 5.000 (50 triệu), tổng khoảng 250 triệu. Lý do 'bình phương so với tuyến tính' chỉ dự đoán tỉ lệ khoảng 880 lần, không phải 'lớn hơn nữa'; thực đo có thể lớn hơn do cache, nhưng đó là lý do khác. Thông điệp chính (tỉ lệ tăng theo n) vẫn đúng nên hạ xuống minor.
- **minor** · chính xác · [1.6-problem-solving-mindset.md:210](../lessons/stage-01-foundation/module-01-programming-logic/1.6-problem-solving-mindset.md): Tổng 'đúng bằng' decimal.MaxValue không gây tràn; chỉ khi vượt quá mới ném OverflowException. Bản đã sửa cũng không xử lý tràn, nhưng bài nói 'ba ca sai rõ ràng' như thể đã sửa hết.
  - Bằng chứng: `| Biên | tổng đúng bằng 'decimal.MaxValue' | 'OverflowException' | **Sai** |`
  - Sửa: Đổi thành 'tổng vượt decimal.MaxValue' và ghi chú bản sửa chỉ xử lý null/rỗng; ca tràn được chấp nhận vì không thực tế với doanh thu CRM, hoặc bọc try/catch nếu cần.
- **minor** · chính xác · [1.7-data-structures-and-big-o.md:97](../lessons/stage-01-foundation/module-01-programming-logic/1.7-data-structures-and-big-o.md): Với mảng 7 phần tử, Array.BinarySearch tìm 11 chỉ cần 2 lần so sánh (7, rồi 11); 3 là trường hợp xấu nhất.
  - Bằng chứng: `int index = Array.BinarySearch(sorted, 11);   // 3 lần so sánh thay vì 6`
  - Sửa: Sửa chú thích thành 'tối đa 3 lần so sánh (ở đây 2) thay vì 6'.
- **minor** · đầy đủ · [1.7-data-structures-and-big-o.md:165](../lessons/stage-01-foundation/module-01-programming-logic/1.7-data-structures-and-big-o.md): Lời giải chỉ có hai hàm Quadratic/Linear, thiếu phần sinh dữ liệu, làm nóng, lặp lấy giá trị nhỏ nhất và in bảng, nên không tái hiện được bảng kết quả. Số đo vẫn ghi '.NET 9'.
  - Bằng chứng: `static int Quadratic(List<int> a, List<int> b)`
  - Sửa: Bổ sung chương trình đầy đủ: tạo a, b bằng Enumerable.Range có giao nhau, warm-up, chạy 5 lần lấy min, in bảng. Hoặc giới thiệu BenchmarkDotNet. Cập nhật sang .NET 10.
- **minor** · thực tế · [1.7-data-structures-and-big-o.md:270](../lessons/stage-01-foundation/module-01-programming-logic/1.7-data-structures-and-big-o.md): Bài tập index dùng cú pháp SQL Server (IDENTITY, NVARCHAR, SET STATISTICS TIME) nhưng không có hướng dẫn cài SQL Server hay script chèn 200.000 dòng. Trong khi đó, các bài blog và Module 2 dùng PostgreSQL. Bài này quá tầm Module 1.

  ```text
  CREATE TABLE LeadNoIndex (
      Id INT IDENTITY PRIMARY KEY,
  ```

  - Sửa: Đánh dấu 'tuỳ chọn – làm sau Module 12'. Nếu giữ, chọn một DBMS thống nhất (PostgreSQL qua Docker), cung cấp script `INSERT ... SELECT generate_series(1,200000)` và lệnh `\timing`.
- **minor** (ban đầu major) · thực tế · [1.8-advanced-notes.md:208](../lessons/stage-01-foundation/module-01-programming-logic/1.8-advanced-notes.md): Bài xếp đệ quy ở mức ưu tiên 'Thấp' và bảo 'hiếm khi là lựa chọn đúng', trong khi Module 1 không có bài dạy đệ quy cơ bản (base case, ngăn xếp lời gọi). Sinh viên CLB cần đệ quy cho môn học, phỏng vấn và cấu trúc cây (danh mục, comment lồng nhau, JSON). Thông điệp hiện tại thiên về cảnh báo, thiếu phần dạy.
  - Bằng chứng: `| Thấp | Đệ quy | Hiếm dùng, và thường có cách an toàn hơn |`
  - Sửa: Thêm mục 'Đệ quy căn bản' (factorial, tính tổng cây danh mục có độ sâu giới hạn, vẽ call stack), sau đó mới tới phần cảnh báo về dữ liệu có vòng và độ sâu không kiểm soát. Đổi khuyến nghị thành 'dùng được khi độ sâu có giới hạn rõ; với dữ liệu do người dùng nhập thì phát hiện vòng hoặc dùng stack tường minh'.
  - Phản biện (adjusted): 1.8 đã có mục 1.9.3 'Đệ quy: học để hiểu, ít dùng để viết', có ví dụ SumCategoryTree và bản dùng stack tường minh. Tuy nhiên mục này chỉ cảnh báo, không dạy base case hay call stack. Việc thiếu phần dạy cơ bản và xếp ưu tiên 'Thấp' là vấn đề sư phạm có thật nhưng không sai kỹ thuật, nên hạ xuống minor. Nên thêm factorial/base case trước phần cảnh báo.
- **minor** (ban đầu major) · chính xác · [1.8-advanced-notes.md:550](../lessons/stage-01-foundation/module-01-programming-logic/1.8-advanced-notes.md): Phép tính kích thước stack frame sai: một frame x64 tối thiểu vài chục tới vài trăm byte (địa chỉ trả về, thanh ghi lưu, shadow space 32 byte trên Windows, enumerator của foreach). Mặt khác, luồng chính trên Linux thường có stack 8 MB chứ không phải 1 MB, nên 40.000 lần gọi tương ứng khoảng 200 byte/frame.

  ```text
  Stack mặc định 1 MB, mỗi khung gọi ở đây khoảng 20–30 byte
  -> khoảng 40.000 lần gọi
  ```

  - Sửa: Sửa thành: 'Kích thước stack phụ thuộc hệ điều hành (Windows: 1 MB cho luồng chính; Linux: thường 8 MB theo ulimit, luồng phụ của .NET khoảng 1.5 MB). Mỗi frame ở đây cỡ 100–200 byte, nên độ sâu tối đa vài chục nghìn lần gọi.'
  - Phản biện (adjusted): Sai đúng như báo: frame x64 tối thiểu gồm địa chỉ trả về, các thanh ghi lưu và shadow space 32 byte trên Windows, cộng thêm enumerator của foreach, nên không thể chỉ 20–30 byte. Stack luồng chính trên Linux thường 8 MB. Hạ xuống minor vì đây là phép ước lượng phụ; kết luận chính (StackOverflow giết tiến trình, phải phát hiện vòng) vẫn đúng.
- **minor** · chính xác · [1.9-mini-case-study.md:268](../lessons/stage-01-foundation/module-01-programming-logic/1.9-mini-case-study.md): Số liệu sai: theo cách 2, 499 triệu cho 24,95 triệu và 501 triệu cho 40,08 triệu, chênh khoảng 61% chứ không phải 82%. Ở dòng 258, 498 thêm 2 triệu thành 500 triệu, vẫn thuộc bậc 5% (&lt;= 500) nên chưa được 15 triệu. Dòng 117 nhắc `MocBac2` trong khi code dùng `Tier2Threshold`.

  ```text
  -> chênh 0,4% doanh số
  -> chênh 82% hoa hồng
  ```

  - Sửa: Sửa thành 'chênh khoảng 61% hoa hồng (24,95 so với 40,08 triệu)', đổi ví dụ 498 thành 'đang ở 500 triệu, cần thêm 1 triệu để vượt mốc', và đổi `MocBac2` thành `Tier2Threshold`.

### Module 2 - Computer Science Basics

- **critical** · chính xác · [2.11-mini-case-study.md:128](../lessons/stage-01-foundation/module-02-computer-science-basics/2.11-mini-case-study.md): Kịch bản chẩn đoán phi logic. Nếu cùng một server cấp token và kiểm tra token, thì iat/exp sinh từ đồng hồ của chính nó, nên token 'vừa cấp 30 giây' không thể có iat lệch 27 phút, và đồng hồ không thể trôi hơn 12 phút trong 30 giây. Lệch đồng hồ chỉ gây lỗi này khi máy cấp và máy kiểm là HAI máy khác nhau, ví dụ auth server và API, hoặc hai instance sau load balancer. Bài dạy sai mô hình nhân quả.
  - Bằng chứng: `Trong ca này, cả hai là **cùng một server** — nhưng đồng hồ trôi **giữa** lúc cấp và lúc kiểm tra`
  - Sửa: Viết lại: hệ thống có 2 instance sau load balancer (hoặc IdentityServer riêng và API). Instance B tắt NTP từ đợt cập nhật đêm qua và chạy nhanh 20 phút; token do A cấp bị B coi là hết hạn. Triệu chứng 'mọi người dùng' giải thích được vì phần lớn request rơi vào B. Cập nhật lại phần tóm tắt, mục 2.12.5–2.12.6 và câu tự kiểm tra.
- **critical** · chính xác · [2.13-review-and-assessment.md:81](../lessons/stage-01-foundation/module-02-computer-science-basics/2.13-review-and-assessment.md): Bài thực hành .NET đầu tiên cho ra kết quả khác với bài hứa. `JsonSerializer.Deserialize` với options mặc định phân biệt hoa thường: "name"/"email" không khớp thuộc tính Name/Email của record, nên in ra 'Chào mừng khách hàng:  ()'. Bài 2.5 có nhắc STJ phân biệt hoa thường, nhưng không áp dụng ở đây.
  - Bằng chứng: `var customer = JsonSerializer.Deserialize<Customer>(json);`
  - Sửa: Dùng `JsonSerializer.Deserialize<Customer>(json, new JsonSerializerOptions(JsonSerializerDefaults.Web))` (hoặc PropertyNameCaseInsensitive = true) và giải thích ngắn: ASP.NET Core dùng sẵn Web defaults, còn console thì không.
- **major** · cấu trúc · [2.1-concept-learning-path.md:16](../lessons/stage-01-foundation/module-02-computer-science-basics/2.1-concept-learning-path.md): Tiêu đề 'Concept learning path' vô nghĩa với người học. Toàn module đánh số mục lệch một bậc (bài 2.1 dùng 2.2.x, bài 2.9 dùng 2.10.x, bài 2.13 dùng 2.14.x). Ngay trong 2.1, các nhãn bài đều lệch: '[bài 2.3]' trỏ tới 2.2, '[bài 2.5]' trỏ tới 2.4, 'đọc theo thứ tự 2.3 → 2.10'. Liên kết sang module khác cũng lệch: 'bài 10.7' trỏ tới 10.6, 'bài 9.3' trỏ tới 9.2, 'bài 12.7' trỏ tới 12.6, 'bài 3.11' (2.1) và 'bài 3.10' (1.6) cùng nói về git bisect nhưng không thống nhất.
  - Bằng chứng: `# 2.1 - Concept learning path ... ### 2.2.1 — Ví dụ xuyên suốt ... **Chặng 1–2: gõ URL và phân giải DNS** → [bài 2.3](2.2-how-the-internet-works.md)`
  - Sửa: Đổi tiêu đề thành 'Bản đồ module: chuyện gì xảy ra khi bấm Đăng nhập'. Đánh số lại mục theo tên file và sửa mọi nhãn '[bài X.Y]' cho khớp file đích bằng một script kiểm tra tự động.
  - Phản biện (adjusted): Lỗi có thật, phạm vi còn rộng hơn báo cáo: lệch số mục một bậc không chỉ ở Module 2 mà cả Module 1 (1.1 dùng 1.2.x, 1.11 dùng 1.12.x). Các nhãn 'bài 2.3 (`2.2-...`)', 'bài 2.5 (`2.4-...`)' trong 2.1 dòng 33–97 đều lệch, link sang module khác cũng vậy (ví dụ 'bài 7.5 (`7.4-...`)', 'bài 12.4 (`12.3-...`)'). File đích vẫn đúng nên link không hỏng, chỉ nhãn gây nhầm. Nên sửa toàn khoá bằng script.
- **major** (ban đầu critical) · chính xác · [2.1-concept-learning-path.md:217](../lessons/stage-01-foundation/module-02-computer-science-basics/2.1-concept-learning-path.md): Middleware gán header `Server-Timing` SAU `await next()`. Khi endpoint đã ghi body, response đã bắt đầu gửi đi, Kestrel ném InvalidOperationException 'Headers are read-only, response has already started'. Đoạn code lặp nguyên văn ở 2.11 dòng 292. Ngoài ra Stopwatch thiếu using.

  ```text
  await next();
      ctx.Response.Headers["Server-Timing"] = $"app;dur={sw.Elapsed.TotalMilliseconds:F1}";
  ```

  - Sửa: Dùng `ctx.Response.OnStarting(() => { ctx.Response.Headers["Server-Timing"] = $"app;dur={sw.Elapsed.TotalMilliseconds:F1}"; return Task.CompletedTask; }); await next();` và thêm `using System.Diagnostics;`. Sửa cả 2.1 lẫn 2.11.
  - Phản biện (adjusted): Đường dẫn đúng là stage-01-foundation/module-02-computer-science-basics/2.1-concept-learning-path.md, dòng 213–218; snippet lặp lại ở 2.11 dòng 288–294. Gán Response.Headers sau `await next()` khi endpoint đã ghi body sẽ ném InvalidOperationException ('Headers are read-only, response has already started'), và code còn thiếu using System.Diagnostics. Hạ xuống major vì đây là snippet minh hoạ trong bài bản đồ khái niệm, không phải bài thực hành chính. Cách sửa bằng OnStarting là chuẩn.
- **major** · chính xác · [2.11-mini-case-study.md:600](../lessons/stage-01-foundation/module-02-computer-science-basics/2.11-mini-case-study.md): Logic phát hiện lệch đồng hồ sai: `now - iat` là tuổi của token chứ không phải độ lệch. Với access token sống 15 phút, mọi request sau phút đầu tiên đều vượt 60 giây và sinh cảnh báo giả. Chỉ giá trị âm (iat nằm trong tương lai) mới là dấu hiệu lệch đồng hồ.

  ```text
  var lech = (DateTimeOffset.UtcNow - DateTimeOffset.FromUnixTimeSeconds(giay)).TotalSeconds;
              if (Math.Abs(lech) > 60)
  ```

  - Sửa: Chỉ cảnh báo khi `lech < -30` (token được cấp 'trong tương lai' theo đồng hồ máy này). Hoặc tốt hơn, thêm health check so giờ hệ thống với một nguồn NTP hay header Date của dịch vụ khác. Đổi tên biến sang tiếng Anh.
- **major** · cấu trúc · [2.13-review-and-assessment.md:3](../lessons/stage-01-foundation/module-02-computer-science-basics/2.13-review-and-assessment.md): Bài ôn tập là boilerplate: mục tiêu chung chung, heading rỗng '2.14.4 — Kiểm tra & Thực hành (100 điểm)', các mục 'Bài tập tổng hợp/Tự kiểm tra/Kết luận' viết theo mẫu. Quiz chỉ có 5 câu ở mức định nghĩa và đáp án hiện sẵn. Câu 2 có đáp án 'C — PUT/PATCH' cho 'cập nhật một phần', mâu thuẫn với 2.4 ('PUT thay thế toàn bộ').
  - Bằng chứng: `> **Đáp án:** C — PATCH partial (tuỳ chuẩn hóa API).`
  - Sửa: Xoá heading rỗng và các mục boilerplate. Viết 12–15 câu quiz bám các bẫy của module (TTL, 401/403, idempotent, long trong JSON, IDOR, lost update, liveness/readiness, CORS preflight), đáp án đặt trong &lt;details&gt;. Tách đáp án câu 2 thành 'PATCH', hoặc đổi các lựa chọn để PUT và PATCH nằm ở hai phương án riêng.
- **major** · chính xác · [2.13-review-and-assessment.md:55](../lessons/stage-01-foundation/module-02-computer-science-basics/2.13-review-and-assessment.md): Hướng dẫn đã cũ: `dotnet --version` cho kết quả '8.0.xxx', bảng tóm tắt ghi '.NET 8', trong khi .NET 8 hết hỗ trợ ngày 10/11/2026. Từ .NET 8, template webapi dùng cổng ngẫu nhiên trong launchSettings.json chứ không phải 5001 (dòng 101).
  - Bằng chứng: `# Output: 8.0.xxx ... # Truy cập: https://localhost:5001/weatherforecast`
  - Sửa: Đổi thành '10.0.xxx', '.NET 10'; hướng dẫn đọc địa chỉ 'Now listening on: http://localhost:5xxx' trong console (hoặc trong Properties/launchSettings.json) rồi mở `<địa chỉ>/weatherforecast`.
- **major** · nhất quán · [2.13-review-and-assessment.md:112](../lessons/stage-01-foundation/module-02-computer-science-basics/2.13-review-and-assessment.md): Bảng tóm tắt mâu thuẫn với nội dung module: 2.6 dùng PostgreSQL (BIGSERIAL, timestamptz, psql, Npgsql) nhưng tóm tắt ghi 'SQL Server cho CRM'; 2.8 dạy container/reverse proxy/VPS nhưng tóm tắt ghi 'Production → Azure App Service'; '.NET 8' trong khi 2.9 nói về LTS hiện hành.
  - Bằng chứng: `| Database             | SQL Server cho CRM — table/row/column, JOIN, CRUD cơ bản                 |`
  - Sửa: Viết lại bảng tóm tắt từ chính nội dung các bài 2.1–2.12 (ACID, connection pool, 401/403, IDOR, JWT không thu hồi được, CORS, Server GC...). Chốt một DBMS cho toàn khoá và ghi rõ.
- **major** · thực tế · [2.3-client.md:145](../lessons/stage-01-foundation/module-02-computer-science-basics/2.3-client.md): Phần lớn bài tập của Module 2 giả định người học đã có 'dự án' với API đăng nhập, role admin, JWT, PostgreSQL, Docker, hai instance sau nginx hoặc máy ảo tắt NTP (2.3 Bài 1–3, 2.4 Bài 1/3, 2.5 Bài 2, 2.6 Bài 1–3, 2.7 Bài 1–2, 2.8 Bài 1–3, 2.11 Bài 3, 2.12). Sinh viên ở giai đoạn Foundation chưa có những thứ này và không có hướng dẫn dựng.
  - Bằng chứng: `Lấy một chức năng trong dự án chỉ dành cho quản trị viên. Đăng nhập bằng tài khoản **thường**, lấy token, rồi gọi thẳng endpoint đó bằng 'curl'.`
  - Sửa: Cung cấp repo 'crm-lab' dựng sẵn bằng docker compose (API .NET 10 có /auth/login, 2 user Sales/Admin, cố ý chứa một lỗi IDOR và một lỗi 200+success:false; PostgreSQL; Redis; nginx 2 instance). Viết lại đề bài trỏ tới repo này, kèm lệnh Windows tương đương (PowerShell, curl.exe).
- **major** · nhất quán · [2.4-http-https.md:91](../lessons/stage-01-foundation/module-02-computer-science-basics/2.4-http-https.md): Các bài khuyến nghị status code mâu thuẫn nhau. 2.4 dặn email trùng trả 409 và JSON hợp lệ nhưng sai nghiệp vụ trả 422. 2.5 dùng 422 cho 'Email đã tồn tại'. 2.4 Bài 3 lại ghi 'dữ liệu không hợp lệ → 400'. Trong khi đó, ASP.NET Core [ApiController] mặc định trả 400 cho lỗi validation.
  - Bằng chứng: `| '409 Conflict' | Xung đột trạng thái, ví dụ email đã tồn tại |`
  - Sửa: Chốt một quy ước cho cả khoá: 400 cho JSON hỏng và lỗi validation (khớp mặc định ASP.NET Core, ValidationProblemDetails), 409 cho trùng hoặc xung đột trạng thái, còn 422 là tuỳ chọn và phải ghi rõ. Sửa ví dụ ProblemDetails ở 2.5 (dòng 110, 124) thành 409.
- **major** · nhất quán · [2.4-http-https.md:127](../lessons/stage-01-foundation/module-02-computer-science-basics/2.4-http-https.md): Mâu thuẫn trong cùng một bài: thân bài nói `Headers.Add("X-City", "Hà Nội")` nổ ngay tại Add, còn Bài 2 (dòng 267) khẳng định Add không ném và chỉ SendAsync mới ném HttpRequestException. Theo hành vi thật của SocketsHttpHandler thì Bài 2 đúng.

  ```text
  // Nổ ở đây, chưa gửi đi byte nào
  request.Headers.Add("X-City", "Hà Nội");
  ```

  - Sửa: Sửa chú thích thân bài: 'Add chấp nhận giá trị; ngoại lệ HttpRequestException "Request headers must contain only ASCII characters" ném ra lúc SendAsync, trước khi byte nào rời máy.' Có thể nhắc thêm `SocketsHttpHandler.RequestHeaderEncodingSelector` cho trường hợp buộc phải gửi Latin-1/UTF-8.
- **major** (ban đầu critical) · chính xác · [2.5-api-and-json.md:69](../lessons/stage-01-foundation/module-02-computer-science-basics/2.5-api-and-json.md): `NumberToStringConverter` không tồn tại trong System.Text.Json, nên code lỗi biên dịch. Cách sửa ở Bài 1 (dòng 227) đặt NumberHandling = WriteAsString toàn cục, khiến MỌI số (int, decimal, totalPages...) đều thành chuỗi, và client gửi số lên sẽ bị từ chối nếu thiếu AllowReadingFromString. Bài không cảnh báo tác dụng phụ này.

  ```text
  [JsonConverter(typeof(NumberToStringConverter))]
      public long Id { get; set; }
  ```

  - Sửa: Dùng `[JsonNumberHandling(JsonNumberHandling.WriteAsString | JsonNumberHandling.AllowReadingFromString)] public long Id { get; set; }`. Ở Bài 1 ghi chú: cấu hình toàn cục ảnh hưởng mọi số, chỉ nên dùng thuộc tính trên từng trường Id.
  - Phản biện (adjusted): System.Text.Json không có NumberToStringConverter, nên code lỗi biên dịch. Cách đúng là `[JsonNumberHandling(JsonNumberHandling.WriteAsString | JsonNumberHandling.AllowReadingFromString)]` trên thuộc tính. Lời giải Bài 1 đặt NumberHandling=WriteAsString toàn cục: mọi số đều thành chuỗi khi ghi, còn khi đọc thì client gửi chuỗi số sẽ bị từ chối vì thiếu AllowReadingFromString. Bài không cảnh báo tác dụng phụ này. Hạ xuống major vì đây là snippet minh hoạ, lỗi biên dịch lộ ngay.
- **major** · chính xác · [2.6-what-is-a-database.md:113](../lessons/stage-01-foundation/module-02-computer-science-basics/2.6-what-is-a-database.md): EF Core chỉ mở kết nối trong lúc thực thi lệnh rồi trả về pool ngay, trừ khi đang có transaction hoặc mở kết nối thủ công. Vì vậy một DbContext chưa dispose không 'giữ kết nối mãi'. Vấn đề thật của DbContext Singleton là không thread-safe và change tracker phình bộ nhớ. Bài 3 (dòng 342) lặp lại nguyên nhân sai này.
  - Bằng chứng: `Một 'DbContext' không được dispose giữ kết nối mãi.`
  - Sửa: Sửa thành: 'Kết nối bị giữ lâu khi có transaction đang mở, khi gọi Database.OpenConnection thủ công, hoặc khi đọc DataReader dở dang. DbContext Singleton sai vì không thread-safe và tích luỹ entity tracking.' Cập nhật nguyên nhân số 3 ở Bài 3 tương ứng.
- **major** · thực tế · [2.8-hosting-and-cloud-basics.md:128](../lessons/stage-01-foundation/module-02-computer-science-basics/2.8-hosting-and-cloud-basics.md): Snippet health check đầu tiên map cả /health/live và /health/ready mà không có Predicate, nên endpoint live cũng kiểm tra Postgres và Redis. Đây đúng là anti-pattern mà bài cảnh báo ngay bên dưới (gây vòng lặp restart), nhưng snippet được trình bày như cách làm đúng. Các hàm AddNpgSql/AddRedis đến từ package cộng đồng AspNetCore.HealthChecks.* mà bài không nhắc.

  ```text
  app.MapHealthChecks("/health/live");    // tiến trình còn sống không?
  app.MapHealthChecks("/health/ready");   // đã sẵn sàng nhận request chưa?
  ```

  - Sửa: Thay snippet bằng phiên bản có tag và Predicate (như Bài 3), hoặc ghi rõ '⚠ chưa đúng — xem Bài 3'. Thêm dòng `dotnet add package AspNetCore.HealthChecks.NpgSql` và `AspNetCore.HealthChecks.Redis`.
- **major** · chính xác · [2.9-dotnet-runtime-and-ecosystem.md:112](../lessons/stage-01-foundation/module-02-computer-science-basics/2.9-dotnet-runtime-and-ecosystem.md): Chính sách hỗ trợ đã cũ. Từ 2025, Microsoft kéo dài hỗ trợ bản STS lên 24 tháng (.NET 9 hết hỗ trợ ngày 10/11/2026, cùng ngày với .NET 8). Bài không nhắc phiên bản hiện hành: .NET 10 LTS (phát hành 11/2025, hỗ trợ tới 11/2028), là bản nên dùng cho khoá học vào tháng 10/2026.
  - Bằng chứng: `- **STS** (số lẻ: 9, 11...) — hỗ trợ **18 tháng**.`
  - Sửa: Sửa thành 'STS hỗ trợ 24 tháng (áp dụng từ .NET 9)', thêm bảng nhỏ: .NET 8 LTS và .NET 9 STS hết hỗ trợ 10/11/2026; .NET 10 LTS tới 11/2028. Khuyến nghị toàn khoá dùng .NET 10.
- **major** · chính xác · [2.9-dotnet-runtime-and-ecosystem.md:323](../lessons/stage-01-foundation/module-02-computer-science-basics/2.9-dotnet-runtime-and-ecosystem.md): Phần Server GC bỏ qua DATAS (Dynamic Adaptation To Application Sizes), được bật mặc định cho Server GC từ .NET 9. Với DATAS, GC bắt đầu với ít heap và co giãn theo tải, nên các khẳng định 'một heap cho mỗi CPU', 'container 512 MB trên máy 16 nhân tạo 16 vùng heap' không còn đúng mặc định trên .NET 9/10.

  ```text
  Container 512 MB trên máy chủ 16 nhân
  -> Server GC tạo 16 vùng heap
  ```

  - Sửa: Bổ sung mục 'DATAS (.NET 9+)': Server GC mặc định tự điều chỉnh số heap và bộ nhớ; có thể tắt bằng `DOTNET_GCDynamicAdaptationMode=0`. Ghi rõ ví dụ 16 heap áp dụng cho .NET 8 trở về trước hoặc khi DATAS bị tắt, và đo lại trên .NET 10.
- **minor** (ban đầu major) · nhất quán · [2.1-concept-learning-path.md:123](../lessons/stage-01-foundation/module-02-computer-science-basics/2.1-concept-learning-path.md): Gợi ý 'gõ IP vào trình duyệt vẫn ra Google' mâu thuẫn với Bài 2 cùng bài, nơi chứng minh truy cập bằng IP trần trả về 403 do virtual hosting hoặc lỗi chứng chỉ khi dùng HTTPS. Sinh viên làm theo thường gặp lỗi hoặc bị redirect, và sẽ rút ra kết luận sai.
  - Bằng chứng: `3. Gõ địa chỉ IP đó vào trình duyệt — vẫn ra Google`
  - Sửa: Thay bằng thí nghiệm có kết quả ổn định: 'curl -H "Host: example.com" http://&lt;IP&gt;' so với không có Host, hoặc ghi rõ 'nhiều trang sẽ KHÔNG mở được bằng IP — Bài 2 giải thích vì sao'.
  - Phản biện (adjusted): Không hẳn là mâu thuẫn: Bài 2 (dòng 311–335) thử trên IP của Cloudflare/example.com, còn frontend của Google thường vẫn phục vụ trang khi truy cập bằng IP qua http (không kiểm chứng được vì sandbox không có mạng). Tuy nhiên đó là trường hợp riêng, dễ ra lỗi chứng chỉ khi dùng https, và câu 'vẫn ra Google' khái quát sai. Hạ xuống minor; chỉ cần ghi chú 'nhiều trang sẽ không mở được bằng IP, xem Bài 2'.
- **minor** · chính xác · [2.10-advanced-notes.md:417](../lessons/stage-01-foundation/module-02-computer-science-basics/2.10-advanced-notes.md): Kestrel tự thêm header alt-svc khi bật HTTP/3, nên middleware tự viết là thừa và câu 'nếu không, nó không tự thử' dễ gây hiểu nhầm. Bài cũng không nhắc HTTP/3 trên Linux cần libmsquic. Mục 2.11.3 vẫn liệt kê 'server đẩy trước tài nguyên', một tính năng HTTP/2 mà các trình duyệt lớn đã bỏ.
  - Bằng chứng: `// Báo cho trình duyệt biết có HTTP/3 — nếu không, nó không tự thử`
  - Sửa: Ghi 'Kestrel tự gửi alt-svc khi Protocols có Http3; trên Linux cần cài libmsquic'. Xoá middleware Alt-Svc hoặc đánh dấu là chỉ cần khi đứng sau proxy. Thêm '(server push đã bị Chrome/Firefox loại bỏ)'.
- **minor** (ban đầu major) · chính xác · [2.11-mini-case-study.md:95](../lessons/stage-01-foundation/module-02-computer-science-basics/2.11-mini-case-study.md): Dữ liệu minh hoạ không khớp: timestamp 1764946591 là 2025-12-05 14:56:31 UTC chứ không phải 02:03:11; chuỗi base64 chỉ chứa sub và exp, không có iat như JSON hiển thị. Sinh viên chạy lại lệnh sẽ ra kết quả khác bài.
  - Bằng chứng: `date -u -d @1764946591    # exp: 02:03:11 UTC`
  - Sửa: Sinh lại token mẫu nhất quán (ví dụ iat=1790214491, exp=1790215391 tương ứng 2026-09-24 01:48:11/02:03:11 UTC) và cập nhật chuỗi base64 có đủ sub/iat/exp. Kiểm tra bằng chính lệnh trong bài.
  - Phản biện (adjusted): Đã kiểm chứng: chuỗi base64 giải mã ra {"sub":"123","exp":1764946591}, không có iat. `date -u -d @1764946591` cho Fri Dec 5 14:56:31 UTC 2025, không phải 02:03:11. 1790215391 khớp 2026-09-24 02:03:11 UTC như cách sửa đề xuất. Hạ xuống minor vì đây là dữ liệu minh hoạ, không làm sai khái niệm; nên sửa cùng lúc khi viết lại ca nghiên cứu (index 33).
- **minor** · chính xác · [2.12-quick-real-world-example.md:127](../lessons/stage-01-foundation/module-02-computer-science-basics/2.12-quick-real-world-example.md): Bài nói UseAuthentication từ chối preflight với 401. Thực tế UseAuthentication chỉ xác định danh tính; chính UseAuthorization (endpoint có [Authorize] hoặc FallbackPolicy) mới trả 401. Tài liệu Microsoft yêu cầu UseCors đặt sau UseRouting và trước UseAuthorization. Câu tự kiểm tra cũng lặp lại cách nói này.
  - Bằng chứng: `nên nếu 'UseAuthentication' chạy trước, nó bị từ chối với 401`
  - Sửa: Sửa thành 'nếu UseAuthorization chạy trước UseCors, preflight không có token sẽ bị 401'. Vẫn giữ khuyến nghị đặt UseCors trước cả UseAuthentication cho an toàn.
- **minor** · chính xác · [2.2-how-the-internet-works.md:36](../lessons/stage-01-foundation/module-02-computer-science-basics/2.2-how-the-internet-works.md): Bài nói 'bốn lượt đi về' nhưng phép tính 480 ms với RTT 160 ms chỉ ứng với 3 RTT (DNS + TCP + TLS 1.3). Sơ đồ phía trên lại vẽ theo kiểu TLS 1.2. Dòng 217 cho rằng .NET tự cache DNS: thực tế .NET dựa vào resolver của hệ điều hành, vấn đề nằm ở kết nối pool sống vô hạn (PooledConnectionLifetime mặc định là vô hạn).
  - Bằng chứng: `Chú ý: **bốn lượt đi về trước khi gửi được request đầu tiên**. Trên đường truyền quốc tế với độ trễ một chiều 80ms, riêng phần chuẩn bị đã tốn khoảng 480ms.`
  - Sửa: Sửa thành: 'DNS 1 RTT + TCP 1 RTT + TLS 1.3 1 RTT (TLS 1.2: 2 RTT) = 3–4 RTT; với RTT 160 ms là 480–640 ms.' Dòng 217: 'HttpClient giữ kết nối đã mở tới IP cũ vô thời hạn nếu không đặt PooledConnectionLifetime'.
- **minor** · chính xác · [2.3-client.md:184](../lessons/stage-01-foundation/module-02-computer-science-basics/2.3-client.md): Bài dẫn OWASP Top 10 bản 2021, nhưng OWASP Top 10:2025 đã phát hành; Broken Access Control vẫn đứng thứ nhất. Cùng lỗi này lặp ở 2.7 dòng 281.
  - Bằng chứng: `đứng đầu bảng [OWASP Top 10](https://owasp.org/Top10/) năm 2021.`
  - Sửa: Đổi thành 'OWASP Top 10:2025 (A01: Broken Access Control)' ở cả 2.3 và 2.7.
- **minor** · chính xác · [2.4-http-https.md:244](../lessons/stage-01-foundation/module-02-computer-science-basics/2.4-http-https.md): Theo hiểu biết hiện tại, endpoint `MapGet` trong ASP.NET Core chỉ khớp method GET; HEAD không tự động được phục vụ (cần MapMethods với "HEAD"). Khẳng định 'ASP.NET Core xử lý đúng việc này tự động khi bạn dùng MapGet' cần kiểm chứng lại. Dòng 355 dùng type '#section-15.5.9' (408) cho lỗi 403, đúng phải là 15.5.4.
  - Bằng chứng: `ASP.NET Core xử lý đúng việc này tự động khi bạn dùng 'MapGet', nhưng middleware tự viết thì cần lưu ý.`
  - Sửa: Kiểm thử bằng `curl -I` trên một app .NET 10 rồi sửa câu cho đúng hành vi thực tế, ví dụ 'muốn hỗ trợ HEAD dùng app.MapMethods("/x", ["GET","HEAD"], ...)'. Đổi type thành 'https://tools.ietf.org/html/rfc9110#section-15.5.4'.
- **minor** · chính xác · [2.5-api-and-json.md:236](../lessons/stage-01-foundation/module-02-computer-science-basics/2.5-api-and-json.md): Ví dụ mất chính xác chọn sai số: 12345678901234.56 (16 chữ số có nghĩa) vẫn round-trip đúng qua double của JavaScript. Dòng 146 dùng `3_000_000` trong JSON, là cú pháp không hợp lệ. Bài liệt kê 'bốn thứ JSON không có' theo ba cách khác nhau (tóm tắt, 2.6.2, Bài 3). Dùng 'amountInCents' với VND là thiếu thực tế vì VND không có đơn vị xu.
  - Bằng chứng: `Số tiền '12345678901234.56' sẽ mất chữ số cuối.`
  - Sửa: Dùng ví dụ có từ 17 chữ số có nghĩa trở lên (ví dụ 1234567890123456.78 sẽ thành 1234567890123456.8), sửa thành `"totalItems": 3000000`, thống nhất một danh sách 'JSON không có: ngày tháng, decimal chính xác, số nguyên &gt; 2^53, nhị phân', và đổi ví dụ thành `{ "amount": 1500000, "currency": "VND" }` / `amountInMinorUnits` cho USD.
- **minor** · đầy đủ · [2.6-what-is-a-database.md:132](../lessons/stage-01-foundation/module-02-computer-science-basics/2.6-what-is-a-database.md): Bài tập dùng psql và PostgreSQL nhưng không có hướng dẫn chuẩn bị. Thông báo lỗi ở Bài 2 ghi relation "tai_khoan" trong khi bảng tên accounts. Cách 3 dùng cột `version` không có trong CREATE TABLE.
  - Bằng chứng: `Mở hai phiên 'psql' tới cùng một bảng.`
  - Sửa: Thêm khối 'Chuẩn bị: docker run -d --name pg -e POSTGRES_PASSWORD=pass -p 5432:5432 postgres:17; docker exec -it pg psql -U postgres'. Sửa thông báo lỗi thành relation "accounts", thêm cột `version INT NOT NULL DEFAULT 0`. Ghi chú rằng SQL Server mặc định KHÔNG rollback cả transaction khi một câu lệnh lỗi (cần XACT_ABORT ON).
- **minor** · chính xác · [2.8-hosting-and-cloud-basics.md:71](../lessons/stage-01-foundation/module-02-computer-science-basics/2.8-hosting-and-cloud-basics.md): Các Dockerfile (2.8, 2.10) dùng aspnet:9.0/sdk:9.0, một tháng nữa hết hỗ trợ. Từ .NET 10, tag mặc định của image chuyển sang Ubuntu 24.04 (noble), không còn là Debian. Image Alpine và chiseled mặc định bật globalization-invariant, nên `new CultureInfo("vi-VN")` ném CultureNotFoundException chứ không chỉ 'cho kết quả khác'. Đây là điểm quan trọng với app tiếng Việt mà bài lại khuyên dùng chiseled.
  - Bằng chứng: `FROM mcr.microsoft.com/dotnet/aspnet:9.0      # ← dòng quan trọng nhất`
  - Sửa: Đổi sang `aspnet:10.0`/`sdk:10.0`, cập nhật mô tả 'mặc định: Ubuntu (glibc)'. Ghi chú: Alpine và chiseled cần ICU (`icu-libs` hoặc tag `-extra`) và tắt `DOTNET_SYSTEM_GLOBALIZATION_INVARIANT` nếu xử lý vi-VN.

### Module 3 - Git + Developer Workflow

- **critical** · chính xác · [3.13-quick-real-world-example.md:83](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.13-quick-real-world-example.md): Quy trình 3 bước nói sau `dotnet ef migrations remove` thì `git rebase main` 'không còn conflict ở snapshot'. Sai. Migration và snapshot đã được commit, nên rebase phát lại commit cũ và vẫn conflict. Việc remove chỉ là thay đổi chưa commit, và rebase còn từ chối chạy khi working tree bẩn. Ngoài ra `migrations remove` sẽ báo lỗi nếu migration đã được `database update` trên DB local, trường hợp rất thường gặp.
  - Bằng chứng: `git rebase main          # giờ không còn conflict ở snapshot nữa`
  - Sửa: Viết lại theo cách chạy được. (1) `git merge --abort`. (2) Nếu đã update DB local thì `dotnet ef database update <migration-trước>`. (3) Bỏ migration khỏi lịch sử nhánh: `git rebase -i` và drop/sửa commit chứa migration, hoặc `git reset --soft` rồi bỏ file migration và snapshot. (4) `git rebase main` hoặc merge main và lấy snapshot của main (`git checkout main -- <Snapshot>.cs`). (5) `dotnet ef migrations add ...`. Đồng thời cân nhắc chuyển cả bài sang Module 13 vì Stage 1 chưa học EF Core.
- **major** · nhất quán · [3.1-git-intro-and-motivation.md:42](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.1-git-intro-and-motivation.md): Đánh số mục lệch ở TOÀN BỘ bài của cả hai module: bài 3.1 dùng 3.2.x, 3.2 dùng 3.3.x, …, 3.14 dùng 3.15.x, 4.1 dùng 4.2.x, …, 4.13 dùng 4.14.x. Ngoài ra có 60 link mà số bài trong chữ lệch với file đích, ví dụ 'bài 3.6 (`3.5-…`)', 'bài 3.11 Conventional Commits (`3.10-…`)', 'bài 8.7 (`…/8.6-…`)'. Người học sẽ đối chiếu sai bài.
  - Bằng chứng: `3.1: '### 3.2.1 — Vấn đề Git giải quyết'; dòng 284: 'luật vàng ở [bài 3.6](3.5-branching-and-merging.md)'`
  - Sửa: Viết script sửa hàng loạt: đánh lại heading theo số bài của file (3.1.x…), và sinh lại chữ link từ tên file đích (ví dụ 'bài 3.5 (`3.5-…`)'). Sửa luôn mục Điều hướng đang có dạng '3.2 — 2. Cài đặt…' (thừa số thứ tự cũ).
- **major** · chính xác · [3.10-conventional-commits.md:264](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.10-conventional-commits.md): Bài 2 chạy `npm init -y` rồi `npx husky init`. Lệnh husky init tạo `.husky/pre-commit` với nội dung `npm test`, trong khi script test mặc định của npm init là `exit 1`. Kết quả là ngay cả commit đúng quy ước ('fix: skip cancelled…') cũng bị chặn, trái với output 'thành công' trong bài.

  ```text
  npm init -y ... npx husky init
  echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
  ```

  - Sửa: Thêm bước `rm .husky/pre-commit` (hoặc ghi đè bằng lệnh phù hợp như `dotnet format --verify-no-changes`). Thống nhất cú pháp commitlint.config.js giữa mục 3.11.5 (module.exports) và Bài 2 (export default).
- **major** · nhất quán · [3.11-advanced-notes.md:169](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.11-advanced-notes.md): Bài 3.11 lặp gần nguyên nội dung bisect (3.9), rebase -i (3.5), force-with-lease và worktree (3.3), log -S (3.4). Bài còn khuyến nghị 'bắt đầu bằng GitHub Flow' và mô tả trunk-based là cho 'đội trưởng thành', trong khi 3.8 khuyến nghị 'bắt đầu bằng trunk-based… mọi quy mô, tốt nhất với nhỏ'. Hai bài đưa ra hai lời khuyên mâu thuẫn.
  - Bằng chứng: `**Khuyến nghị:** bắt đầu bằng GitHub Flow. (3.11) / Khuyến nghị thực dụng: **bắt đầu bằng trunk-based**. (3.8)`
  - Sửa: Gộp phần mới của 3.11 (hooks/core.hooksPath, cherry-pick) vào các bài gốc và bỏ phần trùng. Thống nhất một khuyến nghị: GitHub Flow (nhánh ngắn + PR + squash) là dạng trunk-based thực dụng cho đội nhỏ. Giải thích quan hệ giữa hai khái niệm thay vì để chúng thành hai lời khuyên khác nhau.
- **major** · chính xác · [3.12-mini-case-study.md:54](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.12-mini-case-study.md): Bước 2 'kiểm tra đã bị dùng chưa' dùng `sys.dm_exec_sessions`. View này chỉ liệt kê phiên ĐANG mở, không có lịch sử đăng nhập và không có cột IP, nhưng bài lại bảo 'Tìm kết nối từ địa chỉ IP lạ'. Ví dụ cũng mặc nhiên cho app kết nối bằng `sa` mà không cảnh báo đây là anti-pattern.
  - Bằng chứng: `SELECT login_name, host_name, program_name, login_time FROM sys.dm_exec_sessions ... Tìm kết nối từ địa chỉ IP lạ.`
  - Sửa: Bổ sung `sys.dm_exec_connections.client_net_address` cho phiên hiện tại. Với lịch sử, dùng SQL Server Audit, login auditing trong error log (`xp_readerrorlog`) hoặc log firewall/Azure SQL auditing. Thêm cảnh báo: ứng dụng không bao giờ được dùng tài khoản sa, phải dùng login riêng với quyền tối thiểu.
- **major** · nhất quán · [3.12-mini-case-study.md:508](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.12-mini-case-study.md): Bài 3: đề yêu cầu `reset --hard HEAD~3` nhưng lời giải dùng HEAD~2. Output dựa vào trạng thái repo của bài 3.11 (commit 'gộp lại', 'commit 20' từ repo bisect) với các hash trùng 3.11 nhưng message khác ('feat: thêm hàm tính hoa hồng…' ở 3.11 lại thành 'gộp lại' ở đây). Người học tự làm sẽ không tái hiện được.
  - Bằng chứng: `Commit vài thay đổi, chạy 'git reset --hard HEAD~3' ... git reset --hard HEAD~2 ... bd3d3f7 gộp lại`
  - Sửa: Cho lời giải tự chứa: script tạo repo mới, 3–4 commit, chạy reset, xem reflog, khôi phục. Bỏ phụ thuộc vào trạng thái của bài trước. Đồng thời bài này trùng lớn với 3.2 Bài 3 và 3.3, nên cân nhắc rút gọn.
- **major** (ban đầu critical) · chính xác · [3.13-quick-real-world-example.md:420](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.13-quick-real-world-example.md): `dotnet ef migrations add KiemTra --dry-run` không tồn tại, vì `migrations add` không có tùy chọn --dry-run (đã kiểm tra `--help`). Bước CI ngay sau đó dùng add/grep/remove thì rườm rà và dễ hỏng.
  - Bằng chứng: `dotnet ef migrations add KiemTra --dry-run`
  - Sửa: Dùng lệnh có sẵn từ EF Core 8: `dotnet ef migrations has-pending-model-changes`, lệnh này trả exit code khác 0 khi model lệch snapshot. Thay luôn khối YAML CI bằng lệnh này.
  - Phản biện (adjusted): Đúng: `dotnet ef migrations add` không có tùy chọn --dry-run, chỉ có --output-dir, --namespace, --json…. Lệnh `dotnet ef migrations has-pending-model-changes` có từ EF Core 8. Riêng khối CI add/grep vẫn chạy được, chỉ rườm rà. Lỗi chỉ nằm ở một lệnh kiểm chứng phụ, nên hạ xuống major.
- **major** · chính xác · [3.13-quick-real-world-example.md:510](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.13-quick-real-world-example.md): Bài 3 tự mâu thuẫn: output cho thấy EF đang 'Applying migration ThemBangGhiChu' (migration tạo bảng GhiChu), rồi ngay sau đó báo 'Invalid object name GhiChu'. Lời giải thích lại nói migration đó 'đã bị bỏ'. Kịch bản lỗi không nhất quán nên người học không hiểu được cơ chế.

  ```text
  Applying migration '20260921101233_ThemBangGhiChu'.
  Applying migration '20260921113355_ThemTrangThaiChoGhiChu'.
  ... Invalid object name 'GhiChu'.
  ```

  - Sửa: Chọn một kịch bản nhất quán. Ví dụ: snapshot ghép tay có cột SoDienThoai nhưng migration của An bị mất trong merge, nên migration kế tiếp không tạo cột đó và query lỗi 'Invalid column name SoDienThoai'. Hoặc: snapshot thiếu cột, nên migration kế tiếp sinh AddColumn trùng và báo lỗi 'Column names in each table must be unique'. Cập nhật output và giải thích theo kịch bản đã chọn.
- **major** · cấu trúc · [3.14-review-and-assessment.md:15](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.14-review-and-assessment.md): Bài đánh giá cuối module còn nhiều boilerplate: mục tiêu chung chung ('Nắm được ý chính của bài'), 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' rỗng nghĩa, và một heading trống '3.15.4 — Kiểm tra & Thực hành (100 điểm)'. Bài 1: `git init` có thể tạo nhánh master nên `git push -u origin main` lỗi, đồng thời thiếu bước tạo repo trên GitHub. Bài 2 bắt viết controller và unit test khi chưa học C#. Bài 4 trỏ tới repo không tồn tại `github.com/course/crm-backend-starter`. Rubric nói 'không bắt buộc repo public thật' trong khi Bài 4 yêu cầu fork. Quiz chỉ có 5 câu nhận biết, không đo được nội dung module.

  ```text
  ### 3.15.4 — Kiểm tra & Thực hành (100 điểm)
  (trống) ... Fork repo mẫu: `github.com/course/crm-backend-starter`
  ```

  - Sửa: Bỏ boilerplate và heading trống. Bài 1 dùng `git init -b main` và thêm bước tạo repo GitHub trống. Thay code C# bằng file văn bản hoặc template có sẵn. Tạo repo starter thật của CLB. Viết 10–15 câu quiz tình huống (reflog, ours/theirs, force-with-lease, .gitignore đã track…) có giải thích đáp án.
- **major** (ban đầu critical) · chính xác · [3.14-review-and-assessment.md:65](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.14-review-and-assessment.md): Bài 3 (30 điểm) có các lệnh `git commit -m` chạy ngay sau 'Sửa dòng 10' mà không `git add`/`-a`, nên Git báo 'no changes added to commit' và bài không chạy được. File `src/Services/CustomerService.cs` cũng không tồn tại trong project tạo ở Bài 1 (template webapi). Ghi chú 'Terminal 1/Terminal 2' gây hiểu nhầm là hai repo.

  ```text
  # Sửa dòng 10 trong CustomerService.cs
  git commit -m "feat(crm): add email validation in UpdateCustomer"
  ```

  - Sửa: Thêm `git add <file>` (hoặc `git commit -am`). Cho sẵn nội dung file CustomerService.cs (hoặc dùng file .txt đơn giản) và nêu rõ đây là cùng một repo, chỉ đổi nhánh. Thêm output mong đợi.
  - Phản biện (adjusted): Đã xác nhận ở dòng 60-85. Các lệnh `git commit -m` chạy sau 'Sửa dòng 10' mà không có `git add`/`-a`, nên Git báo 'no changes added to commit'. `src/Services/CustomerService.cs` không có trong template webapi. Ghi chú Terminal 1/2 gây hiểu nhầm. Đây là bài tập hỏng chứ không dạy sai khái niệm, nên hạ xuống major.
- **major** · đầy đủ · [3.2-git-install-config.md:1](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.2-git-install-config.md): Bài có tên 'Cài đặt và cấu hình Git' nhưng không có bước cài đặt nào: không có Git for Windows hay winget, không kiểm tra `git --version`, không nói chọn editor hay terminal. Thông tin Git for Windows mặc định đặt autocrlf=true cũng không được nhắc. Sinh viên năm 1 sẽ không biết bắt đầu từ đâu.
  - Bằng chứng: `### 3.3.1 — Danh tính: làm ngay sau khi cài`
  - Sửa: Thêm mục 'Cài đặt' theo từng hệ điều hành: Windows (`winget install Git.Git` hoặc installer, giải thích các lựa chọn quan trọng trong installer), macOS (`xcode-select --install`/brew), Linux (apt). Thêm bước kiểm tra `git --version`, cài VS Code và tạo tài khoản GitHub.
- **major** · chính xác · [3.2-git-install-config.md:287](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.2-git-install-config.md): Giải thích sai cơ chế: người dùng Windows với autocrlf=true và người dùng macOS với autocrlf=input đều chuẩn hóa về LF khi commit, nên họ KHÔNG gây ra diff cả file. Lỗi thật xảy ra khi có người để autocrlf=false trên Windows (commit CRLF) hoặc khi repo đã chứa CRLF sẵn.
  - Bằng chứng: `Một người dùng Windows với 'autocrlf=true', một người dùng macOS với 'autocrlf=input'. Mỗi lần người này sửa một dòng rồi commit, Git ghi nhận **cả file** thay đổi.`
  - Sửa: Đổi ví dụ thành: người A trên Windows đặt `core.autocrlf=false` và editor lưu CRLF, người B trên macOS dùng LF. Hai người lần lượt sửa file nên toàn bộ dòng đổi qua lại. Giữ kết luận rằng .gitattributes là cách bền vững.
- **major** · cấu trúc · [3.3-git-safety-checklist.md:17](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.3-git-safety-checklist.md): Thứ tự bài đảo ngược. Bài 3.3 dạy reflog, reset --hard, rebase --abort, force-with-lease, stash, worktree, filter-repo trước khi bài 3.4 dạy vòng lặp add/commit/push và trước bài 3.5 dạy nhánh/rebase. Người mới chưa biết commit hay nhánh là gì đã phải học cứu commit và rebase.
  - Bằng chứng: `3.3 - Checklist an toàn ... git rebase --abort ... git push --force-with-lease (trước 3.4 - Workflow cơ bản)`
  - Sửa: Đổi thứ tự module thành 3.1 → 3.2 → 3.4 → 3.5 → 3.6 → 3.7 → 3.3 (an toàn và cứu dữ liệu) → 3.8…, hoặc rút 3.3 xuống mức 'những lệnh nguy hiểm cần tránh' và để phần reflog/force-with-lease cho sau bài nhánh và remote.
- **major** · chính xác · [3.3-git-safety-checklist.md:45](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.3-git-safety-checklist.md): Bài lặp lại nhiều lần rằng commit mất sẽ 'cứu được bằng reflog trong 90 ngày' (tóm tắt, sơ đồ, Tự kiểm tra; cũng có ở 3.5 dòng 159, 3.11, 3.12). Nhưng commit mất sau reset/xóa nhánh là unreachable, nên chỉ được giữ theo gc.reflogExpireUnreachable = 30 ngày. Chính Bài 1 của 3.3 nói 30 ngày. Bảng ở 3.12 dòng ~582 còn ghi ngược ('mồ côi có reflog: 90 ngày').
  - Bằng chứng: `B -->|Rồi| C[Cứu được bằng reflog<br/>trong 90 ngày]`
  - Sửa: Thống nhất: mục reflog của commit còn tham chiếu được giữ 90 ngày; commit đã mất tham chiếu (sau reset/rebase/xóa nhánh) được giữ khoảng 30 ngày; object không nằm trong reflog bị prune sau khoảng 2 tuần (gc.pruneExpire). Sửa sơ đồ, tóm tắt, 3.5, 3.11, 3.12. Lưu ý thêm: reflog của nhánh bị xóa cùng nhánh, chỉ còn reflog của HEAD.
- **major** (ban đầu critical) · chính xác · [3.3-git-safety-checklist.md:207](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.3-git-safety-checklist.md): Bài 1 chỉ tạo 3 commit rồi chạy `git reset --hard HEAD~3`. Với 3 commit thì HEAD~3 không tồn tại, Git báo 'fatal: ambiguous argument HEAD~3: unknown revision'. Output mẫu ('log trống', reflog 'moving to HEAD~3') là bịa. Người học làm theo sẽ kẹt ngay bước đầu. Bài 3.12 lặp lại đề 'HEAD~3' nhưng lời giải lại dùng HEAD~2.

  ```text
  git reset --hard HEAD~3
  git log --oneline
  # (trống — nhánh đã lùi về trước commit đầu tiên)
  ```

  - Sửa: Tạo 4 commit (commit 0 làm gốc) rồi `git reset --hard HEAD~3`, hoặc giữ 3 commit và dùng `HEAD~2`. Cập nhật output reflog mẫu cho khớp. Sửa đề Bài 3 ở 3.12 cho thống nhất.
  - Phản biện (adjusted): Đúng. Repo chỉ có 3 commit nên HEAD~3 không tồn tại, Git báo `fatal: ambiguous argument 'HEAD~3'`. Output 'log trống' và reflog mẫu là bịa. 3.12 Bài 3 có đề HEAD~3 nhưng lời giải dùng HEAD~2. Lỗi chặn bài tập nhưng hiện ra ngay và không dạy sai khái niệm, nên hạ xuống major.
- **major** · chính xác · [3.6-github-and-pull-request.md:154](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.6-github-and-pull-request.md): Workflow CI dùng `dotnet-version: '9.0.x'`, trong khi khóa học nhắm tới .NET 10 LTS và .NET 9 STS sắp hết hỗ trợ. Cache NuGet dùng key `hashFiles('**/packages.lock.json')` nhưng không hướng dẫn bật lock file, nên key rỗng và cache vô nghĩa. Ngoài ra branch protection/ruleset cho repo private chỉ có với GitHub Pro/Team; sinh viên dùng gói Free với repo private sẽ không bật được.
  - Bằng chứng: `dotnet-version: '9.0.x' ... key: nuget-${{ hashFiles('**/packages.lock.json') }}`
  - Sửa: Đổi sang '10.0.x' (và actions/checkout@v5, setup-dotnet@v5 nếu thống nhất). Dùng `cache: true` của setup-dotnet kèm `<RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>`, hoặc bỏ đoạn cache. Ghi chú: để luyện branch protection, hãy dùng repo public hoặc GitHub Education (Pro miễn phí cho sinh viên).
- **major** · thực tế · [3.6-github-and-pull-request.md:179](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.6-github-and-pull-request.md): Nhiều bài tập trong module giả định người học đang làm ở một đội có lịch sử thật: 'Lấy mười PR gần nhất của đội' (3.6), 'Chạy lệnh trên kho của đội' (3.8), diễn tập hotfix trên staging (3.8), '30 commit gần nhất của dự án' (3.10), bisect với tag v1.2.0 (3.9). Sinh viên CLB không có những thứ này, nên không làm được và không có tiêu chí hoàn thành khả thi.
  - Bằng chứng: `Lấy mười PR gần nhất của đội, ghi số dòng thay đổi và số nhận xét review của mỗi cái.`
  - Sửa: Tạo một repo luyện tập của CLB (có script sinh lịch sử, tag, nhánh già, PR mẫu) và viết lại đề theo repo đó. Ví dụ: 'fork repo crm-git-lab, mở 2 PR (một PR 30 dòng, một PR 600 dòng), nhờ bạn cùng nhóm review rồi so sánh'. Phần 'quy trình đội' thì chuyển sang thảo luận trong buổi sinh hoạt.
- **major** · chính xác · [3.8-real-world-developer-workflow.md:47](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.8-real-world-developer-workflow.md): Khóa học khuyến nghị squash merge (3.5, 3.6), nhưng bước dọn nhánh lại dùng `git branch -d`. Sau squash merge, commit của nhánh không nằm trong main nên `-d` báo 'not fully merged', nhất là khi fetch.prune (bật ở 3.2) đã xóa remote-tracking branch. `git branch --merged` ở Bài 1 cũng không liệt kê được nhánh đã squash.

  ```text
  git checkout main && git pull
  git branch -d feature/CRM-142-revenue-report
  ```

  - Sửa: Ghi chú: với squash/rebase merge thì phải dùng `git branch -D <nhánh>` sau khi đã xác nhận PR merged (hoặc dùng `gh pr list --state merged`). Giải thích vì sao -d từ chối. Điều chỉnh đoạn 'xóa nhánh đã merge hàng loạt' cho phù hợp.
- **major** · chính xác · [3.8-real-world-developer-workflow.md:342](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.8-real-world-developer-workflow.md): Đoạn YAML 'workflow riêng cho hotfix' không hợp lệ: job thiếu `runs-on`, thiếu checkout và setup-dotnet nên `dotnet test` không chạy được. Câu 'Bộ test đầy đủ vẫn chạy sau khi merge' cũng mâu thuẫn với nguyên tắc 'Vẫn chạy CI' nêu ở trên.

  ```text
  jobs:
    fast-check:
      if: startsWith(github.head_ref, 'hotfix/')
      steps:
        - run: dotnet test --filter "Category=Critical"
  ```

  - Sửa: Bổ sung `runs-on: ubuntu-latest`, các bước `actions/checkout`, `actions/setup-dotnet` (10.0.x), và trait `[Trait("Category","Critical")]` trong test. Nói rõ đây là đánh đổi có chủ ý và bộ đầy đủ chạy trên push vào main.
- **major** · chính xác · [3.9-debugging-workflow.md:126](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.9-debugging-workflow.md): Middleware inline đặt trong Program.cs (top-level) dùng `_logger` không tồn tại, nên code không biên dịch. Bài 2 dùng Serilog `LogContext.PushProperty` nhưng không nói phải cấu hình `.Enrich.FromLogContext()`. Thiếu bước này thì CorrelationId không xuất hiện trong log và tiêu chí hoàn thành không đạt được.
  - Bằng chứng: `using (_logger.BeginScope(new Dictionary<string, object> { ["CorrelationId"] = correlationId }))`
  - Sửa: Dùng `app.Logger.BeginScope(...)` hoặc lấy `ILogger<Program>` từ `context.RequestServices`. Ở Bài 2 thêm đoạn cài Serilog đầy đủ: `builder.Host.UseSerilog((ctx, lc) => lc.Enrich.FromLogContext().WriteTo.File(new CompactJsonFormatter(), "logs/app-.json"))` cùng các package cần cài.
- **major** · thực tế · [3.9-debugging-workflow.md:145](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.9-debugging-workflow.md): Ở Stage 1 (người học chưa biết OOP C# hay ASP.NET), bài 3.9 dạy middleware, Serilog LogContext, W3C trace context, dotnet-counters/dotnet-dump/dotnet-trace, thread pool starvation. Bài 3.13 dạy conflict EF Core ModelSnapshot. Khối lượng này quá tải và dùng khái niệm chưa học.
  - Bằng chứng: `dotnet-counters monitor --process-id <pid> --counters System.Runtime,Microsoft.AspNetCore.Hosting ... threadpool-queue-length`
  - Sửa: Giữ ở 3.9 phần quy trình 5 bước, bisect, breakpoint có điều kiện và log cơ bản. Chuyển correlation id/Serilog sang Module 8, công cụ chẩn đoán sang Module 19, conflict migration (3.13) sang Module 13, chỉ để lại một câu 'sẽ học ở…'.
- **major** · đầy đủ · [README.md:7](../lessons/stage-01-foundation/module-03-git-developer-workflow/README.md): Cả module không có bài nào dạy khái niệm remote: origin, clone, fetch, pull, push -u, upstream, remote-tracking branch. Các lệnh này được dùng khắp nơi (3.3, 3.5, 3.7, 3.8) mà chưa từng được định nghĩa. Module cũng không nhắc `git switch`/`git restore`, hai lệnh Git khuyến nghị cho người mới thay cho checkout, và không nói tới công cụ GUI (VS Code Source Control, merge editor).
  - Bằng chứng: `grep toàn module: không có mục giải thích 'git clone', 'git remote add', 'git pull'; 'git switch' chỉ xuất hiện 1 lần trong quiz 3.14`
  - Sửa: Thêm một bài (hoặc mục trong 3.4) 'Làm việc với remote': tạo repo GitHub, clone, `git remote -v`, push -u, fetch và pull, origin/main là gì. Chuyển các lệnh checkout sang switch/restore (ghi chú checkout là lệnh cũ). Thêm hướng dẫn giải conflict bằng VS Code.
- **minor** (ban đầu major) · chính xác · [3.11-advanced-notes.md:608](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.11-advanced-notes.md): Hướng dẫn quay về trạng thái trước rebase bằng `git reset --hard HEAD@{5}`. Một lần rebase -i sinh ra nhiều mục reflog nên chỉ số 5 gần như chắc chắn sai, và điều này mâu thuẫn với lời khuyên ở 3.3 Bài 1: 'khi xử lý sự cố thật, hãy dùng mã băm'.
  - Bằng chứng: `git reset --hard HEAD@{5}    # quay về trạng thái trước khi rebase`
  - Sửa: Dùng `git reset --hard ORIG_HEAD` (ngay sau rebase) hoặc `git reset --hard tinh-nang@{1}` (reflog của nhánh), hoặc tìm mục 'rebase (start)' trong reflog rồi lấy mã băm ngay trước đó.
  - Phản biện (adjusted): Đúng là HEAD@{5} gần như chắc chắn sai sau rebase -i, và mâu thuẫn với lời khuyên dùng mã băm ở 3.3. Tuy nhiên lỗi này vẫn cứu được bằng reflog và chỉ là một dòng minh họa trong advanced notes, nên hạ xuống minor. Nên dùng ORIG_HEAD hoặc `<nhánh>@{1}`.
- **minor** · thực tế · [3.2-git-install-config.md:101](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.2-git-install-config.md): Mẫu .gitignore chặn `appsettings.Development.json`. Theo quy ước .NET, file này thường được commit với cấu hình dev không bí mật, còn bí mật thì nằm trong user-secrets như chính bài khuyến nghị. Template `dotnet new gitignore` cũng không chặn file này. Lệnh `gitleaks protect --staged` đã deprecated từ gitleaks v8.19.

  ```text
  # Bí mật — QUAN TRỌNG NHẤT
  appsettings.Development.json
  ```

  - Sửa: Giải thích: commit appsettings.Development.json nhưng không để bí mật trong đó, bí mật để ở user-secrets. Chỉ ignore các file *.Local.json/.env. Đổi lệnh thành `gitleaks git --staged` (hoặc `gitleaks protect` kèm ghi chú phiên bản).
- **minor** · nhất quán · [3.4-basic-git-workflow.md:112](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.4-basic-git-workflow.md): Hướng dẫn ngôn ngữ commit message không thống nhất. 3.1 dùng tiếng Việt có dấu, 3.4 dùng tiếng Anh nhưng ví dụ thể mệnh lệnh lại là tiếng Việt không dấu ('them', 'sua', 'xoa'), bảng ở 3.4 và 3.10 dùng tiếng Việt không dấu hoặc có dấu lẫn lộn.
  - Bằng chứng: `Dùng **thể mệnh lệnh** cho dòng tóm tắt — "them", "sua", "xoa", không phải "da them".`
  - Sửa: Chọn một quy ước cho khóa học (khuyến nghị tiếng Anh, imperative: add/fix/remove) và sửa mọi ví dụ cho khớp. Nếu cho phép tiếng Việt thì viết có dấu và nói rõ khi nào được dùng.
- **minor** · nhất quán · [3.9-debugging-workflow.md:244](../lessons/stage-01-foundation/module-03-git-developer-workflow/3.9-debugging-workflow.md): Số lần thử bisect cho 10.000 commit không thống nhất: phần tóm tắt và bảng ghi 14, Bài 1 ghi '13 lần'. Mục 'Ba mức log' liệt kê tới 4 mức.
  - Bằng chứng: `Mười nghìn commit chỉ cần **13 lần** kiểm tra.`
  - Sửa: Ghi thống nhất là ⌈log₂(10.000)⌉ ≈ 14 bước (thực tế 13–14). Sửa thành 'Bốn mức log'.

### Module 4 - C# Core

- **critical** · chính xác · [4.3-inheritance-and-polymorphism.md:164](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.3-inheritance-and-polymorphism.md): Ví dụ chính của mục 'Bẫy: gọi virtual trong constructor' khẳng định field khai báo bằng initializer sẽ còn null và ném NullReferenceException. Thực tế field initializer của lớp con chạy TRƯỚC constructor lớp cha, nên code này không lỗi. Đã chạy thử trên .NET 10 và nhận 'cols=1'. Bài 2 cùng bài lại giải thích đúng (DerivedA), nên bài tự mâu thuẫn. Câu trả lời trong Tự kiểm tra (dòng ~573) cũng sai theo.
  - Bằng chứng: `private readonly List<string> _columns = new(); ... _columns.Add("Doanh thu");    // NullReferenceException!`
  - Sửa: Đổi ví dụ 4.4.4 sang dạng gán field trong thân constructor: `private readonly List<string> _columns; public SalesReport(){ _columns = new(); }`. Sửa câu 'constructor của lớp cha chạy trước, rồi mới tới phần khởi tạo field của lớp con' thành thứ tự đúng: (1) field initializer của lớp con, (2) constructor lớp cha, (3) thân constructor lớp con. Sửa luôn câu trả lời trong Tự kiểm tra.
- **critical** · chính xác · [4.8-pattern-matching.md:96](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.8-pattern-matching.md): Bài nói switch trên enum đủ nhánh, không có `_`, thì 'trình biên dịch kiểm tra giúp' và khi thêm Returned sẽ báo CS8524. Sai cả hai ý. Switch đủ mọi giá trị có tên vẫn LUÔN sinh CS8524 (giá trị enum không tên, ví dụ (OrderStatus)5). Còn thiếu một giá trị có tên thì báo CS8509. Vì vậy khuyến nghị `<WarningsAsErrors>CS8524;CS8509</WarningsAsErrors>` làm build hỏng ngay với switch đã đúng. Đã kiểm chứng bằng .NET 10 SDK. Bài 1 cùng bài lại dùng CS8509, tự mâu thuẫn.
  - Bằng chứng: `Thêm 'Returned' vào enum, và trình biên dịch phát cảnh báo **CS8524** ... <WarningsAsErrors>CS8524;CS8509</WarningsAsErrors>`
  - Sửa: Giải thích lại: CS8509 báo thiếu giá trị có tên, nên biến nó thành lỗi. CS8524 báo giá trị không tên, nên tắt bằng `<NoWarn>$(NoWarn);CS8524</NoWarn>` hoặc thêm nhánh `_ => throw new UnreachableException()` / `throw new ArgumentOutOfRangeException(...)`. Sửa khối XML và checklist cho khớp.
- **critical** · chính xác · [4.8-pattern-matching.md:290](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.8-pattern-matching.md): Bài khẳng định 'từ C# 9, lớp abstract với các lớp con sealed trong cùng file cho phép trình biên dịch kiểm tra vét cạn trên kiểu'. Điều này sai: C# (kể cả C# 14) chưa có union, và switch không `_` trên PaymentResult vẫn sinh CS8509. Đã kiểm chứng. Bài 4.11 dòng ~455 lặp lại khẳng định này.
  - Bằng chứng: `Từ C# 9, kết hợp lớp 'abstract' với các lớp con 'sealed' trong cùng file cho phép trình biên dịch kiểm tra vét cạn trên **kiểu**`
  - Sửa: Viết lại: mẫu 'closed hierarchy' (private ctor + nested sealed) chỉ ngăn bên ngoài thêm lớp con, KHÔNG được compiler kiểm tra vét cạn. Vẫn phải có nhánh `_ => throw new UnreachableException()`, và có thể dùng analyzer bên thứ ba nếu muốn kiểm tra tự động. Sửa câu tương ứng ở 4.11 dòng ~455.
- **major** · nhất quán · [4.1-class-and-object.md:36](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.1-class-and-object.md): Đánh số mục lệch ở mọi bài của module 4 (4.1 dùng 4.2.x, …, 4.13 dùng 4.14.x), kéo theo các tham chiếu nội bài như 'mục 4.12.7', 'mục 4.13.6' cũng lệch với số bài. Link ghi 'bài 1.2', 'bài 4.8', 'bài 13.3', 'bài 2.9' lại trỏ tới 1.1, 4.7, 13.2, 2.8.
  - Bằng chứng: `4.1: '### 4.2.1 — Class là khuôn, object là sản phẩm'; '[bài 4.8](4.7-records-and-value-objects.md)'`
  - Sửa: Dùng cùng script sửa với module 3: đánh lại heading theo số bài trong tên file, cập nhật tham chiếu 'mục x.y.z' trong nội bài, và sinh lại chữ link từ tên file đích.
- **major** (ban đầu critical) · chính xác · [4.1-class-and-object.md:174](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.1-class-and-object.md): Bảng class/struct ghi struct có 'So sánh == mặc định: Theo từng trường'. Thực tế struct do người dùng định nghĩa KHÔNG có toán tử == (lỗi CS0019, đã kiểm chứng). Chỉ Equals mặc định so sánh theo giá trị, và qua reflection nên chậm. Bảng ở 4.12 (mục 4.13.6) cũng lặp lại ý sai.
  - Bằng chứng: `| So sánh '==' mặc định | Theo tham chiếu | Theo từng trường |`
  - Sửa: Đổi thành: struct thì `==` không dùng được nếu không tự định nghĩa (CS0019), còn `Equals` mặc định so sánh từng field qua reflection (chậm). Muốn có == thì dùng `record struct` hoặc tự cài IEquatable&lt;T&gt; và operator ==. Sửa bảng ở 4.12 cho khớp.
  - Phản biện (adjusted): Lỗi có thật ở 4.1 dòng 155: struct người dùng tự định nghĩa không có operator ==, nên báo CS0019. Chỉ ValueType.Equals so sánh theo field. Tuy vậy đây là một ô sai trong bảng so sánh, nên hạ xuống major. Bảng ở 4.12 (mục 4.13.6) chỉ ghi 'So sánh: Giá trị', đúng với Equals nên không sai hẳn. Chỉ nên ghi chú thêm rằng `==` không có sẵn và Equals mặc định chậm. Không cần sửa 4.12 như một lỗi.
- **major** · dễ hiểu · [4.1-class-and-object.md:307](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.1-class-and-object.md): Lời giải Bài 1 dùng kiểu `Email` (value object có `.Value`) như thể đã biết, nhưng value object và Email chỉ được giới thiệu ở bài 4.7. Constructor Customer cũng khác giữa các bài: 4.1 dùng (string, Email), 4.3 dùng `new Customer("An", "an@x.com")`, 4.4 dùng `new Customer("An")`, 4.13 dùng ContactInfo. Người học không lắp ghép được.
  - Bằng chứng: `public Email Email { get; private set; } ... Email = email;      // Email tự xác thực trong constructor của nó`
  - Sửa: Ở 4.1 dùng `string email` có kiểm tra trong constructor và thêm ghi chú 'bài 4.7 sẽ nâng cấp thành value object Email'. Định nghĩa một mô hình CRM chuẩn (Customer(string name, Email email), Lead…) ở README module và dùng nhất quán.
- **major** · thực tế · [4.1-class-and-object.md:433](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.1-class-and-object.md): Ngay từ bài đầu của module OOP, phần bài tập và ví dụ đã dùng nhiều thứ chưa học: Minimal API (`app.MapPost`) cùng curl song song, DI, EF Core (`private Customer()` cho EF), ConcurrentBag và `Lock`. Các bài sau còn có controller với `_db.Customers.Include` (4.2), NSubstitute và IHttpClientFactory (4.3), xUnit và FakeTimeProvider (4.4), Clean Architecture nhiều project (4.4–4.6), FluentValidation/IOptions (4.10), owned types EF Core (4.11). Sinh viên chưa từng viết C# không chạy được những phần này.
  - Bằng chứng: `app.MapPost("/add", (string name) => { TempStore.Names.Add(name); ... });`
  - Sửa: Viết lại bài tập dạng console app hoặc test xUnit tối thiểu (có hướng dẫn `dotnet new console`/`dotnet new xunit`). Ví dụ race condition dùng `Parallel.For` thay cho web endpoint. Đưa phần ASP.NET/EF/DI vào khung 'Xem trước — học ở Module 7/8/13'.
- **major** · chính xác · [4.11-mini-case-study.md:592](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.11-mini-case-study.md): `builder.HasIndex(p => p.Shipping!.WeightKg)` định nghĩa index trên thuộc tính của owned type từ builder của owner. EF Core không chấp nhận biểu thức đi qua navigation; index phải khai báo trong builder của OwnsOne. Toàn bộ code thiết kế 1 và 2 cũng không biên dịch được: Money không có operator *, thiếu CalculateShipping, Product.Create, EnableService, và có cảnh báo CS8618.

  ```text
  builder.HasIndex(p => p.Shipping!.WeightKg)
         .HasFilter("[Shipping_WeightKg] IS NOT NULL");
  ```

  - Sửa: Đặt index trong `OwnsOne(p => p.Shipping, s => { s.HasIndex(x => x.WeightKg).HasFilter(...); })`, hoặc dùng complex type của EF Core 8–10. Cung cấp đầy đủ Money (operator +, *), Product.Create, EnableService và constructor để case study biên dịch được trên net10.0.
- **major** · chính xác · [4.12-quick-real-world-example.md:592](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.12-quick-real-world-example.md): Ví dụ 'GroupBy bị đổi giữa chừng' gọi `.ToList()` nhưng chú thích là 'hoãn lại, chưa chạy'. ToList thực thi ngay (đã kiểm chứng: đổi City sau đó không ảnh hưởng kết quả). Bài đang dạy sai khái niệm deferred execution. Dòng `theoDiaChi[diaChi];` cũng không phải câu lệnh C# hợp lệ (CS0201).
  - Bằng chứng: `var nhom = leads.GroupBy(l => l.DiaChi).ToList(); // hoãn lại, chưa chạy`
  - Sửa: Bỏ `.ToList()` để minh họa deferred thật (`var nhom = leads.GroupBy(...);` rồi duyệt sau khi sửa), hoặc bỏ hẳn ví dụ này. Sửa dòng tra Dictionary thành `var x = theoDiaChi[diaChi];`.
- **major** · nhất quán · [4.13-review-and-assessment.md:77](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.13-review-and-assessment.md): Lab cuối module yêu cầu `Lead extends Contact`, `Customer extends Contact` kèm `Lead.Convert()`. Đây chính là anti-pattern 'trạng thái thành kiểu' mà 4.9 (mục 4.10.3) và 4.11 vừa dạy tránh, vì lead chuyển thành customer thì không đổi kiểu object được. Bảng tóm tắt ghi 'Inheritance: Tái dùng code' và 'Encapsulation: validation trong setter', trái với 4.9 ('Kế thừa để dùng lại code' là lỗi) và 4.2. Khung Bài 1 có cú pháp lỗi (`=> /* ... */;`) và override GetSummary trước khi BaseEntity được định nghĩa.
  - Bằng chứng: `'Lead' extends 'Contact', thêm 'Source', 'Status' (enum), method 'Qualify()'/'Disqualify()'/'Convert()'`
  - Sửa: Thiết kế lại lab: Contact/Party là entity, Lead và Customer là vai trò hoặc trạng thái (LeadStatus, CustomerProfile), hoặc Convert() tạo Customer mới tham chiếu LeadId. Sửa bảng tóm tắt: 'Inheritance: quan hệ là-một cố định'. Bổ sung lời giải hoặc rubric chi tiết cho Bài 1–3 và sửa khung code cho biên dịch được.
- **major** · cấu trúc · [4.13-review-and-assessment.md:109](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.13-review-and-assessment.md): Bài đánh giá có heading trống '4.14.4 — Kiểm tra & Thực hành (100 điểm)', mục tiêu và 'Bài tập tổng hợp/Tự kiểm tra/Kết luận' chung chung lặp từ template. Quiz chỉ có 5 câu định nghĩa, không đo được các bẫy chính của module (equality, collection trap, CS8509, constructor invariants). Câu 'Bước tiếp theo: Module 5 — Collections, LINQ và Lambda' không khớp với Module 5 thực tế (Advanced C#: SOLID, generics…). Tham khảo gắn sai: 'SOLID Principles' trỏ tới trang what-is-refactoring, 'Composition over Inheritance' trỏ tới bài 'Interfaces are not abstractions'.
  - Bằng chứng: `[Refactoring Guru — SOLID Principles](https://refactoring.guru/refactoring/what-is-refactoring)`
  - Sửa: Bỏ boilerplate và heading trống. Viết 10–15 câu quiz tình huống có giải thích. Mô tả đúng Module 5. Sửa link: refactoring.guru/design-patterns hoặc tài liệu SOLID tương ứng, và một bài đúng chủ đề composition over inheritance.
- **major** · thực tế · [4.2-encapsulation.md:209](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.2-encapsulation.md): Phần lớn đề bài trong module bắt đầu bằng 'Tìm một class trong dự án', 'Chọn một service trong dự án gọi thẳng DbContext', 'Liệt kê năm file dài nhất trong dự án'. Sinh viên CLB chưa có dự án nào, và module cũng không cung cấp starter, nên đề không làm được và tiêu chí hoàn thành không kiểm chứng được.
  - Bằng chứng: `Tìm một class trong dự án có property trả về 'List'. Viết một dòng code từ bên ngoài phá vỡ...`
  - Sửa: Phát hành repo 'crm-oop-starter' có sẵn các 'mùi code' cần sửa (List public, anemic Order, god class, interface thừa, Equals thiếu GetHashCode). Viết lại mọi đề thành 'Trong starter, file X…' kèm test kiểm tra hoàn thành.
- **major** · chính xác · [4.3-inheritance-and-polymorphism.md:428](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.3-inheritance-and-polymorphism.md): Cách 3 khẳng định đánh dấu `sealed` cho DerivedB làm lời gọi virtual trong constructor 'trở nên vô hại'. Sai: Base vẫn gọi Init() override của DerivedB trước khi thân constructor DerivedB chạy. Sealed lớp con không thay đổi thứ tự khởi tạo. Cách 2 (factory) cũng không bỏ được lời gọi trong Base ctor.

  ```text
  // Cách 3 — sealed, để không ai override được
  public sealed class DerivedB : Base { } ... `sealed` làm cho lời gọi `virtual` trong constructor trở nên vô hại
  ```

  - Sửa: Sửa thành: cách đúng là bỏ lời gọi virtual khỏi constructor của Base (CA2214). Nếu Base không cần mở rộng thì làm Base sealed và bỏ virtual. Factory chỉ có ích khi Base không còn tự gọi Init().
- **major** (ban đầu critical) · chính xác · [4.4-interface.md:434](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.4-interface.md): Test 'giao thừa' được quảng cáo là 'chạy được vào bất kỳ ngày nào và luôn cho cùng kết quả', nhưng code so sánh `o.CreatedAt` (DateTime, Kind=Unspecified) với `quarterStart` (DateTimeOffset UTC). Khi so sánh, DateTime được chuyển ngầm theo múi giờ máy. Ở UTC+7, đơn ngày 2026-10-01 bị coi là 2026-09-30 17:00Z và bị loại, nên test fail (đã kiểm chứng). Test thứ hai còn dùng biến `customer` chưa khai báo nên không biên dịch.
  - Bằng chứng: `customer.AddOrder(new Order(new DateTime(2026, 10, 1), 20_000_000m)); ... var before = service.CalculateQuarterlyCommission(customer);`
  - Sửa: Cho Order.CreatedAt kiểu DateTimeOffset và tạo dữ liệu bằng `new DateTimeOffset(2026,10,1,0,0,0,TimeSpan.Zero)`. Trong test thứ hai, khai báo và dựng `customer` (hoặc tách ra helper). Thêm một đoạn ngắn cảnh báo bẫy DateTime và DateTimeOffset.
  - Phản biện (adjusted): Lỗi có thật. Test truyền `new DateTime(2026,10,1)` (Kind=Unspecified). Khi so sánh hoặc chuyển ngầm sang DateTimeOffset, hệ thống dùng offset của máy. Ở UTC+7 (đúng múi giờ của người học), đơn hàng ngày 1/10 sẽ thành 30/9 17:00Z và bị loại, nên test fail. Test thứ hai (dòng ~455) dùng `customer` chưa khai báo nên không biên dịch. Order không được định nghĩa trong bài nên kiểu CreatedAt không rõ. Dù CreatedAt là DateTime hay DateTimeOffset thì lỗi vẫn xảy ra, trừ khi dữ liệu được tạo bằng offset Zero. Bài vẫn dạy đúng ý chính về TimeProvider, nên hạ xuống major. Cách sửa đề xuất giữ nguyên.
- **major** · cấu trúc · [4.5-abstraction.md:131](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.5-abstraction.md): Nội dung trùng lặp nhiều giữa các bài: 'khi nào không cần interface' xuất hiện ở 4.4 mục 4.5.4, 4.5 mục 4.6.4 và 4.5 Bài 3. Equality của record, record làm khóa Dictionary và bẫy collection trong record được dạy ở 4.7 rồi lặp lại gần nguyên ở 4.12. `required`/`sealed`/`init` lặp ở 4.1, 4.3 và 4.10. Module dài khoảng 7.500 dòng, quá tải với sinh viên.
  - Bằng chứng: `4.5: '### 4.6.4 — Đừng trừu tượng hoá quá sớm' ~ 4.4: '### 4.5.4 — Khi nào **không** cần interface'`
  - Sửa: Gộp mỗi chủ đề về một bài gốc và để các bài khác dẫn link. Rút 4.12 thành bài tập thực hành ngắn về Equals/GetHashCode. Rút 4.10 còn primary constructor, collection expression, IDisposable. Mục tiêu giảm khoảng 30% độ dài.
- **major** · chính xác · [4.7-records-and-value-objects.md:128](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.7-records-and-value-objects.md): 'Cách xử lý' cho bẫy collection trong record vẫn khai báo `public record Order` với field `ImmutableList<OrderLine> _lines` không được khởi tạo (luôn null, kèm cảnh báo CS8618). Equality tự sinh của record so sánh cả field private này theo tham chiếu, nên vẫn hỏng như cũ. Order còn là entity, trái với mục 4.8.6 'Entity không dùng record'.
  - Bằng chứng: `public record Order { public int Id { get; init; } private readonly ImmutableList<OrderLine> _lines; ... }`
  - Sửa: Đổi ví dụ thành value object thật (ví dụ `record Tags(EquatableArray<string> Items)`), hoặc giữ Order là class và dẫn sang 4.2. Khởi tạo field đúng cách và nói rõ field private cũng tham gia equality của record.
- **major** · chính xác · [4.7-records-and-value-objects.md:322](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.7-records-and-value-objects.md): Email và PhoneNumber là `readonly record struct` có constructor kiểm tra, rồi bài khẳng định 'không có cách nào tạo ra một Email không hợp lệ'. Thực tế `new Email()` hoặc `default(Email)` vẫn biên dịch được và cho Value = null (đã kiểm chứng), giá trị mặc định này còn xuất hiện khi model binding hay mảng. Struct không giữ được bất biến.
  - Bằng chứng: `public readonly record struct Email { ... } ... Mọi 'Email' trong hệ thống đều đã qua kiểm tra, vì không có cách nào tạo ra một 'Email' không hợp lệ.`
  - Sửa: Dùng `sealed record Email` (class) cho value object cần bất biến tuyệt đối, hoặc nêu rõ hạn chế của default struct và cách xử lý (kiểm tra Value null ở biên, analyzer). Sửa câu khẳng định tuyệt đối.
- **major** · chính xác · [4.9-common-mistakes.md:3](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.9-common-mistakes.md): Tóm tắt nói 'string.Equals mặc định so sánh theo thứ tự byte, nên "i".ToUpper() trong văn hóa Thổ Nhĩ Kỳ cho ra "İ"'. Đây là quan hệ nhân quả sai. string.Equals mặc định là ordinal (UTF-16 code unit, không phải byte) và chính là cách AN TOÀN. Lỗi Turkish-I đến từ ToUpper/ToLower/string.Compare dùng văn hóa hiện tại.
  - Bằng chứng: `**'string.Equals' mặc định so sánh theo thứ tự byte**, nên '"i".ToUpper()' trong văn hoá Thổ Nhĩ Kỳ cho ra '"İ"'`
  - Sửa: Viết lại: 'Các hàm ToUpper/ToLower/Compare mặc định phụ thuộc văn hóa hiện tại; trong tr-TR, "i".ToUpper() là "İ". Hãy so sánh bằng string.Equals(a, b, StringComparison.OrdinalIgnoreCase)'.
- **minor** · chính xác · [4.10-advanced-notes.md:150](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.10-advanced-notes.md): Ví dụ tự khai báo `interface IParsable<TSelf>` trùng tên với System.IParsable&lt;TSelf&gt; có sẵn trong BCL (chữ ký là Parse(string, IFormatProvider?) và TryParse). Người học dễ nhầm hai interface. Snippet required ở mục 4.11.1 khai báo `var lead` hai lần (lỗi biên dịch), và có chú thích tiếng Việt không dấu ('LOI BIEN DICH', 'tuy chon').
  - Bằng chứng: `public interface IParsable<TSelf> where TSelf : IParsable<TSelf> { static abstract TSelf Parse(string s); }`
  - Sửa: Đổi tên thành `IParseableFromString<TSelf>` hoặc dùng thẳng System.IParsable&lt;T&gt; với đúng chữ ký. Sửa biến trùng tên (lead1/lead2) và viết chú thích có dấu.
- **minor** (ban đầu major) · nhất quán · [4.10-advanced-notes.md:236](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.10-advanced-notes.md): Tên định danh trộn tiếng Việt và tiếng Anh giữa các bài và ngay trong một bài: TaoLeadRequest/HoTen/NhanVienId (4.10), DiaChi/Tinh/Quan (4.12), VaiTro/CoQuyen/RentalInfo(ThoiHan, TienCoc) (4.11), `order.ĐủĐiềuKiệnMiễnPhíGiaoHàng()` có dấu (4.8), trong khi phần lớn module dùng tiếng Anh. Enum OrderStatus cũng có giá trị khác nhau giữa các bài (Draft/Confirmed… ở 4.8, Pending/Paid/Cancelled ở Bài 3 của 4.8). Người học dễ học theo thói quen đặt tên không chuẩn.
  - Bằng chứng: `public class TaoLeadRequest { public required string HoTen { get; init; } ... public required int NhanVienId { get; init; } }`
  - Sửa: Quy định trong README module: định danh tiếng Anh theo C# coding conventions, chú thích có thể dùng tiếng Việt. Đổi mọi định danh tiếng Việt sang tiếng Anh. Định nghĩa một enum OrderStatus và LeadStatus dùng chung cho toàn module.
  - Phản biện (adjusted): Có thật: 4.10 dòng 236 dùng TaoLeadRequest/HoTen, 4.8 dòng 403 dùng `order.ĐủĐiềuKiệnMiễnPhíGiaoHàng()`, còn phần lớn module dùng tiếng Anh. Đây là vấn đề nhất quán và quy ước đặt tên, không phải sai kỹ thuật (C# cho phép định danh Unicode), nên hạ xuống minor. Đề xuất quy ước chung trong README là hợp lý.
- **minor** (ban đầu major) · chính xác · [4.10-advanced-notes.md:619](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.10-advanced-notes.md): Bài đánh dấu `using var client = _factory.CreateClient(...)` là SAI với lý do 'làm đóng handler đang dùng chung'. Theo tài liệu Microsoft, dispose HttpClient tạo từ IHttpClientFactory là an toàn và không dispose handler. Ngay đoạn giải thích bên dưới cũng thừa nhận 'Dispose client không đóng handler'.

  ```text
  // SAI — using làm đóng handler đang được dùng chung
  using var client = _factory.CreateClient("billing");
  ```

  - Sửa: Sửa thành: 'Không bắt buộc dispose client từ factory (dispose cũng an toàn); vòng đời handler do factory quản lý'. Trường hợp 'cố tình không using' nên đổi sang ví dụ khác đúng hơn, như stream trả về cho caller hoặc service do DI quản lý.
  - Phản biện (adjusted): Đúng là sai. Theo docs Microsoft (IHttpClientFactory), dispose HttpClient tạo từ factory là không bắt buộc nhưng an toàn, vì handler do factory quản lý. Bài gắn nhãn 'SAI' và đưa lý do 'đóng handler', trong khi đoạn giải thích ngay dưới lại tự thừa nhận dispose không đóng handler. Cả hai cách đều không gây hại thực tế nên hạ xuống minor. Cần sửa nhãn và lý do.
- **minor** · chính xác · [4.12-quick-real-world-example.md:454](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.12-quick-real-world-example.md): Mã cảnh báo bị gán sai nghĩa: CS0661 là 'định nghĩa operator ==/!= mà không override GetHashCode'. Cảnh báo 'operator == mà không override Equals' là CS0660. Bảng 4.13.6 ghi record 'bất biến mặc định: Có', nhưng positional `record struct` (không readonly) vẫn mutable.
  - Bằng chứng: `CS0661: định nghĩa operator == mà không ghi đè Equals`
  - Sửa: Sửa thành CS0660 (thiếu Equals) và CS0661 (thiếu GetHashCode), rồi thêm cả hai vào WarningsAsErrors. Ghi chú: record class positional dùng init; record struct cần `readonly` để bất biến.
- **minor** · chính xác · [4.3-inheritance-and-polymorphism.md:298](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.3-inheritance-and-polymorphism.md): Nhiều bài ghi 'Kết quả chạy thật trên .NET 9' / '.NET 9.0.203' (4.1, 4.3, 4.7, 4.9, 4.10, 4.12). Khóa học nhắm .NET 10 LTS và .NET 9 STS sắp hết hỗ trợ. Một số snippet thiếu using không nằm trong implicit usings: System.Diagnostics cho Debug/Stopwatch, System.Globalization, System.Collections.Concurrent, System.Runtime.InteropServices cho CollectionsMarshal, System.Collections.Immutable.
  - Bằng chứng: `**Kết quả chạy thật trên .NET 9:**`
  - Sửa: Chạy lại các ví dụ trên net10.0/C# 14, cập nhật nhãn phiên bản và số đo. Thêm dòng using cần thiết ở đầu mỗi snippet chạy được, hoặc ghi chú 'cần using …'.
- **minor** · chính xác · [4.6-access-modifiers.md:3](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.6-access-modifiers.md): Bài nói 'C# có sáu mức truy cập' và 'interface member luôn public'. Từ C# 11 có thêm `file` (Microsoft Learn liệt kê cùng nhóm access modifiers, và chính bài 4.10 cũng nhắc tới). Từ C# 8, thành viên interface có thể khai báo private/protected/internal; public chỉ là mặc định.
  - Bằng chứng: `C# có **sáu** mức truy cập ... void Save();                // public — interface member luôn public`
  - Sửa: Thêm `file` (phạm vi một file, chỉ áp dụng cho kiểu). Sửa thành 'thành viên interface mặc định public (từ C# 8 có thể khai báo mức khác cho DIM/static)'.
- **minor** · nhất quán · [4.9-common-mistakes.md:138](../lessons/stage-02-csharp-professional/module-04-csharp-core/4.9-common-mistakes.md): Bài 4.9 coi 'trả về null' là lỗi và khuyên dùng TryXxx hoặc ném ngoại lệ, nhưng bảng trong Bài 3 cùng bài lại khuyên 'Tìm bản ghi có thể không tồn tại → Trả null hoặc Option'. `TryFind(int id, out Customer customer)` thiếu `[NotNullWhen(true)]` và `Customer?`. Mục 4.10.3 dùng nhánh `_ => 0m` trên enum nội bộ, trái với khuyến nghị bỏ `_` ở 4.8.
  - Bằng chứng: `public bool TryFind(int id, out Customer customer) ... | Tìm bản ghi có thể không tồn tại | Trả 'null' hoặc 'Option' |`
  - Sửa: Thống nhất: trả `Customer?` có chú thích nullable là chấp nhận được khi bật NRT; TryXxx dùng `[NotNullWhen(true)] out Customer? customer`. Bỏ `_` trong ví dụ CustomerTier hoặc ghi chú lý do giữ.

### Module 5 - Advanced C#

- **major** · nhất quán · [5.1-solid-principles.md:17](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.1-solid-principles.md): Đánh số mục lệch một trên toàn module: bài 5.1 dùng 5.2.x, bài 5.2 dùng 5.3.x, …, bài 5.12 dùng 5.13.x; module 6 cũng vậy (6.1 dùng 6.2.x …). Nhãn link nội bộ cũng lệch một: chữ 'bài 4.4' trỏ tới file 4.3, 'bài 5.7' trỏ tới 5.6, 'bài 6.2' trỏ tới 6.1, 'bài 16.5' trỏ tới 16.4. Có khi chữ 'bài 6.2' xuất hiện ngay trong chính bài 6.2.
  - Bằng chứng: `### 5.2.1 — Năm nguyên tắc, năm câu hỏi ... [Liskov ở bài 4.4](../module-04-csharp-core/4.3-inheritance-and-polymorphism.md)`
  - Sửa: Chạy một script đánh số lại heading theo số bài (5.1.1, 5.1.2…) và sửa văn bản link cho khớp số file đích, ví dụ dùng regex `bài (\d+)\.(\d+)\]\(([^)]*?)(\d+)\.(\d+)-` rồi lấy số từ tên file. Tương tự cho mục điều hướng 'Bài tiếp theo: 5.2 — 2. Generics' → '5.2 — Generics'.
- **major** · thực tế · [5.1-solid-principles.md:199](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.1-solid-principles.md): Phần lớn bài tập trong module (5.1 Bài 1-3, 5.5 Bài 3, 5.6 Bài 3, 5.10 Bài 2-3) yêu cầu 'lấy năm class lớn nhất trong dự án', 'git log 2 năm', 'project cũ', 'Program.cs &gt; 80 dòng'. Sinh viên CLB chưa có dự án như vậy; ở giai đoạn này CRM chưa tồn tại (Project 1 là Inventory). Lời giải lại dùng FluentValidation, Result&lt;T&gt;, Scrutor (services.Scan), MediatR, những thứ chưa được dạy.
  - Bằng chứng: `Lấy năm class lớn nhất trong dự án. ... services.Scan(scan => scan.FromAssemblyOf<IPaymentFee>()`
  - Sửa: Cung cấp một repo 'starter' CRM nhỏ (hoặc dùng Project 1 Inventory) có sẵn god class, chuỗi if/switch, Program.cs dài, để mọi bài tập thao tác trên cùng codebase. Ghi chú các thư viện ngoài (Scrutor, FluentValidation) là 'tham khảo, sẽ học ở Module 16'.
- **major** · dễ hiểu · [5.10-mini-case-study.md:75](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.10-mini-case-study.md): Code 'trước' dùng decimal, nhưng code 'sau' dùng kiểu Money (order.Total.Amount, Money.Zero, toán tử *, .Max() trên Money) mà không định nghĩa, cũng không nhắc tới. Case study cũng chỉ ôn lại SOLID, không vận dụng generics, LINQ, NRT, delegate hay tuple vừa học trong module.

  ```text
  public Money CalculateDiscount(Order order)
          => order.Total * options.Value.Percentage;
  ```

  - Sửa: Giữ decimal xuyên suốt, hoặc định nghĩa `public readonly record struct Money(decimal Amount) : IComparable<Money>` kèm toán tử * ở đầu bài. Bổ sung vào case study: dùng LINQ cho CalculateBestDiscount, NRT cho Tier?, tuple hoặc record cho kết quả, để case study tổng hợp được cả module.
- **major** · nhất quán · [5.12-review-and-assessment.md:22](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.12-review-and-assessment.md): Bài tập review yêu cầu 'dùng event để trigger email' và 'mỗi class không quá 80 dòng'. Cả hai mâu thuẫn trực tiếp với 5.1 (SRP không đo bằng số dòng) và 5.4/5.11 (không dùng event .NET để nối các service trong ASP.NET Core). Bảng tóm tắt dòng 132 cũng khuyên 'event pattern để decouple service'. Quiz chỉ có 5 câu dễ, không kiểm tra các điểm cốt lõi.

  ```text
  - Dùng event để trigger email thay vì gọi trực tiếp
  ...
  - [ ] Mỗi class không quá 80 dòng
  ```

  - Sửa: Đổi yêu cầu thành 'tách theo nhóm người yêu cầu thay đổi; email gửi qua IDomainEventHandler hoặc hàng đợi'. Bỏ ngưỡng 80 dòng. Viết lại quiz khoảng 10 câu về ToList/IQueryable, rò rỉ event, tuple serialize, NRT không kiểm tra lúc chạy, out/in. Cung cấp file CustomerService.cs mẫu và lời giải cho Bài 1–3. Xoá heading rỗng 5.13.4 và các phần boilerplate cuối bài.
- **major** · chính xác · [5.2-generics.md:224](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.2-generics.md): Nhiều đoạn 'lời giải' được trình bày như chương trình top-level hoàn chỉnh nhưng thiếu using cho namespace không nằm trong implicit usings. Ví dụ: ArrayList, Hashtable (System.Collections), Stopwatch (System.Diagnostics), Channel (System.Threading.Channels, ở 6.8 dòng 251), NotNullWhen (System.Diagnostics.CodeAnalysis). 5.4 (dòng 237-251) còn khai class trước top-level statements, gây lỗi CS8803. Sinh viên copy về sẽ không biên dịch được.

  ```text
  var m0 = GC.GetTotalMemory(true);
  var sw = Stopwatch.StartNew();
  var al = new ArrayList();
  ```

  - Sửa: Với mỗi đoạn code đánh dấu 'lời giải', ghi đủ dòng using ở đầu và đặt khai báo type ở cuối file (sau top-level statements). Tốt nhất là đưa code vào thư mục samples/ có .csproj net10.0 và chạy CI `dotnet build` cho toàn bộ ví dụ.
- **major** · dễ hiểu · [5.3-linq.md:17](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.3-linq.md): Bài LINQ dạy lambda, Func và delegate trước bài 5.4 Delegates, và phần lớn ví dụ cùng 2/3 bài tập phụ thuộc EF Core (_db, ToListAsync, AsNoTracking, log SQL). EF Core là Module 13 và async là Module 6. Bài không hướng dẫn dựng database, nên sinh viên không làm được Bài 1 và Bài 3. Các toán tử cốt lõi như Select/SelectMany, OrderBy/ThenBy, GroupBy, Join, ToDictionary, anonymous type gần như không được dạy bằng ví dụ chạy được.
  - Bằng chứng: `var result = await q.ToListAsync(ct);      // MỘT câu SQL duy nhất ... Bật log SQL của EF Core và so sánh câu lệnh sinh ra`
  - Sửa: Đổi thứ tự 5.3 và 5.4 (hoặc thêm khung 'lambda là gì' ở đầu 5.3). Thêm phần 'LINQ trên List&lt;Customer&gt; trong bộ nhớ' với 6–8 toán tử cơ bản, có dữ liệu CRM mẫu chạy được trong console. Đánh dấu phần IQueryable/EF Core là 'xem trước — thực hành ở Module 13' và cung cấp project mẫu SQLite có sẵn seed cho Bài 1, Bài 3.
- **major** (ban đầu critical) · chính xác · [5.4-delegates-and-events.md:292](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.4-delegates-and-events.md): Lời giải Bài 1 và Bài 2 dùng OnDoi, nhưng phương thức được khai báo tên OnNotified. Code không biên dịch (CS0103). Gợi ý ở dòng 233 còn nhắc 'publisher.Doi', một event không tồn tại.
  - Bằng chứng: `_pub.Notified += OnDoi;  ...  private void OnNotified(object? s, EventArgs e) { }  ...  public void Dispose() => _pub.Notified -= OnDoi;`
  - Sửa: Thay mọi OnDoi bằng OnNotified (dòng 292, 297, 371, 372) và sửa gợi ý dòng 233 thành 'subscriber.OnNotified được gắn vào publisher.Notified'. Chạy lại cả hai đoạn trên .NET 10 trước khi xuất bản.
  - Phản biện (adjusted): Xác nhận: phương thức tên OnNotified nhưng code đăng ký/gỡ dùng OnDoi (dòng 292, 297, 371-372), gây lỗi CS0103. Gợi ý ở dòng 233 nhắc 'subscriber.OnDoi'/'publisher.Doi', đều không tồn tại. Đây là lỗi đổi tên còn sót, sửa đơn giản, nên hạ từ critical xuống major.
- **major** (ban đầu critical) · chính xác · [5.5-extension-methods.md:91](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.5-extension-methods.md): Ví dụ 'nguy hiểm' đặt tên extension là Normalize, trong khi string đã có sẵn phương thức instance Normalize(). Theo chính quy tắc 'class luôn thắng' của bài, name.Normalize() sẽ gọi string.Normalize chứ không gọi extension. NullReferenceException vì thế nổ ngay tại chỗ gọi, ngược với lời giải thích trong bài.

  ```text
  public static string Normalize(this string s) => s.Trim().ToLowerInvariant();
  name.Normalize();      // NỔ, nhưng nổ BÊN TRONG extension chứ không phải ở đây
  ```

  - Sửa: Đổi tên thành NormalizeKey hoặc ToSlug, rồi chạy lại để xác nhận lỗi nổ bên trong extension. Có thể thêm một câu: 'chính string đã có Normalize(), nên đặt tên như vậy thì extension không bao giờ được gọi', làm ví dụ minh hoạ cho mục 5.6.2.
  - Phản biện (adjusted): Lỗi có thật và đã chạy kiểm chứng trên .NET 10 SDK 10.0.401: name.Normalize() với name null gọi string.Normalize() có sẵn (phương thức instance luôn thắng), nên ném NullReferenceException ngay tại dòng gọi (stack trace trỏ vào Program.Main) chứ không phải bên trong extension. Trình biên dịch cũng chỉ cảnh báo CS8602. Hạ xuống major vì đây là ví dụ minh hoạ sai chứ không làm hỏng cả bài. Cách sửa của reviewer là đúng: đổi tên (ví dụ NormalizeKey) và dùng chính trường hợp này làm ví dụ cho quy tắc 'class luôn thắng'.
- **major** · chính xác · [5.6-nullable-reference-types.md:281](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.6-nullable-reference-types.md): Câu văn tự mâu thuẫn: nói 'required vẫn không chặn được giải mã JSON', ngay sau đó lại nói STJ ném lỗi khi thiếu trường. Thêm nữa, STJ hỗ trợ required từ .NET 7 chứ không phải .NET 8. Thông báo lỗi thật dùng tên thuộc tính 'Name', 'Email' (không camelCase với options mặc định).
  - Bằng chứng: `Nhưng 'required' **vẫn không** chặn được giải mã JSON — từ .NET 8, 'System.Text.Json' tôn trọng 'required' và **ném ngoại lệ** khi thiếu trường`
  - Sửa: Viết lại: 'Từ .NET 7, System.Text.Json tôn trọng required: thiếu trường thì ném JsonException ngay ở ranh giới — tốt hơn hẳn NRE. Nhưng required không chặn được JSON gửi null tường minh; từ .NET 9 có thể bật JsonSerializerOptions.RespectNullableAnnotations'. Cập nhật thông báo lỗi theo kết quả chạy thật.
- **major** · chính xác · [5.7-overview.md:227](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.7-overview.md): Bài khẳng định hằng số trong lambda được EF Core dịch thành tham số @p0/@p1. Thực tế hằng số literal được inline vào SQL; chỉ biến được closure capture mới thành tham số. Bài 5.3 đã cho thấy đúng hành vi inline ('WHERE c."Revenue" &gt; 50000000.0'). Bài 5.9 (dòng 515-516, 532) lặp lại cùng lỗi.

  ```text
  | `Constant: 1000000` | tham số `@p0` |
  ...
  WHERE o."Total" > @p0 AND o."Status" = @p1
  ```

  - Sửa: Sửa thành `WHERE o."Total" > 1000000.0 AND o."Status" = 1`. Thêm một câu: 'giá trị lấy từ biến (closure) mới thành tham số @__x_0 — vì vậy truy vấn với giá trị do người dùng nhập nên đi qua biến để tận dụng plan cache'. Áp dụng cho LocTheo ở Bài 3 (Expression.Constant inline 'HN').
- **major** · chính xác · [5.8-tuples-and-deconstruction.md:73](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.8-tuples-and-deconstruction.md): Phần lý thuyết nói JsonSerializer.Serialize một tuple ra {"Item1":100,"Item2":5}, nhưng lời giải Bài 1 của chính bài (dòng 205) lại đúng khi ghi kết quả là {}. Lý do: System.Text.Json mặc định bỏ qua field, mà ValueTuple chỉ có field. Hai đoạn tự mâu thuẫn.

  ```text
  JsonSerializer.Serialize(GetStats());
  // {"Item1":100,"Item2":5}     ← không phải Total và Count
  ```

  - Sửa: Sửa comment thành `// {}  — ValueTuple chỉ có field Item1/Item2, STJ mặc định bỏ qua field; bật IncludeFields thì ra {"Item1":100,"Item2":5}`. Sửa câu tự kiểm tra ở dòng 448 cho khớp.
- **major** · chính xác · [5.9-advanced-notes.md:72](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.9-advanced-notes.md): ConfigureHttpJsonOptions chỉ áp dụng cho Minimal API (Results/TypedResults), không áp dụng cho MVC controller. Bài lại vừa dùng controller [HttpGet] và nói đây là 'đăng ký cho toàn bộ ứng dụng'.

  ```text
  Đăng ký cho toàn bộ ứng dụng:
  
  builder.Services.ConfigureHttpJsonOptions(o =>
      o.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonContext.Default));
  ```

  - Sửa: Ghi rõ: Minimal API dùng ConfigureHttpJsonOptions; controller dùng `builder.Services.AddControllers().AddJsonOptions(o => o.JsonSerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonContext.Default))`. Sửa cả dòng 409.
- **major** (ban đầu critical) · chính xác · [5.9-advanced-notes.md:150](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.9-advanced-notes.md): Interface khai báo out T nhưng phương thức trả Task&lt;T?&gt;. Task&lt;T&gt; là class bất biến (invariant), nên T không được dùng ở vị trí covariant. Đoạn code báo lỗi CS1961 và phép gán sang IReadOnlyRepository&lt;IEntity&gt; cũng không hợp lệ.

  ```text
  public interface IReadOnlyRepository<out T>          // chỉ TRẢ VỀ T
  {
      Task<T?> GetByIdAsync(Guid id, CancellationToken ct);
  }
  ```

  - Sửa: Đổi ví dụ sang interface đồng bộ, ví dụ `T? GetById(Guid id)` hoặc `IEnumerable<T> GetAll()`. Hoặc giữ nguyên và ghi chú rằng Task&lt;T&gt; không covariant nên phương thức async không khai được out T; nếu cần covariance thì trả về IAsyncEnumerable&lt;T&gt; (interface này covariant).
  - Phản biện (adjusted): Đã biên dịch thử trên .NET 10: `interface IRepo<out T> { Task<T?> GetByIdAsync(Guid id); }` báo lỗi CS1961 'Invalid variance... T is covariant'. Lỗi có thật, cách sửa hợp lý (dùng phương thức đồng bộ T?/IEnumerable&lt;T&gt; hoặc IAsyncEnumerable&lt;T&gt;). Hạ xuống major vì nằm trong bài 'advanced notes', không phải kiến thức lõi.
- **major** · nhất quán · [5.9-advanced-notes.md:453](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.9-advanced-notes.md): Tên thuộc tính của entity Lead không thống nhất: ngay trong bài 5.9 vừa dùng l.Value/l.Name (dòng 84, 49), vừa dùng HoTen/GiaTri/TrangThai/NgayTao. Các bài khác dùng Customer/KhachHang, Order/DonHang, db.KhachHangs (6.10 dòng 494). Database cũng nhảy giữa PostgreSQL, SQL Server và SQLite.
  - Bằng chứng: `Expression<Func<Lead, bool>>   e1 = l => l.GiaTri > 1_000_000;  (dòng 87: l => l.Value > 1000)`
  - Sửa: Chốt một mô hình CRM chung, ví dụ Customer, Lead, Deal, Order với thuộc tính tiếng Anh (Name, Email, Value, Status, CreatedAt), ghi vào glossary, rồi thay thế đồng loạt. Chọn một database mặc định (PostgreSQL) cho mọi SQL mẫu, các dialect khác chỉ ghi chú.
- **minor** · nhất quán · [5.11-quick-real-world-example.md:70](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.11-quick-real-world-example.md): Bài nói 51.000 handler cùng chạy và 'sinh ra hàng nghìn exception mỗi giây'. Nhưng theo 5.4, handler đầu tiên ném lỗi thì các handler sau không chạy, nên mỗi lần phát sự kiện chỉ có một exception.
  - Bằng chứng: `mỗi lần tồn kho thay đổi, **51.000 handler cùng chạy**, mỗi cái cố ghi vào một 'DbContext' đã bị 'Dispose' từ lâu — sinh ra hàng nghìn exception mỗi giây.`
  - Sửa: Sửa thành: 'handler đầu tiên ném ObjectDisposedException và chặn toàn bộ handler sau — kể cả handler hợp lệ của request hiện tại — nên tính năng thông báo hỏng hoàn toàn'.
- **minor** (ban đầu major) · chính xác · [5.11-quick-real-world-example.md:472](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.11-quick-real-world-example.md): Test gọi h.Dispose(), nhưng lớp XuLyScoped (dòng 216-221) không cài IDisposable và không có phương thức Dispose, nên code không biên dịch. Bài 3 cũng không đo bản IServiceScopeFactory như đề yêu cầu, mà mượn lại số đo của bản event có gỡ đăng ký (dòng 617-624).

  ```text
  var h = new XuLyScoped(bus, []);
          h.DangKy();
          h.Dispose();
  ```

  - Sửa: Thêm `: IDisposable` và `public void Dispose() => bus.DaTaoLead -= Xuly;` vào XuLyScoped (đặt sau phần giải thích bài 2). Chạy và ghi số đo thật cho bản IServiceScopeFactory ở Bài 3.
  - Phản biện (adjusted): Lớp XuLyScoped khai báo ở dòng 216 không có Dispose. Nhưng dòng 380-405 đã trình bày phương thức Dispose cần thêm, và test ở dòng 463 ngầm dùng phiên bản đã sửa. Đây là chỗ thiếu rõ ràng (nên ghi đủ lớp có `: IDisposable`) hơn là code sai hoàn toàn. Bài 3 thừa nhận số đo mượn từ bản event có gỡ đăng ký (dòng 617-624) chứ không giấu. Hạ xuống minor: nên hiển thị đầy đủ lớp đã sửa và chạy số đo thật cho bản IServiceScopeFactory.
- **minor** · chính xác · [5.2-generics.md:168](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.2-generics.md): Bài nói tra cứu static generic 'thực hiện lúc JIT chứ không phải lúc chạy'. Câu này không chính xác: với T là kiểu tham chiếu, mã dùng chung phải tra generic dictionary lúc chạy, và giá trị được khởi tạo khi truy cập lần đầu. Câu tự kiểm tra ở dòng 464 lặp lại ý này.
  - Bằng chứng: `đây là cách cài đặt cache theo kiểu rất nhanh, vì tra cứu được thực hiện lúc JIT chứ không phải lúc chạy.`
  - Sửa: Sửa thành: 'rất nhanh vì không cần băm hay khoá — truy cập gần như một field tĩnh; giá trị tính một lần khi kiểu được khởi tạo lần đầu'.
- **minor** (ban đầu major) · chính xác · [5.2-generics.md:275](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.2-generics.md): CA1815 là quy tắc 'Override equals and operator equals on value types', không liên quan tới cảnh báo boxing. Comment dòng 265 nói về 'chuỗi nội suy' nhưng code minh hoạ lại là `object o = 42`.
  - Bằng chứng: `quy tắc 'CA1815' và các quy tắc nhóm hiệu năng cảnh báo nhiều trường hợp boxing không cần thiết`
  - Sửa: Bỏ CA1815. Thay bằng: 'dùng profiler cấp phát (dotnet-counters, Visual Studio .NET Object Allocation) hoặc analyzer bên thứ ba như ClrHeapAllocationAnalyzer'. Sửa comment dòng 265 thành 'Gán kiểu giá trị cho object' cho khớp code.
  - Phản biện (adjusted): Đúng là CA1815 là 'Override equals and operator equals on value types', không cảnh báo boxing, và comment 'chuỗi nội suy' không khớp code `object o = 42`. Tuy vậy đây chỉ là một câu phụ trong lời giải, không ảnh hưởng nội dung chính, nên hạ xuống minor. Cách sửa của reviewer hợp lý.
- **minor** (ban đầu major) · đầy đủ · [5.5-extension-methods.md:17](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.5-extension-methods.md): Khoá học nhắm .NET 10/C# 14, nhưng bài không nhắc tới extension members của C# 14 (khối `extension(...)` cho phép extension property, static extension). Đây là thay đổi lớn nhất của tính năng này trong phiên bản hiện hành.

  ```text
  public static class StringExtensions          // phải static
  {
      public static bool IsValidEmail(this string? value)
  ```

  - Sửa: Thêm một mục ngắn 'C# 14: extension members' với ví dụ `public static class CustomerExtensions { extension(Customer c) { public bool IsVip => c.TotalRevenue > 50_000_000m; } }`. Nêu rõ cú pháp `this` cũ vẫn hợp lệ và nên ưu tiên cú pháp nào cho người mới.
  - Phản biện (adjusted): Đúng là bài không nhắc tới extension members của C# 14 (khối `extension(...)`). Nhưng cú pháp `this` cũ vẫn hợp lệ hoàn toàn, và tính năng mới không phải kiến thức lõi cho sinh viên mới học. Đây là thiếu sót về độ cập nhật, nên hạ xuống minor: thêm một mục ngắn 'C# 14: extension members' là đủ.
- **minor** · chính xác · [5.7-overview.md:202](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.7-overview.md): Output in ra '(o.Status == Paid)' cho phép so sánh enum có thể không đúng: trình biên dịch thường sinh nút Convert sang kiểu nền, nên ToString có dạng '(Convert(o.Status, Int32) == 1)'. Trong cùng bài, `q.Where(...)` ở dòng 45 và 50 bỏ qua giá trị trả về, nên không có truy vấn nào chạy.
  - Bằng chứng: `phải   : Equal        (o.Status == Paid)`
  - Sửa: Chạy lại đoạn code trên .NET 10 và dán output thật (có thể kèm giải thích nút Convert). Đổi `q.Where(...)` thành `q = q.Where(...)` hoặc `var filtered = q.Where(...)` để không dạy sai rằng Where làm thay đổi query.
- **minor** · chính xác · [5.8-tuples-and-deconstruction.md:303](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.8-tuples-and-deconstruction.md): Bài nói gọi hàm có out thì 'phải khai báo biến trước', nhưng chính code minh hoạ lại dùng `out int count` khai báo inline (C# 7+). Dòng 20 cũng nói như vậy. Ngoài ra, ở dòng 418, tên phần tử tuple `tenantId:` khác `TenantId` của kiểu đích, gây cảnh báo CS8123.

  ```text
  // 1 — phải khai báo biến trước, không dùng được trong biểu thức
  Analyze(orders, out int count, out decimal total, out decimal average);
  ```

  - Sửa: Sửa thành 'không dùng được trong biểu thức một dòng (dù C# 7 cho khai báo out var inline)'. Dòng 418 sửa thành `cache[(TenantId: 1, CustomerId: 42)] = kh;`.
- **minor** · chính xác · [5.9-advanced-notes.md:21](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.9-advanced-notes.md): Comment '200.000 bản ghi = OOM' phóng đại: chính số đo của bài cho thấy 100.000 bản ghi chỉ dùng khoảng 66 MB heap. Các dòng 215, 359, 461 còn ghi '.NET 9.0.203', vốn là số phiên bản SDK, không phải runtime, trong khi khoá học nhắm .NET 10.
  - Bằng chứng: `// Nạp HẾT vào bộ nhớ — 200.000 bản ghi = OOM`
  - Sửa: Sửa thành 'vài triệu bản ghi hoặc bản ghi lớn có thể làm OOM container 512 MiB'. Chạy lại các phép đo trên .NET 10 và ghi đúng phiên bản runtime (ví dụ '.NET 10.0.x runtime').
- **minor** · chính xác · [5.9-advanced-notes.md:129](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/5.9-advanced-notes.md): Thông tin về Span đã lỗi thời so với C# 13/14: biến cục bộ ref struct (Span&lt;T&gt;) đã được dùng trong phương thức async và iterator, miễn là không sống qua await hoặc yield.
  - Bằng chứng: `'Span<T>' là 'ref struct' — **không** dùng được trong phương thức 'async'`
  - Sửa: Sửa thành: 'không được giữ Span qua một await (từ C# 13 có thể khai báo Span trong phương thức async nhưng chỉ dùng giữa hai await)'.
- **minor** · cấu trúc · [README.md:3](../lessons/stage-02-csharp-professional/module-05-advanced-csharp/README.md): README module chỉ có danh sách bài. Không có mục tiêu module, kiến thức tiên quyết, thời lượng dự kiến hay gợi ý chia buổi sinh hoạt. Phần tóm tắt nhắc 'spans, exception semantics' (không có bài nào dạy exception) và cụm 'hiện diện bộ nhớ' tối nghĩa. Tên file 5.7-overview.md và tiêu đề '(Overview)' cũng không mô tả nội dung. README module 6 có cùng thiếu sót.
  - Bằng chứng: `> **Tóm tắt:** C# nâng cao: generics, LINQ, nullable reference types, spans, exception semantics — tối ưu an toàn kiểu và hiện diện bộ nhớ trong service layer.`
  - Sửa: Viết lại tóm tắt theo đúng nội dung. Thêm các mục: Mục tiêu module, Tiên quyết (Module 4; với 5.3 nên đã cài .NET 10 SDK và Docker/SQLite), Lộ trình gợi ý cho buổi live-coding (ví dụ 4 buổi), Bài bắt buộc và bài đọc thêm (5.7, 5.9). Đổi tên file thành 5.7-expression-trees-and-reflection.md.

### Module 6 - Async Programming

- **major** · chính xác · [6.1-why-async-matters.md:62](../lessons/stage-02-csharp-professional/module-06-async-programming/6.1-why-async-matters.md): Bảng lấy ví dụ truy vấn 50ms nhưng kết luận '42 request xếp hàng, chờ ~42 giây'. Với 8 thread và mỗi request 50ms, 50 request đồng thời được xử lý xong dưới 0,5 giây. Con số chỉ đúng khi mỗi request chặn khoảng 1 giây trở lên.
  - Bằng chứng: `| 50 | 42 request xếp hàng, chờ ~42 giây | Chạy gần như ngay |`
  - Sửa: Nêu rõ giả định, ví dụ 'mỗi request gọi API ngoài chặn 1 giây, tải duy trì liên tục'. Hoặc tính lại với 50ms. Nên kèm công thức Little's Law (số thread cần = RPS × thời gian chặn) để sinh viên tự ước lượng.
- **major** · nhất quán · [6.1-why-async-matters.md:229](../lessons/stage-02-csharp-professional/module-06-async-programming/6.1-why-async-matters.md): Bài khuyên đặt CA2007 (bắt buộc ConfigureAwait) thành lỗi cho mọi dự án, trong khi 6.3 nói rõ ASP.NET Core không cần ConfigureAwait và phải tắt CA2007 cho dự án ứng dụng. 6.7 (dòng 442) lặp lại cùng lỗi.
  - Bằng chứng: `<WarningsAsErrors>$(WarningsAsErrors);CA2007;CA1849</WarningsAsErrors>`
  - Sửa: Bỏ CA2007 khỏi cấu hình ở 6.1 và 6.7, chỉ giữ CA1849 (và VSTHRD002). Thêm một câu dẫn sang 6.3: 'CA2007 chỉ bật cho thư viện'.
- **major** · thực tế · [6.11-quick-real-world-example.md:58](../lessons/stage-02-csharp-professional/module-06-async-programming/6.11-quick-real-world-example.md): Kịch bản không hợp lý: một endpoint chỉ gọi khoảng 20 lần/ngày, mỗi lần chặn 3 giây, không thể làm 112 thread bận và tạo hàng đợi 1.847 việc ở 200 req/s. Học viên sẽ học sai về điều kiện gây starvation.
  - Bằng chứng: `Một dòng. Trong một endpoint xuất báo cáo được gọi khoảng **20 lần mỗi ngày**.`
  - Sửa: Đổi kịch bản thành endpoint được gọi thường xuyên (ví dụ danh sách khách hàng gọi .Result khoảng 50 req/s), hoặc báo cáo bị cron/BI tool gọi dồn dập. Hoặc giải thích rõ cơ chế khuếch đại, ví dụ client retry.
- **major** · cấu trúc · [6.11-quick-real-world-example.md:110](../lessons/stage-02-csharp-professional/module-06-async-programming/6.11-quick-real-world-example.md): Module trùng lặp nhiều. ValueTask được dạy ở 6.1 Bài 3, 6.2, 6.6 và 6.9; PeriodicTimer ở 6.8 và 6.9; IAsyncDisposable ở 6.6 và 6.9; starvation và .Result ở 6.1 và 6.11; DbContext song song, WhenAll mất exception và SemaphoreSlim ở 6.5 và 6.10. Module 5 cũng vậy: event leak ở 5.4 và 5.11 gần như trùng hoàn toàn, expression tree ở 5.7 và 5.9, covariance ở 5.2 và 5.9. Lặp lại làm bài dài, quá tải và dễ sinh mâu thuẫn.
  - Bằng chứng: `6.11 Bài 1 tái hiện starvation giống 6.1 Bài 1; 5.11 Bài 2 'Chứng minh lambda không gỡ được' giống 5.4 Bài 2`
  - Sửa: Mỗi khái niệm chỉ dạy kỹ ở một bài; bài sau chỉ tham chiếu kèm 1–2 câu. Biến 5.11 và 6.11 thành case study ngắn chỉ áp dụng kiến thức đã học (không lặp bài tập), và rút gọn 5.9 và 6.9 thành bảng 'chủ đề mở rộng' có link.
- **major** · chính xác · [6.11-quick-real-world-example.md:158](../lessons/stage-02-csharp-professional/module-06-async-programming/6.11-quick-real-world-example.md): Bài khẳng định Task.Run(async () =&gt; await …) 'chiếm HAI thread thay vì không chiếm cái nào', và câu tự kiểm tra ở dòng 640 lặp lại ý này. Thực tế lambda async chỉ dùng thread pool trong đoạn ngắn tới await đầu tiên, sau đó không giữ thread nào. Chi phí chỉ là thêm một lần xếp lịch, và khẳng định này mâu thuẫn với 6.2.

  ```text
  // SAI — chiếm HAI thread thay vì không chiếm cái nào
  await Task.Run(async () => await _service.DoAsync());
  ```

  - Sửa: Sửa thành: 'thừa — thêm một lần xếp lịch lên thread pool và làm mất ngữ cảnh lỗi, không đem lại gì'. Sửa câu tự kiểm tra ở dòng 640 tương ứng.
- **major** · chính xác · [6.11-quick-real-world-example.md:266](../lessons/stage-02-csharp-professional/module-06-async-programming/6.11-quick-real-world-example.md): Bài nói thread pool nở 1–2 luồng/giây và 'giải thích chính xác' con số 4.356 ms. Nhưng chính số đo của bài là từ 4 lên 41 luồng trong khoảng 4 giây (khoảng 9 luồng/giây). Từ .NET 6, thread pool đã bơm thêm luồng nhanh hơn khi phát hiện luồng bị chặn bởi Task.Wait/.Result. Con số '1 thread mỗi giây' ở 6.1 cũng lặp lại hiểu biết cũ.
  - Bằng chứng: `Bắt đầu 4 luồng (= số nhân), tăng khoảng 1–2 luồng mỗi giây ... -> hệ thống phải đợi pool nở tới ~41 luồng`
  - Sửa: Ghi rõ: tốc độ hill-climbing mặc định chậm, nhưng từ .NET 6 runtime bù luồng nhanh hơn khi phát hiện sync-over-async. Starvation vẫn xảy ra dưới tải cao, chỉ không còn tuyến tính 1 luồng/giây. Dẫn trang 'Debug ThreadPool starvation' của Microsoft Learn. Sửa đồng bộ 6.1 dòng 3, 53 và 6.11 dòng 293.
- **major** · cấu trúc · [6.12-review-and-assessment.md:13](../lessons/stage-02-csharp-professional/module-06-async-programming/6.12-review-and-assessment.md): Bài review là boilerplate: mục tiêu chung chung ('Nắm được ý chính của bài'), hai heading rỗng (6.13.2, 6.13.6), 'Bài tập tổng hợp', 'Tự kiểm tra' và 'Kết luận' không nói gì. Ba bài thực hành không có lời giải hay tiêu chí chấm. Bài 1 yêu cầu 'mock DbContext', một việc khó và không được khuyến nghị, trong khi testing chưa được dạy. Bài 5.12 có cùng vấn đề.

  ```text
  4. Viết unit test mock `DbContext` để kiểm tra cancel behavior ... ### 6.13.2 — Tóm tắt + Quick Reference
  
  ### 6.13.3
  ```

  - Sửa: Xoá các heading rỗng và các phần boilerplate. Thêm lời giải mẫu trong &lt;details&gt; cho Bài 1–3, có tiêu chí hoàn thành. Thay 'mock DbContext' bằng 'test với SQLite in-memory hoặc kiểm tra huỷ bằng CancellationTokenSource đã Cancel()'. Mở rộng quiz lên 10 câu, bám các bẫy chính (await trong vòng lặp, DbContext song song, WhenAll mất exception, async void qua lambda).
- **major** · nhất quán · [6.12-review-and-assessment.md:209](../lessons/stage-02-csharp-professional/module-06-async-programming/6.12-review-and-assessment.md): Quiz chấp nhận async void cho 'top-level fire-and-forget có chủ đích', trái với 6.2 ('Trong backend không có trường hợp nào cần async void'). Bảng Do/Don't còn khuyên dùng ValueTask cho cache hot-path và coi 'Task&lt;T&gt; mặc định' là Don't, ngược với 6.1, 6.2 và 6.9 ('Mặc định dùng Task').
  - Bằng chứng: `B. Event handler UI / top-level fire-and-forget có chủ đích ... | Cache hot-path | 'ValueTask<T>' | 'Task<T>' mặc định cho mọi thứ |`
  - Sửa: Đáp án câu 5 chỉ giữ 'event handler UI'. Sửa dòng ValueTask thành 'Cache hot-path đã đo được cấp phát là nút thắt → ValueTask; mặc định → Task'. Sửa dòng CPU-bound background cho khớp 6.7.
- **major** · nhất quán · [6.4-cancellationtoken.md:290](../lessons/stage-02-csharp-professional/module-06-async-programming/6.4-cancellationtoken.md): Bảng kết quả Bài 1 ghi Task.Delay 'chiếm luồng 30 giây' và 'giữ kết nối database 30 giây'. Thực tế endpoint chỉ gọi Task.Delay, không chiếm luồng nào và không chạm database. Điều này mâu thuẫn trực tiếp với thông điệp cốt lõi của 6.1 và 6.2 ('await không giữ thread').

  ```text
  | Luồng bị chiếm | 2 giây | 30 giây |
  | Kết nối database giữ | 2 giây | 30 giây |
  ```

  - Sửa: Đổi bảng thành 'Thời gian server còn làm việc cho request đã bị bỏ: 2s / 30s'. Nếu muốn nói về tài nguyên thì thay Task.Delay bằng một truy vấn DB thật (ví dụ pg_sleep(30)) để thấy connection bị giữ.
- **major** · chính xác · [6.6-async-patterns.md:157](../lessons/stage-02-csharp-professional/module-06-async-programming/6.6-async-patterns.md): Mẫu GetOrAdd + finally TryRemove có lỗi khi task hoàn tất đồng bộ, ví dụ FindAsync trả entity đã được track. Khi đó finally chạy trước lúc GetOrAdd thêm task vào dictionary, nên task đã xong bị lưu vĩnh viễn: dữ liệu cũ và rò rỉ bộ nhớ.

  ```text
  => _inFlight.GetOrAdd(id, async key =>
      {
          try { return await _db.Customers.FindAsync(key); }
          finally { _inFlight.TryRemove(key, out _); }
  ```

  - Sửa: Dùng Lazy&lt;Task&lt;T&gt;&gt; và gỡ entry bằng ContinueWith sau khi đã thêm vào dictionary. Hoặc khuyên dùng thẳng HybridCache (gói Microsoft.Extensions.Caching.Hybrid) và giới thiệu mẫu tự viết như kiến thức tham khảo.
- **major** · chính xác · [6.6-async-patterns.md:318](../lessons/stage-02-csharp-professional/module-06-async-programming/6.6-async-patterns.md): Demo stampede gọi 50 lần GetBranchesAsync song song trên cùng một service dùng chung _db. Với cùng một DbContext, các truy vấn đồng thời sẽ ném InvalidOperationException ('A second operation…') như bài 6.5 đã dạy, chứ không ra '50 truy vấn'. Mẫu _inFlight ở dòng 154-161 gặp vấn đề tương tự: service phải là singleton mới khử trùng lặp được, nhưng singleton thì lại không được giữ DbContext.

  ```text
  await Task.WhenAll(Enumerable.Range(1, 50).Select(_ => svc.GetBranchesAsync(ct)));
  // đếm dòng log "Executed DbCommand" -> 50
  ```

  - Sửa: Cho LoadFromDbAsync tạo context riêng qua IDbContextFactory (`await using var db = await _factory.CreateDbContextAsync(ct)`) và đăng ký service là singleton. Thêm ghi chú: cache trong bộ nhớ dùng chung giữa các request thì không được giữ DbContext scoped.
- **major** · chính xác · [6.6-async-patterns.md:477](../lessons/stage-02-csharp-professional/module-06-async-programming/6.6-async-patterns.md): Endpoint bỏ qua kết quả (discard) ValueTask của EnqueueAsync trên channel bounded dùng FullMode.Wait. Khi hàng đầy, áp lực ngược bị mất và một ValueTask bị bỏ rơi (vi phạm CA2012). Đây đúng là lỗi fire-and-forget mà bài đang dạy cách tránh, và mâu thuẫn với 'Bốn điểm quan trọng' ở dòng 485. Biến kh cũng không được định nghĩa.

  ```text
  // 3. Endpoint chỉ xếp hàng
  _ = q.EnqueueAsync(new EmailJob(kh.Email), ct);
  ```

  - Sửa: Sửa thành `await q.EnqueueAsync(new EmailJob(customer.Email), ct);` và giải thích rằng chính lệnh await này tạo ra backpressure.
- **major** · nhất quán · [6.7-common-pitfalls.md:54](../lessons/stage-02-csharp-professional/module-06-async-programming/6.7-common-pitfalls.md): Bẫy 3 nói Task.Run 'bắt thread hiện tại chờ' và 'không giúp gì' cho CPU-bound trong ASP.NET Core. Điều này mâu thuẫn với 6.1 (dòng 87-89 khuyên dùng Task.Run cho CompressAsync trong service) và bảng Do/Don't ở 6.12. Ngoài ra, nói thread hiện tại 'chờ' là sai: sau await, thread được trả về pool, như chính lời giải Bài 1 dòng 244 đã viết.
  - Bằng chứng: `'Task.Run' lấy một thread khác cũng từ chính pool đó rồi bắt thread hiện tại chờ`
  - Sửa: Thống nhất một thông điệp: trong ASP.NET Core, Task.Run cho CPU-bound không tăng throughput vì cùng pool, chỉ đổi thread; công việc CPU nặng nên đưa ra job nền. Sửa câu 'bắt thread hiện tại chờ' thành 'thread hiện tại được trả về pool, nhưng thread mới bị chiếm cho phần tính toán'. Sửa ví dụ 6.1 dòng 87 và dòng 128 của 6.12 cho khớp.
- **major** · nhất quán · [6.7-common-pitfalls.md:420](../lessons/stage-02-csharp-professional/module-06-async-programming/6.7-common-pitfalls.md): Số thứ tự bẫy trong bảng và file mẫu của Bài 3 không khớp với nội dung bài: bẫy 3 trong bài là 'Task.Run trong ASP.NET Core', nhưng trong bảng là 'DbContext dùng chung'; bẫy 9 trong bài là 'coi OCE là lỗi', trong bảng là 'Thiếu CancellationToken'. Dòng 434 còn nói DbContext dùng chung 'không ném ngoại lệ', trái với 6.5 vốn nói nó ném InvalidOperationException.
  - Bằng chứng: `| 3 | 'DbContext' dùng chung | ... | 9 | Thiếu 'CancellationToken' | ... **Bẫy số 3 và số 6 là hai bẫy tốn kém nhất**, vì cả hai đều **không ném ngoại lệ**`
  - Sửa: Đánh số lại bảng và comment trong file mẫu theo đúng 9 bẫy 6.8.1–6.8.9. Nếu muốn giữ 'DbContext dùng chung' và 'thiếu token' thì thêm chúng thành bẫy 10 và 11 trong phần lý thuyết. Sửa câu dòng 434: DbContext dùng chung thường ném InvalidOperationException, chỉ đôi khi làm hỏng change tracker.
- **major** · chính xác · [6.8-channels-and-producer-consumer.md:161](../lessons/stage-02-csharp-professional/module-06-async-programming/6.8-channels-and-producer-consumer.md): Bài đã lỗi thời so với .NET 10: BackgroundService giờ chạy toàn bộ ExecuteAsync trên luồng nền (breaking change của .NET 10), không còn chạy đồng bộ tới await đầu tiên. Đoạn 'xấp xỉ cài đặt' ở dòng 384-390 cũng mô tả theo hành vi cũ.
  - Bằng chứng: `'BackgroundService.StartAsync' gọi 'ExecuteAsync' và trả về ngay tại 'await' đầu tiên.`
  - Sửa: Cập nhật: 'Từ .NET 10, BackgroundService chạy toàn bộ ExecuteAsync như một Task nền nên không chặn khởi động; trên .NET 8/9 phần trước await đầu tiên vẫn chạy trên luồng khởi động'. Dẫn link trang breaking changes .NET 10 (Extensions).
- **major** · chính xác · [6.8-channels-and-producer-consumer.md:189](../lessons/stage-02-csharp-professional/module-06-async-programming/6.8-channels-and-producer-consumer.md): Override StopAsync gọi base.StopAsync, mà base.StopAsync huỷ stoppingToken ngay lập tức. Consumer đang dùng ReadAllAsync(stoppingToken) nên vòng lặp kết thúc bằng OperationCanceledException và các item còn trong hàng đợi không được xử lý. Điều này ngược với khẳng định 'việc đang chờ vẫn được xử lý'.

  ```text
  _queue.Complete();          // không nhận việc mới nữa
      await base.StopAsync(ct);   // chờ ExecuteAsync kết thúc
  ... nên việc đang chờ vẫn được xử lý.
  ```

  - Sửa: Muốn drain thì cho ReadAllAsync dùng CancellationToken.None (hoặc một token riêng), gọi Complete() trong StopAsync, rồi chờ ExecuteTask hoàn tất với giới hạn thời gian trước khi gọi base.StopAsync. Hoặc ghi rõ rằng mẫu hiện tại sẽ bỏ việc còn tồn.
- **major** · chính xác · [6.8-channels-and-producer-consumer.md:198](../lessons/stage-02-csharp-professional/module-06-async-programming/6.8-channels-and-producer-consumer.md): HostOptions.ShutdownTimeout mặc định là 30 giây từ .NET 6, không phải 5 giây. Đoạn 'sửa' đặt 30s thực ra chỉ đặt lại giá trị mặc định.
  - Bằng chứng: `Nhưng có một giới hạn cứng: host chỉ chờ mặc định **5 giây**, sau đó huỷ token và đi tiếp.`
  - Sửa: Sửa thành 'mặc định 30 giây (từ .NET 6; trước đó là 5 giây)'. Ví dụ cấu hình nên tăng lên giá trị khác, ví dụ 60s, và kèm lưu ý về terminationGracePeriodSeconds của Kubernetes.
- **major** (ban đầu critical) · chính xác · [6.8-channels-and-producer-consumer.md:442](../lessons/stage-02-csharp-professional/module-06-async-programming/6.8-channels-and-producer-consumer.md): Bài nói ExecuteAsync ném lỗi thì 'mặc định không làm sập ứng dụng' và ứng dụng 'vẫn phục vụ HTTP bình thường, health check vẫn xanh'. Nhưng từ .NET 6, BackgroundServiceExceptionBehavior mặc định là StopHost, và chính dòng 497 của bài cũng nói vậy. Kết quả Bài 3 không tái hiện được với cấu hình mặc định, và học viên hiểu sai hành vi runtime.
  - Bằng chứng: `Và mặc định, ngoại lệ đó cũng không làm sập ứng dụng. ... Ứng dụng **vẫn phục vụ HTTP bình thường**, health check vẫn xanh ... Từ .NET 6, 'BackgroundServiceExceptionBehavior' mặc định là 'StopHost'`
  - Sửa: Viết lại Bài 3: với mặc định StopHost, một job lỗi làm cả host dừng (một job hỏng kéo sập toàn bộ API). Muốn tái hiện kịch bản 'consumer chết im lặng' thì phải đặt BackgroundServiceExceptionBehavior.Ignore. Sửa tương ứng dòng 162 và câu tự kiểm tra ở dòng 570.
  - Phản biện (adjusted): Xác nhận: gợi ý ở dòng 442 ('mặc định không làm sập ứng dụng') và kết quả 'vẫn phục vụ HTTP bình thường' mâu thuẫn với dòng 497 của chính bài. Từ .NET 6, BackgroundServiceExceptionBehavior mặc định là StopHost. Hạ xuống major vì cuối lời giải bài đã nêu đúng hành vi mặc định và trường hợp Ignore. Cần sửa gợi ý, kết quả, dòng 162 và câu tự kiểm tra dòng 570 để ghi rõ rằng kịch bản 'chết im lặng' chỉ xảy ra khi cấu hình Ignore.
- **major** · thực tế · [6.8-channels-and-producer-consumer.md:527](../lessons/stage-02-csharp-professional/module-06-async-programming/6.8-channels-and-producer-consumer.md): 'Nâng cấp đáng làm' cho consumer tự ghi lại job lỗi vào cùng một channel bounded với FullMode.Wait. Khi hàng đầy, consumer (cũng là reader duy nhất) chờ chính nó, gây deadlock vĩnh viễn. Bài không có cảnh báo nào.

  ```text
  if (job.RetryCount < 3)
          await _q.EnqueueAsync(job with { RetryCount = job.RetryCount + 1 }, stoppingToken);
  ```

  - Sửa: Thêm cảnh báo và đổi cách làm: dùng TryWrite (nếu đầy thì đưa vào dead-letter), hoặc một channel retry riêng không giới hạn kèm delay, hoặc retry ngay trong vòng xử lý bằng Polly. Ghi rõ 'không bao giờ await WriteAsync vào channel bounded mà chính mình là reader duy nhất'.
- **major** · chính xác · [6.9-advanced-notes.md:120](../lessons/stage-02-csharp-professional/module-06-async-programming/6.9-advanced-notes.md): PeriodicTimer.WaitForNextTickAsync chỉ trả về false khi timer bị Dispose. Khi CancellationToken bị huỷ, phương thức ném OperationCanceledException. Khẳng định 'không cần try/catch' sẽ khiến học viên để OCE thoát ra ngoài.
  - Bằng chứng: `'WaitForNextTickAsync' trả về 'false' khi bị huỷ, nên vòng lặp thoát tự nhiên mà không cần 'try/catch' cho 'OperationCanceledException'`
  - Sửa: Sửa thành: 'trả false khi timer bị Dispose; khi token bị huỷ nó ném OperationCanceledException'. Trong BackgroundService có thể để OCE lan ra (host coi là dừng bình thường) hoặc bọc while trong try/catch when (ct.IsCancellationRequested).
- **minor** (ban đầu major) · nhất quán · [6.10-mini-case-study.md:3](../lessons/stage-02-csharp-professional/module-06-async-programming/6.10-mini-case-study.md): Các con số thời gian sau khi song song hoá không nhất quán trong cùng một bài: tóm tắt ghi 12 giây, mục 6.11.2 ghi 1,2 giây, giải pháp có giới hạn ghi khoảng 48 giây. Người đọc không biết con số nào đúng.
  - Bằng chứng: `Sửa thành song song đưa thời gian xuống 12 giây ... Thời gian: 8 phút -> 1,2 giây ... 500 / 10 x 950ms = ~48 giây`
  - Sửa: Sửa tóm tắt: 'song song tối đa còn khoảng 1 giây nhưng hỏng vì 429/DbContext; song song có giới hạn 10 mất khoảng 48 giây, và vì vậy chuyển thành job nền'.
  - Phản biện (adjusted): Có thật: tóm tắt dòng 3 ghi '12 giây', dòng 51 ghi '1,2 giây', dòng 128 và 199 ghi khoảng 48 giây cho bản có giới hạn. Phần thân bài nhất quán, chỉ tóm tắt sai số, nên hạ xuống minor. Sửa câu tóm tắt như đề xuất.
- **minor** · chính xác · [6.10-mini-case-study.md:654](../lessons/stage-02-csharp-professional/module-06-async-programming/6.10-mini-case-study.md): Ví dụ Polly dùng pipeline không generic cùng RetryStrategyOptions không generic nhưng lại xử lý kết quả HttpResponseMessage qua `new PredicateBuilder().HandleResult<HttpResponseMessage>`. Theo API Polly v8, xử lý theo kết quả cần pipeline và options generic `<HttpResponseMessage>`; đoạn hiện tại nhiều khả năng không biên dịch. Bài cũng không nhắc gói Polly.Extensions/Polly.RateLimiting, vốn chưa được dạy.
  - Bằng chứng: `builder.Services.AddResiliencePipeline("api-ngoai", b => b ... ShouldHandle = new PredicateBuilder().HandleResult<HttpResponseMessage>(`
  - Sửa: Dùng `AddResiliencePipeline<string, HttpResponseMessage>("api-ngoai", b => b.AddConcurrencyLimiter(16, 8).AddRetry(new RetryStrategyOptions<HttpResponseMessage>{ ShouldHandle = new PredicateBuilder<HttpResponseMessage>().HandleResult(r => r.StatusCode == HttpStatusCode.TooManyRequests), ... }))`, ghi rõ các gói cần cài và đánh dấu 'đọc thêm — học ở module resilience'.
- **minor** · chính xác · [6.11-quick-real-world-example.md:170](../lessons/stage-02-csharp-professional/module-06-async-programming/6.11-quick-real-world-example.md): Khối cấu hình .editorconfig dùng comment kiểu XML và mũi tên '&lt;-' ở cuối dòng. Nếu chép nguyên văn, giá trị severity thành 'error    &lt;- sync-over-async' và không còn hợp lệ.

  ```text
  <!-- .editorconfig -->
  dotnet_diagnostic.VSTHRD002.severity = error    <- sync-over-async
  ```

  - Sửa: Dùng định dạng ini như Bài 3: dòng comment riêng bắt đầu bằng `#`, ví dụ `# sync-over-async` rồi `dotnet_diagnostic.VSTHRD002.severity = error`.
- **minor** · chính xác · [6.3-configureawait.md:104](../lessons/stage-02-csharp-professional/module-06-async-programming/6.3-configureawait.md): Bài khẳng định vô điều kiện rằng sau await đầu tiên có ConfigureAwait(false) thì 'đã ra khỏi context'. Điều này chỉ đúng khi task chưa hoàn tất. Nếu task đã xong đồng bộ (cache hit), code vẫn ở context gốc. Ví dụ SaveAsync ở dòng 271-276 vì thế không phải lúc nào cũng ném.
  - Bằng chứng: `Nhưng sau 'await' đầu tiên với 'false', bạn **đã ra khỏi context**`
  - Sửa: Bổ sung điều kiện: '…nếu task đó chưa hoàn tất lúc await; nếu đã hoàn tất, ConfigureAwait(false) không có tác dụng và bạn vẫn ở context gốc'. Đây cũng là lý do thư viện phải dùng ở mọi await.
- **minor** · thực tế · [6.3-configureawait.md:148](../lessons/stage-02-csharp-professional/module-06-async-programming/6.3-configureawait.md): Bài tập tái hiện deadlock bắt buộc dùng WPF hoặc ASP.NET Framework, chỉ chạy được trên Windows. Sinh viên dùng macOS hoặc Linux không làm được. Console.WriteLine trong WPF (Bài 2) cũng không hiện ra đâu cả.
  - Bằng chứng: `Tạo một project WPF (nhanh nhất) hoặc ASP.NET Framework`
  - Sửa: Thêm phương án console cross-platform: tự viết SingleThreadSynchronizationContext (khoảng 30 dòng, theo mẫu AsyncPump của Stephen Toub) rồi gọi .Result bên trong. Trong WPF dùng Debug.WriteLine hoặc MessageBox.
- **minor** · chính xác · [6.4-cancellationtoken.md:33](../lessons/stage-02-csharp-professional/module-06-async-programming/6.4-cancellationtoken.md): CancellationToken không có phương thức Cancel(). Chỉ CancellationTokenSource mới huỷ được, như chính mục 6.5.3 giải thích.
  - Bằng chứng: `'token.Cancel()' **không dừng được** thread nào.`
  - Sửa: Sửa thành `cts.Cancel()`.
- **minor** · nhất quán · [6.6-async-patterns.md:67](../lessons/stage-02-csharp-professional/module-06-async-programming/6.6-async-patterns.md): Bài nói '.Result trong constructor là deadlock cho sẵn', nhưng 6.3 vừa giải thích rằng ASP.NET Core không deadlock khi gọi .Result, chỉ chiếm luồng. Code mẫu còn dùng _repo trong constructor trước khi được gán.
  - Bằng chứng: `// SAI — .Result trong constructor la deadlock cho san`
  - Sửa: Sửa thành 'chặn luồng (deadlock trong WPF/ASP.NET Framework, starvation trong ASP.NET Core) và constructor không thể nhận CancellationToken'. Viết comment có dấu tiếng Việt.
- **minor** · chính xác · [6.7-common-pitfalls.md:422](../lessons/stage-02-csharp-professional/module-06-async-programming/6.7-common-pitfalls.md): Cột 'công cụ bắt được' chưa chính xác. CA1849 chỉ chạy bên trong phương thức async, nên không bắt .Result trong phương thức đồng bộ như SumTotals (VSTHRD002 mới bắt). CS4014 không cảnh báo khi kết quả được gán (`var t = …`) hoặc dùng discard (`_ = …`).
  - Bằng chứng: `| 1 | sync-over-async | ... | **Có** — 'CA1849' | ... | 8 | Ngoại lệ không quan sát | ... | Một phần — 'CS4014' |`
  - Sửa: Bẫy 1 ghi 'VSTHRD002 (mọi nơi), CA1849 (chỉ trong async)'. Bẫy 8 ghi 'CS4014 khi gọi không gán; VSTHRD110 hoặc CA2012 cho các trường hợp khác; _ = … thì không công cụ nào bắt'.
- **minor** (ban đầu major) · chính xác · [6.9-advanced-notes.md:358](../lessons/stage-02-csharp-professional/module-06-async-programming/6.9-advanced-notes.md): CA1305 là 'Specify IFormatProvider', không phát hiện việc gọi DateTime.UtcNow. Đặt rule này không chặn được chỗ mới gọi thẳng thời gian hệ thống. Khối cấu hình còn dùng comment kiểu XML cho file .editorconfig.

  ```text
  <!-- .editorconfig -->
  dotnet_diagnostic.CA1305.severity = warning
  ```

  - Sửa: Thay bằng Microsoft.CodeAnalysis.BannedApiAnalyzers: thêm file BannedSymbols.txt chứa `P:System.DateTime.UtcNow;Dùng TimeProvider` và `P:System.DateTime.Now;Dùng TimeProvider`, rule RS0030. Dùng comment `#` cho .editorconfig.
  - Phản biện (adjusted): Đúng: CA1305 là 'Specify IFormatProvider', không chặn được DateTime.UtcNow, và khối .editorconfig dùng comment XML. BannedApiAnalyzers (RS0030) là cách đúng. Hạ xuống minor vì đây là một ghi chú trong bài nâng cao, và ngay sau đó bài đã có phương án test kiến trúc thay thế.
- **minor** · chính xác · [6.9-advanced-notes.md:423](../lessons/stage-02-csharp-professional/module-06-async-programming/6.9-advanced-notes.md): Giải thích sai phần 201 ms 'trôi' của PeriodicTimer: đó không phải chi phí lập lịch của hệ điều hành mà là 200 ms công việc của vòng cuối, chạy sau tick thứ 10 (10 × 500 + 200 = 5.200). Dấu chấm ngăn cách hàng nghìn ('7.007 ms') dễ đọc nhầm thành 7 ms.
  - Bằng chứng: `-> 201 ms trôi còn lại là chi phí lập lịch của hệ điều hành`
  - Sửa: Sửa thành: '200 ms là công việc của vòng cuối chạy sau tick thứ 10; độ trôi thực của PeriodicTimer chỉ khoảng 1 ms'. Viết thời gian dạng '7,0 s' hoặc '7 007 ms' cho rõ.

### Module 7 - Dependency Injection

- **critical** · chính xác · [7.11-mini-case-study.md:104](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.11-mini-case-study.md): Cách sửa 'dùng IServiceScopeFactory' được mô tả là 'lấy TenantContext của đúng request hiện tại'. Sai: CreateScope() tạo một scope mới, độc lập với scope của request. Ví dụ CacheService chạy đúng chỉ vì TenantContext tình cờ đọc lại từ IHttpContextAccessor. Ở Bài 1 (dòng 334–342), NguCanhYeuCau được gán TenantId trong scope của request, nên DichVuNen tạo scope mới sẽ luôn đọc ra 0, tức cách sửa không chạy. Đây là hiểu lầm nguy hiểm về scope.
  - Bằng chứng: `Mỗi lần gọi tạo một scope mới, lấy 'TenantContext' **của đúng request hiện tại**, rồi huỷ scope.`
  - Sửa: Giải thích rõ: scope mới không phải scope của request. Với dữ liệu theo request, cách đúng là (1) truyền tenantId làm tham số, (2) đổi service sang Scoped, hoặc (3) đọc IHttpContextAccessor trong phương thức. Chỉ dùng IServiceScopeFactory cho việc cần một đơn vị công việc riêng, ví dụ BackgroundService cần DbContext mới. Sửa Cách 1 ở mục 7.12.4 và cách sửa số 2 ở Bài 1 cho phù hợp, thêm ví dụ chứng minh scope mới đọc ra TenantId=0.
- **critical** · chính xác · [7.6-program-cs-and-webapplicationbuilder.md:49](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.6-program-cs-and-webapplicationbuilder.md): Bài khẳng định gọi builder.Services sau Build() 'không có tác dụng, không exception, không cảnh báo'. Từ .NET 7, Build() gọi MakeReadOnly() trên ServiceCollection, nên mọi lần Add sau đó ném InvalidOperationException ngay lúc khởi động. Lời giải Bài 1 (dòng 216–225) nói lỗi 'xuất hiện lúc request đầu tiên', trích sai thông điệp lỗi và kết luận 'tuỳ phiên bản'. Phần tự kiểm tra (dòng 489) lặp lại khẳng định sai.
  - Bằng chứng: `Sau 'Build()', 'builder.Services' vẫn gọi được nhưng **không còn tác dụng gì** — không exception, không cảnh báo`
  - Sửa: Sửa thành: trên .NET 7+ (kể cả .NET 10), thêm đăng ký sau Build() ném ngay 'InvalidOperationException: The service collection cannot be modified because it is read-only.' lúc khởi động. Sửa lời giải Bài 1 và câu tự kiểm tra cho khớp, bỏ cụm 'tuỳ phiên bản'.
- **major** · nhất quán · [7.1-di-problem-scope.md:41](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.1-di-problem-scope.md): Toàn module đánh số mục lệch 1 đơn vị so với số bài: bài 7.1 dùng 7.2.x, bài 7.2 dùng 7.3.x, … bài 7.13 dùng 7.14.x. Nhãn link nội bộ cũng lệch tương tự ('bài 7.10 — Anti-patterns' trỏ tới 7.9, 'bài 7.6' trỏ tới 7.5-registering-services, 'bài 1.5' trỏ tới 1.4, 'bài 6.9' trỏ tới 6.8…), điều hướng thì có chữ thừa ('7.2 — 1. IoC Container'). Người học sẽ bối rối khi đối chiếu số mục.
  - Bằng chứng: `# 7.1 - Vấn đề DI giải quyết ... ### 7.2.1 — Code dính chặt ... Xem [bài 7.10 — Anti-patterns](7.9-anti-patterns.md)`
  - Sửa: Viết script đổi heading '### A.(B+1).k' thành '### A.B.k' trong mọi file của module, và đổi nhãn 'bài X.Y' theo đúng tên file đích. Bỏ tiền tố số thừa trong mục Điều hướng ('7.2 — 1. IoC…' thành '7.2 — IoC…'). Áp dụng tương tự cho Module 8 và các module khác.
- **major** (ban đầu critical) · chính xác · [7.1-di-problem-scope.md:352](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.1-di-problem-scope.md): Ví dụ 'chạy song song 10% lưu lượng sang SendGrid' đặt Random trong factory của AddSingleton. Factory Singleton chỉ chạy một lần cho cả vòng đời ứng dụng, nên mỗi lần khởi động là 100% đi SendGrid (khả năng 10%) hoặc 100% đi SMTP, không bao giờ có chuyện chia 10%. Ngoài ra SendGridEmailSender và SmtpEmailSender không được đăng ký nên GetRequiredService sẽ ném lỗi.

  ```text
  builder.Services.AddSingleton<IEmailSender>(sp =>
      Random.Shared.Next(100) < 10
          ? sp.GetRequiredService<SendGridEmailSender>() ...
  ```

  - Sửa: Đăng ký hai lớp cụ thể là Singleton, rồi tạo một lớp RoutingEmailSender : IEmailSender nhận cả hai qua constructor và chọn trong mỗi lần gọi SendAsync (Random.Shared.Next(100) &lt; 10). Thêm một câu giải thích: factory của Singleton chỉ chạy một lần, nên mọi logic chọn theo từng request phải nằm trong phương thức, không nằm trong factory.
  - Phản biện (adjusted): Lỗi có thật, nhưng đoạn code nằm ở dòng 324-331 (trong mục lợi ích), không phải dòng 352 (dòng 352 là Bài 3). Factory của AddSingleton chỉ chạy một lần, nên mỗi lần khởi động hoặc 100% đi SendGrid hoặc 100% đi SMTP. Hai lớp cụ thể cũng chưa được đăng ký. Hạ xuống major vì đây là đoạn minh hoạ ngắn, không phải bài tập. Tuy vậy vẫn phải sửa vì nó dạy sai về lifetime ngay trong module DI. Giữ cách sửa đề xuất: tạo RoutingEmailSender và chọn nhà cung cấp trong mỗi lần gọi SendAsync.
- **major** · chính xác · [7.11-mini-case-study.md:413](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.11-mini-case-study.md): Bảng ghi ValidateOnBuild 'Tắt ở mọi môi trường' và mục 7.12.3 nói 'Mặc định .NET DI không kiểm tra vòng đời khi khởi động'. Thực tế Generic Host/WebApplication đặt cả ValidateScopes và ValidateOnBuild = true khi môi trường là Development (bài 7.4 viết đúng điều này). Vì vậy câu chuyện sự cố 'không tái hiện ở dev' cũng thiếu giải thích: với mặc định, ứng dụng sẽ không khởi động được ngay ở Development.
  - Bằng chứng: `| Mặc định | Bật ở Development | **Tắt** ở mọi môi trường |`
  - Sửa: Sửa bảng: cả hai cùng 'Bật ở Development, tắt ở môi trường khác'. Trong câu chuyện sự cố, nêu rõ nguyên nhân dev không phát hiện, ví dụ team chạy local với ASPNETCORE_ENVIRONMENT=Production/Staging hoặc đã tắt validation. Thống nhất chi phí ValidateOnBuild ('vài chục ms' ở đây so với 'vài trăm ms' ở 7.4).
- **major** · cấu trúc · [7.12-quick-real-world-example.md:339](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.12-quick-real-world-example.md): Bài 7.12 lặp lại gần như toàn bộ 7.7 (ba interface Options, OnChange, ValidateOnStart). Bài 2 của nó ('Tái hiện lỗi captive', tiêu đề nói IOptionsSnapshot) chép nguyên code NguCanhYeuCau/DichVuNen và output của 7.11 Bài 1–2. Khối lượng trùng làm sinh viên quá tải mà không có kiến thức mới.

  ```text
  #### Bài 2 — Tái hiện lỗi captive
  Tiêm `IOptionsSnapshot` vào một singleton ... builder.Services.AddScoped<NguCanhYeuCau>();
  builder.Services.AddSingleton<DichVuNen>();
  ```

  - Sửa: Rút 7.12 thành một 'ví dụ nhanh' 1–2 trang tập trung vào điểm mới (nguồn cấu hình nào reload được, config trong container), bỏ Bài 2 hoặc thay bằng bài thật sự dùng IOptionsSnapshot trong Singleton. Cân nhắc gộp 7.10–7.12 thành một bài 'Tổng hợp và tình huống'.
- **major** · cấu trúc · [7.13-review-and-assessment.md:3](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.13-review-and-assessment.md): Bài review dùng boilerplate rỗng lặp ở mọi module: 'Mục tiêu bài học' chung chung, 'Bài tập tổng hợp' (tóm tắt bằng ngôn ngữ của bạn…), 'Tự kiểm tra' (giải thích trong 2 phút?), 'Kết luận' một câu vô nghĩa. Khối 'Bối cảnh giáo trình' và 'Quy trình làm bài' cũng chép giống hệt nhau giữa các module.

  ```text
  ## Kết luận
  
  Hoàn thành bài này giúp bạn có góc nhìn đầy đủ hơn trước khi đi tiếp trong module.
  ```

  - Sửa: Thay bằng mục tiêu cụ thể của module (ví dụ: 'chọn đúng lifetime cho 5 service CRM', 'viết test không cần container'), 5–8 câu tự kiểm tra có đáp án gắn DI, và một kết luận tóm 3 ý chính. Đưa khối 'Bối cảnh giáo trình' về roadmap chung, chỉ để lại link.
- **major** · đầy đủ · [7.13-review-and-assessment.md:96](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.13-review-and-assessment.md): Bài 3 yêu cầu 'Tạo CrmSettings và appsettings.json như ví dụ trong phần 6' và test CanAssignLeadAsync/MaxLeadsPerAgent, nhưng không bài nào trong module có những nội dung này. Ngoài ra mục '7.14.4 — Kiểm tra & Thực hành (100 điểm)' là heading rỗng, lab không có lời giải hay tiêu chí chấm chi tiết, Bài 2 dùng Moq trong khi cả module dùng NSubstitute. Dòng 118 nói module tiếp theo là EF Core/Repository, trong khi bài kế là Project 1 rồi Module 8.

  ```text
  1. Tạo `CrmSettings` và `appsettings.json` như ví dụ trong phần 6
  ...
  4. Viết unit test kiểm tra `CanAssignLeadAsync` trả về `false` khi agent đã đạt `MaxLeadsPerAgent`
  ```

  - Sửa: Viết đề Bài 3 tự đủ (cho sẵn CrmSettings { MaxLeadsPerAgent } và LeadService.CanAssignLeadAsync), kèm lời giải gợi ý. Xoá heading rỗng, thống nhất NSubstitute, sửa câu chuyển tiếp thành 'Tiếp theo: Project 1 — Inventory'.
  - Phản biện (adjusted): Cần chỉnh hai chi tiết. Bài 2 ghi 'Gợi ý dùng Moq hoặc NSubstitute' chứ không ép dùng Moq. CrmSettings có xuất hiện ở 7.7 (dòng 83, LeadService nhận IOptions&lt;CrmSettings&gt;), nhưng không có định nghĩa lớp, không có MaxLeadsPerAgent hay CanAssignLeadAsync, và 'phần 6' là tham chiếu sai. Các điểm còn lại đều đúng: heading 7.14.4 rỗng, lab không có lời giải, câu chuyển tiếp ở dòng 118 nói module tiếp theo là EF Core trong khi kế tiếp là Project 1 rồi Module 8. Cách sửa: viết đề Bài 3 tự đủ.
- **major** (ban đầu critical) · chính xác · [7.2-ioc-container-and-di-container.md:242](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.2-ioc-container-and-di-container.md): Bài 2 đăng ký cả AddScoped(_ =&gt; new Svc("scoped")) lẫn AddSingleton(new Svc(...)) cho cùng kiểu Svc. GetRequiredService&lt;Svc&gt;() trả về đăng ký cuối cùng, tức instance Singleton, nên không có đối tượng scoped nào được tạo và dòng 'Dispose scoped' không bao giờ in ra. Kết quả ghi trong bài là sai. Thêm nữa, lớp Svc khai báo trước top-level statements nên không biên dịch được (CS8803).

  ```text
  s.AddScoped(_ => new Svc("scoped"));
  s.AddSingleton(new Svc("thể hiện có sẵn"));
  ...
  Kết quả:
  Dispose scoped
  -- đã huỷ phạm vi --
  ```

  - Sửa: Dùng hai kiểu riêng (ScopedSvc, InstanceSvc), hoặc resolve bằng GetServices&lt;Svc&gt;() rồi chạy lại để lấy output thật. Chuyển các khai báo class xuống cuối file (sau top-level statements) hoặc sang file riêng, và ghi rõ phiên bản .NET đã chạy (.NET 10).
  - Phản biện (adjusted): Đã xác nhận: đăng ký sau ghi đè đăng ký trước, nên GetRequiredService&lt;Svc&gt;() trả instance Singleton có sẵn. Không có đối tượng scoped nào được tạo, dòng 'Dispose scoped' không in ra, nên output ghi trong bài (dòng 260-263) là sai. Đặt class Svc trước top-level statements gây lỗi CS8803. Hạ xuống major vì kết luận chính 'container không dispose instance đưa vào sẵn' vẫn đúng. Cách sửa: dùng hai kiểu riêng, đặt class xuống cuối file, chạy lại trên .NET 10 rồi dán output thật.
- **major** · nhất quán · [7.4-service-lifetimes.md:88](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.4-service-lifetimes.md): Mục 7.5.3 nói DbContext bị giam 'trả về entity từ change tracker chứ không đi xuống database', trong khi lời giải Bài 2 cùng bài (dòng 282–291) giải thích đúng hơn: truy vấn có chạy xuống database, nhưng identity resolution giữ lại entity cũ. Hai giải thích mâu thuẫn ngay trong một bài, và phần tự kiểm tra (dòng 429) lặp lại bản sai.
  - Bằng chứng: `1. **Dữ liệu cũ.** 'DbContext' trả về entity từ change tracker chứ không đi xuống database.`
  - Sửa: Sửa mục 7.5.3 và câu tự kiểm tra thành: 'SQL vẫn chạy, nhưng EF Core thấy khoá đã có trong change tracker nên giữ entity cũ (identity resolution)'. Dùng đúng một cách giải thích cho cả bài.
- **major** · chính xác · [7.4-service-lifetimes.md:341](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.4-service-lifetimes.md): Nhiều lời giải 'đo thật' khai báo class trước top-level statements (CS8803: Top-level statements must precede namespace and type declarations), nên dán vào Program.cs sẽ không biên dịch. Gặp ở 7.4 Bài 3 (class Disp), 7.2 Bài 2 (class Svc), 7.6 Bài 2 (class Counter, dòng 296), 7.9 Bài 1 (AmbientStatic, dòng 206). Ngoài ra text in ra trong code không khớp output được trích ('sau 1000 resolve từ root       :').

  ```text
  public class Disp : IDisposable { ... }
  
  var s = new ServiceCollection();
  ```

  - Sửa: Đặt top-level statements trước, khai báo type ở cuối file (hoặc file riêng). Chạy lại trên .NET 10 rồi dán đúng output. Nên thêm một repo 'samples/module-07' có sẵn code chạy được để mentor live-code.
- **major** · chính xác · [7.5-registering-services.md:58](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.5-registering-services.md): Phần lý thuyết nói `sp` trong factory là 'provider của scope đang xin' và 'ValidateScopes không bắt được qua factory'. Thực tế, factory của Singleton được gọi với root provider, nên khi ValidateScopes bật, việc resolve Scoped bên trong ném 'Cannot resolve scoped service from root provider', đúng như output của chính Bài 1 (dòng 225–234). Phần tự kiểm tra (dòng 457) và kết luận 'không công cụ nào kiểm tra hộ bạn' (dòng 500) mâu thuẫn với bảng ở Bài 1.
  - Bằng chứng: `Nguy hiểm hơn constructor injection ở chỗ: 'ValidateScopes' **bắt được** captive dependency qua constructor, nhưng **không bắt được** qua factory`
  - Sửa: Viết lại: factory Singleton nhận root provider. ValidateOnBuild không nhìn vào bên trong lambda nên không bắt được lúc khởi động, nhưng ValidateScopes vẫn ném lúc resolve lần đầu. Khi tắt validation thì Scoped bị giam vĩnh viễn. Sửa câu tự kiểm tra và kết luận theo bảng ở Bài 1.
- **major** · chính xác · [7.6-program-cs-and-webapplicationbuilder.md:31](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.6-program-cs-and-webapplicationbuilder.md): Ví dụ dùng app.UseSwagger().UseSwaggerUI() mà không cài Swashbuckle và không gọi AddSwaggerGen. Từ .NET 9, template webapi đã bỏ Swashbuckle và dùng Microsoft.AspNetCore.OpenApi (AddOpenApi/MapOpenApi). Code này không biên dịch hoặc không chạy với project tạo bằng .NET 10. Lỗi tương tự ở 8.1 (dòng 71–77).

  ```text
  if (app.Environment.IsDevelopment())
      app.UseSwagger().UseSwaggerUI();
  ```

  - Sửa: Đổi sang builder.Services.AddOpenApi(); … if (app.Environment.IsDevelopment()) app.MapOpenApi(); và nếu cần giao diện thì thêm Scalar hoặc SwaggerUI kèm câu lệnh cài package. Sửa cả 7.6 và 8.1.
  - Phản biện (adjusted): Sửa lại mô tả: 8.1 có gọi AddEndpointsApiExplorer và AddSwaggerGen, nên chỉ thiếu lệnh cài Swashbuckle. 7.6 là đoạn minh hoạ khung (dùng cả AddInfrastructure chưa định nghĩa) và không có AddSwaggerGen. Vấn đề chính là template webapi trên .NET 9/10 dùng AddOpenApi/MapOpenApi, trong khi module 8 không nhắc tới AddOpenApi lần nào. Swashbuckle chỉ xuất hiện từ Module 9 (9.3). Nên đổi sang AddOpenApi/MapOpenApi, hoặc ghi rõ lệnh cài package và trỏ sang 9.3.
- **major** · chính xác · [7.6-program-cs-and-webapplicationbuilder.md:336](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.6-program-cs-and-webapplicationbuilder.md): Thông báo 'Calling BuildServiceProvider from application code results in an additional copy of singleton services' là cảnh báo của analyzer ASP0000 lúc biên dịch, không phải dòng log runtime 'warn: Microsoft.Extensions.DependencyInjection[0]'. Người học sẽ đi tìm trong log mà không thấy.

  ```text
  warn: Microsoft.Extensions.DependencyInjection[0]
        Calling 'BuildServiceProvider' from application code results in an
        additional copy of singleton services being created.
  ```

  - Sửa: Thay bằng output thật của `dotnet build`: 'warning ASP0000: Calling 'BuildServiceProvider' from application code results in an additional copy of singleton services being created...'. Hướng dẫn người học xem tab Warnings trong IDE và cân nhắc bật TreatWarningsAsErrors cho ASP0000.
- **major** · nhất quán · [7.7-options-pattern.md:112](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.7-options-pattern.md): Bài nói tiêm IOptionsSnapshot vào Singleton thì 'bị giam và không bao giờ đọc lại nữa, im lặng' (dòng 112, câu tự kiểm tra dòng 526: 'không có lỗi nào'). Lời giải Bài 2 cùng bài (dòng 338–343) lại nói ứng dụng không khởi động được vì ValidateScopes, mà ValidateScopes/ValidateOnBuild bật mặc định ở Development. Người học nhận hai thông điệp trái nhau.
  - Bằng chứng: `Tiêm 'IOptionsSnapshot<T>' vào một Singleton là **captive dependency** ... — nó bị giam và không bao giờ đọc lại nữa, im lặng.`
  - Sửa: Thống nhất: ở Development (mặc định) ứng dụng không khởi động được và báo 'Cannot consume scoped service IOptionsSnapshot…'. Chỉ khi tắt validation (thường là Production) lỗi mới im lặng. Sửa dòng 112 và câu tự kiểm tra.
- **major** · chính xác · [7.7-options-pattern.md:289](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.7-options-pattern.md): Lớp SmtpOptions định nghĩa ở Bài 1 chỉ có Host, Port, FromAddress, nhưng phần mở rộng dùng o.UseTls và o.Timeout nên không biên dịch được.

  ```text
  .Validate(o => o.Port != 25 || o.UseTls == false, ...)
  ... if (o.Port == 465 && !o.UseTls) ... if (o.Timeout < TimeSpan.FromSeconds(1))
  ```

  - Sửa: Bổ sung `public bool UseTls { get; init; }` và `public TimeSpan Timeout { get; init; } = TimeSpan.FromSeconds(30);` vào SmtpOptions, hoặc viết lại ví dụ chỉ dùng thuộc tính đã có.
- **major** · chính xác · [7.7-options-pattern.md:495](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.7-options-pattern.md): Gọi thêm AddJsonFile("appsettings.json", reloadOnChange: false) không tắt được việc theo dõi file. CreateBuilder đã thêm một source appsettings.json với reloadOnChange: true, dòng này chỉ thêm source thứ hai, và watcher của source đầu vẫn chạy.
  - Bằng chứng: `builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);`
  - Sửa: Hướng dẫn cách đúng: đặt biến môi trường `DOTNET_hostBuilder__reloadConfigOnChange=false` (hoặc cấu hình hostBuilder:reloadConfigOnChange=false trước khi tạo builder), hoặc tự xoá các source JSON rồi thêm lại với reloadOnChange: false.
- **major** · dễ hiểu · [README.md:1](../lessons/stage-02-csharp-professional/module-07-dependency-injection/README.md): Module 7 thuộc Stage 2 (trước ASP.NET Core) nhưng gần như mọi bài và bài tập đều dùng thứ chưa học: middleware, controller, JWT/[Authorize] (7.6 Bài 3, Module 10 mới học), EF Core DbContext/AsNoTracking/psql (7.4 Bài 1–2, Module 13), Kubernetes, MediatR, Scrutor, IMemoryCache. Sinh viên năm 1–2 không làm được các bài tập này. README cũng không có kiến thức tiên quyết hay hướng dẫn tạo project để thực hành.
  - Bằng chứng: `7.4 Bài 2: psql -c "UPDATE \"Branches\" ..."; 7.6 Bài 3: curl ... -H "Authorization: Bearer $TOKEN_HOP_LE"`
  - Sửa: Thêm vào README mục 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường' (dotnet new console và Microsoft.Extensions.Hosting). Viết lại bài tập cốt lõi bằng console app với ServiceCollection hoặc Host.CreateApplicationBuilder và repository in-memory. Đánh dấu các bài cần EF Core, JWT, Kubernetes là 'Làm lại sau Module 8/10/13/15', hoặc chuyển chúng sang module tương ứng.
  - Phản biện (adjusted): Có thật nhưng bị nói quá. Nhiều bài tập chạy được bằng console với ServiceCollection, ví dụ 7.2 Bài 1-3, 7.5 Bài 1-3, 7.8, 7.9 Bài 1. Các bài cần kiến thức chưa học: 7.4 Bài 2 (EF Core và psql), 7.6 Bài 3 (JWT, Bearer), 7.3 Bài 3 (middleware), 7.11 (HTTP, tenant), và 7.10 có MediatR/Scrutor (13 lần nhắc). README không có mục kiến thức tiên quyết hay chuẩn bị môi trường. Cách sửa vẫn đúng: thêm hai mục đó, đánh dấu các bài cần Module 8/10/13 là 'làm lại sau'.
- **minor** · chính xác · [7.1-di-problem-scope.md:93](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.1-di-problem-scope.md): 'Mỗi CustomerService tạo một SqlCustomerRepository riêng, tức một connection riêng. 100 request là 100 connection, trong khi lẽ ra nên dùng chung pool' là chưa chính xác. ADO.NET tự pool theo connection string dù bạn có new SqlConnection ở đâu. Vấn đề thật là không Dispose, nên connection không trả về pool.
  - Bằng chứng: `100 request đồng thời là 100 connection, trong khi lẽ ra chúng nên dùng chung pool.`
  - Sửa: Sửa thành: 'Không ai gọi Dispose nên connection không được trả về pool, pool cạn dần'. Bài 3 cần nhắc gói Microsoft.Extensions.TimeProvider.Testing cho FakeTimeProvider.
- **minor** · nhất quán · [7.10-advanced-notes.md:613](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.10-advanced-notes.md): Bảng so sánh ghi keyed services có khoá 'string hoặc object', 'Kiểm tra lúc biên dịch: Không — khoá là chuỗi', mâu thuẫn với 7.8 (khuyến nghị dùng enum làm khoá để kiểm tra lúc biên dịch) và với chính cuối Bài 3 (dòng 696–700). 7.10 cũng lặp gần nguyên decorator (7.5.6, Bài 3) và keyed/factory (7.8).

  ```text
  | Khoá | `string` hoặc `object` | **Bất kỳ kiểu nào**, kể cả enum |
  | Kiểm tra lúc biên dịch | Không — khoá là chuỗi | **Có** — enum vét cạn được |
  ```

  - Sửa: Sửa bảng: keyed services cũng dùng enum được. Khác biệt thật là factory với switch vét cạn có cảnh báo khi thiếu nhánh. Rút gọn 7.10 chỉ giữ phần mới (module đăng ký, Scrutor Scan, khi nào cần container thứ ba).
- **minor** · nhất quán · [7.2-ioc-container-and-di-container.md:168](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.2-ioc-container-and-di-container.md): Nhiều khối 'Kết quả đo thật trên .NET 9' / '.NET 9.0.203' (7.2, 7.4, 7.5, 7.8, 7.9, 7.11, 7.12, 8.6, 8.10, 8.11, 8.12), trong khi khoá học nhắm .NET 10 LTS (.NET 9 STS sắp hết hỗ trợ). 9.0.203 là số phiên bản SDK, không phải runtime. Một số output không khớp với code in ra (7.2 Bài 3 in '1 tham số', output ghi '2 constructor, chỉ đăng ký IEmail -&gt; chọn: 1 tham số').
  - Bằng chứng: `**Kết quả đo thật trên .NET 9:**`
  - Sửa: Chạy lại toàn bộ ví dụ trên .NET 10, ghi 'Chạy trên .NET 10 (SDK 10.0.x)', và dán đúng output do code sinh ra.
- **minor** · chính xác · [7.2-ioc-container-and-di-container.md:285](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.2-ioc-container-and-di-container.md): NpgsqlDataSource không có constructor public, nên `new NpgsqlDataSource(cs)` không biên dịch. Nhận xét 'BuildServiceProvider() đóng băng danh sách' (dòng 82) cũng dễ hiểu nhầm: với ServiceCollection thường, gọi BuildServiceProvider không khoá collection mà tạo ra một container độc lập. Danh sách 'ba service có sẵn' (dòng 110) chỉ đúng trong ASP.NET Core và còn thiếu nhiều (IWebHostEnvironment, IHostApplicationLifetime…).
  - Bằng chứng: `builder.Services.AddSingleton(new NpgsqlDataSource(cs));`
  - Sửa: Đổi ví dụ rò rỉ thành `AddSingleton(NpgsqlDataSource.Create(cs))` (instance nên không được dispose) so với `AddSingleton(sp => NpgsqlDataSource.Create(cs))`. Diễn đạt lại: 'container đã dựng không thấy đăng ký thêm sau đó'. Ghi rõ các service có sẵn khi dùng WebApplication/Host.
- **minor** · chính xác · [7.3-three-ways-register-services.md:314](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.3-three-ways-register-services.md): Lời giải Bài 2 dùng `_repo` không được khai báo trong lớp OrderService dạng property injection. Mục 7.4.3 gọi việc resolve trong scope tại Program.cs là 'method injection' (thực chất là service locator ở composition root), làm lẫn khái niệm. Phần 'Ba chỗ property injection chính đáng' (dòng 368–372) mâu thuẫn với bảng 'Gần như không bao giờ' và câu 'container .NET không hỗ trợ'.
  - Bằng chứng: `await _repo.AddAsync(o, ct);              // dòng 12`
  - Sửa: Thêm `private readonly IOrderRepository _repo` vào ví dụ (hoặc dùng primary constructor). Đổi tên mục thành 'Ba chỗ method injection và một chỗ resolve thủ công ở composition root'. Ghi rõ phần property injection chính đáng chỉ áp dụng khi dùng container khác như Autofac.
- **minor** (ban đầu major) · chính xác · [7.4-service-lifetimes.md:315](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.4-service-lifetimes.md): Khẳng định AsNoTracking 'bắt buộc với IAsyncEnumerable' là sai. AsAsyncEnumerable() và việc stream kết quả chạy được cả với truy vấn có tracking. AsNoTracking chỉ là khuyến nghị để đỡ tốn bộ nhớ khi stream.
  - Bằng chứng: `- Bắt buộc với 'IAsyncEnumerable', như [bài 6.7](../module-06-async-programming/6.6-async-patterns.md) đã nêu.`
  - Sửa: Sửa thành 'Nên dùng khi stream bằng IAsyncEnumerable để change tracker không phình theo số dòng'. Kiểm tra lại bài 6.6 để hai bài không mâu thuẫn.
  - Phản biện (adjusted): Khẳng định 'bắt buộc' là sai: AsAsyncEnumerable vẫn chạy với truy vấn có tracking, AsNoTracking chỉ là khuyến nghị. Hạ xuống minor vì đây là một gạch đầu dòng phụ và không làm hỏng code. Nhớ đối chiếu bài 6.6.
- **minor** · chính xác · [7.5-registering-services.md:337](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.5-registering-services.md): Bảng chọn ghi dùng `Add` khi 'muốn lỗi nếu trùng', nhưng Add không bao giờ báo lỗi khi trùng mà chỉ âm thầm thêm descriptor. Ví dụ IClock/SystemClock (dòng 29) dùng kiểu tự chế trong khi 7.1 khuyên dùng TimeProvider.
  - Bằng chứng: `| Chắc chắn chỉ gọi một lần, và muốn lỗi nếu trùng | 'Add' |`
  - Sửa: Sửa thành 'Ứng dụng tự đăng ký và cố ý cho phép nhiều bản (IEnumerable)'. Nếu muốn báo lỗi khi trùng thì dùng đoạn kiểm tra trùng ở Bài 2. Thay IClock bằng `services.AddSingleton(TimeProvider.System)` cho thống nhất.
- **minor** · nhất quán · [7.7-options-pattern.md:120](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.7-options-pattern.md): Mục 7.8.3 nói OnChange 'thường bắn hai lần', Bài 3 ghi 'Ba lần cho một lần lưu' và giải thích bằng chuỗi xoá/đổi tên file. Cách lưu của VS Code không hẳn như vậy, và giải thích chưa được kiểm chứng.
  - Bằng chứng: `'OnChange' thường **bắn hai lần** cho một lần sửa file`
  - Sửa: Dùng cách diễn đạt 'có thể bắn nhiều lần (tuỳ trình soạn thảo/hệ điều hành)' ở cả hai chỗ, và chỉ giữ output thực đo kèm tên editor/OS.
- **minor** · chính xác · [7.8-keyed-services.md:205](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.8-keyed-services.md): Lời giải Bài 1 có biến sai tên nên không biên dịch: lambda nhận `kenh` nhưng ném `nameof(channel)`. NotificationSenderResolver.Lay nhận `channel` nhưng dùng `kenh`. Bài 3 trộn tên CanHandle và CoTheXuLy cho cùng một phương thức.

  ```text
  _ => throw new ArgumentOutOfRangeException(nameof(channel))
  ...
  => sp.GetRequiredKeyedService<INotificationSender>(kenh);
  ```

  - Sửa: Thống nhất tên biến (kenh hoặc channel) trong từng đoạn, thống nhất CanHandle trong Bài 3. Nên chọn một quy ước đặt tên identifier (tiếng Anh) cho toàn khoá thay vì trộn KhoLead, IGuiThongBao với ILeadRepository.
- **minor** · chính xác · [7.8-keyed-services.md:327](../lessons/stage-02-csharp-professional/module-07-dependency-injection/7.8-keyed-services.md): Khẳng định 'Không có API nào lấy mọi khoá trực tiếp' cần xem lại. Có thể dùng GetKeyedServices&lt;T&gt;(KeyedService.AnyKey) để lấy mọi đăng ký có khoá của T, và .NET 10 đã chỉnh lại ngữ nghĩa AnyKey (không còn trả các đăng ký AnyKey). Bài cũng không nhắc thay đổi hành vi này trên .NET 10.
  - Bằng chứng: `**Lấy tất cả cài đặt có khoá.** Không có API nào lấy "mọi khoá" trực tiếp.`
  - Sửa: Kiểm chứng trên .NET 10 rồi bổ sung `sp.GetKeyedServices<INotificationSender>(KeyedService.AnyKey)` kèm ghi chú breaking change của .NET 10 về AnyKey. Giữ cách liệt kê enum như phương án tường minh.

### Project 1 - Inventory System (Console + API)

- **critical** · chính xác · [project-01-inventory-console-api.md:373](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): IInventoryService đặt trong Domain/Interfaces nhưng dùng ProductDto, CreateProductRequest, StockItemDto… mà bài yêu cầu định nghĩa trong Application/DTOs. Domain không tham chiếu Application (bài cũng ghi 'Domain không phụ thuộc ai'), nên solution không biên dịch được. Nếu Domain tham chiếu ngược Application thì tạo phụ thuộc vòng.

  ```text
  // Domain/Interfaces/IInventoryService.cs
  namespace InventorySystem.Domain.Interfaces;
  public interface IInventoryService
  {
      Task<ProductDto> CreateProductAsync(CreateProductRequest request, ...
  ```

  - Sửa: Chuyển IInventoryService vào InventorySystem.Application (thư mục Abstractions hoặc Services) cùng các DTO. Domain chỉ giữ entity, enum, IRepository&lt;T&gt;, IProductRepository, IStockRepository. Cập nhật cây thư mục ở mục 4 và sơ đồ phụ thuộc.
- **major** · cấu trúc · [project-01-inventory-console-api.md:7](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): Đầu bài có 'Phương pháp học tập' và 'Câu hỏi khởi động' chung chung, không liên quan Inventory. Cuối bài (dòng 872–907) có 'Mở rộng và đào sâu', 'Mini case study', 'Ví dụ thực tế nhanh' chỉ chứa placeholder ('Chọn một tình huống nhỏ nhưng thực tế…'). Tóm tắt dòng 5 trộn tiếng Anh ('Abstract (integrated exercise)').

  ```text
  ## Mini case study
  
  ### Tình huống
  
  Chọn một tình huống nhỏ nhưng thực tế trong CRM/ERP, xác định rõ đầu vào, ràng buộc, và đầu ra mong muốn.
  ```

  - Sửa: Xoá các mục boilerplate. Nếu muốn giữ 'Mini case study' thì viết tình huống thật, ví dụ 'hai người cùng xuất kho sản phẩm cuối cùng' kèm cách xử lý. Viết lại tóm tắt bằng tiếng Việt tự nhiên.
- **major** · nhất quán · [project-01-inventory-console-api.md:444](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): Program.cs resolve IInventoryService thẳng từ host.Services (root provider), trái với bài học ở 7.4/7.6 (không resolve service Scoped từ root). Nếu sinh viên đăng ký repository là Scoped và chạy với DOTNET_ENVIRONMENT=Development thì sẽ gặp lỗi. Ngoài ra JsonProductRepository(string dataDirectory) không thể resolve tự động, vì container không có kiểu string, và bài không hướng dẫn. ConsoleApplication cũng không được định nghĩa (Step 4 dùng MainMenu).

  ```text
  var inventoryService = host.Services.GetRequiredService<IInventoryService>();
  var app = new ConsoleApplication(inventoryService);
  ...
  public JsonProductRepository(string dataDirectory)
  ```

  - Sửa: Dùng Host.CreateApplicationBuilder, đăng ký repository Singleton (dữ liệu in-memory/file dùng chung) hoặc tạo scope: `using var scope = host.Services.CreateScope();`. Đăng ký JsonProductRepository bằng factory hoặc IOptions&lt;StorageOptions&gt; (`services.AddSingleton<IProductRepository>(sp => new JsonProductRepository(opts.DataDirectory))`). Thống nhất tên MainMenu.
- **major** · chính xác · [project-01-inventory-console-api.md:599](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): Chọn '0' trả Task.CompletedTask với chú thích 'sẽ exit vì CancellationToken', nhưng không có gì huỷ token, nên vòng `while (!ct.IsCancellationRequested)` chạy mãi và không thoát được. Nhánh mặc định dùng Task.Run để in dòng chữ, trái với quy tắc 'không dùng Task.Run cho I/O' ở Step 5, và thông báo bị Console.Clear() xoá ngay.

  ```text
  "0" => Task.CompletedTask,  // sẽ exit vì CancellationToken
  _ => Task.Run(() => Console.WriteLine("Lựa chọn không hợp lệ."))
  ```

  - Sửa: Cho HandleChoiceAsync trả `Task<bool>` (false để thoát) hoặc `break` khi choice == "0". Nhánh sai dùng `Console.WriteLine(...); Console.ReadKey(); return Task.CompletedTask;`.
- **major** · đầy đủ · [project-01-inventory-console-api.md:724](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): Đây là dự án tổng kết Stage 2 nhưng không có starter repo, lời giải mẫu hay unit test mẫu, không ước lượng thời gian hay chia mốc (tuần 1: domain, tuần 2: service…), không có hướng dẫn chấm cho mentor. Rubric (dòng 818) chỉ ghi số điểm mỗi nhóm mà không có tiêu chí. Yêu cầu 'Top nhập/xuất' và 'Warehouse summary' (mục 3.4) cũng không có trong IInventoryService.
  - Bằng chứng: `Map với mục **11. Checklist nộp bài**: **Architecture 20**, **Functionality 25**, **Code Practices 20**, **Extra 15** — tự tick và cộng`
  - Sửa: Thêm mục 'Lộ trình 2–3 tuần' với mốc cụ thể, link starter (solution và test project xUnit có sẵn TC-01..TC-06), lời giải tham khảo dành cho mentor, rubric chi tiết theo từng checklist item. Bổ sung phương thức báo cáo vào IInventoryService hoặc ghi rõ là tuỳ chọn.
- **minor** · chính xác · [project-01-inventory-console-api.md:414](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): Trên .NET 10, `dotnet new sln` mặc định tạo file .slnx, nên cây thư mục ghi InventorySystem.sln không khớp. `dotnet sln add src/**/*.csproj` không chạy được trên PowerShell vì PowerShell không tự mở rộng glob. Trong khối bash có một dòng thừa '# Project 1 - Inventory System (Console + API)'. Bài dùng Host.CreateDefaultBuilder (kiểu cũ) trong khi 7.13 dùng Host.CreateApplicationBuilder. Infrastructure không cần gói System.Text.Json (đã có sẵn).

  ```text
  dotnet sln add src/**/*.csproj
  
  # Project 1 - Inventory System (Console + API)
  dotnet add src/InventorySystem.Application reference ...
  ```

  - Sửa: Ghi chú về .slnx (hoặc dùng `dotnet new sln --format sln`). Liệt kê từng `dotnet sln add src/InventorySystem.Domain/InventorySystem.Domain.csproj …`. Xoá dòng thừa, chuyển sang `var builder = Host.CreateApplicationBuilder(args);`, bỏ lệnh cài System.Text.Json.
- **minor** · đầy đủ · [project-01-inventory-console-api.md:678](../lessons/stage-02-csharp-professional/project-01-inventory-console-api.md): TC-08 yêu cầu ném ValidationException nhưng bài không định nghĩa kiểu này (chỉ có InventoryException), sinh viên có thể nhầm với System.ComponentModel.DataAnnotations.ValidationException. Quiz câu 2 hỏi về `IInventoryRepository`, kiểu không tồn tại trong thiết kế. Gợi ý Level 4 (SemaphoreSlim trong repository) không ngăn được race 'kiểm tra tồn kho rồi ghi' xảy ra ở tầng service.
  - Bằng chứng: `| TC-08 | Tên product rỗng hoặc whitespace | Throw 'ValidationException' |`
  - Sửa: Dùng InventoryException("VALIDATION", …) hoặc định nghĩa ValidationException trong Domain/Exceptions. Sửa quiz thành IProductRepository/IStockRepository. Ghi rõ ở Level 4 rằng cần khoá theo productId trong InventoryService quanh cả bước đọc và ghi.

### Module 8 - ASP.NET Core Fundamentals

- **critical** · chính xác · [8.1-aspnet-core-architecture.md:111](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.1-aspnet-core-architecture.md): Từ .NET 8, giá trị mặc định của HostOptions.ShutdownTimeout là 30 giây chứ không phải 5 giây. Cả Bài 3 dựa trên giả định 5 giây ('request bị cắt, không có dòng XONG'). Trên .NET 10, endpoint 20 giây sẽ chạy xong với cấu hình mặc định, nên người học sẽ thấy kết quả ngược với bài. Phần tự kiểm tra (dòng 477) cũng lặp lại '5 giây'.
  - Bằng chứng: `rồi thoát — mặc định chờ **5 giây**, đổi bằng 'HostOptions.ShutdownTimeout'.`
  - Sửa: Sửa thành 'mặc định 30 giây (từ .NET 8)'. Viết lại Bài 3: dùng endpoint 45 giây để thấy bị cắt với mặc định 30 giây, hoặc đặt ShutdownTimeout = 5 giây để thử. Sửa câu tự kiểm tra và nhắc terminationGracePeriodSeconds của Kubernetes cũng mặc định 30 giây.
- **critical** · chính xác · [8.11-mini-case-study.md:48](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.11-mini-case-study.md): Cơ chế của sự cố mô tả sai. Khi UseAuthorization đứng trước UseRouting, GetEndpoint() trả null. Nếu không có FallbackPolicy, AuthorizationMiddleware cho request đi tiếp. Sau đó EndpointMiddleware phát hiện endpoint có [Authorize] mà middleware phân quyền chưa chạy, và ném InvalidOperationException ('...contains authorization metadata, but a middleware was not found...'), thành 500. Vì vậy: endpoint [AllowAnonymous] trả 200 chứ không phải 401. 'Biến thể nguy hiểm' (dòng 287–306), nói mọi endpoint âm thầm thành công khai, cũng sai. Kết quả mong đợi ở Bài 1 và Bài 3 (dòng 521–528) vì thế không tái hiện được.

  ```text
  -> Chưa biết endpoint nào -> không đọc được [AllowAnonymous]
    -> Áp dụng chính sách mặc định cho MỌI request -> 401
  ```

  - Sửa: Viết lại: (a) không có FallbackPolicy thì endpoint [Authorize] trả 500 kèm thông điệp 'add app.UseAuthorization() between UseRouting and UseEndpoints'; (b) chỉ khi đặt FallbackPolicy = RequireAuthenticatedUser thì mọi request mới thành 401, kể cả [AllowAnonymous]. Dựng lại kịch bản sự cố với FallbackPolicy cho đúng, bỏ 'biến thể nguy hiểm', chạy lại các test ở Bài 3 trên .NET 10 và ghi kết quả thật.
- **critical** · chính xác · [8.12-quick-real-world-example.md:88](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.12-quick-real-world-example.md): Ở bài 8.8, NotFoundException kế thừa DomainException. Switch expression đặt arm DomainException trước NotFoundException, nên arm sau không bao giờ khớp và trình biên dịch báo lỗi CS8510 ('pattern has already been handled'). Code này không biên dịch được với cây exception của chính khoá học.

  ```text
  DomainException e     => (StatusCodes.Status400BadRequest, ...),
  NotFoundException e   => (StatusCodes.Status404NotFound, ...),
  ```

  - Sửa: Đặt các kiểu cụ thể (NotFoundException, ConflictException, DomainValidationException) trước DomainException, như bài 8.8 đã làm, và thêm một câu nhắc rằng thứ tự arm trong switch đi từ cụ thể đến tổng quát.
- **major** · chính xác · [8.1-aspnet-core-architecture.md:210](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.1-aspnet-core-architecture.md): Từ .NET 10, ForwardedHeadersOptions.KnownNetworks và Microsoft.AspNetCore.HttpOverrides.IPNetwork đã bị đánh dấu obsolete (thay bằng KnownIPNetworks với System.Net.IPNetwork). `new IPNetwork(...)` còn dễ bị lỗi tên mơ hồ giữa hai namespace. Từ bản vá 8.0.17/9.0.6, header từ proxy không có trong KnownProxies/KnownNetworks (mặc định chỉ loopback) bị bỏ qua. Do đó output 'Sau khi bật' ở Bài 1 (dòng 176–185) sai: Nginx trong Docker 172.18.0.2 không phải loopback nên IP vẫn là IP của proxy.
  - Bằng chứng: `o.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("172.18.0.0"), 16));  // mạng Docker`
  - Sửa: Dùng `o.KnownIPNetworks.Add(System.Net.IPNetwork.Parse("172.18.0.0/16"));`. Sửa Bài 1 thành: bật UseForwardedHeaders mà chưa khai KnownIPNetworks thì header vẫn bị bỏ qua (từ 8.0.17/9.0.6/10), phải khai báo mạng của proxy mới có IP thật. Bỏ câu 'ForwardLimit=1 … không có giới hạn', vì mặc định đã là 1.
- **major** · thực tế · [8.12-quick-real-world-example.md:603](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.12-quick-real-world-example.md): Bài 'ví dụ thực tế nhanh' lặp lại phần lớn 8.8 (IExceptionHandler, rò rỉ stack trace, traceId, Bài 2 gần như trùng 8.8 Bài 2). Bài còn đưa vào OpenTelemetry Propagators cho message bus, Serilog.Enrichers.Span (đã lỗi thời), 403 so với 404 kèm timing attack, quá tải với sinh viên ở module nền tảng. Handler mẫu (dòng 82–84) log mọi exception ở mức Error, trái với lời khuyên phân mức log của chính bài (dòng 494–513) và bài 8.8.

  ```text
  Propagators.DefaultTextMapPropagator.Inject(
      new PropagationContext(Activity.Current!.Context, Baggage.Current), ...
  ```

  - Sửa: Gộp các ý mới (403/404 enumeration, ẩn header Server) vào 8.8 và cắt 8.12 thành một tình huống ngắn. Chuyển phần OpenTelemetry sang module observability (18.5). Sửa handler mẫu để log Warning cho lỗi nghiệp vụ, Error cho lỗi hệ thống. Bỏ Serilog.Enrichers.Span vì Serilog 3.1+ đã có sẵn TraceId/SpanId.
- **major** · nhất quán · [8.13-review-and-assessment.md:147](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.13-review-and-assessment.md): Lab dùng `throw new NotFoundException(...)` cho trường hợp không tìm thấy, trái với khuyến nghị nhấn mạnh ở 8.8 ('Không dùng exception cho luồng thông thường như không tìm thấy'). Dòng 177 nói Module 9 sẽ nối EF Core và SQL Server, trong khi Module 9 là Web API Professional và EF Core ở Module 13. Mục 8.14.4 là heading rỗng, lab không có lời giải, cuối bài có boilerplate ('Bài tập tổng hợp', 'Kết luận' một câu). Bài 1 tham chiếu 'như phần 2' (cách đánh số cũ).

  ```text
  var customer = _store.FirstOrDefault(c => c.Id == id)
              ?? throw new NotFoundException(nameof(Customer), id);
  ```

  - Sửa: Đổi thành `return customer is null ? NotFound() : Ok(customer);` (hoặc giữ exception nhưng giải thích vì sao lab cố ý dùng nó để thử GlobalExceptionHandler). Sửa câu chuyển tiếp sang Module 9 cho đúng nội dung, xoá heading rỗng và boilerplate, thêm lời giải hoặc checklist chấm cho mentor, đổi 'phần 2' thành 'bài 8.2'.
- **major** · chính xác · [8.3-routing.md:383](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.3-routing.md): Test 'KhongCoRouteNaoNhapNhang' nhóm endpoint theo RoutePattern.RawText, nên báo trùng cho những route hợp lệ khác HTTP method (GET/PUT/DELETE cùng "api/v1/customers/{id:guid}"). Controller CRUD chuẩn ở 8.4.2 sẽ làm test đỏ. Test này cũng không phát hiện được nhập nhằng thật như {a} và {b}, vì RawText khác nhau.

  ```text
  .GroupBy(e => e.RoutePattern.RawText)
          .Where(g => g.Count() > 1)
  ```

  - Sửa: Nhóm theo (pattern đã chuẩn hoá bỏ tên tham số, cùng HttpMethodMetadata), hoặc tốt hơn là gọi thật các URL mẫu qua WebApplicationFactory và assert không có AmbiguousMatchException. Ghi chú giới hạn của cách kiểm tra tĩnh.
- **major** · chính xác · [8.5-model-validation.md:47](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.5-model-validation.md): CreateCustomerRequest dùng cả từ khoá `required` lẫn [Required]. Từ .NET 7, System.Text.Json thực thi C# `required` khi deserialize, nên thiếu trường Name sẽ ném JsonException ('missing required properties including: name'), và lỗi trả về nằm ở key "$"/"request" chứ không phải "Name": ["Tên khách hàng là bắt buộc"] như ví dụ ProblemDetails ở dòng 132–142. Thông điệp tuỳ biến bằng tiếng Việt không bao giờ xuất hiện.

  ```text
  [Required(ErrorMessage = "Tên khách hàng là bắt buộc")]
      [StringLength(200, MinimumLength = 2)]
      public required string Name { get; init; }
  ```

  - Sửa: Với DTO nhận từ body, bỏ từ khoá `required` (dùng `public string Name { get; init; } = "";` hoặc `string?` kèm [Required]) để DataAnnotations xử lý. Thêm một ô 'Lưu ý' giải thích hành vi của `required` với System.Text.Json, kèm output thật để sinh viên nhận ra.
- **major** · chính xác · [8.5-model-validation.md:172](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.5-model-validation.md): Gói FluentValidation.AspNetCore (auto-validation tích hợp MVC) đã bị tác giả ngừng hỗ trợ và không còn được khuyến nghị. Bài cũng mâu thuẫn chính nó: dòng 205 'Đừng dùng cả hai cho cùng một model', dòng 544 'Dùng cả hai cũng được… ASP.NET Core chạy cả hai'.

  ```text
  dotnet add package FluentValidation.AspNetCore
  ...
  Đừng dùng cả hai cho cùng một model
  ...
  **Dùng cả hai cũng được.**
  ```

  - Sửa: Dùng `FluentValidation` và `FluentValidation.DependencyInjectionExtensions`, rồi gọi validator thủ công trong service hoặc qua endpoint filter (như 8.10). Giữ một khuyến nghị duy nhất (không trộn hai hệ trên cùng một model) và sửa đoạn ở dòng 544. Nhắc rằng .NET 10 có validation sẵn cho Minimal API (builder.Services.AddValidation()).
- **major** · chính xác · [8.5-model-validation.md:489](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.5-model-validation.md): Trong FluentValidation, mặc định các rule trong chuỗi vẫn chạy tiếp khi rule trước thất bại (CascadeMode.Continue). Khi TaxCode null, NotEmpty() thất bại rồi Must(m =&gt; m!.Length …) vẫn chạy và ném NullReferenceException, đúng trường hợp test 'BusinessWithoutTaxCode' (dòng 525–532).

  ```text
  .NotEmpty().WithMessage("Khách doanh nghiệp bắt buộc có mã số thuế")
  .Must(m => m!.Length is 10 or 13)
  ```

  - Sửa: Thêm `.Cascade(CascadeMode.Stop)` trước NotEmpty, hoặc viết `.Must(m => m is { Length: 10 or 13 })`. Chạy lại test để xác nhận.
- **major** · chính xác · [8.7-logging-with-serilog.md:108](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.7-logging-with-serilog.md): Enrich.WithMachineName() và Enrich.WithEnvironmentName() nằm trong gói Serilog.Enrichers.Environment, không có trong Serilog.AspNetCore. Với hai lệnh cài ở dòng 99–100, code không biên dịch được.

  ```text
  dotnet add package Serilog.AspNetCore
  dotnet add package Serilog.Sinks.Seq
  ...
      .Enrich.WithMachineName()
      .Enrich.WithEnvironmentName());
  ```

  - Sửa: Thêm `dotnet add package Serilog.Enrichers.Environment`, hoặc bỏ hai enricher này khỏi ví dụ cơ bản. Đổi `Version="*"` của SerilogAnalyzer (dòng 57) thành phiên bản cố định.
- **major** · chính xác · [8.8-global-exception-handling.md:196](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.8-global-exception-handling.md): Bài coi AppDomain.UnhandledException và TaskScheduler.UnobservedTaskException là 'lưới an toàn cho trường hợp 3 (BackgroundService) và 4 (async void)'. Với BackgroundService, từ .NET 6 exception thoát khỏi ExecuteAsync được host ghi log và mặc định dừng toàn ứng dụng (BackgroundServiceExceptionBehavior.StopHost). UnobservedTaskException không liên quan. Với async void, UnhandledException chỉ log được trước khi tiến trình chết, không cứu được. Thiếu thông tin quan trọng về StopHost.

  ```text
  Với trường hợp 3 và 4, thêm lưới an toàn ở `Program.cs`:
  ...TaskScheduler.UnobservedTaskException += ...
  ```

  - Sửa: Bổ sung: exception chưa bắt trong BackgroundService làm host dừng (StopHost) kể từ .NET 6. Cấu hình `builder.Services.Configure<HostOptions>(o => o.BackgroundServiceExceptionBehavior = ...)` nếu muốn, nhưng cách đúng vẫn là try/catch từng công việc. Ghi rõ UnhandledException chỉ để ghi log trước khi tiến trình dừng.
- **major** · đầy đủ · [8.9-health-checks.md:54](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.9-health-checks.md): AddSqlServer, AddRedis, AddNpgSql là extension của các gói AspNetCore.HealthChecks.SqlServer/Redis/NpgSql (Xabaril), nhưng bài không có lệnh cài, nên code không biên dịch. Bài còn trộn SQL Server (mục 8.10.2, 'AddSqlServer mặc định SELECT 1') với PostgreSQL (Bài 1–2), không thống nhất CSDL của dự án CRM.

  ```text
  .AddSqlServer(
          connectionString: builder.Configuration.GetConnectionString("CrmDb")!, ...
  // Bài 1
  .AddNpgSql(cs);
  ```

  - Sửa: Thêm khối `dotnet add package AspNetCore.HealthChecks.NpgSql` (và Redis), chọn một CSDL thống nhất với toàn khoá (đối chiếu Module 13). Hoặc dùng `AddDbContextCheck<CrmDbContext>()` (Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore) để không phụ thuộc bên thứ ba.
- **major** · thực tế · [8.9-health-checks.md:170](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.9-health-checks.md): Bài 8.9 và nhiều bài tập của module (8.1 Bài 1 dựng Nginx, 8.1 Bài 3 kill -TERM/pgrep, 8.9 Bài 1 Kubernetes restart loop, 8.11 tình huống pod) cần Docker, Nginx, Kubernetes, những thứ chỉ học ở Module 15. Các lệnh bash (export, kill, pgrep) cũng không chạy trên PowerShell, môi trường mặc định của đa số sinh viên dùng Windows. Sinh viên năm 1–3 không thực hành được.

  ```text
  #### Bài 1 — Tái hiện vòng lặp khởi động lại
  Cấu hình liveness probe kiểm tra database, dừng database, và quan sát container bị khởi động lại liên tục.
  ```

  - Sửa: Cho mỗi bài tập phương án chạy cục bộ: gọi /health/live và /health/ready bằng curl hoặc .http file, mô phỏng DB chết bằng connection string sai. Đánh dấu phần Kubernetes là 'Đọc hiểu, thực hành ở Module 15'. Thêm lệnh tương đương PowerShell ($env:Demo__Value=..., Stop-Process) hoặc gợi ý dùng launchSettings.json.
- **major** · thực tế · [8.9-health-checks.md:175](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.9-health-checks.md): healthcheck trong docker-compose dùng `curl`, nhưng image chính thức mcr.microsoft.com/dotnet/aspnet (đặc biệt bản chiseled từ .NET 8) không có curl. Container sẽ luôn unhealthy và sinh viên không hiểu vì sao.
  - Bằng chứng: `test: ["CMD", "curl", "-f", "http://localhost:8080/health/live"]`
  - Sửa: Ghi chú: image aspnet không có curl. Có ba cách: cài curl trong Dockerfile (bản không chiseled), dùng một tool health check viết bằng .NET, hoặc để orchestrator (Kubernetes httpGet) gọi từ ngoài. Đưa ví dụ Dockerfile tương ứng.
- **major** · chính xác · [8.9-health-checks.md:484](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.9-health-checks.md): Khẳng định 'ngoại lệ thoát ra khỏi health check cho phản hồi 500 thay vì 503' là sai. DefaultHealthCheckService tự bắt exception của từng check và ghi nhận theo failureStatus (mặc định Unhealthy), nên endpoint vẫn trả 503. Nguyên tắc 'không bao giờ ném' (dòng 129, câu tự kiểm tra dòng 533) vì thế được biện minh bằng lý do sai.
  - Bằng chứng: `Ngoại lệ thoát ra khỏi health check cho phản hồi 500 thay vì 503, và một số bộ cân bằng tải xử lý hai mã này khác nhau.`
  - Sửa: Sửa: framework bắt exception và báo Unhealthy kèm exception, nên endpoint vẫn trả 503. Tự try/catch chỉ để trả mô tả rõ ràng hoặc phân biệt Degraded với Unhealthy (ví dụ timeout coi là Degraded). Sửa câu tự kiểm tra cho khớp.
- **minor** · nhất quán · [8.1-aspnet-core-architecture.md:16](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.1-aspnet-core-architecture.md): Module 8 có cùng lỗi đánh số lệch như Module 7: bài 8.1 dùng 8.2.x, … bài 8.13 dùng 8.14.x. Nhãn link 'bài 8.7' trỏ tới 8.6-configuration-system, 'bài 8.9' trỏ tới 8.8, 'bài 7.5' trỏ tới 7.4… Phần Điều hướng có chữ thừa ('8.2 — 2. Request Pipeline'). 8.9 dòng 408 còn viết 'bài tiếp theo trong mục 8.10.4' cho một mục của chính bài.
  - Bằng chứng: `# 8.1 - Kiến trúc ASP.NET Core ... ### 8.2.1 — Khác biệt so với ASP.NET ... ([bài 8.7](8.6-configuration-system.md))`
  - Sửa: Chạy cùng script đổi số heading và nhãn link như Module 7, và sửa thủ công các câu tham chiếu kiểu 'mục 8.10.4'.
- **minor** (ban đầu major) · chính xác · [8.10-advanced-notes.md:145](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.10-advanced-notes.md): Bài nói 'cách đúng là rate limiting theo người dùng hoặc IP', nhưng ví dụ AddFixedWindowLimiter("api") là một bộ đếm chung cho mọi client (100 request/phút cho cả hệ thống). Policy này cũng không được áp vào endpoint nào (thiếu RequireRateLimiting("api")/[EnableRateLimiting]) và không có app.UseRateLimiter(). Sinh viên chép về sẽ không có tác dụng, hoặc chặn tất cả người dùng cùng lúc.

  ```text
  options.AddFixedWindowLimiter("api", o =>
      {
          o.PermitLimit = 100;
  ```

  - Sửa: Dùng partitioned limiter: `options.AddPolicy("api", ctx => RateLimitPartition.GetFixedWindowLimiter(ctx.User.Identity?.Name ?? ctx.Connection.RemoteIpAddress?.ToString() ?? "anon", _ => new FixedWindowRateLimiterOptions { PermitLimit = 100, Window = TimeSpan.FromMinutes(1) }));`, thêm `options.RejectionStatusCode = 429`, `app.UseRateLimiter()` và `.RequireRateLimiting("api")`.
  - Phản biện (adjusted): Mâu thuẫn là có thật: lời văn nói giới hạn 'theo người dùng hoặc IP' nhưng AddFixedWindowLimiter tạo một bộ đếm chung, và trong 8.10 không có UseRateLimiter hay RequireRateLimiting. Hạ xuống minor vì đây là bài 'mở rộng', có link sang bài 9.6 chuyên về rate limiting, và 8.2/8.11 có gọi UseRateLimiter. Cách sửa: dùng partitioned limiter hoặc ghi rõ đoạn code chưa đầy đủ, xem 9.6.
- **minor** · chính xác · [8.10-advanced-notes.md:294](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.10-advanced-notes.md): Bài 1 có nhiều chỗ không chạy đúng: `.AddEndpointFilter<XacThucFilter>()` dùng kiểu non-generic trong khi Bài 2 định nghĩa XacThucFilter&lt;T&gt;. `v1.MapGroup("/leads").MapLeads()` tạo route /api/v1/leads/api/leads vì MapLeads tự MapGroup("/api/leads"). Câu 'Kiểu trả về tự suy ra cho OpenAPI' sai khi trả Results.Ok (IResult), phải dùng TypedResults. Câu 'HTTP logging bật mặc định ghi cả mật khẩu trong body' (dòng 200) cũng sai, vì mặc định không log body và header ngoài allowlist bị che.

  ```text
  .AddEndpointFilter<XacThucFilter>();
  ...
  v1.MapGroup("/leads").MapLeads();
  ```

  - Sửa: Sửa filter thành XacThucFilter&lt;TaoLeadRequest&gt;, cho MapLeads nhận RouteGroupBuilder hoặc chỉ map đường dẫn tương đối, dùng TypedResults.Ok/NotFound và trả Results&lt;Ok&lt;LeadDto&gt;, NotFound&gt;. Sửa mô tả mặc định của HttpLogging.
- **minor** (ban đầu major) · chính xác · [8.11-mini-case-study.md:104](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.11-mini-case-study.md): Bài lặp lại rằng UseCors phải đứng trước UseAuthentication 'vì preflight không mang token sẽ bị auth từ chối'. UseAuthentication không bao giờ từ chối request, nó chỉ dựng User. Việc từ chối do UseAuthorization làm, và tài liệu Microsoft yêu cầu UseCors sau UseRouting, trước UseAuthorization. Vị trí UseRateLimiter cũng mâu thuẫn: mục 8.12.3 đặt trước auth ('chặn lạm dụng sớm'), lời giải Bài 1 (dòng 334) đặt sau auth ('giới hạn theo người dùng'), còn 8.2 đặt sau UseRouting, trước CORS.
  - Bằng chứng: `| 'UseCors' **trước** auth | Preflight 'OPTIONS' không mang token, sẽ bị auth từ chối |`
  - Sửa: Sửa thành 'UseCors sau UseRouting, trước UseAuthorization (thường đặt trước UseAuthentication cho dễ nhớ)'. Giải thích UseAuthentication không trả 401. Thống nhất một vị trí UseRateLimiter cho toàn khoá (sau UseAuthentication nếu partition theo user, sau UseRouting nếu dùng policy theo endpoint), kèm lý do. Sửa câu tự kiểm tra ở dòng 625.
  - Phản biện (adjusted): Bản thân quy tắc đặt UseCors sau UseRouting và trước UseAuthentication/UseAuthorization là đúng theo thứ tự middleware Microsoft khuyến nghị. Chỉ có lời giải thích 'bị auth từ chối' là thiếu chính xác: UseAuthentication không từ chối request, UseAuthorization mới từ chối. Mâu thuẫn về vị trí UseRateLimiter là có thật: 8.11 dòng 84 đặt trước auth, dòng 334 đặt sau auth, 8.2 dòng 215 đặt trước CORS. Hạ xuống minor, sửa lời giải thích và thống nhất một vị trí kèm lý do.
- **minor** · chính xác · [8.11-mini-case-study.md:161](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.11-mini-case-study.md): Test EndpointCongKhai_KhongDoiXacThuc tự mâu thuẫn: chú thích nói sai mật khẩu 'có thể 400 hoặc 401', nhưng assert NotEqual(Unauthorized). Nếu endpoint login trả 401 cho sai mật khẩu (rất phổ biến) thì test đỏ dù pipeline đúng. Các test dùng FluentAssertions (v8 có giấy phép thương mại) mà không nhắc.

  ```text
  // Có thể 400 hoặc 401 vì sai mật khẩu — nhưng KHÔNG được là 401 vì thiếu token
      Assert.NotEqual(HttpStatusCode.Unauthorized, response.StatusCode);
  ```

  - Sửa: Kiểm tra endpoint [AllowAnonymous] không phụ thuộc thông tin đăng nhập (ví dụ GET /api/cong-khai/trang-thai trả 200), hoặc phân biệt bằng header WWW-Authenticate. Dùng Assert của xUnit, hoặc ghi chú về giấy phép FluentAssertions 8 (hay dùng Shouldly/AwesomeAssertions).
- **minor** · dễ hiểu · [8.2-request-pipeline-and-middleware.md:298](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.2-request-pipeline-and-middleware.md): Khối 'Kết quả' của Bài 1 in một output sai rồi chú thích 'KHÔNG PHẢI: thứ tự thật là…', gây rối cho người mới. Mục 8.3.4 dùng LogContext.PushProperty của Serilog trước khi Serilog được giới thiệu (8.7) mà không có using. app.UseRequestTiming() (dòng 211) chưa được định nghĩa.

  ```text
  A vào
  B vào
  C vào
  A ra        <- KHÔNG PHẢI: thứ tự thật là C ra, B ra, A ra
  ```

  - Sửa: Bỏ khối output sai, chỉ giữ output đúng (có thể hỏi 'bạn đoán gì?' trước rồi mới mở details). Dùng ILogger.BeginScope thay LogContext ở 8.2, hoặc ghi 'cần Serilog — xem 8.7'. Thêm extension UseRequestTiming hoặc dùng UseMiddleware&lt;RequestTimingMiddleware&gt;().
- **minor** · dễ hiểu · [8.3-routing.md:50](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.3-routing.md): Ví dụ attribute routing khai báo các action không có thân phương thức trong một class (chỉ có chữ ký kết thúc bằng ';'), nên không biên dịch. Người mới chép vào sẽ gặp lỗi CS0501 mà không hiểu vì sao.

  ```text
  [HttpGet]
      public Task<IActionResult> GetAll([FromQuery] PagedRequest request, CancellationToken ct);
  ```

  - Sửa: Thêm chú thích '// thân phương thức lược bỏ' và viết `=> throw new NotImplementedException();`, hoặc dùng thân ngắn `=> Task.FromResult<IActionResult>(Ok())`. Áp dụng tương tự cho 8.4 (dòng 101, 114, 151).
- **minor** · chính xác · [8.5-model-validation.md:3](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.5-model-validation.md): ProblemDetails được gọi là 'RFC 7807' ở 8.4, 8.5, 8.12, 8.13. RFC 7807 đã bị RFC 9457 thay thế (chính 8.5 dẫn link RFC 9457). Không thống nhất.
  - Bằng chứng: `**'ProblemDetails'** theo RFC 7807`
  - Sửa: Ghi 'RFC 9457 (thay thế RFC 7807)' ở lần đầu, sau đó dùng RFC 9457 thống nhất, và sửa cả câu hỏi quiz 3 trong 8.13.
- **minor** · chính xác · [8.6-configuration-system.md:279](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.6-configuration-system.md): Script Python phát hiện mảng định nghĩa hàm w() nhưng không bao giờ gọi w(d), nên không in gì. Dùng Python/bash trong khoá .NET cho sinh viên Windows cũng không thuận tiện. Đường dẫn User Secrets chỉ ghi dạng Linux/macOS (~/.microsoft/usersecrets).

  ```text
  def w(o,p=''):
      ...
      elif isinstance(o,list): print('  MẢNG:', p, ...)
  "
  ```

  - Sửa: Thêm `w(d)` ở cuối script, hoặc thay bằng đoạn C# duyệt config.AsEnumerable() tìm khoá dạng ':0'. Bổ sung đường dẫn Windows: %APPDATA%\Microsoft\UserSecrets\&lt;id&gt;\secrets.json.
- **minor** · chính xác · [8.7-logging-with-serilog.md:464](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.7-logging-with-serilog.md): SensitiveDataPolicy trả true cho mọi kiểu và gọi GetValue trên mọi property, kể cả indexer (ném TargetParameterCountException), nên chặn mọi destructuring policy khác. Code còn tạo Log.Logger mới, tách rời cấu hình builder.Host.UseSerilog ở trên. 'Persist Security Info=false' (dòng 512) vốn đã là mặc định và không ảnh hưởng nội dung exception.

  ```text
  var props = value.GetType().GetProperties()
              .Select(p => new LogEventProperty(...
  result = new StructureValue(props);
  return true;
  ```

  - Sửa: Giới hạn policy cho các kiểu cần che (ví dụ có attribute [Sensitive]) và bỏ qua indexer (p.GetIndexParameters().Length == 0), hoặc dùng gói Destructurama.Attributed với [NotLogged]. Đăng ký qua `config.Destructure.With<SensitiveDataPolicy>()` trong UseSerilog. Sửa câu về Persist Security Info.
- **minor** · chính xác · [8.8-global-exception-handling.md:33](../lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.8-global-exception-handling.md): UnauthorizedAccessException là exception của I/O hoặc hệ điều hành (không có quyền ghi file…), không phải lỗi phân quyền nghiệp vụ. Ánh xạ nó sang 403 sẽ che lỗi hệ thống thật (đáng ra là 500). Tóm tắt nói 'ValidationException là 422' trong khi code dùng DomainValidationException, còn Bài 2 lại map ValidationException sang 400.
  - Bằng chứng: `UnauthorizedAccessException  => (StatusCodes.Status403Forbidden, "Không đủ quyền"),`
  - Sửa: Tạo ForbiddenException : DomainException cho lỗi phân quyền nghiệp vụ, để UnauthorizedAccessException rơi vào nhánh 500. Thống nhất tên và mã (DomainValidationException → 422) trong tóm tắt, mục 8.9.1 và Bài 2.

### Module 9 - Web API Professional

- **critical** · nhất quán · [9.13-review-and-assessment.md:42](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.13-review-and-assessment.md): Bài tập tổng kết yêu cầu đúng những anti-pattern mà module vừa cảnh báo: lưu upload vào wwwroot và trả URL công khai (9.5 nói đây là XSS lưu trữ), chỉ validate content type (9.5 bắt kiểm magic number), dùng InMemory DB cho integration test (9.8 nói 'nói dối'). Bài còn mong đợi 422 cho lỗi validation trong khi [ApiController] trả 400 (9.8 cũng assert 400).
  - Bằng chứng: `"Lưu vào thư mục 'wwwroot/uploads/' với tên file an toàn (GUID-based). Trả về URL có thể truy cập công khai." / "Dùng in-memory database" / "expect '422'"`
  - Sửa: Viết lại yêu cầu: lưu ngoài wwwroot, phục vụ qua action có kiểm quyền, kiểm magic number; test dùng Testcontainers (hoặc SQLite in-memory nếu máy không có Docker); validation mong đợi 400 ValidationProblemDetails. Đồng thời bỏ yêu cầu làm cả PUT lẫn PATCH, hoặc giải thích lý do, vì 9.1 khuyên không hỗ trợ cả hai.
- **critical** · chính xác · [9.3-swagger-openapi.md:493](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.3-swagger-openapi.md): Code cấu hình Swashbuckle dùng API của Microsoft.OpenApi 1.x (OpenApiReference, ReferenceType, namespace Microsoft.OpenApi.Models). Trên .NET 10 với Swashbuckle 10.x (Microsoft.OpenApi 2.x), API này đã đổi (OpenApiSecuritySchemeReference, AddSecurityRequirement(document =&gt; ...)) nên không biên dịch được. Bài cũng khuyên Swashbuckle là 'an toàn nhất' trong khi template .NET 9/10 đã dùng Microsoft.AspNetCore.OpenApi, và .NET 10 đã hỗ trợ XML comment sẵn.
  - Bằng chứng: `Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }`
  - Sửa: Lấy Microsoft.AspNetCore.OpenApi (AddOpenApi/MapOpenApi) + Scalar làm đường chính cho .NET 10, có ví dụ document transformer cho Bearer. Nếu giữ Swashbuckle thì ghi rõ phiên bản và cập nhật cú pháp Microsoft.OpenApi 2.x. Bảng so sánh sửa thành '.NET 9+: có; .NET 10: OpenAPI 3.1, XML comments'.
- **critical** · chính xác · [9.3-swagger-openapi.md:647](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.3-swagger-openapi.md): `UseSwaggerUI()` trả về IApplicationBuilder nên không có `.RequireAuthorization(...)`, code không biên dịch. Ở Bài 2, `MapSwagger().RequireAuthorization` chỉ bảo vệ file JSON chứ không bảo vệ trang UI (UI là middleware static file).
  - Bằng chứng: `app.UseSwaggerUI().RequireAuthorization("ApiDocsPolicy");`
  - Sửa: Dùng `app.MapSwagger().RequireAuthorization("ApiDocsPolicy")` cho JSON và giải thích UI cần bảo vệ riêng (map UI qua endpoint, hoặc chặn bằng middleware có điều kiện, hoặc chỉ bật ở môi trường nội bộ). Với Microsoft.AspNetCore.OpenApi thì dùng `app.MapOpenApi().RequireAuthorization(...)`.
- **critical** · chính xác · [9.3-swagger-openapi.md:676](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.3-swagger-openapi.md): Redocly CLI không có lệnh `diff` (các lệnh hiện có là lint, bundle, split, join, stats, build-docs...). Mọi bước CI trong 9.3, 9.11 và Bài 3 dựa vào lệnh không tồn tại, kèm output và cờ (`--fail-on breaking`, `--severity error`) bịa ra.
  - Bằng chứng: `npx @redocly/cli diff previous-swagger.json swagger.json --severity error`
  - Sửa: Thay bằng `oasdiff breaking baseline.json current.json --fail-on ERR` (Go binary hoặc Docker image tufin/oasdiff), cập nhật output mẫu theo oasdiff. Sửa đồng bộ ở 9.3 (dòng 676, 927, 956), 9.11 (dòng 175, 304, 344, 353) và 9.10.
- **critical** · chính xác · [9.4-pagination-filtering-sorting.md:205](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.4-pagination-filtering-sorting.md): `ApplySort` gán kết quả OrderBy vào biến kiểu IQueryable&lt;Customer&gt;, sau đó gọi `query.ThenBy(...)`. ThenBy chỉ có trên IOrderedQueryable nên code không biên dịch.

  ```text
  query = desc ? query.OrderByDescending(key) : query.OrderBy(key);
      return query.ThenBy(c => c.Id);
  ```

  - Sửa: Khai báo `IOrderedQueryable<Customer> ordered = desc ? query.OrderByDescending(key) : query.OrderBy(key); return desc ? ordered.ThenByDescending(c => c.Id) : ordered.ThenBy(c => c.Id);`
- **critical** · chính xác · [9.7-response-caching-and-output-caching.md:30](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.7-response-caching-and-output-caching.md): Bài nói output caching 'hoạt động cả với request đã xác thực'. Thực tế policy mặc định không cache response của request đã xác thực hoặc có header Authorization. Vì vậy policy "per-user" với SetVaryByHeader("Authorization") hay SetVaryByValue sẽ không bao giờ cache được.
  - Bằng chứng: `| Có chạy khi có 'Authorization' | **Không** | Có | ... options.AddPolicy("per-user", b => b ... .SetVaryByHeader("Authorization")`
  - Sửa: Sửa bảng: output cache mặc định KHÔNG cache request đã xác thực, response có Set-Cookie hay mã khác 200. Muốn cache theo người dùng phải viết IOutputCachePolicy tùy biến, hoặc dùng AddPolicy(..., excludeDefaultPolicy: true) kèm VaryByValue theo user id. Kèm cảnh báo rò rỉ dữ liệu. Nhắc thứ tự: UseOutputCache đặt sau UseAuthentication/UseAuthorization.
- **critical** · chính xác · [9.7-response-caching-and-output-caching.md:110](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.7-response-caching-and-output-caching.md): Bài khẳng định thiếu SetVaryByQuery thì ?page=1 và ?page=2 dùng chung cache, và Bài 1 lấy điều này làm tiền đề. Tài liệu Microsoft ghi ngược lại: mặc định toàn bộ URL, kể cả query string, đã nằm trong khoá cache. SetVaryByQuery thực chất thu hẹp khoá xuống chỉ còn các tham số được liệt kê. Người học làm Bài 1 sẽ không tái hiện được lỗi.
  - Bằng chứng: `"'SetVaryByQuery' là bắt buộc và hay bị quên. Không có nó, '?page=1' và '?page=2' dùng chung một bản cache" / Bài 1: "khoá mặc định gồm method + host + đường dẫn, và không gồm chuỗi truy vấn"`
  - Sửa: Viết lại 9.8.3 và Bài 1: mặc định khoá đã gồm scheme, host, port, path và query string. SetVaryByQuery dùng để CHỈ giữ một số tham số trong khoá (ví dụ bỏ utm_*). Bài 1 nên đổi thành: 'dùng SetVaryByQuery("page") mà quên "status" → hai bộ lọc dùng chung cache'. Bỏ ví dụ `.VaryByQuery()` vì không có API này.
- **major** · nhất quán · [9.1-rest-api-design-principles.md:41](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.1-rest-api-design-principles.md): Đánh số mục lệch một bậc trên toàn module: bài 9.1 dùng '9.2.x', 9.2 dùng '9.3.x' ... 9.13 dùng '9.14.x'. Chữ trong link cũng lệch so với file đích, ví dụ 'bài 9.5 (`9.4-...`)', 'bài 9.3 (`9.2-...`)', 'bài 8.3 (`8.2-...`)', 'bài 7.8 (`7.7-...`)'. Module 10 bị lỗi y hệt ('10.2.x' trong bài 10.1, 'bài 10.3 (`10.2-...`)').
  - Bằng chứng: `### 9.2.1 — Sáu ràng buộc ... Chi tiết ở [bài 9.5](9.4-pagination-filtering-sorting.md).`
  - Sửa: Chạy script đánh số lại heading theo số bài và sửa chữ trong link cho khớp số của file đích ở cả hai module. Thêm bước kiểm tra trong CI: chữ 'bài X.Y' phải khớp tiền tố tên file đích.
- **major** · chính xác · [9.1-rest-api-design-principles.md:304](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.1-rest-api-design-principles.md): Lời giải idempotency có ba lỗi. (1) Serialize order trước SaveChanges nên Id lưu là 0. (2) Khi request trùng tới lúc request đầu đang xử lý, Response vẫn null nên `Deserialize(saved.Response!)` ném ArgumentNullException. (3) Hàm `IsUniqueViolation()` không được định nghĩa. Lần retry trả 200 thay vì 201 như lần đầu.

  ```text
  db.Orders.Add(order);
      record.Response = JsonSerializer.Serialize(order);
      await db.SaveChangesAsync(ct);
  ```

  - Sửa: Lưu order trước rồi mới serialize response (hoặc làm trong một transaction). Thêm trạng thái InProgress, trả 409 khi Response còn null (như 9.12). Định nghĩa IsUniqueViolation (Npgsql: SqlState 23505; SQL Server: lỗi 2601/2627). Lưu status code để trả lại đúng 201.
- **major** (ban đầu critical) · chính xác · [9.10-advanced-notes.md:68](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.10-advanced-notes.md): Code gửi webhook không biên dịch: object initializer của HttpRequestMessage thiếu `};`, header X-Event-Id bị thêm hai lần. Link 'tham số chọn trường ([bài 9.5])' trỏ tới bài phân trang, nơi không hề có nội dung này.

  ```text
  Content = new StringContent(payload, Encoding.UTF8, "application/json")
      request.Headers.Add("X-Event-Id", ...);   // 2. ...
      ...
      request.Headers.Add("X-Event-Id", evt.Id.ToString());
  ```

  - Sửa: Đóng initializer bằng `};`, giữ một dòng X-Event-Id. Bỏ link sai hoặc viết một đoạn ngắn về field selection. Ghi rõ phiên bản HotChocolate cho phần GraphQL (AddQueryComplexityRule và SetPagingOptions đã đổi tên ở v13/v14, nay là ModifyCostOptions và ModifyPagingOptions) và đánh dấu cả bài là 'tuỳ chọn – nâng cao'.
  - Phản biện (adjusted): Lỗi có thật: object initializer ở dòng 65–72 thiếu `};` và X-Event-Id bị thêm hai lần. Link [bài 9.5] ở dòng 148 trỏ tới bài phân trang, nơi không có nội dung về field selection. Phần HotChocolate cũng cần ghi phiên bản (SetPagingOptions đã thay bằng ModifyPagingOptions ở v14; complexity chuyển sang cost analysis). Tuy vậy đây là bài 'mở rộng/đào sâu' tuỳ chọn và lỗi cú pháp dễ thấy, sửa nhanh, nên hạ từ critical xuống major.
- **major** · dễ hiểu · [9.11-mini-case-study.md:105](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.11-mini-case-study.md): Case study dùng các khái niệm chưa học ở giai đoạn này: MediatR `_sender.Send`, CQRS `GetLeadQuery`, strongly-typed id `LeadId`, value object `MoneyDto`, Result `lead.Value`. Tên `lead.Value` vừa là Result.Value vừa là thuộc tính tiền Lead.Value nên rất dễ nhầm. Nội dung (phân loại breaking change, versioning, redocly diff, Sunset) gần như lặp lại 9.2.

  ```text
  var lead = await _sender.Send(new GetLeadQuery(new LeadId(id)), ct);
          return Ok(LeadDtoV1.From(lead.Value));
  ```

  - Sửa: Viết lại bằng service đơn giản (`_leads.GetAsync(id)`) và DTO thường. Đổi tên thuộc tính tiền thành `EstimatedValue`. Giữ phần câu chuyện sự cố và chỉ tham chiếu 9.2 cho phần lý thuyết, bỏ phần lặp. Sửa `Deprecation: true` theo RFC 9745 (`Deprecation: @<unix>`) và cập nhật tham chiếu RFC 7807 thành RFC 9457.
- **major** · cấu trúc · [9.13-review-and-assessment.md:90](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.13-review-and-assessment.md): Bài review là khuôn mẫu chung, đánh số '9.14.x', có heading rỗng ('Kiểm tra & Thực hành (100 điểm)'). Phần mục tiêu, bài tập tổng hợp, tự kiểm tra và kết luận là boilerplate sáo rỗng. Ba bài lab không có lời giải hay tiêu chí hoàn thành. Quiz chỉ có 5 câu dễ, có câu đáp án 'B (tinh thần)'. Rubric dành 15 điểm cho HATEOAS dù 9.1 và 9.10 xếp HATEOAS ưu tiên thấp.

  ```text
  ### 9.14.4 — Kiểm tra & Thực hành (100 điểm)
  
  ### 9.14.5 — Bối cảnh giáo trình
  ```

  - Sửa: Đánh số lại 9.13.x, xoá heading rỗng và boilerplate. Thay quiz bằng 10–15 câu bám sát lỗi thường gặp (idempotency, cursor tie-breaker, VaryByQuery, StopHost...). Mỗi lab có tiêu chí hoàn thành đo được và lời giải tham khảo (link repo mẫu). Đổi tiêu chí HATEOAS thành 'phân trang cursor có tie-breaker'.
- **major** · thực tế · [9.2-api-versioning.md:186](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.2-api-versioning.md): Bài tập giả định người học đã có API production với lịch sử 6 tháng, log một tuần theo client, môi trường staging và đối tác. Sinh viên CLB không có những thứ này nên không làm được. Bài cũng thiếu hướng dẫn cài gói (Asp.Versioning.Mvc, Asp.Versioning.Mvc.ApiExplorer, hoặc Asp.Versioning.Http cho Minimal API), và không giới thiệu Sunset policy có sẵn trong Asp.Versioning (`options.Policies.Sunset(1.0).Effective(...).Link(...)`) mà lại tự viết middleware.
  - Bằng chứng: `"Lấy 10 thay đổi gần nhất trong API của bạn (đọc 'git log' ...)" / "Thêm log version cho mỗi request, chạy một tuần"`
  - Sửa: Cung cấp repo CRM mẫu có sẵn 10 commit thay đổi DTO và file log mẫu để phân tích. Thêm khối 'Chuẩn bị' với lệnh `dotnet add package`. Dùng Sunset policy tích hợp của Asp.Versioning thay cho middleware tự viết. Middleware nên dùng `app.Logger` vì biến `logger` hiện chưa được khai báo.
- **major** · chính xác · [9.3-swagger-openapi.md:789](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.3-swagger-openapi.md): Bài khẳng định sau khi khai [ProducesResponseType(404)] thì NSwag sinh nhánh trả null thay vì ném lỗi. Mặc định NSwag sinh mã ném ApiException cho mọi mã không phải 2xx đã khai (chỉ đổi thông báo lỗi), nên kết luận của Bài 1 sai. Câu 'Với .NET 9, [ProducesResponseType] suy ra kiểu từ ActionResult&lt;T&gt;' cũng sai mốc: ApiExplorer đã làm việc này từ ASP.NET Core 2.1.
  - Bằng chứng: `"NSwag sinh thêm nhánh trả 'null' thay vì ném, và đoạn code tự nhiên ở trên chạy đúng."`
  - Sửa: Sửa lời giải: khai 404 giúp client có kiểu lỗi rõ ràng và thông báo 'Not Found', nhưng vẫn ném ApiException. Muốn trả null phải cấu hình NSwag (ví dụ wrapResponses hoặc tự xử lý), hoặc thiết kế API trả 200 với body rỗng. Sửa mốc thời gian của ActionResult&lt;T&gt;.
- **major** · chính xác · [9.4-pagination-filtering-sorting.md:32](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.4-pagination-filtering-sorting.md): Setter đã kẹp PageSize về 1..100 trước khi validation chạy, nên [Range] không bao giờ báo lỗi. Gọi pageSize=0 hoặc pageSize=1000000 đều âm thầm thành 100. Như vậy câu 'tầng phòng thủ thứ hai sau [Range]' không đúng, và client không biết tham số của mình sai.
  - Bằng chứng: `init => _pageSize = value is > 0 and <= MaxPageSize ? value : MaxPageSize;`
  - Sửa: Chọn một chiến lược: hoặc kẹp im lặng (bỏ [Range] và ghi rõ trong tài liệu), hoặc validate trả 400 (bỏ phần kẹp trong setter). Nếu kẹp thì pageSize&lt;=0 nên về mặc định 20 chứ không phải 100. Cập nhật test ở 9.8 cho khớp.
- **major** · chính xác · [9.4-pagination-filtering-sorting.md:79](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.4-pagination-filtering-sorting.md): Ví dụ ở mục 9.5.2 nói chèn 5 bản ghi mới thì vừa trùng vừa bỏ sót 5 bản ghi khác. Chèn vào đầu danh sách chỉ gây trùng; bỏ sót xảy ra khi bản ghi bị xoá. Bài 2 của chính bài này giải thích đúng, nên hai phần mâu thuẫn nhau.

  ```text
  "=> 5 bản ghi cuối của trang 1 cũ bị đẩy xuống và hiện LẠI ở trang 2
        => 5 bản ghi khác bị BỎ SÓT hoàn toàn"
  ```

  - Sửa: Sửa thành: chèn mới gây lặp; xoá bản ghi ở trang trước gây bỏ sót. Có thể dùng luôn minh hoạ A–F của Bài 2.
- **major** · chính xác · [9.4-pagination-filtering-sorting.md:89](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.4-pagination-filtering-sorting.md): Câu SQL trộn cú pháp SQL Server (`TOP 20`) với so sánh row-value `(CreatedAt, Id) < (...)`. SQL Server không hỗ trợ cú pháp này, chỉ PostgreSQL và MySQL có. Cả module trộn SQL Server (OFFSET FETCH, DATEADD, DELETE TOP) với PostgreSQL (EXPLAIN ANALYZE, psql, ON CONFLICT).

  ```text
  SELECT TOP 20 * FROM Customers
  WHERE (CreatedAt, Id) < (@lastCreatedAt, @lastId)
  ```

  - Sửa: Chọn một CSDL cho cả khoá (ví dụ PostgreSQL) và ghi trong phần chuẩn bị môi trường. Với SQL Server dùng `WHERE CreatedAt < @c OR (CreatedAt = @c AND Id < @id)`. Rà lại toàn bộ SQL trong 9.1, 9.2, 9.4, 9.9, 9.12.
- **major** · nhất quán · [9.4-pagination-filtering-sorting.md:446](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.4-pagination-filtering-sorting.md): Envelope phân trang không thống nhất. PagedResponse khai `Data`/`Pagination`, nhưng script Bài 2 đọc `.items` với tham số `size`, test ở 9.7 dùng `p1!.Items`, ví dụ ở 9.1 dùng `items`/`_links`. Với jq, `.items` trả null nên vòng lặp dừng ngay và đếm ra 0 bản ghi.
  - Bằng chứng: `n=$(curl -s "localhost:5000/api/v1/orders?page=$page&size=100" | jq '.items | length')`
  - Sửa: Chốt một hợp đồng (ví dụ `{ items, page, pageSize, totalCount }`) và dùng chung ở 9.1, 9.4, 9.6, 9.7, 9.8 và 10.6. Tham số query thống nhất là `pageSize`.
- **major** · chính xác · [9.5-file-upload-and-download.md:132](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.5-file-upload-and-download.md): Code stream multipart dùng `[DisableFormValueModelBinding]`, đây là attribute tự viết trong sample của Microsoft nhưng bài không định nghĩa. `.Value!.Trim('"')` trên StringSegment cũng không có overload nhận char. Người học copy về sẽ không biên dịch được.
  - Bằng chứng: `[DisableFormValueModelBinding] ... .Parameters.First(p => p.Name == "boundary").Value!.Trim('"');`
  - Sửa: Thêm định nghĩa attribute (IResourceFilter loại bỏ FormValueProviderFactory/FormFileValueProviderFactory) hoặc link tới sample. Lấy boundary bằng `HeaderUtilities.RemoveQuotes(MediaTypeHeaderValue.Parse(Request.ContentType).Boundary).Value`.
- **major** · đầy đủ · [9.6-rate-limiting.md:124](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.6-rate-limiting.md): Policy "per-user" phân vùng theo context.User nhưng bài không nói UseRateLimiter phải đứng sau UseAuthentication. Nếu không, User luôn là ẩn danh và mọi người bị gộp theo IP. Bài cũng không nhắc yêu cầu UseRateLimiter đứng sau UseRouting khi dùng attribute cho từng endpoint.
  - Bằng chứng: `options.AddPolicy("per-user", context => { var userId = context.User.FindFirst(...)... app.UseRateLimiter();`
  - Sửa: Thêm đoạn pipeline đầy đủ: UseRouting → UseAuthentication → UseRateLimiter → UseAuthorization (hoặc đặt sau UseAuthorization) và giải thích lý do. Thêm mục này vào checklist.
- **major** · chính xác · [9.6-rate-limiting.md:266](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.6-rate-limiting.md): Lời giải Bài 1 đăng ký limiter tên "fixed" nhưng không gắn vào endpoint nào (thiếu [EnableRateLimiting]/RequireRateLimiting/GlobalLimiter), nên 200 request đều qua vì không có giới hạn nào. Ngoài ra cửa sổ của FixedWindowLimiter tính từ lúc limiter được tạo, không khớp với giây :00 của đồng hồ, nên script 'chờ giây 59' không tái hiện được biên cửa sổ.
  - Bằng chứng: `o.AddFixedWindowLimiter("fixed", ...) ... while [ $(date +%S) -ne 59 ]`
  - Sửa: Thêm `app.MapGet(...).RequireRateLimiting("fixed")` hoặc [EnableRateLimiting("fixed")]. Giải thích cửa sổ bắt đầu từ request đầu tiên hoặc lúc tạo partition. Đổi thí nghiệm: gửi 100 request ngay trước khi cửa sổ (Window=10s) kết thúc, đo thời điểm bằng log, rồi gửi tiếp 100 request.
- **major** · chính xác · [9.7-response-caching-and-output-caching.md:150](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.7-response-caching-and-output-caching.md): RowVersion là byte[], nên nội suy chuỗi cho ra "System.Byte[]". ETag vì thế không bao giờ đổi, client sẽ nhận 304 mãi dù dữ liệu đã cập nhật. Bài 3 dùng Base64 nên đúng, nhưng phần lý thuyết thì sai.
  - Bằng chứng: `var etag = $"\"{customer.RowVersion}\"";`
  - Sửa: Dùng `Convert.ToBase64String(customer.RowVersion)` như Bài 3 (với PostgreSQL thì dùng giá trị xmin uint). Thêm ghi chú rằng nội suy mảng byte cho ra tên kiểu.
- **major** · chính xác · [9.8-api-testing.md:49](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing.md): Bài khẳng định ConfigureServices của WebApplicationFactory chạy trước nên bị Program.cs ghi đè. Với minimal hosting (.NET 6+), tài liệu Microsoft ghi builder.ConfigureServices chạy SAU Program.cs. Khác biệt thật sự của ConfigureTestServices nằm ở thứ tự so với Startup.ConfigureServices kiểu cũ.
  - Bằng chứng: `"'ConfigureServices' chạy **trước** và sẽ bị 'Program.cs' ghi đè — một lỗi tốn nhiều thời gian để phát hiện."`
  - Sửa: Sửa: cả hai đều chạy sau Program.cs. Khuyến nghị ConfigureTestServices vì ý nghĩa rõ và an toàn với Startup class. Nhắc lỗi thật hay gặp: AddDbContext lần hai trên EF Core 9+ cần xoá thêm IDbContextOptionsConfiguration&lt;TContext&gt;. Sửa câu tự kiểm tra tương ứng.
- **major** · chính xác · [9.8-api-testing.md:110](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing.md): Trên EF Core 9/10, chỉ RemoveAll&lt;DbContextOptions&lt;T&gt;&gt; rồi AddDbContext lại thì cấu hình gốc trong Program.cs (IDbContextOptionsConfiguration&lt;T&gt;) vẫn được áp dụng. Nếu production dùng Npgsql còn test dùng SqlServer (bài trộn MsSql ở 9.9.4 và Postgres ở Bài 1) sẽ gặp lỗi 'multiple database providers'. Factory cũng gọi `factory.ResetDatabaseAsync()` mà không định nghĩa.

  ```text
  services.RemoveAll<DbContextOptions<CrmDbContext>>();
              services.AddDbContext<CrmDbContext>(o => o.UseSqlServer(_db.GetConnectionString()));
  ```

  - Sửa: Thêm `services.RemoveAll<IDbContextOptionsConfiguration<CrmDbContext>>();` (EF Core 9+), hoặc dùng ConfigureDbContext. Dùng một loại container khớp với CSDL đã chọn cho khoá. Định nghĩa ResetDatabaseAsync bằng Respawn ngay trong CrmApiFactory.
- **major** · dễ hiểu · [9.8-api-testing.md:556](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing.md): Bài 3 bảo 'đổi tên route mà không sửa CreatedAtRoute', nhưng code mẫu giữ nguyên tên "GetCustomerById" ở cả hai chỗ. Chú thích nói tên route không tồn tại trong khi nó tồn tại. Phương thức `TheoId(int id) { }` là async không return nên không biên dịch.
  - Bằng chứng: `[HttpGet("{id:int}", Name = "GetCustomerById")] ... return CreatedAtRoute("GetCustomerById", ...); // tên route KHÔNG TỒN TẠI`
  - Sửa: Đổi Name trên GetById thành "GetCustomer" (đã rename) và giữ CreatedAtRoute("GetCustomerById"). Viết thân phương thức hợp lệ, ví dụ `=> Ok()`.
- **major** (ban đầu critical) · chính xác · [9.9-hosted-service-background-jobs.md:137](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs.md): Bẫy số hai của bài ('exception giết worker mà app vẫn chạy, health check xanh') sai với mặc định từ .NET 6 (StopHost: cả host dừng). Bài tự mâu thuẫn ở dòng 139. Bài tập 1 yêu cầu xác nhận 'app vẫn phục vụ bình thường', điều này không tái hiện được trên .NET 10 nếu giữ mặc định.
  - Bằng chứng: `"Exception thoát khỏi 'ExecuteAsync' khiến worker dừng vĩnh viễn. Ứng dụng web vẫn chạy, health check vẫn xanh" ... "Từ .NET 6, 'BackgroundServiceExceptionBehavior.StopHost' là mặc định"`
  - Sửa: Viết lại: trên .NET 6+ exception chưa bắt sẽ dừng cả host (log Critical). Kịch bản 'chết im lặng' chỉ xảy ra khi đặt BackgroundServiceExceptionBehavior.Ignore hoặc trên .NET 5 trở về trước. Bài 1 cho người học đặt Ignore để tái hiện. Cập nhật tóm tắt và phần tự kiểm tra.
  - Phản biện (adjusted): Lỗi có thật. Dòng 137 khẳng định worker chết thì app vẫn chạy và health check vẫn xanh, Bài tập 1 (dòng 273, 304) bắt xác nhận 'app vẫn phục vụ bình thường'. Trên .NET 6+ mặc định là BackgroundServiceExceptionBehavior.StopHost nên kịch bản này không tái hiện được nếu không đặt Ignore. Tuy vậy, ngay dòng 139 và dòng 377 bài đã tự nói đúng mặc định StopHost, nên người đọc kỹ vẫn thấy được. Đây là mâu thuẫn và bài tập hỏng, không phải kiến thức sai hoàn toàn, nên hạ xuống major. Cách sửa giữ nguyên: viết lại bẫy số 2 cho rõ 'chết im lặng chỉ xảy ra khi đặt Ignore hoặc trên .NET 5 trở về trước', và Bài 1 yêu cầu đặt Ignore.
- **major** · chính xác · [9.9-hosted-service-background-jobs.md:209](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs.md): Bài nói host chỉ chờ 5 giây khi shutdown. Từ .NET 6 mặc định HostOptions.ShutdownTimeout là 30 giây.
  - Bằng chứng: `"Mặc định host chỉ chờ **5 giây**."`
  - Sửa: Sửa thành 30 giây (.NET 6+), đồng thời sửa câu tương ứng trong phần tự kiểm tra. Nhắc thêm terminationGracePeriodSeconds của Kubernetes (30s) phải lớn hơn hoặc bằng ShutdownTimeout.
- **major** · đầy đủ · [README.md:3](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/README.md): README module chỉ có danh sách link. Không có mục tiêu module, kiến thức tiên quyết, chuẩn bị môi trường (SDK .NET 10, Docker, CSDL, Nginx), thứ tự học hay phân biệt phần bắt buộc với phần nâng cao. Tóm tắt còn nhắc 'validation, Problem Details' trong khi module không có bài riêng cho hai chủ đề này. Các bài lẻ cũng không có mục 'Kiến thức tiên quyết'.
  - Bằng chứng: `> **Tóm tắt:** Web API chuyên nghiệp: versioning, validation, Problem Details, OpenAPI, filtering/paging`
  - Sửa: Thêm vào README: mục tiêu, tiên quyết (Module 8, EF Core cơ bản), môi trường (lệnh tạo project mẫu, docker compose Postgres/Redis), đánh dấu bài core (9.1, 9.3, 9.4, 9.5, 9.8) và bài nâng cao (9.6, 9.7, 9.9, 9.10). Gợi ý lịch buổi sinh hoạt cho mentor.
- **minor** · chính xác · [9.1-rest-api-design-principles.md:131](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.1-rest-api-design-principles.md): Bài đưa ra quy tắc cứng 'DELETE phải trả 204 kể cả khi đã xoá, không phải 404'. Idempotency theo RFC 9110 nói về trạng thái server chứ không về mã phản hồi; trả 404 ở lần xoá thứ hai vẫn là idempotent, và hướng dẫn API của Microsoft cho phép 404.
  - Bằng chứng: `"**'DELETE' phải idempotent**: xoá một thứ đã xoá vẫn trả **204**, không phải 404."`
  - Sửa: Diễn đạt lại: idempotent là về trạng thái cuối. Trả 204 cho lần lặp là một lựa chọn thiết kế giúp client retry đơn giản hơn, còn 404 cũng hợp lệ. Sửa checklist cho khớp.
- **minor** · chính xác · [9.12-quick-real-world-example.md:411](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.12-quick-real-world-example.md): Kết quả mô phỏng của bản 'chỉ kiểm tra bằng if' có 17 phản hồi 409, nhưng code bản này không có nhánh nào trả 409. Bài nhắc tới `AnyAsync` trong khi code dùng FirstOrDefaultAsync. Filter dùng `AppDbContext` còn các bài khác dùng `CrmDbContext`. Phần cài đặt Idempotency-Key cũng lặp gần nguyên văn Bài 1 của 9.1.

  ```text
  **Với bản chỉ kiểm tra bằng `if`:**
        3 201
       17 409
  ```

  - Sửa: Sửa output thành '20 201' (hoặc 3 đơn trùng và 17 phản hồi 201 trả kết quả cũ). Thống nhất tên DbContext. Gộp nội dung idempotency về một chỗ (9.12) và để 9.1 chỉ dẫn link sang.
- **minor** · nhất quán · [9.3-swagger-openapi.md:656](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.3-swagger-openapi.md): Lệnh dùng đường dẫn net9.0 trong khi khoá học nhắm .NET 10 LTS. Lỗi này lặp ở 9.3, 9.10 và 9.11.
  - Bằng chứng: `swagger tofile --output swagger.json bin/Release/net9.0/CrmApi.dll v1`
  - Sửa: Đổi thành net10.0, hoặc dùng Microsoft.Extensions.ApiDescription.Server để sinh file OpenAPI lúc build (OpenApiGenerateDocuments) thay cho CLI.
- **minor** · chính xác · [9.5-file-upload-and-download.md:118](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.5-file-upload-and-download.md): Bài mô tả Kestrel là tầng chặn sớm nhất và [RequestSizeLimit] chạy sau. Thực tế [RequestSizeLimit] ghi đè giới hạn MaxRequestBodySize của Kestrel cho riêng endpoint đó (endpoint import 500MB vượt được mức Kestrel 10MB chính là nhờ vậy). Gợi ý Bài 1 còn nói ContentType nằm trong header Content-Disposition, trong khi nó là header Content-Type của phần multipart.
  - Bằng chứng: `"Kestrel chặn **sớm nhất** ... '[RequestSizeLimit]' chạy sau khi request đã vào pipeline." / "chỉ là một chuỗi trong header 'Content-Disposition'"`
  - Sửa: Giải thích: Kestrel đặt giới hạn mặc định, [RequestSizeLimit]/[DisableRequestSizeLimit] ghi đè theo endpoint qua IHttpMaxRequestBodySizeFeature, còn FormOptions giới hạn riêng phần multipart. Sửa thành 'header Content-Type của phần multipart'.
- **minor** (ban đầu major) · chính xác · [9.6-rate-limiting.md:150](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.6-rate-limiting.md): Bài nói client bị chặn mặc định nhận 429. Thực tế RateLimiterOptions.RejectionStatusCode mặc định là 503 Service Unavailable. Phần tự kiểm tra lặp lại lỗi này.
  - Bằng chứng: `"Mặc định, client chỉ nhận **429 với body rỗng**"`
  - Sửa: Sửa thành: mặc định trả 503, nên phải đặt `options.RejectionStatusCode = 429` (như ở 9.7.2). Thêm câu hỏi tự kiểm tra về chi tiết này.
  - Phản biện (adjusted): RateLimiterOptions.RejectionStatusCode mặc định là 503, nên câu ở dòng 150 và 580 sai. Tuy nhiên đoạn code ngay trước đó (dòng 98) đã đặt RejectionStatusCode = 429, nên trong ngữ cảnh bài 'mặc định' có thể hiểu là 'khi chưa viết OnRejected', và người học làm theo code vẫn nhận 429. Sửa câu thành: mặc định là 503 với body rỗng; phải đặt 429 và viết OnRejected để có Retry-After. Hạ xuống minor.
- **minor** · dễ hiểu · [9.6-rate-limiting.md:402](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.6-rate-limiting.md): Có dấu vết thay chữ 'sau' thành 'after' hàng loạt, kèm typo tên biến. Lỗi xuất hiện ở 9.1:232, 9.6:402/508/536/441 và 9.9:364.
  - Bằng chứng: `"phía after", "Vẫn bị giới hạn after 5 lần thử", "Vui lòng thử lại after.", "soThersHien"`
  - Sửa: Thay 'after' bằng 'sau' ở các chỗ trên, đổi tên biến thành `soTheHien`. Đồng thời thêm dấu tiếng Việt cho các comment và nhãn Mermaid đang viết không dấu ('Dem reset moi N giay', 'chay action that'...).
- **minor** · chính xác · [9.7-response-caching-and-output-caching.md:188](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.7-response-caching-and-output-caching.md): Bài nói không đặt SizeLimit thì cache ăn hết bộ nhớ. Thực tế mặc định SizeLimit là 100 MB và MaximumBodySize là 64 MB. Ngoài ra, kho Redis cho output cache đã có gói chính thức nhưng bài chỉ nói chung chung là 'cài IOutputCacheStore'.
  - Bằng chứng: `"Không có 'SizeLimit', một endpoint có nhiều biến thể sẽ ăn hết bộ nhớ tiến trình."`
  - Sửa: Ghi rõ giá trị mặc định (100 MB và 64 MB) và lý do nên hạ xuống. Giới thiệu `AddStackExchangeRedisOutputCache` (gói Microsoft.AspNetCore.OutputCaching.StackExchangeRedis) cho trường hợp nhiều instance.
- **minor** · dễ hiểu · [9.8-api-testing.md:332](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.8-api-testing.md): Đề Bài 1 yêu cầu 'xác nhận nó XANH dù code sai', nhưng lời giải viết test mong đợi exception và báo 'đỏ vì lý do sai'. Người học sẽ bối rối không biết mục tiêu là xanh hay đỏ.
  - Bằng chứng: `"Chạy với 'UseInMemoryDatabase' và xác nhận nó **xanh** dù code sai" vs "Bài kiểm thử **đỏ vì lý do sai**"`
  - Sửa: Thống nhất: viết test 'tạo 2 customer trùng email phải ném DbUpdateException'. Với InMemory thì test đỏ (không phát hiện được vi phạm unique), với Testcontainers thì xanh. Sửa câu đề cho khớp.
- **minor** · chính xác · [9.9-hosted-service-background-jobs.md:161](../lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/9.9-hosted-service-background-jobs.md): Khoá phân tán bản 1 chỉ INSERT rồi bắt lỗi trùng. Bản ghi không bao giờ bị xoá hay ghi đè khi hết hạn, nên ExpiresAt vô tác dụng và job sẽ không chạy lại, trái với câu ngay bên dưới. Lớp worker là singleton nhưng lại dùng `_db`.
  - Bằng chứng: `_db.JobLocks.Add(new JobLock { ... ExpiresAt = DateTime.UtcNow.AddMinutes(30) ...}); catch (DbUpdateException) { return false; }`
  - Sửa: Thay bằng bản upsert có điều kiện `WHERE ExpiresAt < now` như ở Bài 3, hoặc xoá khoá khi job xong. Lấy DbContext từ scope tạo bằng IServiceScopeFactory.

### Module 10 - Authentication + Authorization

- **critical** · nhất quán · [10.2-jwt-authentication.md:91](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.2-jwt-authentication.md): Bài 10.2 đặt `MapInboundClaims = false`. Khi đó claim giữ tên gốc ("sub", "role") nhưng RoleClaimType và NameClaimType vẫn là URI dài. Hậu quả: `[Authorize(Roles=...)]`/IsInRole ở 10.4 không nhận vai trò, còn mọi chỗ đọc `ClaimTypes.NameIdentifier` (10.1, 10.5, 10.6, 10.7, 10.8 OnTokenValidated, 10.13) trả null, nên ghép các bài lại thì toàn bộ phân quyền hỏng. Ở 10.1, `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` cũng không có tác dụng trên .NET 8+ vì JwtBearer đã chuyển sang JsonWebTokenHandler.
  - Bằng chứng: `options.MapInboundClaims = false;     // giu nguyen ten claim trong token  (10.2)  vs  User.FindFirstValue(ClaimTypes.NameIdentifier) (10.1, 10.5, 10.6...)`
  - Sửa: Chọn một quy ước cho cả module. Đơn giản nhất cho sinh viên: giữ mặc định (bỏ MapInboundClaims=false) và đọc ClaimTypes.*. Nếu tắt ánh xạ thì thêm `TokenValidationParameters.NameClaimType = "sub"` (hoặc "name") và `RoleClaimType = "role"`, rồi đọc `User.FindFirstValue("sub")` ở mọi bài. Sửa 10.1: dùng `JsonWebTokenHandler.DefaultInboundClaimTypeMap.Clear()` hoặc chỉ dùng MapInboundClaims.
- **critical** · chính xác · [10.2-jwt-authentication.md:99](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.2-jwt-authentication.md): `ValidateIssuerSigningKey` chỉ điều khiển việc kiểm tra bản thân khoá ký (ví dụ hạn của chứng chỉ). Nó không bật hay tắt việc kiểm chữ ký, và mặc định là false. Chữ ký luôn được kiểm khi có IssuerSigningKey. Vì vậy bảng 'năm thứ không được tắt', Bài 3 ('Actual: OK') và token giả '.khong-can-chu-ky' đều sai: token ký sai khoá vẫn bị từ chối (IDX10503/IDX10511).
  - Bằng chứng: `| 'ValidateIssuerSigningKey' | **Chấp nhận token ký bằng khoá bất kỳ** — lỗ hổng nghiêm trọng nhất | ... Expected: Unauthorized  Actual: OK`
  - Sửa: Sửa bảng: tắt chữ ký chỉ xảy ra khi tự gắn SignatureValidator trả token không kiểm, hoặc RequireSignedTokens=false với token alg=none. Viết lại Bài 3 làm đột biến thật: đổi `RequireSignedTokens=false` kèm token alg 'none', hoặc thay IssuerSigningKey bằng khoá của kẻ tấn công. Giữ ý 'tắt van rồi xem test đỏ'.
- **critical** · chính xác · [10.3-refresh-token.md:229](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.3-refresh-token.md): Cửa sổ ân hạn yêu cầu 'trả lại R2' (ReturnExistingReplacementAsync), nhưng server chỉ lưu `ReplacedByHash`, tức hash SHA-256 của R2, nên không thể khôi phục token thô để trả cho tab thứ hai. Thiết kế mâu thuẫn với nguyên tắc 'chỉ lưu hash' của chính bài. Ngoài ra code rotation không chống race: ba request song song cùng đọc RevokedAt == null và cùng rotate, tạo ba chuỗi song song thay vì cho ra 'OK, 401, 401' như Bài 2.

  ```text
  if (age < TimeSpan.FromSeconds(10) && stored.ReplacedByHash is not null)
          return await ReturnExistingReplacementAsync(stored, ct);   // trả lại R2
  ```

  - Sửa: Đề xuất phương án khả thi. Cách 1: lưu R2 mã hoá bằng Data Protection trong 10 giây (cột ReplacementCiphertext có TTL) để trả lại. Cách 2: trong cửa sổ ân hạn chỉ cấp access token mới mà không cấp refresh token mới. Cách 3: khuyến nghị đồng bộ phía client là chính. Thêm chống race bằng `ExecuteUpdateAsync(...Where(t => t.Id == id && t.RevokedAt == null))` kiểm số dòng, hoặc concurrency token. Áp dụng tương tự cho 10.12.
- **critical** · chính xác · [10.7-permission-system.md:281](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.7-permission-system.md): C# lấy số bit dịch theo modulo 64 với long, nên `1L << 64 == 1L << 0 == 1`. Biểu thức này không tràn về 0 và không gây lỗi CS0221. Quyền mới vì vậy âm thầm trùng với CustomerView, đúng là một lỗi nguy hiểm, nhưng lời giải mô tả sai cơ chế và nói trình biên dịch chặn được.

  ```text
  SomethingNew    = 1L << 64,        // ???
  ...
  error CS0221: Constant value '0' cannot be converted to a 'long'
  `1L << 64` tràn về `0`, nên quyền mới **bằng `None`**
  ```

  - Sửa: Sửa: `1L << 64` bằng 1 vì số bit dịch được lấy `& 63`. Biên dịch không lỗi, không cảnh báo, và quyền mới trùng giá trị với CustomerView. Kết luận đổi thành cả hai vấn đề đều im lặng.
- **major** · chính xác · [10.1-authentication-vs-authorization.md:382](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.1-authentication-vs-authorization.md): Bài nói gọi qua Nginx mặc định sẽ nhận 431. Thực tế khi một header vượt large_client_header_buffers, Nginx trả 400 Bad Request ('Request Header Or Cookie Too Large'). Kestrel mới trả 431. Lỗi lặp ở 10.7 Bài 2.

  ```text
  curl ... http://localhost:8080/api/v1/customers
  # 431
  ```

  - Sửa: Sửa thành 400 với thông điệp 'Request Header Or Cookie Too Large' của Nginx. Ghi chú Kestrel trả 431 khi vượt MaxRequestHeadersTotalSize. Bảng ba tầng ghi rõ mã lỗi của từng tầng.
- **major** · chính xác · [10.11-advanced-notes.md:401](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.11-advanced-notes.md): Test kiến trúc gọi `GetMethods(BindingFlags.Public | BindingFlags.DeclaredOnly)` mà thiếu BindingFlags.Instance, nên luôn trả mảng rỗng và test xanh vô điều kiện, tạo cảm giác an toàn giả. Hàm `ReturnsOrAccepts` cũng không được định nghĩa.
  - Bằng chứng: `.SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.DeclaredOnly))`
  - Sửa: Dùng `BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly`, cung cấp cài đặt ReturnsOrAccepts (kiểm tra ReturnType, bóc Task&lt;&gt;/ActionResult&lt;&gt;, và các ParameterType). Nhấn mạnh bài học 'test phải đỏ được' đã dạy ở 10.2.
- **major** · nhất quán · [10.12-mini-case-study.md:33](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.12-mini-case-study.md): Case study dùng schema RefreshToken khác 10.3: `Token` thô (trái nguyên tắc 'hash trước khi lưu'), `ExpiresUtc/RevokedUtc/ReplacedByToken` thay cho `ExpiresAt/RevokedAt/ReplacedByHash`, có cột SecurityStamp mà 10.3 không có. `AppUser.IsActive` không có trong AppUser ở 10.8. Code `TokenHash = Hash(raw = GenerateRandomToken())` dùng biến chưa khai báo. Phần lớn nội dung (rotation, phát hiện tái sử dụng, cookie, ClockSkew) lặp lại 10.2, 10.3 và 10.4.
  - Bằng chứng: `.FirstOrDefaultAsync(t => t.Token == refreshToken, ct); ... TokenHash = Hash(raw = GenerateRandomToken()),`
  - Sửa: Dùng đúng entity của 10.3, thêm cột SecurityStamp và AppUser.IsActive ngay từ 10.3/10.8. Rút gọn 10.12 vào trọng tâm (kiểm trạng thái tài khoản ở /refresh) và link tới 10.3 cho phần rotation. Sửa biến `raw`. Thống nhất CSDL (đang có cả `IsActive = 0` kiểu SQL Server lẫn psql).
- **major** (ban đầu critical) · nhất quán · [10.14-review-and-assessment.md:46](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.14-review-and-assessment.md): Lab 3 bắt làm đúng thứ 10.7 khẳng định là sai: `Permission` enum bitmask và nạp quyền vào claim "permissions" lúc login. Hướng dẫn tham chiếu các mục không tồn tại ('xem mục 2', 'mục 6', 'mục 7'), là tàn dư cấu trúc cũ. Yêu cầu mật khẩu &gt;= 8 ký tự mâu thuẫn với 10.8 (12). Hàm `GenerateAccessToken` trong khi 10.2 dùng `CreateAccessToken`.
  - Bằng chứng: `"Implement 'Permission' enum + middleware ... Tạo 'Permission' enum (xem mục 7) ... Khi login, load permission từ DB, đưa vào claim \"permissions\"."`
  - Sửa: Viết lại Lab 3: mã quyền dạng chuỗi (`deals.approve`), bảng RolePermissions, PermissionHandler tra cache, policy động `Permission:deals.approve`. Thay 'xem mục N' bằng link tới đúng bài (10.2, 10.6, 10.7). Đồng bộ độ dài mật khẩu và tên hàm.
  - Phản biện (adjusted): Lỗi có thật. 10.14 dòng 46–52 yêu cầu Permission enum và nạp claim "permissions" lúc login, đúng những gì 10.7 cảnh báo (bitmask, token phình, thu hồi trễ). Bài có 'xem mục 2/6/7' trỏ tới mục không tồn tại, yêu cầu mật khẩu &gt;= 8 (10.8 đặt 12) và dùng GenerateAccessToken trong khi 10.2 dùng CreateAccessToken. Tuy nhiên đây là lab mâu thuẫn với bài học, không phải code sai hay lỗ hổng bị dạy như đúng: người học vừa đọc 10.7 sẽ thấy cảnh báo. Hạ xuống major; cách sửa giữ nguyên.
- **major** · cấu trúc · [10.14-review-and-assessment.md:83](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.14-review-and-assessment.md): Bài review có cùng boilerplate với 9.13: đánh số '10.15.x', heading rỗng, mục tiêu, bài tập tổng hợp, tự kiểm tra và kết luận chung chung. Quiz 5 câu dễ, có câu đáp án 'B (tinh thần)'. Các lab không có lời giải hay repo mẫu. Quiz bỏ qua các điểm trọng tâm của module (401/403, ClockSkew, AND/OR handler, IDOR 403/404, SecurityStamp).

  ```text
  ### 10.15.4 — Kiểm tra & Thực hành (100 điểm)
  
  ### 10.15.5 — Bối cảnh giáo trình
  ```

  - Sửa: Đánh số lại 10.14.x, xoá heading rỗng và boilerplate. Soạn 10–15 câu quiz bám các lỗi thường gặp đã dạy. Mỗi lab có tiêu chí chấm đo được, kịch bản test mẫu và lời giải tham khảo cho mentor.
- **major** · dễ hiểu · [10.2-jwt-authentication.md:209](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.2-jwt-authentication.md): Endpoint đăng nhập dùng `_userManager.FindByEmailAsync`/`CheckPasswordAsync` và `_refreshTokens.IssueAsync` trước khi Identity (10.8) và refresh token (10.3) được giới thiệu, nên người học dùng khái niệm chưa học. Phần 'chuẩn bị' cũng không có gói Microsoft.AspNetCore.Authentication.JwtBearer hay lớp JwtOptions.
  - Bằng chứng: `var user = await _userManager.FindByEmailAsync(request.Email); ... var refreshToken = await _refreshTokens.IssueAsync(user.Id, ct);`
  - Sửa: Thêm khối 'Chuẩn bị': `dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer`, định nghĩa JwtOptions, appsettings mẫu, user-secrets. Trong 10.2 dùng IUserService giả lập hoặc giới thiệu tối thiểu UserManager kèm link tới 10.8. Tạm bỏ refresh token khỏi endpoint, thêm lại ở 10.3. Có thể giới thiệu JsonWebTokenHandler/SecurityTokenDescriptor như cách phát token hiện đại.
- **major** · nhất quán · [10.7-permission-system.md:50](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.7-permission-system.md): Mã quyền và schema không thống nhất. 10.5 dùng `customer.delete` với `Permissions.Customer.Delete` và prefix "perm:"/"Permission:". 10.7 dùng `customers.delete` với `Permissions.Customers.Delete`. Bảng ở 10.7 lúc dùng cột `Name/PermissionName` và RoleId NVARCHAR(450), lúc dùng `Code/PermissionCode` và RoleId UNIQUEIDENTIFIER. Phép tính '200 quyền ≈ 5,3 KB ⇒ vượt 8 KB' tự mâu thuẫn.
  - Bằng chứng: `public const string Delete = "customers.delete"; (10.7)  vs  public const string Delete = "customer.delete"; (10.5) / "+ Base64 => ~5,3 KB => Vượt giới hạn header 8 KB"`
  - Sửa: Chốt một quy ước (`customers.delete`, lớp `Permissions.Customers`, prefix `Permission:`) và một schema (Permissions.Code, RolePermissions(RoleId nvarchar(450) theo IdentityRole, PermissionCode FK)). Sửa con số: 200 quyền × khoảng 25 byte sau Base64 ≈ 9–10 KB, vượt 8 KB.
- **major** · chính xác · [10.8-overview.md:72](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.8-overview.md): Bài nói Identity dùng PBKDF2-HMAC-SHA256. Từ .NET 7, PasswordHasher V3 dùng PBKDF2-HMAC-SHA512 với 100.000 vòng (hash mẫu 'AQAAAAIAAYag...' ở 10.11 chính là SHA512). Bài cũng nói SecurityStamp đổi khi gỡ vai trò, trong khi AddToRoleAsync/RemoveFromRoleAsync không cập nhật stamp (10.4 Bài 3 lại bảo gọi tay), nên hai bài mâu thuẫn.
  - Bằng chứng: `"Identity dùng PBKDF2-HMAC-SHA256 với **100.000 vòng lặp**" / "'SecurityStamp' — một GUID đổi mỗi khi ...: đổi mật khẩu, gỡ vai trò"`
  - Sửa: Sửa thành PBKDF2-HMAC-SHA512, 100.000 vòng (từ .NET 7; trước đó là SHA256 10.000 vòng). Liệt kê đúng các thao tác tự đổi stamp (đổi hoặc đặt lại mật khẩu, đổi email hoặc SĐT, bật hoặc tắt 2FA, thêm hoặc gỡ login ngoài) và nhấn mạnh đổi vai trò phải gọi UpdateSecurityStampAsync thủ công. Sửa tương tự ở 10.12 dòng 76.
- **major** · chính xác · [10.8-overview.md:326](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.8-overview.md): Bài 1 khuyến nghị `_signInManager.CheckPasswordSignInAsync`, nhưng cấu hình ở 10.9.1 dùng AddIdentityCore và không gọi `.AddSignInManager()`, nên inject SignInManager sẽ báo lỗi DI. Câu 'lockoutOnFailure mặc định là false' cũng sai: đây là tham số bắt buộc, không có giá trị mặc định.
  - Bằng chứng: `.AddIdentityCore<AppUser>(...).AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders(); ... _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true)`
  - Sửa: Thêm `.AddSignInManager()` vào cấu hình. Sửa câu thành 'lockoutOnFailure là tham số bắt buộc; nhiều mẫu code truyền false'. Thống nhất tên claim stamp (đang có cả "sstamp" và "security_stamp").
- **major** · chính xác · [10.9-overview.md:75](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.9-overview.md): Bài mô tả đăng nhập Google là OIDC, có xác thực id_token qua JWKS và nonce, nhưng ví dụ lại dùng `AddGoogle`. Đây là handler OAuth 2.0 gọi endpoint userinfo, không validate id_token hay nonce. AddGoogle còn cần một SignInScheme (cookie external) mà cấu hình JWT + AddIdentityCore ở 10.8 không có, nên GetExternalLoginInfoAsync và SignInManager.SignInAsync ở Bài 2 sẽ không chạy trong kiến trúc JWT của khoá.

  ```text
  builder.Services.AddAuthentication()
      .AddGoogle(options => { ... });  vs  "A->>A: xác thực id_token, tạo/liên kết user"
  ```

  - Sửa: Nói rõ AddGoogle là OAuth2 + userinfo. Muốn OIDC đúng nghĩa thì dùng AddOpenIdConnect với Authority=https://accounts.google.com. Thêm cấu hình `.AddCookie(IdentityConstants.ExternalScheme)` và `options.SignInScheme = IdentityConstants.ExternalScheme`, `.AddSignInManager()`. Bài 2 bỏ SignInAsync (cookie), thay bằng phát JWT nội bộ cho khớp kiến trúc của khoá.
- **major** · chính xác · [10.9-overview.md:438](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.9-overview.md): Bài 3 cho rằng refresh_token cookie đặt SameSite=Strict gây lỗi 'Correlation failed'. Cookie tương quan (.AspNetCore.Correlation.*) do handler Google tự đặt với SameSite=None, độc lập với refresh_token (Path=/api/auth). Refresh cookie Strict được set ở response callback, sau đó SPA cùng site gọi /api/auth/refresh thì cookie vẫn được gửi. Khuyến nghị 'phải Lax' mâu thuẫn với 10.3 và 10.12 (Strict) mà không có lập luận đúng.
  - Bằng chứng: `"5. Server không thấy cookie tương quan -> \"Correlation failed\"" ... SameSite = SameSiteMode.Strict (refresh_token)`
  - Sửa: Tách hai chuyện: (a) cookie tương quan và nonce của handler phải là SameSite=None/Lax, framework đã lo; (b) refresh cookie Strict vẫn dùng được nếu client gọi /refresh từ trang cùng site sau redirect. Chỉ khuyên Lax khi cookie phải đi kèm chính lần điều hướng top-level từ site khác. Thống nhất một khuyến nghị cho cả module.
- **major** · đầy đủ · [README.md:3](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/README.md): README module 10 không có mục tiêu, tiên quyết, chuẩn bị môi trường (gói JwtBearer, Identity.EntityFrameworkCore, Google OAuth client, Redis cho Data Protection) hay lộ trình học. Thứ tự bài khiến 10.2 dùng UserManager trước khi 10.8 giới thiệu Identity. Không phân biệt bài core và bài nâng cao cho sinh viên năm 1-3 (passkey, mTLS, password spraying).
  - Bằng chứng: `> **Tóm tắt:** Xác thực & phân quyền ASP.NET Core: JWT, OAuth2/OIDC, cookie, policy-based authorization — mô hình bảo mật đa tenant cho CRM.`
  - Sửa: Thêm vào README: mục tiêu, tiên quyết (Module 8–9, EF Core), lệnh tạo project mẫu Crm.Api có sẵn Identity và JWT, thứ tự học đề xuất (10.1 → 10.8 tóm tắt → 10.2 → 10.3 → 10.4–10.7 → 10.10), đánh dấu 10.9 và 10.11 là nâng cao. Nhắc .NET 10 đã có passkey tích hợp trong ASP.NET Core Identity để cập nhật phần passkey ở 10.11.
- **minor** · chính xác · [10.1-authentication-vs-authorization.md:415](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.1-authentication-vs-authorization.md): Đoạn cache quyền không biên dịch được. IMemoryCache.GetOrCreateAsync không nhận CancellationToken. Collection expression `[]` không chuyển được sang IReadOnlySet&lt;string&gt; (C# 12–14 chưa hỗ trợ IReadOnlySet). Nên chỉ đặt code đầy đủ ở 10.7, ở đây chỉ cần link.
  - Bằng chứng: `=> await _cache.GetOrCreateAsync($"perm:{userId}", async e => {...}, ct) ?? [];`
  - Sửa: Bỏ tham số ct, dùng `?? new HashSet<string>()`, hoặc thay bằng HybridCache với chữ ký đúng (factory nhận CancellationToken). Tốt nhất chỉ để link sang 10.7.
- **minor** · chính xác · [10.10-security-best-practices.md:438](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.10-security-best-practices.md): YAML GitHub Actions đặt `on: schedule` bên trong một step, đây là cú pháp không hợp lệ vì `on` thuộc cấp workflow. Câu 'NuGet luôn chọn phiên bản cao nhất' sai: NuGet chọn phiên bản thấp nhất thoả ràng buộc, và quy tắc 'direct dependency wins' mới là lý do ghim trực tiếp có tác dụng. Khối `csharp` lại chứa lệnh shell `dotnet user-secrets`.

  ```text
  - name: Quét lại hằng tuần
    on:
      schedule:
  ```

  - Sửa: Tách thành workflow riêng có `on: schedule` ở đầu file. Sửa thành 'NuGet chọn phiên bản thấp nhất thoả mãn; tham chiếu trực tiếp thắng (direct dependency wins)'. Đổi khối code thành bash. Nhắc NuGetAudit đã bật mặc định lúc restore từ .NET 9 SDK.
- **minor** · dễ hiểu · [10.13-quick-real-world-example.md:163](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.13-quick-real-world-example.md): Phần giải thích bẫy global query filter tự mâu thuẫn: vừa bảo 'phải dùng IModelCacheKeyFactory theo tenant', vừa bảo 'tham chiếu service là đủ'. Cách đúng là filter tham chiếu thuộc tính hoặc field của chính DbContext instance (EF tự tham số hoá); IModelCacheKeyFactory không cần cho trường hợp này. Bài dùng vai trò "Sales"/"SalesManager" khác với CrmRoles (SalesRep/Manager), dùng `LeadId` (strongly-typed id) chưa học, và lặp gần hết nội dung 10.6.
  - Bằng chứng: `// -> ... Phải dùng IModelCacheKeyFactory theo tenant. ... "Cách tránh là tham chiếu tới **service** trong biểu thức"`
  - Sửa: Viết lại: filter phải đọc `this._tenantContext.TenantId` (một member của DbContext) để EF coi là tham số; nếu chụp giá trị vào biến cục bộ trong OnModelCreating thì giá trị bị đóng băng. Bỏ câu về IModelCacheKeyFactory. Dùng CrmRoles và Guid id. Rút gọn bài, link tới 10.6.
- **minor** · chính xác · [10.3-refresh-token.md:255](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.3-refresh-token.md): Cookie được tạo với Path="/api/auth" nhưng khi xoá lại gọi `Response.Cookies.Delete("refresh_token")` không kèm Path, nên trình duyệt không xoá cookie và refresh token vẫn còn sau khi logout. Login ở 10.2 và test ở Bài 1 thì trả và nhận refresh token qua JSON body, mâu thuẫn với khuyến nghị dùng cookie.
  - Bằng chứng: `Response.Cookies.Delete("refresh_token");`
  - Sửa: Gọi `Response.Cookies.Delete("refresh_token", new CookieOptions { Path = "/api/auth", Secure = true, SameSite = ... })`. Thống nhất trong module: SPA nhận refresh token qua cookie; mobile hoặc test có thể nhận qua body, và ghi rõ trường hợp nào dùng cách nào.
- **minor** · chính xác · [10.5-policy-based-authorization.md:225](../lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/10.5-policy-based-authorization.md): Bài nói provider tự viết bị gọi mỗi request và nên tự cache bằng ConcurrentDictionary. Từ .NET 7, AuthorizationPolicyCache đã cache policy theo endpoint khi provider có AllowsCachingPolicies = true (mặc định của interface). Câu tự kiểm tra 'Handler mặc định là Singleton' cũng sai vì lifetime do người đăng ký chọn, không có mặc định. Hai cài đặt PermissionPolicyProvider trong cùng bài dùng hai prefix khác nhau ("Permission:" và "perm:").
  - Bằng chứng: `"'GetPolicyAsync' được gọi cho **mỗi request** ... provider tự viết thì nên thêm một 'ConcurrentDictionary' làm cache."`
  - Sửa: Cập nhật: từ .NET 7 policy được cache, chỉ cần giữ GetPolicyAsync rẻ. Sửa câu về lifetime: 'bạn chọn lifetime khi đăng ký; ví dụ dùng Singleton'. Thống nhất prefix `Permission:` với 10.7.

### Module 11 - SignalR

- **critical** · chính xác · [11.9-presence-online-offline-status.md:65](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.9-presence-online-offline-status.md): Set `presence:user:{userId}` được đặt TTL 90 giây, nhưng HeartbeatAsync chỉ gia hạn khoá kết nối. Sau 90 giây Set biến mất dù kết nối vẫn sống, nên IsOnlineAsync trả false cho người đang online. Code mẫu chính của bài cho kết quả sai. Ngoài ra RedisPresenceTracker không cài GetOnlineAsync nên không biên dịch được, và chữ ký ConnectAsync có CancellationToken không khớp với lời gọi ở 11.2/11.5.

  ```text
  await db.SetAddAsync(UserSet(userId), connectionId);
          await db.KeyExpireAsync(UserSet(userId), Ttl);
  ...
      public Task HeartbeatAsync(...) => redis.GetDatabase().KeyExpireAsync(ConnKey(userId, connectionId), Ttl);
  ```

  - Sửa: Trong HeartbeatAsync, gia hạn cả `UserSet(userId)`, hoặc dùng sorted set `presence:user:{id}` với score là thời điểm hết hạn (ZADD/ZREMRANGEBYSCORE). Cài đủ GetOnlineAsync và thống nhất chữ ký interface với mọi chỗ gọi. Lời giải bài 1 dùng TTL 24h, cần thống nhất với phần thân bài.
- **major** · chính xác · [11.10-scale-out-and-production.md:136](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.10-scale-out-and-production.md): Bài khẳng định với Azure SignalR Service, client 'không hề biết bạn vừa deploy'. Thực tế mỗi client connection gắn với một server connection; khi app server dừng, các client gắn với nó bị ngắt, trừ khi cấu hình graceful shutdown/migration của SDK. 11.11 dòng 167 và 11.12 dòng 150 lặp lại khẳng định này.
  - Bằng chứng: `Với Azure SignalR, client **không hề biết** bạn vừa deploy.`
  - Sửa: Sửa thành: 'Azure SignalR giảm đáng kể tác động deploy (kết nối WebSocket giữ ở dịch vụ, có cơ chế graceful shutdown/migrate client) nhưng vẫn cần cấu hình GracefulShutdown và client vẫn có thể phải kết nối lại.' Thêm link tài liệu Azure SignalR graceful shutdown.
- **major** · chính xác · [11.10-scale-out-and-production.md:178](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.10-scale-out-and-production.md): Bài nói HostOptions.ShutdownTimeout mặc định 5 giây. Từ .NET 6 giá trị mặc định là 30 giây. Ngoài ra GracefulShutdownService dùng `.GetAwaiter().GetResult()` và `Thread.Sleep` trong callback ApplicationStopping, là sync-over-async mà khoá học phê phán ở module 6, nhưng không có cảnh báo.
  - Bằng chứng: `Mặc định chỉ **5 giây** — quá ngắn để client kịp nhận thông báo`
  - Sửa: Sửa thành 'mặc định 30 giây (.NET 6+)'. Viết lại bằng IHostedLifecycleService.StoppingAsync hoặc StopAsync async với `await hub.Clients.All.ServerShuttingDown(); await Task.Delay(2000, ct);`.
- **major** · cấu trúc · [11.13-quick-real-world-example.md:3](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.13-quick-real-world-example.md): Bài 11.13 gần như lặp lại toàn bộ 11.5 (token qua query string, che log nginx, Authorize theo method, token hết hạn). 11.11 lặp 11.3 (HubFilter, cấu hình, MessagePack) và 11.10 (Azure SignalR). 11.12 lặp 11.10 (backplane, nginx, Azure). Sinh viên phải đọc khoảng 3.000 dòng với nhiều phần trùng, trong khi kiến thức nền (cài đặt, client đầu tiên) lại thiếu.
  - Bằng chứng: `Một hạn chế kỹ thuật dẫn tới một lỗ hổng bảo mật: **WebSocket API của trình duyệt không cho gửi header tuỳ chỉnh** ... (giống tóm tắt 11.5)`
  - Sửa: Gộp 11.13 vào 11.5, hoặc đổi 11.13 thành bài thực hành end-to-end 'Thông báo khi assign Lead' dùng code Project 2. Rút 11.11/11.12 thành phần 'đọc thêm' ngắn và chỉ giữ ý mới (SSE, streaming, case study 3 instance).
- **major** · cấu trúc · [11.14-review-and-assessment.md:153](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.14-review-and-assessment.md): Bài đánh giá cuối module gần như là boilerplate: mục tiêu chung chung, mục '11.15.4 — Kiểm tra & Thực hành' trống, 'Bối cảnh giáo trình' lặp ở mọi bài, 'Bài tập tổng hợp/Tự kiểm tra/Kết luận' sáo rỗng. Quiz có phương án đùa (UDP, FTP, SMTP, Telnet, DNS, ICMP) nên không đánh giá được gì. Bảng tóm tắt còn sai so với nội dung module: 'Groups: leave khi disconnect' (tự dọn), 'Scale-out: cần sticky session' (Azure SignalR/skipNegotiation thì không), 'Presence: track OnConnected/OnDisconnected' (thiếu TTL). Ba bài thực hành không có lời giải.

  ```text
  1. SignalR transport fallback thứ tự ưu tiên điển hình (hiện đại)?  
     A. WebSocket → SSE → long polling B. Chỉ UDP C. FTP D. SMTP
  ```

  - Sửa: Viết lại 5-8 câu quiz dạng tình huống (ví dụ: 'Sau reconnect client không nhận tin nhóm — nguyên nhân?', 'Tiêm DbContext vào Hub có an toàn?'), với phương án nhiễu hợp lý và giải thích. Sửa bảng tóm tắt. Thêm lời giải hoặc tiêu chí cho bài 1-3. Xoá các mục boilerplate và mục trống.
- **major** (ban đầu critical) · chính xác · [11.2-signalr-architecture.md:83](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.2-signalr-architecture.md): Bài khẳng định Hub resolve từ scope của kết nối và scope sống suốt kết nối, nên tiêm DbContext là captive dependency. Điều này sai. Theo learn.microsoft.com, SignalR tạo một DI scope mới cho mỗi lần gọi hub method và dispose DbContext ngay khi lời gọi kết thúc. Lỗi này lan sang mẫu IServiceScopeFactory ở 11.3, 11.5, 11.6, checklist dòng 199 và tự kiểm tra dòng 508.
  - Bằng chứng: `Hub được resolve từ **scope của kết nối**, nên tiêm 'DbContext' vào constructor Hub **chạy được** — nhưng scope đó sống suốt thời gian kết nối, có thể hàng giờ. Đó là một captive dependency trá hình`
  - Sửa: Viết lại đoạn này: 'Mỗi lời gọi hub có scope DI riêng nên tiêm DbContext (hoặc tiêm vào tham số method) là an toàn; chỉ cần tránh chạy song song nhiều thao tác trên cùng context. Khi cần nhiều thao tác song song thì dùng IDbContextFactory.' Bỏ mẫu `scopeFactory.CreateAsyncScope()` trong 11.2, 11.3 dòng 79, 11.5 dòng 123 và 11.6 dòng 78. Sửa checklist và câu tự kiểm tra tương ứng.
  - Phản biện (adjusted): Lỗi có thật. SignalR (DefaultHubDispatcher) tạo một DI scope riêng cho mỗi lần gọi hub method và cho cả OnConnected/OnDisconnected, và mỗi lời gọi dùng một instance Hub mới. Câu 'scope sống suốt kết nối, captive dependency' ở 11.2 dòng 83 là sai. Mình hạ xuống major vì mẫu IServiceScopeFactory vẫn chạy đúng, chỉ thừa và dạy sai khái niệm. Khi sửa 11.3, 11.5 và 11.6 cần xem từng chỗ: chỉ bỏ CreateAsyncScope ở những đoạn nằm trong hub method. Chỗ nào chạy trong Task nền hoặc ngoài lời gọi hub thì vẫn cần scope riêng.
- **major** · chính xác · [11.2-signalr-architecture.md:426](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.2-signalr-architecture.md): Bài nhập nhằng giữa ClientTimeoutInterval của server (server chờ client) và serverTimeoutInMilliseconds của client (client chờ server). Bài tập đặt KeepAliveInterval = ClientTimeoutInterval = 30 giây rồi giải thích 'client hết kiên nhẫn sau 30 giây'. Thực ra cặp gây đứt kết nối là KeepAliveInterval của server so với serverTimeout của client. Comment dòng 178 '&gt; 2x KeepAlive' cũng không khớp với giá trị bằng đúng 2x.
  - Bằng chứng: `Server gửi ping đúng mỗi 30 giây, client hết kiên nhẫn đúng sau 30 giây.`
  - Sửa: Thêm bảng hai cặp: (1) server KeepAliveInterval với client serverTimeoutInMilliseconds (≥2x); (2) client keepAliveIntervalInMilliseconds với server ClientTimeoutInterval (≥2x). Sửa bài tập: giữ server KeepAliveInterval=30s, client withServerTimeout(30000) để tái hiện lỗi.
- **major** · đầy đủ · [11.3-setup-signalr-server.md:17](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.3-setup-signalr-server.md): Module không có hướng dẫn dựng môi trường hay ví dụ tối thiểu chạy được: không có dotnet new, không có Program.cs hoàn chỉnh, không có lệnh `npm i @microsoft/signalr`, không định nghĩa NotificationDto/LeadUpdateDto/NotificationType. Nhiều đoạn code dùng field chưa khai báo (`_logger`, `_scopeFactory`, `_repo`, `RateLimitHubFilter`, `_exporter`). ExportWorker nhận nhầm `EmailQueue`. Sinh viên chưa từng viết SignalR sẽ không chạy được gì.

  ```text
  public sealed class NotificationHub : Hub<INotificationClient>
  {
      public Task Ping() => Clients.Caller.ReceiveNotification(
          new NotificationDto(Guid.NewGuid(), "pong", NotificationType.Info, DateTime.UtcNow));
  ```

  - Sửa: Mở đầu 11.3 bằng mục 'Dựng nhanh' gồm: `dotnet new webapi -n Crm.Api -f net10.0`, Program.cs đầy đủ (AddSignalR, MapHub), các record DTO, file wwwroot/index.html dùng script signalr có ghim phiên bản và lệnh `dotnet run`. Rà mọi snippet để khai báo đủ dependency qua primary constructor; cài RateLimitHubFilter hoặc bỏ nó.
- **major** · chính xác · [11.3-setup-signalr-server.md:388](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.3-setup-signalr-server.md): Bài nhiều lần nói EnableDetailedErrors gửi stack trace cho client (tóm tắt 11.3, 11.2 dòng 189, 11.11 dòng 110) và minh hoạ bằng output có 'at Crm.Api.Hubs... line 42'. Thực tế SignalR chỉ gửi `TênException: Message`, không gửi stack trace. Rủi ro thật là lộ nội dung exception message.

  ```text
  InvalidOperationException: Phòng khong-ton-tai không tồn tại trong bảng
  dbo.ChatRooms trên máy chủ sql-prod-02
     at Crm.Api.Hubs.NotificationHub.JoinRoom(String room) in
        /src/Crm.Api/Hubs/NotificationHub.cs:line 42
  ```

  - Sửa: Xoá hai dòng stack trace khỏi output mẫu. Sửa câu chữ ở 11.2, 11.3 và 11.11 thành 'gửi nguyên văn kiểu và message của exception — có thể chứa tên bảng, tên máy chủ'.
- **major** · chính xác · [11.4-client-side-integration.md:79](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.4-client-side-integration.md): Bài khẳng định tuyệt đối 'SignalR không có hàng đợi, không xác nhận, không gửi lại' và 'kết nối lại là mất nhóm'. Từ .NET 8 đã có Stateful Reconnect (`withStatefulReconnect()` phía client, `AllowStatefulReconnects` phía server): nó đệm tin và giữ nguyên ConnectionId và nhóm khi mất kết nối ngắn. Học viên sẽ không biết tới tính năng hiện hành này.
  - Bằng chứng: `**Tin nhắn trong lúc mất kết nối bị mất hoàn toàn.** SignalR không có hàng đợi, không có xác nhận, không gửi lại.`
  - Sửa: Thêm một mục 'Stateful Reconnect (.NET 8+)' gồm cấu hình hai phía, giới hạn bộ đệm (StatefulReconnectBufferSize) và việc nó chỉ áp cho WebSocket khi đứt ngắn. Nhấn mạnh rằng vẫn cần đồng bộ REST khi đứt lâu, server restart hoặc đổi instance.
- **major** · chính xác · [11.5-signalr-authentication.md:142](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.5-signalr-authentication.md): Bài nói SignalR chỉ kiểm tra token một lần và 'không có điểm nào để framework chen vào kiểm lại'. Bài bỏ qua tuỳ chọn có sẵn từ .NET 7 là `HttpConnectionDispatcherOptions.CloseOnAuthenticationExpiration`, vốn tự đóng kết nối khi token hết hạn. Thay vào đó bài tự viết `CloseAfterAsync` (không định nghĩa) và cấu hình ClientTimeoutInterval vốn không liên quan. 11.13 dòng 182 cũng có lỗi tương tự.

  ```text
  > **SignalR kiểm tra token một lần, lúc thiết lập kết nối. Sau đó không kiểm tra lại.**
  ...
  Không có chỗ nào để đính kèm token mới, và cũng không có điểm nào trong vòng đời kết nối để framework chen vào kiểm lại.
  ```

  - Sửa: Giữ ý 'mặc định token chỉ kiểm lúc kết nối'. Thêm cách 1 chuẩn: `app.MapHub<NotificationHub>("/hubs/notifications", o => o.CloseOnAuthenticationExpiration = true);` kết hợp với withAutomaticReconnect và accessTokenFactory làm mới token. Xoá đoạn OnConnectedAsync đọc claim exp ở dòng 486-505.
- **major** · nhất quán · [11.6-groups-and-targeting.md:109](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.6-groups-and-targeting.md): Tên nhóm và helper không thống nhất giữa các bài, và ngay trong một bài: `tenant-{id}` (11.2, 11.5, 11.13), `tenant:{id}` (11.4, 11.5 bài 2, 11.6), `t:{tenantId}` (GroupNames), lớp HubGroups với chữ ký string/Guid khác, `user-{userId}` (11.2) trong khi 11.6 khuyên không tạo nhóm một người. Đây chính là lỗi 'lệch một ký tự' mà bài 2 của 11.6 cảnh báo.

  ```text
  public static string Tenant(Guid tenantId) => $"t:{tenantId}";
  ...
  public static class HubGroups
  {
      public static string Tenant(string tenantId) => $"tenant:{tenantId}";
  ```

  - Sửa: Chọn một lớp `GroupNames` duy nhất với định dạng `tenant:{id}`, `tenant:{id}:deal:{dealId}`. Dùng nó trong mọi bài (11.2, 11.4, 11.5, 11.6, 11.7, 11.9, 11.13). Bỏ nhóm `user-{userId}` ở 11.2 dòng 143.
- **major** · nhất quán · [11.8-notification-center-pattern.md:20](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.8-notification-center-pattern.md): Entity Notification có nhiều phiên bản mâu thuẫn. 11.8 dùng Message/CreatedAt/ReadAt và UserId kiểu string. Bài tập 11.8 dùng Text/CreatedUtc/UpdatedUtc và UserId kiểu Guid. 11.4 dùng Text/CreatedUtc/IsRead. 11.14 yêu cầu cả IsRead lẫn ReadAt. Project 2 dùng IsRead. Endpoint cũng lệch: POST vs PUT `/read`, `/api/notifications` vs `/api/v1/notifications`.
  - Bằng chứng: `public required string Message { get; init; } ... public DateTime? ReadAt { get; set; }  /  (bài tập) existing.Text = text; existing.UpdatedUtc = DateTime.UtcNow;`
  - Sửa: Định nghĩa một Notification chuẩn (Id, UserId Guid, Type, Message, EntityType, EntityId, CreatedAt, ReadAt, GroupKey, Count) dùng chung cho 11.4, 11.7, 11.8, 11.14 và Project 2. Thống nhất route `POST /api/v1/notifications/{id}/read`.
- **major** · thực tế · [11.9-presence-online-offline-status.md:499](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.9-presence-online-offline-status.md): Lời giải dùng `_ = Task.Run` bên trong Hub để hoãn sự kiện offline và gửi `Clients.All`. Chính 11.2 dòng 310 gọi Task.Run trong Hub là 'mẫu xấu', và 11.6/11.9 khuyên không dùng Clients.All. Dòng 433-439 còn gọi SADD+SCARD là 'nguyên tử' dù đó vẫn là hai lệnh riêng nên vẫn có race.

  ```text
  _ = Task.Run(async () =>
          {
              await Task.Delay(TimeSpan.FromSeconds(10));
              ...
                  await _hub.Clients.All.UserPresenceChanged(userId, false);
  ```

  - Sửa: Đưa việc 'kiểm tra lại sau 10 giây' vào một Channel hoặc BackgroundService (đọc yêu cầu kèm thời điểm hạn). Gửi tới `Clients.Group(GroupNames.Tenant(...))`. Với tính nguyên tử, dùng Lua script hoặc giao dịch MULTI và bỏ chữ 'nguyên tử' ở dòng 433.
- **minor** · nhất quán · [11.1-why-real-time-matters.md:16](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.1-why-real-time-matters.md): Đánh số mục lệch một số so với số bài trong toàn module 11 và module 12 (bài 11.1 có mục 11.2.x, bài 11.14 có 11.15.x, bài 12.1 có 12.2.x…). Nhãn link 'bài N' cũng lệch một số so với file đích: 'bài 11.11'→11.10, 'bài 9.2'→9.1, 'bài 6.9'→6.8, 'bài 12.7'→12.6, 'bài 12.5'→12.4… Có link trỏ sai chủ đề: 12.1 dòng 213 'global query filter (bài 10.7)' trỏ tới 10.6 resource-based authorization.
  - Bằng chứng: `### 11.2.1 — Chi phí của polling  /  Giải quyết bằng Redis backplane hoặc Azure SignalR Service ([bài 11.11](11.10-scale-out-and-production.md))`
  - Sửa: Chạy script đánh lại số mục theo số bài (11.1.x, 12.1.x…). Sinh lại nhãn link từ tên file đích ('bài 11.10'). Sửa link 12.1 dòng 213 sang ../module-13-entity-framework-core/13.10-global-query-filters.md.
- **minor** · nhất quán · [11.11-advanced-notes.md:45](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.11-advanced-notes.md): Bài nói SSE 'không cần backplane', nhưng chính bài tập 1 cùng bài và 11.1 chỉ ra SSE nhiều instance phải tự viết khoảng 120 dòng pub/sub. 11.11 cũng khuyên 'không bật MessagePack mặc định', mâu thuẫn với 11.3 dòng 226 ('bật MessagePack ở production').
  - Bằng chứng: `| Cần backplane khi scale | **Có** | Không (nếu chỉ đọc từ nguồn chung) |`
  - Sửa: Sửa ô bảng thành 'Cần tự dựng pub/sub khi nhiều instance'. Thống nhất khuyến nghị MessagePack: chỉ bật khi đo được, và dùng cùng protocol ở dev và prod để tránh lỗi khác môi trường.
- **minor** · chính xác · [11.13-quick-real-world-example.md:171](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.13-quick-real-world-example.md): Bài nói token dùng claim `sub` thì Clients.User 'không tìm thấy ai', nhưng dòng 462 cùng bài giải thích handler JWT mặc định (MapInboundClaims=true) ánh xạ sub sang NameIdentifier. Hai đoạn mâu thuẫn. Dòng 289 cũng sai khi nói Serilog request logging ghi query string mặc định (nó chỉ log Request.Path).
  - Bằng chứng: `Nếu token của bạn dùng claim khác — 'sub' theo chuẩn JWT chẳng hạn — 'Clients.User' sẽ **không tìm thấy ai**`
  - Sửa: Sửa dòng 171 và câu tự kiểm tra dòng 581 thành: 'chỉ xảy ra khi MapInboundClaims = false hoặc token không có sub/nameid'. Sửa dòng 289: Serilog mặc định ghi RequestPath không kèm query; rủi ro nằm ở proxy, APM và HttpLogging có RequestQuery.
- **minor** · chính xác · [11.3-setup-signalr-server.md:531](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.3-setup-signalr-server.md): Bài nói việc đẩy vào hàng đợi 'sống sót qua restart' và 'có retry', nhưng hàng đợi trong khoá (Channel/EmailQueue) nằm trong bộ nhớ, nên mất khi restart.
  - Bằng chứng: `2. **Việc sống sót qua restart** — nó nằm trong hàng đợi, không nằm trong một 'Task' trong bộ nhớ.`
  - Sửa: Ghi rõ: chỉ đúng khi dùng hàng đợi bền (bảng job, Hangfire, message broker). Với Channel trong bộ nhớ thì việc vẫn mất khi restart.
- **minor** · nhất quán · [11.5-signalr-authentication.md:199](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.5-signalr-authentication.md): Bài gọi cách 3 (gửi ForceDisconnect cho client) là 'chắc chắn nhất' và 'bắt buộc' cho hệ thống bảo mật cao, nhưng dòng 538 thừa nhận cách này cần client hợp tác và kẻ sửa client vẫn lách được. ForceDisconnect cũng không có trong INotificationClient.
  - Bằng chứng: `Với hệ thống có yêu cầu bảo mật cao, cách 3 là bắt buộc.`
  - Sửa: Nêu rõ cách chắc chắn ở phía server: lưu HubCallerContext theo ConnectionId trong một registry singleton rồi gọi `Abort()`, hoặc dùng CloseOnAuthenticationExpiration với token ngắn. Thêm ForceDisconnect vào interface nếu giữ ví dụ.
- **minor** (ban đầu major) · nhất quán · [11.6-groups-and-targeting.md:269](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.6-groups-and-targeting.md): Các bài mâu thuẫn và sai về OnDisconnectedAsync. 11.6, 11.9 dòng 292 và 11.2 dòng 367 nói nó 'không chạy khi mạng đứt đột ngột'. Thực tế nó vẫn chạy sau ClientTimeoutInterval (khoảng 30 giây); chỉ khi tiến trình server chết thì nó mới không chạy. Chính 11.2 dòng 167 và 11.4 dòng 236 lại nói đúng điều này.
  - Bằng chứng: `Nó **không chạy** khi mạng đứt đột ngột — chỉ chạy khi client đóng kết nối tử tế hoặc khi server phát hiện timeout.`
  - Sửa: Thống nhất một câu ở mọi bài: 'OnDisconnectedAsync chạy khi client đóng chủ động (ngay lập tức) hoặc khi server phát hiện timeout (sau ClientTimeoutInterval); nó không chạy nếu tiến trình server bị kill — vì vậy cần TTL.' Sửa 11.2 dòng 367, 11.6 dòng 269 và 11.9 dòng 292.
  - Phản biện (adjusted): Lỗi có thật nhưng nhẹ hơn mô tả. 11.6 dòng 269 tự nói tiếp 'hoặc khi server phát hiện timeout'. 11.9 dòng 292 nói bản ghi nằm lại 'cho tới khi timeout phát hiện'. Hai chỗ này đúng ý, chỉ có câu mở đầu 'không chạy khi mạng đứt' gây hiểu nhầm. Riêng 11.2 dòng 367 ('bản ghi nằm lại mãi') là sai hẳn, và 11.9 dòng 443 cũng nói 'không phải lúc nào cũng chạy'. Nên thống nhất một câu như đề xuất: nó chạy muộn sau ClientTimeoutInterval, và chỉ không chạy khi tiến trình server chết.
- **minor** · chính xác · [11.8-notification-center-pattern.md:402](../lessons/stage-03-aspnet-core-backend/module-11-signalr/11.8-notification-center-pattern.md): Ví dụ bộ đếm âm tính sai. Mỗi thiết bị có bộ đếm riêng bắt đầu từ 3; mỗi bên chỉ giảm 2 lần nên kết quả là 1, không thể ra -1. Ngoài ra với UPDATE có `ReadAt == null` thì request thứ hai ảnh hưởng 0 dòng, nên server chỉ phát một sự kiện.

  ```text
  Thực tế chỉ có 1 thông báo được đọc, nhưng bộ đếm giảm 4 lần
  -> unreadCount = -1
  ```

  - Sửa: Đổi kịch bản: bộ đếm ban đầu là 1, thiết bị A tự giảm và đồng thời nhận sự kiện NotificationRead nên giảm hai lần thành -1. Hoặc ghi rõ cả hai thiết bị đọc cùng một thông báo X và đếm theo từng thiết bị.

### Project 2 — CRM Backend API

- **major** · cấu trúc · [project-02-crm-backend-api.md:7](../lessons/stage-03-aspnet-core-backend/project-02-crm-backend-api.md): Dự án có nhiều mục boilerplate rỗng: 'Phương pháp học tập', 'Câu hỏi khởi động' chung chung. Phần cuối 'Mở rộng và đào sâu', 'Mini case study' ('Chọn một use case nhỏ…'), 'Ví dụ thực tế nhanh' và 'Checklist' chỉ là placeholder. Thiếu hướng dẫn khởi tạo dự án, mốc tiến độ, starter code và lời giải tham khảo; sinh viên năm 1-3 khó tự hoàn thành 25 endpoint cùng test.

  ```text
  ## Mini case study
  
  ### Tình huống
  
  Chọn một use case nhỏ trong CRM/ERP liên quan trực tiếp đến bài học này, mô tả rõ đầu vào, đầu ra và tiêu chí thành công.
  ```

  - Sửa: Xoá các mục placeholder. Thêm (1) 'Khởi tạo dự án' (dotnet new webapi -f net10.0, package có phiên bản, SQLite, user-secrets); (2) 4 mốc kèm tiêu chí hoàn thành; (3) link repo starter hoặc solution; (4) một mini case thật, ví dụ assign Lead khi SalesRep offline (lưu DB, push, đồng bộ REST).
- **major** · nhất quán · [project-02-crm-backend-api.md:30](../lessons/stage-03-aspnet-core-backend/project-02-crm-backend-api.md): Bảng mapping module sai so với cấu trúc khoá: Module 9 là Web API Professional (không phải JWT/Identity), JWT và Authorization nằm ở Module 10. Dòng 441 nói 'tổng hợp JWT từ Module 9'. Dự án còn dùng EF Core (HasQueryFilter, override SaveChangesAsync, ExecuteUpdate) trong khi EF Core chỉ được dạy ở Module 13, sau Project 2.

  ```text
  | Module 9 | JWT Auth, Identity | Login/Register, refresh token, role-based access (`Admin`, `SalesRep`) |
  | Module 10 | Authorization nâng cao | ...
  ```

  - Sửa: Sửa mapping: M8 nền tảng ASP.NET Core (pipeline, middleware, validation, exception handling), M9 Web API chuyên nghiệp (REST, pagination, versioning, testing), M10 JWT và authorization, M11 SignalR. Thêm mục 'EF Core tối thiểu cho P2' (AddDbContext, DbSet, migrations SQLite, query filter) hoặc liệt kê rõ bài 13.x cần đọc trước.
- **major** · thực tế · [project-02-crm-backend-api.md:486](../lessons/stage-03-aspnet-core-backend/project-02-crm-backend-api.md): Bài hướng dẫn ném InvalidOperationException và để middleware map thành 422. Đây là anti-pattern: EF Core và BCL cũng ném InvalidOperationException (ví dụ lỗi cấu hình, Single() nhiều phần tử), nên lỗi hệ thống sẽ bị trả về như lỗi nghiệp vụ 422. Mục 'ProblemDetails' cũng tự mâu thuẫn: nói validation trả 400 nhưng lại cấu hình InvalidModelStateResponseFactory trả 422.
  - Bằng chứng: `nếu không ném 'InvalidOperationException' (sẽ được bắt bởi middleware và format thành ProblemDetails 422)`
  - Sửa: Tạo `InvalidLeadTransitionException : DomainException` và map riêng sang 422 trong IExceptionHandler. Giữ validation DTO là 400 (bỏ đoạn InvalidModelStateResponseFactory hoặc giải thích lựa chọn). Đổi type thành RFC 9457.
- **major** · thực tế · [project-02-crm-backend-api.md:601](../lessons/stage-03-aspnet-core-backend/project-02-crm-backend-api.md): Bài yêu cầu integration test với 'in-memory database' và dùng 'In-memory / SQLite' làm database của P2. Microsoft khuyến cáo không dùng EF Core InMemory provider cho test: nó không có quan hệ, transaction, ràng buộc hay ExecuteUpdate, nên test xanh nhưng production lỗi. Secret JWT trong appsettings.json cũng không có cảnh báo.
  - Bằng chứng: `Dùng 'WebApplicationFactory<Program>' + in-memory database:`
  - Sửa: Đổi sang SQLite in-memory (giữ kết nối mở) hoặc Testcontainers SQL Server. Ghi chú: 'Không dùng UseInMemoryDatabase'. Thêm cảnh báo dùng `dotnet user-secrets` hoặc biến môi trường cho JwtSettings:SecretKey.
- **minor** · nhất quán · [project-02-crm-backend-api.md:496](../lessons/stage-03-aspnet-core-backend/project-02-crm-backend-api.md): Project dùng `IHubContext<NotificationHub>` với SendAsync chuỗi, trái với nguyên tắc 'luôn dùng hai generic' của 11.3/11.7. Domain P2 (Lead.Title, AssignedToId, Guid, IsDeleted, LeadStatus.Converted) cũng không khớp với Module 11 (lead.Name, Lead.Create(req.Name, req.Value), tenant_id) và Module 12 (CompanyName, AssignedToUserId INT, DeletedAt, 'Won').

  ```text
  await _hubContext.Clients
         .User(userId.ToString())
         .SendAsync("ReceiveNotification", notificationDto);
  ```

  - Sửa: Dùng `IHubContext<NotificationHub, INotificationClient>` qua INotificationPublisher như 11.7. Đưa ra một ERD chuẩn của CRM dùng chung cho P2, Module 11 và Module 12. Nếu Module 12 cố ý chuyển sang INT/DeletedAt thì ghi rõ đó là bước refactor ở P3.

### Module 12 - SQL Deep Dive

- **major** (ban đầu critical) · chính xác · [12.1-crm-database-design.md:386](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.1-crm-database-design.md): Bài nói UUIDv7 (Guid.CreateVersion7) 'vẫn tăng dần nên không phân mảnh' và là 'lựa chọn tốt nhất' trên SQL Server. Điều này sai: SQL Server so sánh uniqueidentifier theo nhóm byte 10-15 trước, còn timestamp của UUIDv7 nằm ở đầu, nên giá trị chèn vẫn ngẫu nhiên theo thứ tự index. Cách này chỉ đúng với PostgreSQL. Cùng lỗi xuất hiện ở bảng dòng 136, ở 11.8 dòng 49 và 367, và ở 11.4 dòng 384 (WHERE Id &gt; @after ORDER BY Id không cho thứ tự thời gian trên SQL Server).
  - Bằng chứng: `**Cách 2 thường là lựa chọn tốt nhất hiện nay:** ứng dụng tự sinh id ..., mà vẫn tăng dần nên không phân mảnh.`
  - Sửa: Ghi rõ: 'Trên SQL Server dùng NEWSEQUENTIALID() hoặc để EF Core tự sinh (SequentialGuidValueGenerator, mặc định cho khoá Guid). UUIDv7 chỉ tuần tự trên PostgreSQL/uuid.' Ở 11.4/11.8, đổi cursor đồng bộ sang (CreatedAt, Id) thay vì `Id > @after`.
  - Phản biện (adjusted): Lỗi có thật. SQL Server so sánh uniqueidentifier theo nhóm byte cuối (10-15) trước, còn timestamp của Guid.CreateVersion7 nằm ở các byte đầu. Vì vậy UUIDv7 không tuần tự theo thứ tự index của SQL Server, và câu 'tăng dần nên không phân mảnh' ở 12.1 (dòng 372-386, bảng dòng 136) là sai. Với SQL Server nên dùng NEWSEQUENTIALID() hoặc SequentialGuidValueGenerator, mặc định của EF Core cho khoá Guid. 11.4 dòng 384 ('WHERE Id &gt; @after ORDER BY Id cho đúng thứ tự') cũng sai trên SQL Server. Mình hạ xuống major vì lỗi này gây phân mảnh và sai thứ tự cursor chứ không làm hỏng dữ liệu.
- **major** · chính xác · [12.1-crm-database-design.md:485](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.1-crm-database-design.md): Mẹo thay filtered index 'cho MySQL' không đúng với MySQL: index UNIQUE của MySQL coi các NULL là khác nhau, nên (Email, NULL) cho phép nhiều dòng đang hoạt động trùng email. Cú pháp cột tính toán cũng là T-SQL.

  ```text
  DeletedFlag AS (CASE WHEN DeletedAt IS NULL THEN NULL ELSE Id END) PERSISTED,
  UNIQUE (Email, DeletedFlag)
  ```

  - Sửa: Đảo giá trị: dòng đang hoạt động nhận một hằng số (0), dòng đã xoá nhận Id: `ActiveKey INT AS (IF(DeletedAt IS NULL, 0, Id)) STORED, UNIQUE(Email, ActiveKey)` theo cú pháp MySQL. Hoặc bỏ đoạn này vì khoá học dùng SQL Server/PostgreSQL.
- **major** (ban đầu critical) · chính xác · [12.10-mini-case-study.md:121](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.10-mini-case-study.md): Bản sửa deadlock dựa trên giả định rằng đọc các dòng theo thứ tự id là 'lấy khoá theo thứ tự'. Dưới READ COMMITTED (và RCSI mà 12.6 khuyên bật), SELECT không giữ khoá đến cuối transaction, nên thứ tự đọc không quyết định thứ tự khoá. Khoá X chỉ được lấy lúc SaveChanges phát UPDATE, mà EF Core đã tự sắp xếp các lệnh theo khoá. Vì vậy 'bản có lỗi' ở bài 3 (đọc cả hai rồi SaveChanges một lần) khó có thể ra 94/100 deadlock như bài viết, và 'bản sửa' không làm điều bài nói. 12.6 dòng 364-389 lặp lại cùng lỗi.

  ```text
  // Nạp CẢ HAI tài khoản theo thứ tự ID tăng dần — NHẤT QUÁN mọi lần
  ...
          .OrderBy(a => a.Id)                    // thứ tự khoá XÁC ĐỊNH
  ```

  - Sửa: Giải thích lại: khoá ghi được lấy khi UPDATE chạy. Muốn khoá theo thứ tự có hai cách. (a) Đọc bằng `FromSql($"SELECT * FROM Accounts WITH (UPDLOCK, ROWLOCK) WHERE Id IN (...) ORDER BY Id")`. (b) Chạy hai `ExecuteUpdateAsync` theo id tăng dần. Bản 'lỗi' nên là bản gọi SaveChanges hai lần như dòng 28-41. Cập nhật bảng số liệu cho khớp và sửa luôn 12.6.
  - Phản biện (adjusted): Lỗi giải thích có thật. Dưới READ COMMITTED/RCSI, SELECT không giữ khoá S đến cuối transaction, nên thứ tự đọc (OrderBy, hoặc foreach theo id ở dòng 466-470) không quyết định thứ tự khoá. Khoá X chỉ được lấy khi SaveChanges phát UPDATE, và EF Core sắp xếp các ModificationCommand theo bảng và khoá. Vì vậy 'bản lỗi' của bài 3 (dòng 441-453, đọc cả hai rồi SaveChanges một lần) gần như không thể ra 94/100 deadlock. Con số này rất có thể là bịa và cần bỏ. Mình hạ xuống major vì code 'bản sửa' thực tế không deadlock: nó chạy đúng, chỉ là vì lý do khác với bài giải thích. Bản thật sự gây deadlock là bản gọi SaveChanges hai lần ở dòng 28-41. Cách sửa đề xuất (UPDLOCK theo thứ tự id, hoặc ExecuteUpdate theo id tăng dần) là hợp lý. 12.6 dòng 364-389 cũng phải sửa theo.
- **major** · chính xác · [12.10-mini-case-study.md:520](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.10-mini-case-study.md): Hàm WithDeadlockRetryAsync bắt `SqlException` với Number 1205. Khi deadlock xảy ra trong SaveChangesAsync, EF Core bọc lỗi thành DbUpdateException (inner là SqlException). Nếu đã bật EnableRetryOnFailure thì lỗi thành RetryLimitExceededException. Bộ lọc này không bắt được deadlock từ EF.
  - Bằng chứng: `catch (SqlException ex) when (ex.Number == 1205 && attempt < MaxAttempts)`
  - Sửa: Đổi thành `catch (Exception ex) when (ex.GetBaseException() is SqlException { Number: 1205 } && attempt < MaxAttempts)`. Đồng thời khuyên chọn một trong hai cơ chế, execution strategy của EF hoặc retry tự viết, không dùng cả hai.
- **major** (ban đầu critical) · đầy đủ · [12.12-review-and-assessment.md:22](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.12-review-and-assessment.md): Bài 1 yêu cầu 'chạy tất cả CREATE TABLE từ phần 1', nhưng 12.1 chỉ có CREATE TABLE cho Users và Customers. Không có bảng Leads (LeadId, CompanyName, EstimatedValue, ConvertedAt, ConvertedToCustomerId, CreatedAt, Status), Contacts (IsPrimary) hay Notifications (IsRead) mà các index và query của bài 1-3 cần. Không có script sinh 20 lead hay 500.000 dòng. Bài không làm được như đã viết.

  ```text
  -- (chạy tất cả CREATE TABLE từ phần 1)
  ...
  CREATE NONCLUSTERED INDEX IX_Contacts_CustomerId
      ON Contacts (CustomerId, IsPrimary);
  ```

  - Sửa: Bổ sung vào 12.1 (hoặc file crm-schema.sql đính kèm) đầy đủ CREATE TABLE Leads, Contacts và Notifications với FK SET NULL/CASCADE như yêu cầu kiểm tra, cùng script sinh dữ liệu mẫu có tham số số dòng. Thêm kết quả mong đợi cho 5 query của bài 2.
  - Phản biện (adjusted): Lỗi có thật. 12.1 chỉ có CREATE TABLE đầy đủ cho Users và Customers. Các bảng Leads trong 12.1 đều là ví dụ minh hoạ khác cấu trúc (LeadsInt, Leads có PublicId, Leads temporal), và không có Contacts hay Notifications. Bài 1 của 12.12 không chạy được như đã viết, cũng không có script sinh dữ liệu. Mình hạ xuống major vì đây là bài tập đánh giá: học viên vẫn tự suy ra được schema, nội dung không dạy sai.
- **major** · cấu trúc · [12.12-review-and-assessment.md:314](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.12-review-and-assessment.md): Bài đánh giá có boilerplate (mục tiêu chung chung, mục 12.13.4 trống, 'Bối cảnh giáo trình' lặp, 'Bài tập tổng hợp/Tự kiểm tra/Kết luận' sáo rỗng). Quiz có phương án đùa (Inheritance, UTF-8, JWT size). Bảng tóm tắt mâu thuẫn với bài học: 'CTE &gt; nested subquery' trái với 12.3 ('CTE không nhanh hơn subquery'); 'dùng INT IDENTITY cho PK' trái với Project 2 (Guid). Query 2-3 dùng FORMAT() rất chậm trong một module dạy tối ưu.

  ```text
  3. N+1 query problem xuất hiện khi?  
     A. Một query trả quá nhiều cột B. Vòng lặp gọi query con cho từng dòng C. Dùng transaction D. Dùng UTF-8
  ```

  - Sửa: Viết lại quiz dạng tình huống (đọc plan, chọn index, NOT IN với NULL, deadlock) có giải thích. Sửa bảng tóm tắt cho khớp 12.1-12.11. Thay FORMAT(x,'yyyy-MM') bằng DATEFROMPARTS(YEAR(x), MONTH(x), 1). Xoá các mục boilerplate và mục trống.
- **major** · chính xác · [12.3-advanced-queries.md:241](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.3-advanced-queries.md): Quy tắc chọn APPLY hay ROW_NUMBER bị đảo. APPLY (một seek cho mỗi nhóm) có lợi khi số nhóm ít và mỗi nhóm nhiều dòng (mật độ cột phân nhóm cao). Khi có nhiều nhóm và mỗi nhóm ít dòng (50.000 khách × 10 contact), ROW_NUMBER trên index đã sắp thường tốt hơn. Số liệu bài 3 tự mâu thuẫn: APPLY không index có '50.000 lần quét bảng 500.000 dòng' mà chỉ 420.000 logical reads; ROW_NUMBER có index chỉ 3.400 reads mà vẫn mất 1,4 giây.
  - Bằng chứng: `| Nhanh hơn khi | Ít nhóm, nhiều dòng mỗi nhóm | **Nhiều nhóm, index tốt** |`
  - Sửa: Sửa bảng: ROW_NUMBER thắng khi nhiều nhóm và ít dòng mỗi nhóm; APPLY thắng khi ít nhóm và nhiều dòng mỗi nhóm (cả hai cần index (CustomerId, CreatedAt DESC)). Đo lại thật và cập nhật số liệu, hoặc ghi 'minh hoạ' và bỏ con số cụ thể. Sửa tóm tắt dòng 3 ('APPLY là công cụ duy nhất').
- **major** · chính xác · [12.5-query-optimization.md:57](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.5-query-optimization.md): Ngưỡng auto-update statistics '20% số dòng' đã lỗi thời. Từ SQL Server 2016 (compatibility level ≥130), ngưỡng là động, khoảng MIN(500 + 20%·n, √(1000·n)). Với 50 triệu dòng là khoảng 224.000 thay đổi, không phải 10 triệu.
  - Bằng chứng: `Auto-update statistics của SQL Server chỉ kích hoạt sau khi khoảng 20% số dòng thay đổi — với bảng 50 triệu dòng, đó là 10 triệu thay đổi.`
  - Sửa: Sửa thành: 'Từ SQL Server 2016 ngưỡng là √(1000×n) với bảng lớn — 50 triệu dòng ≈ 224.000 thay đổi; bản cũ là 20%'. Vẫn giữ lời khuyên cập nhật statistics sau các đợt nạp dữ liệu lớn.
- **major** · chính xác · [12.6-transactions-and-locking.md:253](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.6-transactions-and-locking.md): Bài khẳng định EnableRetryOnFailure mặc định không retry deadlock và phải thêm 1205. Điều này sai: SqlServerTransientExceptionDetector của EF Core đã có sẵn 1205. Ngay trong bài, dòng 403 lại truyền `errorNumbersToAdd: null`, mâu thuẫn với dòng 253. Ngoài ra code TransferPointsAsync (dòng 366) dùng BeginTransactionAsync cùng retry mà không bọc execution strategy, sẽ ném InvalidOperationException lúc chạy (12.10 dòng 195 có nêu, 12.6 thì không).
  - Bằng chứng: `'EnableRetryOnFailure' mặc định **không** retry deadlock; phải thêm mã 1205.`
  - Sửa: Sửa thành: 'EnableRetryOnFailure đã coi 1205 là lỗi tạm thời; errorNumbersToAdd chỉ dùng cho mã lỗi tuỳ biến.' Bỏ `[1205]` trong các ví dụ ở 12.6 và 12.10. Thêm cảnh báo về CreateExecutionStrategy ngay trong 12.6 và bọc TransferPointsAsync bằng `strategy.ExecuteAsync`.
- **major** · chính xác · [12.9-advanced-notes.md:476](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.9-advanced-notes.md): Bài khẳng định cột tính toán JSON_VALUE phải PERSISTED mới index được và minh hoạ bằng mã lỗi bịa (Msg 2739). Tài liệu Microsoft 'Index JSON data' tạo index trên cột tính toán JSON_VALUE không persisted: JSON_VALUE deterministic, trả nvarchar(4000) nên index được.

  ```text
  `JSON_VALUE` thoả điều kiện, nhưng SQL Server vẫn yêu cầu `PERSISTED` cho các biểu thức trên kiểu `NVARCHAR(MAX)`...
  Msg 2739: The text, ntext, and image data types are invalid for local variables.
  ```

  - Sửa: Sửa: 'Cột tính toán không PERSISTED vẫn index được vì JSON_VALUE deterministic; giá trị được lưu trong index. PERSISTED chỉ cần khi muốn lưu trong bảng (ví dụ dùng làm khoá clustered hoặc tránh tính lại khi đọc).' Xoá các thông báo lỗi bịa và sửa dòng 193.
- **major** · đầy đủ · [README.md:5](../lessons/stage-04-database-production/module-12-sql-deep-dive/README.md): Module không có hướng dẫn chuẩn bị môi trường: không có lệnh docker cho SQL Server hoặc PostgreSQL, không nêu công cụ (SSMS, Azure Data Studio, DBeaver), không có database mẫu kích thước lớn. Gần như mọi bài tập lại yêu cầu bảng 0,5-2 triệu dòng, hai hệ quản trị, Extended Events và execution plan. Các script sinh dữ liệu dùng `generate_series(...) g` kiểu PostgreSQL trên SQL Server (12.2 dòng 472, 12.5 dòng 377) hoặc chỉ ghi '...' (12.7 dòng 485), nên không chạy được.
  - Bằng chứng: `FROM   generate_series(1, 200000) g;   -- hoặc vòng lặp tương đương`
  - Sửa: Thêm 12.0 'Chuẩn bị': `docker run -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=... -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest`, lệnh tương tự cho postgres:17, cách bật Actual Execution Plan và một script sinh dữ liệu CRM dùng chung. Trên SQL Server 2022+ dùng `GENERATE_SERIES(1, 200000)` với cột `value`, hoặc CTE số cho bản cũ hơn.
- **minor** · chính xác · [12.11-quick-real-world-example.md:319](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.11-quick-real-world-example.md): Thứ tự ưu tiên kiểu dữ liệu sai: datetimeoffset đứng trên datetime2. Bài cũng gọi đây là quy tắc 'cố định trong chuẩn SQL', trong khi đó là quy tắc riêng của SQL Server. Dòng 34 xếp `CAST(CreatedAt AS DATE)` vào nhóm không dùng index, nhưng SQL Server có cơ chế đặc biệt seek được với CAST datetime→date.
  - Bằng chứng: `datetime2 > datetimeoffset > datetime > date > float > decimal > int`
  - Sửa: Sửa thành `datetimeoffset > datetime2 > datetime > smalldatetime > date > time > float > real > decimal > money > bigint > int > ... > nvarchar > nchar > varchar > char` (theo tài liệu SQL Server). Bỏ cụm 'chuẩn SQL'. Ghi chú CAST(... AS date) là ngoại lệ seek được, nhưng vẫn nên viết dạng khoảng cho dễ hiểu.
- **minor** · chính xác · [12.2-sql-server-vs-postgresql.md:189](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.2-sql-server-vs-postgresql.md): Giới hạn 'Express 10GB mỗi database' đã lỗi thời với SQL Server 2025 (bản Express nâng giới hạn lên 50GB). Bài cũng không nhắc Azure SQL Database bật RCSI mặc định, và UseSnakeCaseNamingConvention cần gói EFCore.NamingConventions bên thứ ba.
  - Bằng chứng: `- Không có ngân sách license — Express bị giới hạn **10GB mỗi database**.`
  - Sửa: Ghi: 'Express giới hạn 10GB (2022 trở về trước), 50GB với SQL Server 2025'. Thêm ghi chú Azure SQL mặc định RCSI và tên package EFCore.NamingConventions.
- **minor** · chính xác · [12.3-advanced-queries.md:167](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.3-advanced-queries.md): `RANGE BETWEEN 2 PRECEDING AND CURRENT ROW` không chạy trên SQL Server (RANGE chỉ hỗ trợ UNBOUNDED PRECEDING/CURRENT ROW). Trên PostgreSQL nó là khung theo giá trị (d-2..d), chứ không chỉ là 'gộp dòng trùng giá trị' như bài giải thích.
  - Bằng chứng: `SUM(x) OVER (ORDER BY d RANGE BETWEEN 2 PRECEDING AND CURRENT ROW)`
  - Sửa: Đổi ví dụ thành `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` so với `ROWS ...` và minh hoạ bằng dữ liệu có ngày trùng. Ghi chú riêng rằng RANGE có offset chỉ có ở PostgreSQL.
- **minor** · chính xác · [12.4-indexing.md:151](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.4-indexing.md): Filtered index của SQL Server không chấp nhận `NOT IN` trong mệnh đề WHERE (chỉ cho phép so sánh đơn, IN và AND), nên lệnh tạo index sẽ lỗi. 12.12 dòng 233 cũng dùng mẫu này. Bảng INCLUDE ghi giới hạn khoá '16 cột, 900 byte'; với nonclustered index từ SQL Server 2016 là 32 cột và 1.700 byte.
  - Bằng chứng: `WHERE Status NOT IN ('Won', 'Lost');`
  - Sửa: Viết `WHERE Status IN ('New','Contacted','Qualified')` hoặc `WHERE Status <> 'Won' AND Status <> 'Lost'`. Sửa giới hạn khoá thành 32 cột / 1.700 byte (clustered vẫn 900 byte). Thêm ghi chú: truy vấn tham số hoá thường không khớp filtered index nếu không có literal hoặc OPTION(RECOMPILE).
- **minor** · chính xác · [12.6-transactions-and-locking.md:447](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.6-transactions-and-locking.md): Ví dụ 'UPDATE chờ 28 giây vì báo cáo giữ khoá đọc' gây hiểu lầm. Dưới READ COMMITTED (locking), khoá S được nhả ngay khi đọc qua từng dòng hoặc trang, nên một SELECT dài thường không chặn UPDATE một dòng 28 giây (trừ khi bị lock escalation). Tình huống phổ biến là ngược lại: transaction ghi dài chặn báo cáo.
  - Bằng chứng: `**'UPDATE' chờ 28 giây** vì báo cáo đang giữ khoá đọc trên các dòng nó đi qua.`
  - Sửa: Đổi kịch bản: phiên 1 BEGIN TRAN; UPDATE nhiều dòng; chưa commit. Phiên 2 SELECT báo cáo bị chặn (LCK_M_S). Sau khi bật RCSI, SELECT đọc phiên bản cũ và không bị chặn.
- **minor** · thực tế · [12.7-stored-procedures-and-views.md:45](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.7-stored-procedures-and-views.md): Nhiều stored procedure mẫu đặt tiền tố `sp_` (sp_SearchBad, sp_SearchLeads, sp_SearchLeadsFiltered; 12.5 dòng 84 sp_GetLeadsByStatus) mà không cảnh báo. Microsoft khuyến cáo tránh tiền tố này vì nó dành cho thủ tục hệ thống (tra cứu ở master trước, có thể trùng tên). Kết luận dòng 642 'không lồng quá một tầng' cũng mâu thuẫn với bài 2 dòng 462 ('đừng chồng quá ba tầng').
  - Bằng chứng: `CREATE PROCEDURE sp_SearchBad @Column NVARCHAR(50), @Value NVARCHAR(100) AS`
  - Sửa: Đổi tên thành `usp_SearchLeads` hoặc `Leads_Search` và thêm một dòng cảnh báo về tiền tố sp_. Thống nhất quy tắc lồng view.
- **minor** · chính xác · [12.8-database-migration-strategy.md:208](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.8-database-migration-strategy.md): Ví dụ backfill dùng `WHERE Tier IS NULL`, nhưng cột Tier vừa được thêm ở dòng 39/139 là `NOT NULL DEFAULT 'Standard'`, nên vòng lặp không cập nhật dòng nào. Bài 1 dòng 294 cũng vậy. Mục 12.9.4 nói thêm cột NOT NULL có default là thao tác metadata 'từ SQL Server 2012' mà không nêu đó là tính năng Enterprise (và Azure SQL).

  ```text
  ALTER TABLE Customers ADD Tier NVARCHAR(50) NOT NULL DEFAULT 'Standard';
  ...
      WHERE  Tier IS NULL;                 -- điều kiện để LẦN SAU bỏ qua dòng đã xong
  ```

  - Sửa: Trong ví dụ expand, thêm Tier dạng NULL, backfill theo lô, rồi mới ALTER sang NOT NULL. Ghi rõ 'metadata-only với Enterprise/Developer/Azure SQL; Standard thì ghi lại bảng'. Nên dùng lô dưới 5.000 (ví dụ 4.000) để tránh chạm ngưỡng lock escalation.
- **minor** · nhất quán · [12.9-advanced-notes.md:20](../lessons/stage-04-database-production/module-12-sql-deep-dive/12.9-advanced-notes.md): Ví dụ dùng tên bảng và cột tiếng Việt không dấu (DoanhSoThang, NhanVienId, KhuVuc, NhatKy), lệch khỏi schema CRM tiếng Anh của module. 12.9 cũng định nghĩa Leads với Id UNIQUEIDENTIFIER (dòng 71) trong khi 12.1 khuyên INT IDENTITY và ví dụ dòng 418 dùng `l.Id == 1`. Nhiều nội dung lặp 12.1, 12.2 và 12.3 (temporal table, JSON, window function).

  ```text
  SELECT
      NhanVienId,
      KhuVuc,
      DoanhSo,
      ROW_NUMBER() OVER (PARTITION BY KhuVuc ORDER BY DoanhSo DESC) AS ThuHang,
  ```

  - Sửa: Dùng schema CRM chung (Leads, Users, Region) và kiểu khoá thống nhất. Rút phần trùng lặp và chỉ giữ chủ đề mới (columnstore, partition), với phần temporal/JSON thì dẫn link về 12.1/12.2.

### Module 13 - Entity Framework Core

- **critical** · chính xác · [13.10-global-query-filters.md:151](../lessons/stage-04-database-production/module-13-entity-framework-core/13.10-global-query-filters.md): Khoá học nhắm .NET 10, nhưng bài khẳng định 'EF Core không cho bỏ qua một filter cụ thể', 'mỗi entity type có đúng một query filter' và 'IgnoreQueryFilters không nhận tham số'. EF Core 10 đã có named query filters và IgnoreQueryFilters(["SoftDelete"]). Đây chính là lời giải chuẩn cho bài toán soft delete + tenant mà bài đang mô tả.
  - Bằng chứng: `EF Core không cho bỏ qua **một** filter cụ thể ... Vì nó không nhận tham số nào — chữ ký của nó là: public static IQueryable<TEntity> IgnoreQueryFilters<TEntity>(this IQueryable<TEntity> source)`
  - Sửa: Thêm mục EF 10: `.HasQueryFilter("SoftDelete", l => !l.IsDeleted).HasQueryFilter("Tenant", l => l.TenantId == _tenantId)` và `db.Leads.IgnoreQueryFilters(["SoftDelete"])`. Giữ cách nối && như ghi chú 'trước EF 10' và cập nhật Bài 2 theo hướng đó.
- **critical** · chính xác · [13.10-global-query-filters.md:184](../lessons/stage-04-database-production/module-13-entity-framework-core/13.10-global-query-filters.md): Mục 13.11.4 và Bài 3 nói rằng khi Customer có filter, Include(c =&gt; c.Customer) với FK bắt buộc sẽ sinh LEFT JOIN và trả Customer = null. Theo tài liệu EF Core, quan hệ required sinh INNER JOIN với subquery đã lọc, nên chính các Contact đó bị loại khỏi kết quả (ít dòng hơn mong đợi), không phải ra null. Phần giải thích 'Include phải là nạp thêm nên dùng LEFT JOIN' và câu 'contacts.Count = 5' đều sai.
  - Bằng chứng: `Filter được áp khi nạp navigation, nên 'contact.Customer' thành 'null' dù khoá ngoại là **bắt buộc** ... LEFT JOIN (SELECT ... WHERE [c0].[IsDeleted] = CAST(0 AS bit)) AS [t]`
  - Sửa: Viết lại theo docs 'Query filters and required navigations': required thì INNER JOIN, Contact bị lọc mất (Count = 0). Cách sửa: đặt filter nhất quán ở Contact (c =&gt; !c.Customer.IsDeleted) hoặc cấu hình IsRequired(false) nếu muốn LEFT JOIN. Sửa luôn SQL minh hoạ, self-check và câu 'mọi navigation trở thành nullable'.
- **critical** · chính xác · [13.10-global-query-filters.md:279](../lessons/stage-04-database-production/module-13-entity-framework-core/13.10-global-query-filters.md): Bài 1 và tóm tắt khẳng định filter `l.TenantId == _tenant.Id` (trong đó _tenant là field của DbContext) sẽ bị 'đóng băng' theo tenant của request đầu tiên. EF Core thay instance context trong biểu thức filter bằng context hiện tại và tính lại cả chuỗi member mỗi lần truy vấn. Docs dùng đúng cách này, với primary-ctor `tenantId` và `_context.TenantId`, nên lỗi được mô tả sẽ không tái hiện được. Ví dụ 'SAI' ở dòng 98 (primary constructor `tenant`) cũng là cách viết của docs. Lỗi đóng băng thật chỉ xảy ra khi bắt biến cục bộ, giá trị tính sẵn trong OnModelCreating, hoặc biến static/singleton.
  - Bằng chứng: `builder.Entity<Lead>().HasQueryFilter(l => l.TenantId == _tenant.Id); // giá trị bị đóng băng ... curl -H "X-Tenant: globex" ... # 120 lead của acme — SAI`
  - Sửa: Đổi ví dụ lỗi thành `var tenantId = _tenant.Id; builder.Entity<Lead>().HasQueryFilter(l => l.TenantId == tenantId);` hoặc dùng field static. Giải thích quy tắc đúng: biểu thức phải bắt nguồn từ instance DbContext. Chạy lại để có output thật, đồng thời sửa tóm tắt, sơ đồ mermaid, bảng 'Ba quy tắc' và self-check.
- **critical** · chính xác · [13.12-mini-case-study.md:89](../lessons/stage-04-database-production/module-13-entity-framework-core/13.12-mini-case-study.md): Bài khẳng định 'Thu hẹp kiểu — SQL Server CẮT dữ liệu dài hơn, không báo lỗi'. Sai: ALTER COLUMN xuống độ dài nhỏ hơn dữ liệu hiện có sẽ thất bại với lỗi 'String or binary data would be truncated'. Khẳng định này lặp ở 13.12 dòng 83, 278, 629 và 13.4 dòng 609.
  - Bằng chứng: `// Thu hẹp kiểu — SQL Server CẮT dữ liệu dài hơn, không báo lỗi`
  - Sửa: Sửa thành: 'Migration thất bại giữa chừng nếu còn dữ liệu dài hơn, nên cần làm sạch hoặc cắt chủ động trước (UPDATE ... SET Notes = LEFT(Notes, 50))'. Giữ câu SQL đếm `LEN(Notes) > 50` làm bước kiểm tra trước.
- **critical** · nhất quán · [13.14-review-and-assessment.md:29](../lessons/stage-04-database-production/module-13-entity-framework-core/13.14-review-and-assessment.md): Lab tổng kết yêu cầu làm đúng những gì module vừa khuyên tránh: cài IRepository&lt;T&gt; + IUnitOfWork 'như Section 9' và unit test bằng MockRepository (13.9 nói đây là lớp trung gian thừa), dùng 'test in-memory provider' (13.8 và 13.13 nói InMemory không có ROWVERSION, test xanh vô nghĩa), thêm endpoint admin dùng IgnoreQueryFilters 'thấy toàn bộ data' (13.10 coi đây là lỗ hổng rò rỉ tenant). Bảng tóm tắt cũng ghi 'auto-timestamp trong SaveChanges' và 'Repository/UoW hữu ích khi cần test'.
  - Bằng chứng: `1. Implement 'IRepository<T>' và 'IUnitOfWork' như Section 9 ... 7. Viết unit test cho service layer dùng 'MockRepository' ... admin endpoint thấy toàn bộ data`
  - Sửa: Viết lại lab theo đúng bài học: dùng DbContext trực tiếp hoặc extension method, integration test bằng Testcontainers/SQLite, interceptor cho audit, endpoint admin dùng IgnoreQueryFilters nhưng lọc lại TenantId (hoặc named filter của EF 10). Sửa bảng tóm tắt cho khớp.
- **critical** · chính xác · [13.2-dbcontext-and-entity-configuration.md:409](../lessons/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration.md): `builder.OwnsMany(l => l.Tags, b => b.ToJson())` với Tags là List&lt;string&gt; không chạy được, vì owned type phải là kiểu entity, không thể là string. Từ EF 8, primitive collection (List&lt;string&gt;) được ánh xạ thẳng sang cột JSON mà không cần converter. ComplexProperty cho JSON chỉ có từ EF 10.
  - Bằng chứng: `builder.OwnsMany(l => l.Tags, b => b.ToJson());`
  - Sửa: Thay bằng: 'Từ EF Core 8, chỉ cần khai `public List<string> Tags { get; set; } = [];`, EF tự lưu JSON và có sẵn comparer'. Bỏ OwnsMany. Nếu nhắc ComplexProperty thì ghi rõ EF 10.
- **critical** · chính xác · [13.2-dbcontext-and-entity-configuration.md:759](../lessons/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration.md): Extension ExecuteUpdateWithAuditAsync nhận `Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>>` và gọi `setters.Compile()(s)` bên trong biểu thức. Trên EF Core 10, ExecuteUpdateAsync nhận `Action<UpdateSettersBuilder<T>>`, nên code không biên dịch. Trên EF 7-9, code biên dịch được nhưng EF không dịch được lời gọi delegate đã compile. Đoạn này lặp lại ở 13.7 dòng 521.
  - Bằng chứng: `Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>> setters, ... => query.ExecuteUpdateAsync(s => setters.Compile()(s).SetProperty(e => e.UpdatedUtc, audit.Now)`
  - Sửa: Viết lại cho EF 10: `this IQueryable<T> q, Action<UpdateSettersBuilder<T>> setters, ...) => q.ExecuteUpdateAsync(s => { setters(s); s.SetProperty(e => e.UpdatedUtc, audit.Now).SetProperty(e => e.UpdatedBy, audit.UserId); }, ct);` và ghi chú thay đổi API của EF 10.
- **critical** · chính xác · [13.3-relationships.md:143](../lessons/stage-04-database-production/module-13-entity-framework-core/13.3-relationships.md): Mục 13.4.4 nói cấu hình 'Customers --cascade--&gt; Leads, Users --cascade--&gt; Leads' bị SQL Server từ chối. Sai: hai bảng cha khác nhau cùng cascade xuống một bảng con là hợp lệ. Lỗi 'multiple cascade paths' chỉ xảy ra khi từ MỘT bảng có hai đường cascade tới cùng một bảng (ví dụ Customer→User→Lead và Customer→Lead). Bài 2 phải vẽ thêm Customer→User mới ra lỗi, mà quan hệ đó lại không hợp lý với CRM (User là nhân viên).

  ```text
  Customers --cascade--> Leads
  Users     --cascade--> Leads
  
  SQL Server **từ chối tạo** cấu hình này: nhiều đường cascade cùng tới một bảng.
  ```

  - Sửa: Giải thích đúng định nghĩa multiple cascade paths, kèm ví dụ CRM hợp lý, ví dụ Customer→Contact, Customer→Lead và Lead→Contact (PrimaryContactId) cascade, hoặc self-reference. Sửa sơ đồ và mô hình ở Bài 2 cho khớp.
- **critical** · chính xác · [13.5-query-patterns.md:187](../lessons/stage-04-database-production/module-13-entity-framework-core/13.5-query-patterns.md): Bảng và phần tự kiểm tra khẳng định FindAsync 'không áp global query filter' và 'tìm thấy cả bản ghi đã xoá mềm'. Thực tế FindAsync chỉ bỏ qua filter khi entity đã nằm trong change tracker. Khi phải xuống database, EF vẫn áp filter. Chính Bài 3 của bài này cũng giải thích đúng như vậy, nên phần lý thuyết mâu thuẫn với lời giải. Khẳng định sai này còn lặp lại ở 13.10 (dòng 3, 175, 258, 729, 753) và 13.14.
  - Bằng chứng: `| Áp global query filter | **Không** | **Có** | ... 'FindAsync' **bỏ qua global query filter** — nghĩa là nó **tìm thấy cả bản ghi đã xoá mềm**`
  - Sửa: Sửa ô trong bảng thành 'Chỉ khi phải truy vấn DB; entity đã tracked thì trả thẳng, không qua filter'. Sửa câu kết luận, phần tự kiểm tra ở 13.5 và các câu tương ứng ở 13.10 (tóm tắt, bảng 13.11.3, checklist, self-check, kết luận) theo cùng ý.
- **critical** · chính xác · [13.5-query-patterns.md:559](../lessons/stage-04-database-production/module-13-entity-framework-core/13.5-query-patterns.md): Bài viết khẳng định 'global query filter KHÔNG được áp cho navigation property trong Include'. Điều này sai: filter gắn với entity type nên áp ở mọi nơi entity xuất hiện, kể cả Include (chính 13.10 Bài 3 cũng nói vậy). Ví dụ còn dùng Contact.Lead, một navigation không có trong mô hình CRM của khoá.
  - Bằng chứng: `// Lead bị xoá mềm vẫn vào tracker — filter KHÔNG áp cho navigation`
  - Sửa: Bỏ đường (c). Nếu muốn có ví dụ entity vào tracker mà không qua filter, dùng Attach/Add thủ công hoặc dữ liệu nạp trước khi set IsDeleted. Tham chiếu learn.microsoft.com/ef/core/querying/filters.
- **critical** · chính xác · [13.6-n-plus-1-problem.md:125](../lessons/stage-04-database-production/module-13-entity-framework-core/13.6-n-plus-1-problem.md): Cách sửa thứ 4 dùng GroupJoin rồi chiếu thẳng grouping (`Contacts = g.ToList()`). Tài liệu EF Core (Complex Query Operators) nêu rõ EF không dịch dạng này, nên truy vấn ném exception lúc chạy. Bài đưa nó ra như một cách sửa hợp lệ.

  ```text
  join ct2 in db.Contacts on c.Id equals ct2.CustomerId into g
                    select new { c.Id, c.Name, Contacts = g.ToList() }
  ```

  - Sửa: Thay bằng projection qua navigation: `db.Customers.Select(c => new { c.Id, c.Name, Contacts = c.Contacts.ToList() })`, hoặc bỏ cách 4 và ghi chú rằng GroupJoin chỉ dịch được khi theo sau là SelectMany/DefaultIfEmpty (LEFT JOIN).
- **critical** · chính xác · [13.7-performance.md:352](../lessons/stage-04-database-production/module-13-entity-framework-core/13.7-performance.md): Bài nói sau ExecuteUpdate, `lead.Value = 999; SaveChanges` sẽ sinh `SET Value = 999, Status = 'New'` và ghi đè ngược. Điều này sai: Status không đổi so với OriginalValues nên EF chỉ UPDATE Value. Bài vừa dạy sai change tracking vừa thổi phồng rủi ro.

  ```text
  await _db.SaveChangesAsync(ct);      // UPDATE ... SET Value = 999, Status = 'New'
                                       // GHI ĐÈ NGƯỢC thay đổi vừa rồi
  ```

  - Sửa: Nêu rủi ro thật: entity trong tracker hiển thị Status cũ và logic nghiệp vụ dựa vào giá trị cũ. Nếu dùng _db.Update(lead) (đánh dấu mọi cột Modified) thì mới ghi đè ngược. Sửa comment SQL cho đúng.
- **critical** · chính xác · [13.8-concurrency-control.md:307](../lessons/stage-04-database-production/module-13-entity-framework-core/13.8-concurrency-control.md): Bài 1 cho db1 sửa Status, db2 sửa Value rồi khẳng định Status của A bị mất, kèm SQL `UPDATE Leads SET Status = N'New', Value = 9000000`. EF Core chỉ gửi những cột đã đổi so với OriginalValues, nên lệnh thứ hai chỉ SET Value và kết quả là Status = Won, Value = 9.000.000. Không có lost update. Bài này dạy sai đúng cơ chế mà 13.1 vừa giảng ('chỉ cột Name'). Lỗi tương tự có ở 13.13 Bài 1 (dòng 249-274), nơi kết quả 'Note rỗng' mâu thuẫn với chính lời giải thích ở dòng 290.
  - Bằng chứng: `UPDATE Leads SET Status = N'New', Value = 9000000 WHERE Id = 1; ... EF Core gửi **mọi cột** mà nó cho là đã thay đổi so với 'OriginalValues'`
  - Sửa: Cho hai người cùng sửa MỘT cột (ví dụ Value 150 và 200), hoặc mô phỏng đúng kịch bản web: request PUT nạp lại entity và gán mọi trường từ form cũ. Sửa SQL minh hoạ và kết quả; ở 13.13 Bài 1 đổi output thành 'Note vẫn còn' rồi dẫn sang kịch bản form.
- **major** · cấu trúc · [13.1-ef-core-overview.md:17](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Đánh số mục lệch có hệ thống: bài 13.1 dùng 13.2.x, 13.2 dùng 13.3.x, ..., 13.14 dùng 13.15.x. Module 14 cũng vậy (14.1 dùng 14.2.x, 14.13 dùng 14.14.x). Điều này gây nhầm khi mentor nói 'xem mục 13.5.3', nhất là khi nhiều link trong bài lại dẫn theo số cũ.
  - Bằng chứng: `# 13.1 - EF Core Overview ... ### 13.2.1 — EF Core làm gì`
  - Sửa: Chạy script đánh lại số tiêu đề cấp 3 theo số bài (13.1.1, 13.1.2, ...) cho toàn bộ module 13 và 14, đồng thời sửa các tham chiếu 'mục 14.5.5' trong nội dung (ví dụ 14.4 dòng 494, 542).
- **major** · nhất quán · [13.1-ef-core-overview.md:72](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Mục 13.2.2 khuyến nghị đặt NoTracking làm mặc định toàn context vì 'quên AsTracking thì SaveChanges không làm gì — lỗi rõ ràng và dễ phát hiện'. Chính lời giải Bài 1 (dòng 352) lại khuyên KHÔNG làm vậy vì SaveChanges 'không làm gì cả, không báo lỗi gì cả'. Phần tự kiểm tra lặp lại khẳng định đầu, còn 13.14 thì ghi 'Mặc định AsNoTracking'.
  - Bằng chứng: `quên 'AsTracking' thì 'SaveChanges' không làm gì — lỗi rõ ràng và dễ phát hiện. ... **Và đừng đặt 'AsNoTracking' làm mặc định toàn cục** ... không báo lỗi gì cả`
  - Sửa: Chọn một khuyến nghị cho người mới: giữ tracking mặc định, dùng projection/AsNoTracking cho truy vấn đọc. Sửa lại 13.2.2, câu self-check 'Vì sao nên đặt NoTracking làm mặc định?' và bảng tóm tắt ở 13.14.
- **major** · chính xác · [13.1-ef-core-overview.md:152](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Ví dụ `FromSql($"SELECT * FROM Customers WHERE {predicate}")` gợi ý có thể nội suy cả một điều kiện SQL. Thực tế FromSql biến {predicate} thành tham số giá trị (@p0), nên câu SQL sẽ sai hoặc không như ý. Bài cũng ghi FromSql là 'EF Core 8+' trong khi API này có từ EF Core 7.
  - Bằng chứng: `.FromSql($"SELECT * FROM Customers WHERE {predicate}")`
  - Sửa: Đổi thành ví dụ tham số giá trị: `FromSql($"SELECT * FROM Customers WHERE Email LIKE {pattern}")`. Thêm cảnh báo rằng tên cột hoặc đoạn SQL động không thể truyền qua tham số. Sửa 'EF Core 7+' ở 13.1 và 13.7.
- **major** · chính xác · [13.1-ef-core-overview.md:466](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Bài đề xuất 'bật cảnh báo đánh giá phía client thành lỗi' bằng RelationalEventId.MultipleCollectionIncludeWarning, nhưng cảnh báo này liên quan cartesian explosion, không liên quan client evaluation. Gói 'EntityFrameworkCore.Analyzers' với Version="..." cũng không có rule phát hiện .ToList().Where(...). Microsoft.EntityFrameworkCore.Analyzers chỉ cảnh báo internal API và SQL nội suy.
  - Bằng chứng: `.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning)); ... <PackageReference Include="EntityFrameworkCore.Analyzers" Version="..."`
  - Sửa: Bỏ hai cách này. Giữ cách thực tế: review rule, test đếm số dòng/truy vấn bằng interceptor, và ghi chú rằng client eval cuối cùng đã ném lỗi từ EF 3.0. Nếu muốn analyzer thì giới thiệu đúng tên và đúng phạm vi.
- **major** · chính xác · [13.1-ef-core-overview.md:563](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Ví dụ nói vòng `foreach (var c in _db.Customers.ToList()) c.Leads.Count` sẽ 'sinh thêm 500 câu lệnh' do lazy loading. Lazy loading không bật mặc định trong EF Core (cần Proxies và UseLazyLoadingProxies), mà các bài sau lại dạy KHÔNG bật nó. Không có proxies thì Leads rỗng hoặc null, không phát sinh truy vấn nào.

  ```text
  foreach (var c in _db.Customers.ToList())
      Console.WriteLine(c.Leads.Count);              // lazy loading
  ```

  - Sửa: Ghi rõ 'giả sử đã bật UseLazyLoadingProxies', hoặc đổi sang ví dụ N+1 tường minh: gọi _db.Leads.CountAsync(...) trong vòng lặp.
- **major** · nhất quán · [13.11-advanced-notes.md:42](../lessons/stage-04-database-production/module-13-entity-framework-core/13.11-advanced-notes.md): Interface IAuditable đổi tên trường giữa các bài: 13.2 dùng CreatedAt/UpdatedAt (non-null), 13.2 Bài 3 dùng CreatedUtc/UpdatedUtc (test expect UpdatedUtc null), 13.11 dùng ModifiedUtc/ModifiedBy rồi đến UpdatedUtc, còn 13.7 dùng UpdatedAt. 13.11 còn gọi entry.Entity.IsDeleted/DeletedUtc trên IAuditable, nên không biên dịch được. Soft delete thì lúc IsDeleted, lúc DeletedAt; interface lúc ISoftDelete, lúc ISoftDeletable.

  ```text
  entry.Entity.ModifiedUtc = now; ... entry.Entity.IsDeleted = true;
                      entry.Entity.DeletedUtc = now;
  ```

  - Sửa: Định nghĩa một lần trong bài 13.2 (hoặc phụ lục CRM model): `IAuditable { DateTime CreatedUtc; string? CreatedBy; DateTime? UpdatedUtc; string? UpdatedBy; }` và `ISoftDeletable { bool IsDeleted; DateTime? DeletedUtc; }`, rồi dùng thống nhất trong 13.2, 13.7, 13.10, 13.11 và 14.x.
- **major** · nhất quán · [13.11-advanced-notes.md:202](../lessons/stage-04-database-production/module-13-entity-framework-core/13.11-advanced-notes.md): 13.11 khuyên 'viết filter tham chiếu tới service chứ không tới giá trị'. Checklist dòng 226 cũng viết vậy. Trong khi đó 13.10 nói ngược lại: phải đọc từ field, không gọi service. Người học nhận hai lời khuyên trái nhau về cùng một lỗi bảo mật.
  - Bằng chứng: `Giải pháp đơn giản hơn cho hầu hết trường hợp: viết filter tham chiếu tới **service** chứ không tới **giá trị**`
  - Sửa: Thống nhất một quy tắc đúng ở cả hai bài: biểu thức filter phải bắt nguồn từ instance DbContext (field/property của context, kể cả field giữ service), không bắt biến cục bộ hay static. Sau đó sửa checklist ở cả hai bài.
- **major** · cấu trúc · [13.14-review-and-assessment.md:3](../lessons/stage-04-database-production/module-13-entity-framework-core/13.14-review-and-assessment.md): Bài review toàn boilerplate: 'Mục tiêu' chung chung, tiêu đề '13.15.4 — Kiểm tra & Thực hành (100 điểm)' rỗng, 'Bài tập tổng hợp', 'Tự kiểm tra' và 'Kết luận' không gắn với EF Core. Quiz có phương án nhiễu vô lý (Thiếu Swagger, UseIIS, Thread.Sleep), lab không có lời giải hoặc tiêu chí chấm chi tiết, và tham chiếu mơ hồ 'như Section 2/Section 9'.

  ```text
  ### 13.15.4 — Kiểm tra & Thực hành (100 điểm)
  
  ### 13.15.5 — Bối cảnh giáo trình ... D. Thiếu Swagger
  ```

  - Sửa: Xoá các mục boilerplate. Viết 8-10 câu quiz tình huống CRM (cartesian, FindAsync + filter, rename migration, RowVersion qua API). Thêm lời giải hoặc repo mẫu cho 3 lab, thay 'Section N' bằng link bài cụ thể, và đánh số mục 13.14.x.
- **major** · dễ hiểu · [13.2-dbcontext-and-entity-configuration.md:3](../lessons/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration.md): Bài dành cho sinh viên mới tiếp cận EF nhưng ngay từ 13.2 đã dồn strongly-typed ID, value converter kèm ValueComparer, owned type, interceptor, FakeTimeProvider, test reflection trên model và analyzer. Bài chưa có phần dựng project từ đầu (tạo DbContext, đăng ký DI, chạy migration đầu tiên), chưa định nghĩa change tracker hay Fluent API cho người chưa biết, và mỗi bài dài 700-840 dòng.
  - Bằng chứng: `Value converter cho phép **domain dùng kiểu riêng** ... public readonly record struct CustomerId(int Value);`
  - Sửa: Thêm bài hoặc mục 'EF Core từ con số 0': cài package, tạo entity Customer/Lead, DbContext, AddDbContext, `dotnet ef migrations add InitialCreate`, `database update`, CRUD đầu tiên. Đánh dấu các mục strongly-typed ID, interceptor test, analyzer là 'Nâng cao (tuỳ chọn)'.
- **major** · nhất quán · [13.2-dbcontext-and-entity-configuration.md:29](../lessons/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration.md): Khoảng 80 link nội bộ trong module 13 và 14 có nhãn 'bài X.Y' lệch số với file đích (thường lệch +1). Ví dụ 'bài 13.10 (`13.9-...`)', 'bài 7.5 (`7.4-service-lifetimes.md`)', 'bài 14.6 (`14.5-hybridcache...`)'. Link vẫn trỏ đúng file nhưng sinh viên tra mục lục theo số sẽ đến nhầm bài.
  - Bằng chứng: `[bài 13.10](13.9-unit-of-work-and-repository-pattern.md) ... [bài 6.6](../../stage-02-csharp-professional/module-06-async-programming/6.5-task-parallel-library.md)`
  - Sửa: Viết script thay nhãn 'bài X.Y' bằng tiền tố số trong tên file đích (regex `\[bài (\d+\.\d+)\]\(([^)]*/)?(\d+\.\d+)-`) cho tất cả file trong module-13 và module-14, rồi review diff.
- **major** · chính xác · [13.2-dbcontext-and-entity-configuration.md:428](../lessons/stage-04-database-production/module-13-entity-framework-core/13.2-dbcontext-and-entity-configuration.md): Test 'mọi converter phải có comparer' không bắt được gì. GetValueComparer() trên EF hiện đại không trả null cho property có converter, và mọi ValueComparer đều là ValueComparer&lt;T&gt; nên `GetType().IsGenericType is false` luôn sai. Kết quả là test luôn xanh, đúng loại 'test xanh vô nghĩa' mà bài đang cảnh báo.

  ```text
  .Where(p => p.GetValueComparer() is null
                   || p.GetValueComparer()!.GetType().IsGenericType is false)
  ```

  - Sửa: Kiểm tra bằng metadata: lấy annotation comparer khai báo tường minh (`p.FindAnnotation(CoreAnnotationNames.ValueComparer)` hoặc kiểm tra `p.GetValueComparer()` có phải comparer mặc định theo tham chiếu) và lọc kiểu tham chiếu mutable không phải string. Hoặc bỏ test, thay bằng khuyến nghị dùng primitive collection của EF 8+.
- **major** · chính xác · [13.3-relationships.md:141](../lessons/stage-04-database-production/module-13-entity-framework-core/13.3-relationships.md): Bài nói Restrict khác NoAction ở chỗ Restrict 'ném lỗi nếu cố xoá cha còn con'. Ở phía EF Core, Restrict và NoAction có hành vi giống nhau với entity đã tracked; khác biệt chỉ nằm ở DDL của database, và trên SQL Server cả hai đều thành NO ACTION. Bảng 'Restrict: Không làm gì' cũng đơn giản hoá sai: với quan hệ optional đã nạp, EF gán FK = null.
  - Bằng chứng: `**'Restrict' khác 'NoAction'** ở chỗ 'Restrict' khiến EF Core **không** tự động sửa gì cả và ném lỗi`
  - Sửa: Dẫn bảng 'Cascade delete' trong docs EF (theo required/optional, loaded/not loaded). Nêu rõ Restrict và NoAction chỉ khác ở database hỗ trợ RESTRICT (PostgreSQL), và trên SQL Server là như nhau.
- **major** · chính xác · [13.3-relationships.md:569](../lessons/stage-04-database-production/module-13-entity-framework-core/13.3-relationships.md): Bài 3 khẳng định chuyển many-to-many ngầm sang entity LeadTag thì migration 'chỉ thêm cột, không tạo lại bảng'. Thực tế bảng nối ngầm có cột LeadsId/TagsId, còn entity LeadTag mặc định map tới bảng 'LeadTag' với LeadId/TagId, nên migration sẽ rename hoặc drop bảng và cột. Bài cũng bỏ qua rằng UsingEntity&lt;LeadTag&gt; (đã dạy ở 13.4.5) cho phép giữ lead.Tags, nên con số '20-40 chỗ phải sửa' bị thổi phồng.
  - Bằng chứng: `Bảng **không bị tạo lại** — EF Core nhận ra đây vẫn là bảng 'LeadTags' và chỉ thêm cột.`
  - Sửa: Thêm `.ToTable("LeadTags")` cùng HasColumnName cho LeadsId/TagsId, rồi đọc migration thật. Trình bày phương án giữ skip navigation bằng UsingEntity&lt;LeadTag&gt;, chỉ phải sửa ở chỗ cần TaggedBy.
- **major** · đầy đủ · [13.4-migrations.md:17](../lessons/stage-04-database-production/module-13-entity-framework-core/13.4-migrations.md): Bài migrations thiếu các công cụ chuẩn hiện hành: migration bundle (`dotnet ef migrations bundle`, chạy được không cần SDK), cảnh báo việc gọi Migrate() lúc khởi động trên nhiều instance, `has-pending-model-changes`, và UseSeeding/UseAsyncSeeding của EF 9 cho seeding có logic. Tên file snapshot cũng ghi sai thành 'CrmDbContext ModelSnapshot.cs' (có khoảng trắng).

  ```text
  ├── 20260315103000_AddCustomerTier.Designer.cs     <- snapshot tai thoi diem nay
  └── CrmDbContext ModelSnapshot.cs
  ```

  - Sửa: Thêm mục 'Áp dụng migration lên môi trường thật': so sánh script idempotent, bundle và Migrate() lúc startup (kèm rủi ro). Thêm UseSeeding vào mục 13.4.4 và sửa tên file thành CrmDbContextModelSnapshot.cs.
- **major** · chính xác · [13.4-migrations.md:352](../lessons/stage-04-database-production/module-13-entity-framework-core/13.4-migrations.md): Quy trình gỡ migration dùng `rm Migrations/*_ThemLeadPriority.cs`. Glob này không xoá file .Designer.cs (tên `*_ThemLeadPriority.Designer.cs`), nên khi add lại sẽ trùng class và lỗi build. Quy trình này cũng khác hướng dẫn chính thức về 'diverged migration trees'.
  - Bằng chứng: `rm Migrations/*_ThemLeadPriority.cs`
  - Sửa: Dùng `rm Migrations/*_ThemLeadPriority*.cs`, hoặc tốt hơn là theo docs 'Migrations in team environments': giữ snapshot của nhánh chính, xoá cả hai file migration của mình rồi add lại. Thêm link docs.
- **major** · chính xác · [13.4-migrations.md:363](../lessons/stage-04-database-production/module-13-entity-framework-core/13.4-migrations.md): Bài đưa ra lệnh `dotnet ef migrations add KiemTra --dry-run`, nhưng lệnh này không tồn tại, và câu 'trên bản EF Core không có --dry-run' gây hiểu nhầm. Từ EF 8 đã có lệnh chuẩn `dotnet ef migrations has-pending-model-changes` (và context.Database.HasPendingModelChanges()), vậy mà script CI vẫn dùng cách tạo migration rồi grep.
  - Bằng chứng: `dotnet ef migrations add KiemTra --dry-run`
  - Sửa: Thay bằng `dotnet ef migrations has-pending-model-changes` trong CI, cùng test `Assert.False(db.Database.HasPendingModelChanges())`. Thêm ghi chú: từ EF 9, Migrate() ném lỗi khi còn pending model changes.
- **major** · chính xác · [13.5-query-patterns.md:365](../lessons/stage-04-database-production/module-13-entity-framework-core/13.5-query-patterns.md): Bài khẳng định 'EF Core sinh SQL split query cho projection này một cách tự động'. Sai: projection có collection lồng nhau vẫn dùng single query (LEFT JOIN) theo mặc định, và hai collection vẫn có thể gây cartesian explosion nếu không thêm AsSplitQuery().
  - Bằng chứng: `EF Core sinh SQL split query cho projection này một cách tự động`
  - Sửa: Sửa thành: 'Projection chỉ lấy cột cần; với nhiều collection lồng nhau vẫn nên thêm .AsSplitQuery() hoặc bật UseQuerySplittingBehavior toàn cục'.
- **major** · thực tế · [13.6-n-plus-1-problem.md:74](../lessons/stage-04-database-production/module-13-entity-framework-core/13.6-n-plus-1-problem.md): Bài dạy AutoMapper/ProjectTo như lựa chọn mặc định ('lý do chính để dùng AutoMapper với EF Core') mà không nhắc rằng AutoMapper từ v15 (2025) đã chuyển sang giấy phép thương mại. Sinh viên cài bản mới sẽ gặp yêu cầu license. Các test cũng dùng FluentAssertions, thư viện đã thương mại từ v8.
  - Bằng chứng: `Đây là lý do chính để dùng AutoMapper với EF Core thay vì map thủ công sau khi nạp.`
  - Sửa: Thêm ghi chú license và đề xuất phương án cho CLB: projection Select viết tay (khuyến nghị), Mapperly (source generator, miễn phí), hoặc ghim AutoMapper 14.x. Với test, dùng Shouldly/AwesomeAssertions hoặc ghim FluentAssertions 7.x.
- **major** · nhất quán · [13.6-n-plus-1-problem.md:450](../lessons/stage-04-database-production/module-13-entity-framework-core/13.6-n-plus-1-problem.md): Bài nói tắt lazy loading thì truy cập navigation chưa nạp sẽ ném NullReferenceException. Nhưng cùng bài (dòng 65) và mô hình ở 13.3 khởi tạo collection `= []`, nên kết quả thực tế là collection rỗng và DTO sai âm thầm (Count = 0), không có exception.
  - Bằng chứng: `System.NullReferenceException: Object reference not set to an instance of an object.`
  - Sửa: Thống nhất: collection khởi tạo [] thì ContactCount = 0 sai im lặng, còn reference navigation (Customer) chưa nạp thì null. Nhấn mạnh rằng vì thế cần test đếm truy vấn hoặc ProjectTo.
- **major** · chính xác · [13.6-n-plus-1-problem.md:460](../lessons/stage-04-database-production/module-13-entity-framework-core/13.6-n-plus-1-problem.md): Test 'ProjectTo_chi_sinh_dung_mot_truy_van' tạo QueryCountingInterceptor mới nhưng không gắn vào _db, nên SoTruyVan luôn bằng 0 và test luôn đỏ ở Should().Be(1). Biến ct cũng chưa khai báo. Test ở dòng 314-321 bị lỗi tương tự.

  ```text
  var dem = new QueryCountingInterceptor();
      var dtos = await _mapper.ProjectTo<CustomerDto>(_db.Customers).ToListAsync(ct);
      dem.SoTruyVan.Should().Be(1);
  ```

  - Sửa: Dựng context bằng `TaoContextVoiInterceptor(dem)` như ở Bài 3, và dùng `TestContext.Current.CancellationToken` (xUnit v3) hoặc CancellationToken.None.
- **major** · chính xác · [13.7-performance.md:205](../lessons/stage-04-database-production/module-13-entity-framework-core/13.7-performance.md): Truy vấn FromSql dùng `SELECT c.*` với `GROUP BY c.Id, c.Name, c.Email`. Customer có thêm nhiều cột (Status, TenantId, CreatedAt, RowVersion...), nên SQL Server báo lỗi 'column is invalid in the select list'. Ngoài ra câu 'Ba điều kiện khi dùng FromSql' chỉ liệt kê được 1-2 điều.

  ```text
  SELECT c.*
          FROM   Customers c
          JOIN   Leads l ON ... 
          GROUP  BY c.Id, c.Name, c.Email
  ```

  - Sửa: Viết lại bằng subquery: `SELECT c.* FROM Customers c WHERE c.Id IN (SELECT CustomerId FROM Leads WHERE Status='Won' GROUP BY CustomerId HAVING SUM(Value) > {minValue})`. Liệt kê đủ ba điều kiện: trả đủ cột, tên cột khớp mapping, và không dùng hàm/biến bảng không compose được.
- **major** · thực tế · [13.7-performance.md:536](../lessons/stage-04-database-production/module-13-entity-framework-core/13.7-performance.md): Bài đề xuất trigger AFTER UPDATE trên Leads để audit nhưng không cảnh báo một điểm quan trọng: từ EF Core 7, SaveChanges trên bảng có trigger (SQL Server) sẽ lỗi vì dùng OUTPUT clause, trừ khi khai `tb.HasTrigger(...)`. Sinh viên làm theo sẽ gặp lỗi ở mọi lần ghi.
  - Bằng chứng: `CREATE TRIGGER TR_Leads_Audit ON Leads AFTER UPDATE AS ...`
  - Sửa: Thêm `builder.ToTable("Leads", tb => tb.HasTrigger("TR_Leads_Audit"));` kèm giải thích ngắn về OUTPUT clause và link docs breaking changes của EF 7.
- **major** · chính xác · [13.8-concurrency-control.md:616](../lessons/stage-04-database-production/module-13-entity-framework-core/13.8-concurrency-control.md): Với read-modify-write, mỗi luồng ghi Stock = (giá trị đọc được − 1) ≥ 0, nên lost update làm tồn kho cao hơn thực tế chứ không thể âm. Output 'Stock trong database: -37' là không thể xảy ra với code đã cho.

  ```text
  Thành công: 87
  Stock trong database: -37
  ```

  - Sửa: Sửa output thành tồn kho dương sai lệch, ví dụ 'Thành công: 87, Stock: 23 (đáng ra phải hết hàng)'. Giải thích: 87 đơn được xác nhận nhưng kho chỉ trừ 27, tức bán vượt (overselling).
- **minor** · nhất quán · [13.1-ef-core-overview.md:184](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Ví dụ Dapper cho báo cáo dùng cú pháp PostgreSQL (DATE_TRUNC, bảng snake_case leads), trong khi toàn module dùng SQL Server (UseSqlServer, [Leads]). Câu 'chúng dùng chung connection và chung transaction' cũng không chỉ ra cách làm.

  ```text
  SELECT DATE_TRUNC('month', converted_at) AS Month, SUM(value) AS Revenue
      FROM leads WHERE status = 'Won'
  ```

  - Sửa: Dùng T-SQL (DATEFROMPARTS(YEAR(ConvertedAt), MONTH(ConvertedAt), 1)) và minh hoạ `var conn = db.Database.GetDbConnection(); var tx = db.Database.CurrentTransaction?.GetDbTransaction();`.
- **minor** · chính xác · [13.1-ef-core-overview.md:264](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Các số liệu 'đo thật' ở 13.1, 13.6, 13.7 ghi '.NET 9.0.203, EF Core 9.0.0', trong khi khoá nhắm .NET 10 LTS. Một số SQL minh hoạ dùng tên tham số kiểu cũ `@__tenantId_0` (EF 10 đã rút gọn tên tham số) và ProductVersion '9.0.0'.
  - Bằng chứng: `**Lời giải — đo thật, trên .NET 9.0.203, EF Core 9.0.0, SQLite, 50.000 'Lead':**`
  - Sửa: Đo lại trên .NET 10 / EF Core 10 và cập nhật nhãn phiên bản, tên tham số SQL và ProductVersion trong script migration minh hoạ.
- **minor** · nhất quán · [13.1-ef-core-overview.md:327](../lessons/stage-04-database-production/module-13-entity-framework-core/13.1-ef-core-overview.md): Lead.Status khi là enum (LeadStatus.New, CustomerStatus.Active), khi là string ("Won", "New", "Stale") trong cùng module. Code các bài không thể ghép vào chung một project CRM. Contact cũng lúc có FullName, lúc có Name, và CustomerDto có ba chữ ký constructor khác nhau (13.5).
  - Bằng chứng: `lead.Status = "Won"; ... .Where(l => l.Status == LeadStatus.New && l.CreatedAt < cutoff)`
  - Sửa: Chọn enum LeadStatus lưu dạng chuỗi (HasConversion&lt;string&gt;, đã dạy ở 13.2) và sửa mọi ví dụ cho khớp. Đặt một file 'Mô hình CRM của module' để mọi snippet tham chiếu.
- **minor** · cấu trúc · [13.12-mini-case-study.md:1](../lessons/stage-04-database-production/module-13-entity-framework-core/13.12-mini-case-study.md): Hai bài 'Mini case study' (13.12, đổi tên cột) và 'Ví dụ thực tế nhanh' (13.13, lost update) gần như lặp lại toàn bộ 13.4 Bài 2 và 13.8. Tiêu đề không nói nội dung gì, khiến module dài thêm khoảng 1.400 dòng mà không thêm kiến thức mới.
  - Bằng chứng: `# 13.12 - Mini case study ... # 13.13 - Ví dụ thực tế nhanh`
  - Sửa: Đổi tiêu đề theo nội dung ('Case study: đổi tên cột làm mất 18.000 số điện thoại', 'Case study: lost update trên form Lead'). Rút gọn phần trùng và chỉ dẫn link về 13.4/13.8, hoặc gộp case study làm phần mở đầu của chính 13.4/13.8.
- **minor** · chính xác · [13.12-mini-case-study.md:174](../lessons/stage-04-database-production/module-13-entity-framework-core/13.12-mini-case-study.md): Bài có lỗi gõ trong lệnh RESTORE: 'DISABK' (đúng là 'DISK'). Ngoài ra, câu 'CREATE INDEX ... WITH (ONLINE = ON) không chạy được trong transaction' là không đúng; các lệnh thật sự cần suppressTransaction là kiểu ALTER DATABASE hoặc full-text.
  - Bằng chứng: `FROM DISABK = 'backup.bak'`
  - Sửa: Sửa thành 'FROM DISK'. Đổi ví dụ suppressTransaction sang lệnh thực sự không chạy được trong transaction (ví dụ `ALTER DATABASE ... SET READ_COMMITTED_SNAPSHOT ON` hoặc CREATE FULLTEXT INDEX).
- **minor** · chính xác · [13.8-concurrency-control.md:41](../lessons/stage-04-database-production/module-13-entity-framework-core/13.8-concurrency-control.md): `UseXminAsConcurrencyToken()` đã obsolete từ Npgsql EF Core 7. Cách khuyến nghị là map một property uint tới cột xmin với IsRowVersion(). Cũng cần sửa ở 13.13 dòng 77 và 466.
  - Bằng chứng: `builder.UseXminAsConcurrencyToken();`
  - Sửa: Thay bằng `public uint Version { get; set; }` cùng `builder.Property(l => l.Version).IsRowVersion();` (Npgsql tự map sang xmin) và ghi chú phiên bản.
- **minor** · chính xác · [13.8-concurrency-control.md:504](../lessons/stage-04-database-production/module-13-entity-framework-core/13.8-concurrency-control.md): LeadDto khai 4 tham số (gồm RowVersion) nhưng endpoint GET dùng ETag lại tạo `new LeadDto(lead.Id, lead.Status, lead.Value)` chỉ với 3 tham số, nên không biên dịch.
  - Bằng chứng: `public record LeadDto(int Id, string Status, decimal Value, byte[] RowVersion); ... return Results.Ok(new LeadDto(lead.Id, lead.Status, lead.Value));`
  - Sửa: Tách hai DTO (LeadDto có RowVersion cho cách 1, LeadDetailDto không có RowVersion cho cách ETag) hoặc truyền thêm lead.RowVersion.

### Module 14 - Caching + Background Jobs

- **critical** · chính xác · [14.11-mini-case-study.md:106](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.11-mini-case-study.md): Trong vòng lặp idempotent ở mục 14.12.3, khi bắt DbUpdateException do trùng unique thì code chỉ `continue` mà không gỡ entity SentEmail lỗi khỏi tracker. Ở vòng sau, SaveChanges lại cố INSERT entity đó và lỗi tiếp, nên mọi email phía sau đều bị bỏ qua. Bài 2 của cùng bài có ChangeTracker.Clear(), nhưng code trong phần lý thuyết thì không.

  ```text
  catch (DbUpdateException ex) when (ex.IsUniqueViolation())
          {
              continue;      // instance khác đã gửi — bỏ qua
          }
  ```

  - Sửa: Thêm `_db.Entry(sentEmail).State = EntityState.Detached;` (hoặc ChangeTracker.Clear()) trong catch. Ghi rõ IsUniqueViolation() đến từ đâu (gói EntityFramework.Exceptions hoặc tự viết kiểm tra SqlException.Number 2601/2627).
- **critical** · chính xác · [14.2-imemorycache.md:660](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.2-imemorycache.md): Bài dựng chuỗi tham chiếu 'Lead tracked → EntityEntry → StateManager → DbContext' và đưa ra số liệu gcdump 987 DbContext bị giữ. Thực tế entity POCO không giữ tham chiếu ngược tới EntityEntry hay DbContext (chiều tham chiếu là StateManager → entity). Chỉ khi dùng lazy-loading proxy hoặc ILazyLoader thì entity mới giữ context. Hệ quả 'pool cạn vì 987 DbContext giữ connection' cũng sai, vì context đã dispose sẽ trả connection về pool.

  ```text
  └─> EntityEntry trong StateManager
                    └─> StateManager
                         └─> CrmDbContext ... Mắt xích quyết định là **entity được tracking giữ tham chiếu ngược tới `DbContext`**
  ```

  - Sửa: Viết lại lý do không nên cache entity: instance mutable dùng chung giữa các request, kéo theo cả đồ thị navigation, rủi ro attach hoặc Update với dữ liệu cũ, và chỉ khi dùng lazy-loading proxy mới giữ DbContext (kèm ObjectDisposedException). Bỏ bảng gcdump bịa và phần pool cạn.
- **critical** · chính xác · [14.4-cache-invalidation-strategies.md:79](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.4-cache-invalidation-strategies.md): CacheInvalidationInterceptor lọc entry theo State Modified/Deleted/Added bên trong SavedChangesAsync. Sau khi SaveChanges thành công, EF đã gọi AcceptAllChanges: Added/Modified thành Unchanged và Deleted thành Detached. Vì vậy truy vấn này không trả về entry nào và cache không bao giờ bị xoá. Lỗi lặp ở Bài 1 (dòng 322-333).

  ```text
  public override async ValueTask<int> SavedChangesAsync(...)
      {
          var entries = eventData.Context!.ChangeTracker.Entries<ICacheable>()
              .Where(e => e.State is EntityState.Modified or EntityState.Deleted or EntityState.Added);
  ```

  - Sửa: Thu thập danh sách tag hoặc khoá trong SavingChangesAsync (lưu vào field hoặc theo context), rồi xoá cache trong SavedChangesAsync. Nên đăng ký interceptor Scoped. Thêm ghi chú: nếu đang trong transaction tường minh, SavedChanges chạy trước khi commit.
- **critical** · chính xác · [14.4-cache-invalidation-strategies.md:642](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.4-cache-invalidation-strategies.md): `lead.RowVersion.Reverse().ToArray()` không biên dịch trên C# 14 / .NET 10. Với first-class span, byte[].Reverse() bind sang MemoryExtensions.Reverse(Span&lt;T&gt;) trả về void (breaking change được ghi trong tài liệu). 'Bản sửa đầy đủ' cũng không làm điều mà comment nói ('chỉ ghi nếu phiên bản mới hơn'). Đoạn ở dòng 221-225 so sánh `version > cachedVersion` giữa hai byte[], cũng không biên dịch.

  ```text
  var phienBan = BitConverter.ToUInt64(lead.RowVersion.Reverse().ToArray());
  
      // Chỉ ghi nếu phiên bản này MỚI HƠN thứ đang có trong cache
      _cache.Set(khoa, ...
  ```

  - Sửa: Dùng `BinaryPrimitives.ReadUInt64BigEndian(lead.RowVersion)` và thêm thật đoạn so sánh với mục đang có trong cache trước khi Set (đặt trong khoá theo key). Ở mục 14.5.5 dùng ulong thay cho byte[].
- **critical** · chính xác · [14.5-hybridcache-dotnet-9.md:186](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.5-hybridcache-dotnet-9.md): Bài khẳng định HybridCache 'đồng bộ L1 giữa các instance' và 'phát tán xoá tới pod B, C khi backend hỗ trợ' (tóm tắt, mục 14.6.6, tag, self-check, kết luận; 14.4 dòng 187 và 523 cũng nói vậy). Tài liệu Microsoft ghi rõ khi invalidate theo key hoặc tag, cache trong bộ nhớ của server khác KHÔNG bị ảnh hưởng, và HybridCache mặc định không có backplane.
  - Bằng chứng: `Về đồng bộ L1: khi backend L2 hỗ trợ (Redis với cấu hình phù hợp), xoá trên pod A **phát tán** tới pod B và C`
  - Sửa: Sửa toàn bộ: HybridCache chỉ xoá L1 của instance hiện tại và L2. Giải pháp là đặt LocalCacheExpiration ngắn, tự cài pub/sub như 14.4, hoặc dùng FusionCache có backplane. Bỏ 'đồng bộ L1' khỏi danh sách 4 lợi ích.
- **critical** · chính xác · [14.8-message-bus-intro.md:192](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.8-message-bus-intro.md): Ví dụ outbox của MassTransit gọi `SaveChangesAsync` TRƯỚC rồi mới `_bus.Publish`. Với bus outbox, message chỉ được thêm vào DbContext và lưu ở lần SaveChanges tiếp theo, nên publish sau SaveChanges sẽ làm message không bao giờ được lưu. Ngoài ra dùng IBus sẽ bỏ qua outbox; phải dùng IPublishEndpoint lấy từ scope. Bài 1 (dòng 473-474) làm đúng thứ tự, nên hai chỗ mâu thuẫn nhau.

  ```text
  // Bay gio ca hai nam trong MOT transaction
  await _db.SaveChangesAsync(ct);                        // lưu customer VÀ message
  await _bus.Publish(new CustomerCreated(id), ct);       // ghi vào bảng outbox
  ```

  - Sửa: Đổi thứ tự: `await _publishEndpoint.Publish(...)` rồi mới `await _db.SaveChangesAsync(ct)`, và tiêm IPublishEndpoint thay cho IBus. Thêm cảnh báo: dùng IBus.Publish là đi thẳng ra broker, bỏ qua outbox.
- **critical** · chính xác · [14.8-message-bus-intro.md:379](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.8-message-bus-intro.md): Trong outbox tự viết, `new LeadDaTao(lead.Id, lead.Email)` được serialize TRƯỚC SaveChangesAsync. Với khoá identity int, lead.Id lúc đó vẫn là 0, nên mọi message mang LeadId = 0 và consumer không bao giờ tìm thấy lead.

  ```text
  _db.Leads.Add(lead);
      // Message được ghi vào CÙNG database, trong CÙNG transaction
      _db.Outbox.Add(new TinNhanOutbox { ... NoiDung = JsonSerializer.Serialize(new LeadDaTao(lead.Id, lead.Email)),
  ```

  - Sửa: Trong transaction: SaveChanges lần 1 để lấy Id, thêm bản ghi outbox, SaveChanges lần 2, rồi Commit. Hoặc dùng Guid sinh phía client (Guid.CreateVersion7()) làm khoá. Giải thích rõ lý do.
- **major** · thực tế · [14.1-caching-fundamentals.md:468](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.1-caching-fundamentals.md): Mẫu 'làm mới sớm' dùng `_ = Task.Run(() => LamMoiAsync(khoa), ct)` trong request là fire-and-forget: có thể dùng DbContext scoped đã dispose sau khi request kết thúc, và mất exception. Biến `conLai` cũng không lấy được từ IMemoryCache (API không trả TTL còn lại). Bài không cảnh báo điều nào. 14.10 dòng 638-645 cũng có pattern tương tự.

  ```text
  if (conLai < ttl * 0.2)                        // còn dưới 20% thời gian sống
      _ = Task.Run(() => LamMoiAsync(khoa), ct); // làm mới ngầm, không chặn request
  ```

  - Sửa: Ghi rõ đây là pseudo-code. Lưu thời điểm tạo cùng giá trị (record CacheEntry&lt;T&gt;(T Value, DateTimeOffset CreatedAt)), làm mới qua IServiceScopeFactory hoặc một Channel, và cảnh báo về fire-and-forget trong ASP.NET Core.
- **major** · thực tế · [14.10-advanced-notes.md:172](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.10-advanced-notes.md): Ví dụ write-behind đọc HashGetAll rồi KeyDelete 'lead:views'. Mọi HINCRBY xảy ra giữa hai lệnh sẽ bị xoá mất, đúng loại race condition read-then-act mà chính bài đang dạy tránh, nhưng bài không cảnh báo.
  - Bằng chứng: `var entries = await db.HashGetAllAsync("lead:views"); ... await db.KeyDeleteAsync("lead:views");`
  - Sửa: Đổi tên key một cách nguyên tử trước khi đọc: `await db.KeyRenameAsync("lead:views", $"lead:views:flush:{Guid}")`, rồi đọc và xoá key tạm (hoặc dùng script Lua). Nêu rõ lý do.
- **major** · chính xác · [14.10-advanced-notes.md:466](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.10-advanced-notes.md): Bài nói với BoundedChannelFullMode.DropWrite thì `TryWrite` trả false. Sai: ở các chế độ Drop*, TryWrite/WriteAsync luôn thành công (trả true) và item bị vứt âm thầm; muốn biết item bị bỏ thì dùng callback itemDropped của CreateBounded. Ví dụ gom lô `ReadAllAsync(ct).Buffer(100, TimeSpan.FromSeconds(5))` cũng không có trong BCL hay System.Linq.Async, nên không biên dịch được.
  - Bằng chứng: `với 'DropWrite', 'TryWrite' trả 'false' và **không chặn** ... channel.Reader.ReadAllAsync(ct).Buffer(100, TimeSpan.FromSeconds(5))`
  - Sửa: Sửa: 'TryWrite vẫn trả true; dùng `Channel.CreateBounded(options, itemDropped: x => _dropped.Add(1))` để đếm'. Thay Buffer bằng vòng gom lô tự viết (ReadAsync, TryRead tới 100 item hoặc CancelAfter 5s), hoặc ghi rõ package cần cài.
- **major** · nhất quán · [14.11-mini-case-study.md:134](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.11-mini-case-study.md): Mức 3 dùng `TimeZone = TimeZoneInfo.Local` cho Hangfire, trong khi mục ngay sau đó giải thích container chạy UTC nên đây đúng là lỗi '8h thành 15h'. Phần kết bài lại khuyên đặt TZ=UTC cho mọi container, mâu thuẫn với `ENV TZ=Asia/Ho_Chi_Minh` ở dòng 611 cùng bài và ở 14.6 ('Đặt TZ tường minh trong container').
  - Bằng chứng: `new RecurringJobOptions { TimeZone = TimeZoneInfo.Local }); ... > **Đặt 'TZ=UTC' trong mọi container, và khai múi giờ nghiệp vụ tường minh ở mọi chỗ cần nó.**`
  - Sửa: Dùng `TimeZoneInfo.FindSystemTimeZoneById("Asia/Ho_Chi_Minh")` ở mức 3. Chọn một khuyến nghị TZ cho toàn module (nên là TZ=UTC và khai múi giờ nghiệp vụ tường minh), rồi sửa 14.6 dòng 719-726 và 14.11 dòng 607-612 cho khớp.
- **major** · cấu trúc · [14.13-review-and-assessment.md:3](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.13-review-and-assessment.md): Bài review có cấu trúc boilerplate y hệt 13.14: mục tiêu chung chung, tiêu đề '14.14.4 — Kiểm tra & Thực hành (100 điểm)' rỗng, quiz 5 câu với phương án vô lý (Thay thế Kestrel, GC gen0), 'Bài tập tổng hợp', 'Tự kiểm tra' và 'Kết luận' không có nội dung module. Lab không có lời giải. Yêu cầu 'invalidate cache của trang có customer đó' cũng không khả thi nếu không có tag.

  ```text
  ### 14.14.4 — Kiểm tra & Thực hành (100 điểm)
  
  ### 14.14.5 — Bối cảnh giáo trình ... D. Thay thế Kestrel
  ```

  - Sửa: Xoá các mục boilerplate. Viết quiz tình huống (stampede, khoá thiếu tenant, noeviction, BackgroundService chạy trùng, outbox, jitter). Đề Bài 1 nên dùng tag (HybridCache RemoveByTagAsync) và kèm repo hoặc lời giải mẫu cho 3 lab.
- **major** · nhất quán · [14.13-review-and-assessment.md:55](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.13-review-and-assessment.md): Lab dạy ngược lại module. DailyDigestJob gửi email cho mọi Manager trong vòng lặp với AutomaticRetry(Attempts = 2), nên khi retry sẽ gửi lại cho người đã nhận (không idempotent). Lab không khai múi giờ cho '8:00 AM' và lọc `l.CreatedAt.Date == yesterday` (không sargable). Bài 3 fallback `jobClient.Schedule(e => e.SendAsync(message))` truyền cả object vào job, trái quy tắc 'chỉ truyền id' của 14.6. Lab dùng Hangfire PostgreSQL trong khi cả module dùng SQL Server, và có entity Deal chưa từng xuất hiện trong mô hình CRM.
  - Bằng chứng: `[AutomaticRetry(Attempts = 2)] ... NewLeads = await db.Leads.CountAsync(l => l.CreatedAt.Date == yesterday), ... await jobClient.Schedule<IEmailService>(e => e.SendAsync(message), TimeSpan.FromMinutes(1));`
  - Sửa: Viết lại lời giải gợi ý: lọc theo khoảng [đầu ngày VN → UTC, cuối ngày), khoá idempotency theo (managerId, ngày), RecurringJobOptions với TimeZone Asia/Ho_Chi_Minh, fallback lưu email vào bảng hoặc outbox rồi enqueue theo id. Thống nhất storage SQL Server và dùng entity đã có (Lead/Customer).
- **major** · chính xác · [14.2-imemorycache.md:24](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.2-imemorycache.md): Bài nói không có SizeLimit thì 'cache chỉ bị dọn khi GC báo áp lực bộ nhớ'. Tài liệu ASP.NET Core ghi rõ MemoryCache KHÔNG giới hạn kích thước theo memory pressure. Chính Bài 1 của bài (dòng 422) và self-check (dòng 803) mâu thuẫn với nhau về điểm này.
  - Bằng chứng: `Không có giới hạn, cache chỉ bị dọn khi **GC báo áp lực bộ nhớ**`
  - Sửa: Sửa thành: 'Microsoft.Extensions.Caching.Memory không tự dọn theo áp lực bộ nhớ; không có SizeLimit thì chỉ mục hết hạn mới bị xoá'. Sửa self-check cho khớp.
- **major** · chính xác · [14.2-imemorycache.md:440](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.2-imemorycache.md): GetCurrentStatistics() trả null nếu chưa bật `TrackStatistics = true` trong MemoryCacheOptions, mà cấu hình 'an toàn tối thiểu' ngay trên không bật. Kết quả là log luôn ra rỗng. Tên meter cho metric sẵn có của .NET cũng chưa được nêu đúng điều kiện cần.
  - Bằng chứng: `var thongKe = ((MemoryCache)_cache).GetCurrentStatistics();`
  - Sửa: Thêm `o.TrackStatistics = true;` vào cấu hình. Kiểm chứng tên meter và điều kiện phát metric của MemoryCache trên .NET 10 rồi ghi rõ, nếu không chắc thì bỏ câu '.NET 9 phát metric sẵn'.
- **major** · chính xác · [14.3-idistributedcache-and-redis.md:397](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.3-idistributedcache-and-redis.md): `.AddSerializer<LeadDto, MessagePackSerializer<LeadDto>>()` dùng một kiểu không có sẵn: MessagePack-CSharp không cung cấp lớp nào cài IHybridCacheSerializer&lt;T&gt;, nên code không biên dịch. Công thức ngưỡng hoà vốn `Q > C × (1 + (1-p)) / p` cũng sai đại số; bỏ qua W thì điều kiện đúng là Q &gt; C/p, nên bảng ngưỡng bị lệch.

  ```text
  services.AddHybridCache()
          .AddSerializer<LeadDto, MessagePackSerializer<LeadDto>>(); ... Hoà vốn khi:  Q > C × (1 + (1-p)) / p
  ```

  - Sửa: Tự viết `sealed class MessagePackHybridSerializer<T> : IHybridCacheSerializer<T>` (khoảng 10 dòng) hoặc ghi rõ đây là lớp cần tự cài. Sửa công thức thành Q &gt; C/p (hoặc tính cả W: Q &gt; (C + (1-p)W)/p) và tính lại bảng ngưỡng.
- **major** · chính xác · [14.5-hybridcache-dotnet-9.md:168](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.5-hybridcache-dotnet-9.md): Phần tag mô tả RemoveByTagAsync 'hoạt động trên cả L1 và L2' và 'với keyspace lớn có thể chậm'. Theo docs, xoá theo tag là thao tác logic: nó không xoá giá trị nào, chỉ đánh dấu 'bỏ qua mọi entry tạo trước thời điểm này'. Các giá trị cũ vẫn nằm trong cache tới khi hết hạn, và không có chuyện chậm theo kích thước keyspace.

  ```text
  2. **Hoạt động trên cả L1 và L2**, và phát tán tới các instance khác nếu backend hỗ trợ.
  3. **Bản triển khai mặc định có giới hạn** — với keyspace rất lớn, xoá theo tag có thể chậm.
  ```

  - Sửa: Viết lại theo docs: tag invalidation là logical, có hiệu lực trên instance hiện tại và L2, các instance khác vẫn có thể trả L1 cũ tới LocalCacheExpiration. Có tag đặc biệt "*" để invalidate toàn bộ.
- **major** · chính xác · [14.5-hybridcache-dotnet-9.md:342](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.5-hybridcache-dotnet-9.md): Nhiều lời gọi HybridCache dùng tham số đặt tên `ct: ct`, nhưng tên tham số đúng là `cancellationToken`, nên code không biên dịch (dòng 342, 355, 394, 468, 469; 14.10 dòng 560, 638). Dòng 136-137 truyền ct ở vị trí thứ 3 (vị trí của HybridCacheEntryOptions), và dòng 597-598 truyền ở vị trí options, nên cũng lỗi biên dịch.
  - Bằng chứng: `new HybridCacheEntryOptions { Expiration = TimeSpan.FromMinutes(35) }, ct: ct);`
  - Sửa: Đổi mọi chỗ thành `cancellationToken: ct`. Biên dịch lại toàn bộ snippet trên .NET 10 trong một project mẫu.
- **major** · chính xác · [14.5-hybridcache-dotnet-9.md:349](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.5-hybridcache-dotnet-9.md): Bài khẳng định BackgroundService LamNongCacheJob 'chạy như một singleton (một leader trong cụm), chỉ có một lượt tính toán'. BackgroundService chạy trên MỌI instance; đây chính là lỗi mà 14.11 phân tích. 14.10 dòng 615 lại nói phải tự dùng khoá hoặc bầu leader.
  - Bằng chứng: `Và vì job chạy như một singleton (một leader trong cụm), chỉ có một lượt tính toán.`
  - Sửa: Sửa thành: 'BackgroundService chạy trên mọi pod; muốn chỉ một lượt thì dùng Hangfire recurring job, Quartz clustering hoặc khoá phân tán (xem 14.11)'.
- **major** · chính xác · [14.5-hybridcache-dotnet-9.md:593](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.5-hybridcache-dotnet-9.md): Bài nói bỏ từ khoá `static` thì 'trình biên dịch lại sinh closure và quay về cách A'. Sai: lambda không bắt biến ngoài thì vẫn được compiler cache delegate dù có `static` hay không; `static` chỉ để trình biên dịch cưỡng chế việc không bắt biến. CA1822 ('mark members as static') cũng không liên quan tới static lambda.
  - Bằng chứng: `Từ khoá 'static' trên lambda là bắt buộc để có hiệu quả này. Bỏ nó đi, trình biên dịch lại sinh closure`
  - Sửa: Sửa thành: 'static là hàng rào giúp chắc chắn không vô tình bắt biến; lambda không bắt biến thì vốn đã không cấp phát closure'. Bỏ tham chiếu CA1822.
- **major** · đầy đủ · [14.6-hangfire-background-jobs.md:36](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.6-hangfire-background-jobs.md): Module 14 không có hướng dẫn chuẩn bị môi trường cho Redis, SQL Server/PostgreSQL cho Hangfire, RabbitMQ và các package cần cài (Hangfire.AspNetCore, Hangfire.SqlServer, Microsoft.Extensions.Caching.StackExchangeRedis, AspNetCore.HealthChecks.Redis, Microsoft.Extensions.Http.Resilience, Quartz.Serialization.Json). Sinh viên tự học sẽ kẹt ngay ở bước đầu. Câu 'QueuePollInterval = TimeSpan.Zero bật cơ chế thông báo, giảm tải database' cũng không chính xác: SQL Server storage không có push notification.
  - Bằng chứng: `QueuePollInterval = TimeSpan.Zero,          // dùng thông báo, không poll`
  - Sửa: Thêm mục 'Chuẩn bị môi trường' ở README module 14 với docker-compose (redis, sqlserver, rabbitmq) và danh sách lệnh `dotnet add package`. Sửa chú thích QueuePollInterval theo docs Hangfire.SqlServer (Zero = polling rất ngắn, độ trễ thấp nhưng tăng tải truy vấn).
- **major** · chính xác · [14.6-hangfire-background-jobs.md:220](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.6-hangfire-background-jobs.md): Bài nói `ContinueJobWith` chạy job tiếp 'kể cả khi job cha thất bại'. Sai: mặc định của Hangfire là JobContinuationOptions.OnlyOnSucceededState. Muốn chạy cả khi thất bại phải khai OnAnyFinishedState, và job Failed vốn không được coi là 'finished'. Checklist dòng 270 cũng sai theo.
  - Bằng chứng: `'ContinueJobWith' chạy job tiếp theo **kể cả khi job cha thất bại**, trừ khi khai rõ:`
  - Sửa: Sửa thành: 'Mặc định chỉ chạy khi job cha Succeeded; dùng JobContinuationOptions.OnAnyFinishedState nếu muốn chạy cả khi job cha bị Deleted'. Sửa checklist cho khớp.
- **major** · chính xác · [14.6-hangfire-background-jobs.md:489](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.6-hangfire-background-jobs.md): Bài minh hoạ lỗi deserialize bằng thông điệp của System.Text.Json ('missing required properties'). Hangfire dùng Newtonsoft.Json; với record có positional constructor, Newtonsoft truyền null cho tham số TenantId thiếu, nên job chạy với TenantId = null mà không có exception. Lỗi thật còn nguy hiểm hơn và khác hẳn mô tả.

  ```text
  System.Text.Json.JsonException: JSON deserialization for type 'GuiEmailRequest'
  was missing required properties including: TenantId.
  ```

  - Sửa: Chạy thử thật với Hangfire và ghi output đúng: job chạy với TenantId null, có thể gửi sai tenant hoặc NullReference về sau. Nhấn mạnh rằng đây là lỗi im lặng, càng củng cố quy tắc chỉ truyền id.
- **major** · chính xác · [14.7-alternative-overview.md:149](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.7-alternative-overview.md): Bài khẳng định Hangfire 'không có khái niệm misfire' và 'không chọn được hành vi khác' (dòng 149, 348-369, 741, 778). Từ Hangfire 1.8, RecurringJobOptions có MisfireHandling với các chế độ Relaxed (mặc định), Strict (chạy bù từng lần lỡ) và Ignorable (bỏ qua).
  - Bằng chứng: `Hangfire không có khái niệm này: recurring job bị lỡ thì **chạy ngay khi server lên**, tương đương 'FireAndProceed'. Đơn giản hơn, nhưng không chọn được hành vi khác.`
  - Sửa: Cập nhật: Hangfire 1.8+ có `new RecurringJobOptions { MisfireHandling = MisfireHandlingMode.Strict/Ignorable }`. So sánh lại với Quartz và sửa bảng, phần giải thích kiến trúc 'lịch là một hàm' cùng self-check.
- **major** · chính xác · [14.7-alternative-overview.md:686](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.7-alternative-overview.md): Bài nói `.StartNow()` trên trigger cron giúp 'nạp lúc khởi động'. Với CronTrigger, StartNow chỉ đặt StartTime; lần kích hoạt đầu vẫn là mốc cron kế tiếp (00:05). Ví dụ DailyCalendar("17:30:00","08:00:00") cũng đặt khoảng thời gian vắt qua nửa đêm, Quartz không chấp nhận; cần dùng khoảng 08:00-17:30 với InvertTimeRange = true.

  ```text
  .StartNow()
      .WithCronSchedule("0 5 0 * * ?", ...)); ... 4. **Nạp lúc khởi động** (`StartNow`) ... new DailyCalendar("17:30:00", "08:00:00")
  ```

  - Sửa: Thêm một trigger riêng `.StartNow().WithSimpleSchedule(s => s.WithRepeatCount(0))` để chạy ngay khi khởi động, hoặc gọi trực tiếp trong IHostedService. Đổi calendar thành `new DailyCalendar("08:00:00","17:30:00") { InvertTimeRange = true, CalendarBase = lichLe }`.
- **major** · thực tế · [14.8-message-bus-intro.md:96](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.8-message-bus-intro.md): Bài hướng dẫn `dotnet add package MassTransit` mà không nhắc license: MassTransit v9 chuyển sang giấy phép thương mại, chỉ v8 còn mã nguồn mở. Bài cũng gợi ý MediatR, thư viện đã thương mại từ v13. Ngoài ra bài không có hướng dẫn chạy RabbitMQ (docker), dù mọi bài tập đều cần nó.

  ```text
  dotnet add package MassTransit
  dotnet add package MassTransit.RabbitMQ
  ```

  - Sửa: Ghim phiên bản (`--version 8.*`) kèm ghi chú license, hoặc giới thiệu lựa chọn miễn phí (Wolverine, Rebus, RabbitMQ.Client thuần). Thêm `docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:4-management` và hướng dẫn mở UI quản trị.
- **major** · chính xác · [14.8-message-bus-intro.md:397](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.8-message-bus-intro.md): OutboxDispatcher là BackgroundService (singleton) nhưng dùng thẳng `_db` (DbContext scoped). Cách này sẽ lỗi DI (captive dependency, scope validation trong Development), hoặc giữ một DbContext sống mãi và tích luỹ entity, đúng anti-pattern mà 13.2 cảnh báo.
  - Bằng chứng: `public class OutboxDispatcher : BackgroundService { ... var chuaGui = await _db.Outbox`
  - Sửa: Tiêm IServiceScopeFactory hoặc IDbContextFactory&lt;CrmDbContext&gt;, tạo scope hoặc context mới mỗi vòng lặp, và thêm try/catch quanh vòng lặp.
- **major** · chính xác · [14.9-idempotency-and-retry.md:52](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.9-idempotency-and-retry.md): Mẫu idempotency key ở phần lý thuyết là SELECT rồi tạo đơn rồi INSERT bản ghi idempotency. Hai request đồng thời cùng thấy null và cùng tạo đơn; unique trên Key chỉ chặn được bản ghi idempotency SAU KHI đơn đã tạo (nếu _orders.CreateAsync tự SaveChanges). Đây đúng là mẫu kiểm-tra-rồi-hành-động mà Bài 3 nói là không đủ.
  - Bằng chứng: `var existing = await _db.IdempotencyRecords.FirstOrDefaultAsync(r => r.Key == idempotencyKey, ct); ... var order = await _orders.CreateAsync(request, ct);`
  - Sửa: Đổi sang thứ tự 'INSERT bản ghi idempotency trạng thái DangXuLy trước (unique), xử lý, rồi cập nhật kết quả', giống Bài 3. Đảm bảo tạo đơn và cập nhật bản ghi nằm trong cùng một SaveChanges hoặc transaction.
  - Phản biện (adjusted): Có thật nhưng cần chỉnh mô tả. Comment ở dòng 69 ghi 'CÙNG transaction với tạo đơn hàng'. Nếu `_orders.CreateAsync` chỉ Add vào cùng _db mà không SaveChanges thì unique trên Key làm request thứ hai thất bại toàn bộ, không tạo đơn trùng. Request đó nhận DbUpdateException chưa xử lý (500) thay vì kết quả đã lưu. Đơn chỉ bị trùng khi CreateAsync tự SaveChanges, mà bài không nói rõ. Ngoài ra `Response = Serialize(order)` chạy trước SaveChanges nên Id có thể bằng 0. Nên đổi sang mẫu insert-trước như Bài 3 và bắt lỗi trùng để trả lại kết quả đã lưu.
- **minor** (ban đầu major) · nhất quán · [14.1-caching-fundamentals.md:35](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.1-caching-fundamentals.md): Bài đặt ngưỡng 'tỷ lệ trúng &lt; 50% gần như vô ích', nhắc lại ở checklist, self-check, kết luận và 14.12. Nhưng chính Bài 1 kết luận giữ cache dashboard trúng 53% và nói 'truy vấn &gt; 1 giây: trúng 30% đã đáng giữ'. Sinh viên nhận hai quy tắc ngược nhau.
  - Bằng chứng: `< 50%   : gan nhu vo ich, can xem lai ... Truy vấn > 1 giây:    trúng 30% đã đáng giữ`
  - Sửa: Bỏ ngưỡng cứng 50% ở phần lý thuyết, thay bằng quy tắc của Bài 1 (tiết kiệm = hit rate × chi phí miss so với chi phí cache). Sửa checklist, self-check và 14.12 cho khớp.
  - Phản biện (adjusted): Mâu thuẫn có thật giữa ngưỡng '&lt; 50% gần như vô ích' ở dòng 35 và Bài 1 ('trúng 30% đã đáng giữ' ở dòng 297). Tuy vậy, bảng ở dòng 35 là heuristic định tính chứ không phải khẳng định kỹ thuật sai, nên hạ xuống minor. Cách sửa: thêm vế 'tuỳ chi phí miss' vào bảng hoặc dẫn sang Bài 1.
- **minor** · chính xác · [14.1-caching-fundamentals.md:560](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.1-caching-fundamentals.md): Bản sửa 'cache dữ liệu thô cho cả tenant' gọi IMemoryCache.GetOrCreateAsync mà không đặt expiration nào, nên mục sống vô hạn, trái với chính quy tắc 'mọi cache phải có TTL'. Code còn cache entity EF Core, trái với 14.2. Cách 2 (Task&lt;T&gt; in-flight, dòng 129-139) không an toàn: GetOrAdd có thể chạy valueFactory nhiều lần, và finally TryRemove có thể chạy trước khi Task được thêm vào.

  ```text
  var tatCa = await _cache.GetOrCreateAsync(
      $"lead:tenant={tenantId}",
      async _ => await _db.Leads.Where(l => l.TenantId == tenantId).ToListAsync(ct));
  ```

  - Sửa: Thêm `e.AbsoluteExpirationRelativeToNow = ...; e.Size = ...` và projection sang DTO. Với cách 2, dùng `ConcurrentDictionary<string, Lazy<Task<T>>>` hoặc chỉ dẫn sang HybridCache.
- **minor** · nhất quán · [14.10-advanced-notes.md:99](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.10-advanced-notes.md): 14.10 xếp 'gửi email thông báo' vào loại việc được phép mất nên dùng Channel, nhưng ở Bài 2 cùng bài và ở 14.6/14.8, gửi email lại được coi là việc không được mất và cần hàng đợi bền.
  - Bằng chứng: `Dùng 'Channel' cho việc **được phép mất** — gửi email thông báo, ghi log, làm nóng cache.`
  - Sửa: Đổi ví dụ thành 'ghi log/metric theo lô, làm nóng cache, gom thống kê'. Email nghiệp vụ dùng Hangfire hoặc outbox.
- **minor** · cấu trúc · [14.11-mini-case-study.md:152](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.11-mini-case-study.md): Nội dung timezone của recurring job được giảng lại gần như nguyên văn ở ba nơi (14.6 Bài 3, 14.11 mục 14.12.5 và Bài 3), với các lời khuyên lệch nhau: ID Windows hay IANA, TZ container. Các bài 'Mini case study' và 'Ví dụ thực tế nhanh' có tiêu đề không nói nội dung.
  - Bằng chứng: `### 14.12.5 — Cái bẫy: múi giờ ... TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time")`
  - Sửa: Giữ một bài chuẩn về timezone (14.6 Bài 3), ở các bài khác chỉ tóm tắt một dòng kèm link. Dùng thống nhất ID IANA "Asia/Ho_Chi_Minh". Đổi tiêu đề 14.11/14.12 theo sự cố cụ thể (ví dụ 'Case study: 36.000 email khi scale lên 3 pod').
- **minor** · dễ hiểu · [14.2-imemorycache.md:3](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.2-imemorycache.md): Văn bản trộn nhiều comment tiếng Việt không dấu ("// DUNG — cache DTO bat bien", "// SAI — cache lon vo han", "dich sang SQL") với comment có dấu, và lạm dụng thuật ngữ tiếng Anh không giải thích (stampede, backpressure, single-flight, thundering herd) ở lần đầu xuất hiện. Hiện tượng này có ở hầu hết file của cả hai module.
  - Bằng chứng: `// SAI — cache lon vo han ... // DUNG ... // Chong stampede`
  - Sửa: Chuẩn hoá mọi comment code sang tiếng Việt có dấu. Ở lần xuất hiện đầu của mỗi thuật ngữ, thêm định nghĩa một câu kèm từ tiếng Việt, ví dụ 'cache stampede (dồn tải khi cache hết hạn)'.
- **minor** · chính xác · [14.3-idistributedcache-and-redis.md:57](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.3-idistributedcache-and-redis.md): Bài khuyên đặt SyncTimeout thấp để 'thất bại nhanh', nhưng mọi code trong module đều dùng API async. Với StackExchange.Redis, thao tác async chịu AsyncTimeout chứ không chịu SyncTimeout. Lỗi lặp lại ở dòng 693 và 14.12 dòng 164.
  - Bằng chứng: `SyncTimeout = 1000,                   // thất bại NHANH, đừng chờ lâu`
  - Sửa: Thêm `AsyncTimeout = 1000` (và giữ SyncTimeout nếu có gọi đồng bộ), giải thích sự khác nhau giữa hai timeout.
- **minor** (ban đầu major) · thực tế · [14.3-idistributedcache-and-redis.md:230](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.3-idistributedcache-and-redis.md): Ví dụ rate limit gọi INCR rồi mới KeyExpire ở lệnh riêng. Nếu tiến trình chết giữa hai lệnh, khoá không có TTL nên người dùng bị chặn vĩnh viễn. Bài đưa ra như mẫu chuẩn mà không cảnh báo. Ví dụ tag set (dòng 263) cũng bỏ qua InstanceName "crm:" mà IDistributedCache tự thêm, nên KeyDelete theo tên trong set sẽ không xoá đúng khoá.

  ```text
  var requests = await db.StringIncrementAsync($"rate:{userId}");
  if (requests == 1) await db.KeyExpireAsync($"rate:{userId}", TimeSpan.FromMinutes(1));
  ```

  - Sửa: Dùng transaction hoặc Lua (INCR + EXPIRE NX), hoặc khuyên dùng rate limiter có sẵn (System.Threading.RateLimiting hay RedisRateLimiting). Ghi chú: khi trộn IDistributedCache và IConnectionMultiplexer phải tự thêm tiền tố InstanceName.
  - Phản biện (adjusted): Có thật nhưng hạ xuống minor. INCR rồi EXPIRE tách rời là mẫu rất phổ biến, và khe hở chỉ xảy ra khi tiến trình chết đúng giữa hai lệnh. Nên thêm một câu cảnh báo kèm cách sửa (EXPIRE NX trong transaction hoặc Lua), hoặc khuyên dùng rate limiter có sẵn. Vấn đề InstanceName chỉ phát sinh nếu cacheKey trong set là khoá của IDistributedCache. Ví dụ ở dòng 263 không nói rõ điều đó, nên chỉ cần thêm ghi chú.
- **minor** · nhất quán · [14.9-idempotency-and-retry.md:177](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.9-idempotency-and-retry.md): Bài nói 'DelaysInSeconds cố định của Hangfire khiến mọi job thất bại cùng lúc retry cùng lúc', trong khi 14.6 lại khuyên dùng `[AutomaticRetry(Attempts = 3, DelaysInSeconds = [60, 300, 900])]` mà không nhắc jitter. Mặc định của Hangfire vốn có yếu tố ngẫu nhiên.
  - Bằng chứng: `Với hàng đợi và background job cũng vậy: 'DelaysInSeconds' cố định của Hangfire khiến mọi job thất bại cùng lúc retry cùng lúc.`
  - Sửa: Ở 14.6, thêm ghi chú về jitter (dùng DelayInSecondsByAttemptFunc có thêm ngẫu nhiên). Ở 14.9, dẫn lại ví dụ đó để hai bài thống nhất.
- **minor** (ban đầu major) · nhất quán · [14.9-idempotency-and-retry.md:242](../lessons/stage-04-database-production/module-14-caching-background-jobs/14.9-idempotency-and-retry.md): Mục 14.10.6 và self-check nói 'ba tầng mỗi tầng retry 3 lần = 27 request', nhưng Bài 2 tính đúng là 4 × 4 × 4 = 64 (tính cả lần gọi đầu). Phần lý thuyết khuyên 'retry ở tầng ngoài cùng hoặc tầng gọi trực tiếp', còn Bài 2 khuyên 'retry ở tầng gần nguyên nhân nhất (trong cùng)'. Hai chỗ mâu thuẫn trong cùng một bài.
  - Bằng chứng: `-> Service B: 27 request cho MOT request goc ... Tổng số lần chạm database = 4 × 4 × 4 = 64`
  - Sửa: Thống nhất công thức (1 + retry)^số tầng và sửa 27 thành 64 ở lý thuyết và self-check. Chọn một nguyên tắc: retry ở tầng gọi trực tiếp phụ thuộc hay lỗi, các tầng ngoài không retry.
  - Phản biện (adjusted): Hạ xuống minor. '27' có thể hiểu là 3 lần thử mỗi tầng (3^3), còn Bài 2 đếm 1 + 3 lần thử (4^3 = 64). Đây là chuyện cách dùng từ, chỉ cần định nghĩa rõ 'retry 3 lần' rồi thống nhất công thức. Câu lý thuyết ở dòng 245 ('ngoài cùng hoặc tầng gọi trực tiếp dịch vụ hay lỗi') và Bài 2 ('tầng trong cùng') chỉ mâu thuẫn một phần, vì vế thứ hai của câu lý thuyết đã trùng ý với Bài 2. Nên bỏ vế 'ngoài cùng'.

### Module 15 - Docker + Deployment

- **critical** · chính xác · [15.2-dockerfile-for-aspnet-core.md:114](../lessons/stage-04-database-production/module-15-docker-deployment/15.2-dockerfile-for-aspnet-core.md): Image .NET 8+ thường (aspnet:8.0/9.0/10.0, Debian/Ubuntu) có sẵn user `app` nhưng mặc định VẪN chạy bằng root. Chỉ image chiseled mặc định non-root. UID của `app` là 1654 ($APP_UID), không phải 64198. Chính 15.11 Bài 2 (dòng 440) cho thấy aspnet:9.0 chạy root, nên các bài đang tự mâu thuẫn.
  - Bằng chứng: `**Từ .NET 8, image chính thức chạy non-root sẵn** với user 'app' (UID 64198)`
  - Sửa: Viết lại: 'Từ .NET 8 image có sẵn user app (UID 1654, biến $APP_UID). Image chiseled chạy non-root mặc định; image thường phải thêm `USER $APP_UID`.' Sửa tương ứng ở tóm tắt dòng 3, comment dòng 51, checklist dòng 231 và tự kiểm tra dòng 772.
- **major** · đầy đủ · [15.1-docker-fundamentals.md:5](../lessons/stage-04-database-production/module-15-docker-deployment/15.1-docker-fundamentals.md): Module không có phần chuẩn bị môi trường: cài Docker Desktop/WSL2 trên Windows, lưu ý Mac Apple Silicon không chạy native image SQL Server (cần Rosetta hoặc dùng PostgreSQL), cách có VPS/Azure (Azure for Students). Bài cũng không nêu kiến thức tiên quyết.
  - Bằng chứng: `## Mục tiêu bài học ... (không có mục 'Chuẩn bị' hay 'Kiến thức tiên quyết')`
  - Sửa: Thêm mục 'Chuẩn bị môi trường' và 'Kiến thức tiên quyết' ở 15.1 (hoặc bài 15.0): lệnh cài, `docker run hello-world`, giới hạn RAM WSL2 (.wslconfig), phương án PostgreSQL cho máy yếu hoặc ARM, và lựa chọn VPS hay Azure miễn phí cho bài 15.5/15.7.
- **major** · chính xác · [15.1-docker-fundamentals.md:49](../lessons/stage-04-database-production/module-15-docker-deployment/15.1-docker-fundamentals.md): Toàn module dùng image và SDK .NET 9 (sdk:9.0, aspnet:9.0-noble-chiseled, dotnet-version '9.0.x', 'đo thật trên .NET 9.0.203'). Tại 10/2026, .NET 9 STS hết hoặc sắp hết hỗ trợ và .NET 10 là LTS hiện hành.
  - Bằng chứng: `FROM mcr.microsoft.com/dotnet/aspnet:9.0     # layer 1`
  - Sửa: Thay hàng loạt sang 10.0 (sdk:10.0, aspnet:10.0-noble-chiseled, aspire-dashboard 13.x, setup-dotnet 10.0.x). Cập nhật số liệu đo hoặc ghi rõ phiên bản đã đo. 9.0.203 là phiên bản SDK, không phải runtime.
- **major** (ban đầu critical) · chính xác · [15.1-docker-fundamentals.md:163](../lessons/stage-04-database-production/module-15-docker-deployment/15.1-docker-fundamentals.md): Biến môi trường cấu hình GC của .NET được đọc theo hệ hex. `DOTNET_GCHeapHardLimitPercent=75` nghĩa là 0x75 = 117%, không phải 75%. Bài 15.12 tự nói điều này nhưng 15.1 và 15.12 (dòng 124) lại dạy giá trị sai.
  - Bằng chứng: `DOTNET_GCHeapHardLimitPercent=75`
  - Sửa: Đổi thành `DOTNET_GCHeapHardLimitPercent=0x4B` (75%), hoặc dùng `System.GC.HeapHardLimitPercent: 75` trong runtimeconfig.json (thập phân). Thêm một dòng giải thích 'biến môi trường DOTNET_GC* là hex' ngay tại đây. Sửa luôn 15.12 dòng 124.
  - Phản biện (adjusted): Lỗi có thật: 15.1 dòng 163 ghi DOTNET_GCHeapHardLimitPercent=75. Biến môi trường DOTNET_GC* được đọc theo hệ hex, nên 0x75 = 117%. Chính 15.12 dòng 329-333 nói rõ điều này. Tuy vậy, GC bỏ qua giá trị phần trăm nằm ngoài khoảng (0,100), và khi container có memory limit thì mặc định đã là 75%. Hậu quả thực tế là cấu hình bị bỏ qua một cách âm thầm, không làm hỏng ứng dụng. Vì vậy hạ xuống major. Cách sửa giữ nguyên: dùng 0x4B hoặc runtimeconfig System.GC.HeapHardLimitPercent=75 (thập phân), và thêm ghi chú 'biến môi trường là hex'.
- **major** · chính xác · [15.10-dotnet-aspire-dotnet-8-plus.md:148](../lessons/stage-04-database-production/module-15-docker-deployment/15.10-dotnet-aspire-dotnet-8-plus.md): Nội dung Aspire đã lỗi thời. Từ 2025, '.NET Aspire' đổi tên thành Aspire (13.x, aspire.dev, CLI `aspire`) và có `aspire publish/deploy` với Docker Compose publisher (AddDockerComposeEnvironment). Aspirate đã ngừng phát triển. Vì vậy câu 'Aspire không giúp gì nếu triển khai bằng Compose' không còn đúng. Cổng dashboard mặc định cũng không cố định là 15888 (Project 3 lại ghi 15000).
  - Bằng chứng: `Nếu bạn triển khai lên VPS bằng Docker Compose, Aspire **không giúp gì** ở khâu đó`
  - Sửa: Cập nhật theo Aspire 13: giới thiệu `aspire publish` sinh compose.yaml, `aspire deploy`. Bỏ Aspirate. Ghi cổng dashboard lấy từ console hoặc launchSettings. Đổi tiêu đề '(.NET 8+)' và đồng bộ Project 3 mục 10.
- **major** (ban đầu critical) · chính xác · [15.10-dotnet-aspire-dotnet-8-plus.md:336](../lessons/stage-04-database-production/module-15-docker-deployment/15.10-dotnet-aspire-dotnet-8-plus.md): HybridCache.RemoveAsync chỉ xoá L2 và L1 của instance hiện tại. Các instance khác vẫn giữ L1 cũ cho tới khi LocalCacheExpiration hết hạn, vì chưa có backplane invalidation. Vì vậy kết quả '90/90 đúng' là sai và dạy hiểu nhầm về cache đa instance.

  ```text
  await _cache.RemoveAsync($"config:{key}", ct);     // xoá ở MỌI instance
  ...
       90 100          <- cả 90 lần đều đúng
  ```

  - Sửa: Ghi rõ: 'RemoveAsync không xoá L1 của instance khác. Dữ liệu cũ tồn tại tối đa LocalCacheExpiration (30s)'. Muốn nhất quán ngay thì dùng IDistributedCache/Redis không có L1, hoặc tự làm invalidation qua Redis pub/sub. Sửa output mẫu cho đúng.
  - Phản biện (adjusted): Đúng. Dòng 323 ghi 'đồng bộ tự động', dòng 336 ghi 'xoá ở MỌI instance', và output khẳng định 90/90 đúng. HybridCache (Microsoft.Extensions.Caching.Hybrid) hiện chưa có backplane invalidation. RemoveAsync chỉ xoá L2 và L1 của instance gọi nó, các instance khác giữ L1 tới khi LocalCacheExpiration (30s) hết hạn. Đây là dạy sai mô hình cache đa instance, nhưng nằm trong bài Aspire/tooling nên để major. Cách sửa giữ nguyên.
- **major** · chính xác · [15.12-mini-case-study.md:53](../lessons/stage-04-database-production/module-15-docker-deployment/15.12-mini-case-study.md): Case study bỏ qua DATAS (Dynamic Adaptation To Application Sizes), được bật mặc định cho Server GC từ .NET 9. DATAS tự điều chỉnh số heap theo tải, nên kịch bản '32 heap, RSS 1,9GB' chủ yếu tái hiện trên .NET ≤ 8 hoặc khi tắt DATAS. Ngoài ra khi container có memory limit, GC mặc định đặt HeapHardLimit 75%, nên câu 'không thấy lý do gì phải thu gom' không chính xác. Dòng 553: System.GC.RetainVM mặc định là false, không phải 'mặc định giữ lại'.
  - Bằng chứng: `Mặc định .NET **giữ lại** vùng nhớ ảo đã dùng để tái sử dụng ... Đặt 'RetainVM: false'`
  - Sửa: Thêm mục DATAS (.NET 9/10): cách kiểm tra, khi nào vẫn nên dùng Workstation GC. Ghi rõ case áp dụng cho .NET 8 hoặc khi không đặt cpu limit (khoá đang khuyên bỏ cpu limit, điều này làm ProcessorCount bằng số core node). Sửa câu về RetainVM.
- **major** (ban đầu critical) · nhất quán · [15.12-mini-case-study.md:124](../lessons/stage-04-database-production/module-15-docker-deployment/15.12-mini-case-study.md): Cùng một bài vừa khuyên đặt giá trị '75' vừa nói ở dòng 329-333 rằng '75' = 117% là sai.
  - Bằng chứng: `value: "75"                # dung toi da 75% memory limit`
  - Sửa: Đổi thành `value: "0x4B"`, đồng bộ với dòng 326 và 15.9 dòng 421.
  - Phản biện (adjusted): Đã kiểm tra: dòng 124 ghi value "75", còn dòng 326-333 cùng bài lại ghi "0x4B" và nói '75' = 117% là sai. Đây là mâu thuẫn ngay trong bài, có thật. Hạ xuống major vì cùng lý do với #0: giá trị không hợp lệ bị GC bỏ qua và mặc định 75% vẫn áp dụng. Sửa thành "0x4B".
- **major** (ban đầu critical) · chính xác · [15.13-quick-real-world-example.md:62](../lessons/stage-04-database-production/module-15-docker-deployment/15.13-quick-real-world-example.md): Từ .NET 6, HostOptions.ShutdownTimeout mặc định là 30 giây. Mức 5 giây chỉ đúng với .NET Core 3.x/5.
  - Bằng chứng: `Nhưng thời gian chờ mặc định chỉ **5 giây**`
  - Sửa: Sửa thành 'mặc định 30 giây (từ .NET 6)'. Nhấn mạnh rằng phải đặt nó nhỏ hơn terminationGracePeriodSeconds (mặc định cũng là 30s) trừ đi preStop.
  - Phản biện (adjusted): Đúng: từ .NET 6, HostOptions.ShutdownTimeout mặc định là 30 giây. 5 giây là mặc định của .NET Core 3.x/5. Đây là sai số liệu, không làm hỏng hệ thống, nên hạ xuống major. Cách sửa giữ nguyên.
- **major** · nhất quán · [15.14-review-and-assessment.md:50](../lessons/stage-04-database-production/module-15-docker-deployment/15.14-review-and-assessment.md): Bài review yêu cầu những điều mà các bài trước dạy là sai: 'HTTPS trong Kestrel' (15.2/15.5 nói TLS kết thúc ở proxy), tag `latest` (15.1/15.6 cấm), secret dùng '.env' (15.4 nói không an toàn), 'docker inspect thấy secret trong image layer' (layer xem bằng docker history). Seq chưa từng được dạy trong module. Có heading rỗng, boilerplate 'Bài tập tổng hợp' và kết luận rỗng, không có lời giải hay tiêu chí cho 3 bài thực hành.
  - Bằng chứng: `3. **HTTPS**: cấu hình Kestrel với HTTPS trong production.`
  - Sửa: Viết lại yêu cầu cho khớp module: TLS ở Nginx/Caddy, tag sha, Docker secret hoặc AddKeyPerFile, kiểm tra bằng docker history. Seq là tuỳ chọn có link bài 8.7. Thêm tiêu chí chấm từng bước và lời giải tham khảo. Xoá boilerplate.
  - Phản biện (adjusted): Phần lớn đúng: Seq chỉ dạy ở bài 8.7, không có trong module 15. Yêu cầu dùng '.env' cho secret và 'docker inspect thấy secret trong image layer' (dòng 51) mâu thuẫn với 15.4. Có boilerplate và không có tiêu chí chấm. Hai chỗ cần chỉnh nhẹ: mục HTTPS (dòng 50) đã có thêm phương án nginx terminate SSL, và dòng 36 tag cả sha lẫn latest. Đẩy thêm latest không sai hẳn, chỉ cần nói rõ deploy dùng tag sha.
- **major** (ban đầu critical) · chính xác · [15.3-docker-compose.md:157](../lessons/stage-04-database-production/module-15-docker-deployment/15.3-docker-compose.md): `Password_File` không phải keyword của SqlClient nên chuỗi kết nối ném 'Keyword not supported'. Đoạn C# ngay sau lại đọc biến DB_PASSWORD_FILE và thay '{PASSWORD}', không khớp với YAML. Bài còn khẳng định '.NET không tự đọc file secret' trong khi có sẵn provider Key-per-file.
  - Bằng chứng: `ConnectionStrings__Default=Server=sqlserver;...;Password_File=/run/secrets/db_password`
  - Sửa: Dạy `builder.Configuration.AddKeyPerFile("/run/secrets", optional: true)` (gói Microsoft.Extensions.Configuration.KeyPerFile), đặt tên file secret `ConnectionStrings__Default`. Bỏ ví dụ Password_File. Sửa đồng bộ 15.4 (dòng 66-87, 863), chỗ tự viết lại provider này.
  - Phản biện (adjusted): Đã xác nhận ở dòng 157: Password_File không phải keyword của SqlClient (sẽ ném 'Keyword not supported'). Đoạn C# đọc DB_PASSWORD_FILE và '{PASSWORD}' không khớp với YAML. Câu '.NET không tự đọc file secret' bỏ qua provider KeyPerFile. Chỉnh mức độ xuống major vì lỗi biểu hiện rõ ngay khi chạy và 15.4 đã dạy cách đúng (dù tự viết lại provider). Cách sửa giữ nguyên: AddKeyPerFile, kèm đồng bộ 15.4.
- **major** · chính xác · [15.4-environment-and-secrets.md:109](../lessons/stage-04-database-production/module-15-docker-deployment/15.4-environment-and-secrets.md): File tạo rồi xoá trong CÙNG một lệnh RUN không nằm lại ở layer nào. Câu '=&gt; layer TRƯỚC vẫn chứa /tmp/key' sai, và mâu thuẫn với dòng 352 của chính bài (ghép && trong một RUN để file không tồn tại ở layer nào). Rủi ro thật ở ví dụ này là `$SECRET` (từ ARG) hiện trong docker history.

  ```text
  RUN echo $SECRET > /tmp/key && use-it && rm /tmp/key
  # => layer TRƯỚC vẫn chứa /tmp/key
  ```

  - Sửa: Tách hai ví dụ: (a) RUN tạo file, RUN sau mới xoá thì layer trước còn file; (b) cùng RUN thì file không còn, nhưng giá trị ARG vẫn lộ qua docker history. Kết luận vẫn là dùng --mount=type=secret.
- **major** · chính xác · [15.4-environment-and-secrets.md:669](../lessons/stage-04-database-production/module-15-docker-deployment/15.4-environment-and-secrets.md): OptionsFactory chạy tất cả validator. Khi SecretKey null, lambda `o.SecretKey.Length` ném NullReferenceException chứ không ra thông báo DataAnnotation như output mẫu. Dòng 194 (`Encoding.UTF8.GetByteCount(o.SecretKey)`) có lỗi tương tự. Dòng 820: `GetRequiredService<IOptions<JwtOptions>>()` không truy cập `.Value` nên không validate gì, và ValidateOnStart chỉ chạy khi host Start.
  - Bằng chứng: `.Validate(o => o.SecretKey.Length >= 32, "Jwt:SecretKey phải có ít nhất 32 ký tự")`
  - Sửa: Dùng `o => o.SecretKey is { Length: >= 32 }` và `o => o.SecretKey is not null && Encoding.UTF8.GetByteCount(o.SecretKey) >= 32`. Ở chế độ --validate-config-only, gọi `app.Services.GetRequiredService<IOptions<JwtOptions>>().Value` trong try/catch OptionsValidationException.
- **major** · đầy đủ · [15.5-linux-vps-deployment.md:22](../lessons/stage-04-database-production/module-15-docker-deployment/15.5-linux-vps-deployment.md): Bài chạy `usermod -aG sudo,docker deploy` trong khi chưa có bước cài Docker Engine trên VPS (lệnh sẽ lỗi vì nhóm docker chưa tồn tại). Bài cũng không cảnh báo rằng nhóm docker tương đương quyền root.
  - Bằng chứng: `sudo adduser deploy && sudo usermod -aG sudo,docker deploy`
  - Sửa: Thêm bước cài Docker Engine theo docs.docker.com (apt repo chính thức, docker compose plugin) trước khi thêm user vào nhóm. Ghi chú 'nhóm docker = root'.
- **major** (ban đầu critical) · chính xác · [15.5-linux-vps-deployment.md:116](../lessons/stage-04-database-production/module-15-docker-deployment/15.5-linux-vps-deployment.md): Trong kịch bản của khoá, Nginx chạy trên host còn API chạy trong container Docker (publish 127.0.0.1:8080). Khi đó RemoteIpAddress mà container thấy là IP gateway của bridge Docker (172.x.x.x), không phải 127.0.0.1. Vì vậy KnownProxies=127.0.0.1 không khớp, và từ 8.0.17/9.0.6 middleware bỏ qua header từ proxy lạ. Kết quả là vẫn mất scheme/IP thật. Ngoài ra trên .NET 10, KnownNetworks và Microsoft.AspNetCore.HttpOverrides.IPNetwork đã obsolete (ASPDEPR005), thay bằng KnownIPNetworks và System.Net.IPNetwork.
  - Bằng chứng: `options.KnownProxies.Add(IPAddress.Parse("127.0.0.1"));   // CHI tin Nginx cuc bo`
  - Sửa: Giải thích sự khác biệt giữa app chạy trên host và app chạy trong container. Với container, thêm `o.KnownIPNetworks.Add(System.Net.IPNetwork.Parse("172.16.0.0/12"))`, hoặc đặt subnet cố định cho network compose rồi tin đúng subnet đó. Thêm bước kiểm chứng bằng log RemoteIpAddress. Đổi KnownNetworks/IPNetwork ở dòng 687 và 691 sang API .NET 10.
  - Phản biện (adjusted): Ý chính đúng. API chạy trong container và publish 127.0.0.1:8080, nên khi Nginx trên host kết nối tới, container thấy IP gateway của bridge (172.x) chứ không phải 127.0.0.1. Vì vậy KnownProxies=127.0.0.1 không khớp và header X-Forwarded-* bị bỏ qua. KnownNetworks/IPNetwork bị obsolete trên .NET 10 (ASPDEPR005) cũng đúng (dòng 687, 691). Chi tiết 'từ 8.0.17/9.0.6' thì không cần cho lập luận: header từ proxy lạ vốn đã luôn bị bỏ qua, nên bỏ chi tiết này khỏi mô tả. Hậu quả là mất scheme và IP thật, có thể gây redirect loop hoặc rate limit sai. Đây là lỗi nghiêm trọng nhưng phát hiện được khi kiểm thử, nên để major.
- **major** (ban đầu critical) · chính xác · [15.5-linux-vps-deployment.md:166](../lessons/stage-04-database-production/module-15-docker-deployment/15.5-linux-vps-deployment.md): Script deploy chạy `docker compose pull` TRƯỚC khi sửa TAG trong .env, nên kéo lại image cũ chứ không phải image mới. Ý 'pull trước để lỗi mạng không làm chết dịch vụ' vì thế không đạt được.

  ```text
  # 2. Kéo image TRƯỚC khi dừng gì
  docker compose pull
  
  # 3. Đổi tag và khởi động
  sed -i "s/^TAG=.*/TAG=$TAG/" .env
  ```

  - Sửa: Đổi thứ tự: sed TAG trước rồi `docker compose -f compose.yaml -f compose.prod.yaml pull`, hoặc `TAG=$TAG docker compose ... pull`. Nếu pull lỗi thì khôi phục TAG cũ trước khi exit.
  - Phản biện (adjusted): Thứ tự sai là có thật: pull chạy trước khi sed TAG, và lệnh pull không có -f compose.prod.yaml. Tuy nhiên `docker compose up -d` vẫn tự pull image mới nếu thiếu, nên deploy không hỏng. Chỉ mất lợi ích 'pull trước để lỗi mạng không ảnh hưởng dịch vụ'. Vì vậy hạ xuống major. Cách sửa: sed TAG trước, rồi `docker compose -f compose.yaml -f compose.prod.yaml pull`, nếu lỗi thì khôi phục TAG cũ.
- **major** · chính xác · [15.5-linux-vps-deployment.md:194](../lessons/stage-04-database-production/module-15-docker-deployment/15.5-linux-vps-deployment.md): Image có `ENTRYPOINT ["dotnet","CrmApi.dll"]`, nên `docker compose run api dotnet CrmApi.dll --migrate` ghép thành `dotnet CrmApi.dll dotnet CrmApi.dll --migrate`. Cờ `--migrate` cũng chưa được cài đặt ở đâu trong khoá.
  - Bằng chứng: `docker compose run --rm api dotnet CrmApi.dll --migrate`
  - Sửa: Dùng `docker compose run --rm api --migrate` và hướng dẫn xử lý args trong Program.cs. Tốt hơn là dùng migration bundle (`dotnet ef migrations bundle`) như Project 3 đã nhắc.
- **major** · thực tế · [15.5-linux-vps-deployment.md:269](../lessons/stage-04-database-production/module-15-docker-deployment/15.5-linux-vps-deployment.md): Cron backup ghi 'giữ 7 bản' nhưng `WITH INIT` ghi đè một file duy nhất. File backup nằm cùng volume và cùng đĩa với DB (không off-site). Trong môi trường cron, `$SA_PASSWORD` không có, `docker compose exec` không cd vào thư mục dự án và không có -f prod. Sinh viên làm theo sẽ tưởng đã có backup.

  ```text
  # Sao lưu database hàng ngày, giữ 7 bản
  ... TO DISK='/var/opt/mssql/backup/crm.bak' WITH INIT
  ```

  - Sửa: Viết script backup có tên file theo ngày, xoá bản cũ hơn 7 ngày, copy ra ngoài máy (rclone/S3), đọc mật khẩu từ file secret, `cd /opt/crm` và dùng -f. Thêm bước restore thử.
- **major** · chính xác · [15.5-linux-vps-deployment.md:807](../lessons/stage-04-database-production/module-15-docker-deployment/15.5-linux-vps-deployment.md): Script 'zero-downtime' xoá container cũ (dòng 809) rồi stop, rm và tạo lại container mới, nên có khoảng downtime, trái với mục tiêu 'dịch vụ không gián đoạn'. Biến `TEN_CU` lại chứa phiên bản MỚI, gây nhầm. `docker rename` xong lại `docker stop`/`rm` ngay là thừa.

  ```text
  docker rm -f "$TEN" 2>/dev/null || true
  docker rename "$TEN_CU" "$TEN"
  ...
  docker stop "$TEN" && docker rm "$TEN"
  ```

  - Sửa: Đổi tên biến thành TEN_MOI. Dùng cách chuyển upstream Nginx (đã nêu ở dòng 887) làm lời giải chính, thừa nhận cách tạo lại container có downtime vài giây.
- **major** · chính xác · [15.7-azure-deployment.md:350](../lessons/stage-04-database-production/module-15-docker-deployment/15.7-azure-deployment.md): Ba khẳng định sai về hiệu năng khởi động: (1) factory của AddSingleton không chạy lúc Build() mà chạy khi resolve lần đầu, và bọc `new Lazy<>(...).Value` không làm gì thêm. (2) `sql.MinBatchSize(1)` là cấu hình batching câu lệnh, không liên quan connection pool. (3) Endpoint managed identity của Container Apps là IDENTITY_ENDPOINT (localhost), không phải 169.254.169.254.

  ```text
  builder.Services.AddSingleton(sp => new MotThuNang());   // chạy lúc Build()
  ...
  options.UseSqlServer(conn, sql => sql.MinBatchSize(1));
  ```

  - Sửa: Sửa giải thích về lifetime singleton. Bỏ dòng MinBatchSize hoặc thay bằng ghi chú về pool hay warm-up. Ghi đúng cơ chế IDENTITY_ENDPOINT/IDENTITY_HEADER của App Service và Container Apps.
- **major** · chính xác · [15.8-production-monitoring.md:61](../lessons/stage-04-database-production/module-15-docker-deployment/15.8-production-monitoring.md): Code OpenTelemetry không chạy đúng: (1) Không `.AddMeter("Crm.Orders")` nên metric nghiệp vụ OrderMetrics không bao giờ được xuất, dù sơ đồ có vẽ. (2) Dùng AddEntityFrameworkCoreInstrumentation và AddRuntimeInstrumentation nhưng không cài gói tương ứng (trên .NET 9+ có thể dùng `.AddMeter("System.Runtime")`). (3) Dòng 477 `GetMetadata<RouteEndpoint>()` luôn trả null vì RouteEndpoint là endpoint, không phải metadata. (4) Sampler đọc tag http.route lúc bắt đầu span, khi đó route chưa được gán.

  ```text
  .WithMetrics(m => m ... .AddMeter("Microsoft.EntityFrameworkCore")
          .AddOtlpExporter());
  ```

  - Sửa: Thêm `.AddMeter("Crm.Orders")` và `.AddSource("Crm.*")`. Liệt kê đủ gói NuGet (Instrumentation.EntityFrameworkCore là bản beta, kiểm tra API SetDbStatementForText hiện hành). Sửa thành `(ctx.GetEndpoint() as RouteEndpoint)?.RoutePattern.RawText`. Ghi chú giới hạn của head sampling.
- **major** · thực tế · [15.9-awareness-level.md:1](../lessons/stage-04-database-production/module-15-docker-deployment/15.9-awareness-level.md): Bài tên 'Awareness Level' nhưng dài 930 dòng về CFS throttling, QoS, LimitRange, PDB, topology spread, Istio retry. Mức này quá tải với sinh viên năm 1-3, và nhiều nội dung lặp với 15.2, 15.12, 15.13.
  - Bằng chứng: `CFS throttling của Linux hoạt động theo chu kỳ 100 ms ...`
  - Sửa: Rút phần chính còn khái niệm cốt lõi + manifest + 3 probe + khi nào không cần K8s. Chuyển phần còn lại vào hộp 'Đọc thêm (nâng cao)'. Thêm lab nhỏ với kind/minikube kèm lệnh cài.
- **major** · chính xác · [15.9-awareness-level.md:158](../lessons/stage-04-database-production/module-15-docker-deployment/15.9-awareness-level.md): Khoá khuyên dùng image chiseled (không có shell và không có `sleep`), nhưng preStop dùng `exec: ["sleep", "5"]` hoặc `/bin/sh -c sleep` nên hook fail trên chiseled. Các lệnh `kubectl exec ... cat/kill/ps`, `docker exec ... ps/touch` cũng không chạy được trên chiseled. Tương tự ở 15.13 dòng 112, 130, 687.

  ```text
  lifecycle:
    preStop:
      exec:
        command: ["sleep", "5"]     # chờ kube-proxy kịp cập nhật
  ```

  - Sửa: Dùng preStop dạng `sleep: { seconds: 5 }` (K8s 1.30+ có sẵn), hoặc endpoint HTTP /prestop, hoặc ghi chú 'chỉ dùng exec với image có shell'. Bổ sung `kubectl debug` thay cho exec với chiseled.
- **minor** · chính xác · [15.1-docker-fundamentals.md:556](../lessons/stage-04-database-production/module-15-docker-deployment/15.1-docker-fundamentals.md): Code BackgroundService dùng `_logger` mà không khai báo field hay constructor, và thiếu `using System.Diagnostics` cho Process. Lỗi này lặp ở 15.7 (NhipTimJob), 15.13 (GiamSatZombieService) và 16.2, 16.12, 16.15 (KiemTraToanVenJob dùng `_db` scoped trong BackgroundService singleton).

  ```text
  public class GiamSatBoNhoService : BackgroundService
  {
      protected override async Task ExecuteAsync(CancellationToken ct)
      { ... _logger.LogWarning(
  ```

  - Sửa: Dùng primary constructor `(ILogger<GiamSatBoNhoService> logger)`. Với DbContext trong BackgroundService, tạo scope qua IServiceScopeFactory. Thêm câu 'snippet này cần using ...'.
- **minor** · nhất quán · [15.11-advanced-notes.md:36](../lessons/stage-04-database-production/module-15-docker-deployment/15.11-advanced-notes.md): Bài dạy tự tạo user bằng `adduser ... appuser`, trong khi 15.2 nói điều này là thừa và có thể gây lỗi quyền, và chính Bài 2 của bài này dùng `USER $APP_UID`. Kích thước chiseled cũng mâu thuẫn ngay trong bài và giữa các bài: ~110MB (dòng 68 và 15.2), 68MB (dòng 285), ~50MB (15.7).

  ```text
  RUN adduser --disabled-password --gecos "" --uid 1001 appuser
  USER appuser
  ```

  - Sửa: Thay bằng `USER $APP_UID`. Thống nhất một bảng kích thước (ghi rõ nén hay giải nén, đo trên .NET 10).
- **minor** (ban đầu major) · cấu trúc · [15.13-quick-real-world-example.md:3](../lessons/stage-04-database-production/module-15-docker-deployment/15.13-quick-real-world-example.md): Nội dung shell form, exec form, PID 1, preStop và grace period được trình bày đầy đủ ba lần (15.2 Bài 1, 15.9 Bài 3, 15.13) với số liệu khác nhau (10s/30s, preStop 5s/15s). Người học tốn thời gian và dễ lẫn.
  - Bằng chứng: `Viết 'ENTRYPOINT dotnet Crm.Api.dll' (shell form) khiến ứng dụng chạy như **tiến trình con của '/bin/sh'**`
  - Sửa: Giữ chi tiết ở 15.2. Ở 15.9 và 15.13 chỉ tóm tắt và link. Thống nhất số liệu: preStop 5s, ShutdownTimeout 20s, grace 30s.
  - Phản biện (adjusted): Việc lặp nội dung giữa 15.2, 15.9 và 15.13 là có thật, nên tóm tắt và link về một chỗ. Tuy nhiên 'số liệu khác nhau' một phần là đúng theo từng ngữ cảnh: docker stop mặc định chờ 10s, còn K8s terminationGracePeriodSeconds mặc định 30s. Cần thống nhất preStop và ShutdownTimeout, và ghi rõ con số nào thuộc ngữ cảnh nào. Đây là vấn đề biên tập, nên hạ xuống minor.
- **minor** · nhất quán · [15.2-dockerfile-for-aspnet-core.md:625](../lessons/stage-04-database-production/module-15-docker-deployment/15.2-dockerfile-for-aspnet-core.md): Dòng 625 nói `docker builder prune -af` 'GIỮ cache mount', còn dòng 710 nói `-a` xoá cả cache mount.
  - Bằng chứng: `docker builder prune -af          # xoá layer cache, GIỮ cache mount`
  - Sửa: Dùng `docker builder prune -f --filter type=regular` ở dòng 625 để giữ cache mount, cho khớp với dòng 713.
- **minor** · chính xác · [15.3-docker-compose.md:258](../lessons/stage-04-database-production/module-15-docker-deployment/15.3-docker-compose.md): Docker Compose v2 theo Compose Spec có hỗ trợ `deploy.replicas` (và `deploy.resources`) khi chạy `docker compose up`, không chỉ với Swarm. Output mẫu dạng `sqlserver_1`, `api_1` là của Compose v1.
  - Bằng chứng: `Nhưng 'deploy.replicas' chỉ có tác dụng với **Swarm mode**`
  - Sửa: Sửa thành 'Compose v2 tôn trọng deploy.replicas, nhưng không thể publish cùng một cổng host cho nhiều replica'. Đổi tên container mẫu thành `sqlserver-1`.
- **minor** · thực tế · [15.6-github-actions-ci-cd.md:821](../lessons/stage-04-database-production/module-15-docker-deployment/15.6-github-actions-ci-cd.md): Workflow rollback chạy `ssh deploy@server` và `docker manifest inspect` với GHCR private mà không cấu hình khoá SSH hay login, nên không chạy được. Hai bài cũng dùng hai kiểu tham số deploy.sh khác nhau (tag ở 15.6.4, image đầy đủ ở Bài 3).

  ```text
  - name: Deploy
          run: |
            ssh deploy@server \
  ```

  - Sửa: Dùng lại appleboy/ssh-action (ghim SHA) cùng secret của environment, thêm docker/login-action trước manifest inspect. Thống nhất deploy.sh nhận tag.

### Project 3 — Production CRM Platform

- **critical** · chính xác · [project-03-production-crm-platform.md:172](../lessons/stage-04-database-production/project-03-production-crm-platform.md): Query filter capture tham số `tenant` (ITenantContext của DbContext đầu tiên) vào model. EF Core build và cache model một lần cho mỗi kiểu context, nên mọi request sau dùng TenantId của request đầu tiên. Đây là lỗ hổng rò rỉ dữ liệu chéo tenant, trái với đúng mục tiêu bài học.

  ```text
  method.Invoke(null, new object[] { builder, _tenant });
  ...
  builder.Entity<T>().HasQueryFilter(e => !e.IsDeleted && e.TenantId == tenant.TenantId);
  ```

  - Sửa: Khai báo `public Guid CurrentTenantId => _tenant.TenantId;` trong CrmDbContext và viết filter tham chiếu nó, ví dụ dựng expression `e => e.TenantId == this.CurrentTenantId`, hoặc ApplyTenantFilter nhận `CrmDbContext ctx` và dùng `ctx.CurrentTenantId`. Thêm cảnh báo 'đừng capture biến cục bộ' và test cách ly tenant bắt buộc.
- **critical** · chính xác · [project-03-production-crm-platform.md:777](../lessons/stage-04-database-production/project-03-production-crm-platform.md): Image mssql/server:2022-latest các CU gần đây chỉ còn /opt/mssql-tools18 và bắt buộc -C khi dùng chứng chỉ tự ký. Healthcheck vì vậy luôn fail, API (depends_on service_healthy) không bao giờ khởi động. Ngoài ra SA_PASSWORD đã deprecated, compose còn publish 1433 ra 0.0.0.0, trái với 15.3.
  - Bằng chứng: `test: /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "${SQL_PASSWORD}" -Q "SELECT 1"`
  - Sửa: Dùng healthcheck giống 15.3 (`/opt/mssql-tools18/bin/sqlcmd ... -C`, `$$MSSQL_SA_PASSWORD`, start_period), MSSQL_SA_PASSWORD, bỏ `ports: 1433` (hoặc bind 127.0.0.1), bỏ `version: '3.9'` và volume hangfire-data không dùng.
- **major** · cấu trúc · [project-03-production-crm-platform.md:7](../lessons/stage-04-database-production/project-03-production-crm-platform.md): Có các khối boilerplate rỗng như 'Phương pháp học tập', 'Câu hỏi khởi động', và ở cuối 'Mở rộng và đào sâu', 'Mini case study', 'Ví dụ thực tế nhanh' chỉ là placeholder không có nội dung. Project cũng không có lộ trình thực hiện, ước lượng thời gian, starter repo hay lời giải tham khảo.

  ```text
  ### Tình huống
  
  Chọn một use case nhỏ trong CRM/ERP liên quan trực tiếp đến bài học này, mô tả rõ đầu vào, đầu ra và tiêu chí thành công.
  ```

  - Sửa: Xoá các khối placeholder. Thêm mục 'Lộ trình 6 milestone' với tiêu chí hoàn thành và thời lượng gợi ý cho sinh viên. Thêm 'Lỗi thường gặp' (filter tenant, job không có HttpContext, cache lệch L1, FK khi notify). Cung cấp starter repo và repo đáp án.
- **major** · chính xác · [project-03-production-crm-platform.md:153](../lessons/stage-04-database-production/project-03-production-crm-platform.md): Code mẫu không biên dịch hoặc không nhất quán: CrmDbContext thiếu DbSet Tenants/AppUsers nhưng SeedData dùng chúng. ApprovalRequest trong schema là đa hình (EntityType/EntityId) nhưng handler `.Include(r => r.Deal)`. Reject không chuyển Deal sang 'lost' như sơ đồ. Notification export thiếu UserId (NOT NULL, FK) nên insert lỗi. Lead.Status là enum (lưu int) nhưng SQL là VARCHAR. Handler dùng `_context`, `_currentUser` không khai báo.

  ```text
  var request = await _context.ApprovalRequests
              .Include(r => r.Deal)
  ```

  - Sửa: Thêm DbSet còn thiếu. Chọn ApprovalRequest có DealId FK (đơn giản cho sinh viên). Khi reject thì set Stage = Lost. Truyền UserId người yêu cầu export. Cấu hình `HasConversion<string>()` cho enum. Bỏ khối SQL thủ công hoặc ghi rõ đó là kết quả migration.
- **major** · chính xác · [project-03-production-crm-platform.md:538](../lessons/stage-04-database-production/project-03-production-crm-platform.md): Job Hangfire chạy ngoài HTTP request nên JwtTenantContext có TenantId = Guid.Empty. RemindStaleLeadsAsync không gọi IgnoreQueryFilters nên luôn trả rỗng mà không báo lỗi. Recurring 'daily-digest' đăng ký với Guid.Empty, mâu thuẫn với comment 'lấy từ DB loop'.
  - Bằng chứng: `job => job.SendDailyDigestAsync(Guid.Empty),  // tenantId lấy từ DB loop`
  - Sửa: Tạo job cha duyệt danh sách tenant rồi enqueue job con theo tenantId. Trong job, set tenant context tường minh (ITenantContextSetter), hoặc IgnoreQueryFilters cộng điều kiện TenantId. Thêm cảnh báo này vào mục lỗi thường gặp.
- **major** · nhất quán · [project-03-production-crm-platform.md:893](../lessons/stage-04-database-production/project-03-production-crm-platform.md): CI của project trái với 15.6: không có `permissions` nên với repo mới (token mặc định read) bước push GHCR sẽ lỗi 403. Chỉ tag `latest` trong khi 15.6 nói không dùng latest. Dùng .NET 8.x, SA_PASSWORD đã deprecated, đường dẫn image có thể chứa chữ hoa. Sơ đồ ghi 'API (.NET 8)'.
  - Bằng chứng: `tags: ghcr.io/${{ github.repository }}/api:latest`
  - Sửa: Thêm `permissions: {contents: read, packages: write}` cho job build-push. Dùng docker/metadata-action với `type=sha,format=long`. Đổi sang dotnet-version '10.0.x' và MSSQL_SA_PASSWORD. Cập nhật sơ đồ thành .NET 10.

### Module 16 - Clean Architecture

- **critical** · chính xác · [16.8-in-process.md:73](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.8-in-process.md): IDomainEvent không kế thừa INotification, nên `INotificationHandler<LeadConverted>` vi phạm ràng buộc `TNotification : INotification` và không biên dịch được. `Publish(object)` cũng không route tới handler.

  ```text
  public interface IDomainEvent
  {
      DateTime OccurredAt { get; }
  }
  ```

  - Sửa: Khai báo `public interface IDomainEvent : INotification`. Nếu muốn Domain không phụ thuộc MediatR thì bọc qua wrapper `DomainEventNotification<T> : INotification` trong Application, và giải thích lý do.
- **major** · nhất quán · [16.1-when-growth-exposes-architecture.md:16](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.1-when-growth-exposes-architecture.md): Đánh số mục lệch một bài trong toàn module: bài 16.1 dùng '16.2.x', 16.2 dùng '16.3.x'... tới 16.16 dùng '16.17.x'. Module 15 cũng vậy (15.1 dùng 15.2.x). Text link 'bài X.Y' cũng lệch: script đếm được 97 link có số trong chữ khác số của file đích (ví dụ 'bài 16.4 (`16.3-uncle-bob.md`)', 'bài 8.8 (`...8.7-logging...`)').
  - Bằng chứng: `### 16.2.1 — Chi phí thay đổi là thước đo duy nhất (trong bài 16.1)`
  - Sửa: Chạy script đánh lại số mục theo tên file và sửa text link cho khớp số file đích. Thêm kiểm tra vào `npm run check` để bắt link 'bài X.Y' trỏ sai.
- **major** · nhất quán · [16.1-when-growth-exposes-architecture.md:183](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.1-when-growth-exposes-architecture.md): Mô hình CRM thay đổi giữa các bài. Ở 16.1, 16.2, 16.10, 16.15, Lead có Value và chuyển sang Won/Lost. Ở Project 3 và 16.12, Lead 'qualified' rồi chuyển thành Deal, Deal mới có Value. Kiểu Id cũng lúc int, lúc Guid, lúc LeadId; TenantId lúc string, lúc Guid. Tên phương thức lẫn Anh/Việt (Create/Tao, Convert/ChuyenSangWon, Result.Success/ThanhCong/Fail/Loi). Sinh viên khó ghép thành một codebase.
  - Bằng chứng: `> *"Lead có giá trị trên 500 triệu phải được trưởng phòng duyệt trước khi chuyển sang trạng thái Won."*`
  - Sửa: Lập bảng 'Từ điển CRM của khoá' (Lead, Deal, Customer, Contact, Activity, trạng thái, kiểu Id, quy ước đặt tên Anh hay Việt) ở README stage 5. Viết lại ví dụ ngưỡng duyệt cho Deal. Thống nhất một ngôn ngữ cho tên code.
- **major** · chính xác · [16.10-anti-patterns-to-avoid.md:636](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.10-anti-patterns-to-avoid.md): [Table], [Column], [Key], [DatabaseGenerated] thuộc System.ComponentModel.DataAnnotations(.Schema), không thuộc Microsoft.EntityFrameworkCore. Vì vậy `HaveDependencyOn("Microsoft.EntityFrameworkCore")` không bắt được chúng, và bảng phân loại '74/87 vi phạm EF Core là do attribute' sai về cơ chế. 16.3 cũng nói DataAnnotations là BCL.

  ```text
  TableAttribute:             38 chỗ
  ColumnAttribute:            24 chỗ
  ```

  - Sửa: Viết test riêng chặn namespace `System.ComponentModel.DataAnnotations.Schema` trong Domain. Sửa phần diễn giải để test EF Core chỉ bắt [Owned], [Index], [Precision], DbContext...
- **major** · nhất quán · [16.16-review-and-assessment.md:15](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.16-review-and-assessment.md): Lab yêu cầu test handler bằng fake repository, trong khi 16.9 nói rõ 'Không mock database/repository, dùng Testcontainers'. Bài review còn boilerplate (mục tiêu chung chung, 'Bài tập tổng hợp', kết luận rỗng), heading 16.17.3 rỗng, quiz có phương án đùa ('Chữ cái đầu alphabet') và không có lời giải hay tiêu chí cho lab.
  - Bằng chứng: `Viết **ít nhất 3 unit test** domain và **1 test** handler với fake repository.`
  - Sửa: Đổi thành '1 integration test handler với database thật (Testcontainers)'. Viết lại quiz 8-10 câu tình huống (ví dụ 'quy tắc X đặt ở đâu?'), có giải thích đáp án. Thêm lời giải mẫu hoặc repo tham khảo cho lab. Xoá 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' boilerplate.
- **major** · dễ hiểu · [16.2-layered-architecture-still-useful.md:16](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.2-layered-architecture-still-useful.md): 'Layered architecture cổ điển' trong bài thực chất là Onion/Clean: Infrastructure phụ thuộc vào trong, interface repository nằm ở Application. N-layer cổ điển có BLL phụ thuộc DAL. Người học sẽ không thấy khác biệt giữa 16.2 và 16.3, nên không hiểu dependency inversion giải quyết điều gì.

  ```text
  API  ──►  Application  ──►  Domain
                  │
                  ▼
           Infrastructure  ──►  Domain
  ```

  - Sửa: Vẽ N-layer truyền thống (Presentation → Business → DataAccess, BLL gọi thẳng DAL) và nêu vấn đề của nó. Để phần đảo chiều phụ thuộc cho 16.3, hoặc đổi tên mục 16.2 thành 'Layered có đảo phụ thuộc'.
- **major** · dễ hiểu · [16.4-vertical-slice-architecture.md:36](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.4-vertical-slice-architecture.md): MediatR (IRequest, ISender, IRequestHandler) và FluentValidation (AbstractValidator) được dùng từ 16.2-16.4 nhưng tới 16.6 và 16.7 mới dạy. Interface IEndpoint cũng dùng mà không giải thích. Đây là trường hợp dạy trước khi giải thích.

  ```text
  public sealed record Command(string Name, string Email, decimal Value)
          : IRequest<Result<Guid>>;
      public sealed class Validator : AbstractValidator<Command>
  ```

  - Sửa: Ở ví dụ VSA đầu tiên, dùng handler class thường không qua MediatR. Hoặc thêm khung 'Kiến thức mượn trước' giải thích 3 dòng về IRequest/IRequestHandler/AbstractValidator kèm link 16.6/16.7. Định nghĩa IEndpoint.
  - Phản biện (adjusted): Đúng với 16.4: dòng 36-71 dùng IRequest, AbstractValidator, IEndpoint mà không giải thích; IEndpoint chỉ được nhắc là nằm trong SharedKernel ở dòng 140. Còn 16.3 không dùng MediatR (0 lần), và 16.2 dùng 1 lần. Phạm vi nên ghi là chủ yếu 16.4 (và một chỗ ở 16.2), không phải cả 16.2-16.4.
- **major** · nhất quán · [16.5-ddd-tactics-backend-pragmatic.md:27](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.5-ddd-tactics-backend-pragmatic.md): Money được định nghĩa ít nhất 3 kiểu khác nhau: readonly record struct với Add() và Vnd() (16.5), sealed record class (16.13.3), struct có toán tử với VND() và Zero (16.13 Bài 3). Nhiều nơi dùng `Money Value = null!` (16.2 dòng 510, 16.15 dòng 389). Với struct, dòng này lỗi CS0037. Các toán tử `>=`, `+`, `*` được dùng ở 16.1, 16.2, 16.5 khi chưa định nghĩa. Ngoài ra OwnsOne (16.3 dòng 363) không dùng được với value type, phải dùng ComplexProperty.
  - Bằng chứng: `public readonly record struct Money(decimal Amount, string Currency) ... public Money Value { get; private set; } = null!;`
  - Sửa: Chốt một định nghĩa Money duy nhất (đề xuất: readonly record struct có factory VND, Zero và toán tử). Đặt nó ở 16.5, các bài khác chỉ tham chiếu. Bỏ `= null!`. Map bằng ComplexProperty (EF 8+) thay vì OwnsOne cho struct.
- **major** · chính xác · [16.5-ddd-tactics-backend-pragmatic.md:449](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.5-ddd-tactics-backend-pragmatic.md): SQL Server so sánh uniqueidentifier theo 6 byte cuối trước. UUIDv7 từ Guid.CreateVersion7 có timestamp ở đầu nên KHÔNG tuần tự trong clustered index của SQL Server, vẫn gây phân mảnh. Nó chỉ tuần tự với PostgreSQL, trong khi khoá này dùng SQL Server.
  - Bằng chứng: `Guid.CreateVersion7() -> 48 bit đầu là dấu thời gian ... -> tăng dần theo thời gian -> chèn vào cuối index`
  - Sửa: Ghi rõ: với SQL Server, dùng NEWSEQUENTIALID() hoặc giá trị sinh của EF (SequentialGuidValueGenerator mặc định cho khoá Guid). UUIDv7 phù hợp PostgreSQL. Sửa cả 16.13 dòng 458.
- **major** (ban đầu critical) · chính xác · [16.6-mediatr-use-case-pipeline.md:3](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.6-mediatr-use-case-pipeline.md): Sai về giấy phép (lặp 4 lần trong bài và ở 16.11). MediatR 12.x (tới 12.5) vẫn Apache-2.0. Từ v13 (7/2025) chuyển sang dual license RPL-1.5/thương mại, cần license key, có Community edition miễn phí cho tổ chức doanh thu dưới 5 triệu USD. Học viên CLB có thể hiểu sai là không được dùng.
  - Bằng chứng: `MediatR từ phiên bản 12 chuyển sang giấy phép thương mại cho dùng trong doanh nghiệp`
  - Sửa: Sửa thành 'từ v13'. Nêu lựa chọn: ghim 12.5.0 (không còn bản vá), dùng Community edition (cấu hình `cfg.LicenseKey`), hoặc thay bằng thư viện mã nguồn mở như Mediator (source generator) hay tự viết interface + decorator. Cập nhật 16.6 dòng 212, 686, 703, 841 và 16.11 dòng 84.
  - Phản biện (adjusted): Nội dung đúng: MediatR 12.x vẫn Apache-2.0, thay đổi giấy phép (RPL-1.5/thương mại, cần license key, có Community edition) bắt đầu từ v13 (7/2025). Các chỗ cần sửa đã xác nhận: 16.6 dòng 3, 212, 686, 703, 841. Còn 16.11 dòng 84 chỉ khuyên kiểm tra điều khoản, không sai. Đây là sai sự thật nhưng không làm code hỏng, nên hạ xuống major.
- **major** · chính xác · [16.6-mediatr-use-case-pipeline.md:101](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.6-mediatr-use-case-pipeline.md): TransactionBehavior mở transaction thủ công không qua execution strategy. Nếu đã bật EnableRetryOnFailure (dạy ở 15.3/14.9), EF ném InvalidOperationException 'does not support user-initiated transactions'. Bài tự nêu điều này ở dòng 406 nhưng mẫu chính vẫn sai.
  - Bằng chứng: `await using var tx = await db.Database.BeginTransactionAsync(ct);`
  - Sửa: Dùng mẫu `CreateExecutionStrategy().ExecuteAsync(...)` ngay ở 16.7.2. Thống nhất ai gọi SaveChanges (behavior hay handler).
- **major** · nhất quán · [16.6-mediatr-use-case-pipeline.md:431](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.6-mediatr-use-case-pipeline.md): Bài khẳng định dispatch domain event TRONG transaction thì 'khách không nhận email về lead không tồn tại'. Thực tế email đã gửi đi thì không rollback được. Điều này mâu thuẫn với 16.8 (handler gọi ra ngoài phải dispatch SAU commit) và 16.2.

  ```text
  DomainEvent TRONG Transaction:
      handler chạy -> event dispatch trong cùng transaction
      -> nếu rollback, mọi thứ bị huỷ cùng nhau
  ```

  - Sửa: Viết lại: event trong transaction chỉ dành cho handler ghi cùng DB. Handler gửi email/HTTP phải chạy sau commit hoặc qua outbox. Dẫn chiếu 16.8.3.
- **major** · nhất quán · [16.7-fluentvalidation.md:129](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.7-fluentvalidation.md): Bài mâu thuẫn với chính nó: mục chính khẳng định 'Validator không gọi database'. Bài 2 (dòng 688) nói 'Giữ' validator kiểm tra trùng email. Bài 3 (dòng 951) lại xếp 'kiểm tra trùng' vào nhóm KHÔNG. Mã lỗi cho domain (422) cũng mâu thuẫn với code ở 16.1, 16.4, 16.10 trả BadRequest (400) cho Result.Loi.
  - Bằng chứng: `**Giữ, nhưng hiểu đúng vai trò của nó** ... KHÔNG:      kiểm tra trùng (race condition -> dùng unique index)`
  - Sửa: Chốt một quy tắc: validator không gọi DB, trừ kiểm tra tồn tại để có thông điệp đẹp và luôn có FK/unique làm bảo đảm. Sửa Bài 2 cho khớp. Thống nhất ánh xạ Result sang HTTP (ToHttpResult ở 16.13) và dùng nó ở mọi ví dụ.
- **major** · nhất quán · [16.9-testing-strategy-overview.md:26](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.9-testing-strategy-overview.md): Bài trộn Moq (Verify), NSubstitute (Received), xUnit Assert và FluentAssertions. Module lại khuyên 'không dùng InMemory/mock DB' nhưng Bài 1 dùng SQLite in-memory. FluentAssertions v8 (từ 1/2025) cần licence thương mại, trong khi cả module dùng `.Should()` và 16.11 hướng dẫn `dotnet add package FluentAssertions` không ghim phiên bản.
  - Bằng chứng: `_repo.Verify(r => r.Add(It.IsAny<Lead>()), Times.Once); ... await email.Received(1)... ; await using var db = TaoSqliteInMemory();`
  - Sửa: Chọn một bộ công cụ cho khoá: NSubstitute + Shouldly/AwesomeAssertions (hoặc ghim FluentAssertions 7.x, ghi chú licence). Dùng Testcontainers nhất quán và bỏ SQLite in-memory, hoặc nêu rõ đây là ngoại lệ có giới hạn.
  - Phản biện (adjusted): Đã xác nhận bài trộn Moq (dòng 26-27) với NSubstitute (dòng 277, 347). Dòng 402 dùng TaoSqliteInMemory, trong khi dòng 117/243 nói không dùng InMemory. Comment ở dòng 390 có nêu SQLite như một lựa chọn nhưng không nêu giới hạn. Phần giấy phép cần chỉnh: FluentAssertions v8 dùng giấy phép Xceed, miễn phí cho mục đích phi thương mại, nên CLB sinh viên dùng được. Đây chỉ là lưu ý khi đi làm, vẫn nên ghim 7.x hoặc ghi chú. Nhìn chung vẫn là major vì công cụ không nhất quán.
- **minor** · chính xác · [16.13-advanced-notes.md:45](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.13-advanced-notes.md): TimeProvider không có thuộc tính `UtcNow` (phải gọi `GetUtcNow()`), nên code không biên dịch. Lỗi lặp ở 16.15 dòng 141 (`lead.Convert(_clock.UtcNow)`).
  - Bằng chứng: `var customer = lead.Convert(_clock.UtcNow);`
  - Sửa: Đổi thành `_clock.GetUtcNow().UtcDateTime` cho thống nhất với các bài khác.
- **minor** · thực tế · [16.14-mini-case-study.md:159](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.14-mini-case-study.md): Bài tập ở 16.10, 16.11, 16.14, 16.15 đều yêu cầu 'trên dự án thật của bạn' với God Service hàng nghìn dòng, 87 vi phạm, lịch sử Git 6 tháng. Sinh viên CLB không có codebase như vậy nên không làm được hoặc làm hình thức.
  - Bằng chứng: `Tìm lớp lớn nhất trong dự án và đo ba chỉ số ở mục 16.15.4.`
  - Sửa: Cung cấp một repo 'CRM legacy' mẫu (God Service khoảng 800 dòng, anemic entity, quy tắc bị nhân bản, dữ liệu seed vi phạm) để mọi bài tập Module 16 làm trên cùng một codebase, có nhánh lời giải.
- **minor** · chính xác · [16.4-vertical-slice-architecture.md:504](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.4-vertical-slice-architecture.md): Git merge 3-way báo conflict khi các thay đổi chồng lên nhau hoặc nằm liền kề. Hai thay đổi cách nhau ít nhất một dòng không đổi vẫn merge sạch. Ngưỡng 'dưới ba dòng' không đúng.
  - Bằng chứng: `Nếu hai phương thức cách nhau dưới ba dòng, Git coi đó là **một hunk** và báo xung đột`
  - Sửa: Sửa thành 'thay đổi ở các dòng liền kề hoặc chồng nhau (ví dụ cùng thêm dependency vào constructor) sẽ xung đột'. Giữ ví dụ vùng nóng constructor.
- **minor** · chính xác · [16.4-vertical-slice-architecture.md:699](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.4-vertical-slice-architecture.md): `leads.Where(l => l.CanTruongPhongDuyet())` với IQueryable của EF sẽ ném 'could not be translated', vì EF không dịch được phương thức C# tuỳ ý trong slice báo cáo đọc từ DB.
  - Bằng chứng: `var canDuyet = leads.Where(l => l.CanTruongPhongDuyet()); // BaoCaoDuyet.cs`
  - Sửa: Cung cấp `Expression<Func<Lead,bool>> CanDuyetExpr` trong Domain (hoặc Specification) để dùng được cho cả EF lẫn bộ nhớ, và ghi chú lý do.
- **minor** · nhất quán · [16.4-vertical-slice-architecture.md:716](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.4-vertical-slice-architecture.md): Quy tắc tách dùng chung không nhất quán: 16.1 nói 'tách khi chép lần thứ hai, không phải lần thứ ba', còn 16.4 nói 'chờ lần thứ ba'. 16.4 cũng tự mâu thuẫn về SharedKernel: mục 16.5.3 nói SharedKernel chứa quy tắc nghiệp vụ như Money, Lead, nhưng dòng 749 nói SharedKernel chỉ chứa khái niệm kỹ thuật không liên quan CRM.
  - Bằng chứng: `2. Được dùng ở ba slice trở lên  (quy tắc "ba lần")`
  - Sửa: Phân biệt rõ: quy tắc nghiệp vụ thì gom về Domain ngay lần thứ hai; tiện ích dùng chung thì chờ lần thứ ba. Sửa 16.5.3: Money, Lead thuộc Domain, SharedKernel chỉ chứa Result, EntityBase, IEndpoint.
- **minor** · chính xác · [16.8-in-process.md:195](../lessons/stage-05-senior-engineering/module-16-clean-architecture/16.8-in-process.md): `PublishStrategy` là API cũ (MediatR.Extensions/Contrib). Từ MediatR 12, cấu hình bằng `cfg.NotificationPublisher = new TaskWhenAllPublisher()` / `NotificationPublisherType`.
  - Bằng chứng: `Đổi bằng 'PublishStrategy', hoặc tự bắt exception trong từng handler.`
  - Sửa: Thay bằng ví dụ `services.AddMediatR(cfg => cfg.NotificationPublisher = new TaskWhenAllPublisher())` và nêu hệ quả với DbContext dùng chung.

### Module 17 - Distributed Systems

- **critical** · chính xác · [17.10-crm-context.md:347](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.10-crm-context.md): Bản sửa 'idempotent' cho trừ kho chạy ExecuteUpdateAsync TRƯỚC (lệnh này commit ngay, độc lập với SaveChanges) rồi mới insert khoá chống trùng. Khi message trùng, kho đã bị trừ lần hai rồi SaveChanges mới ném vi phạm unique, tức vẫn trừ hai lần. Bài 2 (dòng 546-554) còn khẳng định ExecuteUpdate và SaveChanges 'cùng commit hoặc cùng rollback', điều này sai.
  - Bằng chứng: `var soDong = await _db.TonKho...ExecuteUpdateAsync(...); _db.TruKhoDaXuLy.Add(...); await _db.SaveChangesAsync(ct); ... // cả hai cùng commit hoặc cùng rollback`
  - Sửa: Mở `await using var tx = await _db.Database.BeginTransactionAsync(ct);` bao cả ExecuteUpdate lẫn SaveChanges, và ghi khoá chống trùng TRƯỚC (SaveChanges, bắt unique violation để return) rồi mới ExecuteUpdate, cuối cùng commit. Thêm một câu: 'ExecuteUpdate/ExecuteDelete chạy ngay, không tham gia SaveChanges; muốn nguyên tử phải có transaction tường minh'.
- **critical** · chính xác · [17.12-mini-case-study.md:139](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.12-mini-case-study.md): 'Thay đổi 3' khẳng định idempotency key $"invoice-{invoice.Id}" giúp tiền không bị trừ hai lần ngay cả khi hoá đơn bị tạo trùng. Hai hoá đơn trùng có hai Id khác nhau, nên key khác nhau và cổng thanh toán vẫn trừ hai lần. Bài 2 của cùng bài tự thừa nhận key này 'Yếu'.
  - Bằng chứng: `idempotencyKey: $"invoice-{invoice.Id}",    // cổng thanh toán tự chặn trùng ... Ngay cả khi hoá đơn bị tạo trùng, tiền **không bị trừ hai lần**`
  - Sửa: Đổi key ở Thay đổi 3 thành khoá nghiệp vụ `$"renew-{evt.SubscriptionId}-{evt.Period}"` (hoặc `$"invoice-{CustomerId}-{Period}"`) và giữ đúng lập luận. Xoá câu khẳng định sai.
- **critical** · chính xác · [17.7-outbox-idempotency-demo.md:98](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.7-outbox-idempotency-demo.md): Use case ghi Type = nameof(LeadConvertedIntegrationEvent), tức chỉ là tên ngắn, trong khi dispatcher gọi Type.GetType(message.Type). Với tên ngắn, Type.GetType trả về null, nên mọi message đều ném InvalidOperationException và không message nào được publish.
  - Bằng chứng: `Type = nameof(LeadConvertedIntegrationEvent), ... var type = Type.GetType(message.Type) ?? throw new InvalidOperationException(...)`
  - Sửa: Ghi `typeof(LeadConvertedIntegrationEvent).AssemblyQualifiedName!` như ở 17.3, hoặc tốt hơn là dùng một registry ánh xạ tên ổn định sang Type (Dictionary&lt;string, Type&gt;) và giải thích vì sao không nên lưu AssemblyQualifiedName lâu dài (đổi version assembly sẽ làm hỏng message cũ).
- **critical** · chính xác · [17.7-outbox-idempotency-demo.md:155](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.7-outbox-idempotency-demo.md): Bài này được giới thiệu là demo outbox 'chạy được đầu-cuối', nhưng dispatcher dùng WITH (READPAST, UPDLOCK) mà không mở transaction. Ở chế độ autocommit, khoá U được nhả ngay khi câu SELECT kết thúc, nên hai instance vẫn đọc được cùng một lô và publish trùng. Đây lại chính là điều test 3 khẳng định là không xảy ra.
  - Bằng chứng: `var messages = await db.OutboxMessages.FromSqlRaw($@"SELECT TOP ({BatchSize}) * FROM OutboxMessages WITH (READPAST, UPDLOCK) ...").ToListAsync(ct);  // không có BeginTransactionAsync`
  - Sửa: Bọc toàn bộ DispatchBatchAsync bằng `await using var tx = await db.Database.BeginTransactionAsync(ct);`, gọi SaveChangesAsync rồi `tx.CommitAsync(ct)` ở cuối (giống bản ở 17.3 Bài 1). Thêm một đoạn giải thích 'UPDLOCK chỉ giữ khoá trong phạm vi transaction'. Đổi FromSqlRaw sang FromSql.
- **major** · nhất quán · [17.1-event-driven-architecture-when-to-use.md:3](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Khoảng 71 link nội bộ dạng 'bài X.Y (`file`)' có nhãn số bài không khớp file đích ở cả hai module. Ví dụ: 'bài 16.9' trỏ 16.8-in-process, 'bài 17.4' trỏ 17.3-outbox, 'bài 15.9' trỏ 15.8, 'bài 18.6' trỏ 18.5. Mục đối chiếu ở 17.9 và 18.8 ghi toàn số cũ (17.5→17.4, 18.2→18.1…). Người học sẽ bị lạc khi tìm bài.
  - Bằng chứng: `domain event in-process ([bài 16.9](../module-16-clean-architecture/16.8-in-process.md)) ... ([bài 17.4](17.3-outbox-pattern-applied.md))`
  - Sửa: Chạy script đổi nhãn theo tiền tố tên file đích (vd regex `\[bài [0-9.]+\]\(([^)]*/)?(\d+\.\d+)-` → `[bài $2]`). Rà thủ công bảng đối chiếu trong 17.9/18.8 và các câu 'Bài 17.2, để biết có thật sự cần broker'.
- **major** · cấu trúc · [17.1-event-driven-architecture-when-to-use.md:5](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Toàn bộ bài trong cả hai module thiếu mục 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường'. Bài mở đầu đã dùng ngay MediatR, MassTransit, NetArchTest, Polly, outbox, saga, ArchTest, Confluent schema registry mà không nêu cần học gì trước và cài gì. Không bài nào ghi phiên bản .NET/C# (không có chữ '.NET 10' hay 'C# 14' trong cả hai module).
  - Bằng chứng: `## Mục tiêu bài học ... ## Nội dung bài học (không có mục tiên quyết/môi trường)`
  - Sửa: Thêm mẫu chung ở đầu mỗi bài: 'Kiến thức tiên quyết' (link 14.x, 16.x), 'Môi trường' (.NET 10 SDK, Docker, các package NuGet kèm phiên bản: MassTransit 8.x, Microsoft.Extensions.Http.Resilience, Testcontainers…), 'Thời lượng ước tính'. Đưa docker-compose chung của module vào thư mục mẫu.
- **major** · chính xác · [17.1-event-driven-architecture-when-to-use.md:320](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Cấu hình 'Cách 2' đặt HttpClient.Timeout = 3s và AddTimeout(3s) trước AddRetry, tức timeout tổng bao ngoài retry. Như vậy cả chuỗi retry chỉ có 3 giây, retry gần như vô dụng. CircuitBreaker cũng không đặt MinimumThroughput (mặc định 100). 17.6 Bài 3 (dòng 584) có cùng lỗi: AddTimeout(3s) bao ngoài nhưng log lại cho thấy retry chờ 1s + 2s + 4s.
  - Bằng chứng: `.AddResilienceHandler("erp", b => { b.AddTimeout(TimeSpan.FromSeconds(3)); b.AddRetry(...MaxRetryAttempts = 2...) ...`
  - Sửa: Dùng AddStandardResilienceHandler (TotalRequestTimeout lớn hơn AttemptTimeout), hoặc tự xếp: AddTimeout(total 10s) → AddRetry → AddCircuitBreaker → AddTimeout(attempt 2s). Bỏ c.Timeout hoặc đặt lớn hơn tổng. Ở 17.6 Bài 3 sửa timeout ngoài thành ≥ tổng các delay, hoặc sửa log cho khớp.
- **major** · chính xác · [17.1-event-driven-architecture-when-to-use.md:587](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Project Crm.Contracts nhắm netstandard2.0 nhưng chứa positional record. netstandard2.0 mặc định dùng C# 7.3 và không có IsExternalInit, nên record không biên dịch được nếu không có LangVersion và polyfill.
  - Bằng chứng: `<TargetFramework>netstandard2.0</TargetFramework>   <!-- tương thích rộng nhất --> (chứa public record LeadDaChotV1(...))`
  - Sửa: Đổi sang `<TargetFramework>net10.0</TargetFramework>` (hoặc multi-target net8.0;net10.0). Nếu thật sự cần netstandard2.0 thì thêm `<LangVersion>latest</LangVersion>` và polyfill IsExternalInit (package PolySharp), đồng thời giải thích lý do.
- **major** · chính xác · [17.1-event-driven-architecture-when-to-use.md:663](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Bài khẳng định thêm tham số bắt buộc vào positional record sẽ làm System.Text.Json ném 'missing required properties'. Thực tế, mặc định STJ gán default (null) cho tham số constructor bị thiếu. Chỉ khi bật JsonSerializerOptions.RespectRequiredConstructorParameters (.NET 9+) hoặc dùng từ khoá `required` thì mới ném lỗi. Bài nói ngược ('Hoặc, tuỳ cấu hình, TenantId bằng null'). Lỗi lặp lại ở 17.11 dòng 715.
  - Bằng chứng: `System.Text.Json.JsonException: JSON deserialization for type 'LeadDaChotV1' was missing required properties including: 'TenantId'.`
  - Sửa: Sửa thành: 'Mặc định STJ gán null cho TenantId, và consumer sẽ NullReferenceException ở chỗ xa hơn (khó chẩn đoán). Nếu bật RespectRequiredConstructorParameters = true hoặc dùng required thì mới nhận JsonException ...'. Cập nhật tương tự ở 17.11 Bài 3.
- **major** · chính xác · [17.1-event-driven-architecture-when-to-use.md:708](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Bảng 'Thay đổi nào an toàn' sai ở dòng 'Xoá trường'. Theo định nghĩa của chính bài (Backward = consumer mới đọc message cũ), consumer mới không còn trường đó vẫn đọc được message cũ vì STJ bỏ qua trường thừa, nên Backward = Có. Consumer cũ đọc message mới bị thiếu trường, nên Forward = Không. Bảng đang ghi ngược.
  - Bằng chứng: `| Xoá trường | **Không** | Có | **Không** |`
  - Sửa: Đổi thành `| Xoá trường | Có | **Không** | **Không** |`, kèm chú thích: consumer cũ vẫn cần trường đó.
- **major** · thực tế · [17.12-mini-case-study.md:18](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.12-mini-case-study.md): Kịch bản sự cố không hợp lý về cơ chế. Khi RabbitMQ restart, broker chỉ giao lại các message đang 'in-flight' của consumer (tối đa prefetch × số consumer, thường vài chục), không thể là 1.247 message đã xử lý xong mà chưa ACK. Truy vấn Bước 1 lọc CreatedUtc từ 09:18 đến 09:25 cũng sẽ trả 0 dòng, vì hoá đơn gốc tạo lúc 09:12 nằm ngoài cửa sổ nên GROUP BY không thấy trùng.
  - Bằng chứng: `3.100 message chua ACK ... 1.247 hoá đơn trùng ... WHERE CreatedUtc BETWEEN '2026-03-15 09:18' AND '2026-03-15 09:25' GROUP BY CustomerId, Period HAVING COUNT(*) > 1`
  - Sửa: Đổi nguyên nhân cho hợp lý, vd 'consumer ACK theo lô sau khi xử lý 2.000 message (cấu hình batch/prefetch lớn) nên restart giao lại cả lô', hoặc 'producer retry publish không có idempotency'. Sửa truy vấn: lấy các (CustomerId, Period) có bản ghi tạo sau 09:18 rồi HAVING COUNT(*) &gt; 1 trên toàn bảng.
- **major** · chính xác · [17.12-mini-case-study.md:347](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.12-mini-case-study.md): Lớp cơ sở ConsumerIdempotent gọi XuLyAsync trước SaveChanges, rồi mới dựa vào unique constraint để bỏ qua bản trùng. Với consumer có tác dụng phụ ra ngoài (gửi email/SMS, gọi API), tác dụng phụ đã chạy trước khi biết là trùng, nên vẫn gửi hai lần. Lớp này cũng dùng _db, _clock, _logger, _demTrungLap mà không khai báo hoặc inject.
  - Bằng chứng: `await XuLyAsync(ctx.Message, _db, ctx.CancellationToken); try { await _db.SaveChangesAsync(...); } catch (DbUpdateException ex) when (LaViPhamKhoaChinh(ex))`
  - Sửa: Ghi rõ lớp cơ sở chỉ áp dụng cho consumer mà mọi thay đổi nằm trong DbContext. Với tác dụng phụ ngoài, dùng mẫu 'ghi khoá trước + commit → thực hiện tác dụng phụ → đánh dấu hoàn tất', hoặc idempotency key ở nhà cung cấp. Thêm constructor nhận CrmDbContext, TimeProvider, ILogger.
- **major** (ban đầu critical) · chính xác · [17.13-quick-real-world-example.md:596](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.13-quick-real-world-example.md): Bài tập mô tả poison message 'quay lại queue liên tục, hàng nghìn lần mỗi giây' khi MassTransit không cấu hình retry. Thực tế, mặc định MassTransit chuyển message lỗi sang queue `<tên>_error` sau lần thất bại đầu tiên, không requeue vô hạn. Kết quả quan sát trong lời giải sẽ không tái hiện được, và người học hiểu sai hành vi mặc định.
  - Bằng chứng: `// KHÔNG cấu hình retry, KHÔNG cấu hình DLQ ... (liên tục, hàng nghìn lần mỗi giây) ... lead-converted    1    1    1`
  - Sửa: Hoặc chuyển phần tái hiện sang RabbitMQ.Client thuần với `BasicNackAsync(requeue: true)` (đó mới là vòng lặp vô hạn), hoặc giữ MassTransit và sửa kết quả thành 'message vào lead-converted_error ngay lần lỗi đầu, header MT-Fault-*'. Giải thích rõ khác biệt giữa client thuần và MassTransit.
  - Phản biện (adjusted): Lỗi là có thật. Mặc định MassTransit không cấu hình retry thì consumer lỗi sẽ chuyển message sang queue `lead-converted_error` ngay lần đầu, kèm header MT-Fault-*. Không có vòng requeue hàng nghìn lần mỗi giây, nên log và kết quả `rabbitmqctl` (1/1/1) trong bài không tái hiện được. Hạ xuống major vì đây là mô tả sai hành vi trong một bài tập, không phải code sai mà người học sẽ đưa vào sản phẩm. Cách sửa đề xuất là hợp lý.
- **major** · cấu trúc · [17.14-review-and-assessment.md:26](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.14-review-and-assessment.md): Bài Review là boilerplate. Có tiêu đề rỗng ('Kiểm tra & Thực hành (100 điểm)' không có nội dung). Khối 'Bối cảnh giáo trình' giống hệt 18.13. 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' chung chung. Quiz chỉ có 5 câu với phương án nhiễu vô lý ('CSS layout', 'Chậm compile') và đáp án hiện ngay sau câu hỏi, mâu thuẫn với quy trình 'không xem đáp án'. Lab 80 điểm không có hướng dẫn, mã khởi đầu hay lời giải mẫu. Lab còn yêu cầu 'lưu eventId' trong khi 17.10 dạy dùng khoá nghiệp vụ.

  ```text
  ### 17.15.3 — Kiểm tra & Thực hành (100 điểm)
  
  ### 17.15.4 — Bối cảnh giáo trình ... 1. Outbox pattern giải quyết vấn đề nào? A. JWT hết hạn B. ... C. CSS layout D. Chậm compile > **Đáp án:** B.
  ```

  - Sửa: Viết lại: 10-15 câu quiz kiểm tra hiểu (tình huống CRM, phương án nhiễu hợp lý), đáp án đặt trong &lt;details&gt;. Lab có đề bài từng bước, docker-compose, mã khởi đầu, tiêu chí chấm cụ thể và lời giải mẫu. Yêu cầu consumer dùng khoá nghiệp vụ (LeadId). Xoá khối 'Bối cảnh giáo trình' lặp lại và các mục boilerplate; đánh số lại 17.14.x.
- **major** · nhất quán · [17.2-messaging-fears-lost-duplicates.md:801](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.2-messaging-fears-lost-duplicates.md): Cùng một integration event của CRM có hình dạng khác nhau ở mỗi bài, có khi trong cùng một bài: LeadDaChotV1 có 13 trường (17.1), (EventId, LeadId, GiaTri) (17.1 Bài 3, 17.3), (Guid, leadId, khachHangId, 5_000_000, "VND") (17.2), (…TienTe, ThoiDiemUtc, TenantId) (17.8). Song song đó có LeadConvertedEvent, LeadConvertedIntegrationEvent, LeadConvertedV1, LeadDaChot cho cùng một sự kiện. Bảng outbox cũng lúc thì OutboxMessages/ProcessedOnUtc, lúc thì Outbox/TinNhanOutbox/GuiLuc; inbox lúc InboxMessages, lúc MessageDaXuLy (PK Guid) hoặc Khoa (string). Code giữa các bài không ghép lại được với nhau.
  - Bằng chứng: `var e = new LeadDaChotV1(Guid.CreateVersion7(), leadId, khachHangId, 5_000_000, "VND"); (17.2) vs public record LeadDaChotV1(Guid EventId, Guid LeadId, decimal GiaTri); (17.1)`
  - Sửa: Định nghĩa một 'bộ hợp đồng CRM' chuẩn ở đầu module (file Crm.Contracts mẫu): LeadConvertedV1 với danh sách trường cố định, OutboxMessage và InboxMessage cố định. Mọi bài dùng lại đúng định nghĩa đó. Chọn một quy ước đặt tên: tiếng Anh cho định danh code, tiếng Việt cho chú thích, theo quy ước chung của khoá.
- **major** (ban đầu critical) · nhất quán · [17.3-outbox-pattern-applied.md:79](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied.md): Interceptor tự động serialize nguyên domain event vào outbox rồi dispatcher publish ra broker. Cách làm này mâu thuẫn trực tiếp với 17.1, nơi cấm publish domain event (domain event chứa entity Lead, gây lỗi cycle khi serialize, rò rỉ dữ liệu và biến cấu trúc nội bộ thành API công khai). Sinh viên sẽ chép nguyên mẫu sai này.
  - Bằng chứng: `Payload = JsonSerializer.Serialize(domainEvent, domainEvent.GetType())  // domain event, vd LeadConvertedDomainEvent(Lead Lead)`
  - Sửa: Đổi interceptor sang chỉ ghi integration event: hoặc gom IIntegrationEvent mà handler đã dịch, hoặc giữ interceptor nhưng gọi một mapper IDomainToIntegrationEventMapper. Thêm cảnh báo 'không serialize domain event chứa entity', kèm link về 17.1 mục domain vs integration event.
  - Phản biện (adjusted): Mâu thuẫn có thật: 17.1 dòng 121 và 132 cấm publish domain event, LeadConvertedDomainEvent(Lead Lead) còn chứa entity. Trong khi đó interceptor ở 17.3 dòng 79 lại serialize nguyên domain event vào outbox. Hạ xuống major vì code vẫn chạy nếu domain event chỉ gồm kiểu đơn giản; đây là lỗi thiết kế, không làm code hỏng. Cách sửa (mapper sang integration event, thêm cảnh báo, link về 17.1) giữ nguyên.
- **major** · chính xác · [17.3-outbox-pattern-applied.md:120](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied.md): Câu SQL được giới thiệu là cách đúng (UPDATE ... SET ProcessedOnUtc ... OUTPUT) đánh dấu đã xử lý TRƯỚC khi publish. Đây là at-most-once. Ngay đoạn sau, bài lại khuyên 'Chọn đánh dấu sau'. Người học không biết nên dùng mẫu nào, và mẫu duy nhất có code lại là mẫu bị khuyên tránh.
  - Bằng chứng: `UPDATE TOP (100) OutboxMessages WITH (READPAST, UPDLOCK) SET ProcessedOnUtc = SYSUTCDATETIME() OUTPUT ... ; ... Chọn đánh dấu **sau**`
  - Sửa: Thay bằng SELECT ... WITH (UPDLOCK, READPAST) trong transaction, publish rồi mới UPDATE ProcessedOnUtc trước khi commit (như 17.3 Bài 1). Nếu muốn giữ mẫu UPDATE…OUTPUT thì ghi rõ đó là 'claim trước' và cần thêm cột LockedUntil hoặc trạng thái Processing để tránh mất message.
- **major** · chính xác · [17.3-outbox-pattern-applied.md:168](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied.md): Bài khẳng định exception thoát khỏi ExecuteAsync 'giết luôn BackgroundService và nó không tự khởi động lại'. Từ .NET 6, hành vi mặc định (BackgroundServiceExceptionBehavior.StopHost) là dừng cả host, tức cả ứng dụng, chứ không chỉ một service. Link 'bài 14.9' cũng trỏ sang 14.8-message-bus-intro.
  - Bằng chứng: `một exception thoát ra khỏi 'ExecuteAsync' sẽ **giết luôn** 'BackgroundService' và nó không tự khởi động lại ([bài 14.9](...14.8-message-bus-intro.md))`
  - Sửa: Sửa thành: 'Từ .NET 6, exception chưa bắt trong ExecuteAsync mặc định sẽ dừng cả host (HostOptions.BackgroundServiceExceptionBehavior = StopHost); đặt Ignore thì chỉ service đó chết im lặng'. Sửa nhãn link cho đúng bài.
- **major** · chính xác · [17.3-outbox-pattern-applied.md:176](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied.md): Ví dụ 'giữ thứ tự theo aggregate' dùng cột AggregateId mà bảng outbox của bài không có. Ngoài ra, khi chạy nhiều dispatcher với READPAST, một instance có thể bỏ qua message cũ (đang bị khoá) và publish message mới hơn của cùng aggregate, nên thứ tự vẫn không được bảo đảm như bài ngụ ý.
  - Bằng chứng: `ORDER BY AggregateId, OccurredOnUtc ... foreach (var group in batch.GroupBy(m => m.AggregateId))`
  - Sửa: Thêm cột AggregateId vào DDL ở 17.4.2 (17.3). Nói rõ: muốn giữ thứ tự theo aggregate với nhiều dispatcher thì phải khoá theo aggregate (vd chỉ lấy message cũ nhất chưa xử lý của mỗi aggregate, hoặc partition theo aggregate cho một dispatcher), nếu không thì dùng số phiên bản ở consumer (17.10).
- **major** · chính xác · [17.5-change-data-capture.md:669](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.5-change-data-capture.md): Lab Debezium không chạy được: 'abc-123'::uuid không phải UUID hợp lệ, nên PostgreSQL báo lỗi 'invalid input syntax for type uuid'. Lệnh `docker exec kafka ...` và `docker exec postgres ...` cũng không chạy vì compose không đặt container_name (tên thật là &lt;project&gt;-kafka-1). Service kafka (apache/kafka 3.8) thiếu KAFKA_LISTENER_SECURITY_PROTOCOL_MAP cho listener CONTROLLER.
  - Bằng chứng: `VALUES (gen_random_uuid(), 'abc-123'::uuid, 'lead', ...) ... docker exec kafka /opt/kafka/bin/kafka-console-consumer.sh`
  - Sửa: Dùng UUID thật (gen_random_uuid() hoặc '0192f8a3-...-...'). Thêm `container_name: kafka`/`postgres` hoặc đổi sang `docker compose exec kafka ...`. Bổ sung `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT`. Đổi image sang quay.io/debezium/connect (Docker Hub đã ngừng cập nhật) với phiên bản 3.x đã kiểm chứng. Chạy thử toàn bộ lab trước khi phát hành.
- **major** · thực tế · [17.6-retry-and-backoff.md:53](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.6-retry-and-backoff.md): Bài dạy tự bắt exception rồi context.Send sang _dlqUri để tạo DLQ thủ công, trong khi MassTransit đã có queue _error sẵn và cơ chế r.Ignore&lt;T&gt;/r.Handle&lt;T&gt;. Cách tự làm này nuốt exception (message được ACK) và mất header fault chuẩn. Tên method ConsumeAsync cũng không khớp interface IConsumer&lt;T&gt;.Consume.
  - Bằng chứng: `catch (Exception ex) { _logger.LogError(...); await context.Send(_dlqUri, context.Message); }`
  - Sửa: Thay bằng cấu hình chuẩn: `e.UseMessageRetry(r => { r.Exponential(...); r.Ignore<JsonException>(); r.Ignore<ValidationException>(); });` và để MassTransit chuyển sang `<queue>_error`. Nêu rõ trường hợp nào mới cần DLQ tự viết. Đổi tên method thành Consume.
- **major** · chính xác · [17.6-retry-and-backoff.md:122](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.6-retry-and-backoff.md): Retry hai tầng của MassTransit được cấu hình sai thứ tự và thiếu scheduler. Tài liệu MassTransit yêu cầu UseDelayedRedelivery/UseScheduledRedelivery đặt TRƯỚC (bao ngoài) UseMessageRetry, và redelivery cần message scheduler (AddDelayedMessageScheduler + cfg.UseDelayedMessageScheduler, hoặc plugin delayed exchange). Thiếu scheduler thì redelivery ném lỗi lúc chạy. Lỗi lặp lại ở 17.8 dòng 69 và 17.13 dòng 631-648.
  - Bằng chứng: `e.UseMessageRetry(r => r.Immediate(3)); e.UseScheduledRedelivery(r => r.Intervals(...));`
  - Sửa: Viết lại: `x.AddDelayedMessageScheduler(); ... cfg.UseDelayedMessageScheduler(); e.UseDelayedRedelivery(r => r.Intervals(1m,5m,15m)); e.UseMessageRetry(r => r.Immediate(3));`, kèm ghi chú về thứ tự filter và yêu cầu scheduler. Sửa đồng loạt ở 17.8 và 17.13.
- **major** · nhất quán · [17.6-retry-and-backoff.md:306](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.6-retry-and-backoff.md): Bài tự mâu thuẫn về jitter. Mục 17.7.3 trình bày full jitter là 'ĐÚNG' và trích AWS rằng full jitter tốt nhất. Bảng trong Bài 1 lại kết luận 'Equal jitter là mặc định tốt', còn full jitter 'chỉ khi tải rất cao'. Người học không biết chọn cái nào.
  - Bằng chứng: `| **Equal jitter** | 1.028 req/s | **Mặc định tốt** ... | Full jitter | 772 req/s | Tải rất cao ...`
  - Sửa: Thống nhất một khuyến nghị: dùng UseJitter = true của Polly (thuật toán decorrelated jitter) cho HttpClient; khi tự viết thì full jitter có trần. Nêu equal jitter như lựa chọn khi cần sàn tối thiểu. Sửa câu 'Với full jitter, lần thử thứ năm có thể nhanh hơn lần đầu' thành một đánh đổi chứ không phải lý do loại bỏ.
- **major** · chính xác · [17.7-outbox-idempotency-demo.md:118](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.7-outbox-idempotency-demo.md): OutboxDispatcher là BackgroundService (singleton) nhưng inject thẳng IPublishEndpoint, vốn là service scoped trong MassTransit. Ở môi trường Development, ValidateScopes sẽ ném lỗi 'Cannot consume scoped service' khi khởi động.
  - Bằng chứng: `public sealed class OutboxDispatcher(IServiceScopeFactory scopeFactory, IPublishEndpoint publisher, ILogger<OutboxDispatcher> logger) : BackgroundService`
  - Sửa: Inject IBus (singleton) hoặc lấy IPublishEndpoint từ scope trong DispatchBatchAsync: `var publisher = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();`.
- **major** · thực tế · [17.8-masstransit-nservicebus-easynetq.md:3](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.8-masstransit-nservicebus-easynetq.md): Thông tin giấy phép mơ hồ và đã lỗi thời. Tính đến 10/2026, MassTransit v9 (9.1.x trên NuGet) đã phát hành dưới giấy phép thương mại (Massient), còn v8 vẫn theo giấy phép mã nguồn mở. Bài chỉ nói 'đã công bố chuyển sang thương mại cho phiên bản tương lai', trong khi toàn khoá học dựa vào MassTransit mà không nói sinh viên nên dùng bản nào. Bài cũng không nhắc các lựa chọn MIT phổ biến như Wolverine hay Rebus.
  - Bằng chứng: `| **MassTransit** | Mã nguồn mở, **đã công bố chuyển sang thương mại** cho phiên bản tương lai |`
  - Sửa: Ghi cụ thể: 'MassTransit v9+ là sản phẩm thương mại cần license; v8.x là Apache 2.0 nhưng hỗ trợ có thời hạn (kiểm tra masstransit.io/support)'. Ghim phiên bản dùng trong khoá học (vd MassTransit 8.x) cho mọi ví dụ. Bổ sung Wolverine và Rebus vào bảng so sánh. Sửa NServiceBus: bỏ MSMQ (chỉ .NET Framework), thêm SQL Server/PostgreSQL transport.
  - Phản biện (adjusted): Reviewer trích sai bằng chứng: bài không có câu 'đã công bố chuyển sang thương mại cho phiên bản tương lai'. Dòng 3, 27, 37 chỉ khuyên 'kiểm tra giấy phép theo phiên bản'. Vấn đề còn lại vẫn có thật: không ghim phiên bản MassTransit cho toàn khóa, trong khi v9 cần license thương mại; sinh viên chạy `dotnet add package MassTransit` sẽ lấy bản mới nhất. Dòng 22 vẫn liệt kê MSMQ cho NServiceBus (MSMQ chỉ có trên .NET Framework). Bảng chưa có Wolverine/Rebus (bổ sung tùy chọn).
- **minor** · nhất quán · [17.1-event-driven-architecture-when-to-use.md:17](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Đánh số mục lệch một đơn vị ở mọi bài: 17.1 dùng '17.2.1…', 17.2 dùng '17.3.x', …, 17.14 dùng '17.15.x'. Module 18 lệch tương tự (18.1 dùng '18.2.x', 18.13 dùng '18.14.x'). Các tham chiếu chéo như 'mục 18.2.5', 'mục 17.8.6' vì thế trỏ sai.
  - Bằng chứng: `# 17.1 - Event-driven architecture ... ### 17.2.1 — Ba lý do chính đáng`
  - Sửa: Đánh số lại bằng script: trong file N.M, đổi '### N.(M+1).k' thành '### N.M.k'. Cập nhật mọi tham chiếu 'mục X.Y.Z' trong văn bản.
- **minor** · chính xác · [17.1-event-driven-architecture-when-to-use.md:233](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Timeline 'chờ 100 giây' không hợp lý với kịch bản docker stop erp-service. Kết nối TCP bị từ chối hoặc DNS không phân giải sẽ thất bại ngay, không chờ hết HttpClient.Timeout 100 giây. Timeline cũng ghi retry Polly ở chế độ mặc định, vốn không có retry.
  - Bằng chứng: `t=0,05    Kết nối TCP thất bại -> Polly retry lần 1 ... t=100,4   HttpClient timeout hết hạn`
  - Sửa: Đổi kịch bản thành 'erp-service treo hoặc chậm (vd tc netem hoặc endpoint Task.Delay)' để minh hoạ timeout 100 giây, hoặc sửa kết quả thành lỗi nhanh 'Connection refused' và nêu rằng 100 giây xảy ra khi bên kia treo chứ không phải khi đã tắt.
- **minor** (ban đầu major) · chính xác · [17.1-event-driven-architecture-when-to-use.md:272](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.1-event-driven-architecture-when-to-use.md): Bảng tính sẵn sàng tổng hợp không nhất quán. Hàng 0 và 1 tính API chính + n phụ thuộc (0,999^(n+1)), nhưng hàng 3, 5, 10 lại trừ tuyến tính: 3 phụ thuộc ra 99,70% trong khi đúng phải là 0,999^4 = 99,60%; 10 phụ thuộc ra 99,00% thay vì 98,91%. Bảng cũng mâu thuẫn với 18.4 (4 phụ thuộc = 99,60%).
  - Bằng chứng: `| 3 | 99,70% | 26,3 giờ | ... | 10 | 99,00% | 87,6 giờ |`
  - Sửa: Tính lại theo 0,999^(n+1): 0 → 99,90%/8,8h; 1 → 99,80%/17,5h; 3 → 99,60%/35,0h; 5 → 99,40%/52,5h; 10 → 98,91%/95,5h. Ghi rõ công thức phía trên bảng.
  - Phản biện (adjusted): Bảng ở dòng 272-278 tính không nhất quán, đúng như báo: hàng 3, 5, 10 trừ tuyến tính. Hạ xuống minor vì kết luận định tính không đổi. Giá trị đúng theo 0,999^(n+1): 3 phụ thuộc → 99,60%/35,0h; 5 → 99,40%/52,5h; 10 → 98,91%/~95,9h (không phải 95,5h như reviewer ghi).
- **minor** · thực tế · [17.11-advanced-notes.md:1](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.11-advanced-notes.md): Khối lượng quá tải so với sinh viên năm 1-3: một bài 'mở rộng' gồm saga state machine đầy đủ, Marten event sourcing, upcasting, crypto-shredding, schema registry. Mỗi bài tập lại có lời giải vài trăm dòng ở mức senior. Bài cũng không có lộ trình 'tối thiểu cần nắm' và 'đọc thêm'.
  - Bằng chứng: `#### Bài 2 — Thử Marten và event sourcing ... o.Events.Upcast<LeadDaTao, LeadDaTaoV2>(...) ... crypto-shredding`
  - Sửa: Đánh dấu bài 17.5 (CDC), 17.11 là 'Nâng cao — tuỳ chọn' trong README. Thêm ở đầu mỗi bài một khung 'Tối thiểu cần nắm (15 phút)' và 'Đọc thêm'. Rút gọn lời giải thành phần cốt lõi, đưa phần mở rộng vào &lt;details&gt; riêng.
- **minor** · chính xác · [17.3-outbox-pattern-applied.md:443](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.3-outbox-pattern-applied.md): Gọi timer.WaitForNextTickAsync(ct) mới ở mỗi vòng trong Task.WhenAny trong khi lần chờ trước có thể vẫn đang chờ (khi tín hiệu thắng). PeriodicTimer chỉ cho một lần chờ tại một thời điểm, nên sẽ ném InvalidOperationException.
  - Bằng chứng: `await Task.WhenAny(_outboxSignal.WaitAsync(ct), timer.WaitForNextTickAsync(ct).AsTask());`
  - Sửa: Giữ lại task tick đang chờ giữa các vòng (chỉ tạo mới khi task trước đã hoàn tất), hoặc dùng Channel/SemaphoreSlim với Task.Delay thay cho PeriodicTimer.
- **minor** (ban đầu major) · chính xác · [17.4-kafka-vs-rabbitmq-pragmatic.md:40](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.4-kafka-vs-rabbitmq-pragmatic.md): Bài khẳng định tuyệt đối 'RabbitMQ không đọc lại được, message bị xoá sau ACK'. Từ RabbitMQ 3.9 đã có RabbitMQ Streams (log append-only, có offset, replay được), và bản 4.x vẫn hỗ trợ. Classic mirrored queue cũng đã bị gỡ hẳn ở RabbitMQ 4.0, không chỉ 'nên thay'.
  - Bằng chứng: `| Đọc lại | Không (trừ khi publish lại) | **Có — đặt lại offset** | ... RabbitMQ: message đã ack không còn tồn tại`
  - Sửa: Ghi rõ 'classic/quorum queue xoá sau ACK; RabbitMQ Streams (3.9+) có replay theo offset nhưng hệ sinh thái và công cụ kém Kafka'. Sửa câu về mirrored queue: 'đã bị loại bỏ ở RabbitMQ 4.0, dùng quorum queue'.
  - Phản biện (adjusted): Có thật: RabbitMQ Streams (từ 3.9) hỗ trợ replay theo offset, và classic mirrored queue đã bị gỡ ở RabbitMQ 4.0. Dòng 109 chỉ nói 'thay cho'. Tuy nhiên, phân biệt queue truyền thống với log của Kafka vẫn đúng với quorum/classic queue mà khóa học dùng. Hạ xuống minor: chỉ cần thêm ghi chú về Streams và sửa câu về mirrored queue.
- **minor** · chính xác · [17.4-kafka-vs-rabbitmq-pragmatic.md:263](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.4-kafka-vs-rabbitmq-pragmatic.md): Bài giới thiệu partitioner của MassTransit là 'cách nên dùng' để giữ thứ tự, nhưng không nói partitioner chỉ giữ thứ tự TRONG một instance consumer. Khi scale nhiều instance, message cùng LeadId vẫn có thể bị xử lý song song ở hai instance. Nên kiểm tra lại tên API ConfigurePartitioner với tài liệu MassTransit v8.
  - Bằng chứng: `e.ConfigurePartitioner<LeadDaChotV1>(context, 8, m => m.Message.LeadId);`
  - Sửa: Thêm cảnh báo về phạm vi một instance. Gợi ý Single Active Consumer (x-single-active-consumer) hoặc partition ở broker (Kafka key, RabbitMQ consistent-hash exchange, Azure Service Bus sessions) khi cần thứ tự trên nhiều instance. Đối chiếu cú pháp với tài liệu MassTransit (UsePartitioner).
- **minor** · chính xác · [17.4-kafka-vs-rabbitmq-pragmatic.md:587](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.4-kafka-vs-rabbitmq-pragmatic.md): Kết quả đo 'không đặt prefetch' (187 message unacked ở consumer-1) mâu thuẫn với cấu hình MassTransit. MassTransit luôn đặt PrefetchCount mặc định (khoảng ProcessorCount × 2, tối thiểu 16), nên unacked không thể lên 187. Hiện tượng 'ôm hết' chỉ xảy ra với RabbitMQ.Client thuần không gọi BasicQos.
  - Bằng chứng: `// Không đặt PrefetchCount -> MassTransit mặc định khá cao ... cong-viec    0    187`
  - Sửa: Hoặc làm thí nghiệm bằng RabbitMQ.Client không BasicQos, hoặc đặt tường minh `e.PrefetchCount = 200` để tái hiện, rồi sửa số liệu cho khớp. Nêu đúng giá trị mặc định của MassTransit.
- **minor** · chính xác · [17.5-change-data-capture.md:309](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.5-change-data-capture.md): Database.SqlQuery&lt;byte[]&gt;(...) rồi FirstAsync sẽ bị EF Core 'compose' thành subquery. Với kiểu scalar, cột kết quả phải có alias 'Value', nếu không truy vấn lỗi. Lỗi tương tự ở 17.12 dòng 618 (SqlQuery&lt;int&gt; COUNT(*)).
  - Bằng chứng: `.SqlQuery<byte[]>($"SELECT sys.fn_cdc_get_max_lsn()").FirstAsync(ct);`
  - Sửa: Viết `SqlQuery<byte[]>($"SELECT sys.fn_cdc_get_max_lsn() AS Value")` và `SELECT COUNT(*) AS Value FROM ...`, kèm chú thích quy tắc alias Value của EF Core.
- **minor** · dễ hiểu · [17.7-outbox-idempotency-demo.md:1](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.7-outbox-idempotency-demo.md): Tiêu đề 'Demo tinh thần' là cách nói tiếng Việt khó hiểu (dịch máy kiểu 'demo in spirit'). Nhiều code block có chú thích không dấu ('Danh dau SAU khi publish', 'gianh cho') lẫn với có dấu, và lỗi chính tả 'Xpect:' xuất hiện ở 17.9, 17.11, 18.1.
  - Bằng chứng: `# 17.7 - Demo tinh thần: Outbox + idempotency ... // Danh dau SAU khi publish -> at-least-once, consumer lo phan trung`
  - Sửa: Đổi tiêu đề thành '17.7 - Thực hành: Outbox + idempotency đầu-cuối'. Chuẩn hoá chú thích code thành tiếng Việt có dấu. Sửa 'Xpect' thành 'Expected'.
- **minor** · chính xác · [17.8-masstransit-nservicebus-easynetq.md:86](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.8-masstransit-nservicebus-easynetq.md): State machine mẫu không biên dịch được: thiếu khai báo các Event (OrderSubmitted, PaymentReceived, PaymentTimeout), thiếu cấu hình correlate, và PaymentTimeout cần Schedule. Cùng lỗi ở 17.11 (ChotLeadSaga dùng TimeoutTokenId không có trong state và khai báo Schedule sau khi dùng).
  - Bằng chứng: `Initially(When(OrderSubmitted) ... During(AwaitingPayment, When(PaymentReceived) ... When(PaymentTimeout)`
  - Sửa: Bổ sung `public Event<OrderSubmitted> OrderSubmitted { get; private set; } = null!;` và các event còn lại, `Event(() => OrderSubmitted, x => x.CorrelateById(m => m.Message.OrderId));`, `Schedule(() => PaymentTimeout, s => s.PaymentTimeoutToken, ...)` cùng thuộc tính `Guid? PaymentTimeoutToken` trong OrderState. Hoặc ghi rõ 'trích đoạn, xem mã đầy đủ ở repo mẫu'.
- **minor** · chính xác · [17.9-roadmap-sh-supplement.md:372](../lessons/stage-05-senior-engineering/module-17-distributed-systems/17.9-roadmap-sh-supplement.md): Một số giới hạn dịch vụ đám mây đã lỗi thời: AWS SQS đã nâng kích thước message tối đa lên 1 MiB (2025); SQS FIFO high-throughput vượt xa 300/3.000 TPS; Google Pub/Sub cho phép giữ message ở topic tới 31 ngày; RabbitMQ 4.x mặc định max message size 16 MiB chứ không phải 128 MB.
  - Bằng chứng: `AWS SQS:                     256 KB ... AWS SQS FIFO: tối đa 300 giao dịch/giây ... Google Pub/Sub: giữ message tối đa 7 ngày ... RabbitMQ: thường 128 MB`
  - Sửa: Cập nhật số liệu theo tài liệu chính thức hiện hành và thêm dòng 'số liệu tại thời điểm 10/2026 — kiểm tra lại trước khi thiết kế'.
- **minor** (ban đầu major) · đầy đủ · [README.md:3](../lessons/stage-05-senior-engineering/module-17-distributed-systems/README.md): README hứa dạy 'consistency models … sagas', nhưng module không có bài nào giải thích các mô hình nhất quán (strong/eventual/read-your-writes), CAP/PACELC hay các 'fallacies of distributed computing'. Đây là khái niệm nền mà sinh viên cần trước khi học outbox/idempotency. Saga chỉ được nhắc rải rác trong 17.11.
  - Bằng chứng: `> **Tóm tắt:** Hệ phân tán: consistency models, message brokers, idempotency, sagas`
  - Sửa: Thêm một bài mở đầu 17.0 'Nền tảng hệ phân tán' (dễ, nhiều hình): 8 fallacies, CAP/PACELC bằng ví dụ CRM, eventual consistency và read-your-writes, ACK/NACK, at-most/at-least-once. Hoặc sửa README cho khớp nội dung thật.
  - Phản biện (adjusted): Một phần không đúng: eventual consistency được giải thích ở 17.1 dòng 77 và trong nhiều đoạn khác. Saga có ở 17.1 (Cách 3), 17.8 và 17.11 (state machine). Phần thiếu thật là CAP/PACELC, các fallacies of distributed computing và các mô hình nhất quán khác như read-your-writes. Hạ xuống minor: sửa README cho khớp, hoặc bổ sung một mục nền ngắn, không nhất thiết thêm cả bài mới.

### Module 18 - Microservices

- **major** · chính xác · [18.10-advanced-notes.md:206](../lessons/stage-05-senior-engineering/module-18-microservices/18.10-advanced-notes.md): Bài khẳng định WithReference làm service 'khởi động sau api' và bảng ghi 'Thứ tự khởi động: suy ra từ WithReference'. Trong Aspire, WithReference chỉ tiêm connection string hoặc endpoint; muốn chờ tài nguyên sẵn sàng phải gọi WaitFor (Aspire 9+). Bài cũng chưa cập nhật Aspire 13 (đổi tên thành 'Aspire', có CLI `aspire run/publish`, manifest publisher cũ đã được thay).
  - Bằng chứng: `.WithReference(api);                        // phụ thuộc: khởi động sau api ... | Thứ tự khởi động | 'depends_on' + healthcheck viết tay | Suy ra từ 'WithReference' |`
  - Sửa: Thêm `.WaitFor(api)`, `.WaitFor(sql)` và sửa bảng thành 'WaitFor/WaitForCompletion'. Cập nhật phần triển khai theo Aspire hiện hành (aspire publish/deploy, publisher cho Docker Compose/Kubernetes) và ghi phiên bản Aspire dùng trong khoá.
- **major** · chính xác · [18.11-mini-case-study.md:106](../lessons/stage-05-senior-engineering/module-18-microservices/18.11-mini-case-study.md): Bản sửa chống trùng commit bản ghi 'đã gửi' TRƯỚC rồi mới gửi email. Nếu gửi thất bại hoặc tiến trình chết, thông báo bị đánh dấu đã gửi mà không bao giờ được gửi, vi phạm ràng buộc 'không được mất thông báo nào' của chính case study. Consumer ở Bài 3 (dòng 542-557) lặp lại lỗi. 'Bảng chống trùng dùng chung' giữa monolith và service mới cũng ngầm dùng chung database.
  - Bằng chứng: `_db.SentNotifications.Add(...); await _db.SaveChangesAsync(ct); ... await _emailSender.SendAsync(notification, ct);`
  - Sửa: Nêu rõ đánh đổi at-most-once và at-least-once. Mẫu khuyến nghị: ghi trạng thái 'DangGui' (claim) → gửi email kèm idempotency key của nhà cung cấp (vd header/Message-ID) → cập nhật 'DaGui'; claim quá hạn thì cho gửi lại. Ghi chú bảng chống trùng dùng chung chỉ là tạm thời trong giai đoạn chuyển tiếp.
- **major** · chính xác · [18.12-quick-real-world-example.md:18](../lessons/stage-05-senior-engineering/module-18-microservices/18.12-quick-real-world-example.md): Timeline sự cố tự mâu thuẫn với cấu hình probe. Liveness có periodSeconds 10 và failureThreshold 3, nên cần khoảng 30 giây thất bại liên tiếp mới bị giết. Database chỉ chậm 12 giây (hồi phục 14:02:22), nên tối đa 2 lần thất bại và không pod nào bị giết. Dòng 14:02:22 cũng đặt sai thứ tự sau 14:03:10.
  - Bằng chứng: `14:02:10  Database chuyển dự phòng, mọi truy vấn chậm ~12 giây ... 14:02:40  Kubernetes giết TẤT CẢ pod ... 14:02:22  <- database ĐÃ HỒI PHỤC`
  - Sửa: Sửa số liệu cho nhất quán, vd database chậm 45 giây hoặc failureThreshold 1 và timeoutSeconds 1. Sắp xếp timeline theo thời gian. Giải thích pod mới vẫn fail vì thundering herd kết nối khi DB vừa lên.
- **major** · chính xác · [18.12-quick-real-world-example.md:350](../lessons/stage-05-senior-engineering/module-18-microservices/18.12-quick-real-world-example.md): Cách tái hiện bằng Docker Compose sai. Docker không tự restart container khi healthcheck báo unhealthy, vì restart: always chỉ áp dụng khi tiến trình thoát. Cột STATUS sẽ hiện 'Up (unhealthy)' chứ không nhảy sang 'Restarting' như bài mô tả.
  - Bằng chứng: `restart: always          # <- tương đương hành vi giết-và-khởi-động-lại ... Cột 'STATUS' sẽ nhảy qua lại giữa 'Up' và 'Restarting'`
  - Sửa: Sửa: 'Docker Compose không có cơ chế liveness; healthcheck chỉ đổi trạng thái thành unhealthy (dùng cho depends_on: condition: service_healthy). Muốn mô phỏng phải dùng container autoheal hoặc chạy trên kind/minikube.' Cập nhật kết quả mong đợi.
- **major** · cấu trúc · [18.13-review-and-assessment.md:51](../lessons/stage-05-senior-engineering/module-18-microservices/18.13-review-and-assessment.md): Bài Review là boilerplate giống 17.14. Có tiêu đề rỗng 'Kiểm tra & Thực hành (100 điểm)'. Khối 'Bối cảnh giáo trình' lặp nguyên văn. Quiz 5 câu với phương án nhiễu vô nghĩa và đáp án hiện ngay. Lab (2 service + YARP + OTel) không có hướng dẫn dựng, mã khởi đầu hay lời giải. 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' rỗng nội dung.

  ```text
  ### 18.14.3 — Kiểm tra & Thực hành (100 điểm)
  
  ### 18.14.4 — Bối cảnh giáo trình ... 1. API Gateway đóng vai trò chính? A. Thay thế DB ... C. Chỉ build Docker
  ```

  - Sửa: Viết lại thành lab có hướng dẫn: AppHost Aspire với Gateway (YARP), Sales.Api, Billing.Api, RabbitMQ; các bước 1-6 kèm lệnh chạy, tiêu chí đạt và repo lời giải mẫu. Thêm 10-15 câu quiz tình huống CRM với đáp án trong &lt;details&gt;. Xoá phần boilerplate; đánh số lại 18.13.x.
- **major** · chính xác · [18.2-service-decomposition.md:114](../lessons/stage-05-senior-engineering/module-18-microservices/18.2-service-decomposition.md): Consumer nhân bản dữ liệu dùng info! nên ném NullReferenceException khi chưa có bản ghi. Consumer cũng không bao giờ đặt lại HasOverdueInvoice = false khi khách đã trả, không kiểm tra thứ tự, không idempotent. Mẫu này được trình bày như 'cách 2' chuẩn mà không có cảnh báo, trong khi Bài 2 của cùng bài mới làm đúng.
  - Bằng chứng: `var info = await db.CustomerBillingInfo.FirstOrDefaultAsync(...); info!.HasOverdueInvoice = true;`
  - Sửa: Viết lại: nếu null thì Add mới; dùng số phiên bản hoặc OccurredAtUtc để bỏ qua event cũ; có event đối xứng InvoicePaid hoặc gửi trạng thái tuyệt đối (HasOverdueInvoice trong payload). Thêm cảnh báo khi dùng toán tử '!'.
- **major** · chính xác · [18.3-api-gateway-yarp-dotnet.md:64](../lessons/stage-05-senior-engineering/module-18-microservices/18.3-api-gateway-yarp-dotnet.md): Policy tên 'per-user' được tạo bằng AddFixedWindowLimiter, vốn là một bộ giới hạn DÙNG CHUNG cho mọi người dùng (100 request/phút cho toàn bộ gateway), không phải theo user. Triển khai thật thì cả hệ thống bị chặn sau 100 request mỗi phút.
  - Bằng chứng: `options.AddFixedWindowLimiter("per-user", o => { o.PermitLimit = 100; o.Window = TimeSpan.FromMinutes(1); });`
  - Sửa: Dùng `options.AddPolicy("per-user", ctx => RateLimitPartition.GetFixedWindowLimiter(ctx.User.FindFirst("sub")?.Value ?? ctx.Connection.RemoteIpAddress?.ToString() ?? "anon", _ => new FixedWindowRateLimiterOptions { PermitLimit = 100, Window = TimeSpan.FromMinutes(1) }));` và đặt `options.RejectionStatusCode = 429`.
- **major** · chính xác · [18.3-api-gateway-yarp-dotnet.md:180](../lessons/stage-05-senior-engineering/module-18-microservices/18.3-api-gateway-yarp-dotnet.md): Cấu hình timeout cho YARP bằng builder.Services.AddHttpClient("yarp") không có tác dụng, vì YARP không dùng IHttpClientFactory hay named client. Timeout của YARP đặt theo route (Timeout/TimeoutPolicy) hoặc theo cluster (HttpRequest.ActivityTimeout). Phần 'Tự kiểm tra' dựa trên đoạn code sai này.
  - Bằng chứng: `builder.Services.AddHttpClient("yarp").ConfigureHttpClient(c => c.Timeout = TimeSpan.FromSeconds(30));`
  - Sửa: Thay bằng cấu hình YARP: trong cluster `"HttpRequest": { "ActivityTimeout": "00:00:30" }` hoặc trong route `"Timeout": "00:00:30"` (YARP 2.1+ kèm app.UseRequestTimeouts()). Dẫn link tài liệu YARP timeouts.
- **major** · chính xác · [18.4-inter-service-communication.md:835](../lessons/stage-05-senior-engineering/module-18-microservices/18.4-inter-service-communication.md): HybridCache không có method GetOrDefaultAsync, API chỉ gồm GetOrCreateAsync, SetAsync, RemoveAsync, RemoveByTagAsync. Code phương án dự phòng vì thế không biên dịch được. Bài cũng không nhắc package Microsoft.Extensions.Caching.Hybrid.
  - Bằng chứng: `var giaCache = await cache.GetOrDefaultAsync<BangGia>($"gia:{sanPhamId}", ct);`
  - Sửa: Dùng `await cache.GetOrCreateAsync<BangGia?>(key, _ => ValueTask.FromResult<BangGia?>(null), new HybridCacheEntryOptions { Flags = HybridCacheEntryFlags.DisableLocalCacheWrite | HybridCacheEntryFlags.DisableDistributedCacheWrite }, cancellationToken: ct)`, hoặc dùng IDistributedCache.GetAsync cho bản 'giá cuối đã biết'. Ghi tên package.
- **major** · nhất quán · [18.5-observability-three-pillars.md:136](../lessons/stage-05-senior-engineering/module-18-microservices/18.5-observability-three-pillars.md): Ví dụ ở mục 18.6.4 (18.5) nói 990 request 50ms và 10 request 5000ms thì p99 = 5000ms. Bài 2 của chính bài này lại giải thích đúng rằng khi đúng 1% request chậm thì p99 vẫn là 50ms. Câu tự kiểm tra lặp lại khẳng định sai.
  - Bằng chứng: `1000 request: 990 cai 50ms, 10 cai 5000ms ... p99 = 5000ms   -> 1% người dùng đợi 5 GIÂY`
  - Sửa: Đổi ví dụ thành 980 request 50ms và 20 request 5000ms (2% chậm, khi đó p99 = 5000ms), hoặc giữ 1% nhưng dùng p99.9. Sửa câu tự kiểm tra tương ứng.
- **major** · chính xác · [18.5-observability-three-pillars.md:176](../lessons/stage-05-senior-engineering/module-18-microservices/18.5-observability-three-pillars.md): Chú thích ghi TraceIdRatioBasedSampler(0.1) là '10% request thành công'. Head-based sampler quyết định ở đầu request nên lấy 10% mọi trace, kể cả trace lỗi, và sẽ bỏ 90% trace lỗi. Điều này mâu thuẫn với dòng 'Luôn lấy lỗi' trong bảng ngay trên và với checklist 'Trace của request lỗi luôn được giữ'.
  - Bằng chứng: `.SetSampler(new TraceIdRatioBasedSampler(0.1))    // 10% request thành công`
  - Sửa: Sửa chú thích thành '10% mọi request, kể cả lỗi'. Nói rõ muốn 'luôn giữ lỗi' thì phải dùng tail-based sampling ở OpenTelemetry Collector (như ví dụ ở 18.3), và nên dùng ParentBasedSampler để giữ nhất quán giữa các service.
- **major** · thực tế · [18.5-observability-three-pillars.md:212](../lessons/stage-05-senior-engineering/module-18-microservices/18.5-observability-three-pillars.md): Lab không tái hiện được như mô tả. Compose có Jaeger, Prometheus, Loki, Grafana nhưng không có OpenTelemetry Collector và không có Tempo. Ứng dụng export log qua OTLP tới cổng 4317 của Jaeger (Jaeger không nhận log), nên Loki không bao giờ có log. Grafana được cấu hình datasource Tempo vốn không tồn tại. prometheus.yml (scrape config) cũng không được cung cấp. Jaeger 1.62 thuộc dòng v1 đã hết hỗ trợ cuối 2025.
  - Bằng chứng: `jaeger: image: jaegertracing/all-in-one:1.62 ... loki: ... grafana: ... (không có otel-collector/tempo) ... datasourceUid: tempo`
  - Sửa: Đơn giản hoá cho sinh viên: dùng .NET Aspire Dashboard (một container nhận cả trace, metric, log qua OTLP), hoặc stack grafana/otel-lgtm (một image). Nếu giữ stack riêng thì thêm otel-collector với pipelines traces→Tempo/Jaeger, logs→Loki, metrics→Prometheus, kèm file cấu hình đầy đủ và prometheus.yml.
- **major** · thực tế · [18.6-distributed-identity-overview.md:161](../lessons/stage-05-senior-engineering/module-18-microservices/18.6-distributed-identity-overview.md): TokenForwardingHandler dùng HttpContext.GetTokenAsync("access_token"). Với JwtBearer, token chỉ được lưu khi bật options.SaveToken = true; cấu hình JwtBearer trong bài không bật, nên token luôn null và việc chuyển tiếp hỏng im lặng (service đích trả 401). Đây là lỗi rất hay gặp nhưng bài không cảnh báo. Ngoài ra, phần 'Tự kiểm tra' đặt ClockSkew 30 giây trong khi Bài 1 khuyên TimeSpan.Zero.
  - Bằng chứng: `var token = await accessor.HttpContext!.GetTokenAsync("access_token");`
  - Sửa: Thêm `options.SaveToken = true;` vào cấu hình AddJwtBearer, hoặc đọc trực tiếp header Authorization. Đăng ký handler bằng AddHttpMessageHandler và nhắc IHttpContextAccessor không dùng được trong consumer hay job nền. Thống nhất khuyến nghị ClockSkew (vd 30 giây, giải thích vì sao không dùng 0 khi có lệch đồng hồ).
- **major** · nhất quán · [18.7-anti-pattern-distributed-monolith.md:445](../lessons/stage-05-senior-engineering/module-18-microservices/18.7-anti-pattern-distributed-monolith.md): Lời giải 'Inventory → ExecuteUpdate' cho Order Service cập nhật trực tiếp bảng TonKho của Inventory, tức là đọc và ghi database của service khác. Đây đúng là anti-pattern mà bài đang dạy cách gỡ. Bảng số liệu cũng không khớp: giảm 770ms ở một chặng mà p99 lại giảm từ 3.300 xuống 680ms.
  - Bằng chứng: `// Không phá được, nhưng làm nhanh hơn var soDong = await _db.TonKho.Where(...).ExecuteUpdateAsync(...); ... | Inventory -> ExecuteUpdate | 3.300 ms | 680 ms | 2 |`
  - Sửa: Đổi thành 'Inventory Service tối ưu endpoint reserve của chính nó bằng cập nhật nguyên tử', còn Order vẫn gọi API Inventory (hoặc reserve qua event + saga). Sửa bảng số liệu cho cộng dồn hợp lý.
- **major** · nhất quán · [18.9-crm-context.md:147](../lessons/stage-05-senior-engineering/module-18-microservices/18.9-crm-context.md): Mục 18.10.5 đưa Identity vào readiness ('phụ thuộc bắt buộc') và nói broker 'thường có'. Bài 3 của cùng bài lại kết luận 'readiness không bao giờ gọi service khác. Không có ngoại lệ', bỏ identity-api vì 'JWT tự kiểm chứng được', và bỏ RabbitMQ. Người học nhận hai chỉ dẫn ngược nhau.
  - Bằng chứng: `.AddUrlGroup(new Uri("http://identity:8080/health/live"), tags: ["ready"]); ... **Quy tắc: readiness không bao giờ gọi service khác.** Không có ngoại lệ đáng giá.`
  - Sửa: Sửa mục 18.10.5 theo đúng kết luận của Bài 3: readiness chỉ gồm database. Identity, broker, Redis gắn tag 'quan-sat'. Giải thích vì sao JWT xác minh offline nên Identity không chặn.
- **minor** · nhất quán · [18.10-advanced-notes.md:600](../lessons/stage-05-senior-engineering/module-18-microservices/18.10-advanced-notes.md): Các phép đo ghi 'trên .NET 9.0.203' (18.10, 18.12) trong khi khoá học nhắm .NET 10 LTS, và .NET 9 STS đã hoặc sắp hết hỗ trợ. Toàn module không nêu phiên bản mục tiêu.
  - Bằng chứng: `Kết quả đo trên .NET 9.0.203, một máy, không qua mạng thật`
  - Sửa: Đo lại trên .NET 10 (hoặc bỏ số phiên bản cụ thể). Thêm ghi chú phiên bản mục tiêu ở README module: .NET 10, C# 14, Aspire 13, MassTransit 8.x.
- **minor** · chính xác · [18.10-advanced-notes.md:711](../lessons/stage-05-senior-engineering/module-18-microservices/18.10-advanced-notes.md): Bài dùng http_client_connection_duration_seconds để đo 'thời gian nằm trong hàng đợi'. Metric này đo thời gian sống của connection. Metric đúng của System.Net.Http là http.client.request.time_in_queue.
  - Bằng chứng: `# Thời gian nằm trong hàng đợi ... rate(http_client_connection_duration_seconds_bucket[5m])`
  - Sửa: Đổi thành `histogram_quantile(0.99, rate(http_client_request_time_in_queue_seconds_bucket[5m]))` và ghi nguồn tài liệu built-in metrics của System.Net.
- **minor** · chính xác · [18.12-quick-real-world-example.md:118](../lessons/stage-05-senior-engineering/module-18-microservices/18.12-quick-real-world-example.md): AddCheck với async lambda nhận CancellationToken không biên dịch được, vì overload async là AddAsyncCheck. Lambda còn dùng _db trong Program.cs, nơi không có biến đó.
  - Bằng chứng: `.AddCheck("database", async ct => { await _db.Database.ExecuteSqlRawAsync("SELECT 1", ct); return HealthCheckResult.Healthy(); }, tags: ["ready"]);`
  - Sửa: Dùng `.AddDbContextCheck<CrmDbContext>(tags: ["ready"])` (package Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore), hoặc `.AddAsyncCheck("database", async ct => ...)` với DbContext lấy qua IServiceScopeFactory.
- **minor** · thực tế · [18.2-service-decomposition.md:226](../lessons/stage-05-senior-engineering/module-18-microservices/18.2-service-decomposition.md): Bài gợi ý 'Azure AD B2C' cho Identity. Microsoft đã ngừng bán Azure AD B2C cho khách hàng mới từ 05/2025 và thay bằng Microsoft Entra External ID. Bài cũng xếp Billing là 'Generic, thay bằng Stripe', mâu thuẫn với phần còn lại của khoá vốn dùng Billing service làm ví dụ cốt lõi (và Stripe chưa hỗ trợ đầy đủ thị trường Việt Nam).
  - Bằng chứng: `Identity          — Auth0, Azure AD B2C, Keycloak ... | Billing | Generic | PhapNhanThanhToan | Thay bằng Stripe |`
  - Sửa: Đổi thành 'Microsoft Entra External ID, Keycloak, Auth0'. Ghi chú Billing trong CRM Việt Nam thường có phần nghiệp vụ riêng (hoá đơn điện tử, công nợ) nên là supporting; chỉ phần cổng thanh toán là generic (VNPay/MoMo/Stripe).
- **minor** (ban đầu major) · nhất quán · [18.2-service-decomposition.md:747](../lessons/stage-05-senior-engineering/module-18-microservices/18.2-service-decomposition.md): Bài nói 'dùng chung database phá hỏng lý do tồn tại của microservices' và dẫn tới distributed monolith. Kế hoạch Strangler ở Bài 3 lại khuyên dừng ở bước 4 (tiến trình riêng, CÙNG database) vì 'cho 80% lợi ích, deploy độc lập'. 18.7 còn coi 'database dùng chung' là nguyên nhân gốc. Ba chỗ cần được hoà giải.
  - Bằng chứng: `Bước 4 — Deploy như tiến trình riêng, CÙNG database ... Bước 1–4 cho bạn 80% lợi ích của microservices ... deploy độc lập (bước 4)`
  - Sửa: Làm rõ ranh giới: 'cùng server database nhưng schema riêng, user/quyền riêng, không ai đọc schema của ai' khác với 'dùng chung bảng'. Ghi rõ điều kiện để bước 4 không thành distributed monolith (không JOIN chéo, migration độc lập, quyền DB tách).
  - Phản biện (adjusted): Bước 4 (dòng 748-750) đã ghi 'CÙNG database (schema notification)', tức đã ngầm tách schema. Mâu thuẫn chỉ ở mức chưa giải thích rõ điều kiện, nên hạ xuống minor: thêm 2-3 dòng phân biệt 'cùng server, schema và quyền riêng, không JOIN chéo' với 'dùng chung bảng'.
- **minor** · chính xác · [18.3-api-gateway-yarp-dotnet.md:94](../lessons/stage-05-senior-engineering/module-18-microservices/18.3-api-gateway-yarp-dotnet.md): Transform RequestHeader không hỗ trợ placeholder '{RemoteIpAddress}', nên giá trị được gửi nguyên chữ. YARP cũng đã tự thêm X-Forwarded-For mặc định, nên transform thủ công này thừa và gây sai lệch.
  - Bằng chứng: `{ "RequestHeader": "X-Forwarded-For", "Append": "{RemoteIpAddress}" }`
  - Sửa: Xoá transform đó, hoặc dùng transform chuẩn `{ "X-Forwarded": "Set", "For": "Append" }`. Thêm ghi chú: YARP mặc định đã thêm X-Forwarded-*.
- **minor** (ban đầu major) · chính xác · [18.4-inter-service-communication.md:58](../lessons/stage-05-senior-engineering/module-18-microservices/18.4-inter-service-communication.md): Khẳng định 'p99 của chuỗi 4 service không phải 400ms mà tệ hơn nhiều' là sai. Với các chặng nối tiếp độc lập, p99 của tổng thường NHỎ hơn tổng các p99 (400ms). Điều đúng là xác suất request gặp ít nhất một chặng chậm tăng lên (1 − 0,99^4 ≈ 4%), và với fan-out song song thì p99 tiến gần p99.9 của từng service.
  - Bằng chứng: `Chuỗi 4 service: p99 KHÔNG phải 400ms mà tệ hơn nhiều, vì xác suất chậm ít nhất một chặng tăng theo độ dài chuỗi.`
  - Sửa: Viết lại: 'Với 4 chặng nối tiếp, khoảng 4% request (thay vì 1%) sẽ gặp ít nhất một chặng ở đuôi p99. Với fan-out song song N lời gọi, p99 của request xấp xỉ p(1−0,01/N) của từng service.' Có thể kèm một mô phỏng nhỏ.
  - Phản biện (adjusted): Câu ở dòng 58-60 thiếu chính xác, nhưng phản bác của reviewer ('p99 tổng thường NHỎ hơn 400ms') cũng không đúng tuyệt đối: với phân phối đuôi rất nặng, p99 của tổng có thể vượt tổng các p99. Lập luận đúng là tỷ lệ request gặp ít nhất một chặng đuôi tăng (1−0,99^4 ≈ 4%), và hiệu ứng mạnh nhất ở fan-out song song. Chỉ cần viết lại câu cho đúng cơ chế, nên mức minor.
- **minor** · chính xác · [18.6-distributed-identity-overview.md:708](../lessons/stage-05-senior-engineering/module-18-microservices/18.6-distributed-identity-overview.md): Đặt attribute [Authorize(Roles = "Manager")] trước câu lệnh app.MapPost(...) là cú pháp không hợp lệ trong C#. Với minimal API phải dùng .RequireAuthorization hoặc đặt attribute lên lambda.

  ```text
  [Authorize(Roles = "Manager")]
  app.MapPost("/leads/{id}/duyet", ...);
  ```

  - Sửa: Viết `app.MapPost("/leads/{id}/duyet", ...).RequireAuthorization(p => p.RequireRole("Manager"));` hoặc `app.MapPost("...", [Authorize(Roles = "Manager")] (...) => ...)`.
- **minor** · nhất quán · [18.7-anti-pattern-distributed-monolith.md:38](../lessons/stage-05-senior-engineering/module-18-microservices/18.7-anti-pattern-distributed-monolith.md): Notification Service được liệt kê như ví dụ 'tách theo tầng kỹ thuật' (sai) ở 18.2 và 18.7, nhưng 18.2 Bài 3, 18.9 và 18.11 lại chọn Notification là 'ứng viên tách số một'. Không có giải thích, sinh viên sẽ thấy mâu thuẫn.
  - Bằng chứng: `**2. Tách theo tầng kỹ thuật.** "Auth Service", "Notification Service", "Validation Service"`
  - Sửa: Bỏ Notification khỏi ví dụ tách theo tầng (giữ Validation Service, Database Service), hoặc thêm câu phân biệt: 'Notification là subdomain generic có nghiệp vụ riêng (template, kênh, lịch gửi), khác với Validation Service vốn chỉ là một tầng kỹ thuật'.

### Module 19 - Performance Engineering

- **critical** · chính xác · [19.3-dotnet-server-profiling.md:131](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.3-dotnet-server-profiling.md): Profile `cpu-sampling` đã bị gỡ khỏi `dotnet-trace collect` trong các bản hiện hành (theo tài liệu Microsoft). Lệnh trong bài và trong 19.8 (dòng 429), 19.13 sẽ báo lỗi với dotnet-trace mới nhất.
  - Bằng chứng: `"dotnet-trace collect -p 1 --duration 00:00:30 \ --profile cpu-sampling -o trace.nettrace"`
  - Sửa: Thay bằng `--profile dotnet-sampled-thread-time,dotnet-common` (hoặc bỏ --profile vì đây là mặc định). Thêm ghi chú: sampler này lấy mẫu mọi thread theo wall-clock, nên thấy được cả thời gian chờ. Sửa luôn câu 'cpu-sampling không thấy được thời gian chờ' (dòng 553) cho đúng hành vi.
- **critical** · chính xác · [19.5-systematic-caching-overview.md:433](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.5-systematic-caching-overview.md): Bài khẳng định HybridCache chống stampede xuyên instance, phối hợp qua L2 để toàn cụm chỉ chạy factory một lần. Tài liệu Microsoft nói ngược lại: việc phối hợp chỉ có trong một instance HybridCache. Bài 14.5 (dòng 289) của chính khóa cũng nói mỗi pod vẫn chạy factory riêng.
  - Bằng chứng: `"1. Chống stampede **xuyên instance**, không chỉ trong tiến trình." ... "HybridCache với backend phân tán: phối hợp qua tầng L2 -> hướng tới một lần cho toàn cụm"`
  - Sửa: Thay bằng: 'HybridCache chỉ bảo đảm một lần gọi factory cho mỗi khoá trong một tiến trình. Với 6 pod vẫn có thể có tới 6 lần, giống SemaphoreSlim.' Trích tài liệu: 'This coordination doesn't extend to other HybridCache instances, even if they use the same secondary distributed cache.' Phần khác biệt thật của HybridCache là L1+L2 dùng một API, tag và serializer.
- **critical** · chính xác · [19.5-systematic-caching-overview.md:621](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.5-systematic-caching-overview.md): Bài nói RemoveAsync ở một instance sẽ được HybridCache 'phát tin' cho mọi instance. Thực tế HybridCache không có backplane: RemoveAsync và RemoveByTagAsync chỉ xoá L1 của server hiện tại và L2. L1 ở các server khác vẫn cũ cho tới khi LocalCacheExpiration hết hạn. Học viên sẽ thiết kế sai cho dữ liệu cần nhất quán (hạn mức, giá).
  - Bằng chứng: `"// Xoá ở một instance -> HybridCache lo phần phát tin qua backend" và "kể cả khi tin xoá bị mất, lệch cũng chỉ kéo dài tối đa 20 giây"`
  - Sửa: Sửa thành: 'RemoveAsync xoá L1 của instance hiện tại và L2. L1 ở instance khác vẫn giữ giá trị cũ tới khi LocalCacheExpiration hết, nên LocalCacheExpiration chính là cửa sổ lệch tối đa.' Trích Note trong tài liệu HybridCache. Với dữ liệu không chịu lệch, dùng L2 thuần hoặc FusionCache có backplane. Đồng thời sửa bảng quyết định (dòng 637) cho khớp.
- **critical** · chính xác · [19.7-distributed-lock.md:107](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.7-distributed-lock.md): Ví dụ sp_getapplock không chạy được. (1) `SqlQuery<int>(...).FirstAsync` khiến EF ghép SQL vào subquery, trong khi DECLARE/EXEC không đặt được trong subquery, và cột trả về phải tên `Value`. (2) `@LockOwner='Transaction'` bắt buộc phải đang có transaction. Nếu không, thủ tục báo lỗi; còn ở chế độ autocommit, khoá được nhả ngay khi câu lệnh kết thúc. Lời hứa 'tự giải phóng khi transaction kết thúc' vì vậy vô nghĩa.
  - Bằng chứng: `"_db.Database.SqlQuery<int>($\"\"\" DECLARE @result INT; EXEC @result = sp_getapplock ... @LockOwner = 'Transaction' ... SELECT @result; \"\"\").FirstAsync(ct);"`
  - Sửa: Viết lại: `await using var tx = await _db.Database.BeginTransactionAsync(ct);` rồi gọi `ExecuteSqlRawAsync` với SqlParameter output (ReturnValue), giữ transaction mở trong suốt đoạn công việc và commit ở cuối. Có thể giới thiệu thư viện DistributedLock (Medallion) như cách làm thực tế. Ghi rõ: muốn giữ khoá thì kết nối và transaction phải sống suốt thời gian làm việc.
- **major** · nhất quán · [19.1-measure-before-and-after.md:17](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.1-measure-before-and-after.md): Đánh số mục lệch một bậc trên toàn module: bài 19.1 có mục 19.2.x, bài 19.2 có 19.3.x, ... bài 19.13 có 19.14.x. Chữ trên link nội bộ cũng lệch: 'bài 19.4' trỏ tới 19.3, 'bài 19.5' trỏ tới 19.4, 'bài 13.7' trỏ tới 13.6, 'bài 12.5' trỏ tới 12.4, 'bài 14.6' trỏ tới 14.5, 'bài 17.7' trỏ tới 17.6, 'bài 6.8' trỏ tới 6.7, 'bài 15.10' trỏ tới 15.9... Các câu dẫn chéo như 'mục 19.4.2', 'mục 19.3.4' lại trỏ theo số đã lệch. Người học rất dễ lạc.
  - Bằng chứng: `19.1: "### 19.2.1 — Vì sao trực giác sai" ... "([bài 19.4](19.3-dotnet-server-profiling.md))"; 19.8 bảng: "[19.3](19.2-benchmarkdotnet.md), [19.4](19.3-dotnet-server-profiling.md)"`
  - Sửa: Chạy script đánh số lại tiêu đề `### 19.(n+1).k` thành `### 19.n.k` trong từng file. Sửa chữ trên mọi link `[bài X.Y](X.(Y-1)-...)` thành đúng số file. Cập nhật mọi tham chiếu 'mục 19.x.y' theo số mới. Thêm bước kiểm tra trong CI: chữ trên link phải khớp tiền tố tên file.
- **major** · chính xác · [19.1-measure-before-and-after.md:437](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.1-measure-before-and-after.md): Toàn module đo và cấu hình trên .NET 9 (.NET 9.0.203, EF Core 9.0.0, RuntimeMoniker.Net90, setup-dotnet 9.0.x, aspnet:9.0). Khóa học nhắm .NET 10 LTS, còn .NET 9 STS sắp hoặc đã hết hỗ trợ.
  - Bằng chứng: `"Kết quả đo trên .NET 9.0.203 với Microsoft.Data.Sqlite 9.0.3"; 19.2: "[SimpleJob(RuntimeMoniker.Net90)]"; workflow: "dotnet-version: '9.0.x'"`
  - Sửa: Đổi thành RuntimeMoniker.Net10_0, `dotnet-version: '10.0.x'`, các gói 10.0.x. Chạy lại các phép đo hoặc ghi rõ 'số đo trên .NET 9; trên .NET 10 xu hướng tương tự' ở đầu mỗi bảng.
- **major** · chính xác · [19.1-measure-before-and-after.md:503](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.1-measure-before-and-after.md): Bật `SET SHOWPLAN_XML ON` thì SQL Server chỉ trả kế hoạch và không thực thi câu lệnh, nên `STATISTICS IO` không có logical reads nào. Kết quả 'logical reads 24.918' trong bài không thể thu được bằng script này.
  - Bằng chứng: `"SET STATISTICS IO, TIME ON; SET SHOWPLAN_XML ON; SELECT Id, HoTen FROM Leads ..."`
  - Sửa: Thay SHOWPLAN_XML bằng `SET STATISTICS XML ON` (actual plan, có thực thi), hoặc bật 'Include Actual Execution Plan' trong SSMS/Azure Data Studio.
- **major** · chính xác · [19.1-measure-before-and-after.md:655](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.1-measure-before-and-after.md): Workflow CI không chạy được như viết. Service postgres thiếu `ports: ['5432:5432']` nên `psql -h localhost` không kết nối được. Thiếu PGPASSWORD. Runner ubuntu-latest không có sẵn k6 (cần grafana/setup-k6-action). Bước làm nóng không truyền TOKEN. Ngoài ra đoạn code SQLite ở Bài 2 (dòng 412) dùng biến `c` và `DocHet` chưa khai báo nên không chạy được.
  - Bằng chứng: `"services: postgres: image: postgres:16 env: { POSTGRES_PASSWORD: test } ... run: psql -h localhost -U postgres -f ci/schema.sql ... run: k6 run --duration 60s --vus 10 ci/tai-leads.js"`
  - Sửa: Thêm `ports: ['5432:5432']`, `env: PGPASSWORD: test` cho các bước psql, bước `- uses: grafana/setup-k6-action@v1`, TOKEN cho bước làm nóng. Đặt `ASPNETCORE_URLS=http://localhost:5000` khi `dotnet run`. Với Bài 2, cung cấp chương trình đầy đủ (tạo kết nối, bảng, hàm DocHet) hoặc link tới repo mẫu.
- **major** · chính xác · [19.10-advanced-notes.md:20](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.10-advanced-notes.md): Phần GC không nhắc tới DATAS (Dynamic Adaptation To Application Sizes), vốn bật mặc định cho Server GC từ .NET 9. DATAS tự điều chỉnh số heap, nên các nhận định 'Server GC dùng một heap mỗi core, tốn nhiều bộ nhớ trong container nhỏ, nên chuyển sang Workstation' không còn đúng như trước. Số đo +2,6 MB RSS trong bài cũng chính là tác dụng của DATAS.
  - Bằng chứng: `"Server GC cấp phát heap theo **số core nhìn thấy được**, nên một container 512 MB trên máy 32 core có thể dùng bộ nhớ cao hơn nhiều so với dự kiến."`
  - Sửa: Thêm mục DATAS: bật mặc định từ .NET 9 với Server GC, bắt đầu với một heap rồi tăng dần, tắt bằng `DOTNET_GCDynamicAdaptationMode=0`. Sửa lời khuyên thành: 'trên .NET 9/10, thử Server GC + DATAS mặc định trước khi chuyển sang Workstation'. Dẫn link trang GC config.
- **major** (ban đầu critical) · chính xác · [19.10-advanced-notes.md:242](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.10-advanced-notes.md): Bài dạy rằng trong container 512Mi runtime 'tưởng có 8 GB' nên bị kernel OOM kill, và phải tự đặt GCHeapHardLimitPercent. Sai từ .NET Core 3.0: khi chạy trong container có memory limit, runtime mặc định đặt heap hard limit = max(20 MB, 75% giới hạn container). Con số 7937 MB chỉ xuất hiện vì phép đo chạy ngoài container. Giá trị '4B' (75%) mà bài khuyên đặt chính là mặc định.
  - Bằng chứng: `"Trong container giới hạn 512Mi mà runtime KHÔNG nhận biết giới hạn: -> GC tưởng có 8 GB" ... "thường vì runtime đang nghĩ nó có 8 GB trong một container 512Mi"`
  - Sửa: Viết lại: 'Trong container có memory limit, .NET tự dùng 75% limit làm trần heap (xem tài liệu GC config: Heap hard limit percent). OOM kill vẫn xảy ra khi bộ nhớ ngoài heap (native, stack, mã JIT) cộng heap vượt limit, hoặc khi không đặt memory limit.' Sửa bài tập để đo trong `docker run -m 512m` và in TotalAvailableMemoryBytes nhằm thấy con số 384 MB.
  - Phản biện (adjusted): Lỗi có thật. Tài liệu GC config (Heap hard limit) ghi: khi chạy trong container có memory limit và không tự đặt trần, trần heap mặc định là max(20 MB, 75% limit). Con số 7937 MB chỉ đúng khi chạy ngoài container. Mình hạ xuống major vì cấu hình bài khuyên (75%) chính là mặc định, nên làm theo không gây hại. Cái sai nằm ở mô hình tư duy và hướng chẩn đoán OOM kill. Cách sửa giữ nguyên như reviewer đề xuất.
- **major** · nhất quán · [19.10-advanced-notes.md:259](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.10-advanced-notes.md): Phần 'cấu hình đúng cho container' bật ServerGarbageCollection=true với cpu limit 1000m. Bảng quy tắc ngay dưới (dòng 306) lại nói container 1 nhân nên dùng Workstation vì Server GC không giúp gì. Học viên không biết làm theo phần nào.
  - Bằng chứng: `"<ServerGarbageCollection>true</ServerGarbageCollection>" + "limits:   { memory: \"512Mi\", cpu: \"1000m\" }" vs "| Container 1 nhân | **Workstation** — Server GC không giúp gì |"`
  - Sửa: Đổi ví dụ thành cpu limit 2000m trở lên khi dùng Server GC, hoặc giữ 1000m và đặt ServerGarbageCollection=false. Thêm một câu giải thích vì sao.
- **major** (ban đầu critical) · chính xác · [19.10-advanced-notes.md:368](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.10-advanced-notes.md): Bài nói mảng 65.536 byte vào LOH, trong khi ngưỡng LOH là 85.000 byte. Chính dòng 382 của bài cũng ghi 'từ 85 KB trở lên', nên hai dòng mâu thuẫn trong cùng một bài.
  - Bằng chứng: `"var bo = new byte[65536];                       // 64 KB mỗi lần -> vào LOH"`
  - Sửa: Đổi ví dụ thành `new byte[128 * 1024]` (128 KB, vào LOH), hoặc giữ 64 KB và sửa chú thích thành 'vào gen0 (SOH); vẫn tạo áp lực GC nếu gọi liên tục'. Cập nhật Rent/AsMemory cho khớp.
  - Phản biện (adjusted): Đúng là mâu thuẫn. Dòng 368 ghi mảng 64 KB 'vào LOH', trong khi dòng 382 của chính bài ghi ngưỡng 85 KB. Ngưỡng LOH đúng là 85.000 byte. Lỗi có thật, nhưng chỉ là một chú thích sai trong một ví dụ minh hoạ, nên mình xếp major chứ không phải critical. Cách sửa: đổi sang 128 KB.
- **major** · chính xác · [19.10-advanced-notes.md:527](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.10-advanced-notes.md): Bài nói PublishTrimmed mà không có source generator thì JSON 'thiếu trường, không có lỗi nào'. Từ .NET 8, khi trim hoặc AOT, JsonSerializerIsReflectionEnabledByDefault=false: serialize bằng reflection sẽ ném InvalidOperationException, và publish còn phát cảnh báo IL2026. Lỗi không im lặng như bài mô tả.
  - Bằng chứng: `"-> trimmer xoá thuộc tính mà nó không thấy ai dùng -> chạy lên, JSON thiếu trường, KHÔNG có lỗi nào"`
  - Sửa: Sửa thành: 'Từ .NET 8, ứng dụng trim/AOT tắt reflection của System.Text.Json theo mặc định, nên gọi Serialize không có JsonTypeInfo sẽ ném InvalidOperationException, kèm trim warning IL2026 lúc publish. Source generator là cách duy nhất để chạy.'
- **major** · nhất quán · [19.11-mini-case-study.md:204](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.11-mini-case-study.md): Bài học 3 nói đo từng bước cho thấy projection hiệu quả hơn chạy song song, nhưng bảng số trong chính bài ngược lại: projection 2600 → 1400 ms (1,86×), song song 1400 → 560 ms (2,5×). Ngoài ra sau khi song song, p99 '560ms (bằng khối chậm nhất)' không khớp với khối revenue_chart = 890 ms.
  - Bằng chứng: `"Nhờ đo từng bước mới biết projection có tác dụng lớn hơn cả chạy song song."; "p99 toàn endpoint: 1400ms -> 560ms      (bằng khối chậm nhất, không phải tổng)"`
  - Sửa: Sửa bài học thành 'song song chỉ phát huy sau khi khối top_deals được sửa', đúng ý đã có ở Bài 1. Sửa số liệu cho nhất quán: hoặc revenue_chart sau index/projection là khoảng 550 ms, hoặc p99 sau song song là khoảng 900 ms. Sửa câu tự kiểm tra ở dòng 680 tương ứng.
- **major** · chính xác · [19.11-mini-case-study.md:568](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.11-mini-case-study.md): `EnrichWithHttpRequest` trong `AddAspNetCoreInstrumentation` là tuỳ chọn của tracing (Activity), không thêm tag vào metric. Trên .NET 8+ metric http.server.request.duration do ASP.NET Core tự phát ra. Gắn nhãn tenant theo cách này không làm histogram có nhãn tenant như PromQL phía dưới giả định.
  - Bằng chứng: `"builder.Services.AddOpenTelemetry().WithMetrics(m => m .AddAspNetCoreInstrumentation(o => o.EnrichWithHttpRequest = (a, r) => a.SetTag(\"tenant\", ...)))"`
  - Sửa: Dùng middleware: `context.Features.Get<IHttpMetricsTagsFeature>()?.Tags.Add(new("tenant", tenantGroup));` (ASP.NET Core 8+). Kèm cảnh báo cardinality đã có ở dòng 584.
- **major** (ban đầu critical) · chính xác · [19.12-quick-real-world-example.md:344](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.12-quick-real-world-example.md): Lặp lại sai lầm của 19.10: cho rằng phải có DOTNET_GCHeapHardLimitPercent thì runtime mới biết trần trong container, và bảng 'hai cách chết' gán OOM kill cho việc runtime tưởng có nhiều bộ nhớ hơn.
  - Bằng chứng: `"Không có nó: runtime tưởng có 8 GB -> để heap lớn dần -> kernel giết ở 512Mi"; bảng dòng 283 "Runtime tưởng có nhiều bộ nhớ hơn thực tế"`
  - Sửa: Sửa thành: mặc định heap đã giới hạn ở 75% container. OOM kill thường do phần bộ nhớ ngoài heap hoặc do đặt percent quá cao. Muốn biến OOM kill thành OutOfMemoryException thì giảm percent (ví dụ 60%) để chừa chỗ cho bộ nhớ native. Ghi rõ đây là cấu hình giảm rủi ro, không phải 'bật nhận biết container'.
  - Phản biện (adjusted): Đây là cùng lỗi gốc với index 2, lặp lại ở 19.12 (dòng 283 và 344-345). Mình hạ xuống major vì cấu hình trong bài vô hại, chỉ phần giải thích sai. Nên sửa đồng bộ với 19.10. Nếu muốn có OutOfMemoryException thay cho OOM kill thì giảm percent (ví dụ 60%) để chừa chỗ cho bộ nhớ native.
- **major** · chính xác · [19.12-quick-real-world-example.md:461](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.12-quick-real-world-example.md): Test 'export không tăng bộ nhớ theo số dòng' đo tổng byte đã cấp phát. Với cả hai cách, đó đều là đại lượng tuyến tính: bản gom chỉ nhân thêm một hằng số (3 bản sao), nên tỉ lệ vẫn khoảng 100×. Test không phân biệt được hai phiên bản, đúng như comment trong code đã thừa nhận ('điều KHÔNG bình thường là đỉnh bộ nhớ').
  - Bằng chứng: `"(lon / (double)nho).Should().BeLessThan(150, \"gấp 100 lần dữ liệu không được làm cấp phát tăng hơn 150 lần\")"`
  - Sửa: Đo bộ nhớ đỉnh thay vì tổng cấp phát: lấy mẫu `GC.GetGCMemoryInfo().HeapSizeBytes` hoặc `GC.GetTotalMemory(false)` định kỳ trong lúc đọc response stream, rồi assert đỉnh với 100.000 dòng &lt; đỉnh 1.000 dòng + 20 MB. Hoặc chạy test với `DOTNET_GCHeapHardLimit` nhỏ và assert không có OOM.
- **major** · cấu trúc · [19.13-review-and-assessment.md:3](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.13-review-and-assessment.md): Bài review gần như toàn văn mẫu: mục tiêu chung chung ('Nắm được ý chính của bài'), tiêu đề '19.14.3 — Kiểm tra & Thực hành (100 điểm)' rỗng, khối 'Bối cảnh giáo trình' chép từ nơi khác, 'Bài tập tổng hợp', 'Tự kiểm tra', 'Kết luận' đều chung chung. Quiz chỉ có 5 câu, đáp án hiện ngay dưới câu hỏi và có phương án vô lý (Swagger, Dùng Linux). Lab gợi ý 'compiled query' là thứ module chưa dạy.
  - Bằng chứng: `"- Nắm được ý chính của bài và mối liên hệ với module."; "### 19.14.3 — Kiểm tra & Thực hành (100 điểm)" (không có nội dung); "Hoàn thành bài này giúp bạn có góc nhìn đầy đủ hơn trước khi đi tiếp trong module."`
  - Sửa: Viết lại: (1) mục tiêu cụ thể theo 12 bài; (2) 10-15 câu quiz theo tình huống CRM, đáp án đặt trong &lt;details&gt;; (3) lab trên CRM mẫu chạy được bằng docker compose (đo baseline, test đếm truy vấn, sửa N+1/index, đo lại, ADR); (4) xoá các mục văn mẫu và tiêu đề rỗng; (5) bỏ 'compiled query' hoặc thêm link tới bài có dạy.
- **major** · chính xác · [19.2-benchmarkdotnet.md:578](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.2-benchmarkdotnet.md): `ReadOnlySpan<char>.Split(char)` trả về SpanSplitEnumerator chỉ có từ .NET 9. .NET 8 chỉ có overload ghi vào Span&lt;Range&gt;. Ghi '.NET 8 trở lên' sẽ khiến code không biên dịch nếu người học còn dùng .NET 8.
  - Bằng chứng: `"foreach (var range in s.Split(';'))          // MemoryExtensions.Split — .NET 8 trở lên"`
  - Sửa: Đổi chú thích thành '.NET 9 trở lên'. Nếu cần chạy trên .NET 8, minh hoạ overload `s.Split(Span<Range> destination, ';')`.
- **major** (ban đầu critical) · chính xác · [19.2-benchmarkdotnet.md:643](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.2-benchmarkdotnet.md): Từ C# 13 (.NET 9), ref struct như ReadOnlySpan&lt;char&gt; được khai báo làm biến cục bộ trong phương thức async, miễn là không dùng nó vượt qua await. Đoạn code ví dụ vì vậy biên dịch được trên C# 13/14 và không ra lỗi CS4012 như bài nói.
  - Bằng chứng: `"// KHÔNG biên dịch được: ref struct không sống qua điểm await ... ReadOnlySpan<char> s = dong;              // lỗi CS4012"`
  - Sửa: Sửa ví dụ để thật sự dùng `s` sau `await` (ví dụ `await _db.SaveChangesAsync(); Console.WriteLine(s.Length);`). Khi đó compiler báo lỗi vì span sống qua await. Thêm ghi chú: 'Từ C# 13, khai báo span trong async được phép nếu không dùng sau await.'
  - Phản biện (adjusted): Lỗi có thật. Từ C# 13, được khai báo biến cục bộ kiểu ref struct trong phương thức async, miễn là không dùng nó sau await (tính năng 'ref and unsafe in iterators and async methods'). Biến `s` khai báo trước await và không dùng lại, nên đoạn code biên dịch được trên C# 13/14 và không ra CS4012. Mình hạ xuống major vì đây là ví dụ phụ trong mục 'cái giá của span'. Cách sửa reviewer đề xuất (dùng `s` sau await) là đúng.
- **major** · chính xác · [19.3-dotnet-server-profiling.md:26](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.3-dotnet-server-profiling.md): Kết quả mẫu và các tên counter (Gen 2 GC Count / 1 sec, threadpool-queue-length, gc-heap-size, Request Duration (ms, p99)) theo định dạng EventCounters cũ. Từ .NET 9, System.Runtime là meter với tên mới (dotnet.gc.collections, dotnet.thread_pool.queue.length, ...). Request Duration p99 không phải counter của Microsoft.AspNetCore.Hosting. Sinh viên chạy trên .NET 10 sẽ thấy màn hình khác hẳn và lệnh lọc counter có thể không khớp.
  - Bằng chứng: `"--counters System.Runtime[threadpool-queue-length,threadpool-thread-count],Microsoft.AspNetCore.Hosting" ... "Request Duration (ms, p99)                 3.812"`
  - Sửa: Chạy lại dotnet-counters trên app .NET 10 và dán kết quả thật, dùng tên metric mới, ví dụ `--counters System.Runtime[dotnet.thread_pool.queue.length,dotnet.thread_pool.thread.count]`. Muốn xem độ trễ thì dùng meter Microsoft.AspNetCore.Hosting (http.server.request.duration). Áp dụng tương tự cho 19.8 dòng 409-424 và 19.12 dòng 370.
- **major** · chính xác · [19.3-dotnet-server-profiling.md:110](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.3-dotnet-server-profiling.md): Đoạn .editorconfig được gắn nhãn xml. CA2007 là quy tắc về ConfigureAwait, không phát hiện sync-over-async. VSTHRD002 chỉ có khi cài gói Microsoft.VisualStudio.Threading.Analyzers, mà bài không nhắc. Làm theo bài sẽ không có cảnh báo nào.
  - Bằng chứng: `"'''xml <!-- .editorconfig --> <!-- CA2007, VSTHRD002: cảnh báo sync-over-async --> dotnet_diagnostic.VSTHRD002.severity = error"`
  - Sửa: Đổi nhãn code block thành `ini`. Thêm bước `dotnet add package Microsoft.VisualStudio.Threading.Analyzers`. Bỏ CA2007 khỏi danh sách quy tắc phát hiện sync-over-async, hoặc giải thích riêng. Cũng nên bỏ comment cuối dòng trong .editorconfig (dòng 373-374) vì định dạng này không hỗ trợ comment nằm cuối dòng.
- **major** · chính xác · [19.3-dotnet-server-profiling.md:306](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.3-dotnet-server-profiling.md): Phần giải thích nói pool chỉ tăng 1-2 luồng mỗi giây, nhưng chính số đo trong bài là 4 → 41 luồng trong khoảng 4,3 giây (khoảng 8-9 luồng/giây). Từ .NET 6, thread pool còn bơm luồng nhanh hơn khi phát hiện luồng bị chặn bởi Task.Wait/.Result. Lời giải mâu thuẫn với số liệu của chính nó.
  - Bằng chứng: `"Bắt đầu với 4 luồng (= số nhân), tăng khoảng 1–2 luồng mỗi giây ... -> hệ thống phải đợi pool nở ra tới ~41 luồng"`
  - Sửa: Sửa thành: 'Thread pool thêm luồng theo heuristic hill-climbing và starvation (khoảng 2 luồng/giây). Từ .NET 6 có thêm cơ chế bù khi luồng bị chặn bởi .Result/Wait, nên số đo ở đây tăng nhanh hơn, nhưng vẫn chậm hơn nhiều so với 100 request đồng thời.' Sửa dòng 82 và câu tự kiểm tra (dòng 771) cho thống nhất.
- **major** · chính xác · [19.4-database-first-bottleneck.md:641](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.4-database-first-bottleneck.md): Script tái hiện parameter sniffing chèn Leads mà không có KhachHangId, trong khi procedure JOIN KhachHang theo KhachHangId. Kết quả JOIN sẽ rỗng, hoặc INSERT lỗi nếu cột NOT NULL. GENERATE_SERIES chỉ có từ SQL Server 2022 nhưng bài không ghi chú. Khoá TenantId trong các bài cũng không thống nhất: INT ở đây, chuỗi 'acme' ở dòng 72, UNIQUEIDENTIFIER và Guid ở 19.9/19.11.
  - Bằng chứng: `"INSERT INTO Leads (TenantId, HoTen, TrangThai, NgayTao) SELECT 1, ..." và "JOIN KhachHang kh ON kh.Id = l.KhachHangId WHERE l.TenantId = @TenantId"`
  - Sửa: Thêm KhachHangId vào INSERT (ví dụ `(n % 500) + 1`) và script tạo bảng KhachHang. Ghi 'cần SQL Server 2022+ (GENERATE_SERIES)'. Thống nhất kiểu TenantId cho toàn khóa (khuyên Guid hoặc int theo Project 3) và sửa ví dụ `'acme'` cho khớp.
- **major** · chính xác · [19.5-systematic-caching-overview.md:86](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.5-systematic-caching-overview.md): Code 'cache theo phiên bản' không biên dịch. IMemoryCache.GetOrCreateAsync nhận factory dạng `entry => ...`, còn HybridCache nhận `ct => ValueTask`. Không API nào nhận `() =>`. Đồng thời `_cache.SetAsync(key, int)` không tồn tại trên IMemoryCache, còn IDistributedCache chỉ nhận byte[]. Việc tăng phiên bản bằng get rồi set cũng có race condition.
  - Bằng chứng: `"var version = await _cache.GetOrCreateAsync(\"products:version\", () => Task.FromResult(1)); ... await _cache.SetAsync(\"products:version\", version + 1);"`
  - Sửa: Dùng Redis INCR cho phiên bản: `var version = (long)(await _redis.StringGetAsync("products:version")); ... await _redis.StringIncrementAsync("products:version");`. Hoặc dùng HybridCache: `await _hybrid.GetOrCreateAsync("products:version", _ => ValueTask.FromResult(1L))` kèm SetAsync, và ghi chú về race. Tốt nhất giới thiệu RemoveByTagAsync như cách hiện đại thay cho versioned key.
- **major** · nhất quán · [19.6-scaling-strategy.md:225](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.6-scaling-strategy.md): Script dùng `grep -v "static readonly"` để loại mọi dòng static readonly, nhưng kết quả mẫu lại liệt kê `private static readonly ConcurrentDictionary` và `private static readonly Dictionary`. Dòng 370 lại nói lượt quét 'vẫn phải nhìn static readonly'. Script và output mâu thuẫn, học viên chạy sẽ ra kết quả khác.
  - Bằng chứng: `"| grep -v \"static readonly\" \" ... output: \"src/Crm.Api/Services/DemLuotXem.cs:12:   private static readonly ConcurrentDictionary<int,int> _luot = new();\""`
  - Sửa: Bỏ `grep -v "static readonly"`, chỉ loại `const` và `static readonly (string|int|Regex|JsonSerializerOptions)`. Hoặc sửa output mẫu cho khớp script và giữ nguyên lời cảnh báo ở dòng 370.
- **major** · chính xác · [19.6-scaling-strategy.md:528](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.6-scaling-strategy.md): Test Data Protection không biên dịch được: FluentAssertions không có chuỗi `.Or`. Logic test cũng sai: IKeyManager mặc định luôn là XmlKeyManager, kể cả khi lưu khoá vào Redis (dùng RedisXmlRepository), nên kiểm tra NotBeOfType&lt;XmlKeyManager&gt; là vô nghĩa.
  - Bằng chứng: `"kho.Should().NotBeOfType<XmlKeyManager>() .Or.Subject.As<XmlKeyManager>().Should().Match(...)"`
  - Sửa: Kiểm tra `IOptions<KeyManagementOptions>`: `var repo = sp.GetRequiredService<IOptions<KeyManagementOptions>>().Value.XmlRepository; repo.Should().NotBeNull().And.NotBeOfType<FileSystemXmlRepository>();` (hoặc BeOfType&lt;RedisXmlRepository&gt;). Kiểm tra thêm ApplicationName được đặt.
- **major** · dễ hiểu · [19.6-scaling-strategy.md:639](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.6-scaling-strategy.md): Công thức pool ≈ 2×core + spindle (của PostgreSQL wiki) là tổng số kết nối nên có ở database, không phải kích thước pool của mỗi instance. Bài ghi 'CHIA cho số instance', nhưng ngay sau đó lại nhân 6 pod × 30 = 180. Con số 20-30 vì vậy vừa được dùng như tổng, vừa như pool của từng pod, gây rối.
  - Bằng chứng: `"8 × 2 + 1 = 17  ->  làm tròn lên khoảng 20–30 / CHIA cho số instance ứng dụng: 6 pod × pool 30 = 180 kết nối"`
  - Sửa: Viết lại: 'Tổng kết nối hiệu quả tới DB ≈ 17-30. Chia cho 6 pod thì mỗi pod khoảng 4-5 kết nối, hoặc đặt PgBouncer để app giữ pool 30/pod mà DB chỉ thấy ~25.' Trình bày phép tính theo thứ tự đó.
- **major** · thực tế · [19.7-distributed-lock.md:3](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.7-distributed-lock.md): Khối lượng và độ sâu ở mức senior (Kleppmann, fencing token, Lua script, sp_getapplock, SKIP LOCKED, phân vùng) vượt sức sinh viên năm 1-3, và mọi bài tập đều cần Redis cùng hai process. Không có code đầy đủ chạy được: thiếu GiaHanAsync, ConGiuAsync, IsUniqueViolation. Timer trong ví dụ dùng async lambda (thực chất là async void).
  - Bằng chứng: `"using var giaHan = new Timer(async _ => await handle.GiaHanAsync(TimeSpan.FromSeconds(30)), ...)"; "catch (DbUpdateException ex) when (ex.IsUniqueViolation())"`
  - Sửa: Đánh dấu bài là 'nâng cao'. Cung cấp project mẫu (Redis bằng docker) có đủ RedisLock với các phương thức Renew/IsHeld và extension IsUniqueViolation cho SQL Server và PostgreSQL. Thay Timer bằng `PeriodicTimer` trong một Task có xử lý exception. Thêm phần tóm tắt 'tối thiểu cần nhớ' cho sinh viên.
- **major** (ban đầu critical) · chính xác · [19.8-roadmap-sh-supplement.md:352](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.8-roadmap-sh-supplement.md): Dockerfile chạy `dotnet tool install` trên image `aspnet:9.0`, là image runtime không có SDK, nên build sẽ lỗi. Ngoài ra vẫn dùng 9.0, và lệnh kubectl debug dùng image `dotnet/nightly/monitor` (là dotnet-monitor bản nightly), image này không chứa dotnet-counters.
  - Bằng chứng: `"FROM mcr.microsoft.com/dotnet/aspnet:9.0 ... RUN dotnet tool install -g dotnet-counters"`
  - Sửa: Dùng multi-stage: `FROM mcr.microsoft.com/dotnet/sdk:10.0 AS tools` → `RUN dotnet tool install --tool-path /tools dotnet-counters dotnet-trace dotnet-gcdump`, rồi `FROM mcr.microsoft.com/dotnet/aspnet:10.0` và `COPY --from=tools /tools /tools`. Hoặc tải bản single-file từ https://aka.ms/dotnet-counters/linux-x64. Với kubectl debug, dùng image tự build chứa tools hoặc `mcr.microsoft.com/dotnet/monitor` bản ổn định kèm giải thích.
  - Phản biện (adjusted): Mình xác nhận ở dòng 349-358 của 19.8: Dockerfile chạy `dotnet tool install` trên `aspnet:9.0`. Đây là image runtime không có SDK, nên build lỗi. Dòng 373 dùng image `dotnet/nightly/monitor`, là dotnet-monitor bản nightly, không chứa dotnet-counters. Mình hạ xuống major vì đây là đoạn hạ tầng tham khảo trong bài bổ sung, không thuộc luồng học chính. Cách sửa (multi-stage với sdk:10.0, hoặc tải bản single-file) là đúng.
- **major** · đầy đủ · [README.md:3](../lessons/stage-05-senior-engineering/module-19-performance-engineering/README.md): README và các bài trong module không có mục 'Kiến thức tiên quyết' và 'Chuẩn bị môi trường'. Module dùng dotnet-counters, dotnet-trace, k6, SQL Server, PostgreSQL, Redis, Kubernetes, Prometheus, nhưng không hướng dẫn cài hay dựng. Nhiều bài tập yêu cầu 'hệ thống thật', 'staging', 'pod production' mà sinh viên CLB không có.
  - Bằng chứng: `"> **Tóm tắt:** Performance engineering: profiling, allocation, GC, benchmarking — định lượng cải tiến cho hot path CRM." (README chỉ có tóm tắt và mục lục)`
  - Sửa: Thêm vào README: kiến thức cần có (Module 6 async, 13 EF Core, 14 cache, 15 Docker); file docker-compose (SQL Server/PostgreSQL + Redis + API CRM mẫu với seed 1-2 triệu dòng); lệnh cài tools (`dotnet tool install -g dotnet-counters dotnet-trace dotnet-gcdump`, k6); lộ trình đề xuất cho CLB (bắt buộc: 19.1-19.5, 19.9, 19.12; nâng cao: 19.6, 19.7, 19.10). Với mỗi bài tập cần production, ghi 'phiên bản CLB' chạy được trên laptop.
- **minor** · chính xác · [19.1-measure-before-and-after.md:237](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.1-measure-before-and-after.md): PromQL dùng metric `http_server_requests_total` với nhãn `status`. Đây không phải metric mà ASP.NET Core/OpenTelemetry xuất ra: số request lấy từ `http_server_request_duration_seconds_count`, nhãn là `http_response_status_code`. Code block k6 ở dòng 334 lại gắn nhãn yaml dù nội dung là JavaScript.
  - Bằng chứng: `"sum by (route) (rate(http_server_requests_total{status=~\"5..\"}[30d]))" ; "'''yaml # k6 — ngưỡng lấy thẳng từ SLO export const options = {"`
  - Sửa: Dùng `rate(http_server_request_duration_seconds_count{http_response_status_code=~"5.."}[30d])` và nhãn `http_route`. Đổi nhãn code block thành `javascript`.
- **minor** · chính xác · [19.12-quick-real-world-example.md:123](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.12-quick-real-world-example.md): OpenXML SDK không có chế độ tên `SpreadsheetWriter`. API ghi kiểu streaming là `OpenXmlWriter`. Dòng 169 khuyên dùng `GetBuffer()` thay ToArray, nhưng GetBuffer trả cả phần dung lượng thừa, ghi thẳng ra sẽ thành file hỏng.
  - Bằng chứng: `"dùng thư viện hỗ trợ streaming (ví dụ chế độ 'SpreadsheetWriter' của OpenXML SDK)"; "Dùng 'GetBuffer()' hoặc ghi thẳng vào 'Response.Body'."`
  - Sửa: Đổi thành '`OpenXmlWriter` của DocumentFormat.OpenXml, hoặc thư viện như MiniExcel hỗ trợ ghi streaming'. Thay gợi ý GetBuffer bằng `stream.Position = 0; return File(stream, ...)`, hoặc `TryGetBuffer(out var seg)` và chỉ dùng `seg.Count` byte.
- **minor** · chính xác · [19.2-benchmarkdotnet.md:76](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.2-benchmarkdotnet.md): Cú pháp attribute ghi sai: không có `[Baseline = true]`, mà phải là `[Benchmark(Baseline = true)]`. Bài 2 (dòng 525) chạy BenchmarkRunner bên trong xUnit test mà không cảnh báo: việc này mất nhiều phút, cần build Release và tách process, không phải test CI nhẹ như bài gợi ý.
  - Bằng chứng: `"- **'[Baseline = true]'** cho cột 'Ratio' so sánh tương đối"; "var ketQua = BenchmarkRunner.Run<NoiChuoiBenchmark>();" trong [Fact]`
  - Sửa: Sửa thành `[Benchmark(Baseline = true)]`. Với test CI, khuyên chạy BDN như một job riêng (`dotnet run -c Release -- --filter *` kèm `--exporters json`) rồi kiểm tra ngưỡng Allocated bằng script, thay vì gọi BenchmarkRunner trong unit test.
- **minor** · chính xác · [19.3-dotnet-server-profiling.md:123](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.3-dotnet-server-profiling.md): Bài khẳng định mỗi thread tốn 1 MB nên 200 thread là 200 MB bộ nhớ, và 41 luồng là 41 MB (dòng 313). Stack mặc định chỉ là vùng nhớ ảo được đặt trước (reserved). Bộ nhớ thật (committed) chỉ tăng theo phần stack đã dùng, nên RSS không tăng 200 MB.
  - Bằng chứng: `"mỗi thread tốn 1 MB stack — 200 thread là 200 MB"`
  - Sửa: Sửa thành 'mỗi thread đặt trước khoảng 1-1,5 MB không gian stack ảo (bộ nhớ thật dùng ít hơn nhiều), nhưng nhiều thread làm tăng chi phí chuyển ngữ cảnh và lập lịch'. Nhấn vào chi phí CPU và độ trễ hơn là RAM.
- **minor** · chính xác · [19.4-database-first-bottleneck.md:302](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.4-database-first-bottleneck.md): EF Core với SQLite không dịch được Sum trên cột decimal (NotSupportedException 'SQLite cannot apply aggregate operator Sum on expressions of type decimal'). Nếu GiaTri là decimal, đúng như kiểu thường dùng cho tiền trong CRM, cả cách A và C sẽ ném lỗi.
  - Bằng chứng: `"t += db.Leads.AsNoTracking().Where(l => l.KhachHangId == kh.Id).Sum(l => l.GiaTri);" — đo trên SQLite`
  - Sửa: Ghi rõ GiaTri là long hoặc double trong ví dụ SQLite, hoặc thêm cấu hình `HasConversion<double>()`. Kèm chú thích về hạn chế decimal của SQLite. Tốt nhất chạy bài trên SQL Server/PostgreSQL bằng Docker.
- **minor** · chính xác · [19.5-systematic-caching-overview.md:23](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.5-systematic-caching-overview.md): Bảng chọn tầng cache ghi HybridCache 'không dùng cho: khi chỉ có một instance'. Thực tế HybridCache dùng tốt khi không có L2: tài liệu nói vẫn có cache trong tiến trình và chống stampede. Bài 19.5 dòng 493 lại khuyên SemaphoreSlim cho một instance, nên lời khuyên không thống nhất.
  - Bằng chứng: `"| **'HybridCache'** | **Mặc định tốt** — L1 bộ nhớ + L2 Redis | Khi chỉ có một instance |"`
  - Sửa: Đổi cột 'Không dùng cho' của HybridCache thành 'Đối tượng không tuần tự hoá được, cần thao tác Redis nâng cao'. Ghi rõ: một instance vẫn dùng được, khi đó chỉ có L1 kèm chống stampede. Nhắc cài gói Microsoft.Extensions.Caching.Hybrid.
- **minor** · chính xác · [19.6-scaling-strategy.md:296](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.6-scaling-strategy.md): Bài gọi INCR rồi EXPIRE là 'nguyên tử' nhưng đây là hai lệnh riêng: nếu tiến trình chết giữa hai lệnh, khoá tồn tại không có TTL. Bài cũng không nhắc tới rate limiter có sẵn của ASP.NET Core (Module 9.6).
  - Bằng chứng: `"// Sửa bằng bộ đếm trong Redis, tăng và đặt hạn dùng nguyên tử"`
  - Sửa: Dùng Lua script hoặc MULTI/EXEC (`ITransaction`) để INCR và EXPIRE cùng lúc, hoặc đổi chữ thành 'gần nguyên tử'. Thêm liên hệ: RateLimiter có sẵn chỉ đếm trong một tiến trình, nên nhiều pod cần backend phân tán.
- **minor** · nhất quán · [19.9-crm-context.md:33](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.9-crm-context.md): Tên thuộc tính và kiểu của entity CRM không thống nhất giữa các bài trong module: Lead.Name/CreatedAt/Value (19.9, 19.12) và Lead.HoTen/NgayTao/GiaTri (19.1, 19.4, 19.12 Bài 3); bảng KhachHang và Customers; TenantId kiểu UNIQUEIDENTIFIER, INT, 'acme' và Guid.
  - Bằng chứng: `"TenantId        UNIQUEIDENTIFIER NOT NULL" (19.9) vs "WHERE TenantId = 'acme'" (19.4) vs "Where(l => l.TenantId == 1)" (19.9 Bài 1); "l.Name.Contains(keyword)" vs "l.HoTen.Contains(q)"`
  - Sửa: Chọn một mô hình CRM chuẩn của khóa (theo Project 2/3) và áp dụng nhất quán: một cách đặt tên (tiếng Anh hoặc tiếng Việt), một kiểu TenantId. Thêm hộp 'Mô hình dữ liệu dùng trong module' ở README.
- **minor** · chính xác · [19.9-crm-context.md:134](../lessons/stage-05-senior-engineering/module-19-performance-engineering/19.9-crm-context.md): Bài nói change tracker làm context 'chậm dần theo cấp số'. Thực tế chi phí là O(n) mỗi lần SaveChanges, tức O(n²) cho cả quá trình, không phải hàm mũ. Bài cũng ghi SqlBulkCopy 'không áp global query filter', nhưng query filter vốn chỉ áp cho truy vấn đọc, không liên quan tới insert.
  - Bằng chứng: `"một context dùng cho 50.000 entity sẽ chậm dần theo cấp số và ngốn bộ nhớ"; "không kích hoạt interceptor, không sinh domain event, và không áp global query filter"`
  - Sửa: Đổi thành 'chậm dần theo bình phương tổng số entity (mỗi SaveChanges phải quét toàn bộ tracker)'. Thay 'không áp global query filter' bằng 'không tự gán TenantId/audit field qua interceptor hay SaveChanges override, nên dễ chèn dữ liệu thiếu TenantId'.

### Final Project — Enterprise CRM / ERP Platform

- **major** (ban đầu critical) · cấu trúc · [final-project-enterprise-crm-erp.md:7](../lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp.md): Gần một nửa file là văn mẫu hoặc mục rỗng: 'Phương pháp học tập', 'Câu hỏi khởi động' chung chung, 'Mở rộng và đào sâu / Khung hiểu nhanh', 'Mini case study' chỉ có hướng dẫn chung không có tình huống, 'Ví dụ thực tế nhanh' chỉ là gạch đầu dòng mô tả cần có gì. Đây là bài capstone nên lỗ hổng này khiến mentor không có đề cụ thể để giao.
  - Bằng chứng: `"Chọn một use case nhỏ trong CRM/ERP liên quan trực tiếp đến bài học này, mô tả rõ đầu vào, đầu ra và tiêu chí thành công."; "- Một ví dụ áp dụng trực tiếp vào luồng CRM/ERP hiện tại."`
  - Sửa: Xoá các mục văn mẫu. Thay bằng: (1) đề bài mẫu cụ thể 'Convert Lead → Customer → tạo Subscription draft (Billing) và Onboarding ticket (Support) qua outbox', có hợp đồng event JSON, sơ đồ trình tự, tiêu chí chấp nhận; (2) 3 lỗi thường gặp (dual write, consumer không idempotent, webhook không kiểm chữ ký) kèm cách kiểm tra.
  - Phản biện (adjusted): Các mục văn mẫu có thật: 'Phương pháp học tập', 'Câu hỏi khởi động', 'Khung hiểu nhanh', 'Mini case study' không có tình huống, 'Ví dụ thực tế nhanh' chỉ là gạch đầu dòng. Tuy nhiên file vẫn có nội dung thật ở mục 1-9 (mục tiêu, phạm vi, tiêu chí Pass/Strong/Exemplary, lộ trình theo tuần, payment/webhook, checklist nộp bài). Mentor vẫn có khung đề để giao, nên mình hạ từ critical xuống major. Cách sửa: xoá văn mẫu và thêm đề mẫu cụ thể như reviewer đề xuất.
- **major** · thực tế · [final-project-enterprise-crm-erp.md:36](../lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp.md): Phạm vi và kỳ vọng quá rộng so với sinh viên: thanh toán, omnichannel, microservice + gateway, OpenTelemetry end-to-end, threat model. Không có tổng thời lượng (lộ trình theo tuần dừng ở 'Tuần 5+'), không có hướng dẫn chia việc theo nhóm, mốc review với mentor, repo khởi đầu hay mô hình domain mẫu.
  - Bằng chứng: `"**Tuần 5+: Độ tin cậy & vận hành** - Health ready/live, migration strategy, seed data, feature flag đơn giản nếu cần."`
  - Sửa: Thêm 'Gói CLB': nhóm 3-4 người, 8 tuần, mốc demo tuần 2/4/6/8. Phạm vi tối thiểu là Sales + Billing (payment stub hoặc Stripe test mode), modular monolith, một outbox. Cung cấp repo template (.NET 10, EF Core 10, docker compose, CI sẵn) và phân vai gợi ý trong nhóm.
- **major** · đầy đủ · [final-project-enterprise-crm-erp.md:238](../lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp.md): Rubric không khớp với tiêu chí Pass. Pass bắt buộc unit test và integration test, nhưng rubric chỉ chấm 'CI (build + test)'. Không có điểm cho hiệu năng (Module 19) hay observability, dù đó là mục tiêu ở mục 1. Bảng ngưỡng còn sót câu chép từ module khác: 'Đủ nền để học module kế', mà đây là bài cuối.
  - Bằng chứng: `"| **Đạt** | ≥ 70 | Đủ nền để học module kế mà không “lủng” kiến thức cốt lõi. |"`
  - Sửa: Bổ sung rubric: test (unit + integration, Testcontainers) 10 điểm; observability (correlation id, trace một luồng) 5 điểm; hiệu năng (test đếm truy vấn + số đo p95 trước/sau) 5 điểm. Cân lại tổng 80. Sửa ý nghĩa ngưỡng thành 'đạt chuẩn portfolio' và mô tả cụ thể từng mức.
- **minor** (ban đầu major) · nhất quán · [final-project-enterprise-crm-erp.md:42](../lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp.md): Tên miền nghiệp vụ lệch với phần còn lại của khóa. Final dùng Lead, Account, Contact, Opportunity, trong khi Module 19 và roadmap dùng Customer/KhachHang, Deal, Activity. Phần 'Quy trình làm bài' lại nhắc 'Lead, Customer, Deal, Billing'. Sinh viên sẽ không biết nên dùng model nào.
  - Bằng chứng: `"| CRM | Lead, Account, Contact, Opportunity pipeline |" vs dòng 203 "(Lead, Customer, Deal, Billing…)"`
  - Sửa: Thống nhất một bảng thuật ngữ domain (Lead, Customer, Contact, Deal/Opportunity, Activity), nói rõ ánh xạ Account = Customer, Opportunity = Deal, và áp dụng xuyên suốt Project 2/3, Module 19 và Final.
  - Phản biện (adjusted): Lệch tên là có thật: dòng 42 dùng Account/Opportunity, dòng 203 dùng Customer/Deal. Nhưng dòng 79 của chính file đã giao cho học viên việc 'Viết glossary thuật ngữ (Lead so với Customer so với Account)', và Opportunity/Deal là hai tên đồng nghĩa phổ biến trong CRM. Mức gây rối thấp hơn reviewer đánh giá, nên mình hạ xuống minor. Nên thêm một câu ánh xạ Account = Customer, Opportunity = Deal.
- **minor** · đầy đủ · [final-project-enterprise-crm-erp.md:226](../lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp.md): Quiz hỏi 'Strangler fig' nhưng file không giải thích và cũng không link tới bài nào dạy khái niệm này. Các phương án nhiễu như 'Meme team', 'Chỉ link TikTok' quá lộ, nên quiz không kiểm tra được gì.
  - Bằng chứng: `"4. “Strangler fig” trong tách monolith nghĩa là? ... 5. ADR ... A. Meme team ... C. Chỉ link TikTok"`
  - Sửa: Thêm link tới bài Module 18 có nói về strangler fig, hoặc đổi câu hỏi. Viết lại phương án nhiễu thành các hiểu lầm có thật (ví dụ 'ADR chỉ ghi quyết định cuối, không cần bối cảnh'). Đặt đáp án trong &lt;details&gt;.

### Lộ trình .NET Backend: From Zero → Senior (Backend-first)

- **minor** (ban đầu major) · đầy đủ · [roadmap-dotnet-backend-zero-to-senior.md:29](../lessons/roadmap-dotnet-backend-zero-to-senior.md): Lộ trình không nêu phiên bản .NET và công cụ cần cài (SDK, IDE, Docker), không link tới glossary.md, không có hướng dẫn học theo hình thức CLB (tự học kết hợp buổi live-coding). Với người 'không cần biết lập trình trước', thiếu bước chuẩn bị môi trường là rào cản ngay từ đầu.
  - Bằng chứng: `"**Giả định đầu vào**: biết dùng máy tính và chịu được việc đọc tài liệu tiếng Anh. Không cần biết lập trình trước."`
  - Sửa: Thêm mục 'Chuẩn bị' (cài .NET 10 SDK, kiểm tra bằng `dotnet --info`, IDE, Docker Desktop, Git) và mục 'Học cùng CLB' (nhịp tuần, buổi live-coding, mốc review dự án). Thêm link 'Bảng thuật ngữ (`glossary.md`)'. Ghi rõ toàn khóa dùng .NET 10 LTS / C# 14.
  - Phản biện (adjusted): Roadmap đúng là không nêu phiên bản .NET, không link glossary.md, không có hướng dẫn học theo CLB. Tuy nhiên bài stage-01 module-02/2.9-dotnet-runtime-and-ecosystem.md đã có phần cài .NET / `dotnet --info`. Vì vậy chỉ cần thêm vào roadmap mục 'Chuẩn bị' ngắn link tới 2.9, ghi rõ toàn khóa dùng .NET 10 LTS / C# 14, link glossary và mục 'Học cùng CLB'. Không cần viết lại hướng dẫn cài đặt, nên mình hạ xuống minor.
- **minor** · thực tế · [roadmap-dotnet-backend-zero-to-senior.md:107](../lessons/roadmap-dotnet-backend-zero-to-senior.md): Bảng thời gian đặt 'Tuần 15+' cho giai đoạn Senior và tổng khoảng 14 tuần từ zero tới hết Database + Production. Với sinh viên học song song việc trên lớp, con số này không thực tế và dễ gây nản. Bài cũng chưa phân biệt phần bắt buộc với phần nâng cao.
  - Bằng chứng: `"| Tuần 15+ | Senior Engineering | Đọc kiến trúc ở mức đánh đổi, không học vẹt pattern. |"`
  - Sửa: Đưa ra hai nhịp: 'toàn thời gian' và 'bán thời gian (sinh viên)', ví dụ gấp 2-3 lần. Đánh dấu giai đoạn 5 có phần 'đọc hiểu' và phần 'thực hành sâu' tuỳ chọn.

### Bảng thuật ngữ

- **major** · đầy đủ · [glossary.md:7](../lessons/glossary.md): Bảng thuật ngữ thiếu nhiều khái niệm xuất hiện dày ở Module 19 và giai đoạn 5: p95/p99, SLO, thread pool starvation, sync-over-async, cache stampede, keyset pagination, parameter sniffing, execution plan, LOH/GC generation, bounded context, ADR. Cũng thiếu thuật ngữ nền cho người mới: Task, interface, migration, index, container.
  - Bằng chứng: `Mục lục chỉ gồm: LINQ, ConfigureAwait, CancellationToken, DI, Middleware, ProblemDetails, ... Distributed lock (không có SLO, p99, stampede, starvation...)`
  - Sửa: Bổ sung ít nhất 15-20 mục theo cùng format (định nghĩa 2-3 câu + link bài), ví dụ: 'p95/p99 → 19.1', 'Thread pool starvation → 19.3', 'Cache stampede → 19.5', 'Keyset pagination → 19.9 / 9.4', 'Parameter sniffing → 19.4', 'Index → 12.4', 'Migration → 13.x'.
- **minor** · chính xác · [glossary.md:43](../lessons/glossary.md): ProblemDetails được dẫn theo RFC 7807, nhưng RFC này đã bị RFC 9457 thay thế (2023). Tài liệu ASP.NET Core hiện hành dẫn RFC 9457.
  - Bằng chứng: `"Định dạng chuẩn hoá cho thân phản hồi lỗi của HTTP API, quy định bởi RFC 7807."`
  - Sửa: Đổi thành 'RFC 9457 (thay thế RFC 7807)'.
- **minor** · nhất quán · [glossary.md:181](../lessons/glossary.md): Định nghĩa Distributed lock nói khoá 'đảm bảo chỉ một nơi chạy', mâu thuẫn với thông điệp chính của bài 19.7 được link tới: khoá phân tán không bao giờ an toàn tuyệt đối. Định nghĩa HybridCache cũng không nêu giới hạn chống stampede chỉ trong một tiến trình.
  - Bằng chứng: `"Khoá dùng chung giữa nhiều tiến trình hoặc nhiều máy, để đảm bảo chỉ một nơi chạy một đoạn công việc tại một thời điểm."`
  - Sửa: Sửa thành: '...để giảm khả năng nhiều nơi cùng chạy một việc. Khoá có TTL nên không bảo đảm tuyệt đối; tính đúng đắn cần thêm unique constraint hoặc fencing token.' Với HybridCache, thêm: 'chống stampede trong từng instance'.

## 4. Lỗi bị bác bỏ khi phản biện

- [6.5-task-parallel-library.md:65](../lessons/stage-02-csharp-professional/module-06-async-programming/6.5-task-parallel-library.md): await Task.WhenAll ném InnerExceptions[0], tức ngoại lệ của task đứng đầu theo thứ tự truyền vào, không phải task 'lỗi đầu tiên' theo thời gian. Mã nguồn WhenAll gom exception theo chỉ số task, nên với ví dụ A, B, C kết quả phải là 'lỗi A' và thứ tự A, B, C. Kết quả 'đo thật' ở dòng 414-418 (C, B, A) đáng ngờ.
  - Lý do bác bỏ: Đã chạy lời giải Bài 3 trên .NET 10 (SDK 10.0.401): kết quả là 'caught C', InnerExceptions theo thứ tự C, A, B, tức theo thứ tự hoàn tất chứ không theo thứ tự task truyền vào. Khẳng định của reviewer ('phải là lỗi A và thứ tự A, B, C') sai. Câu trong bài ('exception của task ĐẦU TIÊN lỗi') sát với hành vi thực tế. Chỉ nên ghi thêm rằng thứ tự không xác định giữa các lần chạy, và output đo trên .NET 9 có thể khác khi chạy lại.
