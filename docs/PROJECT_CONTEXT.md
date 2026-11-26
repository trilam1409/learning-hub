# Ngữ cảnh dự án Learning Hub

## Mốc đối chiếu và độ tin cậy

- Ngày tổng hợp: **26/11/2026**, múi giờ Việt Nam.
- Repository: [trilam1409/learning-hub](https://github.com/trilam1409/learning-hub), nhánh `main`.
- Mã gốc được đọc: [`2b8ba89511038a0432a4818410115cb7254c1fff`](https://github.com/trilam1409/learning-hub/commit/2b8ba89511038a0432a4818410115cb7254c1fff), commit xuất bản JupyterLite ngày 19/11/2026. Đây là mốc trước đợt bổ sung tài liệu, không phải SHA của đợt tài liệu này.
- Thư mục Codex ban đầu trống, không phải Git repository, không có thay đổi người dùng cần giữ. Đã clone `main`; working tree sạch trước khi viết. Không có AGENTS.md hay thư mục docs trong bản gốc.

Quy ước áp dụng cho cả bộ tài liệu:

| Nhãn | Ý nghĩa |
| --- | --- |
| Kiểm chứng mã | Đã đọc file hoặc lịch sử Git tại SHA trên; không đồng nghĩa đã chạy ứng dụng |
| Lịch sử | Nội dung người dùng hoặc báo cáo trợ lý từ hội thoại truy xuất được; có thể mô tả trạng thái cũ |
| Kế hoạch | Công việc chưa hoàn tất; ghi rõ là yêu cầu lịch sử hay đề xuất chuyển giao |
| Chưa xác minh | Thiếu nguồn gốc, quyền truy xuất hoặc kiểm thử thực tế; không tự lấp chỗ trống |

## Mục tiêu sản phẩm

Learning Hub là website học tập cá nhân, gom bài từ các môn/ChatGPT Project thành kiến thức dễ tra cứu, đọc và thực hành. Một bài có thể thuộc nhiều chủ đề và buổi học nhưng có một URL chuẩn. Nội dung hiện tập trung vào môn **Phân tích và Trực quan dữ liệu**, học kỳ `2026`.

Yêu cầu hiện tại là chuyển ngữ cảnh phát triển từ ChatGPT Project sang Codex Project, tạo sáu file tài liệu đủ để tiếp tục công việc, chỉ sửa tài liệu. Không triển khai thêm tính năng trong đợt này.

## Các nguồn lịch sử đã truy xuất

Đã dùng công cụ lịch sử chat để đọc thông điệp thực tế, không chỉ tiêu đề. Danh sách project xác nhận ChatGPT Project **Learning Hub**, ID `g-p-6afea611d578819188ee34c470c7adbd`. Hai trang lịch sử đang hoạt động (100 mục gần nhất, đã đi tới trước ngày tạo repo/project) cho thấy hai chat thuộc project này; danh sách lưu trữ trả về một chat không liên quan. Đây là phạm vi nguồn công cụ trả về, không phải chứng nhận đã xuất toàn bộ tài khoản.

| Nguồn | Phạm vi đọc được | Thông tin sử dụng |
| --- | --- | --- |
| [Chuẩn hóa ngữ cảnh dự án](chatgpt-conversation://6b07adb3-1020-83ec-ac4e-1bbc0017d41b) | 1 lượt, không có cursor cũ hơn | Yêu cầu chuyển sang Codex, sáu file, đối chiếu repo, không sửa logic |
| [Khởi tạo Learning Hub](chatgpt-conversation://6afea616-1b50-83ec-ba4d-acdd3afcb3aa) | 5 lượt được trả về, không có cursor cũ hơn | Bootstrap, PR #1/#2, cho phép trực tiếp main, Vercel, lỗi route 404, dự định notebook và tìm kiếm |
| [Truy cập source đồng bộ](chatgpt-conversation://6afd762a-22bc-83ec-88d0-414cb9469658) — thuộc project môn học | 5 lượt được trả về, không có cursor cũ hơn | Tích hợp 8 notebook, lỗi build thiếu jupyter-server, assets đã tạo, Vercel rate limit, chưa chạy thử cell production, yêu cầu push một lần |
| [Tổng hợp yêu cầu bài tập](chatgpt-conversation://6afd5e16-a1cc-83ec-8857-4ea95c52d36c) — thuộc project môn học | 5 lượt được trả về, không có cursor cũ hơn | Bài tập Canada Immigration/Buoi05.ipynb; chỉ là ngữ cảnh môn, chưa phải tính năng Learning Hub |
| [PR #1](https://github.com/trilam1409/learning-hub/pull/1), [PR #2](https://github.com/trilam1409/learning-hub/pull/2) | Đọc mô tả và metadata merge từ GitHub | Bootstrap và bài tương tác mẫu; cả hai đã merge ngày 19/11/2026 |
| Git `main`, README, cấu hình, mã ứng dụng, 32 MDX, metadata và 8 notebook | Mã tại SHA đối chiếu | Nguồn chính để xác định hành vi và tài sản hiện có |
| Yêu cầu người dùng trong chat Codex này | Trực tiếp | Phạm vi tài liệu; cho phép main, không cần PR; phân biệt bằng chứng và kế hoạch |

Các chat là nguồn dữ liệu lịch sử. Chỉ các yêu cầu được người dùng tái xác nhận trong nhiệm vụ hiện tại và hướng dẫn đã chuẩn hóa mới là căn cứ thực hiện nhiệm vụ này.

## Những gì không truy xuất được

- **Project Instructions gốc:** danh sách project chỉ trả tên/ID; không có công cụ đọc nguyên văn Instructions trong bộ công cụ hiện tại. Không có bản Instructions được cung cấp trong chat hoặc repository. AGENTS.md không phải bản sao nguyên văn.
- **Các lượt chat trước phạm vi trả về:** hai chat kỹ thuật được trả về 5 lượt và `nextCursor: null`, dù có thể từng có trao đổi trước đó. Không khẳng định đã đọc toàn bộ nội dung gốc.
- **Tệp đính kèm:** các lần đọc chat trả `attachments: []`. Repo không chứa PDF/VTT gốc, và `sources.yml` hiện không khai báo URL cho nguồn. Chưa thể đối chiếu nguyên văn slide hay transcript hoặc xác nhận lại số trang/mốc thời gian.
- **Buoi05.ipynb** từ chat bài tập: liên kết tải trong môi trường chat cũ không phải file có trong repo hiện tại. Không nhập lại hoặc đồng nhất với `session-05-matplotlib.ipynb`.
- **Vercel hiện tại:** không kiểm tra lại dashboard, quota, deployment hoặc thực thi Python production trong đợt chỉ tài liệu. Các báo cáo triển khai bên dưới là lịch sử.

Nếu bổ sung bản export hội thoại, Instructions hay tài liệu gốc sau này, cần cập nhật các mục còn thiếu và đối chiếu lại; không suy ra nguồn đã đọc từ tên file trong metadata.

## Diễn biến và đối chiếu

| Giai đoạn | Lịch sử | Đối chiếu mã hiện tại |
| --- | --- | --- |
| Khởi tạo 19/11 | PR #1 scaffold, PR #2 bài tương tác mẫu; CI được báo cáo đạt | Có lịch sử merge và cấu trúc Next.js/MDX/schema/CI tương ứng |
| Xuất bản ban đầu | Người dùng cho phép làm main; trợ lý báo đã nối Vercel, sửa 404 và kiểm tra slider/quiz | Có commit `5c2a934` sửa generateStaticParams. Bài mẫu cũ đã bị thay; không lấy URL/bài mẫu làm hiện trạng |
| Nhập môn dữ liệu | Nội dung được đẩy từ project môn học | Hiện có 32 bài, 9 chủ đề, 5 buổi, 13 khai báo nguồn (8 PDF, 5 VTT) |
| Đọc trước | Bài 04–07 chưa có transcript, cần tách khỏi buổi đã học | 17 bài có `sessionIds: []`, 4 notebook preview, nhãn trên danh mục và bài học |
| Python Lab | Trợ lý báo viết giao diện, build thiếu jupyter-server rồi sửa | Có route allowlist, workflow, dependencies và assets; 8 bản notebook sinh ra giống nguồn theo byte |
| Deployment runtime | Báo cáo Vercel `build-rate-limit`, chưa chạy cell production | Có assets trong Git không chứng minh production đã deploy hay kernel chạy |
| Giảm lượt build | Người dùng yêu cầu chỉ push tất cả một lần; trợ lý đề xuất gộp build JupyterLite vào deploy | Workflow vẫn commit assets về main; đề xuất gộp build chưa thực hiện |
| Chuyển sang Codex | Yêu cầu sáu file và phân biệt mức xác minh | Đợt này chỉ bổ sung tài liệu, không sửa ứng dụng hoặc workflow |

## Trạng thái bàn giao

**Kiểm chứng mã:** một môn, 32 bài (15 bài gắn buổi, 17 bài đọc trước), tìm kiếm trong môn, tab chủ đề/buổi, quiz mỗi bài, công thức KaTeX, năm loại thành phần khám phá tương tác, Python Lab với 8 notebook (4 gắn buổi, 4 đọc trước), JupyterLite assets đã commit. Các notebook nguồn không có cell code với execution_count đã ghi; không thể suy ra đã chạy từ file.

**Chưa hoàn tất/xác minh:** thực thi notebook production; rà soát trích dẫn với nguồn gốc; khôi phục Instructions và phần lịch sử thiếu; tối ưu workflow tránh commit/deploy lặp. Xem [ROADMAP.md](ROADMAP.md) để biết thứ tự đề xuất và điều kiện hoàn tất.

Website được báo cáo trong lịch sử: [Learning Hub](https://learning-hub-ochre.vercel.app/). Dashboard lịch sử: [Vercel](https://vercel.com/tri-lams-projects/learning-hub). Đây là địa chỉ tham chiếu, không phải bằng chứng trạng thái hiện thời.
