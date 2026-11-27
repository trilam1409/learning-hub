# Va chạm, độ dài digest và báo cáo

Buổi 5 · TH2B bước 7 và tổng kết

> Quy ước đọc: **Theo nguồn** chỉ nội dung/đề của giảng viên đã đối chiếu. **Giải thích bổ sung**, **ví dụ tự soạn** và **đính chính** được ghi riêng. Kết quả tính trong gói đã QA; thao tác/đo CT1 phải quan sát thực tế.

## Mục tiêu học

Nhận diện va chạm trong mô hình đồ chơi, ghi số liệu quan sát và trả lời đủ bảy câu báo cáo.

## Kiến thức qua tình huống

### 1. Bài thực hành đang tìm cặp cùng hash

**Theo nguồn:** P05 tr. 3–4 bước 7; T05 00:05:16.367–00:08:00.167. Tạo th2B_b7A.txt và th2B_b7B.txt có ý nghĩa đối lập, khảo sát số bit có nghĩa và loại ký tự biến đổi. Trang [tính năng CT1](https://www.cryptool.org/en/ct1/features/) mô tả mục này là tạo va chạm theo hiệu ứng sinh nhật. Không đồng nhất mọi kiểu “tấn công hash” thành giải mã hash.

**Phân biệt quan trọng:** tìm một biến thể của B trùng với hash của **một A đã ấn định** là bài tiền ảnh thứ hai; tạo nhiều biến thể của cả A và B để tìm một cặp trùng là bài va chạm giữa hai tập. Giữ nguyên hai thông điệp rồi chỉ so hash không phải đang tìm va chạm.

### 2. Vì sao giảm bit làm dễ thấy hiện tượng?

Nếu chỉ xét n bit đầu digest, chỉ có 2^n giá trị. Với nhiều mẫu, số cặp để so tăng nhanh. Va chạm lý tưởng có bậc khoảng 2^(n/2); tìm một giá trị đích cố định có bậc khoảng 2^n. Va chạm trên 16 bit đầu **không phải** va chạm toàn bộ MD5 128 bit hay SHA-256 256 bit.

| Số bit xét | Bậc 2^(n/2) cho va chạm |
| --- | --- |
| 16 | 256 |
| 20 | 1.024 |
| 28 | 16.384 |
| 32 | 65.536 |
| 48 | 16.777.216 |
| 64 | 4.294.967.296 |
| 128 | 18.446.744.073.709.551.616 |

Đây là quy mô lý thuyết, chưa nhân tốc độ, cấu trúc tìm và bộ nhớ; không phải số lần hay thời gian đo của CT1. Không cần chờ hàng năm để hoàn thành bảng báo cáo: T05 nói chụp thông báo ước lượng khi thời gian quá dài, phân biệt rõ ước lượng và đã chạy xong.

### 3. Thực hiện đúng yêu cầu mà không bịa số đo

1. Lưu hai bản gốc, ghi encoding và kích thước byte. Dùng thông điệp giả lập của chính mình; không dùng hợp đồng thật.
2. Mở mục Attack on the Hash Value of the Digital Signature theo đề; chọn hai tệp và Options. Tên/menu có thể khác phiên bản; ghi đường dẫn thực tế nếu tìm được.
3. Chọn thuật toán hash, số bit xét và cách biến đổi. Đề nêu 16,20,28,32,48,64,128 và hai nhóm Printable/Unprintable; đây là **bit**, được T05 00:07:28.967–00:07:29.607 xác nhận.
4. Với mỗi cấu hình ghi: đã chạy xong/dừng/chỉ ước lượng/lỗi/chưa chạy; thời gian thực, thời gian ước lượng, số phép thử nếu có, số byte hai tệp, nội dung nhìn thấy và khác biệt byte.
5. Nếu tìm được cặp, băm lại độc lập và kiểm đúng số bit được chọn; lưu cả tệp đầu ra và ảnh. Cùng hình nhìn thấy không có nghĩa cùng byte khi có ký tự không hiển thị.
6. Điền đủ **14 dòng**. Một dòng “chưa chạy” trung thực tốt hơn một thời gian giả. Không thay việc khảo sát CT1 bằng một mô hình đồ chơi rồi báo đã xong công cụ.

### 4. Hai mức ví dụ tự học

**Mức 1, tính tay:** Htoy(M)=tổng byte mod16. AB và BA đều cho (65+66) mod16=3; đó là va chạm 4 bit của hàm đồ chơi yếu.

**Mức 2, tái lập độc lập:** tệp [hash_demo.py](/information-security/practice/hash_demo.py) sinh biến thể hai thông điệp mẫu, tìm cặp trùng **16 bit đầu SHA-256**, lưu byte và digest vào kết quả đi kèm. Dữ liệu được giới hạn cho bài học; đây không phải chạy CT1, không tạo va chạm SHA-256 đầy đủ và không giả mạo chữ ký thật.

### 5. Trả lời bảy câu bằng cơ chế

Các câu chính thức và gợi ý ngắn được giữ bên dưới. Khi viết đầy đủ, cần nói rõ:

- Đối xứng dùng bí mật chung; bất đối xứng có cặp khóa với vai trò theo tác vụ, không phải “cứ có hai khóa là tự xác thực mọi thứ”.
- Hash là dấu kiểm đối chiếu; đầu ra mất thông tin nên không khôi phục duy nhất bản gốc, nhưng độ khó tìm tiền ảnh còn cần thuộc tính mật mã.
- Avalanche làm thay đổi lan rộng, không buộc mọi bit đổi và không chứng minh hết an toàn.
- Khóa riêng kiểm soát năng lực ký; khóa công khai dùng kiểm. Hash và public key một mình không đủ để tạo chữ ký người khác.
- RSA có giới hạn khối/padding và chi phí; hệ lai xử lý tệp lớn bằng đối xứng.
- Ký phục vụ nguồn gốc/toàn vẹn; mã hóa phục vụ bí mật. Cần cả hai nếu yêu cầu cả hai.
- ECB lộ mẫu vì cùng khối rõ và cùng khóa cho cùng khối mã.

### Bài tập tự luyện có lời giải

**Đề:** quan sát hai tệp cùng 16 bit digest đầu. Có thể kết luận chữ ký RSA-PSS/SHA-256 trên một tệp cũng hợp lệ trên tệp kia không? Không. Chữ ký thật kiểm đầy đủ thông điệp theo thuật toán; trùng 16 bit của 256 bit không đủ. Bài cắt ngắn chỉ minh họa vì sao độ dài so sánh quan trọng.

**Đề:** báo cáo 128 bit hiện “estimated 3 years”, chạy 30 giây rồi dừng. Viết thế nào? “Chạy 30 giây, chưa tìm được cặp; công cụ ước lượng 3 năm tại thời điểm chụp; không có thời gian hoàn thành thực tế”. Không ghi “mất 3 năm để tìm được”.

**Kết thúc TH2B:** báo cáo TH2B_họtên_mssv.docx; tệp b2,b3,b4,b5,b6,b7A,b7B cùng kết quả; ảnh và bảng 14 dòng; đủ bảy câu trả lời. T05 00:03:27.167–00:03:37.223 nói nộp báo cáo và ZIP tệp. Deadline là thông báo lớp hiện hành, không lấy các câu nhận dạng giờ/phút mâu thuẫn ở cuối transcript làm lịch mới.

## Công thức và cách áp dụng

**Kiến thức bổ sung.** Với đầu ra đều và độc lập, xác suất trùng đối với hai đầu ra ngẫu nhiên là 1/2^n. Khi dùng nhiều mẫu và xét mọi cặp, mốc lý thuyết có bậc khoảng 2^(n/2) mẫu. Đây là xu hướng mô hình, không suy ra được thời gian hay số lần thử của công cụ trên máy cụ thể.

## Bài tập chính thức

Bước 7 yêu cầu **th2B_b7A.txt** (văn bản thật) và **th2B_b7B.txt** (văn bản giả mạo), dùng mục **Attack on the hash value of the Digital Signature**. Đề nêu **16, 20, 28, 32, 48, 64, 128** với cả **Printable character** và **Unprintable character**. Báo cáo thống kê, độ dài tệp và quan sát nội dung. T05 tại 00:07:28.967–00:07:29.607 xác nhận đơn vị bit. Đối chiếu thêm nhãn ở giao diện.

## Công cụ và dữ liệu đầu vào

Để tự kiểm hiện tượng, dùng bảng tính hoặc giấy với AB và BA. Đối với cấu hình chính thức, dùng bảng báo cáo ghi quan sát của bài trên lớp.

## Các bước thực hiện

1. Đặt H_toy(M) bằng tổng byte ASCII mod 16. Tính từng mẫu và ghi hai cột bản rõ/digest.
2. Chuẩn bị 14 dòng báo cáo, mỗi dòng một độ dài và một loại ký tự. Điền tên phiên bản, giá trị, đơn vị, trạng thái, số liệu thực tế, độ dài và ghi chú nội dung cho hai tệp.
3. So xu hướng theo hai loại ký tự. Đánh dấu nếu thiếu số liệu. Phần tự học minh họa va chạm bằng hàm đồ chơi; yêu cầu dùng công cụ được giữ ở mục đề bài.

| Giá trị trong đề | Loại ký tự | Cột cần ghi |
| --- | --- | --- |
| 16, 20, 28, 32, 48, 64, 128 | Printable character | Đơn vị, trạng thái, thống kê, byte A/B và khác biệt nội dung |
| 16, 20, 28, 32, 48, 64, 128 | Unprintable character | Đơn vị, trạng thái, thống kê, byte A/B và khác biệt nội dung |

## Cách tự kiểm tra

Kiểm đủ 14 cấu hình. Với mô hình mẫu, xác nhận hai chuỗi khác ở mức byte, digest giống và nằm trong 0–15.

## Ví dụ có lời giải và kết quả mong đợi

**Ví dụ tự soạn.** AB và BA có hai byte 65 và 66 ở thứ tự khác. Cả hai cho (65 + 66) mod 16 = 3. Mô hình đã tạo va chạm trên đầu ra 4 bit. Kết quả size, thời gian và thống kê CrypTool cần lấy từ quan sát thật.

## Bài tập chính thức · Bảy câu báo cáo

| Câu | Cách giải thích |
| --- | --- |
| 1. Khác nhau giữa đối xứng và bất đối xứng? | Đối xứng dùng bí mật chung. Bất đối xứng dùng cặp public/private với vai trò theo tác vụ. |
| 2. Hash dùng làm gì, vì sao khó đảo? | Tạo digest để kiểm toàn vẹn có tham chiếu. Nhiều đầu vào có thể chung một digest, còn tìm được một tiền ảnh đối với hàm mật mã phải khó. |
| 3. Vì sao sửa một ký tự làm digest đổi mạnh? | Các vòng khuếch tán thay đổi đầu vào qua nhiều bit, gọi là avalanche. |
| 4. Vì sao chữ ký số cần private key? | Người ký kiểm soát khả năng tạo chữ ký; người nhận chỉ cần public key để kiểm. |
| 5. RSA có dùng để mã hóa file lớn không? | Mỗi lượt RSA có giới hạn kích thước và padding. Hệ lai dùng mã đối xứng cho tệp, bảo vệ khóa phiên bằng cơ chế khóa công khai. |
| 6. Chữ ký khác mã hóa thế nào? | Chữ ký hỗ trợ nguồn gốc và toàn vẹn. Mã hóa phục vụ bí mật. |
| 7. ECB yếu ở điểm nào? | Các khối rõ lặp cho khối mã lặp dưới cùng khóa. |

## Điểm dễ nhầm

Tiền ảnh bắt đầu từ digest cố định. Va chạm cho phép hai đầu vào khác nhau bất kỳ.

## Trắc nghiệm

### Câu 1

Hai đầu vào khác nhau có cùng digest gọi là gì?

- A. Tiền ảnh với mọi trường hợp
- B. Chữ ký
- C. Va chạm
- D. Giải mã

**Đáp án C.**

- **A:** Tiền ảnh bắt đầu với digest đích, không phải tên của mọi cặp như vậy.
- **B:** Không có thao tác ký bằng khóa riêng.
- **C:** Đúng: đây là định nghĩa va chạm.
- **D:** Không phục hồi bản gốc qua khóa.

### Câu 2

Digest n bit có tối đa bao nhiêu giá trị?

- A. n
- B. 2^n
- C. 2n
- D. n!

**Đáp án B.**

- **A:** n là số vị trí bit.
- **B:** Đúng: mỗi bit hai khả năng.
- **C:** Đây là tăng tuyến tính, không phải số chuỗi bit.
- **D:** Hoán vị không phải phép đếm chuỗi nhị phân.

### Câu 3

Bảy độ dài và hai kiểu ký tự cần bao nhiêu cấu hình?

- A. 7
- B. 9
- C. 128
- D. 14

**Đáp án D.**

- **A:** Mới đếm một kiểu ký tự.
- **B:** Cộng hai số thay vì nhân tổ hợp.
- **C:** 128 là một mức bit trong đề.
- **D:** Đúng:7×2=14.

## Nguồn và mức xác minh

- [P05](../SOURCES.md), trang dẫn đầu 3; phạm vi chi tiết ghi cạnh từng mục và trong [bảng đối chiếu](../SOURCE_COVERAGE.md). Trang tính từ 1, kể cả bìa.
- [T05](../SOURCES.md) 00:05:16.367–00:08:00.167. Dùng cho nội dung lời giảng tương ứng; transcript có lỗi nhận dạng, không thay thế âm thanh gốc.
- Đã đọc bản PDF/VTT cục bộ và đối chiếu lại trong đợt 27/11/2026; không kế thừa trạng thái “đã đọc” của metadata cũ. Ví dụ số là kết quả tái tính; không là số liệu giao diện CT1.

## Tóm tắt cuối bài

Phân biệt mô hình, kết quả dự kiến và thống kê đã đo. Report nên cho biết đúng nhóm ký tự, thiết lập và đơn vị.

**Tự kiểm trước khi qua bài:** giải thích bằng lời của mình, làm lại một ví dụ không nhìn đáp án và chỉ ra điều kiện/giới hạn của kết luận.
