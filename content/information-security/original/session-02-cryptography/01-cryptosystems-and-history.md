# Đọc sơ đồ của một hệ mật mã

Buổi 2 · Bản rõ, bản mã, khóa và lịch sử

## Mục tiêu học

Nhận ra các thành phần trong sơ đồ, giải thích vì sao hai bên cần biết quy tắc và quản lý đúng khóa.

## Kiến thức qua tình huống

Người gửi dùng một phép biến đổi để đưa thông điệp qua kênh công cộng. Đầu vào là bản rõ (plaintext), đầu ra là bản mã (ciphertext). Khóa là tham số điều khiển phép biến đổi. Mật mã học bao gồm thiết kế hệ mật mã và nghiên cứu các cách đánh giá, phân tích chúng. Một thiết kế có thể được công bố để kiểm tra, trong khi khóa đối xứng cần giữ bí mật.

| Giai đoạn trong slide | Ý tưởng đại diện |
| --- | --- |
| Thủ công | Thay chữ hoặc đổi vị trí bằng giấy bút |
| Cơ điện | Enigma, TypeX và trạng thái thay đổi sau mỗi ký tự |
| Máy tính | Xử lý theo bit hoặc khối, với DES, AES và RSA là những ví dụ trong bài |

## Công thức và cách áp dụng

C = E_K(M) và M = D_K(C) với mô hình đối xứng. E và D là hai phép, K là khóa chung, M là bản rõ và C là bản mã. Phép kiểm tính đúng là D_K(E_K(M)) = M.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** Cho ABZ và khóa dịch 1. Mã hóa theo thứ tự A → B, B → C, Z → A, thu BCA. Dịch ngược thu ABZ.

## Tóm tắt

Thuật toán xác định quy tắc. Khóa chọn một phép biến đổi cụ thể. Kết quả giải đúng phải khôi phục dữ liệu ban đầu.

## Điểm dễ nhầm

Biết tên thuật toán và định dạng bản mã chưa cho biết khóa. Trong hệ khóa công khai vẫn có một khóa riêng cần bảo vệ.

## Trắc nghiệm

### Câu 1

Đầu ra của phép mã hóa là gì?

- A. Khóa
- B. Bản rõ
- C. Chứng chỉ
- D. Bản mã

**Đáp án D.** Phép mã hóa biến bản rõ thành bản mã. **Nhiễu dễ nhầm B.** Bản rõ là đầu vào.

### Câu 2

Trong D_K(E_K(M)) = M, K là gì?

- A. Kích thước tệp
- B. Khóa đối xứng
- C. Bản mã
- D. Bản rõ

**Đáp án B.** Hai chiều dùng chung K. **Nhiễu dễ nhầm D.** M là bản rõ.

### Câu 3

Thiết kế mã đối xứng giữ bí mật thành phần nào?

- A. Kích thước khối
- B. Khóa dùng chung
- C. Định dạng hex
- D. Tên thuật toán

**Đáp án B.** Biết khóa phù hợp cho phép thực hiện phép giải. **Nhiễu dễ nhầm D.** Thuật toán có thể được công bố.

## Nguồn

[P02](../SOURCES.md) tr. 1–22. T02 00:00:51.411–00:00:55.731 xác nhận chủ đề mã hóa; 00:10:21.081–00:10:24.655 nhắc số khóa trong mô hình công khai.
