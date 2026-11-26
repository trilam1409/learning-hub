# Chữ ký số, chứng chỉ và lưu đồ bảo mật

Buổi 4 · Ký, xác minh và sáu cách dùng digest

## Mục tiêu học

Chọn đúng khóa cho từng thao tác, đọc thuật toán ký chứng chỉ và vẽ luồng hai phía.

## Kiến thức qua tình huống

Alice ký với khóa riêng của mình. Bob dùng khóa công khai đã xác minh của Alice để kiểm chữ ký. Nếu cần bí mật cho Bob, phía gửi chọn khóa công khai của Bob hoặc cơ chế đối xứng đã thiết lập. Chứng chỉ hỗ trợ gắn khóa công khai với danh tính theo chuỗi tin cậy. Nội dung ký và tham số xác minh phải trùng.

| Ý tưởng trong slide tr. 42–43 | Dữ liệu gửi ở mức khái niệm |
| --- | --- |
| a | Mã hóa cả M và H(M) bằng khóa chung |
| b | Gửi M và digest được bảo vệ bằng khóa chung |
| c | Gửi M và chữ ký dựa trên digest |
| d | Mã hóa gói của (c) bằng khóa chung |
| e | Gửi M và giá trị băm phối hợp bí mật chung |
| f | Mã hóa gói của (e) |

Đây là sơ đồ trong bài. Phần diễn đạt ‘mã hóa digest bằng khóa riêng’ là cách mô tả RSA giản lược. Dùng thao tác Sign/Verify cho chữ ký và thuật toán chuẩn riêng cho MAC hoặc mã hóa xác thực khi triển khai.

## Công thức và cách áp dụng

S = Sign(sk_A, M), kiểm tra bằng Verify(pk_A, M, S). Với mô hình kết hợp, ký M rồi mã hóa gói (M, S) cho Bob. Bob giải mã và xác minh chữ ký với khóa của Alice. sk là khóa riêng, pk là khóa công khai.

## Bài tập chính thức

Tìm ba chứng chỉ trên website có yêu cầu bảo mật cao; đọc thuật toán chữ ký và nêu thành phần hàm băm, nếu thuật toán thể hiện. T04 gợi ý website ngân hàng hoặc trang phù hợp. Từ sáu sơ đồ, vẽ mô hình có bí mật, chứng thực và chữ ký; mô tả thao tác của bên gửi và bên nhận, nêu ưu và nhược điểm. Ví dụ bên dưới tách đúng khóa hai phía, đổi lại cần kiểm chứng khóa công khai và quản lý khóa riêng. Trình bày bằng công cụ vẽ hoặc vẽ tay, theo lời giảng.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** Alice ký LICH=THU2, mã hóa gói cho Bob. Bob giải mã, kiểm chứng khóa Alice và xác minh. Chuỗi gốc dự kiến hợp lệ. Nếu sửa thành LICH=THU3 và giữ chữ ký cũ thì phép kiểm dự kiến thất bại.

## Tóm tắt

Khóa xác minh thuộc người ký. Khóa công khai dùng cho bí mật thuộc người nhận. Ký và mã hóa có mục tiêu khác nhau.

## Điểm dễ nhầm

Trường thuật toán chữ ký của chứng chỉ khác với digest dấu vân tay (fingerprint) mà giao diện hiển thị.

## Trắc nghiệm

### Câu 1

Bob xác minh chữ ký Alice bằng gì?

- A. Khóa công khai của Bob
- B. Khóa công khai của Alice
- C. Khóa riêng của Bob
- D. Khóa riêng của Alice

**Đáp án B.** Khóa xác minh thuộc về cặp của người ký. **Nhiễu dễ nhầm A.** Khóa công khai Bob phục vụ mã hóa cho Bob.

### Câu 2

Đọc trường nào để biết phép ký chứng chỉ?

- A. Thuật toán chữ ký
- B. Kích thước trang
- C. Tên tab
- D. Dấu vân tay

**Đáp án A.** Thuật toán chữ ký cho biết phép ký. **Nhiễu dễ nhầm D.** Fingerprint là digest của chứng chỉ.

### Câu 3

Chữ ký số phục vụ gì trước hết?

- A. Ẩn toàn bộ nội dung
- B. Tăng tốc đường truyền
- C. Nén dữ liệu
- D. Xác minh nguồn gốc và toàn vẹn

**Đáp án D.** Chữ ký gắn dữ liệu với khóa của người ký. **Nhiễu dễ nhầm A.** Mã hóa phục vụ bảo vệ bí mật.

## Nguồn

[P04](../SOURCES.md) tr. 40–44, 50–55. T04 01:17:40.384–01:18:53.014, 01:20:48.296–01:20:56.539, 01:22:32.574–01:23:29.574 và 01:24:21.944–01:26:07.264.
