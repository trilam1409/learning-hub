# Dữ liệu và mục tiêu bảo vệ

Buổi 1 · Chủ đề dữ liệu, CIA và tính không thể từ chối

## Mục tiêu học

- Nhận ra dữ liệu đang lưu hay đang truyền và phân biệt bốn yêu cầu bảo vệ.
- Chọn yêu cầu bị ảnh hưởng trước tiên từ dấu hiệu của một sự cố.

## Kiến thức qua tình huống

Hệ thống nộp bài có tệp đang đi từ máy sinh viên lên máy chủ (data in transit) và bản lưu trong bộ nhớ lưu trữ (data at rest). Cùng một tệp, nhưng khi truyền cần bảo vệ đường truyền, còn khi lưu cần quản lý ai đọc hoặc sửa được bản đã lưu. Tài liệu đặt việc bảo vệ dữ liệu bên cạnh an ninh mạng, an ninh ứng dụng, ứng phó sự cố, đám mây và quản trị. Các nhóm này trả lời những câu hỏi khác nhau về cùng một hệ thống.

| Yêu cầu | Câu hỏi tự đặt | Dấu hiệu dễ nhận |
| --- | --- | --- |
| Bí mật (confidentiality) | Ai được xem? | Người ngoài đọc được bài nộp |
| Toàn vẹn (integrity) | Dữ liệu có bị sửa trái phép? | Điểm bị đổi sai |
| Sẵn sàng (availability) | Người được quyền có dùng được lúc cần? | Cổng nộp bài không truy cập được |
| Không thể từ chối (non-repudiation) | Có chứng cứ quy hành động về đúng chủ thể? | Người gửi phủ nhận thao tác và hệ thống thiếu chứng cứ đáng tin |

## Công thức và cách áp dụng

Trang 7 và 12 trình bày tiêu chí phân loại. Dùng câu hỏi trong bảng để tìm tài sản, sự việc và yêu cầu bị ảnh hưởng trực tiếp.

## Ví dụ có lời giải

**Ví dụ tự soạn.** Đầu vào gồm tệp bài nộp, một bản lưu trên máy chủ và sự cố cổng nộp bị gián đoạn 15 phút. Xác định thao tác bị ảnh hưởng là truy cập lúc gần hạn. Kết quả là sự cố sẵn sàng. Nếu bản lưu bị đổi nội dung trong khoảng đó, ghi thêm một sự cố toàn vẹn.

## Tóm tắt

CIA gồm bí mật, toàn vẹn và sẵn sàng. Slide liệt kê thêm tính không thể từ chối trong bốn yêu cầu của dữ liệu.

## Điểm dễ nhầm

Một lần sửa trái phép có thể vừa làm mất toàn vẹn vừa khiến dịch vụ gián đoạn. Khi câu hỏi yêu cầu chọn một đáp án, dựa vào hậu quả được mô tả trực tiếp nhất.

## Trắc nghiệm

### Câu 1

Người ngoài xem bài nộp. Thuộc tính nào bị vi phạm trực tiếp?

- A. Bí mật
- B. Toàn vẹn
- C. Sẵn sàng
- D. Không thể từ chối

**Đáp án A.** Người ngoài đọc được dữ liệu. **Nhiễu dễ nhầm B.** Chưa có dấu hiệu ai đó sửa dữ liệu.

### Câu 2

Tệp đang tải lên máy chủ thuộc trạng thái nào?

- A. Đang lưu
- B. Đã nén
- C. Đang truyền
- D. Đã ký

**Đáp án C.** Dữ liệu đang di chuyển giữa hai đầu. **Nhiễu dễ nhầm A.** Bản ghi giữ trên thiết bị là dữ liệu đang lưu.

### Câu 3

Cổng nộp bài bị gián đoạn ảnh hưởng trực tiếp điều gì?

- A. Tính không thể từ chối
- B. Tính duy nhất
- C. Bí mật
- D. Sẵn sàng

**Đáp án D.** Người dùng hợp lệ không thể truy cập đúng lúc. **Nhiễu dễ nhầm C.** Sự cố chưa cho biết người ngoài đọc được nội dung.

## Nguồn

[P01](../SOURCES.md) tr. 1–10, 12. Các hình tr. 11, 13–19 đang chờ xác minh. T01 00:21:35.856–00:22:46.964, hai trạng thái và bốn yêu cầu.
