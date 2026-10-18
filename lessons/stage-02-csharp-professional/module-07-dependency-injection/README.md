# Module 7 - Dependency Injection

> **Tóm tắt:** Dependency injection trong .NET 10: vì sao lớp không nên tự `new` phụ thuộc, container hoạt động thế nào, ba lifetime và lỗi captive dependency, `Program.cs`, options pattern, keyed services và các anti-pattern hay gặp. Module khép lại bằng một case study rò rỉ dữ liệu giữa tenant và bài ôn tập có lab chạy được.

## Kiến thức tiên quyết

- Interface, class, constructor ([Module 4](../module-04-csharp-core/README.md)); generic, lambda, extension method ([Module 5](../module-05-advanced-csharp/README.md)); `async`/`await` ([Module 6](../module-06-async-programming/README.md)).
- Viết unit test với xUnit ([bài 0.4](../../stage-01-foundation/module-00-setup/0.4-solution-and-unit-test.md)) và chạy một Web API nhỏ ([bài 0.5](../../stage-01-foundation/module-00-setup/0.5-first-web-api.md)).
- Module này đứng trước phần ASP.NET Core (Module 8). Middleware, controller, JWT, `DbContext` xuất hiện trong một số ví dụ đều được giải thích ngắn tại chỗ, kèm link tới bài dạy kỹ. Riêng Bài 2 của [bài 7.4](7.4-service-lifetimes.md) cần EF Core, nên làm sau [bài 8.10](../../stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/8.10-ef-core-minimal.md).

## Chuẩn bị môi trường

Phần lớn ví dụ chạy bằng project console:

```bash
dotnet new console -n DiPlayground
cd DiPlayground
dotnet add package Microsoft.Extensions.DependencyInjection
```

Dán code vào `Program.cs`, đặt mọi khai báo `class`, `interface`, `record` ở **cuối file** (sau code chạy), rồi `dotnet run`. Ví dụ cần cấu hình hoặc logging thì cài thêm `Microsoft.Extensions.Hosting` và dùng `Host.CreateApplicationBuilder`; ví dụ cần ASP.NET Core thì tạo project bằng `dotnet new web`. Test dùng xUnit và NSubstitute (`dotnet add package NSubstitute`). Mọi output trong module được chạy trên .NET 10.

## Nội dung module

- [7.1 - Vấn đề DI giải quyết](7.1-di-problem-scope.md)
- [7.2 - IoC Container và DI Container](7.2-ioc-container-and-di-container.md)
- [7.3 - Ba cách tiêm dependency](7.3-three-ways-register-services.md)
- [7.4 - Service Lifetimes](7.4-service-lifetimes.md)
- [7.5 - Registering Services](7.5-registering-services.md)
- [7.6 - Program.cs và WebApplicationBuilder](7.6-program-cs-and-webapplicationbuilder.md)
- [7.7 - Options Pattern](7.7-options-pattern.md)
- [7.8 - Keyed Services (.NET 8)](7.8-keyed-services.md)
- [7.9 - Anti-patterns](7.9-anti-patterns.md)
- [7.10 - Decorator, module đăng ký và Scrutor](7.10-advanced-notes.md)
- [7.11 - Captive dependency làm lộ dữ liệu giữa tenant](7.11-mini-case-study.md)
- [7.12 - Đổi cấu hình mà ứng dụng không nhận](7.12-quick-real-world-example.md)
- [7.13 - Ôn tập và đánh giá Module 7](7.13-review-and-assessment.md)

## Bài liên quan

- [Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency) — Ba lifetime trong DI container của ASP.NET Core khác nhau ở thời điểm tạo và thời điểm dispose instance.
- [Forward header trong ASP.NET Core: vì sao 'forward hết' là một lỗi kiến trúc](https://tiennhm.io.vn/blog/forward-http-header-an-toan-aspnet-core) — Vòng lặp copy mọi header từ request đi vào sang lời gọi HttpClient đi ra là đoạn code trông vô hại nhất mà tôi từng thấy gây sự cố production.
- [MailKit trong .NET: gửi email SMTP và dựng HTML email template chạy đúng trên Outlook](https://tiennhm.io.vn/blog/mailkit-html-email-template) — MailKit là thư viện mail mà chính tài liệu Microsoft khuyến nghị thay cho System.Net.Mail.SmtpClient.
