# Mã đối xứng, RSA và mã hóa kết hợp

Buổi 2 · DES, AES, RSA và độ dài khóa

## Mục tiêu học

Chọn đúng loại khóa cho từng tác vụ. Phân biệt kích thước khối, khóa và độ dài của một không gian khóa.

## Kiến thức qua tình huống

| Mô hình | Khóa | Dùng vào việc gì trong bài |
| --- | --- | --- |
| Đối xứng | Một khóa bí mật chung | DES và AES xử lý dữ liệu theo khối |
| Bất đối xứng | Khóa công khai và khóa riêng | RSA mã hóa cho người nhận hoặc tạo/xác minh chữ ký theo sơ đồ phù hợp |
| Kết hợp (hybrid) | Khóa dữ liệu cộng cơ chế khóa công khai | Thuật toán đối xứng xử lý dữ liệu, cơ chế công khai bảo vệ khóa phiên |

DES có khối 64 bit, khóa hiệu dụng 56 bit. AES có khối 128 bit, khóa 128, 192 hoặc 256 bit. P02 tr. 61 có một dòng về tổ hợp hai khóa bí mật, không dùng dòng đó để diễn giải RSA. Phần số liệu tốc độ trong transcript bị nhận dạng không rõ. Một con số độ dài khóa RSA cũng không so trực tiếp được với AES. Xem [vòng DES/AES](../session-05-modern-practice/01-des-and-aes-workflow.md).

## Công thức và cách áp dụng

**Kiến thức bổ sung.** Trong RSA minh họa chọn p, q nguyên tố, n = pq, φ = (p − 1)(q − 1), chọn e nguyên tố cùng φ và d sao cho ed ≡ 1 mod φ. Mã hóa số m theo c = m^e mod n, khôi phục theo m = c^d mod n. Khi dùng thực tế, cần cơ chế mã hóa RSA có padding theo đặc tả. Vét cạn khóa n bit có 2^n ứng viên; nếu thử không lặp và vị trí khóa đều, số lần trung bình là (2^n + 1)/2. Chia cho tốc độ thử để ước lượng thời gian.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ từ giảng viên** (T02 01:42:14.791–01:43:18.841). Máy khách dùng khóa công khai của máy chủ, máy chủ dùng khóa riêng để đọc. Đây là mô hình minh họa RSA, không phải mô tả đầy đủ quá trình thiết lập TLS.

**Ví dụ tự soạn.** p = 5, q = 11, n = 55, φ = 40, e = 3, d = 27. Với m = 7, 7³ mod 55 = 13. Sau đó 13^27 mod 55 = 7. Với khóa 8 bit, mô hình thử có 256 khả năng và trung bình 128,5 lần.

## Tóm tắt

AES dùng cùng khóa ở hai phía. Với RSA mã hóa, khóa công khai thuộc người nhận; khi ký, khóa riêng thuộc người ký.

## Điểm dễ nhầm

Độ dài khóa và độ dài khối của AES là hai đại lượng. Vét cạn và phân tích dấu vết ngôn ngữ là hai bài toán.

## Trắc nghiệm

### Câu 1

Khối dữ liệu AES-256 dài bao nhiêu?

- A. 64 bit
- B. 56 bit
- C. 128 bit
- D. 256 bit

**Đáp án C.** Kích thước khối AES cố định ở 128 bit. **Nhiễu dễ nhầm D.** 256 bit là độ dài khóa.

### Câu 2

Mã khóa phiên cho Bình bằng RSA dùng khóa nào?

- A. Riêng của Bình
- B. Công khai của Bình
- C. Công khai của An
- D. Riêng của An

**Đáp án B.** Người nhận Bình sở hữu cặp khóa mã hóa/giải. **Nhiễu dễ nhầm A.** Bình giữ khóa riêng để giải.

### Câu 3

Khóa 8 bit có bao nhiêu ứng viên?

- A. 512
- B. 256
- C. 128
- D. 8

**Đáp án B.** 2^8 = 256 khả năng. **Nhiễu dễ nhầm C.** 128 chỉ gần số lần thử trung bình.

## Nguồn

[P02](../SOURCES.md) tr. 41–70. T02 01:42:14.791–01:43:18.841, 01:44:12.521–01:45:09.401 và 01:47:09.671–01:47:31.916. Lời giảng cũng phân biệt CrypTool 1, phiên bản 2 và bản online cho các mục đích học tập.
