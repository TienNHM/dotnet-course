# .NET Backend: Zero → Senior

Lộ trình học .NET backend bằng tiếng Việt, gồm 5 giai đoạn, 19 module và 4 dự án: nền tảng lập trình và Git, C# chuyên nghiệp (OOP, LINQ, generics, async/await, DI), ASP.NET Core (middleware, Web API, xác thực và phân quyền, SignalR), tầng dữ liệu và production (SQL, EF Core, caching, background jobs, Docker và deployment), rồi tới kỹ thuật cấp senior (Clean Architecture, DDD, hệ phân tán, microservices, performance engineering).

Xuyên suốt khóa học là một hệ CRM quản lý khách hàng, lớn dần từ `List` trong bộ nhớ ở giai đoạn 1 tới hệ phân tán nhiều bounded context ở giai đoạn 5. Mỗi kiến thức mới xuất hiện đúng lúc bài toán cần tới nó.

Mỗi bài học có mục tiêu, nội dung kèm ví dụ chạy được, danh sách rà soát, bài tập áp dụng có gợi ý và lời giải ẩn, câu hỏi tự kiểm tra và tài liệu tham khảo. Cuối mỗi module có một bài đánh giá.

## Bắt đầu

- [Lộ trình tổng quan](lessons/roadmap-dotnet-backend-zero-to-senior.md): vì sao các module được xếp theo thứ tự này, sơ đồ phụ thuộc kiến thức và kiến trúc đích.
- [Bảng thuật ngữ](lessons/glossary.md): tra nhanh các thuật ngữ dùng xuyên suốt khóa học.

## Mục lục

### [Giai đoạn 1 — Foundation: tư duy lập trình, nền tảng CS và Git workflow](lessons/stage-01-foundation/README.md)

| Module | Số bài |
| --- | --- |
| [Module 1 - Programming Logic](lessons/stage-01-foundation/module-01-programming-logic/README.md) | 11 |
| [Module 2 - Computer Science Basics](lessons/stage-01-foundation/module-02-computer-science-basics/README.md) | 13 |
| [Module 3 - Git + Developer Workflow](lessons/stage-01-foundation/module-03-git-developer-workflow/README.md) | 14 |

### [Giai đoạn 2 — C# Professional: OOP, LINQ, async/await và Dependency Injection](lessons/stage-02-csharp-professional/README.md)

| Module | Số bài |
| --- | --- |
| [Module 4 - C# Core](lessons/stage-02-csharp-professional/module-04-csharp-core/README.md) | 13 |
| [Module 5 - Advanced C#](lessons/stage-02-csharp-professional/module-05-advanced-csharp/README.md) | 12 |
| [Module 6 - Async Programming](lessons/stage-02-csharp-professional/module-06-async-programming/README.md) | 12 |
| [Module 7 - Dependency Injection](lessons/stage-02-csharp-professional/module-07-dependency-injection/README.md) | 13 |
| 🎯 [Project 1 - Inventory System (Console + API)](lessons/stage-02-csharp-professional/project-01-inventory-console-api.md) | Dự án |

### [Giai đoạn 3 — ASP.NET Core Backend: Web API, xác thực phân quyền và SignalR](lessons/stage-03-aspnet-core-backend/README.md)

| Module | Số bài |
| --- | --- |
| [Module 8 - ASP.NET Core Fundamentals](lessons/stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/README.md) | 13 |
| [Module 9 - Web API Professional](lessons/stage-03-aspnet-core-backend/module-09-web-api-professional/README.md) | 13 |
| [Module 10 - Authentication + Authorization](lessons/stage-03-aspnet-core-backend/module-10-authentication-authorization/README.md) | 14 |
| [Module 11 - SignalR](lessons/stage-03-aspnet-core-backend/module-11-signalr/README.md) | 14 |
| 🎯 [Project 2 — CRM Backend API](lessons/stage-03-aspnet-core-backend/project-02-crm-backend-api.md) | Dự án |

### [Giai đoạn 4 — Database + Production: SQL Server, EF Core, caching và Docker](lessons/stage-04-database-production/README.md)

| Module | Số bài |
| --- | --- |
| [Module 12 - SQL Deep Dive](lessons/stage-04-database-production/module-12-sql-deep-dive/README.md) | 12 |
| [Module 13 - Entity Framework Core](lessons/stage-04-database-production/module-13-entity-framework-core/README.md) | 14 |
| [Module 14 - Caching + Background Jobs](lessons/stage-04-database-production/module-14-caching-background-jobs/README.md) | 13 |
| [Module 15 - Docker + Deployment](lessons/stage-04-database-production/module-15-docker-deployment/README.md) | 14 |
| 🎯 [Project 3 — Production CRM Platform](lessons/stage-04-database-production/project-03-production-crm-platform.md) | Dự án |

### [Giai đoạn 5 — Senior Engineering: Clean Architecture, hệ phân tán và microservices](lessons/stage-05-senior-engineering/README.md)

| Module | Số bài |
| --- | --- |
| [Module 16 - Clean Architecture](lessons/stage-05-senior-engineering/module-16-clean-architecture/README.md) | 16 |
| [Module 17 - Distributed Systems](lessons/stage-05-senior-engineering/module-17-distributed-systems/README.md) | 14 |
| [Module 18 - Microservices](lessons/stage-05-senior-engineering/module-18-microservices/README.md) | 13 |
| [Module 19 - Performance Engineering](lessons/stage-05-senior-engineering/module-19-performance-engineering/README.md) | 13 |
| 🎯 [Final Project — Enterprise CRM / ERP Platform](lessons/stage-05-senior-engineering/final-project-enterprise-crm-erp.md) | Dự án |

## Cấu trúc repo

```text
lessons/            bài học: giai đoạn → module → bài, ảnh sơ đồ nằm trong img/ cạnh bài
diagrams/           file HTML nguồn của các sơ đồ (bản sáng và bản tối)
scripts/            script xuất sơ đồ HTML ra PNG
.vitepress/         cấu hình và giao diện website
```

## Website

Repo được dựng thành website bằng [VitePress](https://vitepress.dev/). Mỗi lần push lên `master`, GitHub Actions ([deploy-pages.yml](.github/workflows/deploy-pages.yml)) tự build và publish lên GitHub Pages.

Chạy thử trên máy (cần Node.js 20 trở lên):

```sh
npm install
npm run docs:dev      # http://localhost:5173, tự tải lại khi sửa bài
npm run docs:build    # build ra .vitepress/dist
```

Trang chủ là [index.md](index.md), phần giao diện riêng nằm trong [.vitepress/theme/](.vitepress/theme/). Sidebar và trang chủ tự sinh từ cấu trúc thư mục `lessons/` và tiêu đề `# ...` của từng bài ([.vitepress/course.ts](.vitepress/course.ts)).

## Sửa sơ đồ

Sơ đồ chính của bài được vẽ bằng HTML/SVG trong `diagrams/`, rồi xuất ra PNG (bản sáng và tối) để nhúng vào bài:

```sh
pip install playwright && python -m playwright install chromium   # một lần
python scripts/export-diagram.py \
  diagrams/stage-01-foundation/module-02-computer-science-basics/gc-generations.html \
  lessons/stage-01-foundation/module-02-computer-science-basics/img/gc-generations.png
```

Sơ đồ nhỏ, đi kèm một đoạn thì viết thẳng bằng Mermaid trong bài; GitHub tự hiển thị.

## Nguồn

Nội dung được chuyển từ series [.NET Backend: Zero → Senior](https://tiennhm.io.vn/docs/dotnet-backend-zero-to-senior) của [TienNHM](https://github.com/TienNHM).

## Giấy phép

Toàn bộ repo, gồm cả nội dung bài học và hình ảnh trong `lessons/`, được phát hành theo giấy phép [MIT](LICENSE).
