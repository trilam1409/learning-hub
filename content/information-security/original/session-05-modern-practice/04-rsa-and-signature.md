# Sinh khóa RSA, mã hóa và kiểm chữ ký

Buổi 5 · TH2B bước 4 và 5

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Chọn đúng cặp khóa cho bí mật và chữ ký, thử xác minh bản gốc và bản đã sửa.

## Kiến thức qua tình huống

### 1. Hai bước thực hành, hai mục tiêu

**Theo P05 tr. 3:** bước 4 tạo th2B_b4.txt, sinh RSA 1024 bit, mã hóa/giải, rồi thử 2048 bit và ghi thay đổi tốc độ; bước 5 tạo th2B_b5.txt, ký, lưu .sig, kiểm rồi sửa tệp để kiểm lại. T05 00:03:56.127–00:04:45.687 nhắc vai trò public/private và quy trình chữ ký.

1024 bit trong đề là cấu hình thí nghiệm để so, không được nâng thành cấu hình khuyến nghị cho dữ liệu thật. Không so tốc độ RSA chỉ bằng một số tổng: sinh khóa, mã hóa, giải mã, ký và xác minh là các phép khác nhau.

### 2. Kiểm quyền sở hữu khóa trước mỗi thao tác

```text
Mã hóa cho Bob:  pk_B → Encrypt → ciphertext → Decrypt với sk_B
Chữ ký Alice:    sk_A → Sign(M) → signature  → Verify với pk_A
```

Nên đặt nhãn rõ `bob-encryption` và `alice-signing` trong hồ sơ thí nghiệm để tránh lấy đúng loại khóa nhưng sai chủ sở hữu. Trong giao diện có thể có kho chứng chỉ/khóa hoặc tệp khóa; ghi cái đã dùng, không chỉ chụp cửa sổ “thành công” thiếu thông tin.

### 3. RSA không nhận trực tiếp tệp lớn tùy ý

**Giải thích bổ sung:** với RSA-OAEP, giới hạn một khối rõ là `k−2×hLen−2` byte, k là số byte modulus, hLen là độ dài digest dùng trong OAEP. Với modulus 2048 bit: k=256; SHA-256: hLen=32; giới hạn =256−64−2=**190 byte**. 2048 bit không phải 2048 byte bản rõ. [RFC 8017, mục 7.1](https://www.rfc-editor.org/rfc/rfc8017.html) quy định giới hạn này.

Nếu công cụ mã hóa được tệp dài hơn, phải tìm hiểu nó đang dùng cơ chế lai, chia khối hay định dạng nào. Không suy từ tên menu RSA rằng nó áp dụng đúng một phép RSA-OAEP lên toàn bộ tệp. Bài học nên giải thích hệ lai dùng đối xứng cho dữ liệu lớn và cơ chế công khai cho phần khóa/thiết lập cần thiết.

### 4. Ký và kiểm qua ba trường hợp

Lưu tệp DIEM=8 theo một encoding rõ, ký bằng khóa thử của Alice. Giữ .sig và bản gốc. Kiểm:

| Lượt | Văn bản | Chữ ký | Khóa kiểm | Kết quả kỳ vọng |
| --- | --- | --- | --- | --- |
| 1 | Bản gốc DIEM=8 | Đúng chữ ký | pk_A | Hợp lệ |
| 2 | Bản sửa DIEM=9 | Giữ chữ ký cũ | pk_A | Không hợp lệ |
| 3 | Bản gốc | Đúng chữ ký | Khóa người khác | Không hợp lệ |

Đã chạy kiểm độc lập RSA-PSS/SHA-256 cho hai lượt đầu, không phải chạy CT1. Kết quả CT1 cần quan sát riêng và ghi đúng định dạng/thuật toán công cụ. Tên mở rộng .sig là quy ước lưu tệp, không tự nói chữ ký được mã hóa bằng thuật toán nào.

### 5. Hiểu kết quả hợp lệ và không hợp lệ

Hợp lệ nghĩa là thuật toán xác minh chấp nhận bộ (khóa,thông điệp,chữ ký) dưới các tham số dùng. Muốn gắn với Alice ngoài đời còn cần kiểm nguồn gốc pk_A và quản lý khóa riêng. Không hợp lệ có thể do dữ liệu bị sửa, sai khóa, sai file .sig, sai tham số hoặc hỏng tệp; không đủ để khẳng định ai đã tấn công.

Chữ ký RSA theo modulus 2048 bit thường có giá trị chữ ký dài 256 byte; không phải 32 byte chỉ vì dùng SHA-256. Tệp chứa chữ ký có thể dài hơn vì định dạng lưu. Phần minh họa số nhỏ ở Buổi 2 không thay thế sơ đồ chữ ký có padding.

### 6. So tốc độ có phương pháp

Giữ cùng máy, thuật toán, dữ liệu và loại thao tác; dùng nhiều lượt và ghi đơn vị, số lượt, cách đo. Sinh khóa có tính ngẫu nhiên nên thời gian có thể dao động. Nếu thời gian dưới độ phân giải đồng hồ hoặc GUI gộp nhiều bước, ghi chưa đo tách được. Không tự điền kết luận “2048 chậm gấp … lần” khi chưa đo.

### Bài tập tự luyện có lời giải

**Đề:** Alice ký tệp, Bob muốn kiểm bằng sk_B vì Bob là người nhận. Đúng không? Sai. Bob dùng pk_A để kiểm chữ ký; sk_B chỉ dùng giải dữ liệu được mã hóa cho Bob theo mô hình tương ứng.

**Đề:** hai lần ký RSA-PSS cùng dữ liệu ra chữ ký khác, có phải lỗi không? Không nhất thiết. PSS có ngẫu nhiên; cả hai vẫn phải Verify hợp lệ cho cùng dữ liệu và khóa. Không so trực tiếp byte hai chữ ký để xác định nội dung có giống nhau.

**Đề:** RSA-OAEP 2048/SHA-256 nhận dữ liệu 191 byte được không? Không trong một khối theo công thức trên; giới hạn là 190. Phải dùng cấu trúc thích hợp, không cắt bớt byte để “làm cho mã hóa chạy”.

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

## Điểm dễ nhầm

2048 bit là độ dài khóa thí nghiệm, không phải độ dài thông điệp có thể mã hóa trực tiếp. Cần tính giới hạn do padding và cơ chế công cụ.

## Trắc nghiệm

### Câu 1

Để tạo chữ ký Alice dùng gì?

- A. Public key Alice
- B. Private key Bob
- C. Private key Alice
- D. Public key Bob

**Đáp án C.**

- **A:** Dùng kiểm chữ ký Alice.
- **B:** Không phải khóa người ký.
- **C:** Đúng: riêng Alice kiểm soát năng lực ký.
- **D:** Dùng cho bí mật gửi Bob, không tạo chữ ký Alice.

### Câu 2

Giữ chữ ký cũ nhưng đổi DIEM=8 thành DIEM=9, kiểm đúng khóa kỳ vọng gì?

- A. Hợp lệ vì khóa đúng
- B. Không hợp lệ
- C. Tự giải về bản gốc
- D. Tự đổi chữ ký cho khớp

**Đáp án B.**

- **A:** Khóa đúng không bù được nội dung khác.
- **B:** Đúng: chữ ký gắn với dữ liệu gốc.
- **C:** Verify không phục hồi nội dung đã ký.
- **D:** Verify không có khóa riêng để ký lại.

### Câu 3

Khi so tốc độ hai cỡ khóa RSA cần ghi gì?

- A. Chỉ độ dài khóa
- B. Chỉ một thời gian tổng
- C. Chỉ kích thước màn hình
- D. Loại thao tác, đơn vị, cấu hình và số lượt

**Đáp án D.**

- **A:** Thiếu thao tác và điều kiện.
- **B:** Có thể gộp sinh khóa với mã hóa, khó so.
- **C:** Không quyết định phép tính mật mã.
- **D:** Đúng: nhờ đó phép so mới có ý nghĩa.

## Nguồn và mức xác minh

- [P05](../SOURCES.md), trang dẫn đầu 3; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T05](../SOURCES.md) 00:03:56.127–00:04:45.687. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

Mã hóa bảo vệ bí mật, chữ ký giúp đối chiếu người ký và nội dung. Hệ lai có thể dùng RSA bảo vệ khóa phiên và đối xứng xử lý tệp lớn.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
