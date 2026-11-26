# Tính và đọc mã băm

Buổi 4 · Digest, tiền ảnh và va chạm

## Mục tiêu học

Đọc độ dài digest theo bit và hex, phân biệt ba tính chất an toàn và kiểm được tệp theo tham chiếu.

## Kiến thức qua tình huống

Hàm băm nhận chuỗi byte dài thay đổi và phát ra digest có độ dài cố định. Một số họ hàm xử lý lần lượt các khối, cập nhật trạng thái rồi tạo kết quả. MD5 là 128 bit, SHA-1 là 160 bit, SHA-256 là 256 bit trong họ SHA-2. SHA-3 là họ khác. Ba bài toán thường gặp:

| Bài toán | Cho trước | Tìm |
| --- | --- | --- |
| Tiền ảnh | Digest h | M có H(M) = h |
| Tiền ảnh thứ hai | Một M | M' khác M có H(M') = H(M) |
| Va chạm | Không ấn định bản rõ | Hai bản rõ khác nhau có cùng digest |

Hình tr. 44 minh họa lưu kết quả của hàm một chiều sau khi kết hợp mật khẩu với salt. **Kiến thức bổ sung.** Salt có thể lưu cạnh giá trị kiểm; hệ thống quản lý mật khẩu cần hàm dẫn xuất dành cho mật khẩu và bản ghi tham số tương ứng, thay vì lặp lại nguyên mẫu sơ đồ trên.

## Công thức và cách áp dụng

h = H(M), với M là chuỗi byte và h là digest. Số chữ số hex bằng số bit chia 4. Hàm đồ chơi ở P04 tr. 34 lấy XOR của các khối cùng độ dài. XOR giao hoán, vì vậy đảo thứ tự khối sẽ giữ cùng kết quả trong ví dụ đồ chơi.

## Bài tập chính thức

Tìm ba phần mềm có cung cấp mã băm, lấy đúng tệp phát hành và tính lại bằng công cụ. Ghi tên, phiên bản, hệ điều hành, kiến trúc, digest tham chiếu, digest tính được và đánh giá khớp/lệch. T04 cho tự chọn công cụ.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** 0110 XOR 1011 = 1101. Tính 1011 XOR 0110 vẫn cho 1101. Hai thứ tự khác nhau mà có cùng digest. Với một tệp thật, dùng mã băm tham chiếu do bên tin cậy cung cấp và so toàn bộ hex.

## Tóm tắt

Hash hỗ trợ kiểm tra toàn vẹn với tham chiếu. Tính một chiều và chống va chạm là các mục tiêu khác nhau.

## Điểm dễ nhầm

Tệp khác phiên bản hoặc có byte xuống dòng khác có thể cho digest khác. Digest khớp chưa chứng minh phần mềm an toàn trước mọi loại rủi ro.

## Trắc nghiệm

### Câu 1

Cho sẵn digest và tìm đầu vào tương ứng là bài toán gì?

- A. Giải nén
- B. Tiền ảnh
- C. Va chạm
- D. Giải RSA

**Đáp án B.** Digest được ấn định trước. **Nhiễu dễ nhầm C.** Va chạm không ấn định bản rõ hay digest đích trước.

### Câu 2

SHA-256 có mấy chữ số hex?

- A. 32
- B. 256
- C. 64
- D. 128

**Đáp án C.** Mỗi chữ số hex biểu diễn 4 bit. **Nhiễu dễ nhầm B.** 256 là bit, không phải số chữ số hex.

### Câu 3

Đảo thứ tự hai khối trong phép băm XOR đồ chơi thì sao?

- A. Digest dài gấp đôi
- B. Digest đổi dấu
- C. Digest giữ nguyên
- D. Khóa thay đổi

**Đáp án C.** XOR giao hoán. **Nhiễu dễ nhầm B.** Không có phép lấy đối dấu.

## Nguồn

[P04](../SOURCES.md) tr. 33–49, 55. Đã xem trực tiếp hình tr. 44. T04 01:16:34.674–01:17:16.014 và 01:21:36.354–01:22:31.334.
