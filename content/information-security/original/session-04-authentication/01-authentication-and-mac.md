# Nhận dạng, checksum và MAC

Buổi 4 · Xác thực bằng yếu tố và mã chứng thực thông điệp

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Phân biệt kiểm danh tính, lỗi dữ liệu và kiểm thông điệp bằng khóa bí mật.

## Kiến thức qua tình huống

### 1. Bốn câu hỏi phải tách riêng

**Theo nguồn:** P04 tr. 4–32; T04 00:00:03.674–00:51:35.974. Giả sử Bob nhận một văn bản tự xưng do Alice gửi. Có bốn câu hỏi: ai tạo/gửi, nội dung có bị sửa, người ngoài có đọc được, và có bằng chứng cho bên thứ ba xem xét không? Chúng tương ứng nguồn gốc, toàn vẹn, bí mật và hỗ trợ chống chối bỏ. Một kỹ thuật có thể phục vụ vài mục tiêu, không mặc nhiên tất cả.

**Nhận dạng người dùng:** mật khẩu/PIN là yếu tố biết; thẻ hoặc thiết bị là yếu tố có; sinh trắc là yếu tố thuộc về cơ thể. Hai mật khẩu vẫn là cùng nhóm yếu tố biết. OTP là mật khẩu dùng một lần theo cơ chế cụ thể, không đồng nghĩa khóa mã hóa dữ liệu. P04 tr. 7–11 minh họa thẻ thông minh, OTP và chứng chỉ; các hình minh họa không cung cấp toàn bộ giao thức triển khai.

### 2. Checksum không có bí mật để chống giả mạo

Checksum giúp phát hiện lỗi ngẫu nhiên. Nếu quy tắc công khai, kẻ sửa dữ liệu có thể tính lại checksum phù hợp với dữ liệu mới. **Đính chính:** checksum khớp không chứng minh không có người sửa. P04 tr. 16 vẽ hai cách điều khiển lỗi: checksum nằm trong phần mã hóa hoặc checksum tính trên bản mã nằm ngoài. Cần tính lại đúng đối tượng theo sơ đồ; checksum ngoài là của bản mã, không phải của bản rõ sau giải.

Ví dụ cộng byte mod 256: AB có 65+66=131, BA có 66+65=131. Hai chuỗi khác vẫn cùng checksum. Đây là hàm đồ chơi để thấy giới hạn, không phải thuật toán checksum TCP.

### 3. MAC thêm khóa bí mật

Alice và Bob chia sẻ K. Alice tính `T = MAC(K,M)`, gửi M và T. Bob lấy **M nhận được**, cùng K tính T′ rồi so T′ với T. Nếu thay M nhưng giữ T, kẻ không có K khó tạo tag hợp lệ cho thông điệp mới dưới giả định cơ chế tốt và khóa được bảo vệ.

```text
Alice: M + K ── MAC ──> T ──┐
         M ────────────────┴── gửi (M,T)
Bob:   M nhận + K ── MAC ──> T′ ── so với T
```

MAC không giấu M. Bob cũng biết K nên cũng tạo được tag; không dùng riêng tag để chứng minh trước một bên thứ ba rằng chỉ Alice có thể tạo thông điệp. Tag không khớp cũng chưa cho biết nguyên nhân là tấn công: có thể sai khóa, sai byte, sai tham số hoặc hỏng dữ liệu.

### 4. HMAC là một cách xây MAC bằng hash

**Đính chính P04 tr. 14:** HMAC không phải chỉ ghép hàm băm với checksum. Theo [RFC 2104](https://www.rfc-editor.org/rfc/rfc2104.html), cấu trúc là:

```text
HMAC(K,M) = H((K′ XOR opad) || H((K′ XOR ipad) || M))
```

K′ là khóa đã xử lý về độ dài khối; ipad/opad là hai mẫu đệm khác nhau; `||` là nối byte. Ở mức nhập môn cần nhớ HMAC dùng **hash và khóa theo cấu trúc xác định**, không phải H(M) trần. Khi dùng thư viện, gọi HMAC chuẩn thay vì tự nối mật khẩu vào cuối chuỗi và gọi đó là HMAC.

### 5. Đọc ba sơ đồ MAC trong slide

| Sơ đồ P04 tr. 26–27 | Gói gửi | Bên nhận làm gì? |
| --- | --- | --- |
| a. Chỉ chứng thực | M \|\| MAC(K,M) | Tính MAC trên M nhận; so tag |
| b. MAC rồi mã hóa | Enc(Kenc, M \|\| MAC(Kmac,M)) | Giải, tách M/tag, kiểm MAC trên M |
| c. Mã hóa rồi MAC | C \|\| MAC(Kmac,C), C=Enc(Kenc,M) | Kiểm MAC trên C rồi mới giải theo cơ chế thiết kế |

**Phân biệt lời giảng và đính chính:** T04 00:43:13.584–00:45:42.224 nói có thể dùng chung K1/K2. Khi thiết kế hai phép riêng, nên tách khóa mã hóa và khóa MAC; có thể dẫn xuất từ một bí mật gốc với nhãn/ngữ cảnh khác nhau, như ý tưởng trong [RFC 5869](https://www.rfc-editor.org/rfc/rfc5869.html). Không tự khẳng định đổi thứ tự tùy ý sẽ làm hệ an toàn hơn. Với ứng dụng thực, dùng cơ chế đã được phân tích, ví dụ mã hóa có xác thực, thay vì tự ghép theo độ lạ.

### 6. Độ dài khóa và tag là hai loại khó

Với tag n bit lý tưởng, xác suất đoán đúng một lần là 2^(−n); q lần đoán ít hơn nhiều 2^n có xác suất xấp xỉ q/2^n trong mô hình đơn giản. Khóa k bit ngẫu nhiên có 2^k ứng viên. Các con số 32–96 bit tag, 56–160 bit khóa ở P04 tr. 25 là thông số trong slide, không là cấu hình chung bắt buộc ngày nay.

P04 tr. 29–31 mô tả lọc khóa bằng nhiều cặp (M,T). Với k=80, n=32, số khóa sai còn lại kỳ vọng xấp xỉ 2^48 sau cặp đầu và 2^16 sau cặp thứ hai. Sau cặp thứ ba là khoảng 2^(−16) khóa **sai**, ngoài khóa thật luôn còn. Vì vậy “còn đúng một khóa” là kết quả rất có khả năng trong mô hình lý tưởng, không bảo đảm toán học tuyệt đối và không có nghĩa việc thử 2^80 khóa là dễ.

### Bài tập tự luyện có lời giải

**Đề:** Alice gửi (M,T) hợp lệ, kẻ khác gửi lại nguyên gói. Bob tính T′ khớp. Có đủ để xử lý giao dịch không? Chưa. MAC không bảo đảm độ mới. Đưa mã giao dịch và ngữ cảnh vào M được xác thực, kiểm mã đã xử lý và điều kiện thời hạn.

**Ví dụ có thể tự tính bằng thư viện:** khóa ASCII `key`, M là `The quick brown fox jumps over the lazy dog`. HMAC-SHA-256 bằng **f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8**. Đây là ví dụ kiểm toán học, khóa công khai trong tài liệu chỉ dùng thử. Thay một byte M thì phải tính lại bằng đúng khóa; không lấy SHA-256(M) thay HMAC-SHA-256(K,M).

## Công thức và cách áp dụng

T = MAC(K, M), M là thông điệp, K là khóa, T là tag. Người nhận tính lại theo byte đã nhận và so với T. Tag n bit lý tưởng có xác suất đoán trúng mỗi lần là 1/2^n. Độ dài tag và độ dài khóa là hai tham số.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ từ giảng viên** (P04 tr. 12–14). Hai người chia sẻ K để tạo và kiểm giá trị chứng thực. Khi bỏ K khỏi phép tính và chỉ dùng hàm công khai, một người khác có thể tính giá trị tương ứng với dữ liệu khác.

**Ví dụ tự soạn.** Bên gửi tạo MAC của BLOCA. Bên nhận thấy BLOCB với tag cũ, tính lại bằng K và dự kiến phát hiện không khớp. Khi tag đúng, muốn ngăn phát lại vẫn cần kiểm độ mới, chẳng hạn có mã giao dịch chưa xử lý.

## Điểm dễ nhầm

Một tag hợp lệ không thể cho biết người tạo là ai trong hai bên dùng cùng khóa. Giá trị MAC không tự giấu thông điệp.

## Trắc nghiệm

### Câu 1

MAC cần thêm gì ngoài thông điệp?

- A. Checksum công khai
- B. Khóa bí mật chia sẻ
- C. Public key của bất kỳ ai
- D. Tên người gửi dạng chữ

**Đáp án B.**

- **A:** Checksum không có yếu tố bí mật chống tính lại.
- **B:** Đúng: K dùng tạo và kiểm tag.
- **C:** Public key công khai không thay được bí mật của MAC.
- **D:** Tên có thể bị chép hoặc sửa.

### Câu 2

Tag MAC hợp lệ có chứng minh trước bên thứ ba rằng chỉ Alice tạo được không?

- A. Có vì tag ngắn
- B. Có nếu hash dài
- C. Có nếu gửi qua email
- D. Không, Bob cũng có khóa chung

**Đáp án D.**

- **A:** Độ ngắn không phân biệt người giữ khóa.
- **B:** Độ dài không thay việc Bob cũng có K.
- **C:** Kênh gửi không thay năng lực tạo tag của Bob.
- **D:** Đúng: MAC không tách hai bên cùng biết khóa.

### Câu 3

Phép công khai chủ yếu phát hiện lỗi ngẫu nhiên là gì?

- A. Chữ ký số
- B. HMAC
- C. Checksum
- D. RSA-OAEP

**Đáp án C.**

- **A:** Chữ ký dùng khóa riêng/công khai.
- **B:** HMAC có khóa bí mật.
- **C:** Đúng: checksum công khai phục vụ phát hiện lỗi, không tự chống giả mạo.
- **D:** OAEP là sơ đồ mã hóa RSA.

## Nguồn và mức xác minh

- [P04](../SOURCES.md), trang dẫn đầu 5; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T04](../SOURCES.md) 00:43:13.584–00:45:42.224. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

MAC kết hợp dữ liệu và khóa bí mật. Checksum có thể giúp nhận sai khác ngẫu nhiên. Hai mục tiêu cần đọc riêng là xác thực và giữ bí mật.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
