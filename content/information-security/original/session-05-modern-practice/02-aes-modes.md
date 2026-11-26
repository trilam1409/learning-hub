# Mã hóa đối xứng và so sánh chế độ

Buổi 5 · TH2B bước 2

## Mục tiêu học

Mã hóa và phục hồi văn bản, ghi đủ tham số để lặp lại, nhận ra mẫu lặp của ECB.

## Kiến thức qua tình huống

| Chế độ | Quan hệ giữa các khối |
| --- | --- |
| ECB | Mỗi khối xử lý độc lập |
| CBC | XOR bản rõ với khối mã trước; khối đầu dùng IV |
| CFB | Phản hồi từ bản mã |
| OFB | Phản hồi từ dòng sinh ra trước XOR |

Các chế độ có thể cần IV hoặc tham số kích thước phân đoạn. Việc chuyển chế độ có thể đổi yêu cầu đệm và đầu ra.

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

## Tóm tắt

ECB làm lộ mẫu lặp. Đảo đúng phép mã hóa với cùng thiết lập thì thu lại văn bản theo byte.

## Điểm dễ nhầm

Chuỗi gõ vào ô mật khẩu và khóa thô là hai dữ liệu có thể khác nhau. Nên theo dõi IV và khóa bằng hai trường riêng.

## Trắc nghiệm

### Câu 1

Trong chế độ nào khối rõ giống nhau cho khối mã giống nhau dưới cùng khóa?

- A. CFB trong mọi trường hợp
- B. OFB trong mọi trường hợp
- C. CBC trong mọi trường hợp
- D. ECB

**Đáp án D.** ECB xử lý khối độc lập. **Nhiễu dễ nhầm C.** CBC phụ thuộc khối mã trước.

### Câu 2

MyStrongKey123 dài bao nhiêu byte ASCII?

- A. 16
- B. 32
- C. 14
- D. 13

**Đáp án C.** Mỗi ký tự là một byte, tổng 14. **Nhiễu dễ nhầm A.** 16 là một độ dài khóa thô hợp lệ.

### Câu 3

Giải CBC cùng khóa cần kiểm thêm gì?

- A. Màu giao diện
- B. Chỉ tên tệp
- C. Thứ tự mở tab
- D. IV và quy ước đệm

**Đáp án D.** IV và padding ảnh hưởng việc khôi phục. **Nhiễu dễ nhầm B.** Tên tệp không quyết định byte giải mã.

## Nguồn

[P05](../SOURCES.md) tr. 2 và câu 7 tr. 4. T05 00:02:20.907–00:03:19.007 hướng dẫn nhập, mã hóa và nộp kèm tệp. Khi thực hiện, giữ dữ liệu chính thức từ P05. Kết quả là phép tính hoặc dự kiến, chưa chạy CrypTool.
