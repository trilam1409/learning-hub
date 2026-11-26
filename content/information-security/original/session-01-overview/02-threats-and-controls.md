# Nhận diện nghe trộm, giả mạo, xâm nhập và gián đoạn

Buổi 1 · Chủ đề mối đe dọa và biện pháp phòng thủ

## Mục tiêu học

- Phân loại sự cố dựa trên hành vi quan sát được.
- Ghép dấu hiệu với lớp phòng thủ phù hợp.

## Kiến thức qua tình huống

Một cổng tài khoản có thể gặp sự cố trên đường truyền, ở bước đăng nhập, trong phiên đã xác thực hoặc khi tài nguyên máy chủ cạn kiệt. Xác định vị trí xảy ra giúp giải thích vì sao cùng một biện pháp bảo vệ chỉ xử lý được một số tình huống.

| Dấu hiệu | Nhóm | Hướng bảo vệ |
| --- | --- | --- |
| Bên thứ ba đọc lưu lượng | Nghe trộm (eavesdropping) | Bảo vệ và xác thực kênh truyền |
| Tìm thông tin từ bản mã | Phân tích mật mã (cryptanalysis) | Dùng thuật toán và tham số an toàn theo thiết kế |
| Đoán mật khẩu, chọn theo danh sách phổ biến, dụ tiết lộ hoặc thu từ đường truyền | Lấy cắp mật khẩu (password pilfering) | Mật khẩu riêng, giám sát đăng nhập, kênh mã hóa và xác minh yêu cầu bất thường |
| Giả làm một đầu liên lạc, dùng lại thông điệp cũ hoặc giả danh ở lớp mạng | Giả mạo, xen giữa (MITM), phát lại (replay), giả mạo mạng | Xác thực đầu liên lạc, kiểm soát độ mới, giám sát mạng |
| Tiếp cận tài nguyên trái phép | Xâm nhập (intrusion) | Đóng dịch vụ thừa, vá lỗi, kiểm soát truy cập |
| Người hợp lệ không thể sử dụng dịch vụ | Từ chối dịch vụ (DoS/DDoS) | Theo dõi tải, giới hạn lưu lượng phù hợp, chuẩn bị phương án giảm tải |

Với replay, một thông điệp từng hợp lệ có thể được gửi lại. TCP hijacking liên quan tới chiếm một kết nối đã có. ARP spoofing liên quan tới ánh xạ IP–MAC trong mạng cục bộ. DoS mô tả mục tiêu làm gián đoạn, còn DDoS chỉ trường hợp phân tán nguồn gây tải. Tài liệu nêu SYN flooding và Smurf như các ví dụ để nhận diện theo hậu quả. Botnet là tập hợp thiết bị bị điều khiển, có thể là nguồn của DDoS.

### Kiến thức bổ sung

Trong thực tế, HTTPS dùng TLS, còn SSH là giao thức riêng cho truy cập an toàn. Với quản lý mật khẩu, cần phân biệt mã hóa có thể đảo ngược với quy trình xác minh dựa trên giá trị băm mật khẩu. Các ví dụ hệ điều hành cũ và đổi mật khẩu định kỳ ở tr. 27–31 là nội dung của slide. Bảng trên tóm tắt các biện pháp theo tình huống ôn tập.

## Công thức và cách áp dụng

Ở các trang này, dùng tiêu chí phân loại theo dấu hiệu và mục tiêu. Ba thuật ngữ cần nhận ra là plaintext (bản rõ), ciphertext (bản mã) và key (khóa).

## Ví dụ có lời giải

**Ví dụ tự soạn.** Đầu vào là nhật ký ghi hai yêu cầu giống hệt nhau, yêu cầu thứ nhất đã được xử lý thành công. Kiểm tra mã định danh và thời điểm, rồi đối chiếu kết quả giao dịch. Nếu yêu cầu cũ bị gửi lại và xử lý lần nữa, dấu hiệu phù hợp với replay. Bên nhận có thể ghi nhận mã yêu cầu đã xử lý và từ chối lần lặp.

## Tóm tắt

Nghe trộm liên quan đến việc quan sát. Giả mạo làm hệ thống nhận nhầm danh tính. Replay dùng lại dữ liệu từng hợp lệ. DoS và DDoS nhắm vào khả năng sử dụng dịch vụ.

## Điểm dễ nhầm

Thông điệp có mã hóa vẫn có thể bị phát lại. Một dấu hiệu như truy cập chậm cũng có nhiều nguyên nhân, cần đối chiếu nhật ký hoặc dữ liệu giám sát trước khi kết luận.

## Trắc nghiệm

### Câu 1

Thông điệp cũ được hệ thống xử lý lần nữa là dấu hiệu gì?

- A. Phát lại
- B. Quét mã độc
- C. Nghe trộm
- D. Phá mã

**Đáp án A.** Hệ thống nhận lại thông điệp từng hợp lệ. **Nhiễu dễ nhầm C.** Nghe trộm mô tả việc quan sát dữ liệu.

### Câu 2

Nhiều nguồn phân tán làm quá tải một dịch vụ. Hiện tượng phù hợp nhất là gì?

- A. Khôi phục dữ liệu
- B. Trojan
- C. DDoS
- D. Giả danh

**Đáp án C.** Mục tiêu là gián đoạn và nguồn gây tải phân tán. **Nhiễu dễ nhầm D.** Giả danh cần dấu hiệu hệ thống nhận nhầm danh tính.

### Câu 3

Cơ chế trực tiếp nhận ra một yêu cầu cũ đã xử lý là gì?

- A. Mã hóa mà không lưu trạng thái
- B. Nén tệp
- C. Ghi mã yêu cầu đã dùng
- D. Đổi tên tệp

**Đáp án C.** Mã đã dùng giúp phát hiện lần lặp. **Nhiễu dễ nhầm A.** Mã hóa không tự xác định độ mới.

## Nguồn

[P01](../SOURCES.md) tr. 20–47, phần văn bản. Hình và nhãn nhúng tại tr. 20, 33, 37, 39, 44, 46–47 chưa xác minh đầy đủ. T01 00:35:15.766–00:36:23.112. Giảng viên dùng Wi-Fi quán cà phê để minh họa nghe trộm; tên công cụ nhận dạng sai, dùng P01 tr. 21.
