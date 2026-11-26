# Trạng thái và kế hoạch Learning Hub

Ngày bàn giao 26/11/2026; baseline mã `2b8ba89511038a0432a4818410115cb7254c1fff` trên main. Đây là kế hoạch tiếp nối có phân biệt nguồn gốc, không phải cam kết thời gian hoặc quyền triển khai thêm trong nhiệm vụ chỉ tài liệu.

## Đã có trong mã

| Hạng mục | Trạng thái và giới hạn |
| --- | --- |
| Nền tảng Next.js, YAML/MDX, validation | Có trong mã; PR #1 đã merge |
| Bài tương tác, KaTeX, quiz, biểu đồ | Có trong mã; bài mẫu ban đầu đã được thay bằng nội dung data-analytics |
| Môn Phân tích và Trực quan dữ liệu | 32 bài, 9 chủ đề, 5 buổi; chưa kiểm tra lại tài liệu gốc |
| Danh mục hai tab và tìm kiếm | Có lọc title/summary trong môn; chưa phải tìm kiếm toàn văn/không dấu |
| Đọc trước Bài 04–07 | 17 bài có nhãn, chưa đồng nhất với đã học trên lớp |
| Python Lab | 8 notebook, allowlist, liên kết bài học, iframe/fallback và tải file |
| Tạo runtime | Assets JupyterLite có trong Git, 8 notebook nguồn khớp bản preload |
| Vercel | Lịch sử có website và tích hợp main; trạng thái deploy hiện tại chưa được kiểm tra |

Không ghi “website hoàn thiện” hoặc “Python Lab đã chạy thành công production”: chưa có bằng chứng thực thi cell.

## Công việc tồn tại từ lịch sử

### 1. Xác nhận Python Lab trên production

**Nguồn:** chat “Truy cập source đồng bộ”; lần cuối báo `build-rate-limit` và chưa chạy cell. **Trạng thái:** cần xác minh lại, không giả định lỗi còn tồn tại.

Khi có nhiệm vụ vận hành tiếp theo: xác định commit Vercel đang phục vụ và trạng thái deployment; kiểm tra `/jupyterlite/lab/index.html`, mở notebook từ trang môn, chờ kernel và chạy cell. Thử Python cơ bản, pandas, NumPy/Matplotlib và scikit-learn trong các notebook tương ứng. Kiểm tra lưu ở trình duyệt, tải file và fallback khi cần.

**Hoàn tất khi:** có bằng chứng deployment/commit và kết quả chạy cell thực tế, gồm một biểu đồ và notebook mô hình; báo rõ thư viện hoặc trình duyệt chưa hỗ trợ. HTTP 200 hoặc workflow xanh riêng lẻ chưa đủ.

### 2. Giảm số lần build/deploy cho mỗi đợt

**Nguồn:** người dùng yêu cầu chỉ push tất cả một lần trong “Truy cập source đồng bộ”. **Đã áp dụng về cách làm:** chuẩn bị và kiểm tra cả đợt trước khi push. **Chưa triển khai về hệ thống:** hợp nhất build runtime với deploy chung là đề xuất của trợ lý cũ.

Workflow hiện vẫn commit generated assets về main nên có thể phát sinh deployment bổ sung. Cần chọn thiết kế phù hợp giới hạn Vercel (build runtime trong pipeline chung hay phương án phát hành khác), rồi mới sửa cấu hình theo nhiệm vụ riêng. Chưa có quyết định xóa assets, đổi hosting hay đổi package manager.

**Hoàn tất khi:** nội dung, mã và notebook được kiểm tra cùng đợt; runtime đúng base URL; không còn vòng commit tự sinh không mong muốn; kiểm tra số deployment thực tế. Không cam kết tuyệt đối một build vì dịch vụ có thể retry.

### 3. Bổ sung nội dung từ các project môn học

**Nguồn:** người dùng trong “Khởi tạo Learning Hub” dự định đẩy nội dung từ các ChatGPT Project khác. **Hiện tại:** mới thấy một môn trong repo; không có danh sách môn hoặc lịch nhập tiếp được duyệt.

Mỗi đợt cần metadata, bài MDX, phân loại nội dung đã học/đọc trước, nguồn được phép công bố và notebook nếu có. Khi có VTT mới, rà soát bài đọc trước và cập nhật sessionIds, mốc giảng cùng ví dụ. Không tự chuyển toàn bộ preview sang đã học chỉ vì có một transcript mới.

**Hoàn tất theo từng đợt khi:** validation/build đạt, bài và liên kết hoạt động, trích dẫn đã được kiểm tra trên nguồn được cung cấp, chỉ xuất bản cả đợt một lần.

## Đề xuất chuyển giao cần ưu tiên, chưa phải yêu cầu tính năng đã duyệt

| Thứ tự đề xuất | Công việc | Điều kiện hoàn tất |
| --- | --- | --- |
| A | Khôi phục Project Instructions, phần chat cũ và tài liệu đính kèm còn thiếu | Có bản nguồn truy xuất được, ghi xuất xứ, thay ghi chú “chưa xác minh” bằng bằng chứng phù hợp |
| B | Rà lại PDF/VTT và trích dẫn hiện có | Xác nhận tên/trang/mốc từ nguồn gốc; giữ ghi chú bổ trợ của python-control-flow và data-inspection |
| C | Đồng bộ README với quy trình Git đã được người dùng tái xác nhận | Mô tả rõ cho phép main, PR tùy nhiệm vụ, chuẩn bị và push theo đợt; đợt này giữ nguyên README để đúng sáu file yêu cầu |
| D | Rà soát chất lượng và khả năng dùng trên điện thoại/bàn phím | Có kết quả kiểm thử route, tab, tìm kiếm, quiz, slider, iframe với phạm vi thiết bị cụ thể |

Tìm kiếm cơ bản đã tồn tại nên không lập lại như việc chưa làm. Các cải tiến bỏ dấu, toàn văn hoặc xuyên môn chỉ nên lên kế hoạch khi người dùng yêu cầu. Tương tự, chưa có căn cứ để cam kết đăng nhập, lưu tiến độ, CMS, server Python hoặc tích hợp bài nộp Canada Immigration.

## Cách bắt đầu nhiệm vụ tiếp theo

Đọc [AGENTS.md](../AGENTS.md), kiểm tra HEAD/working tree và mục tiêu người dùng mới; chọn đúng hạng mục được giao. Nếu sửa ứng dụng/nội dung, chạy lint, typecheck, content check, build; với runtime thêm chạy cell trên trình duyệt. Ghi kết quả mới vào tài liệu và phân biệt rõ lịch sử với kết quả vừa xác minh.
