# Mã hóa đối xứng và so sánh chế độ

Buổi 5 · TH2B bước 2

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Mã hóa và phục hồi văn bản, ghi đủ tham số để lặp lại, nhận ra mẫu lặp của ECB.

## Kiến thức qua tình huống

### 1. Giữ dữ liệu đề, ghi rõ điểm không khớp tham số

**Theo P05 tr. 2:** tạo th2B_b2.txt, dùng AES, chuỗi MyStrongKey123 và thử ECB/CBC/CFB/OFB; T05 00:02:20.907–00:03:19.007 nhắc tạo/nộp tệp. Chuỗi MyStrongKey123 có **14 byte ASCII**, trong khi khóa thô AES phải 16,24 hoặc32 byte. Không âm thầm thêm ký tự rồi gọi đó là khóa đúng nguyên văn đề.

Nếu ô nhận passphrase, ghi công cụ đã dẫn xuất khóa thế nào nếu biết; nếu không biết, ghi “chưa xác minh”. Nếu ô nhận khóa thô báo sai độ dài, lưu thông báo. Ví dụ khóa 16 byte **MyStrongKey12345** dưới đây là dữ liệu bổ sung để tự kiểm, không thay tên khóa của đề.

### 2. Phân biệt dữ liệu, khóa, IV và padding

- Bản rõ là byte cần bảo vệ; UTF-8, BOM và cuối dòng có thể thay byte.
- Khóa là bí mật điều khiển phép biến đổi.
- IV là đầu vào khởi tạo cho một số chế độ; thường không cần giữ bí mật nhưng phải đáp ứng yêu cầu của chế độ và được bảo vệ trong thiết kế.
- Padding làm đủ khối khi cơ chế cần; không được xóa bằng cách cắt mọi byte có giá trị giống nhau ở cuối.

Đề trình bày bản rõ qua dòng in PDF; cần ghi bạn tạo một dòng hay có xuống dòng thật. Đáp án byte phải so với đúng phiên bản đã chọn, không suy một ngắt dòng bố cục chắc chắn là LF của tệp.

### 3. Bốn cách dùng cùng phép mã khối

**Giải thích bổ sung:** Pi là khối rõ thứ i, Ci là khối mã, E là AES mã một khối, `⊕` là XOR. CFB dưới đây là **CFB128** để mỗi phân đoạn bằng một khối; phân đoạn khác có cách xếp khác.

| Chế độ | Công thức khái niệm | Điều cần hiểu |
| --- | --- | --- |
| ECB | Ci=E(K,Pi) | Khối rõ bằng nhau, cùng khóa → khối mã bằng nhau |
| CBC | C0=IV; Ci=E(K,Pi⊕C(i−1)) | Khối đầu phụ thuộc IV; khối sau phụ thuộc mã trước |
| CFB128 | C0=IV; Ci=Pi⊕E(K,C(i−1)) | Lấy bản mã trước làm đầu vào sinh phần XOR |
| OFB | O0=IV; Oi=E(K,O(i−1)); Ci=Pi⊕Oi | Chuỗi phản hồi từ đầu ra bộ sinh, không từ Ci |

Các chế độ trong [NIST SP 800-38A](https://csrc.nist.gov/pubs/sp/800/38/a/final) nhằm bí mật; riêng chúng không tự xác thực thông điệp. CBC/CFB cần IV không dự đoán được theo yêu cầu; OFB cần không lặp IV với cùng khóa. Không dùng một IV cố định lặp cho dữ liệu thật chỉ vì ví dụ lớp dùng giá trị dễ nhìn.

### 4. Thí nghiệm để thấy ECB lộ mẫu

Tạo đúng 32 byte ASCII: `ABCDEFGHIJKLMNOPABCDEFGHIJKLMNOP`, không xuống dòng. Có hai khối 16 byte giống hệt nhau. Dùng cùng khóa, ở ECB hai khối mã nội dung đầu bằng nhau. Nếu PKCS#7 thêm khối đệm thứ ba, không đưa khối đó vào so hai khối dữ liệu.

Trong bài kiểm độc lập của gói, cùng dữ liệu với CBC, CFB128 và OFB cho hai khối mã đầu khác nhau và giải ngược được. Đây là **kết quả một thí nghiệm**, không phát biểu “CBC không bao giờ có hai khối mã trùng”. Khi so trên CT1, lưu bản mã dạng byte/hex; không căn theo hình nhìn như ký tự rác.

### 5. Quy trình so sánh có kiểm soát

1. Lưu bản rõ gốc và cấu hình, chọn một khóa có độ dài phù hợp với loại ô nhập.
2. Mã hóa ECB, lưu bản mã; giải ngay và đối chiếu byte với bản gốc.
3. Chuyển CBC, ghi IV/padding, mã hóa và giải bằng đúng tham số.
4. Lặp với CFB, ghi kích thước phân đoạn; lặp OFB, ghi IV.
5. Dùng mẫu hai khối lặp để quan sát; sau đó quay lại văn bản chính thức để hoàn thiện bài nộp.
6. Thử một cấu hình sai trên **bản sao thí nghiệm**, chẳng hạn sai IV CBC; ghi lỗi/sai khác thay vì khẳng định phần mềm luôn báo lỗi. Mã hóa không xác thực có thể trả dữ liệu rác mà không biết là sai.

### Bài tập tự luyện có lời giải

**Đề:** bản mã ECB có header 20 byte; có thể so hai đoạn 16 byte từ đầu tệp để kết luận mẫu lặp không? Chưa. Phải xác định phần ciphertext bắt đầu ở đâu, rồi so các khối cùng căn biên. Header là định dạng công cụ, không phải khối mã của bản rõ.

**Đề:** IV CBC đúng khóa nhưng sai một bit sẽ ảnh hưởng gì? Ở phép giải CBC, khối rõ đầu là D(K,C1)⊕IV nên bit tương ứng của khối đầu bị đổi; không kết luận “khóa sai” chỉ từ sai khác đó. Đây là lý do phải ghi IV và dùng cơ chế xác thực thích hợp khi triển khai.

**Ứng dụng bổ sung:** cơ chế AEAD kết hợp bí mật và toàn vẹn; tham số nonce/IV vẫn cần quản lý đúng. Bài so sánh bốn mode không là hướng dẫn tự thiết kế một định dạng mã hóa an toàn cho sản phẩm.

## Công thức và cách áp dụng

**Kiến thức bổ sung.** ECB có C_i = E_K(P_i). CBC có C_i = E_K(P_i XOR C_(i−1)), với C_0 = IV. P_i là khối rõ, C_i là khối mã, E_K dùng khóa K, IV là giá trị khởi tạo.

## Bài tập chính thức

Tạo **th2B_b2.txt** với **THIS IS A SECRET MESSAGE USED FOR SYMMETRIC ENCRYPTION DEMO.** Đề xuống dòng sau MESSAGE. Thử AES với chuỗi khóa **MyStrongKey123**, chọn ECB hoặc thay đổi CBC/CFB/OFB rồi giải bằng cùng khóa. Tiêu đề bước ghi AES/DES, chỉ dẫn cụ thể là AES.

## Công cụ và dữ liệu đầu vào

CrypTool 1 và tệp chính thức. Chuỗi khóa chính thức dài 14 byte ASCII. Nếu ô nhận khóa AES thô, cần 16/24/32 byte. Ghi lỗi hoặc cách dẫn xuất thực tế của giao diện. **Ví dụ tự soạn** cho khóa AES-128 dạng ASCII là **MyStrongKey12345** dài 16 byte.

## Các bước thực hiện

1. Mở Encrypt → Symmetric (modern) → AES theo đề. Ghi cách nhập khóa, mã hóa ký tự, ký tự xuống dòng, padding, IV nếu có và cách hiển thị bản mã.
2. Mã hóa, giải ngược bằng Decrypt → Symmetric (modern) → AES và cùng tham số.
3. Thử chế độ khác, so cả bản mã và kết quả giải. Ghi rõ cấu hình nào giữ nguyên. Thử mẫu hai khối giống nhau để giải thích ECB.

## Cách tự kiểm tra

So từng byte đầu ra với tệp gốc. Nếu lệch, kiểm lại dạng khóa, xuống dòng, IV, biến thể chế độ và padding.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** Nhập ABCDEFGHIJKLMNOP hai lần liền nhau, không ngăn cách. Đầu vào ASCII gồm hai khối 16 byte giống nhau. Chọn ECB, hai khối mã nội dung đầu sẽ bằng nhau với cùng khóa, kể cả khi phần mềm thêm một khối padding cuối. CBC thường cho hai khối mã khác nhau vì đầu vào XOR thay đổi.

## Điểm dễ nhầm

Chuỗi gõ vào ô mật khẩu và khóa thô là hai dữ liệu có thể khác nhau. Nên theo dõi IV và khóa bằng hai trường riêng.

## Trắc nghiệm

### Câu 1

Với cùng khóa, chế độ nào mã độc lập hai khối rõ bằng nhau thành hai khối mã bằng nhau?

- A. CBC trong mọi trường hợp
- B. CFB trong mọi trường hợp
- C. OFB trong mọi trường hợp
- D. ECB

**Đáp án D.**

- **A:** CBC phụ thuộc mã trước/IV.
- **B:** CFB dùng trạng thái phản hồi.
- **C:** OFB dùng dòng đầu ra theo vị trí.
- **D:** Đúng: ECB là hàm riêng trên mỗi khối.

### Câu 2

MyStrongKey123 gồm bao nhiêu byte ASCII?

- A. 13
- B. 16
- C. 14
- D. 32

**Đáp án C.**

- **A:** Đếm thiếu một ký tự.
- **B:** 16 là độ dài khóa thô AES-128, không phải chuỗi này.
- **C:** Đúng:14 ký tự ASCII bằng14 byte.
- **D:** 32 là độ dài khóa thô AES-256.

### Câu 3

Giải CBC ngoài cùng khóa cần khớp gì?

- A. Chỉ tên tệp
- B. IV, padding và định dạng tương ứng
- C. Chỉ kiểu chữ hiển thị hex
- D. Chỉ tên cửa sổ

**Đáp án B.**

- **A:** Tên tệp không quyết định byte đầu vào.
- **B:** Đúng: các tham số/định dạng ảnh hưởng phục hồi.
- **C:** Hoa/thường hex không thay giá trị byte; chưa đủ để giải.
- **D:** Cửa sổ không phải tham số thuật toán.

## Nguồn và mức xác minh

- [P05](../SOURCES.md), trang dẫn đầu 2; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T05](../SOURCES.md) 00:02:20.907–00:03:19.007. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

ECB làm lộ mẫu lặp. Đảo đúng phép mã hóa với cùng thiết lập thì thu lại văn bản theo byte.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
