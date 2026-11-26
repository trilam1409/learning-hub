# Bắt đầu với CrypTool và mã Caesar

Buổi 3 · Chủ đề chuẩn bị, mã hóa dịch vòng và thử khóa trên bản mã lớp học

## Mục tiêu học

- Tạo tài liệu thực hành, phân biệt mã hóa, giải mã và phân tích bản mã.
- Tự tính một số ký tự Caesar và kiểm tra kết quả theo nhiều khóa.

## Kiến thức qua tình huống

Caesar dời tất cả chữ cùng số bước trên bảng chữ cái. Khi đi hết Z, tiếp tục từ A. Mã này giúp thấy rõ vai trò của khóa: cùng bản rõ và hai khóa khác nhau thì cho hai bản mã để đối chiếu.

## Công thức và cách áp dụng

Với A = 0, …, Z = 25, đặt p là số của chữ bản rõ, c là số của chữ bản mã và k là độ dịch. Mã hóa c = (p + k) mod 26, giải mã p = (c − k) mod 26. Mod 26 đưa kết quả về 0–25. Ví dụ khi giải D với k = 7, (3 − 7) mod 26 = 22, cho W.

## Bài tập chính thức

- Chuẩn bị Windows 10/11, CrypTool 1 và đoạn văn mẫu. Tạo báo cáo **TH2A_họtên_mssv.docx**. Lưu các bước, ảnh màn hình kết quả, nhận xét và phân tích xuyên suốt toàn bộ Buổi 3. Phần mở rộng của buổi được thiết kế cho 180 phút.
- Chọn File → New. Quan sát và chụp các menu Encrypt, Decrypt, Analysis, mô tả các mục và thử vài mục trên văn bản mẫu.
- Mã hóa **ATTACK AT DAWN** bằng Caesar với khóa **3**, giải mã ngược, rồi dùng Caesar Analysis để khảo sát các khóa. Lặp lại với **5, 7, 13**. Tự tạo **3 bản mã** và trao đổi để giải mã chéo.

## Công cụ và dữ liệu đầu vào

CrypTool 1 và bảng chữ cái A–Z. Dữ liệu chính thức là ATTACK AT DAWN. Bảng dưới tính với chữ hoa, bỏ khoảng trắng khi so khớp kết quả. Nếu phần mềm giữ khoảng trắng, so phần chữ theo cụm 6–2–4. Tên nhóm menu có thể khác giữa phiên bản hoặc ngôn ngữ giao diện.

## Các bước thực hiện

1. Tạo văn bản mới. Dùng câu chính thức cho Caesar, ghi tên và phiên bản phần mềm. Chụp các menu, ghi mỗi mục đã thử dùng để làm gì.
2. Theo đề, mở Encrypt → Classical → Caesar, chọn khóa 3. Đối chiếu AT đầu câu thành DW. Giải mã bằng cùng độ dịch ở chế độ Decrypt.
3. Chọn Analysis → Classical → Caesar Analysis theo đường dẫn trong đề. Trên bản mã tự tạo, quan sát các kết quả và chọn ứng viên có nghĩa. Nếu chế độ phân tích chỉ đưa ứng viên tốt nhất, ghi giao diện đã hiện gì và đối chiếu bằng bảng dịch tay.
4. Lặp lại mã hóa, giải mã và ghi nhận kết quả với 5, 7, 13. Tạo ba bản mã của mình, giữ bản rõ và khóa riêng để so đáp án sau khi trao đổi.

## Ví dụ có lời giải và kết quả mong đợi

**Bài tập chính thức.** Kết quả tính theo quy ước trên, dùng để đối chiếu thao tác.

| Khóa | Bản mã dự kiến |
| --- | --- |
| 3 | DWWDFNDWGDZQ |
| 5 | FYYFHPFYIFBS |
| 7 | HAAHJRHAKHDU |
| 13 | NGGNPXNGQNJA |

**Ví dụ tự soạn.** Ba cặp để thử trước khi tự ra đề là HELLO với 2 → JGNNQ, SCHOOL với 4 → WGLSSP, LIBRARY với 9 → URKAJAH. Dịch ngược với từng khóa sẽ phục hồi bản rõ. Khi trao đổi trong lớp, gửi bản mã và quy ước ký tự, giữ khóa làm đáp án kiểm tra.

## Cách tự kiểm tra

Giải ngược mỗi dòng và so với ATTACKATDAWN. Giữ ảnh ghi rõ khóa và chiều thực hiện. Nếu ký tự A không đi thành D với khóa 3, kiểm tra xem phần mềm đang dùng bảng chữ cái nào và hộp khóa yêu cầu nhập số hay chữ đại diện.

## Tóm tắt

Với bảng 26 chữ, có 26 dịch chuyển tính cả khóa 0. Số khóa ít khiến Caesar dễ thử hết trên bài tập. Cùng khóa, chế độ mã hóa và giải mã đi theo hai chiều ngược nhau.

## Điểm dễ nhầm

Khóa 13 có tính chất hai lần dịch sẽ về ban đầu do 13 + 13 = 26. Với các khóa khác, vẫn phải dùng phép trừ khi giải theo công thức.

## Trắc nghiệm

### Câu 1

Caesar dịch Z với khóa 3 thành gì?

- A. W
- B. C
- C. D
- D. Z

**Đáp án B.** (25 + 3) mod 26 = 2. **Nhiễu dễ nhầm C.** D là kết quả của A khi dịch 3.

### Câu 2

Giải một dịch chuyển Caesar bất kỳ theo phép nào?

- A. Đảo toàn văn
- B. Trừ độ dịch
- C. Cộng cùng độ dịch
- D. Xóa chữ lặp

**Đáp án B.** Trừ k đảo phép cộng k. **Nhiễu dễ nhầm C.** Cộng tiếp thường không quay về bản rõ.

### Câu 3

Số khóa Caesar khác 0 trên A–Z là bao nhiêu?

- A. 25
- B. 52
- C. 26
- D. 13

**Đáp án A.** Trong 26 dịch có một dịch giữ nguyên. **Nhiễu dễ nhầm C.** 26 bao gồm khóa 0.

## Nguồn

[P03](../SOURCES.md) tr. 1–2 và câu báo cáo 1, 5 ở tr. 4. T03 00:00:05.620–00:01:03.300 và 00:04:03.260–00:05:20.620. VTT nhắc báo cáo Word, có thể kèm PDF. Phần bìa, mục lục và chú thích ảnh được giới thiệu khi nói về bài kiểm tra bảo mật cơ bản khác; có thể dùng làm khuôn. Hướng dẫn thuật toán và tên tệp lấy theo P03. Kết quả là phép tính đối chiếu; thao tác giao diện được diễn giải từ đề.
