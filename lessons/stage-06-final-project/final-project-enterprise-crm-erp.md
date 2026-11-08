# Final Project — Enterprise CRM / ERP Platform

> **Tóm tắt:**
>
> **Abstract (terminal capstone).** Yêu cầu **chứng minh quyền sở hữu kiến trúc** qua vài luồng nghiệp vụ sâu: phân quyền tinh, tích hợp thanh toán sandbox, **event-driven** có idempotency — ưu tiên **tài liệu trade-off** và quan sát production-like hơn phạm vi chức năng rộng nông.

## Phương pháp học tập

Bài học này được dẫn dắt theo chu trình học tập chủ động:

1. **Khởi động tư duy**: bắt đầu bằng câu hỏi gợi mở để kích hoạt kiến thức nền.
2. **Kiến tạo kiến thức**: học khái niệm cốt lõi đi kèm ví dụ có ngữ cảnh.
3. **Luyện tập có hướng dẫn**: áp dụng qua mini case và ví dụ thực tế ngắn.
4. **Tự đánh giá và phản tư**: dùng checklist + bài thực hành để chốt năng lực.

> Mục tiêu là bạn hiểu sâu, dùng được ngay, và tự đánh giá được mức độ nắm bài.

## Câu hỏi khởi động

- Nếu không có kiến thức trong bài này, hệ thống CRM/ERP sẽ gặp rủi ro gì?
- Trong dự án thực tế, bạn nghĩ phần kiến thức này nằm ở tầng nào (API, nghiệp vụ, dữ liệu, vận hành)?
- Dấu hiệu nào cho thấy bạn đã hiểu bản chất bài học (không chỉ nhớ định nghĩa)?

## 1. Mục tiêu dự án

Sau final project, bạn chứng minh được:

- Thiết kế **kiến trúc** (monolith module hóa hoặc vài microservice có lý do).
- **AuthZ** phức tạp hơn CRUD (role, policy, resource-based nếu phù hợp).
- **Event-driven** với outbox hoặc tương đương; consumer **idempotent**.
- **Thanh toán** (sandbox) + webhook có chữ ký / idempotency key.
- **Omnichannel** tối thiểu: một abstraction gửi tin (email + SMS *hoặc* chat) qua provider cụ thể.
- **Observability**: log có correlation, trace xuyên service (nếu tách), metrics cơ bản.
- **Triển khai**: Docker Compose hoặc script README rõ ràng; CI chạy test/lint.

## 2. Phạm vi: CRM multi-tenant từ Lead tới Subscription

Dự án mẫu của giai đoạn này nhỏ và có chủ đích: ít màn hình, nhưng đi **sâu** vào mọi thứ bạn đã học. Cả dự án gói trong một câu:

> **Sales chốt được khách → hệ thống tự tạo gói thuê bao → khách trả tiền → sales được báo.**

### 2.1 Câu chuyện của dự án

Hãy tưởng tượng một công ty bán phần mềm. Nhân viên sales nhập một khách tiềm năng (**Lead**), liên hệ, đánh giá (**qualify**), rồi khi khách đồng ý thì **convert** thành khách hàng chính thức (**Customer**). Ngay lúc đó, hệ thống phải tự tạo một gói thuê bao (**Subscription**) bên bộ phận thu tiền. Khi khách trả tiền xong, nhà thanh toán gọi về hệ thống (**webhook**), và nhân viên sales nhận thông báo.

Nghe đơn giản, nhưng nó bắt bạn trả lời đủ các câu hỏi của một hệ thống thật: ai được xem dữ liệu của công ty nào, nếu mạng đứt giữa chừng thì có mất đơn không, nhà thanh toán gửi trùng thì có thu tiền hai lần không.

### 2.2 Ba miền nghiệp vụ

| Miền | Lo việc gì | Ví dụ cụ thể |
|------|------------|--------------|
| **Sales** | Quản lý khách tiềm năng và khách hàng | Tạo lead, qualify, convert thành customer |
| **Billing** | Thu tiền | Tạo subscription nháp, hóa đơn, nhận webhook thanh toán |
| **Notification** | Báo cho người dùng | Thông báo trong ứng dụng (SignalR), email |

Cả ba miền dùng chung một khái niệm: **tenant**. Mỗi công ty khách hàng của hệ thống là một tenant, và dữ liệu của tenant này tuyệt đối không được lọt sang tenant khác.

### 2.3 Công nghệ và nơi bạn đã học

| Việc cần làm | Công cụ | Đã học ở |
|--------------|---------|----------|
| Web API | ASP.NET Core, Swagger | [Module 8](../stage-03-aspnet-core-backend/module-08-aspnet-core-fundamentals/README.md), [Module 9](../stage-03-aspnet-core-backend/module-09-web-api-professional/README.md) |
| Đăng nhập, phân quyền | JWT, policy theo permission | [Module 10](../stage-03-aspnet-core-backend/module-10-authentication-authorization/README.md) |
| Thông báo realtime | SignalR | [Module 11](../stage-03-aspnet-core-backend/module-11-signalr/README.md) |
| Lưu dữ liệu | PostgreSQL, EF Core | [Module 12](../stage-04-database-production/module-12-sql-deep-dive/README.md), [Module 13](../stage-04-database-production/module-13-entity-framework-core/README.md) |
| Cache, việc chạy nền | Redis, Hangfire | [Module 14](../stage-04-database-production/module-14-caching-background-jobs/README.md) |
| Đóng gói, chạy thử | Docker Compose, GitHub Actions | [Module 15](../stage-04-database-production/module-15-docker-deployment/README.md) |
| Cấu trúc code | Clean Architecture | [Module 16](../stage-05-senior-engineering/module-16-clean-architecture/README.md) |
| Gửi sự kiện giữa các phần | Outbox, RabbitMQ | [Module 17](../stage-05-senior-engineering/module-17-distributed-systems/README.md) |
| Cổng vào, tách service | YARP | [Module 18](../stage-05-senior-engineering/module-18-microservices/README.md) |
| Đo hiệu năng | OpenTelemetry, BenchmarkDotNet | [Module 19](../stage-05-senior-engineering/module-19-performance-engineering/README.md) |

Dự án chọn **RabbitMQ** thay vì Kafka vì dễ dựng hơn và đủ cho bài toán này. Lý do chi tiết có ở [bài 17.4](../stage-05-senior-engineering/module-17-distributed-systems/17.4-kafka-vs-rabbitmq-pragmatic.md).

### 2.4 Cố tình không làm

- **Giao diện web.** Khóa học là backend-first: demo bằng Swagger và một file `.http` là đủ.
- **SMS thật.** Email dùng bản giả lập (stub), miễn là có template và retry như thật.
- **Kubernetes, nhiều region.** Docker Compose đủ để chứng minh bạn triển khai được.
- **Thêm miền mới** (ticketing, loyalty, contact center). Làm ba miền cho sâu thay vì mười miền cho nông.

### 2.5 Bức tranh cuối cùng

Sơ đồ dưới là hệ thống bạn có sau milestone M6. Trước M6, Billing chưa phải một service riêng: nó nằm chung trong CRM API (xem [mục 4](#_4-lo-trinh-10-milestone)).

![Sơ đồ kiến trúc của dự án mẫu: Client gọi API Gateway YARP; gateway chuyển request tới CRM API (gồm Sales và Notification) hoặc Billing service; CRM API gửi sự kiện qua RabbitMQ cho Billing; nhà thanh toán sandbox gọi webhook vào Billing; mỗi service có database PostgreSQL riêng](./img/crm-final-architecture.png#gh-light-mode-only)
![Sơ đồ kiến trúc của dự án mẫu: Client gọi API Gateway YARP; gateway chuyển request tới CRM API (gồm Sales và Notification) hoặc Billing service; CRM API gửi sự kiện qua RabbitMQ cho Billing; nhà thanh toán sandbox gọi webhook vào Billing; mỗi service có database PostgreSQL riêng](./img/crm-final-architecture-dark.png#gh-dark-mode-only)

<small>File gốc: [nền sáng](../../diagrams/stage-06-final-project/crm-final-architecture.html) · [nền tối](../../diagrams/stage-06-final-project/crm-final-architecture-dark.html)</small>

## 3. Tiêu chí “đạt” theo cấp

### 3.1 Tối thiểu (Pass)

- 2 bounded context có **model riêng** (không share entity cross DbContext “chung chạ”).
- 1 luồng **write phức tạp** có transaction rõ (ví dụ convert lead + tạo invoice draft).
- Test tự động: **unit** domain + **integration** API chính (≥ một controller quan trọng).
- Docker Compose: API + DB (+ broker nếu có event).

### 3.2 Khá (Strong)

- Outbox + worker; consumer có bảng `ProcessedMessages`.
- Gateway YARP hoặc tương đương nếu ≥ 2 public API surface.
- OpenTelemetry trace end-to-end cho luồng chính.

### 3.3 Xuất sắc (Exemplary)

- ADR (Architecture Decision Record) cho 3 quyết định quan trọng (monolith so với split, broker choice, multi-tenant model).
- Load test nhỏ có biểu đồ latency trước/sau một tối ưu có căn cứ (Module 19).
- Threat model ngắn: auth webhook, secret storage, tenant isolation.

## 4. Lộ trình 10 milestone

Đừng nhìn cả dự án một lúc, bạn sẽ ngợp. Hãy chia thành **10 milestone (M0 đến M9)**, mỗi milestone là một bước nhỏ, làm xong thì chạy được và có bằng chứng. Ba giai đoạn:

- **A. Nền chạy đúng (M0 đến M3):** dựng một monolith chạy đúng, đúng tenant, có cả Billing bên trong.
- **B. Tin cậy (M4 đến M5):** làm cho hệ thống không mất dữ liệu và không xử lý trùng.
- **C. Tách và chốt (M6 đến M9):** tách Billing ra, quan sát, đo hiệu năng, rồi viết tài liệu.

![Sơ đồ mười milestone của dự án mẫu: giai đoạn A gồm M0 khung dự án, M1 Sales core, M2 đăng nhập và tenant, M3 Billing trong monolith; giai đoạn B gồm M4 outbox với RabbitMQ và M5 thanh toán sandbox; giai đoạn C gồm M6 tách Billing thành service, M7 realtime, M8 quan sát và hiệu năng, M9 chốt tài liệu](./img/final-project-milestones.png#gh-light-mode-only)
![Sơ đồ mười milestone của dự án mẫu: giai đoạn A gồm M0 khung dự án, M1 Sales core, M2 đăng nhập và tenant, M3 Billing trong monolith; giai đoạn B gồm M4 outbox với RabbitMQ và M5 thanh toán sandbox; giai đoạn C gồm M6 tách Billing thành service, M7 realtime, M8 quan sát và hiệu năng, M9 chốt tài liệu](./img/final-project-milestones-dark.png#gh-dark-mode-only)

<small>File gốc: [nền sáng](../../diagrams/stage-06-final-project/final-project-milestones.html) · [nền tối](../../diagrams/stage-06-final-project/final-project-milestones-dark.html)</small>

### 4.1 Làm tới đâu thì được mức nào

Bảng này khớp với ba mức ở [mục 3](#_3-tieu-chi-đat-theo-cap):

| Mức | Cần làm tới | Nghĩa là |
|-----|-------------|----------|
| **Pass** | M0 đến M5 | Monolith chạy được, đúng tenant, có outbox và webhook không bị xử lý trùng |
| **Strong** | thêm M6 và M8 | Đã tách được service và có số đo hiệu năng |
| **Exemplary** | thêm M7 và M9 | Trọn bộ, kèm tài liệu đánh đổi |

**Nếu thiếu thời gian, bỏ M7 trước.** Đừng bỏ M4, M5 và phần ADR ở M9: đó là những thứ người phỏng vấn hỏi nhiều nhất.

Mỗi milestone dưới đây có cùng bốn phần: **nói một câu** (để nhớ ý chính), **việc cần làm**, **xong khi** (cách tự kiểm tra) và **hay vấp** (lỗi người mới thường gặp).

### 4.2 M0 — Khung dự án và CI

**Nói một câu:** dựng cái khung trước, để mọi thứ sau này có chỗ đặt và ai cũng chạy được bằng một lệnh.

**Việc cần làm:**

- Tạo solution theo Clean Architecture: `Domain`, `Application`, `Infrastructure`, `Api`.
- Viết `docker-compose.yml` chạy API và PostgreSQL.
- Thêm GitHub Actions: build và chạy test mỗi lần push.

**Xong khi:**

- [ ] Người khác clone repo, chạy `docker compose up` là thấy Swagger.
- [ ] CI có huy hiệu xanh trong README.

**Hay vấp:** để cấu hình và mật khẩu cứng trong code. Dùng User Secrets và file `.env.example` ngay từ đầu.

Ôn: [Module 15](../stage-04-database-production/module-15-docker-deployment/README.md), [Module 16](../stage-05-senior-engineering/module-16-clean-architecture/README.md).

### 4.3 M1 — Sales core

**Nói một câu:** luật nghiệp vụ phải nằm trong domain, không nằm rải rác trong controller.

**Việc cần làm:**

- Tạo `Lead` với trạng thái: `New` → `Qualified` → `Converted`.
- Rule nằm trong chính entity, ví dụ: chỉ lead đã `Qualified` mới được `Convert`.
- API tạo, xem, sửa, xóa lead; danh sách có phân trang và lọc; lỗi trả `ProblemDetails`.

**Xong khi:**

- [ ] Có unit test cho rule chuyển trạng thái (convert lead chưa qualify thì bị từ chối).
- [ ] Gọi API sai dữ liệu nhận được lỗi `ProblemDetails` rõ ràng, không phải lỗi 500.

**Hay vấp:** viết rule trong controller rồi không test được. Đưa rule vào entity, test không cần database.

Ôn: [Module 9](../stage-03-aspnet-core-backend/module-09-web-api-professional/README.md), [Module 13](../stage-04-database-production/module-13-entity-framework-core/README.md).

### 4.4 M2 — Đăng nhập và multi-tenant

**Nói một câu:** mỗi công ty chỉ được thấy dữ liệu của chính mình, và bạn phải **chứng minh** điều đó bằng test.

**Việc cần làm:**

- Đăng nhập bằng JWT; token mang theo `tenantId` và các permission.
- Phân quyền theo permission (ví dụ `leads.convert`), không chỉ theo vai trò.
- Mọi bảng có cột `TenantId`, và EF Core tự lọc theo tenant hiện tại.

Ý tưởng cốt lõi là một bộ lọc áp dụng cho mọi truy vấn, nên bạn không phải nhớ thêm `Where` ở từng chỗ:

```csharp
// Trong OnModelCreating của DbContext
modelBuilder.Entity<Lead>().HasQueryFilter(l => l.TenantId == _tenant.Id);
```

**Xong khi:**

- [ ] Có **test cô lập tenant**: đăng nhập tenant A, cố đọc lead của tenant B, kết quả phải là không thấy.
- [ ] Gọi endpoint thiếu permission trả `403`, chưa đăng nhập trả `401`.

**Hay vấp:** quên bộ lọc ở truy vấn viết tay (SQL thô). Rò dữ liệu giữa các tenant là lỗi bảo mật nghiêm trọng nhất của hệ multi-tenant.

Ôn: [Module 10](../stage-03-aspnet-core-backend/module-10-authentication-authorization/README.md).

### 4.5 M3 — Billing trong monolith

**Nói một câu:** trước khi tách service, hãy làm cho nó chạy được trong **một** process, vì tách sớm là cách nhanh nhất để lạc đường.

**Việc cần làm:**

- Thêm module `Billing` với `Subscription` và `Invoice`.
- Khi lead được convert, Sales phát một **domain event** `LeadConverted`; Billing nghe và tạo subscription nháp.
- Hai module không dùng chung entity: chỉ giao tiếp qua event.

**Xong khi:**

- [ ] Convert một lead thì tự sinh một subscription nháp, trong cùng một giao dịch database.
- [ ] Billing không tham chiếu trực tiếp tới `Lead`, chỉ tới `LeadConverted`.

**Hay vấp:** để Billing đọc thẳng bảng của Sales cho nhanh. Làm vậy thì M6 sẽ không tách được.

Ôn: [Module 16](../stage-05-senior-engineering/module-16-clean-architecture/README.md).

### 4.6 M4 — Outbox và RabbitMQ

**Nói một câu:** outbox là chiếc **hộp thư đi**: ghi thư vào hộp cùng lúc với lưu dữ liệu, rồi có người chuyên đi gửi, nên có mất mạng cũng không mất thư.

**Việc cần làm:**

- Khi lưu dữ liệu, ghi luôn sự kiện vào bảng `OutboxMessages` **trong cùng một giao dịch**.
- Một worker nền đọc bảng đó và đẩy sang RabbitMQ.
- Bên nhận có bảng `ProcessedMessages`: đã xử lý rồi thì bỏ qua (idempotent, nghĩa là gửi trùng bao nhiêu lần cũng chỉ xử lý một lần).
- Có retry và hàng đợi dead-letter cho tin lỗi.

**Xong khi:**

- [ ] Tắt RabbitMQ, convert một lead: dữ liệu vẫn lưu, bật lại RabbitMQ thì sự kiện vẫn được gửi đi.
- [ ] Gửi cùng một sự kiện hai lần, subscription chỉ được tạo một lần.

**Hay vấp:** vừa lưu database vừa publish trực tiếp lên broker. Nếu một trong hai lỗi, hai bên lệch nhau, đó chính là lý do outbox tồn tại.

Ôn: [Module 17](../stage-05-senior-engineering/module-17-distributed-systems/README.md).

### 4.7 M5 — Thanh toán sandbox và webhook

**Nói một câu:** nhà thanh toán sẽ gọi bạn, có khi gọi trùng, có khi bị kẻ lạ giả mạo, nên phải kiểm tra chữ ký và không xử lý hai lần.

**Việc cần làm:**

- Endpoint webhook nhận kết quả thanh toán từ môi trường sandbox (Stripe hoặc tương đương).
- **Xác thực chữ ký** của nhà cung cấp trước khi làm bất cứ điều gì.
- Lưu `eventId`; sự kiện đã thấy rồi thì bỏ qua.
- Một job đối soát (Hangfire) chạy định kỳ so khớp hóa đơn chưa rõ trạng thái.

```csharp
// Mỗi sự kiện chỉ được xử lý một lần
if (await _db.ProcessedEvents.AnyAsync(e => e.EventId == evt.Id, ct))
    return Results.Ok();
```

**Xong khi:**

- [ ] Webhook sai chữ ký bị từ chối (`400` hoặc `401`).
- [ ] Gửi cùng một sự kiện hai lần, hóa đơn chỉ chuyển sang "đã trả" một lần.
- [ ] Log không chứa số thẻ hay token nhạy cảm.

**Hay vấp:** trả lỗi `500` khi gặp sự kiện trùng, khiến nhà thanh toán cứ gửi lại mãi. Sự kiện trùng phải trả `200`.

Chi tiết xem [mục 5](#_5-payment-webhook-on-module-17).

### 4.8 M6 — Tách Billing thành service

**Nói một câu:** đây là lúc bạn trả giá cho việc tách, nên phải biết rõ vì sao mình tách.

**Việc cần làm:**

- Billing thành một service riêng, có **database riêng**.
- Thêm API Gateway (YARP): `/sales/*` về CRM API, `/billing/*` về Billing service.
- Hai bên giao tiếp bằng sự kiện qua RabbitMQ (đã làm ở M4), không join chéo database.
- Viết test hợp đồng cho sự kiện `LeadConverted` để hai bên không vô tình làm hỏng nhau.

**Xong khi:**

- [ ] `docker compose up` chạy cả hai service cùng gateway.
- [ ] Tắt Billing, CRM API vẫn tạo được lead; bật lại thì Billing bắt kịp các sự kiện đã bỏ lỡ.

**Hay vấp:** tách nhưng vẫn cho Billing gọi ngược vào database của Sales. Như vậy chỉ là monolith phân tán, tệ hơn cả hai.

Ôn: [Module 18](../stage-05-senior-engineering/module-18-microservices/README.md).

### 4.9 M7 — Realtime và thông báo

**Nói một câu:** khi có chuyện quan trọng, người dùng phải biết ngay mà không cần tải lại trang.

**Việc cần làm:**

- Khi thanh toán thành công, đẩy thông báo cho đúng nhân viên sales qua SignalR.
- Định nghĩa `INotificationChannel` với `SendAsync(NotificationRequest)`; làm `EmailChannel` (stub) có template và retry.
- Gửi thông báo đúng người, đúng tenant.

**Xong khi:**

- [ ] Mở hai trình duyệt khác tenant, chỉ trình duyệt đúng tenant nhận được thông báo.
- [ ] Email stub lỗi thì thử lại vài lần rồi mới bỏ.

**Hay vấp:** phát thông báo cho mọi kết nối. Luôn dùng nhóm theo tenant hoặc theo người dùng.

Đây là milestone **đầu tiên nên cắt** nếu thiếu thời gian. Ôn: [Module 11](../stage-03-aspnet-core-backend/module-11-signalr/README.md).

### 4.10 M8 — Quan sát và hiệu năng

**Nói một câu:** không đo thì không biết nhanh hay chậm, và không có trace thì không biết lỗi nằm ở service nào.

**Việc cần làm:**

- Log có correlation id; trace xuyên suốt từ CRM API sang Billing bằng OpenTelemetry.
- Health check `ready` và `live`.
- Chọn **một** chỗ chậm, đo **trước**, sửa, rồi đo **sau**. Ví dụ: truy vấn N+1, thiếu index, hoặc danh sách đọc nhiều chưa cache.

**Xong khi:**

- [ ] Một request convert lead hiện thành một trace xuyên hai service.
- [ ] Có bảng so sánh trước/sau kèm con số cụ thể (thời gian, số truy vấn).

**Hay vấp:** tối ưu theo cảm giác rồi báo "nhanh hơn". Người phỏng vấn sẽ hỏi con số.

Ôn: [Module 19](../stage-05-senior-engineering/module-19-performance-engineering/README.md).

### 4.11 M9 — Tài liệu và chốt

**Nói một câu:** code chứng minh bạn **làm được**, tài liệu chứng minh bạn **hiểu vì sao**.

**Việc cần làm:**

- Viết **ít nhất 5 ADR** (Architecture Decision Record), mỗi cái ghi bối cảnh, quyết định, hậu quả. Gợi ý chủ đề: monolith so với tách service, RabbitMQ so với Kafka, mô hình multi-tenant (shared DB với `TenantId` so với DB riêng cho mỗi tenant), outbox so với publish thẳng, tách Billing trước thay vì Notification.
- Vẽ sơ đồ C4 mức container.
- README có phần **Decision log**, cách chạy, tài khoản thử, kịch bản demo (file `.http`).
- Rà lại: không còn secret trong repo.

**Xong khi:**

- [ ] Người lạ đọc README và chạy được dự án trong 10 phút.
- [ ] Đối chiếu đủ [checklist nộp bài ở mục 8](#_8-tieu-chi-nop-bai-checklist).

**Hay vấp:** để tài liệu đến phút cuối. Hãy viết mỗi ADR ngay khi vừa đưa ra quyết định, lúc đó bạn còn nhớ lý do.

## 5. Payment & webhook (ôn Module 17)

- Lưu `eventId` từ provider; xử lý trùng delivery.
- Xác thực chữ ký (Stripe `Stripe-Signature`, v.v.).
- Không log full PAN/token nhạy cảm.

## 6. Omnichannel tối thiểu

Định nghĩa interface `INotificationChannel` với `SendAsync(NotificationRequest)` — triển khai `EmailChannel`, `SmsChannel` (stub được nếu không có budget SMS thật, nhưng phải có **đường đi production-like**: template, retry, dead letter nội bộ).

## 7. Liên hệ CRM — triết lý portfolio

Người phỏng vấn senior thường hỏi **“vì sao”** nhiều hơn **“làm được không”**:

- Vì sao chọn Kafka/RabbitMQ/Service Bus?
- Vì sao tách service này mà không tách service kia?
- Tenant isolation: shared DB + `TenantId` hay DB per tenant — trade-off?

Hãy viết **README “Decision log”** 1–2 trang trả lời trước.

## 8. Tiêu chí nộp bài (checklist)

- [ ] Repo công khai hoặc zip có history; LICENSE rõ.
- [ ] `README.md`: cách chạy, biến môi trường, port, account test.
- [ ] `docs/architecture.md` hoặc tương đương: diagram + boundary.
- [ ] CI badge (GitHub Actions) — build + test.
- [ ] Không commit secret; dùng User Secrets / `.env.example`.

## 9. Ý tưởng mở rộng (optional)

- Multi-region read (chỉ tài liệu hóa nếu chưa làm thật).
- Fine-grained authorization với policy handler.
- Feature module **Reporting** đọc read replica.

---

## Mở rộng và đào sâu

### Mục đích của phần này

Phần này giúp bạn nắm **bản chất** của chủ đề: học để giải quyết vấn đề gì, đặt ở đâu trong kiến trúc backend, và vì sao cách làm này quan trọng trong dự án thật.

### Khung hiểu nhanh

- **Bài toán**: vấn đề thực tế cần giải quyết.
- **Cách tiếp cận**: kỹ thuật/chuẩn áp dụng trong bài.
- **Kết quả mong đợi**: đầu ra đúng, dễ bảo trì, dễ mở rộng.

## Mini case study

### Tình huống

Chọn một use case nhỏ trong CRM/ERP liên quan trực tiếp đến bài học này, mô tả rõ đầu vào, đầu ra và tiêu chí thành công.

### Đáp án gợi ý

- Tách bài toán thành các bước xử lý rõ ràng.
- Chọn điểm đặt logic đúng tầng (API, service, data, job...).
- Bổ sung ít nhất một trường hợp biên để kiểm tra tính ổn định.

## Ví dụ thực tế nhanh

- Một ví dụ áp dụng trực tiếp vào luồng CRM/ERP hiện tại.
- Một lỗi phổ biến dễ gặp khi triển khai thật.
- Một cách kiểm tra nhanh để tự xác nhận bạn đã hiểu đúng.

## Checklist trước khi sang bài tiếp theo

- Bạn đã nắm được các khái niệm chính và giải thích lại được bằng ví dụ của riêng mình.
- Bạn đã chạy hoặc mô phỏng ít nhất một ví dụ trong bài.
- Bạn đã hoàn thành phần quiz/lab cơ bản (hoặc ít nhất tự làm lại theo trí nhớ).
- Bạn đã ghi lại 3 ý chính: học được gì, còn vướng gì, sẽ áp dụng ở đâu trong CRM.

## Kiểm tra & Thực hành — Final (100 điểm)

### Bối cảnh giáo trình (mục tiêu xuyên suốt)

> **Trục CRM — một mục tiêu rõ:** bạn hướng tới **CRM production** trong [From Zero → Senior .NET (Backend-first)](../roadmap-dotnet-backend-zero-to-senior.md). Giáo trình **ưu tiên backend**, bám chuỗi **API → dữ liệu → vận hành → kiến trúc phân tán**, thay vì trải rộng theo hướng full-stack. Mỗi module củng cố **một lớp kỹ năng** trên **cùng một CRM học tập** bạn phát triển xuyên suốt khóa.

| Chuỗi năng lực | Đóng góp vào CRM học tập |
|----------------|--------------------------|
| **Giai đoạn 1 — Foundation** | Đọc hiểu yêu cầu, mô hình client–server, Git — nền **collaboration** khi CRM lớn dần. |
| **Giai đoạn 2 — C# + P1** | Domain, OOP, LINQ, async, DI — **rule nghiệp vụ & tầng ứng dụng** (Inventory là bản mẫu trước CRM). |
| **Giai đoạn 3 — ASP.NET + P2** | Host, routing, validation, JWT, SignalR — **CRM Backend API** thực tế. |
| **Giai đoạn 4 — Data + P3** | SQL, EF, cache, job, container — CRM **ổn định & có thể triển khai**. |
| **Giai đoạn 5 — Senior** | Clean Architecture, event/outbox, gateway, observability, perf — nền để CRM/ERP **chịu tải**. |
| **Giai đoạn 6 — Final Project** | Gom lại toàn bộ: CRM/ERP **chịu tải & có chủ**, có tài liệu trade-off. |

#### Vai trò *giai đoạn này* trong chuỗi

Senior engineering + **Final**: kiến trúc, event/outbox, microservice, đo hiệu năng — **sở hữu hệ thống** CRM/ERP phân tán.

#### Vị trí bài học (trước / sau)

| Mốc | Điểm nối trong giáo trình |
|-----|---------------------------|
| **Trước** | [Module 19 — Performance Engineering](../stage-05-senior-engineering/module-19-performance-engineering/README.md) |
| **Tiếp theo** | — (hoàn tất chuỗi chính; ôn [lộ trình](../roadmap-dotnet-backend-zero-to-senior.md)) |

### Quy trình làm bài (hệ thống)

| Bước | Việc cần làm | Output nên có |
|------|----------------|-----------------|
| 1 | Làm **Quiz** *trước*, tự ghi đáp án + 1 dòng lý do | Không xem đáp án; giữ bản nháp |
| 2 | Đối chiếu **Đáp án**; sửa hiểu sai, ghi *takeaway* vào README hoặc nhật ký học | 3–5 bullet “tôi đã hiểu…” |
| 3 | Làm **Lab** theo rubric; trong README nêu **phần CRM** nào được chạm (Lead, Customer, Deal, Billing…) | Repo / zip + ảnh `dotnet run` hoặc log |
| 4 | **Tự chấm** theo bảng điểm; chuẩn bị 1 phút “vấn đáp” nếu mentor hỏi ngẫu nhiên | Điểm + chỗ còn yếu |

---

### Phần A — Quiz trắc nghiệm (20 điểm)

> **Gợi ý làm bài:** mỗi câu **4 điểm**. Ưu tiên suy nghĩ *hệ quả trên CRM* (tiền, dữ liệu, đa tenant, hiệu năng, bảo mật) — không chỉ nhớ định nghĩa.

Mỗi câu **4 điểm**.

**Câu 1.** Vì sao portfolio enterprise nên ưu tiên **vài luồng end-to-end sâu** thay vì nhiều màn hình nông?

- A. Ít code hơn
- B. Chứng minh được ownership, trade-off, vận hành — sát phỏng vấn senior
- C. GitHub thích commit ít
- D. Docker cấm nhiều feature

<details>
<summary>Xem đáp án</summary>

**Đáp án:** B.

</details>

**Câu 2.** Webhook thanh toán bắt buộc cần gì?

- A. HTTP GET không auth
- B. Xác thực chữ ký provider + xử lý idempotent theo id sự kiện
- C. Lưu PAN đầy đủ
- D. Gửi secret qua query string

<details>
<summary>Xem đáp án</summary>

**Đáp án:** B.

</details>

**Câu 3.** Multi-tenant row-level: test isolation quan trọng nhất vì?

- A. Performance UI
- B. Rò dữ liệu tenant là lỗi bảo mật nghiêm trọng
- C. Swagger
- D. GC

<details>
<summary>Xem đáp án</summary>

**Đáp án:** B.

</details>

**Câu 4.** “Strangler fig” trong tách monolith nghĩa là?

- A. Xóa code cũ một đêm
- B. Thay thế dần bằng façade/gateway và bounded context
- C. Chỉ đổi font UI
- D. Dùng một DB chung mãi

<details>
<summary>Xem đáp án</summary>

**Đáp án:** B.

</details>

**Câu 5.** ADR (Architecture Decision Record) ghi những gì tối thiểu?

- A. Meme team
- B. Bối cảnh, quyết định, hậu quả, trạng thái (chấp nhận / thay thế)
- C. Chỉ link TikTok
- D. Chỉ screenshot

<details>
<summary>Xem đáp án</summary>

**Đáp án:** B.

</details>

### Phần B — Lab & rubric Final Project (80 điểm)

> **Lab portfolio:** rubric là *bằng chứng* bạn **sở hữu** CRM/ERP — ưu tiên vài luồng end-to-end sâu, ADR, CI; không secret trong repo.

| Tiêu chí | Điểm tối đa | Ghi chú |
|----------|-------------|---------|
| Kiến trúc & boundary (diagram + ít nhất 2 bounded context rõ) | 20 | Trừ 5 nếu không có `docs/architecture.md` tương đương |
| Luồng end-to-end 1 (Sales/CRM): tạo → chuyển trạng thái → side effect (event/job) | 20 | |
| Luồng end-to-end 2 (Billing hoặc Support): payment sandbox hoặc ticket + idempotency | 20 | |
| CI (build + test) + không secret trong repo | 10 | |
| Triển khai local reproducible (Compose/README) + health | 10 | |

#### Ngưỡng tổng điểm (Quiz 20 + Lab 80)

| Mức | Điểm | Ý nghĩa |
|-----|------|---------|
| **Đạt** | ≥ 70 | Đủ nền để học module kế mà không “lủng” kiến thức cốt lõi. |
| **Khá** | ≥ 85 | Có minh chứng code + nêu được liên hệ CRM rõ ràng trong README. |
| **Giỏi** | ≥ 95 | Có mở rộng / edge case / ADR ngắn / test bổ trợ (tùy rubric từng bài). |

### Phần C — Reflect & nối chuỗi (không chấm điểm)

Viết **5–8 câu** (README hoặc `docs/learning-log.md`):

1. Kiến thức *module / project này* sẽ được **tái sử dụng trực tiếp** ở module hoặc project CRM nào tiếp theo? (ghi tên module / P2 / P3 / Final).
2. Nếu bỏ qua phần lab, **rủi ro** lớn nhất cho CRM ở giai đoạn sau là gì?
3. Một **quyết định kỹ thuật** (nhỏ) bạn sẵn sàng ghi thành **ADR một đoạn** sau khi làm lab.

---

## Tài liệu tham khảo

- Trở lại [Lộ trình tổng thể](../roadmap-dotnet-backend-zero-to-senior.md) để đối chiếu từng module đã học.
- *Designing Data-Intensive Applications* — cho phần event log và consistency.
- *Building Microservices* — Sam Newman.

---

**Chúc mừng** khi bạn hoàn thành final project — đó là điểm kết thúc có ý nghĩa của giáo trình **From Zero → Senior .NET (Backend-first)**.
