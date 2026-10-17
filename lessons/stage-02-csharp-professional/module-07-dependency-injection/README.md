# Module 7 - Dependency Injection

> **Tóm tắt:** Dependency injection trong .NET: service lifetime, composition root, options pattern — khớp với container ASP.NET Core và kiểm thử đơn vị.

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
- [7.10 - Mở rộng và đào sâu](7.10-advanced-notes.md)
- [7.11 - Mini case study](7.11-mini-case-study.md)
- [7.12 - Ví dụ thực tế nhanh](7.12-quick-real-world-example.md)
- [7.13 - Review and Assessment](7.13-review-and-assessment.md)

## Bài liên quan

- [Singleton, Scoped hay Transient? Chọn sai là DbContext sống mãi](https://tiennhm.io.vn/blog/singleton-scoped-transient-captive-dependency) — Ba lifetime trong DI container của ASP.NET Core khác nhau ở thời điểm tạo và thời điểm dispose instance.
- [Forward header trong ASP.NET Core: vì sao 'forward hết' là một lỗi kiến trúc](https://tiennhm.io.vn/blog/forward-http-header-an-toan-aspnet-core) — Vòng lặp copy mọi header từ request đi vào sang lời gọi HttpClient đi ra là đoạn code trông vô hại nhất mà tôi từng thấy gây sự cố production.
- [MailKit trong .NET: gửi email SMTP và dựng HTML email template chạy đúng trên Outlook](https://tiennhm.io.vn/blog/mailkit-html-email-template) — MailKit là thư viện mail mà chính tài liệu Microsoft khuyến nghị thay cho System.Net.Mail.SmtpClient.
