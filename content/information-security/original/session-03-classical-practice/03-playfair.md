# Playfair và quy tắc chia cặp

Buổi 3 · Chủ đề ma trận 5×5, chữ đôi và ký tự đệm

## Mục tiêu học

- Lập bảng theo khóa, chuẩn bị cặp chữ và áp dụng ba quy tắc thay thế.
- Phân biệt hai chữ giống nằm cùng cặp với hai chữ giống nằm khác cặp.

## Kiến thức qua tình huống

Playfair mã hóa từng cặp chữ. Vì cùng một chữ có thể đi với các chữ thứ hai khác nhau, hãy tách cặp trước khi tra bảng. Bài chính thức có chuỗi MEET, nhưng nếu bắt đầu tách từ đầu từ, hai chữ E nằm ở hai cặp ME và ET.

## Công thức và cách áp dụng

**Kiến thức bổ sung.** Ghi khóa đã bỏ trùng, rồi bổ sung các chữ còn thiếu. Mẫu này gộp J vào I, bỏ ký tự ngoài A–Z, dùng X để tách chữ trùng cùng cặp và đệm chữ cuối, dùng Q nếu cần tách XX. Với chỉ số hàng và cột 0–4, cùng hàng dịch cột (c + 1) mod 5, cùng cột dịch hàng (r + 1) mod 5. Khác hàng và cột thì giữ hàng, đổi cột giữa hai chữ. Giải mã dùng −1 ở hai phép dịch và giữ quy tắc hình chữ nhật.

## Bài tập chính thức

Dùng **SECRETKEY**, ghi ma trận 5×5, nhập **MEET ME AT THE BRIDGE**, quan sát xử lý chữ đôi và giải mã. Thử thêm một khóa khác với bản rõ dài hơn.

## Công cụ và dữ liệu đầu vào

CrypTool 1, khóa SECRETKEY và bản rõ chính thức. Đối với bài mở rộng, dùng khóa và văn bản tự chọn. Chụp hoặc ghi lại bảng ký tự, cách gộp chữ, loại ký tự đệm và cách xử lý khoảng trắng nếu giao diện có các lựa chọn đó.

## Các bước thực hiện

1. Chọn Encrypt → Playfair theo đề, nhập khóa và đối chiếu ma trận. Ghi quy ước của phiên bản đang dùng.
2. Bỏ khoảng trắng và chia từ trái sang phải. Khi gặp hai chữ trùng sắp nằm trong cùng cặp, chèn đệm sau chữ thứ nhất và xét lại chữ thứ hai ở cặp tiếp theo.
3. Mã hóa, giải lại và đối chiếu cả bản đã chuẩn bị. Thử thêm mẫu có chữ trùng trong cùng cặp để kiểm tra quy tắc chèn X.
4. Đổi khóa rồi lặp lại với văn bản dài hơn, ghi ma trận và kết quả cho báo cáo.

## Ví dụ có lời giải và kết quả mong đợi

**Bài tập chính thức.** Theo quy ước bài này, ma trận cho SECRETKEY là

~~~text
S E C R T
K Y A B D
F G H I L
M N O P Q
U V W X Z
~~~

Bản rõ cho các cặp **ME ET ME AT TH EB RI DG EX**. Ví dụ M và E tạo hình chữ nhật, cho N và S. Bản mã tính được **NSCSNSDCCLRYBPYLRV**. Giải ngược cho MEETMEATTHEBRIDGEX. X cuối là đệm theo vết chia cặp.

**Ví dụ tự soạn.** Với **MONARCHY** và **BALLOON CROSSES THE BRIDGE**, các cặp bắt đầu **BA LX LO ON**. Đoạn LL cần đệm vì rơi vào cùng cặp lúc đang tách. Kết quả tính theo cùng quy ước là **IBSUPMNADMAPLITLCFDAKBIF**.

## Cách tự kiểm tra

So số ký tự bản mã với số cặp nhân hai. Kiểm tra bằng tay một cặp cùng hàng, như ET → CS, và một cặp hình chữ nhật, như ME → NS. Nếu công cụ ra chuỗi khác, so ma trận và bản rõ chuẩn hóa trước khi kiểm tra phép tra cặp. Giữ X trong bản giải thô và quyết định chữ nào là đệm bằng đối chiếu bản gốc.

## Tóm tắt

Chia cặp trước khi tra ma trận. Chữ đôi cần đệm khi nằm ngay trong cùng một cặp. Hàng, cột và hình chữ nhật có quy tắc riêng.

## Điểm dễ nhầm

MEET theo quy ước ở đây cho ME ET. Quan sát đó và một mẫu như BALLOON giúp trả lời đầy đủ vì sao chữ đôi đôi khi có X và đôi khi không.

## Trắc nghiệm

### Câu 1

Theo quy ước bài, MEET chia thành cặp nào?

- A. MX EE TX
- B. M E E T
- C. EE MT
- D. ME ET

**Đáp án D.** Hai chữ E nằm ở hai cặp. **Nhiễu dễ nhầm A.** Chèn X chỉ khi trùng trong cùng cặp đang xét.

### Câu 2

Cặp cùng hàng khi mã hóa thì dịch hướng nào?

- A. Lên
- B. Trái
- C. Phải
- D. Xuống

**Đáp án C.** Mã hóa cùng hàng dùng ô bên phải. **Nhiễu dễ nhầm B.** Giải mã cùng hàng đi trái.

### Câu 3

Điều gì trực tiếp quyết định chỗ chèn đệm?

- A. Tên tệp
- B. Độ dài từ khóa
- C. Số hàng của ma trận
- D. Vết chia cặp

**Đáp án D.** Xem hai chữ trùng cùng cặp và chữ lẻ cuối. **Nhiễu dễ nhầm B.** Khóa dùng cho bảng tra, không quyết định vị trí đệm.

## Nguồn

[P03](../SOURCES.md) tr. 3 và câu báo cáo 3, 5 ở tr. 4. Quy tắc chi tiết và các bản mã là phần diễn giải và tính toán. T03 00:04:03.260–00:05:20.620 giới thiệu TH2A; không có thêm chỉ dẫn cụ thể cho thuật toán của bài này.
