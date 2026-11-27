# Bài tập tổng hợp và lời giải

Đây là lời giải/hướng dẫn học với dữ liệu minh họa. Bài nộp của sinh viên cần thực hiện bằng dữ liệu, khóa họ tên và quan sát của chính mình theo yêu cầu lớp. Không có ảnh CT1 hay số đo chưa chạy được dựng thay kết quả thật.

## Buổi 1: phân tích bảy lớp

**Đề P01 tr.89:** phân tích mô hình bảo mật theo chiều sâu. Lời giải mẫu chọn cổng nộp bài: tài sản là bài làm, điểm, tài khoản và dịch vụ. Chính sách phân quyền/nộp bài bao quanh kiểm soát vật lý phòng máy; vành đai chỉ mở dịch vụ cần thiết; mạng nội bộ tách máy người dùng với cơ sở dữ liệu; máy chủ được vá và giám sát; ứng dụng chỉ cho sinh viên sửa bài của mình; dữ liệu có quyền, sao lưu và mã hóa phù hợp.

**Phân tích một đường sự cố:** bị lộ mật khẩu không có nghĩa mọi dữ liệu đều mất. Xác thực thêm có thể hạn chế đăng nhập; quyền ứng dụng hạn chế phạm vi; giám sát phát hiện dấu hiệu; sao lưu giúp phục hồi khi bị xóa. Tuy nhiên sao lưu không thu hồi được dữ liệu đã bị lộ, nên vẫn cần bí mật và kiểm soát truy cập. Lời giải đủ phải có cả giới hạn và bằng chứng kiểm, không chỉ liệt kê tên lớp.

## Buổi 1: bảng bảy nhóm tấn công

| Nhóm | Cơ chế | Công cụ/chức năng minh họa | Kết quả người gây hại tìm kiếm | Phòng thủ gắn nguyên nhân |
| --- | --- | --- | --- | --- |
| Nghe trộm | Thu lưu lượng trên kênh có thể quan sát | Phân tích gói Wireshark/tcpdump trong phạm vi được phép | Đọc dữ liệu/metadata | Kênh mã hóa có xác thực, kiểm đúng đầu liên lạc |
| Thám mã | Khai thác cấu trúc hoặc thử khóa | Phân tích tần suất/vét cạn trên mẫu cổ điển | Bản rõ hoặc khóa | Cơ chế tốt, tham số đúng, khóa ngẫu nhiên được bảo vệ |
| Lấy cắp mật khẩu | Đoán, từ điển, lừa người dùng, nghe thông tin đăng nhập | Danh sách thử/nhận diện trang giả/quan sát kênh thí nghiệm | Quyền tài khoản | Mật khẩu riêng, kiểm mật khẩu phổ biến/lộ, giới hạn thử, xác thực bổ sung |
| Giả mạo | Nhầm chủ thể/phiên; MITM/replay/giả lớp mạng | Công cụ kiểm phiên, log và cấu hình mạng | Dịch vụ cho kẻ đóng giả | Xác thực đầu liên lạc, bảo vệ phiên, kiểm độ mới/trạng thái |
| Xâm nhập | Lợi dụng lỗi/cấu hình/quyền | Kiểm kê dịch vụ và phân tích lỗ hổng đã được phép | Tài nguyên/quyền trái phép | Vá, bỏ dịch vụ thừa, ít quyền, giám sát |
| DoS/DDoS | Làm cạn tài nguyên; nguồn đơn hoặc phân tán | Bộ đo tải/giám sát và kiểm thử trong môi trường được cấp | Gián đoạn người hợp lệ | Giảm tải, giới hạn hợp lý, dự phòng, phối hợp nhà cung cấp |
| Mã độc | Ngụy trang/lây/kích hoạt/theo dõi/cửa hậu | Bộ quét và môi trường phân tích thí nghiệm | Lấy dữ liệu, duy trì quyền, phá hoại | Kiểm nguồn phần mềm, vá, hạn quyền, phát hiện/cách ly/phục hồi |

Cột công cụ mô tả chức năng, không yêu cầu chạy tấn công lên hệ thống bên ngoài. Bài P01 nêu các công cụ và kỹ thuật lịch sử; lời giải không chứng nhận những công cụ cũ còn phù hợp hiện nay.

## Buổi 2: hai phiên bản bản rõ

PDF P02 tr.73 dùng Vigenère với TRUONG DAI HOC QUOC GIA và Playfair với NHAP MON BAO DAM VA AN NINH THONG TIN; cả hai khóa là họ tên sinh viên, tên bài Bài tập1A. T02 01:48:54.161–01:50:35.731 dùng TRUONG DAI HOC CONG NGHE THONG TIN cho cả hai, tên tệp nhận dạng chưa chắc. Giữ hai bản, theo yêu cầu lớp khi nộp; không chọn im lặng một bản rồi bỏ bản kia.

**Khóa tự soạn TRILAM, không phải khóa chung của lớp:**

| Thuật toán/phiên bản | Bản mã theo quy ước bài |
| --- | --- |
| Vigenère/PDF | MICZNSWRQSOOJLWNGUT |
| Vigenère/VTT | MICZNSWRQSOOVFVRNSAVBSOZZKQY |
| Playfair/PDF | FKRUFVGETUELFTIZEUHAFKIFUFFRAH |
| Playfair/VTT | RIOPFHELCQQMMQFHFHNCIFUFFRAH |

Vigenère A=0, bỏ trắng, lặp khóa qua chữ; Playfair gộp I/J và theo vết đệm. Mọi ký tự của các đáp án này có thể tái tính; quá trình nằm trong hai bài S2-2/S2-3. P02 tr.72 còn yêu cầu mô tả/cài hai thuật toán trong danh sách; trạng thái giao bài đó phải xác nhận ở lớp, không nhập nhầm thành bài VTT chắc chắn đã bắt buộc.

## Buổi 2: bài bảng tọa độ tr.74

Lấy tọa độ từng chữ → nối tất cả chỉ số hàng → nối tất cả chỉ số cột → chia cặp và tra ngược. Dùng đúng bảng nhãn hàng 1,4,2,3,5 và nhãn cột 2,4,5,1,3. Với COMBI: hàng 41342, cột 33211; nối 4134233211; cặp 41,34,23,32,11 cho BNLMW. Với toàn chuỗi35 chữ in trên slide, kết quả BNLLL UPHVI NNUCS OHLMW BDNOI GINUR HCZQI. Không coi nhóm5 chữ trình bày là chu kỳ trộn của toàn ví dụ.

**Bảng so sánh để trả lời yêu cầu thứ hai tr.74:**

| Hệ | Khóa/đơn vị | Ví dụ/cách kiểm | Giới hạn |
| --- | --- | --- | --- |
| Thay thế đơn | Hoán vị26 chữ; mỗi chữ | Kiểm ánh xạ thuận/ngược | Dấu vết tần suất |
| Hoán vị bậc d | Thứ tự d vị trí | ABCDE→DACBE theo 41325 | Giữ chữ và tần suất |
| Caesar | Một dịch | ATTACK,k3→DWWDFN |26 dịch, dễ vét cạn |
| Vigenère | Chuỗi dịch lặp | ATTACKATDAWN,LEMON→LXFOPVEFRNHR | Chu kỳ khóa để lại dấu |
| Affine | Hai số a,b, gcd(a,26)=1 | B→I với 5,3 | Thay thế đơn, khóa nhỏ |
| Playfair | Bảng5×5, cặp chữ | BảngSECRETKEY | Còn thống kê theo cặp; chuẩn hóa mất thông tin |
| Hill | Ma trận đảo được modulo 26 | AB→IL theo H trong bài | Quan hệ tuyến tính, cần điều kiện đảo |
| Solitaire | Thứ tự bộ54 lá sinh dòng khóa | Dãy mẫu4,23,10,… | Nhạy đồng bộ; bộ mẫu công khai chỉ để học |
| DES | Khóa56 bit, khối64 bit | Sơ đồ16 vòng | Lịch sử, khóa không phù hợp bảo vệ mới |
| AES | Khối128 bit, khóa 128/192/256 | Vector một khối của gói | Cần mode/nonce/IV/xác thực đúng |
| RSA | Cặp public/private, modulus |123→855→123 với n = 3233 | Khóa mẫu nhỏ không an toàn; thực tế có padding và giới hạn |

## TH2A: lời giải năm câu báo cáo

1. **Caesar dễ bị phá:** có 26 độ dịch,25 khóa khác0; thử hết và chấm ngôn ngữ. Bằng chứng là bảng 4 khóa và kết quả phân tích trên bản mã do mình tạo. Mẫu quá ngắn có thể mơ hồ.
2. **IC giúp Vigenère:** khi chia đúng chu kỳ, mỗi nhóm dùng cùng độ dịch nên có phân bố gần ngôn ngữ nguồn. Kasiski gợi ý ứng viên, IC kiểm hỗ trợ, giải ngược để xác nhận. Đỉnh ở bội chu kỳ cũng có thể cao.
3. **Playfair và chữ đôi:** chỉ chèn đệm khi hai chữ giống rơi vào cùng cặp đang xét. MEET→ME ET, BALLOON→BA LX LO ON; ghi rõ quy tắc X/Q và giải chuỗi đã chuẩn bị.
4. **Chuyển vị giữ chữ:** chỉ thay đường điền/đọc, không đổi chữ; tần suất giữ nếu không đệm. Ví dụ12 chữ/7 cột có5 cột dài2; giải cần chiều dài theo vị trí vật lý.
5. **So độ an toàn:** phải nêu kiểu tấn công và dữ liệu. Caesar ít khóa; Vigenère khóa lặp có chu kỳ; Playfair che thống kê đơn theo cách khác nhưng vẫn còn cấu trúc; chuyển vị giữ tần suất. Không tuyên bố một thứ tự tuyệt đối cho mọi tham số và không dùng các mã này cho bí mật thực tế.

## Buổi 4: ba bài tập

### Bài 1: ba phần mềm có mã băm

Mẫu thu thập cần điền từ thao tác thật:

| Mẫu | Tên tệp, phiên bản, OS/kiến trúc | URL phát hành/nguồn digest | Thuật toán | Digest tham chiếu/tính lại | Kết luận |
| --- | --- | --- | --- | --- | --- |
|1 | Chưa thu thập | Chưa thu thập | Chưa ghi | Chưa tính | Chưa xác minh |
|2 | Chưa thu thập | Chưa thu thập | Chưa ghi | Chưa tính | Chưa xác minh |
|3 | Chưa thu thập | Chưa thu thập | Chưa ghi | Chưa tính | Chưa xác minh |

**Lời giải mẫu thật trên dữ liệu nhỏ:** th2B_b3.txt của gói có 3 byte abc, SHA-256 bằng ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. Khớp cho biết cùng bộ byte tham chiếu; không chứng minh phần mềm không độc hại. Đây không phải ba bộ cài được yêu cầu và không báo đã hoàn thành phép thu thập đó.

### Bài 2: ba chứng chỉ số

| Mẫu | Tên miền/ngày kiểm | Subject/Issuer, thời hạn | Signature Algorithm | Subject public-key algorithm | Fingerprint | Hàm băm trong phép ký |
| --- | --- | --- | --- | --- | --- | --- |
|1 | Chưa kiểm live | Chưa đọc | Chưa đọc | Chưa đọc | Chưa đọc | Chưa xác minh |
|2 | Chưa kiểm live | Chưa đọc | Chưa đọc | Chưa đọc | Chưa đọc | Chưa xác minh |
|3 | Chưa kiểm live | Chưa đọc | Chưa đọc | Chưa đọc | Chưa đọc | Chưa xác minh |

**Lời giải mẫu giả định:** Signature Algorithm=sha256With RSAEncryption nghĩa là phép ký chứng chỉ phối hợp RSA/SHA-256. Nếu fingerprint hiển thị SHA-384 thì đó là phép nhận diện chứng chỉ theo giao diện, không thay thuật toán CA đã dùng ký. Nếu tên thuật toán không thể tách một hash bên ngoài theo kiểu này, ghi đúng tên và tra đặc tả; không buộc mọi chữ ký đều là RSA.

### Bài 3: mô hình đủ ba mục tiêu

Alice ký M bằng sk_A; gói M và chữ ký được bảo vệ bí mật/xác thực cho Bob; Bob phục hồi gói, kiểm khóa của Alice, Verify rồi kiểm mã giao dịch và xử lý. M bao gồm nội dung cùng ngữ cảnh/mã giao dịch được ký. Khóa dữ liệu có thể do cơ chế lai thiết lập, tệp lớn dùng đối xứng. Ưu là tách mục tiêu và vai trò; nhược là cần quản lý khóa, chứng chỉ, trạng thái chống lặp và chứng cứ. Không tuyên bố sơ đồ tự ghép là một giao thức triển khai đã được chứng minh.

## TH2B: bảy câu báo cáo

1. **Đối xứng/bất đối xứng:** bí mật chung so với cặp khóa; chủ sở hữu khóa và vai trò theo mã hóa hay ký. AES cho tệp; RSA cho tác vụ công khai phù hợp.
2. **Hash:** tạo dấu kiểm toàn vẹn với tham chiếu; không có khóa giải và không khôi phục duy nhất dữ liệu. Khó tìm tiền ảnh là yêu cầu an toàn bổ sung, không tự suy từ việc “mất thông tin”.
3. **Sửa một ký tự:** các phép biến đổi làm thay đổi khuếch tán tới nhiều bit; ví dụ abc/abd khác 122/256 bit SHA-256. Không phải mọi bit bắt buộc đổi.
4. **Private key để ký:** chỉ chủ thể kiểm soát khóa riêng có năng lực tạo chữ ký đúng theo mô hình; public key cho người khác kiểm, không cho họ ký thay.
5. **RSA và tệp lớn:** giới hạn khối/padding, chi phí. OAEP2048/SHA-256 tối đa190 byte/lượt; dùng cơ chế lai thích hợp, không cắt bớt dữ liệu để vừa khối.
6. **Ký khác mã:** ký hỗ trợ nguồn gốc/toàn vẹn và chứng cứ; mã hóa nhắm bí mật. Một văn bản ký có thể công khai cho mọi người đọc.
7. **ECB:** cùng khối rõ cùng khóa cho cùng khối mã, làm lộ mẫu. Các mode khác vẫn cần tham số đúng và cơ chế xác thực, không “chọn CBC” là xong mọi yêu cầu.

## TH2B bước 7: kết quả minh họa đã chạy và bảng chưa chạy

Demo độc lập tìm cặp trùng16 bitđầu SHA-256, không phải CT1:

| Dữ liệu | Byte | SHA-256 đầy đủ |
| --- | --- | --- |
| DONG Y VOI DE XUAT. [mau 25] |28 |e9b88864adb02c841debab506ccd13a765a7209e0ab6ea7d94b4e1bdfcc46679 |
| KHONG DONG Y VOI DE XUAT. [mau 131] |35 |e9b8734c4e56587932a2bd8411b931576c07d3bc9f380b0abd00d0de82efbed4 |

Hai digest cùng tiền tố e9b8, phần còn lại khác. Mẫu A có 512biến thể, đã thử 132biến thể B trước khi tìm cặp; số này là kết quả của demo có giới hạn, không là thời gian hay số lượt CT1. Tệp gốc và kết quả ở [hash-demo](/information-security/practice/hash-demo/result.json).

[Bảng 14 cấu hình CT1](/information-security/practice/TH2B-14-cau-hinh.csv) được để CHUA_CHAY toàn bộ. Khi điền, tách thời gian thực khỏi ước lượng, lưu số bit, hash, kiểu ký tự, byte A/B và việc kiểm lại digest. Không dùng bảng bậc 2^(n/2) trong bài làm bảng đo.

## Tệp thực hành

- [Chương trình demo tiền tố băm](/information-security/practice/hash_demo.py)
- [`th2B_b2.txt`](/information-security/practice/input-samples/th2B_b2.txt)
- [`th2B_b3.txt`](/information-security/practice/input-samples/th2B_b3.txt)
- [`th2B_b3_modified.txt`](/information-security/practice/input-samples/th2B_b3_modified.txt)
- [`th2B_b4.txt`](/information-security/practice/input-samples/th2B_b4.txt)
- [`th2B_b5.txt`](/information-security/practice/input-samples/th2B_b5.txt)
- [`th2B_b5_modified.txt`](/information-security/practice/input-samples/th2B_b5_modified.txt)
- [`th2B_b6.txt`](/information-security/practice/input-samples/th2B_b6.txt)
- [`th2B_b7A.txt`](/information-security/practice/input-samples/th2B_b7A.txt)
- [`th2B_b7B.txt`](/information-security/practice/input-samples/th2B_b7B.txt)
