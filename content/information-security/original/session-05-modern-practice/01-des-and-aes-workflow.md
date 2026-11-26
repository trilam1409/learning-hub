# Theo dõi các vòng DES và AES

Buổi 5 · TH2B bước 1

## Mục tiêu học

Nhận diện khối, khóa và khóa vòng. Ghi được các bước cốt lõi của mỗi giải thuật.

## Kiến thức qua tình huống

DES xử lý khối 64 bit. Khóa danh nghĩa 64 bit có 56 bit hiệu dụng và 8 bit chẵn lẻ. DES hoán vị đầu, chia khối làm đôi, áp dụng 16 vòng Feistel rồi hoán vị cuối. Thứ tự khóa vòng đảo khi giải. AES xử lý khối 128 bit ở dạng ma trận 4×4 byte. Khóa 128, 192, 256 bit tương ứng 10, 12, 14 vòng. Trước vòng đầu có AddRoundKey. Vòng giữa gồm SubBytes, ShiftRows, MixColumns và AddRoundKey. Vòng cuối bỏ MixColumns.

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

## Tóm tắt

DES dùng Feistel và khóa con. AES dùng ma trận byte, bước đầu XOR khóa vòng và vòng cuối có ngoại lệ.

## Điểm dễ nhầm

AES-256 dùng khóa 256 bit, kích thước khối vẫn là 128 bit.

## Trắc nghiệm

### Câu 1

AES bỏ bước nào ở vòng cuối?

- A. AddRoundKey
- B. MixColumns
- C. ShiftRows
- D. SubBytes

**Đáp án B.** Vòng cuối không trộn cột. **Nhiễu dễ nhầm A.** AddRoundKey vẫn thực hiện.

### Câu 2

DES có bao nhiêu vòng Feistel?

- A. 16
- B. 56
- C. 10
- D. 64

**Đáp án A.** DES lặp 16 vòng. **Nhiễu dễ nhầm D.** 64 là kích thước khối.

### Câu 3

57 hex XOR 83 hex bằng gì?

- A. DA
- B. 83
- C. D4
- D. 57

**Đáp án C.** XOR theo bit cho 11010100. **Nhiễu dễ nhầm A.** DA là kết quả cộng thông thường ở mẫu.

## Nguồn

[P05](../SOURCES.md) tr. 1–2. [P02](../SOURCES.md) tr. 43–57. T05 00:00:26.777–00:01:32.857, 00:01:42.787–00:02:19.087 và 00:03:27.167–00:03:37.223. Giảng viên gợi ý dùng mô phỏng, chụp các bước chính, ghi mỗi bước làm gì. Nộp báo cáo cùng tệp nén chứa các tệp văn bản. Có thể dùng công cụ khác theo lời giảng; giữ tên tệp của P05. Kết quả là phép tính hoặc dự kiến, chưa chạy CrypTool.
