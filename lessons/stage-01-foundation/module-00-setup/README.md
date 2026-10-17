# Module 0 - Chuẩn bị môi trường

> **Tóm tắt:** Module khởi động dành cho người chưa từng viết C#: cài .NET 10 SDK và trình soạn code, chạy chương trình đầu tiên, dùng debugger, dựng solution có unit test và tạo một Web API nhỏ cho hệ CRM. Làm xong module này, máy bạn có đủ công cụ cho toàn bộ khóa học và bạn biết cách tự tìm ra lỗi trong code của mình.

## Dành cho ai

- **Chưa từng viết C# hoặc chưa cài .NET:** học hết 5 bài theo thứ tự.
- **Đã viết C# nhưng chưa quen dòng lệnh `dotnet`, debugger hay unit test:** đọc nhanh 0.1 và 0.2, làm kỹ 0.3 và 0.4.
- **Đã quen cả ba:** làm thử bài tập của 0.4 và 0.5. Làm được mà không cần xem lời giải thì chuyển sang Module 1.

Thời gian dự kiến: 1 buổi sinh hoạt CLB (khoảng 3 giờ) cho 0.1 tới 0.3, và 1 buổi cho 0.4, 0.5.

## Nội dung module

- [0.1 - Cài .NET SDK và trình soạn code](0.1-install-dotnet-sdk-and-ide.md)
- [0.2 - Chương trình C# đầu tiên](0.2-first-csharp-program.md)
- [0.3 - Debug và đọc thông báo lỗi](0.3-debugging-basics.md)
- [0.4 - Solution, thư viện và unit test](0.4-solution-and-unit-test.md)
- [0.5 - Web API đầu tiên](0.5-first-web-api.md)

## Sổ tay lệnh `dotnet`

Các lệnh dùng thường xuyên nhất trong khóa học:

| Việc cần làm | Lệnh |
|---|---|
| Kiểm tra phiên bản SDK | `dotnet --version` |
| Chạy nhanh một file C# | `dotnet run app.cs` |
| Tạo project console | `dotnet new console -n TenProject` |
| Tạo Web API | `dotnet new webapi -n TenProject` |
| Tạo thư viện | `dotnet new classlib -n TenProject` |
| Tạo project test xUnit | `dotnet new xunit -n TenProject.Tests` |
| Tạo solution | `dotnet new sln -n TenSolution` |
| Thêm project vào solution | `dotnet sln add duong/dan/project` |
| Project A tham chiếu project B | `dotnet reference add B.csproj --project A` |
| Thêm gói NuGet | `dotnet package add TenGoi` |
| Biên dịch | `dotnet build` |
| Chạy | `dotnet run` |
| Chạy và tự chạy lại khi sửa code | `dotnet watch` |
| Chạy test | `dotnet test` |
| Tạo file `.gitignore` cho .NET | `dotnet new gitignore` |

## Sau module này

Bạn sẽ dùng lại mọi kỹ năng ở đây trong suốt khóa học:

- Mỗi bài từ Module 1 trở đi có code chạy được: tạo project console như bài 0.2 để thử.
- Bài tập có yêu cầu viết test thì dựng solution như bài 0.4.
- Từ Module 8, mọi thứ xoay quanh Web API như bài 0.5, nhưng được giải thích đầy đủ.
