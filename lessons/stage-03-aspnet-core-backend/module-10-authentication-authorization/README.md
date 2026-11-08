# Module 10 - Authentication + Authorization

> **Tóm tắt:** Xác thực và phân quyền cho API CRM bằng ASP.NET Core: JWT và refresh token, phân quyền theo vai trò, policy, tài nguyên và permission, ASP.NET Core Identity, đăng nhập bằng Google, cùng các thực hành bảo mật cần có trước khi lên production.

## Mục tiêu module

Sau module này bạn có thể:

- Trả đúng 401 hay 403, đọc claim đúng cách và giữ token nhỏ.
- Phát và xác thực JWT với cấu hình an toàn, có test chứng minh chữ ký được kiểm.
- Cài refresh token rotation có phát hiện tái sử dụng, an toàn khi nhiều request chạy song song.
- Phân quyền theo vai trò, policy, tài nguyên (chặn IDOR) và permission dạng chuỗi có cache.
- Dùng ASP.NET Core Identity cho người dùng, mật khẩu, lockout và `SecurityStamp` trong một API JWT.

## Cần biết trước

- Pipeline, controller, cấu hình, logging của [Module 8](../module-08-aspnet-core-fundamentals/README.md), đặc biệt EF Core tối thiểu ở [bài 8.10](../module-08-aspnet-core-fundamentals/8.10-ef-core-minimal.md).
- Rate limiting và integration test của [Module 9](../module-09-web-api-professional/README.md) ([bài 9.6](../module-09-web-api-professional/9.6-rate-limiting.md), [bài 9.8](../module-09-web-api-professional/9.8-api-testing.md)).
- Service lifetime và Options pattern của [Module 7](../../stage-02-csharp-professional/module-07-dependency-injection/README.md).

## Chuẩn bị môi trường

- .NET SDK 10, PostgreSQL 16 chạy bằng `docker-compose.yml` ở gốc repo (từ bài 10.3).
- Một project Web API có controller. Các gói sẽ thêm dần theo bài:

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer        # 10.2
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL                # 10.3
dotnet add package Microsoft.EntityFrameworkCore.Design                 # 10.3, cho dotnet ef
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore    # 10.8
dotnet add package Microsoft.AspNetCore.Authentication.Google           # 10.9, nâng cao
```

- Khoá ký JWT và chuỗi kết nối đặt bằng `dotnet user-secrets`, không đặt trong `appsettings.json`.
- Bài 10.9 cần một OAuth Client ID tạo trong Google Cloud Console.

## Lộ trình học

Đi theo thứ tự bài. Bài 10.2 và 10.3 dùng một kho người dùng tạm trong bộ nhớ để tập trung vào token; bài 10.8 thay nó bằng Identity và PostgreSQL.

| Bài | Loại |
|---|---|
| 10.1 → 10.8 | **Lõi**, làm đủ bài tập |
| 10.10 | **Lõi**, đọc trước khi lên production |
| 10.12, 10.13 | Tình huống thực tế, ôn lại 10.3, 10.6, 10.8 |
| 10.9, 10.11 | **Nâng cao, không bắt buộc**: đăng nhập Google, Data Protection, PKCE, passkey, mTLS |
| 10.14 | Ôn tập và đánh giá |

## Nội dung module

- [10.1 - Authentication so với Authorization](10.1-authentication-vs-authorization.md)
- [10.2 - JWT Authentication](10.2-jwt-authentication.md)
- [10.3 - Refresh Token](10.3-refresh-token.md)
- [10.4 - Role-based Authorization](10.4-role-based-authorization.md)
- [10.5 - Policy-based Authorization](10.5-policy-based-authorization.md)
- [10.6 - Resource-based Authorization](10.6-resource-based-authorization.md)
- [10.7 - Permission System](10.7-permission-system.md)
- [10.8 - ASP.NET Core Identity cho API JWT](10.8-overview.md)
- [10.9 - Đăng nhập bằng Google: OAuth 2.0 và OpenID Connect](10.9-overview.md)
- [10.10 - Security Best Practices](10.10-security-best-practices.md)
- [10.11 - Bảo mật nâng cao: Data Protection, PKCE, passkey, mTLS](10.11-advanced-notes.md)
- [10.12 - Case study: nhân viên nghỉ việc vẫn gọi được API](10.12-mini-case-study.md)
- [10.13 - Ví dụ thực tế: sales sửa được lead của đồng nghiệp](10.13-quick-real-world-example.md)
- [10.14 - Ôn tập và đánh giá Module 10](10.14-review-and-assessment.md)

## Bài liên quan

- [Đổi id trên URL ra dữ liệu người khác? Chặn IDOR ở một tầng duy nhất](https://tiennhm.io.vn/blog/idor-broken-access-control-aspnet-core) — IDOR xảy ra khi API nhận id từ request rồi đọc thẳng bản ghi mà không hỏi xem người gọi có sở hữu bản ghi đó không.
- [Dựng một nền tảng CRM multi-tenant từ con số không: chuyện nghề 20 tháng](https://tiennhm.io.vn/blog/founding-engineer-nen-tang-crm-abp-dotnet-angular) — Sản phẩm đầu tiên mình được giao init và dựng từ đầu: một nền tảng CRM multi-tenant, đi demo cho nhiều ngành gần một năm rồi chuyển sang delivery…
