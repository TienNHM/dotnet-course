# Module 6 - Async Programming

> **Tóm tắt:** Lập trình bất đồng bộ trong .NET 10: vì sao async tăng thông lượng, `Task` và `async`/`await`, `ConfigureAwait`, huỷ bằng `CancellationToken`, chạy song song có giới hạn, các mẫu async hay dùng, chín bẫy thường gặp, channel và `BackgroundService`. Bài 6.9 là bài đọc thêm; bài 6.10 và 6.11 áp dụng cả module vào một case study và một sự cố thực tế; bài 6.12 là quiz và lab tổng kết. Mọi output và số đo trong module được chạy trên .NET 10, phần database chạy trên PostgreSQL 16.

## Nội dung module

- [6.1 - Tại sao cần Async?](6.1-why-async-matters.md)
- [6.2 - Task và async/await](6.2-task-and-async-await.md)
- [6.3 - ConfigureAwait](6.3-configureawait.md)
- [6.4 - CancellationToken](6.4-cancellationtoken.md)
- [6.5 - Task Parallel Library](6.5-task-parallel-library.md)
- [6.6 - Async Patterns](6.6-async-patterns.md)
- [6.7 - Common Pitfalls](6.7-common-pitfalls.md)
- [6.8 - Channels và Producer-Consumer](6.8-channels-and-producer-consumer.md)
- [6.9 - Đọc thêm: TimeProvider, PeriodicTimer và đo ValueTask](6.9-advanced-notes.md)
- [6.10 - Case study: đồng bộ 500 khách hàng với song song có giới hạn](6.10-mini-case-study.md)
- [6.11 - Sự cố thực tế: một dòng .Result làm treo cả API](6.11-quick-real-world-example.md)
- [6.12 - Ôn tập và đánh giá Module 6](6.12-review-and-assessment.md)

## Bài liên quan

- [Gọi .Result khi nào thì deadlock, khi nào thì không?](https://tiennhm.io.vn/blog/deadlock-result-wait-csharp) — Gọi .Result hay .Wait() trên một Task treo cứng ứng dụng WPF và ASP.NET Framework, nhưng chạy bình thường trong console và ASP.NET Core.
