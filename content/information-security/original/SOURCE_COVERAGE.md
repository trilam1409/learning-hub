# Ánh xạ nội dung và mức đối chiếu

Các trang chỉ vị trí trong PDF từ 1. Mốc VTT dùng đến mili-giây. VTT có thể có khoảng trống và đoạn nhận dạng sai. Bảng ghi phần đã đối chiếu và giới hạn. [Danh mục nguồn](SOURCES.md) chứa số lượng cue và mốc toàn tệp.

| Nguồn | Trang hoặc mốc | Bài và nội dung | Trạng thái |
| --- | --- | --- | --- |
| P01 | 1–19 | [Dữ liệu và mục tiêu bảo vệ](session-01-overview/01-data-and-security.md) | CIA, không thể từ chối, lưu/truyền; các hình thống kê chưa xác minh hết |
| P01 | 20–47 | [Mối đe dọa](session-01-overview/02-threats-and-controls.md) | Nhận diện, tác động, phòng thủ; hình nhúng chưa xác minh hết |
| P01 | 48–81 | [Mã độc và tác nhân](session-01-overview/03-malware-and-actors.md) | Các loại mã độc và nhóm tác nhân; nội dung ảnh ca tr. 63–81 còn thiếu |
| P01 | 82–89 | [Bốn lớp bảo vệ](session-01-overview/04-defense-in-depth.md) | Đã xem trực tiếp tr. 84–88 và bổ sung các lớp cùng hạng mục đánh giá |
| T01 | 00:21:35.856–00:22:46.964; 00:34:35.790–00:36:23.112; 01:18:51.286–01:21:09.356; 01:33:34.786–01:34:05.106 | Dữ liệu, nghe trộm, botnet, công ty chứng khoán, giải thích bài tập | Tên công cụ và cụm “7 hoa thị” nhận dạng chưa rõ |
| P02 | 1–22 | [Hệ mật mã](session-02-cryptography/01-cryptosystems-and-history.md) | Khái niệm, lịch sử và nguyên tắc thiết kế; hình lịch sử còn thiếu |
| P02 | 22–30, 39–40, 73–74 | [Các phép cổ điển](session-02-cryptography/02-letters-and-modulo.md) | Thay thế, hoán vị, Caesar, Vigenère, Affine, phân tích tần suất và bài trộn tọa độ tr. 74 đã đối chiếu hình |
| P02 | 31–38, 71–74 | [Playfair và Hill](session-02-cryptography/03-playfair-and-hill.md) | Công thức, thực hành và đề có lớp chữ; đã xem hình tr. 33–34, 36–38. Đề tr. 74 dẫn sang bài về bảng tọa độ |
| P02 | 41–70 | [Mã hiện đại](session-02-cryptography/04-modern-ciphers-and-rsa.md) | DES, AES, RSA, mã lai, độ dài khóa; còn hình và bảng nhúng chưa xác minh hết |
| T02 | 00:00:51.411–00:00:55.731; 00:10:21.081–00:10:24.655; 01:42:14.791–01:45:09.401; 01:47:09.671–01:47:31.916; 01:48:54.161–01:50:35.731 | RSA máy khách/máy chủ, hybrid, các bản CrypTool và bài tập | Bản rõ được nói cho hai bài ở cuối khác dữ liệu P02 tr. 73. Tên tệp đọc cuối đoạn và một số con số độ dài khóa bị nhận dạng chưa rõ |
| P03 | 1–2 | [CrypTool và Caesar](session-03-classical-practice/01-cryptool-and-caesar.md) | Chuẩn bị, các menu, khóa 3/5/7/13, ba bản mã trao đổi |
| P03 | 2–3 | [Vigenère](session-03-classical-practice/02-vigenere-ic-kasiski.md) | LEMON, APPLE/SECRET, IC và Kasiski |
| P03 | 3 | [Playfair](session-03-classical-practice/03-playfair.md) | Ma trận 5×5, SECRETKEY, đệm, đổi khóa và văn bản dài |
| P03 | 3–4 | [Hoán vị cột](session-03-classical-practice/04-columnar-transposition.md) | 4312567, phân tích và hai mẫu bổ sung |
| P03 | 4 | [Solitaire và báo cáo](session-03-classical-practice/05-solitaire-and-report.md) | Phần mở rộng họ tên, năm câu báo cáo |
| T03 | 00:00:05.620–00:01:03.300; 00:01:30.140–00:04:02.450; 00:04:03.260–00:05:20.620; 00:07:56.440–00:08:17.940 | Báo cáo, phân biệt hai đề và dự kiến trình tự lý thuyết/thực hành | Phần nói winver, cổng máy, cập nhật và chia sẻ thuộc đề kiểm tra bảo mật cơ bản khác PDF TH2A. Trong gói 10 nguồn không có đề này. Hạn nộp của TH2A trong T03 có đoạn nhận dạng sai, dùng thời hạn trên lớp khi cần |
| P04 | 1–32 | [Chứng thực và MAC](session-04-authentication/01-authentication-and-mac.md) | Nhận dạng, checksum, MAC, khóa và tag; đã xem sơ đồ tr. 23, 26, 32; một số hình khác còn chưa xác minh hết |
| P04 | 33–49, 55 | [Hàm băm](session-04-authentication/02-hash-properties.md) | Tính chất, họ hàm băm và bài so digest ba phần mềm |
| P04 | 40–44, 50–56 | [Chữ ký, chứng chỉ](session-04-authentication/03-signatures-and-certificates.md) | Sáu sơ đồ, ký/xác minh và bài tập; đã xem sơ đồ tr. 40–41, 44, 53–54 |
| T04 | 00:00:03.674–00:00:38.314; 00:43:13.584–00:45:42.224; 01:16:34.674–01:18:53.014; 01:20:48.296–01:23:29.574; 01:24:21.944–01:26:07.264 | MAC, băm, chữ ký, ba bài tập, công cụ vẽ | Tách bối cảnh lời giảng về K1/K2 khỏi kiến thức bổ sung về khóa con. Một số từ chỉ digest và tên Bob nhận dạng chưa rõ |
| P05 | 1–2 | [Vòng DES/AES](session-05-modern-practice/01-des-and-aes-workflow.md), [chế độ AES](session-05-modern-practice/02-aes-modes.md) | Chuẩn bị, báo cáo, bước 1–2 |
| P05 | 2–3 | [Hash và toàn vẹn](session-05-modern-practice/03-hash-and-integrity.md), [RSA và chữ ký](session-05-modern-practice/04-rsa-and-signature.md) | Bước 3–6, tên tệp và tham số chính thức |
| P05 | 3–4 | [Va chạm và báo cáo](session-05-modern-practice/05-hash-collisions-and-report.md) | Bước 7, 14 tổ hợp và bảy câu báo cáo. Phần tự học dùng hàm đồ chơi, giữ yêu cầu và khung báo cáo lớp |
| T05 | 00:00:26.777–00:05:11.017 | Nộp báo cáo và ZIP các tệp văn bản, mô phỏng bước 1, tên tệp và luồng bước 2–6 | Dùng dữ liệu và tên trong PDF khi transcript đọc tên rời rạc |
| T05 | 00:05:16.367–00:08:00.167; 00:09:43.567–00:10:18.387; 00:11:18.837–00:11:36.187 | Bước 7, đơn vị bit, lưu ảnh ước lượng, thông báo sau nộp | Đoạn 00:10:32.997–00:10:37.187 lặp giờ với phút không nhất quán ở nhận dạng. Dùng thông báo lớp; đầu tệp 00:00:03.452–00:00:25.857 có cue nhiễu |
| T05a, T05b | Trùng T04 | Không có lời giảng riêng cho Buổi 5 | Đã xác nhận trùng byte; thay bằng T05 |

## Kiểm tra và giới hạn

- Lớp chữ của 228 trang PDF đã được trích. Việc trích chữ không thay cho xem hết hình nhúng. Hình và ví dụ chưa kiểm tra được đánh dấu trong bảng trên.
- Đã kiểm toàn bộ cấu trúc cue. Đối chiếu ngữ nghĩa theo các khoảng dẫn, gồm toàn bộ nội dung tệp T05, không xác nhận đã kiểm ngữ nghĩa mọi cue của ba transcript lý thuyết dài.
- P02 tr. 61 có câu về tổ hợp khóa bí mật dễ nhầm; bài mô tả vai trò khóa RSA theo tr. 58–61 và đánh dấu điểm đó. Chuỗi khóa ví dụ ở P05 tr. 2 dài 14 byte ASCII; bài ghi giả định và mẫu thay thế cho khóa AES thô.
- Đã kiểm số câu, thứ tự A–D, đáp án và lời giải nhiễu. Kiểm tiêu đề bắt buộc, mốc dẫn có thật trong VTT, liên kết tương đối, giải nén, UTF-8 và nội dung ZIP. Các công thức và ví dụ tính tay kiểm theo quy ước được nêu. Chưa chạy CrypTool, nên không dùng số đo thời gian hoặc kết quả giao diện suy đoán.
