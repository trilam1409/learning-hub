# Nhận dạng, checksum và MAC

Buổi 4 · Xác thực bằng yếu tố và mã chứng thực thông điệp

## Mục tiêu học

Phân biệt kiểm danh tính, lỗi dữ liệu và kiểm thông điệp bằng khóa bí mật.

## Kiến thức qua tình huống

| Kỹ thuật | Căn cứ kiểm tra |
| --- | --- |
| Xác thực người dùng | Một điều người dùng biết, có hoặc là, ví dụ mật khẩu, thiết bị, sinh trắc học |
| Checksum | Quy tắc tính công khai, hữu ích phát hiện lỗi ngẫu nhiên |
| MAC | Chỉ bên giữ khóa bí mật chia sẻ có căn cứ tạo tag kiểm thông điệp |

Alice và Bob cùng có K nên hai bên đều tạo được tag đúng. Điều đó giúp xác thực thông điệp trong nhóm giữ khóa và giới hạn khả năng quy chữ ký về một người cho bên thứ ba. MAC cũng không che nội dung. Slide trình bày các cách đặt tag ngoài hoặc bên trong phần mã hóa và một ví dụ lịch sử dùng DES. **Kiến thức bổ sung.** Trong một sơ đồ ghép thủ công, phân biệt khóa mã hóa với khóa MAC. Nếu bắt đầu từ một bí mật gốc, có thể sinh các khóa con riêng theo thiết kế. Đoạn T04 00:44:08.064–00:45:42.224 nói về việc dùng một hay hai khóa; phần diễn giải thiết kế ở đây được ghi riêng.

Sơ đồ tr. 26 có ba cách đặt phép kiểm. (a) Gửi bản rõ cùng MAC. (b) Tạo MAC trên bản rõ, mã hóa chung cả bản rõ và MAC. (c) Mã hóa bản rõ, tạo MAC trên bản mã và gửi kèm. Phía nhận cần biết đang tính tag trên bản rõ hay bản mã để so đúng. Tr. 32 cho ví dụ lịch sử dùng kết quả khối DES trước phối hợp vào khối tiếp theo, rồi lấy giá trị kiểm từ khối cuối.

## Công thức và cách áp dụng

T = MAC(K, M), M là thông điệp, K là khóa, T là tag. Người nhận tính lại theo byte đã nhận và so với T. Tag n bit lý tưởng có xác suất đoán trúng mỗi lần là 1/2^n. Độ dài tag và độ dài khóa là hai tham số.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ từ giảng viên** (P04 tr. 12–14). Hai người chia sẻ K để tạo và kiểm giá trị chứng thực. Khi bỏ K khỏi phép tính và chỉ dùng hàm công khai, một người khác có thể tính giá trị tương ứng với dữ liệu khác.

**Ví dụ tự soạn.** Bên gửi tạo MAC của BLOCA. Bên nhận thấy BLOCB với tag cũ, tính lại bằng K và dự kiến phát hiện không khớp. Khi tag đúng, muốn ngăn phát lại vẫn cần kiểm độ mới, chẳng hạn có mã giao dịch chưa xử lý.

## Tóm tắt

MAC kết hợp dữ liệu và khóa bí mật. Checksum có thể giúp nhận sai khác ngẫu nhiên. Hai mục tiêu cần đọc riêng là xác thực và giữ bí mật.

## Điểm dễ nhầm

Một tag hợp lệ không thể cho biết người tạo là ai trong hai bên dùng cùng khóa. Giá trị MAC không tự giấu thông điệp.

## Trắc nghiệm

### Câu 1

MAC cần gì ngoài thông điệp?

- A. Chứng chỉ SSL bắt buộc
- B. Checksum công khai
- C. Tên người dùng
- D. Khóa bí mật chia sẻ

**Đáp án D.** Bên có khóa tính được tag. **Nhiễu dễ nhầm B.** Checksum công khai thiếu yếu tố bí mật.

### Câu 2

Alice và Bob dùng chung MAC. Bằng tag hợp lệ có quy chắc chỉ Alice tạo được không?

- A. Có, nếu là PDF
- B. Có, nếu biết thời điểm
- C. Không, Bob cũng có khóa
- D. Có, chỉ cần tag đúng

**Đáp án C.** Cả hai có năng lực tạo tag. **Nhiễu dễ nhầm D.** Tag đúng không phân biệt được hai bên giữ khóa.

### Câu 3

Cơ chế kiểm lỗi truyền ngẫu nhiên mà không cần khóa?

- A. HMAC
- B. Chữ ký số
- C. Checksum
- D. Mã hóa RSA

**Đáp án C.** Checksum có thể dùng quy tắc công khai. **Nhiễu dễ nhầm A.** HMAC dùng khóa bí mật.

## Nguồn

[P04](../SOURCES.md) tr. 3–32. T04 00:00:03.674–00:00:38.314; 00:43:13.584–00:45:42.224. ‘Chờ bóp’ ở 00:00:31.114–00:00:31.594 có thể là tên Bob, dùng tên trên slide khi giải thích.
