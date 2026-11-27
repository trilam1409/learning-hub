# Mã đối xứng, RSA và mã hóa kết hợp

Buổi 2 · DES, AES, RSA và độ dài khóa

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Chọn đúng loại khóa cho từng tác vụ. Phân biệt kích thước khối, khóa và độ dài của một không gian khóa.

## Kiến thức qua tình huống

### 1. Hiểu ba kích thước khác nhau

**Theo nguồn:** P02 tr. 41–70; T02 01:08:41.651–01:47:31.916. Kích thước khối là lượng dữ liệu một lượt xử lý; kích thước khóa là lượng bit khóa; mức an toàn phụ thuộc bài toán tấn công tốt nhất, không chỉ số bit in trên tên.

| Thuật toán | Khối | Khóa trong bài | Ghi chú |
| --- | --- | --- | --- |
| DES | 64 bit = 8 byte | 56 bit hiệu dụng | Lịch sử; học cấu trúc Feistel |
| AES | 128 bit = 16 byte | 128/192/256 bit | Mã đối xứng; xem vòng ở Buổi 5 |
| RSA | Phép toán trên số modulo n | Độ dài modulus n | Mã công khai/chữ ký theo sơ đồ riêng |

**Đính chính:** 56 bit khóa DES không đồng nghĩa mật khẩu 7 ký tự người dùng có đủ 56 bit ngẫu nhiên. Chuỗi dễ đoán chứa ít bất định hơn dữ liệu ngẫu nhiên cùng số byte. Không kết luận RSA 2048 mạnh hơn AES 256 vì 2048 lớn hơn 256: hai hệ bị tấn công bằng các bài toán khác nhau.

P02 tr. 43 từng mô tả 3DES là an toàn vì “gấp ba khóa”. Cần đọc như bối cảnh lịch sử; [NIST đã rút TDEA](https://csrc.nist.gov/News/2023/nist-to-withdraw-sp-800-67-rev-2) khỏi việc áp dụng bảo vệ mới sau năm 2023. Không biến các ví dụ DES/3DES của môn học thành lựa chọn mặc định cho ứng dụng mới.

### 2. Vì sao mã hiện đại có nhiều vòng?

DES/AES phối hợp các phép biến đổi qua nhiều vòng để làm mờ quan hệ đơn giản giữa bản rõ, khóa và bản mã. Khóa vòng được sinh từ khóa ban đầu. RSA không phải cấu trúc thay thế–hoán vị nhiều vòng như AES: nó dựa trên số học modulo. Do đó mô tả “mã hiện đại nhiều vòng” phù hợp nhóm DES/AES đang học, không bao quát mọi cơ chế công khai.

### 3. RSA: giữ đúng chủ sở hữu khóa

Muốn gửi bí mật **cho Bob**: mã hóa bằng public key của Bob, Bob giải bằng private key của Bob. Muốn chứng minh thông điệp **do Alice ký**: Alice ký bằng private key của Alice; người kiểm dùng public key đã xác minh của Alice. Public key không cần giấu, nhưng cần biết nó thuộc đúng ai.

P02 tr. 61 có lời chú thích “tổ hợp khóa bí mật của mình với khóa bí mật người khác”. Hình bên cạnh thực tế dùng public key của phía kia với private key của mình trong một ý tưởng thỏa thuận khóa; **không phải công thức sinh khóa chung RSA**. Người dùng không trao private key cho nhau.

### 4. Tính RSA với số nhỏ để thấy cơ chế

**Diễn giải bổ sung từ ví dụ P02 tr. 63:** p = 61, q = 53; n = 3233; φ(n) = 60×52 = 3120; chọn e = 17 và d = 2753 vì 17×2753 = 46801 = 15×3120 + 1.

Public key là (n,e). Với số thông điệp m = 123 (0 ≤ m < n), `c = 123^17 mod 3233 = 855`; giải `855^2753 mod 3233 = 123`. Không cần viết toàn bộ số lũy thừa rất lớn: có thể bình phương rồi lấy dư ở từng bước; 17 = 16+1 nên tính các số dư của 123², 123⁴, 123⁸, 123¹⁶ rồi nhân thêm 123.

Đây là RSA toán học với khóa rất nhỏ, dùng để học. Khi triển khai cần sơ đồ mã hóa và chữ ký có mã hóa định dạng/padding như OAEP và PSS, không lấy lũy thừa thô thay thao tác chuẩn. [RFC 8017](https://www.rfc-editor.org/rfc/rfc8017.html) phân biệt các phép nguyên thủy, sơ đồ mã hóa và sơ đồ chữ ký.

### 5. Mã hóa lai: mỗi công cụ làm phần phù hợp

```text
Tạo khóa dữ liệu K ngẫu nhiên
 ├─ mã đối xứng dùng K bảo vệ tệp lớn → C
 └─ cơ chế khóa công khai bảo vệ K cho Bob → gói khóa
Gửi: gói khóa + C + tham số cần thiết
Bob phục hồi K bằng private key, rồi dùng K xử lý C
```

P02 tr. 64 và T02 01:44:12.521–01:45:09.401 minh họa ý tưởng lai. Nếu cần chứng thực người gửi, thêm cơ chế thích hợp; mã hóa bằng public key của Bob đơn thuần không cho biết ai gửi vì ai cũng có thể dùng public key đó.

Mô hình máy khách/máy chủ trong T02 01:42:14.791–01:43:18.841 là ví dụ vai trò khóa. Không dùng làm mô tả đầy đủ mọi phiên TLS hoặc cho rằng OTP là khóa mã hóa của HTTPS. OTP xác thực và khóa phiên bảo vệ dữ liệu là các thành phần khác nhau.

### 6. Ước lượng vét cạn có giả định

Khóa n bit ngẫu nhiên có 2^n khả năng. Nếu thử không lặp theo thứ tự và khóa thật nằm đều ở các vị trí, trung bình (2^n+1)/2 lần thử; thường xấp xỉ 2^(n−1). Thời gian trung bình là số lần thử chia tốc độ r, với đơn vị nhất quán.

**Ví dụ:** n = 32, r = 10^6 khóa/giây → khoảng 2147,48 giây = 35,79 phút. Con số này là tính theo giả định tốc độ, không là phép đo máy hiện tại. Bảng P02 tr. 68 dùng hai tốc độ giả định; thêm một bit khóa làm không gian khóa gấp đôi. Với thay thế đơn, thám mã tần suất có thể hiệu quả hơn vét cạn, nên không dùng thời gian thử 26! để chứng minh an toàn.

### Bài tập tự luyện có lời giải

**Đề:** p = 5, q = 11, e = 3; tìm d và mã số 7. Ta có n = 55, φ = 40; 3×27 = 81 ≡ 1 (mod 40), nên d = 27. 7³ = 343 ≡ 13 (mod 55); 13²⁷ mod 55 = 7. Bài này chỉ chứng minh phép tính.

**Đề phân loại tấn công, từ hình P02 tr. 67:** chỉ có bản mã → ciphertext-only; có cặp rõ/mã → known-plaintext; chọn bản rõ để nhận mã → chosen-plaintext; chọn bản mã để quan sát phản hồi giải → chosen-ciphertext. Timing attack dùng thông tin thời gian; áp lực lên con người là một nhóm rủi ro khác. Không gian khóa lớn không tự loại bỏ lỗi triển khai và kênh bên.

## Công thức và cách áp dụng

**Kiến thức bổ sung.** Trong RSA minh họa chọn p, q nguyên tố, n = pq, φ = (p − 1)(q − 1), chọn e nguyên tố cùng φ và d sao cho ed ≡ 1 mod φ. Mã hóa số m theo c = m^e mod n, khôi phục theo m = c^d mod n. Khi dùng thực tế, cần cơ chế mã hóa RSA có padding theo đặc tả. Vét cạn khóa n bit có 2^n ứng viên; nếu thử không lặp và vị trí khóa đều, số lần trung bình là (2^n + 1)/2. Chia cho tốc độ thử để ước lượng thời gian.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ từ giảng viên** (T02 01:42:14.791–01:43:18.841). Máy khách dùng khóa công khai của máy chủ, máy chủ dùng khóa riêng để đọc. Đây là mô hình minh họa RSA, không phải mô tả đầy đủ quá trình thiết lập TLS.

**Ví dụ tự soạn.** p = 5, q = 11, n = 55, φ = 40, e = 3, d = 27. Với m = 7, 7³ mod 55 = 13. Sau đó 13^27 mod 55 = 7. Với khóa 8 bit, mô hình thử có 256 khả năng và trung bình 128,5 lần.

## Điểm dễ nhầm

Độ dài khóa và độ dài khối của AES là hai đại lượng. Vét cạn và phân tích dấu vết ngôn ngữ là hai bài toán.

## Trắc nghiệm

### Câu 1

Kích thước khối AES-256 là bao nhiêu?

- A. 256 bit
- B. 128 bit
- C. 64 bit
- D. 192 bit

**Đáp án B.**

- **A:** 256 là kích thước khóa của biến thể.
- **B:** Đúng: khối AES cố định 128 bit.
- **C:** 64 là khối DES trong bài.
- **D:** 192 là một kích thước khóa AES, không phải khối.

### Câu 2

Alice muốn mã hóa cho Bob bằng RSA. Dùng khóa nào?

- A. Private key Alice
- B. Public key Alice
- C. Private key Bob
- D. Public key Bob

**Đáp án D.**

- **A:** Khóa riêng Alice dùng cho vai trò ký, không mã bí mật cho Bob.
- **B:** Khóa này không gắn với khả năng giải riêng của Bob.
- **C:** Bob giữ khóa riêng để giải, không phát cho Alice.
- **D:** Đúng: chỉ Bob có khóa riêng tương ứng để giải theo sơ đồ.

### Câu 3

Khóa ngẫu nhiên 8 bit có bao nhiêu khả năng?

- A. 8
- B. 128
- C. 256
- D. 512

**Đáp án C.**

- **A:** 8 là số bit.
- **B:** 128 gần số lần thử trung bình, không phải số khóa.
- **C:** Đúng: 2^8=256.
- **D:** 512 tương ứng 9 bit.

## Nguồn và mức xác minh

- [P02](../SOURCES.md), trang dẫn đầu 41; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T02](../SOURCES.md) 01:42:14.791–01:45:09.401. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

AES dùng cùng khóa ở hai phía. Với RSA mã hóa, khóa công khai thuộc người nhận; khi ký, khóa riêng thuộc người ký.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
