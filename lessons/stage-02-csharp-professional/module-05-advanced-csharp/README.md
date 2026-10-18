# Module 5 - Advanced C#

> **Tóm tắt:** C# ở mức dùng hằng ngày trong backend: nguyên tắc SOLID và khi nào không nên áp dụng, generics, LINQ trên bộ nhớ và trên database, delegate và event (kèm rò rỉ bộ nhớ do quên gỡ đăng ký), extension method (cả khối `extension` của C# 14), nullable reference types, expression tree và reflection, tuple. Bài 5.9 là bài đọc thêm; bài 5.10 và 5.11 áp dụng cả module vào một case study và một sự cố thực tế; bài 5.12 là quiz và lab tổng kết.

## Nội dung module

- [5.1 - SOLID Principles](5.1-solid-principles.md)
- [5.2 - Generics](5.2-generics.md)
- [5.3 - LINQ](5.3-linq.md)
- [5.4 - Delegates và Events](5.4-delegates-and-events.md)
- [5.5 - Extension Methods](5.5-extension-methods.md)
- [5.6 - Nullable Reference Types (C# 8+)](5.6-nullable-reference-types.md)
- [5.7 - Expression Trees và Reflection](5.7-overview.md)
- [5.8 - Tuples và Deconstruction](5.8-tuples-and-deconstruction.md)
- [5.9 - Đọc thêm: IAsyncEnumerable, source generator và Span](5.9-advanced-notes.md)
- [5.10 - Case study: refactor hàm tính giảm giá](5.10-mini-case-study.md)
- [5.11 - Sự cố thực tế: rò rỉ bộ nhớ do event](5.11-quick-real-world-example.md)
- [5.12 - Ôn tập và đánh giá Module 5](5.12-review-and-assessment.md)

## Bài liên quan

- [Một dấu tiếng Việt làm chết lời gọi API: cf-ipcity, HttpClient và giới hạn ASCII](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) — Trên một nền tảng loyalty thương mại điện tử khoảng 3 triệu khách hàng, một lời gọi HTTP nội bộ hỏng trên production trong khi database, Kubernetes…
- [Vì sao EF Core bắn 201 query cho 1 màn hình danh sách? Cách sửa N+1](https://tiennhm.io.vn/blog/ef-core-n-plus-1-query) — Một màn hình 200 dòng mà log SQL ghi 201 câu lệnh là dấu hiệu của N+1 query.
