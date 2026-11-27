# Đọc sơ đồ của một hệ mật mã

Buổi 2 · Bản rõ, bản mã, khóa và lịch sử

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Nhận ra các thành phần trong sơ đồ, giải thích vì sao hai bên cần biết quy tắc và quản lý đúng khóa.

## Kiến thức qua tình huống

### 1. Từ nhu cầu bí mật tới hệ mật mã

**Theo nguồn:** P02 tr. 5–10, 20–22; T02 00:00:16.851–00:10:24.655. Alice muốn gửi một thông điệp cho Bob qua kênh mà người khác có thể quan sát. Hai người thống nhất thuật toán và sử dụng đúng khóa để biến bản rõ thành bản mã rồi phục hồi lại.

```text
                     khóa mã hóa ke                  khóa giải mã kd
                            ↓                              ↓
Bản rõ M ──> phép mã hóa E ──> bản mã C ──kênh──> phép giải D ──> M
```

**Giải thích bổ sung:** thuật toán là quy tắc, như “dịch vòng chữ cái”; khóa là tham số, như “dịch 3 vị trí”. Dữ liệu thực tế là chuỗi byte; mô hình A–Z chỉ là bản đơn giản giúp tính bằng tay. Bản mã có thể được hiển thị bằng hex hoặc Base64; việc đổi cách hiển thị không tạo thêm lớp bí mật.

Ví dụ `HELLO` → Base64 `SEVMTE8=` có thể được đổi lại chỉ bằng quy tắc công khai, không cần bí mật. Mã hóa cần khóa theo cơ chế thích hợp. Nén dữ liệu cũng không tự có mục tiêu bí mật.

### 2. Đọc công thức từng lớp

`C = E(M, ke)` nghĩa là đưa M và khóa ke vào phép mã hóa. `M = D(C, kd)` nghĩa là đưa C và khóa giải vào phép giải. Điều kiện đúng chức năng là `D(E(M, ke), kd) = M` với cặp khóa và tham số đúng. Đúng chức năng chưa chứng minh an toàn: Caesar cũng giải ngược đúng nhưng có thể thử hết khóa rất nhanh.

| Cách nhìn | Câu hỏi phân loại | Ví dụ |
| --- | --- | --- |
| Khóa | Hai phía dùng cùng bí mật hay dùng cặp khóa? | AES đối xứng; RSA bất đối xứng |
| Đơn vị xử lý | Xử lý theo khối hay dòng? | AES là mã khối; mã dòng sinh dòng khóa |
| Cách biến đổi cổ điển | Đổi chữ hay đổi vị trí? | Caesar thay thế; chuyển vị cột đổi vị trí |

Caesar là phép dịch chữ và thuộc nhóm thay thế; **transposition** là chuyển vị trí. Không dịch cả hai thành “dịch chuyển” rồi coi là một nhóm. Hai tiêu chí khóa và khối/dòng là hai trục phân loại khác nhau, không phải hai lựa chọn loại trừ nhau.

### 3. Quản lý khóa mới là chỗ khó

P02 tr. 9 vẽ kênh bảo vệ khóa tách với kênh gửi bản mã. Nếu gửi khóa giải cạnh bản mã trên cùng một kênh ai cũng đọc được, kẻ quan sát có cả hai đầu vào để giải. Với mã công khai, khóa public được chia sẻ nhưng vẫn phải xác minh nó thuộc đúng người nhận; nếu dùng public key của người giả danh, bí mật sẽ được gửi nhầm người.

P02 tr. 22 đặt khả năng bảo mật vào khóa thay vì giấu thuật toán. Một thuật toán công khai có thể được nhiều người nghiên cứu. Tự giấu quy tắc chưa qua đánh giá không thay được việc chọn cơ chế tốt và bảo vệ khóa.

### 4. Lịch sử: học ý tưởng chuyển đổi

**Theo nguồn:** P02 tr. 11–21 giới thiệu mật mã giấy bút, Atbash/Caesar, điện Zimmermann, máy Enigma/TypeX/SIGABA, rồi DES/AES và khóa công khai. Hình tr. 15–17 minh họa máy cơ điện và rôto; ý cần hiểu là trạng thái máy có thể thay đổi ánh xạ qua từng ký tự.

**Giới hạn:** gói này giữ các ví dụ lịch sử ở mức bối cảnh, không dùng chúng để quy mọi kết quả chiến tranh về một lần phá mã. Không yêu cầu thuộc ngày tháng chưa xác minh độc lập. Với AES, phân biệt lựa chọn Rijndael năm 2000, công bố FIPS 197 năm 2001 và hiệu lực năm 2002; có thể kiểm phần lịch sử tại [NIST FIPS 197](https://csrc.nist.gov/pubs/fips/197/final). Các năm khác nhau trên slide không phải ba thuật toán AES khác nhau.

### Bài tập tự luyện có lời giải

**Đề:** M = ABZ; E dịch chữ sang phải 1. Xác định thuật toán, khóa, bản mã và cách giải.

1. Thuật toán: dịch vòng trên A–Z.
2. Khóa k = 1.
3. A → B, B → C, Z → A nên C = BCA.
4. Dịch trái 1: B → A, C → B, A → Z. Khôi phục M = ABZ.
5. Đây là kiểm đúng chức năng, không phải kiểm an toàn. Kẻ khác có thể thử 26 độ dịch.

**Câu phản biện:** biết E có đủ để đọc mọi bản mã không? Không nếu thiết kế và khóa tốt; nhưng với hệ yếu như Caesar, biết E giúp thử không gian khóa nhỏ. “Cần khóa” không có nghĩa “không thể bị thám mã”.

## Công thức và cách áp dụng

C = E_K(M) và M = D_K(C) với mô hình đối xứng. E và D là hai phép, K là khóa chung, M là bản rõ và C là bản mã. Phép kiểm tính đúng là D_K(E_K(M)) = M.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** Cho ABZ và khóa dịch 1. Mã hóa theo thứ tự A → B, B → C, Z → A, thu BCA. Dịch ngược thu ABZ.

## Điểm dễ nhầm

Biết tên thuật toán và định dạng bản mã chưa cho biết khóa. Trong hệ khóa công khai vẫn có một khóa riêng cần bảo vệ.

## Trắc nghiệm

### Câu 1

Đầu ra của phép mã hóa được gọi là gì?

- A. Khóa
- B. Bản rõ
- C. Bản mã
- D. Digest trong mọi trường hợp

**Đáp án C.**

- **A:** Khóa là tham số đầu vào.
- **B:** Bản rõ là dữ liệu trước mã hóa.
- **C:** Đúng: ciphertext là kết quả mã hóa.
- **D:** Digest là đầu ra hash, không đồng nghĩa bản mã.

### Câu 2

D_K(E_K(M))=M trong mô hình đối xứng chứng minh trực tiếp điều gì?

- A. Thuật toán chống mọi tấn công
- B. Giải đúng khóa khôi phục bản rõ
- C. Thuật toán không cần khóa
- D. Mã hóa tạo chữ ký

**Đáp án B.**

- **A:** Đúng chức năng chưa chứng minh an toàn.
- **B:** Đúng: đây là quan hệ đảo của phép biến đổi.
- **C:** Biểu thức có sử dụng K.
- **D:** Chữ ký là mục tiêu và thao tác khác.

### Câu 3

Trong thiết kế mật mã đối xứng công khai, thành phần nào phải giữ bí mật?

- A. Tên thuật toán
- B. Kích thước khối
- C. Định dạng hex
- D. Khóa dùng chung

**Đáp án D.**

- **A:** Tên thuật toán có thể công bố.
- **B:** Kích thước khối thường công khai.
- **C:** Hex chỉ là cách biểu diễn byte.
- **D:** Đúng: khóa quyết định phép biến đổi cụ thể cần bảo vệ.

## Nguồn và mức xác minh

- [P02](../SOURCES.md), trang dẫn đầu 7; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T02](../SOURCES.md) 00:05:09.371–00:10:24.655. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

Thuật toán xác định quy tắc. Khóa chọn một phép biến đổi cụ thể. Kết quả giải đúng phải khôi phục dữ liệu ban đầu.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
