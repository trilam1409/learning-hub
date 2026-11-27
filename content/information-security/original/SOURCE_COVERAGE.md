# Bảng đối chiếu nguồn và nội dung bàn giao

Trang PDF tính từ 1, gồm trang bìa. Mốc VTT là thời gian bên trong tệp, không là thời lượng buổi học đầy đủ. Các đoạn ghi cả khoảng có thể chứa câu hỏi lớp và nhiễu; phần dẫn trong bài tập trung chủ đề tương ứng. Bảng này được lập sau khi đọc bản nguồn thực tế trong đợt hiện tại, không sao chép trạng thái xác minh của bản website.

Mã bài **S1-1** nghĩa là buổi 1, bài 1 theo [mục lục](TOC.md). Các file nguồn, SHA-256 và giới hạn nguồn gốc xem [SOURCES](SOURCES.md). Sơ đồ trong bài là diễn giải tự vẽ bằng văn bản, không chép hình gốc lên website.

## PDF

| Nguồn/trang | Nội dung đã đối chiếu | Nơi biên soạn | Phân biệt và giới hạn |
| --- | --- | --- | --- |
| P01 1–5 | Tên môn, đánh giá20/30/50, đề cương, bố cục Buổi1 | SOURCES; S1-1 | Giữ bối cảnh, không ban hành lại lịch/điều kiện thi |
| P01 6–11 | Lĩnh vực an toàn thông tin và sơ đồ lĩnh vực | S1-1 | Mô tả bản đồ, không coi mọi nhánh là nội dung đã học sâu |
| P01 12 | Hai trạng thái; bốn yêu cầu CIA + không thể từ chối | S1-1 | Có phân biệt CIA là ba thuộc tính |
| P01 13–17 | Hoạt động Internet/phút, IC3, tuổi, số lượng mã độc | S1-1 | Đọc hình và mốc năm; không xác minh lại dữ liệu thống kê gốc hay coi là số liệu hiện hành |
| P01 18–20 | Thách thức, mối nguy và nhóm tấn công | S1-1, S1-2 | Hình overview được diễn giải theo nhóm; không yêu cầu thuộc mọi nhãn nhỏ |
| P01 21–23 | Nghe trộm, mã hóa, thám mã | S1-2 | Bổ sung điều kiện nghe Wi-Fi, phân biệt thu gói/đọc nội dung |
| P01 24–31 | Bốn đường lấy mật khẩu, ví dụ cũ, bảo vệ | S1-2 | Đính chính mã hóa/băm, HTTPS/SSH, đổi mật khẩu định kỳ |
| P01 32–39 | MITM, replay, SYN flood, TCP hijacking, ARP/frame | S1-2 | Giữ ý tưởng; không khẳng định mọi số nhỏ trong hình TCP là bản ghi phiên thật; đính chính biện pháp ARP |
| P01 40–47 | Intrusion, DoS, Smurf, botnet và SYN-DDoS | S1-2 | Các tên công cụ/case cũ dùng nhận diện; không có thí nghiệm tấn công live |
| P01 48–55 | Virus/worm/Trojan/logic bomb/backdoor/spyware | S1-3 | Cho phép nhãn chồng nhau; sửa suy rộng “Trojan không phá hoại” |
| P01 56–62 | Nhóm tác nhân, quyền tối thiểu, nguy cơ nội bộ | S1-3 | Không xác minh quy kết tác nhân từng sự kiện lịch sử được nhắc |
| P01 63–69 | Kỹ năng, năm pha, thăm dò thụ động/chủ động, ba nhóm thông tin | S1-3 | Bổ sung phần hình bản trước bỏ trống; mô tả mục đích/dấu vết |
| P01 70–77 | Quét, cờ TCP, ảnh công cụ/đường phản hồi | S1-3 | Không suy không phản hồi chắc cổng mở; không xác nhận giao diện hiện tại của các công cụ trong ảnh |
| P01 78–81 | Giành quyền, duy trì, che dấu vết, bảng giai đoạn | S1-3 | Dùng như mô hình nhận diện, không quy mọi sự cố theo đúng một chuỗi |
| P01 82–85 | Bốn thành phần và sơ đồ mã hóa | S1-4 | Tách thành phần với lớp phòng thủ |
| P01 86 | Bảy lớp phòng thủ | S1-4 | Diễn giải đủ bảy lớp bằng cổng nộp bài |
| P01 87–89 | Hạng mục kiểm tra; hai câu bài tập và tên tệp | S1-4; bài tập tổng hợp | Giữ hai yêu cầu; bảng mẫu là lời giải tự soạn |
| P02 1–10 | Khái niệm M,C,ke,kd; sơ đồ hệ mật mã và phân loại | S2-1 | Phân biệt thuật toán/khóa, encoding/mã hóa, thay thế/chuyển vị |
| P02 11–21 | Lịch sử/máy rôto/DES-AES/đối xứng/công khai | S2-1 | Không kiểm độc lập mọi niên đại/case; đính chính các mốc AES bằng NIST |
| P02 22–26 | Nguyên tắc công khai, thay thế26!, hoán vị bậc d | S2-1,S2-2 | Giữ mẫu có khoảng trắng; không suy26! là mức an toàn thực tế |
| P02 27–30 | Caesar, Vigenère và Affine | S2-2 | Tái tính hai mẫu slide, thêm điều kiện gcd và vết tính |
| P02 31–34 | Ma trận Playfair, ba quy tắc, ảnh ví dụ PLAYFAIR | S2-3,S3-3 | Đọc hình, tính lại ví dụ; bổ sung chữ đôi/đệm |
| P02 35–38 | Hill A=1, vector cột, ma trận17/6;23/25 và đảo | S2-3 | Tái tính TH→XJ→TH; Hill là nội dung slide, VTT nói để tự học |
| P02 39–40 | Phân tích tần suất, bảng tiếng Anh | S2-2,S3-2 | Giá trị tham khảo theo ngôn ngữ, không quy mọi mẫu ngắn phải khớp |
| P02 41–48 | Phân loại, DES, cấu trúc16 vòng, lịch sử | S2-4,S5-1 | Đính chính trạng thái 3DES; không đo lại các kỷ lục lịch sử |
| P02 49–57 | AES, state, word/key, các bước và hình | S2-4,S5-1 | Đính chính khóa vòng và số vòng; phân biệt GF(2^8) với modulo 26 |
| P02 58–64 | Vai trò khóa RSA, chữ ký, mô hình máy khách, ví dụ3233, hybrid | S2-4,S4-3,S5-4 | Tái tính123→855→123; lỗi chú thích tr.61 tách riêng; không coi mô hình là toàn bộTLS |
| P02 65–71 | Khả năng tấn công, thời gian vét cạn, ảnh/giới thiệu CT1 | S2-4,S3-1 | Thời gian là mô hình theo tốc độ giả định; trạng thái CT1 kiểm từ nguồn chính thức |
| P02 72–75 | Bài viết ứng dụng2 thuật toán, đề1A, bảng tọa độ1B, kết | S2-2,S2-3; tổng hợp | Giữ các bản đề; không xác nhận bài lập trình72 là bắt buộc ở lần giao cuối trong VTT |
| P03 1 | Mục tiêu, chuẩn bị, tên báo cáo, làm quen menu | S3-1 | Đọc đủ trang; GUI cần kiểm khi dùng phiên bản cụ thể |
| P03 2 | Caesar3/5/7/13;3 bản mã; Vigenère LEMON; IC | S3-1,S3-2 | Tái tính, giữ yêu cầu trao đổi bản mã |
| P03 3 | IC theo nhóm, APPLE/SECRET, Playfair SECRETKEY/MEET, chuyển vị | S3-2,S3-3,S3-4 | IC xấp xỉ; MEET không có chữ đôi trong cùng cặp theo quy ước gói |
| P03 4 | Khóa4312567, hai ví dụ, Solitaire họ tên, năm câu | S3-4,S3-5 | Quy tắc Solitaire là bổ sung, không gán cho PDF |
| P04 1–11 | Mục tiêu chứng thực, yếu tố nhận dạng, OTP, chứng chỉ | S4-1,S4-3 | Phân biệt yếu tố, nguồn gốc, bí mật, bằng chứng |
| P04 12–16 | Ví dụ khóa chung, HMAC, TCPchecksum và hai sơ đồ lỗi | S4-1 | Đính chính HMAC và checksum; không coi checksum bảo đảm chống chủ ý sửa |
| P04 17–21 | Bốn sơ đồ mật mã/khóa/công dụng | S4-1,S4-3 | Mô hình giản lược; sửa nhãn PRb ở tr.20; không dùng mã hóa thường thay xác thực |
| P04 22–27 | MAC và ba sơ đồ ghép | S4-1 | Bảng thao tác cả hai phía, đúng đối tượng tính tag |
| P04 28–32 | Lọc khóa theo MAC, ví dụ80/32, DES-MAC | S4-1 | Tách kỳ vọng khóa sai khỏi bảo đảm; DES-MAC là lịch sử |
| P04 33–39 | XOR16, hai câu va chạm, tính chất, cấu trúc hash | S4-2 | Tái tính55cd; “duy nhất” được đính chính thành khó tìm va chạm |
| P04 40–44 | Sáu sơ đồ công dụng; hình salt | S4-3,S4-2 | Đủ6 biểu thức, luồng nhận và giới hạn; salt không mặc nhiên là bí mật |
| P04 45–49 | MD5, SHA-1/2/3 và ảnh chữT/t | S4-2,S5-3 | Không dùng MD5/SHA-1 làm khuyến nghị chữ ký mới; không xác minh mọi chữ số digest nhỏ trong ảnh tr.46 |
| P04 50–56 | Ký/kiểm, hình có/không mã hóa, ba câu bài tập | S4-3,S5-4; tổng hợp | Sign/Verify thay cách gọi mã hóa đảo chiều; không giả ba chứng chỉ live |
| P05 1–2 | Báo cáo/tệp, nền tảng, bước1–3 | S5-1,S5-2,S5-3 | Giữ dữ liệu đề; hash không chỉ có đầu ra128–256 bit; khóa14 byte được nêu rõ |
| P05 3 | Hash, RSA1024/2048, .sig, tính toàn vẹn, mở bước 7 | S5-3,S5-4,S5-5 | Kỳ vọng Verify và giới hạn; không có số đo tốc độ CT1 |
| P05 4 |7 mức bit×2 loại ký tự, bảy câu và tổng kết | S5-5; tổng hợp | Đủ14 dòng mẫu chưa chạy; không biến bảng lý thuyết thành thống kê đo |

## Transcript

Đã đọc văn bản các cue toàn tệp T01–T05. Bảng dưới cho các vùng nội dung dùng trong review; những đoạn giao tiếp lớp, đợi cài phần mềm, điểm danh và ngày hạn cũ không trở thành kiến thức hoặc lịch mới trong giáo trình.

| Nguồn/khoảng | Nội dung và cách dùng | Giới hạn |
| --- | --- | --- |
| T01 00:00:05.246–00:21:24.449 | Giới thiệu môn, hình thức học, hỏi lớp, bản đồ lĩnh vực | Không ban hành lại phần trăm/điều kiện thi chỉ từ lời nhận dạng; PDF ghi20/30/50 |
| T01 00:21:24.449–00:33:05.423 | Dữ liệu, bốn yêu cầu, biểu đồ và thách thức | Các suy luận tuổi/địa lý được kiểm lại về logic thống kê |
| T01 00:33:05.423–00:47:53.826 | Giới hạn thực hành, nghe trộm, thám mã, mật khẩu, giả mạo | Tên công cụ nhận dạng sai đối chiếu slide; không coi SSH là HTTPS |
| T01 00:47:53.826–01:04:05.626 | Kết nối máy, IP, DoS/botnet và quan sát | Không lặp thí nghiệm DoS lên website thật; vị tríIP chỉ ước lượng |
| T01 01:04:05.626–01:18:51.286 | Mã độc, tác nhân, năm pha | Đính chính suy rộng Trojan/worm; không xác minh quy kết sự kiện lịch sử |
| T01 01:18:51.286–01:34:05.106 |4 thành phần, mô hình chứng khoán,7 lớp, đánh giá và bài tập | Khuôn7 lớp/2 câu được giữ; từ nhiễu cuối như “7 hoa thị” không đưa vào bài như thuật ngữ |
| T02 00:00:16.851–00:25:55.014 | Chủ đề, khái niệm, phân loại, lịch sử, câu hỏi khóa của người nhận | OTP/HTTPS và trao khóa là phần cần tách vai trò |
| T02 00:25:55.014–00:50:06.242 | Thay thế, hoán vị, Caesar/Vigenère, cài CT1, Affine | Quy ước modulo được làm rõ; không suy26! bắt buộc chỉ máy mạnh mới phân tích được |
| T02 00:50:06.242–01:08:41.651 | Nói Hill tự học; giải Playfair từng bảng và chữ | Phần bảng tính bị nhận dạng sai được kiểm từ quy tắc/slide, không khẳng định mọi chữ VTT là đúng |
| T02 01:08:41.651–01:41:49.541 | DES/AES, mô phỏng, RSA/khóa/ký | Phân biệt nhầm từ đối/bất đối xứng và số bit; không biến ví dụ thành thông số thực tế |
| T02 01:42:14.791–01:47:31.916 | Máy khách/server, hybrid, vét cạn, các bảnCrypTool | Minh họa vai trò khóa, không mô tả đầy đủTLS; tốc độ không phải số đo của gói |
| T02 01:48:54.161–01:50:35.731 | Bài tập dùng TRUONG DAI HOC CONG NGHE THONG TIN, họ tên làm khóa | Khác PDF tr.73; giữ phiên bản riêng; tên tệp nghe/nhận dạng chưa đủ chắc để thay PDF |
| T03 00:00:05.620–00:04:02.450 | Báo cáo, winver, mạng/cổng/chia sẻ/antivirus/mật khẩu | Đây là đề kiểm tra bảo mật cơ bản khác; chưa có PDF đề đó trong phạm vi10nguồn |
| T03 00:04:03.260–00:05:20.620 | Giới thiệu TH2A, Word/PDF, đã học cổ điển | Không chứa chỉ dẫn thêm cho từng thuật toán; dùng P03 làm nguồn yêu cầu |
| T03 00:05:27.990–00:12:18.860 | Deadline, các bài thực hành, nộp bài và trao đổi lớp | Không phát sinh deadline hiện hành; có nhiều câu nhận dạng sai |
| T04 00:00:03.674–00:27:00 | Vai trò chứng thực, MAC/hash, yếu tố, checksum, bốn sơ đồ mã hóa | Đính chính mã hóa/hash/checksum và phát biểu về chứng thực |
| T04 00:27:00–00:43:13.584 | MAC và câu hỏi thay khóa chung bằng public/private | Giải yêu cầu bí mật chung; không thay K bằng public key công khai |
| T04 00:43:13.584–00:48:22 | Thứ tự ghép MAC/mã hóa, một hay hai khóa | Lời giảng được tách khỏi đính chính tách khóa và chọn cơ chế chuẩn |
| T04 00:48:22–01:03:02 | Hash/XOR, tính chất, ví dụ phần mềm, sơ đồa/b | Nguồn nhận dạng “modulo” đối chiếu phépXOR trong PDF; khớp hash không đủ nói không virus |
| T04 01:03:02–01:18:53.014 | Chữ ký, thông điệp thay đổi, sơ đồc/d/e/f | Đính chính chữ ký xác định/ngẫu nhiên, K/S/salt và bảo vệ dữ liệu lớn |
| T04 01:20:48.296–01:26:07.264 | Ba câu bài tập, mô hình mới và hướng dẫn vẽ | Lời giải thêm là tự soạn; không tuyên bố an toàn một giao thức tùy ý ghép |
| T04 01:26:07.264–01:28:12.864 | Hướng dẫn tự làm/nộp, kết buổi | Không dùng yêu cầu cũ tạo lịch hoặc điểm số mới |
| T05 00:00:03.452–00:00:25.857 | Đầu tệp có nhiễu nhận dạng | Không suy kiến thức từ các câu này |
| T05 00:00:26.777–00:02:19.087 | Báo cáo/tệp; bước1 mô phỏngDES/AES | Dùng để xác nhận yêu cầu ghi ảnh/giải thích, không là kết quả chạy |
| T05 00:02:20.907–00:05:11.017 | Bước2–6, tên theo bước, ZIP tệp, vai trò khóa | Tên tệp rời rạc ưu tiên P05; giữ hash không tự xác thực |
| T05 00:05:16.367–00:08:00.167 | Bước7,2 thông điệp, kiểu ký tự, bit, thống kê và ước lượng | Mô tả giản lược không xác định đầy đủ fixed-target/hai-tập; đối chiếu tài liệu CT1 |
| T05 00:09:43.567–00:11:36.187 | Hạn nộp và thông báo sau nộp | Giờ/phút nhắc lại không nhất quán; không dùng làm deadline mới |
| T05a/T05b toàn tệp | Cùng SHA-256 vớiT04 | Không dùng làm lời giảng Buổi5 |

## Trạng thái bao phủ

Đủ các nhóm nội dung, bài tập chính thức và dữ liệu được xác định trong năm PDF. Không đồng nhất “đã đưa chủ đề vào bài” với “đã tái hiện từng chữ/ảnh của slide”. Gói không tái bản toàn bộ thống kê, ảnh công cụ và mọi số ở hình nhỏ; những chi tiết không dùng để giải bài được mô tả ở mức mục đích và ghi giới hạn. Mọi ví dụ bổ sung có quy ước và được đưa vào QA phù hợp; mọi số đo chưa có giữ trạng thái chưa chạy.
