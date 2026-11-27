# Theo dõi các vòng DES và AES

Buổi 5 · TH2B bước 1

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Nhận diện khối, khóa và khóa vòng. Ghi được các bước cốt lõi của mỗi giải thuật.

## Kiến thức qua tình huống

### 1. Quan sát mỗi bước làm gì

**Theo đề:** P05 tr. 1–2, bước 1; T05 00:01:42.787–00:02:19.087 yêu cầu dùng mô phỏng, chụp bước chính và ghi ý nghĩa. Nền tảng sơ đồ ở P02 tr. 43–57. Không cần chép hàng trăm ảnh nếu chưa giải thích được dữ liệu và khóa đang đi đâu.

Trước khi mở mô phỏng, lập bảng: thuật toán, số bit khối, số bit khóa hiệu dụng, số vòng và các phép chính. Mục tiêu là nối một ảnh với một bước trong thuật toán. **Phần tính sâu bên dưới là bổ sung để tự học**, không đồng nghĩa đề yêu cầu tự cài toàn bộ AES/DES.

### 2. DES: khóa 56 bit hiệu dụng, khối 64 bit

Sơ đồ P02 tr. 48 có hoán vị đầu IP, 16 vòng, hoán vị cuối IP⁻¹. Khóa thường biểu diễn bằng 64 bit gồm 8 bit chẵn lẻ, còn 56 bit tham gia thông tin khóa. Khối 64 bit sau IP chia thành hai nửa 32 bit L0 và R0.

```text
Li = R(i−1)
Ri = L(i−1) XOR F(R(i−1),Ki)
```

F lấy nửa phải, mở rộng, kết hợp khóa vòng, thay thế bằng S-box và hoán vị để trả một nửa 32 bit. Nhờ cấu trúc Feistel, phép giải dùng cùng cấu trúc với các khóa vòng theo thứ tự ngược. Không gọi IP là mã hóa đủ an toàn: IP chỉ đổi vị trí bit theo quy tắc công khai.

**Ví dụ thu nhỏ tự soạn, không phải DES đầy đủ:** L0=1010, R0=0110 và F(R0,K1)=1100. Khi đó L1=0110; R1=1010 XOR 1100=0110. Nếu biết L1,R1 và F, có R0=L1 và L0=R1 XOR F(R0,K1)=0110 XOR 1100=1010. Ví dụ cho thấy cách đảo một vòng, không đánh giá an toàn.

### 3. AES: trạng thái là 16 byte

AES có khối 128 bit ở mọi độ dài khóa. Trạng thái là ma trận 4×4 byte; khi ánh xạ 16 byte liên tiếp vào trạng thái chuẩn, đi theo cột. Khóa vòng áp lên toàn bộ trạng thái là 16 byte, không chỉ một cột 4 byte. **Đính chính P02 tr. 50,53:** một word khóa là 4 byte; số khóa vòng 11 chỉ ứng với AES-128.

| Biến thể | Khóa đầu vào | Số vòng | Số khóa vòng tính cả đầu |
| --- | --- | --- | --- |
| AES-128 | 16 byte | 10 | 11 |
| AES-192 | 24 byte | 12 | 13 |
| AES-256 | 32 byte | 14 | 15 |

Thông số có thể đối chiếu [FIPS 197](https://csrc.nist.gov/pubs/fips/197/final). Khóa đầu vào được key schedule mở rộng thành các khóa vòng; không nhập riêng từng khóa vòng từ tên người dùng.

### 4. Bốn phép biến đổi và một ngoại lệ

1. **AddRoundKey đầu:** XOR trạng thái với khóa vòng ban đầu.
2. **SubBytes:** thay mỗi byte qua S-box, tạo biến đổi phi tuyến.
3. **ShiftRows:** dịch vòng trái hàng 0,1,2,3 tương ứng 0,1,2,3 byte, phân tán vị trí giữa các cột.
4. **MixColumns:** trộn bốn byte trong từng cột theo phép toán trường hữu hạn, không phải nhân số nguyên rồi lấy mod 26.
5. **AddRoundKey:** XOR với khóa vòng tương ứng.

Lặp các vòng giữa. Vòng cuối thực hiện SubBytes, ShiftRows, AddRoundKey và **bỏ MixColumns**. AES-128 có 9 vòng giữa cộng 1 vòng cuối; không gọi thành “AES chỉ có 9 vòng”.

Để quan sát ShiftRows, hàng `[10 20 30 40]` ở hàng thứ hai dịch trái 1 thành `[20 30 40 10]`; các số chỉ là nhãn byte trong ví dụ. Với XOR, 57 hex = 01010111; 83 hex = 10000011; XOR = 11010100 = D4 hex. XOR khác phép cộng số nguyên.

### 5. Ghi bằng chứng mô phỏng

Chọn mô phỏng/visualization đúng thuật toán, ghi khóa và khối đầu vào, chụp ảnh trước/sau một bước chính, mô tả bước đó thay đổi điều gì. Nếu mô phỏng không chạy do thành phần phụ thuộc, ghi lỗi, phiên bản và cách đã thử; có thể vẽ lại sơ đồ để học nhưng không ghi “đã chạy” khi chỉ xem hình. T02 khoảng 01:15–01:19 có nhắc lỗi môi trường khi minh họa DES; đó không chứng minh mọi CT1 hiện nay cần cùng cách xử lý.

### Bài tập tự luyện có lời giải

**Đề:** đầu vào AES 16 byte hex `00112233445566778899aabbccddeeff`, khóa `000102030405060708090a0b0c0d0e0f`; mã một khối AES-128 theo kiểm chuẩn cho **69c4e0d86a7b0430d8cdb78070b4c55a**. Gói đã đối chiếu bằng thư viện độc lập. Đây là phép mã khối, chưa có padding/IV/header của tệp; nếu phần mềm trả nhiều hơn 16 byte, phải xác định phần định dạng trước khi so.

**Đề:** AES-256 có tăng số byte khối không? Không. Vẫn 16 byte; tăng khóa và số vòng. **Đề:** mã hóa có làm tệp luôn dài đúng bằng tệp gốc không? Không; chế độ, padding và định dạng đầu ra có thể thêm byte. Kết luận về khối không đồng nghĩa kết luận về toàn bộ tệp.

## Công thức và cách áp dụng

DES có L_i = R_(i−1) và R_i = L_(i−1) XOR F(R_(i−1), K_i). L và R là hai nửa, K_i là khóa vòng, F là phép biến đổi nửa phải. Với AES, AddRoundKey XOR từng byte trạng thái với byte khóa vòng tương ứng.

## Bài tập chính thức

Ghi các bước chính của DES và AES. Báo cáo tên **TH2B_họtên_mssv.docx**. Nộp báo cáo kèm các tệp văn bản tương ứng. Theo đề cần ghi bước thực hiện, chụp kết quả, nhận xét và phân tích.

## Công cụ và dữ liệu đầu vào

Windows 10/11, CrypTool 1, sơ đồ DES/AES của [P02](../SOURCES.md), đoạn văn mẫu tự chọn nếu cần minh họa.

## Các bước thực hiện

1. Chia vết DES thành hoán vị đầu, tạo khóa vòng, vòng mẫu, hoán vị cuối. Tại vòng mẫu, ghi dữ liệu của nửa trái và nửa phải.
2. Với AES, lập bảng gồm bước trước vòng, bốn bước trong một vòng giữa và vòng cuối. Mô tả thay thế byte, dịch hàng, trộn cột và XOR khóa.
3. Đưa ảnh quan sát hoặc sơ đồ tự vẽ vào báo cáo. Chú thích mỗi ảnh cho biết đang quan sát bước nào.

## Cách tự kiểm tra

Đối chiếu D4 XOR 83 = 57. Kiểm tra bảng có cả khối, khóa và số vòng.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** Một byte AES 57 hex XOR với byte khóa 83 hex. Đổi sang 01010111 và 10000011, kết quả 11010100 = D4 hex. Đây là kết quả của một byte tại một bước.

## Điểm dễ nhầm

AES-256 dùng khóa 256 bit, kích thước khối vẫn là 128 bit.

## Trắc nghiệm

### Câu 1

Vòng cuối AES bỏ phép nào?

- A. SubBytes
- B. ShiftRows
- C. MixColumns
- D. AddRoundKey

**Đáp án C.**

- **A:** Vẫn thực hiện ở vòng cuối.
- **B:** Vẫn thực hiện ở vòng cuối.
- **C:** Đúng: đây là ngoại lệ.
- **D:** Vẫn XOR khóa vòng cuối.

### Câu 2

DES dùng bao nhiêu vòng Feistel?

- A. 10
- B. 16
- C. 56
- D. 64

**Đáp án B.**

- **A:** 10 là số vòng AES-128.
- **B:** Đúng: DES có16 vòng.
- **C:** 56 là bit khóa hiệu dụng.
- **D:** 64 là bit khối/biểu diễn khóa danh nghĩa, không phải vòng.

### Câu 3

57 hex XOR 83 hex bằng gì?

- A. D4
- B. DA
- C. 57
- D. 83

**Đáp án A.**

- **A:** Đúng:01010111 XOR10000011=11010100.
- **B:** DA là tổng số nguyên, không phải XOR.
- **C:** Muốn giữ57 phải XOR với0.
- **D:** 83 là một toán hạng, không phải kết quả này.

## Nguồn và mức xác minh

- [P05](../SOURCES.md), trang dẫn đầu 2; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T05](../SOURCES.md) 00:01:42.787–00:02:19.087. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

DES dùng Feistel và khóa con. AES dùng ma trận byte, bước đầu XOR khóa vòng và vòng cuối có ngoại lệ.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
