# Mã hóa theo cặp với Playfair và theo nhóm với Hill

Buổi 2 · Ma trận ký tự và phép nhân ma trận

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Thực hiện một lượt tra Playfair và một phép tính Hill. Kiểm tra điều kiện đảo của khóa Hill.

## Kiến thức qua tình huống

### 1. Playfair: tạo bảng trước, chia cặp sau

**Theo nguồn:** P02 tr. 31–34; T02 00:50:06.242–01:08:41.651 tập trung Playfair. Tr. 31 cho bảng 5×5 hoặc biến thể 6×6; bài này dùng 5×5, A–Z, gộp J vào I. Mỗi chữ khóa chỉ được ghi lần đầu; điền chữ còn thiếu theo thứ tự.

Với khóa minh họa TRILAM, bảng là:

```text
T R I L A
M B C D E
F G H K N
O P Q S U
V W X Y Z
```

**Bổ sung quy tắc chuẩn bị cặp:** bỏ trắng, chuẩn hóa chữ, lấy hai chữ từ trái sang phải. Nếu trùng nhau trong cặp đang xét, chèn X sau chữ thứ nhất và xét lại chữ thứ hai ở lượt tiếp. Nếu chữ lẻ cuối thì đệm X. Nếu chữ cần tách chính là X, ví dụ XX, bài dùng Q thay thế và ghi rõ đây là quy ước minh họa.

### 2. Ba trường hợp, ba cách tra

| Trường hợp | Mã hóa | Giải mã | Ví dụ trên bảng TRILAM |
| --- | --- | --- | --- |
| Cùng hàng | Mỗi chữ sang phải một ô, vòng về đầu | Sang trái một ô | TR → RI |
| Cùng cột | Mỗi chữ xuống một ô, vòng lên đầu | Lên một ô | MF → FO |
| Khác hàng và cột | Giữ hàng của từng chữ, lấy cột của chữ kia | Làm lại phép đổi cột | AP → RU |

Ví dụ NH: N ở hàng 3 cột 5, H ở hàng 3 cột 3 là **cùng hàng**, nên N đi vòng về F, H sang K, cho FK. Với hình chữ nhật AP: A ở hàng 1 cột 5, P ở hàng 4 cột 2 → R và U, thành RU. Phải phân loại tọa độ trước khi tra, sau đó mới áp dụng đúng quy tắc.

### 3. Lời giải mẫu cho đề PDF

P02 tr. 73: M = NHAP MON BAO DAM VA AN NINH THONG TIN, khóa là họ tên sinh viên. Với **TRILAM là khóa tự soạn**, cặp chuẩn bị là:

```text
NH AP MO NB AO DA MV AX AN NI NH TH ON GT IN
FK RU FV GE TU EL FT IZ EU HA FK IF UF FR AH
```

Hai chữ A ở phần VA AN cần tách vì rơi vào cùng cặp đang xét; X không chỉ dùng ở cuối. Bản mã **FKRUFVGETUELFTIZEUHAFKIFUFFRAH**. Giải mã khôi phục chuỗi đã chuẩn bị có đệm, sau đó đối chiếu bản gốc để nhận vị trí X được chèn. Không xóa mọi X một cách máy móc, vì X có thể là chữ thật.

T02 dùng bản rõ khác khi giao bài: TRUONG DAI HOC CONG NGHE THONG TIN. Với bảng trên, bản mã minh họa **RIOPFHELCQQMMQFHFHNCIFUFFRAH**. Đây là phiên bản riêng. P02 tr. 34 còn có ví dụ PLAYFAIR/THANH PHO HO CHI MINH; bảng và cách đệm được giữ ở mục ví dụ bên dưới.

### 4. Hill: thay cả vector bằng đại số

**Theo slide:** P02 tr. 35–38. **Mức lời giảng:** T02 00:50:06.242 trở đi nói bỏ qua phần Hill trên lớp và để tự học. Vì vậy phần hướng dẫn tính chi tiết dưới đây là bổ sung từ nội dung slide, không ghi là giảng viên đã giải trên lớp.

Hill cần một ma trận khóa vuông có nghịch đảo modulo 26. Theo quy ước slide: A = 1, …, Z = 26 (số dư 0 đọc Z), vector là cột. Với H có hai hàng (3,3), (2,5) và AB là cột (1,2):

```text
c1 = 3×1 + 3×2 = 9  → I
c2 = 2×1 + 5×2 = 12 → L
```

Để giải, tính định thức det(H) = 3×5−3×2 = 9. Vì gcd(9,26)=1 và 9×3=27 ≡1, nghịch đảo định thức là 3.

```text
H⁻¹ = 3 × [ 5  −3 ] mod 26 = [15 17]
           [−2   3 ]          [20  9]

p1 = 15×9 +17×12 =339 ≡1 → A
p2 = 20×9 + 9×12 =288 ≡2 → B
```

Định thức khác 0 trong số thực chưa đủ. Ví dụ ma trận đường chéo 2,1 có định thức 2; gcd(2,26)=2 nên không có nghịch đảo modulo 26.

### Bài tập tự luyện có lời giải

**Đề:** trên bảng TRILAM, mã TR và AP. TR cùng hàng → RI; AP hình chữ nhật → RU. Giải RI sang trái → TR; đổi cột RU → AP. Viết tọa độ là cách tự kiểm tra tốt hơn nhớ bản mã.

**Đề Hill:** dùng H của ví dụ, mã BA = (2,1). C = (9,9) = II. Giải II: (15×9+17×9,20×9+9×9) = (288,261) ≡(2,1), đúng BA. Phép nhân không đổi chiều tùy ý: vector hàng và vector cột là hai thiết lập khác nhau.

## Công thức và cách áp dụng

C = HP mod 26 và P = H^(-1)C mod 26 với Hill. H là ma trận vuông khóa, P và C là vector cột. H đảo được khi gcd(det H, 26) = 1. Theo slide tr. 35, A = 1 đến Z = 26, dư 0 đọc là Z.

## Bài tập chính thức

Slide tr. 73 dùng **NHAP MON BAO DAM VA AN NINH THONG TIN** và khóa là họ tên sinh viên; lập ma trận, trình bày mã hóa và giải mã. Tên tệp hai bài ở tr. 73 là **Bài tập 1A - Họ tên_mssv.doc**. T02 ở đoạn nêu trên dùng **Trường Đại học Công nghệ Thông tin** làm bản rõ. Slide tr. 72 còn nêu bài viết ứng dụng cho hai trong Vigenère, Hill, Affine, Playfair, Solitaire. Trạng thái giao bài này cần xem yêu cầu lớp.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** H có hai hàng (3, 3), (2, 5). AB là (1, 2). Nhân được (9, 12), tức IL. Định thức bằng 9 có nghịch đảo 3, nên H^(-1) có hai hàng (15, 17), (20, 9) modulo 26. Nhân với (9, 12) cho (339, 288), lấy dư (1, 2), trở lại AB.

**Ví dụ từ giảng viên** (P02 tr. 33–38). Với khóa Playfair và bản rõ THANH PHO HO CHI MINH, hình tr. 34 tách cặp đầu thành TH và cặp cuối là HX có đệm. Với Hill, ảnh sinh khóa dùng hai hàng (17, 6), (23, 25). Vector của TH là (20, 8); tích theo modulo 26 là (24, 10), tức XJ. Hình tiếp theo nhân XJ với ma trận nghịch đảo để thu lại TH.

## Điểm dễ nhầm

Định thức khác 0 chưa đủ để đảo được modulo 26. Cần thống nhất quy ước số của mỗi chữ trước khi so đáp án.

## Trắc nghiệm

### Câu 1

Khóa Hill cần thỏa điều kiện nào?

- A. Ma trận vuông có det khác 0 trên số thực là đủ
- B. Ma trận vuông khả nghịch modulo 26
- C. Mọi phần tử đều nguyên tố
- D. Mọi phần tử khác 0

**Đáp án B.**

- **A:** Định thức còn phải nguyên tố cùng 26.
- **B:** Đúng: cần H nghịch đảo để giải.
- **C:** Không có yêu cầu từng phần tử nguyên tố.
- **D:** Phần tử khác 0 không bảo đảm cả ma trận đảo được.

### Câu 2

Trong Playfair, hai chữ khác hàng và cột được mã bằng cách nào?

- A. Dịch cả hai sang phải
- B. Dịch cả hai xuống
- C. Giữ hàng, đổi cột
- D. Đảo thứ tự hai chữ gốc

**Đáp án C.**

- **A:** Sang phải là trường hợp cùng hàng.
- **B:** Xuống là trường hợp cùng cột.
- **C:** Đúng: lấy hai góc còn lại trên hàng tương ứng.
- **D:** Đảo chữ không thực hiện quy tắc hình chữ nhật.

### Câu 3

Với quy ước Hill A=1,…,Z=26, số dư 0 đọc là gì?

- A. A
- B. Khoảng trắng
- C. X
- D. Z

**Đáp án D.**

- **A:** A=0 là quy ước khác.
- **B:** Không gán khoảng trắng vào 0 trong ví dụ này.
- **C:** X có giá trị 24.
- **D:** Đúng: 26 đồng dư 0 modulo 26.

## Nguồn và mức xác minh

- [P02](../SOURCES.md), trang dẫn đầu 31; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T02](../SOURCES.md) 00:50:06.242–01:08:37.061. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

Playfair tra tọa độ, Hill dùng đại số modulo và ma trận đảo được.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
