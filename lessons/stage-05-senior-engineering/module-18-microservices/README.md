# Module 18 - Microservices

> **Tóm tắt:** Microservices .NET: service boundaries, API gateway, resilience, observability — đánh đổi vận hành và tốc độ phát triển.

## Nội dung module

- [18.1 - Khi nào *không* nên microservices?](18.1-when-not-to-use-microservices.md)
- [18.2 - Service decomposition](18.2-service-decomposition.md)
- [18.3 - API Gateway - YARP (ưu tiên .NET)](18.3-api-gateway-yarp-dotnet.md)
- [18.4 - Giao tiếp giữa các service](18.4-inter-service-communication.md)
- [18.5 - Observability - bộ ba](18.5-observability-three-pillars.md)
- [18.6 - Identity trong hệ phân tán](18.6-distributed-identity-overview.md)
- [18.7 - Anti-pattern: distributed monolith](18.7-anti-pattern-distributed-monolith.md)
- [18.8 - Bổ sung (đối chiếu roadmap.sh)](18.8-roadmap-sh-supplement.md)
- [18.9 - Liên hệ CRM](18.9-crm-context.md)
- [18.10 - Mở rộng và đào sâu](18.10-advanced-notes.md)
- [18.11 - Mini case study](18.11-mini-case-study.md)
- [18.12 - Ví dụ thực tế nhanh](18.12-quick-real-world-example.md)
- [18.13 - Review and Assessment](18.13-review-and-assessment.md)

## Bài liên quan

- [Forward header trong ASP.NET Core: vì sao 'forward hết' là một lỗi kiến trúc](https://tiennhm.io.vn/blog/forward-http-header-an-toan-aspnet-core) — Vòng lặp copy mọi header từ request đi vào sang lời gọi HttpClient đi ra là đoạn code trông vô hại nhất mà tôi từng thấy gây sự cố production.
- [Một dấu tiếng Việt làm chết lời gọi API: cf-ipcity, HttpClient và giới hạn ASCII](https://tiennhm.io.vn/blog/cloudflare-header-broke-dotnet-httpclient) — Trên một nền tảng loyalty thương mại điện tử khoảng 3 triệu khách hàng, một lời gọi HTTP nội bộ hỏng trên production trong khi database, Kubernetes…
