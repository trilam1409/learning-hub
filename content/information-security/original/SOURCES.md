# Danh mục nguồn và quy ước dẫn

Kiểm tra ngày **27/11/2026**, giờ Việt Nam. Trang PDF là số thứ tự từ 1, kể cả bìa; timestamp là vị trí trong VTT. Viết `[P02 tr. 35–38]` hoặc `T02 00:50:06.242` trong bài để người đọc tra bản nguồn có cùng mã. Không dùng số trang in trong slide thay cho số trang PDF.

## Tài liệu môn học thực sự được đọc

| Mã | Tên bản sao đã đọc | Quy mô | SHA-256 |
| --- | --- | --- | --- |
| P01 | Bài 1 - Tổng quan (Buổi 1).pdf | 89 trang | `36383273b097f45a7012d9aa75f44c897d7321425b26667f2cea1c011bd03dc5` |
| P02 | Bài 2A - Các giải thuật mã hoá (Buổi 2).pdf | 75 trang | `0309a6c2888b628a0184aeb03b79c517060270bf474f0c304498f49307260233` |
| P03 | Bài 2A - Mã hoá cổ điển (Buổi 3).pdf | 4 trang | `0529b1446a7db7e59964e3cd70351648481b7f12878c2a25e5a401cd2625aee2` |
| P04 | Bài 2B - Chứng thực dữ liệu(Buổi 4).pdf | 56 trang | `1b468fa498b4cc3ae72a491ac1b01503a3d217a5a5c4c58d5cf99edc8f3a499b` |
| P05 | Bài 2B - Mã hoá hiện đại, chứng thực, chữ ký số (Buổi 5).pdf | 4 trang | `6a33cf34f184c175bc993a8a6cad2fef7615faadb96d66fda0cd10ba0622024b` |
| T01 | Buoi1.vtt | 1281 cue; 00:00:05.246–01:34:05.106 | `1e7c7586e44d7aaf755cd1820b447059d99f6eaf5a68df96fc82fa4830faee50` |
| T02 | Buoi2.vtt | 1469 cue; 00:00:16.851–01:51:18.711 | `0228f0ab6484eda92c36b9a490e044d10159680513ffee9d6ce384bf50a68b2b` |
| T03 | Buoi3.vtt | 185 cue; 00:00:05.620–00:12:18.860 | `fcc8f7db5f2f7c06843d086c9f11e40ae8cd5a013d3b434fced780a643263b27` |
| T04 | Buoi4.vtt | 1300 cue; 00:00:03.674–01:28:12.864 | `d5c0e9e3d6c14ec6082c3dc8af20ac4fddfca5532063aefee068160b53a08603` |
| T05 | Buoi5(1).vtt | 145 cue; 00:00:03.452–00:11:36.187 | `4f5c28e82298656ab5bd233a3aca2334f85e29aaf9ed7ea8f37d7c50a0fe28e3` |

Tên của hai tài liệu thực hành có thể hiển thị “Bài 2A/Bài 2B” ở tên tệp, tương ứng TH2A và TH2B trong yêu cầu. Tổng cộng 228 trang PDF, 4.380 cue VTT đúng buổi. Đã đọc lớp chữ PDF và xem ảnh render toàn bộ trang; hình/bảng trọng tâm được đọc đối chiếu, không cam kết mọi chữ số rất nhỏ trong ảnh được xác minh độc lập. Đọc văn bản VTT, không nghe âm thanh.

## Nguồn gốc và vấn đề phiên bản

Đối chiếu dựa trên các bản sao cục bộ của tài liệu môn học. SHA-256 ở bảng trên cho phép kiểm tra phiên bản khi có nguồn gốc.

Đã tìm thêm bản nguồn tại thư mục môn học ở Desktop và các tệp thực hành ở Downloads. **Buoi5(1).vtt** của bộ nguồn lưu trước đây khớp byte với **Buoi5.vtt** trong bộ bản sao cục bộ; nội dung thực sự là hướng dẫn TH2B. Hai tệp **Buoi5.vtt/Buoi5vtt.vtt trong bộ nguồn lưu trước đây** có cùng hash với Buoi4.vtt (`d5c0e9e3d6c14ec6082c3dc8af20ac4fddfca5532063aefee068160b53a08603`) nên bị loại khỏi dẫn nguồn Buổi 5.

**Chưa xác minh trực tiếp:** không truy xuất được tab Sources của ChatGPT Project để chứng minh tất cả bản sao bằng byte với phiên bản đang lưu ở đó. Không gán trạng thái “đã đọc Project trực tiếp” cho các tệp. Có thể xác nhận sau bằng cách so hash trong bảng, không cần viết lại nội dung chỉ vì tên tệp có dấu khác nhau.

Các bản PDF/VTT đầy đủ không được đóng vào gói nội dung. Dẫn trang/mốc và hash vẫn đủ cho người có nguồn gốc kiểm tra. Các thông báo lớp, lịch cũ và tỷ trọng đánh giá là bối cảnh nguồn, không trở thành quy định hiện hành.

## Nguồn chính thức cho phần bổ sung và đính chính

Những liên kết dưới hỗ trợ đính chính kỹ thuật, không thay thế PDF/VTT môn học. Phần diễn giải và ví dụ do gói tự viết; không được gán thành lời giảng.

| Mã | Nguồn chính thức | Dùng ở đâu và để làm gì |
| --- | --- | --- |
| E01 | [NIST FIPS 197: AES](https://csrc.nist.gov/pubs/fips/197/final) | S2-4/S5-1: khối 128 bit, khóa 128/192/256 bit, vòng 10/12/14; phân biệt word và round key |
| E02 | [RFC 2104: HMAC](https://www.rfc-editor.org/rfc/rfc2104.html) | S4-1: cấu trúc lồng hash với ipad/opad và khóa, khác checksum |
| E03 | [RFC 8017: RSA](https://www.rfc-editor.org/rfc/rfc8017.html) | S2-4/S4-3/S5-4: OAEP, PSS, giới hạn k−2hLen−2; không dùng RSA số học trần cho triển khai |
| E04 | [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) | S1-2: cập nhật hướng dẫn mật khẩu; không yêu cầu đổi định kỳ tùy tiện khi không có dấu hiệu lộ |
| E05 | [NIST: rút SP 800-67 Rev. 2](https://csrc.nist.gov/News/2023/nist-to-withdraw-sp-800-67-rev-2) | S2-4/S5-1: 3DES/TDEA là nội dung lịch sử; không áp dụng bảo vệ mới sau mốc NIST nêu |
| E06 | [RFC 6151: MD5](https://www.rfc-editor.org/rfc/rfc6151.html) | S4-2/S5-3: giới hạn MD5 với yêu cầu chống va chạm |
| E07 | [NIST: chuyển khỏi SHA-1](https://csrc.nist.gov/news/2022/nist-transitioning-away-from-sha-1-for-all-apps) | S4-2/S5-3: phân biệt học phép hash với chọn hash cho chữ ký mới |
| E08 | [RFC 5869: HKDF](https://www.rfc-editor.org/rfc/rfc5869.html) | S4-1: tách khóa theo ngữ cảnh là bổ sung; không nói nguồn đã dạy HKDF |
| E09 | [RFC 5280: chứng chỉ X.509](https://www.rfc-editor.org/info/rfc5280/) | S4-3: phân biệt thuật toán chữ ký CA với thuật toán khóa công khai chủ thể |
| E10 | [CrypTool 1](https://www.cryptool.org/en/ct1/) và [danh mục chức năng](https://www.cryptool.org/en/ct1/features/) | S3/S5: trạng thái phần mềm, chức năng học; không chứng minh đã chạy GUI hoặc xác nhận tên menu mọi bản |
| E11 | [Bruce Schneier: Solitaire](https://www.schneier.com/academic/solitaire/) | S3-5: quy tắc bộ bài và sinh dòng khóa, bổ sung vì P03 chỉ giao dùng công cụ |
| E12 | [NIST SP 800-38A: modes](https://csrc.nist.gov/pubs/sp/800/38/a/final) | S5-2: công thức ECB/CBC/CFB/OFB và vai trò IV; IV cố định/zero chỉ cho thí nghiệm tái lập |
| E13 | [NIST FIPS 180-4: Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | S4-2/S5-3: độ dài digest SHA-2, phân biệt bit và chữ số hex |

Truy cập các nguồn chính thức trong đợt biên soạn 27/11/2026. Gói không tuyên bố đã kiểm mọi niên đại/sự kiện/statistic lịch sử trong slide bằng nguồn ngoài; các giới hạn cụ thể có trong [bảng đối chiếu](SOURCE_COVERAGE.md).
