# Module 4 - C# Core

> **Tóm tắt:** OOP trong C#: class, interface, kế thừa, đa hình, encapsulation, record, pattern matching — thiết kế domain model cho hệ thống CRM.

## Nội dung module

- [4.1 - Class và Object](4.1-class-and-object.md)
- [4.2 - Encapsulation](4.2-encapsulation.md)
- [4.3 - Inheritance và Polymorphism](4.3-inheritance-and-polymorphism.md)
- [4.4 - Interface](4.4-interface.md)
- [4.5 - Abstraction](4.5-abstraction.md)
- [4.6 - Access Modifiers](4.6-access-modifiers.md)
- [4.7 - Records và Value Objects (C# 9+)](4.7-records-and-value-objects.md)
- [4.8 - Pattern Matching (C# 8+)](4.8-pattern-matching.md)
- [4.9 - Những lỗi thường gặp](4.9-common-mistakes.md)
- [4.10 - C# hiện đại cho class: required, primary constructor, IDisposable](4.10-advanced-notes.md)
- [4.11 - Case study: mô hình hoá sản phẩm bằng composition](4.11-mini-case-study.md)
- [4.12 - Bug so sánh đối tượng: Equals, GetHashCode và record](4.12-quick-real-world-example.md)
- [4.13 - Ôn tập và đánh giá Module 4](4.13-review-and-assessment.md)

## Quy ước trong module

- **Định danh trong code bằng tiếng Anh** (`Customer`, `CalculateShippingFee`, `OwnerId`), comment và chuỗi hiển thị bằng tiếng Việt.
- **Mô hình CRM dùng chung.** `Customer` được tạo bằng `new Customer(name, email)` và tự kiểm tra dữ liệu trong constructor ([bài 4.1](4.1-class-and-object.md)); từ [bài 4.7](4.7-records-and-value-objects.md) email được nâng cấp thành value object `Email`. Trạng thái đơn hàng dùng `enum OrderStatus { Draft, Confirmed, Shipped, Delivered, Cancelled }`, trạng thái lead dùng `enum LeadStatus`. Lead chốt thành khách hàng bằng cách **tạo** một `Customer` mới, không phải đổi kiểu ([bài 4.13](4.13-review-and-assessment.md)).
- **Code chạy được trong project console hoặc xUnit.** Ví dụ có dùng ASP.NET Core, dependency injection hay EF Core được đánh dấu "Xem trước" kèm link tới module dạy kỹ; chỉ cần đọc hiểu.
