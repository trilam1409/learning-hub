# Sinh khóa RSA, mã hóa và kiểm chữ ký

Buổi 5 · TH2B bước 4 và 5

## Mục tiêu học

Chọn đúng cặp khóa cho bí mật và chữ ký, thử xác minh bản gốc và bản đã sửa.

## Kiến thức qua tình huống

Để gửi bí mật cho Bình, An mã hóa bằng khóa công khai của Bình. Bình giải bằng khóa riêng của mình. Để ký, An dùng khóa riêng của An, còn Bình kiểm bằng khóa công khai đúng danh tính An. Chữ ký gắn với dữ liệu cụ thể.

## Công thức và cách áp dụng

C = Encrypt(pk_B, M), M = Decrypt(sk_B, C), S = Sign(sk_A, M), Verify(pk_A, M, S). pk là khóa công khai, sk là khóa riêng, M là thông điệp, C là bản mã và S là chữ ký. A là người ký, B là người nhận.

## Bài tập chính thức

Bước 4 tạo **th2B_b4.txt**, sinh RSA **1024 bit**, mã hóa bằng public key, giải bằng private key; thử **2048 bit** và ghi tốc độ. Bước 5 tạo **th2B_b5.txt**, tạo **.sig** bằng private key, xác minh bằng văn bản gốc, .sig và public key, rồi sửa văn bản và thử lại.

## Công cụ và dữ liệu đầu vào

CrypTool 1, hai tệp và các cặp khóa thí nghiệm. Ghi phiên bản, định dạng và padding nếu công cụ hiển thị. Khóa 1024 bit phục vụ phép so theo đề.

## Các bước thực hiện

1. Theo Encrypt → Asymmetric → RSA → Generate Keys, sinh 1024 bit, mã hóa bản rõ rồi giải.
2. Lặp với 2048 bit, giữ máy và dữ liệu. Ghi đơn vị và tách thời gian sinh khóa, mã hóa, giải mã nếu đo được.
3. Theo Digital Signatures → Create/Verify Signature → RSA Signature, ký b5, lưu .sig và xác minh.
4. Thay một ký tự trong bản sao, giữ .sig, xác minh lại và chụp hai trạng thái.

## Cách tự kiểm tra

Đối chiếu khóa nằm đúng cặp, dữ liệu đúng byte và tên tệp. So phép đo chỉ khi dùng cùng cấu hình và cùng loại thao tác.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** Với b4 dùng RSA DEMO, giải xong phải thu đúng byte. Với b5 dùng DIEM=8, lưu chữ ký, xác minh bản gốc dự kiến hợp lệ. Đổi thành DIEM=9, giữ chữ ký thì dự kiến INVALID. Không ấn định số đo tốc độ nếu chưa chạy.

## Tóm tắt

Mã hóa bảo vệ bí mật, chữ ký giúp đối chiếu người ký và nội dung. Hệ lai có thể dùng RSA bảo vệ khóa phiên và đối xứng xử lý tệp lớn.

## Điểm dễ nhầm

2048 bit là độ dài khóa thí nghiệm, không phải độ dài thông điệp có thể mã hóa trực tiếp. Cần tính giới hạn do padding và cơ chế công cụ.

## Trắc nghiệm

### Câu 1

Dùng gì để tạo chữ ký An?

- A. Khóa công khai Bình
- B. Khóa riêng An
- C. Khóa công khai An
- D. Khóa riêng Bình

**Đáp án B.** Người ký dùng khóa riêng. **Nhiễu dễ nhầm C.** Khóa công khai An dành để kiểm.

### Câu 2

Đổi thông điệp và giữ chữ ký cũ. Kiểm đúng khóa cho kết quả mong đợi nào?

- A. Hợp lệ vì khóa đúng
- B. Không hợp lệ
- C. Tự sinh khóa mới
- D. Tự phục hồi bản gốc

**Đáp án B.** Chữ ký gắn với thông điệp gốc. **Nhiễu dễ nhầm A.** Khóa đúng không bù được dữ liệu khác.

### Câu 3

Nên ghi gì khi so tốc độ hai cỡ khóa RSA?

- A. Tên tab
- B. Chỉ định dạng khóa
- C. Loại thao tác, đơn vị, điều kiện và số lần đo
- D. Một số không có đơn vị

**Đáp án C.** Nhờ vậy mới có phép so cùng điều kiện. **Nhiễu dễ nhầm D.** Một số trơ không phân biệt sinh khóa, mã hóa và giải.

## Nguồn

[P05](../SOURCES.md) tr. 3 và câu 1, 4–6 tr. 4. [P04](../SOURCES.md) tr. 50–54. T05 00:03:56.127–00:04:45.687 xác nhận vai trò khóa RSA và luồng tạo, kiểm chữ ký. Mức khóa và tên tệp lấy theo PDF. Kết quả là phép tính hoặc dự kiến, chưa chạy CrypTool.
