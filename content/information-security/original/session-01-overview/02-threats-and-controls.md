# Nhận diện nghe trộm, giả mạo, xâm nhập và gián đoạn

Buổi 1 · Chủ đề mối đe dọa và biện pháp phòng thủ

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

- Phân loại sự cố dựa trên hành vi quan sát được.
- Ghép dấu hiệu với lớp phòng thủ phù hợp.

## Kiến thức qua tình huống

### 1. Đi từ tài sản tới hành vi gây hại

**Theo nguồn:** P01 tr. 20–47; T01 từ 00:34:35.790 đến phần minh họa mạng ở khoảng 01:04. Slide giới thiệu nghe trộm, thám mã, lấy cắp mật khẩu, giả mạo, xâm nhập và từ chối dịch vụ; mã độc được học tiếp ở bài sau.

**Giải thích bổ sung:** “Mối đe dọa” là điều có thể gây hại; “lỗ hổng” là điểm yếu có thể bị lợi dụng; “tấn công” là hành động khai thác; “rủi ro” xét khả năng xảy ra và hậu quả. Ví dụ một tài khoản dùng mật khẩu mặc định là điểm yếu, người khác thử đăng nhập là hành động, còn dữ liệu có thể bị lấy cắp là hậu quả. Đừng kết luận có tấn công chỉ vì máy chậm.

### 2. Nghe trộm và thám mã khác nhau

Nghe trộm (eavesdropping) là thu thập dữ liệu trên đường truyền; thám mã (cryptanalysis) tìm thông tin từ bản mã mà không có khóa cần thiết. Kẻ nghe trộm có thể chỉ thu được dữ liệu đã mã hóa, sau đó vẫn không đọc được nội dung. Mã hóa có xác thực giúp giảm rủi ro nội dung bị đọc hoặc sửa trên đường đi, nhưng đầu máy bị chiếm quyền vẫn có thể lộ bản rõ.

P01 tr. 21 nêu công cụ quan sát lưu lượng như Wireshark, tcpdump. T01 00:35:15.766–00:36:23.112 dùng Wi-Fi quán cà phê để minh họa. **Đính chính kỹ thuật:** không phải cứ ở cùng Wi-Fi là đọc được mọi nội dung; còn tùy cấu hình mạng, mã hóa liên kết và mã hóa ứng dụng. HTTPS dùng HTTP qua TLS; SSH là giao thức riêng, không phải thành phần “bên trong HTTPS” như cách viết dễ gây nhầm ở P01 tr. 28.

### 3. Bốn đường lấy cắp mật khẩu

| Cách | Cơ chế | Biện pháp gắn đúng nguyên nhân |
| --- | --- | --- |
| Guessing | Thử tên, ngày sinh, mật khẩu mặc định | Mật khẩu dài và riêng; bỏ mặc định; giới hạn lần thử |
| Dictionary attack | Thử danh sách ứng viên có khả năng | Tránh mật khẩu phổ biến; kiểm danh sách mật khẩu lộ; bảo vệ dữ liệu xác minh |
| Social engineering | Dụ người dùng tiết lộ hoặc đăng nhập trang giả | Kiểm tra đích truy cập, xác minh qua kênh đã biết, đào tạo nhận diện |
| Sniffing | Thu thông tin đăng nhập trên kênh thiếu bảo vệ | Dùng kênh có mã hóa và xác thực đúng đầu liên lạc |

**Đính chính kỹ thuật:** P01 tr. 27 dùng từ “mã hóa mật khẩu” và nêu hệ điều hành cũ. Cần phân biệt mã hóa có thể đảo bằng khóa với băm mật khẩu có salt và chi phí tính toán thích hợp. Không lưu mật khẩu người dùng bằng một lượt SHA-256 thuần. P01 tr. 30 khuyên đổi định kỳ; [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) không yêu cầu đổi tùy tiện theo chu kỳ, nhưng cần đổi khi có dấu hiệu bị lộ. Đây là cập nhật kỹ thuật, không sửa lời giảng lịch sử.

### 4. Giả mạo, xen giữa và phát lại

```text
Nghe trộm:   A ─────────> B       (kẻ khác quan sát)
Xen giữa:    A <──> X <──> B     (X có thể tiếp nhận/chuyển tiếp/sửa)
Phát lại:    yêu cầu hợp lệ cũ ──> B xử lý lần nữa
```

Chống MITM cần xác thực đầu liên lạc, không chỉ mã hóa với một khóa bất kỳ do mạng gửi tới. Chống replay cần độ mới và trạng thái: mã yêu cầu, nonce, số thứ tự hoặc thời hạn phải được kiểm tra, và các trường này phải được MAC/ký cùng nội dung. Một timestamp không được bảo vệ cũng có thể bị sửa.

P01 tr. 35–39 còn nêu SYN flooding, TCP hijacking và ARP spoofing. SYN flooding gây cạn tài nguyên kết nối. TCP hijacking nhằm chiếm một phiên; sơ đồ tr. 37 mô tả giả mạo thông tin và số thứ tự. ARP spoofing làm sai ánh xạ IPv4–MAC trong mạng cục bộ. **Đính chính:** kiểm tên miền không trực tiếp sửa được ARP poisoning; cần biện pháp phù hợp lớp mạng, kiểm soát ánh xạ khi thiết bị hỗ trợ, phân đoạn mạng và xác thực kênh ứng dụng. Một địa chỉ IP cho phép truy cập không tự chứng minh chủ thể là ai.

### 5. Xâm nhập, DoS và DDoS

Xâm nhập là truy cập trái phép vào tài nguyên. Dịch vụ thừa và cấu hình yếu có thể tạo cửa vào; một cổng mở cũng có thể phục vụ công việc hợp lệ, nên phải xác minh dịch vụ và quyền thay vì gán ngay là mã độc.

DoS làm người hợp lệ không dùng được dịch vụ. DDoS là trường hợp nguồn gây hại phân tán. Botnet là nhiều thiết bị bị điều khiển và có thể dùng để phát tán thư rác hoặc DDoS (P01 tr. 41–47). Smurf minh họa phản xạ/khuếch đại ICMP; SYN flood minh họa áp lực lên tài nguyên thiết lập kết nối. Các tên Ping of Death, Teardrop và công cụ cũ trong slide được giữ như thuật ngữ lịch sử, không là bài yêu cầu chạy.

**Phân biệt:** một lệnh ping thông thường không đồng nghĩa đã thực hiện DoS. Chậm dịch vụ có thể do đường truyền, lỗi ứng dụng hoặc tải hợp lệ. Khi phân tích, ghi số liệu tải và nhật ký rồi mới kết luận.

### Bài tập tự luyện có lời giải

**Đề:** yêu cầu chuyển 100.000 đồng có MAC hợp lệ bị phát lại hai lần. Vì sao vẫn có rủi ro?

1. MAC kiểm nội dung và người giữ khóa, không mặc nhiên xác định yêu cầu mới.
2. Kẻ tấn công không cần sửa thông điệp; bản sao cũ vẫn có tag đúng.
3. Đưa mã giao dịch vào dữ liệu được xác thực. Máy chủ ghi các mã đã xử lý và không thực hiện lại.
4. Kiểm thêm thời hạn và logic giao dịch. Hạn chế trùng ở giao diện đơn thuần không bảo vệ được phía máy chủ.

**Bài quan sát theo lời giảng:** trên máy của mình, xem danh sách kết nối, chọn một địa chỉ công cộng và ghi dịch vụ tương ứng nếu xác minh được. Kết quả tra vị trí IP chỉ là ước lượng từ cơ sở dữ liệu; không suy ra vị trí người điều khiển. Dùng ảnh đã che thông tin tài khoản khi chia sẻ báo cáo. Đây là quan sát máy của mình, không phải quét hệ thống người khác.

## Công thức và cách áp dụng

Ở các trang này, dùng tiêu chí phân loại theo dấu hiệu và mục tiêu. Ba thuật ngữ cần nhận ra là plaintext (bản rõ), ciphertext (bản mã) và key (khóa).

## Ví dụ có lời giải

**Ví dụ tự soạn.** Đầu vào là nhật ký ghi hai yêu cầu giống hệt nhau, yêu cầu thứ nhất đã được xử lý thành công. Kiểm tra mã định danh và thời điểm, rồi đối chiếu kết quả giao dịch. Nếu yêu cầu cũ bị gửi lại và xử lý lần nữa, dấu hiệu phù hợp với replay. Bên nhận có thể ghi nhận mã yêu cầu đã xử lý và từ chối lần lặp.

## Điểm dễ nhầm

Thông điệp có mã hóa vẫn có thể bị phát lại. Một dấu hiệu như truy cập chậm cũng có nhiều nguyên nhân, cần đối chiếu nhật ký hoặc dữ liệu giám sát trước khi kết luận.

## Trắc nghiệm

### Câu 1

Kẻ khác gửi lại nguyên một yêu cầu hợp lệ cũ để được xử lý lần nữa. Đây là gì?

- A. Replay
- B. Eavesdropping
- C. Cryptanalysis
- D. ARP spoofing

**Đáp án A.**

- **A:** Đúng: dùng lại thông điệp cũ.
- **B:** Nghe trộm chỉ mô tả việc quan sát.
- **C:** Không cần tìm bản rõ hay khóa trong tình huống.
- **D:** Không có dữ kiện đổi ánh xạ IP–MAC.

### Câu 2

Nhiều nguồn phân tán làm cạn tài nguyên dịch vụ. Phân loại phù hợp nhất?

- A. Thám mã
- B. DDoS
- C. Giả mạo chữ ký
- D. Chuyển vị

**Đáp án B.**

- **A:** Không mô tả khai thác bản mã.
- **B:** Đúng: phân tán nguồn, mục tiêu gián đoạn.
- **C:** Không có dữ kiện về chữ ký.
- **D:** Chuyển vị là phép đổi vị trí, không phải hiện tượng quá tải.

### Câu 3

Cách nào trực tiếp giúp ngăn một yêu cầu đã xử lý được thực hiện lại?

- A. Chỉ mã hóa nội dung
- B. Thêm checksum công khai
- C. Đổi tên người gửi
- D. Kiểm mã giao dịch đã dùng trong nội dung được xác thực

**Đáp án D.**

- **A:** Mã hóa không tự bảo đảm độ mới.
- **B:** Checksum không ghi trạng thái và có thể tính lại.
- **C:** Tên mới không cho biết yêu cầu mới hay cũ.
- **D:** Đúng: kiểm trạng thái kết hợp bảo vệ mã giao dịch.

## Nguồn và mức xác minh

- [P01](../SOURCES.md), trang dẫn đầu 21; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T01](../SOURCES.md) 00:35:15.766–00:36:23.112. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

Nghe trộm liên quan đến việc quan sát. Giả mạo làm hệ thống nhận nhầm danh tính. Replay dùng lại dữ liệu từng hợp lệ. DoS và DDoS nhắm vào khả năng sử dụng dịch vụ.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
