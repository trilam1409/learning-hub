# Quyết định và các điểm chưa chốt

Mốc đối chiếu: 26/11/2026, `main` tại `2b8ba89511038a0432a4818410115cb7254c1fff`. Tài liệu phân biệt quyết định người dùng, lựa chọn đã thể hiện trong mã và đề xuất. Không gán lý do lịch sử nếu chỉ có thể suy ra từ cấu trúc.

## D-01 — Nội dung trong repository bằng YAML và MDX

**Trạng thái:** đã triển khai; lý do lựa chọn ban đầu chưa truy xuất đầy đủ.

PR #1 và `lib/content/*` thể hiện metadata YAML có schema và bài MDX có thể chứa thành phần tương tác. Môn/chủ đề/buổi là metadata riêng, nội dung bài có URL chuẩn. Hệ quả: xuất bản nội dung gắn với Git/build; lỗi schema và tham chiếu có thể chặn build. MDX cần review vì được biên dịch thành mã. Không có CMS trong bản hiện tại.

**Bằng chứng:** [PR #1](https://github.com/trilam1409/learning-hub/pull/1), `lib/content/schema.ts`, `catalog.ts`, `next.config.mjs`.

## D-02 — Hai cách tổ chức, một bài học chuẩn

**Trạng thái:** đã triển khai.

Một bài có nhiều topicIds/sessionIds; tab chủ đề và buổi dẫn cùng `/courses/<course>/lessons/<lesson>`. Tìm kiếm client lọc title/summary trong môn. Hệ quả: không nhân đôi bài theo buổi; muốn tìm toàn văn hoặc không dấu cần nhiệm vụ mở rộng riêng.

**Bằng chứng:** `course-catalog.tsx`, trang course/lesson, commit `009a5d1`, `f7b544a`.

## D-03 — Sinh đủ tham số route bài học

**Trạng thái:** đã triển khai sau lỗi 404 lịch sử.

Lịch sử “Khởi tạo Learning Hub” báo đã sửa 404. Commit `5c2a934` và trang lesson hiện sinh tất cả cặp môn–bài bằng generateStaticParams, dynamicParams=false. Hệ quả: thêm nội dung cần build lại; không xem việc render trang môn là bằng chứng mọi URL bài đều hoạt động.

## D-04 — Tương tác nằm trong bài MDX

**Trạng thái:** đã triển khai.

PR #2 đưa KaTeX, Recharts và quiz vào bài mẫu; mã hiện đã mở rộng bằng Normalization, ChartType, SeriesAlignment và Ridge explorers. Hệ quả: ví dụ chạy phía client, dữ liệu minh họa phải được ghi rõ; không có lưu điểm hay chấm phía server.

**Bằng chứng:** [PR #2](https://github.com/trilam1409/learning-hub/pull/2), `mdx-components.tsx`, `components/learning/`.

## D-05 — Tách bài đọc trước khỏi nội dung được gắn buổi

**Trạng thái:** đã triển khai; mức xác nhận giảng dạy vẫn phụ thuộc nguồn.

`sessionIds: []` là quy ước preview, không phải metadata lỗi. Bài đọc trước hiển thị nhãn riêng và nhóm riêng theo buổi. Bài gắn buổi vẫn có thể chứa phần slide bổ trợ chưa xác nhận qua VTT. Không sửa thông tin này dựa vào suy đoán.

**Bằng chứng:** schema, README, commit `77ea466`, hai bài `python-control-flow.mdx`/`data-inspection.mdx`.

## D-06 — Trích dẫn có vị trí, không mặc định có file nguồn

**Trạng thái:** đã triển khai phần dữ liệu và hiển thị; kiểm chứng tài liệu gốc còn thiếu.

PDF dùng page từ 1; VTT dùng giây. URL nguồn tùy chọn; sources hiện chỉ có tên/loại, nên giao diện hiện có thể chỉ hiển thị văn bản. Không gọi đây là trình đọc PDF, phát video hay đồng bộ transcript. Validation chỉ chứng minh cấu trúc/tham chiếu, không chứng minh nội dung/trang/mốc đúng.

**Bằng chứng:** `schema.ts`, `catalog.ts`, `lesson-sources.tsx`, `sources.yml`.

## D-07 — Chạy Python bằng JupyterLite/Pyodide phía trình duyệt

**Trạng thái:** mã tích hợp và runtime đã có trong Git; thực thi production chưa xác minh.

Lịch sử và mã chọn static JupyterLite/Pyodide, không cần Python backend riêng. Notebook nguồn nằm trong repo; route allowlist ngăn nhận tùy ý đường dẫn notebook. Iframe chỉ bật khi file Lab tồn tại lúc render; fallback tải notebook vẫn có. Hệ quả: phụ thuộc WebAssembly, mạng tải thư viện, tương thích package; thay đổi của người học không tự đồng bộ GitHub.

**Bằng chứng:** “Truy cập source đồng bộ”, `lib/notebooks.ts`, trang notebooks, commit `f8b0da6`, `98a31f4`, runtime tại baseline.

## D-08 — Sinh và commit runtime bằng workflow riêng

**Trạng thái:** cơ chế hiện hành; có đề xuất thay thế chưa chốt.

Workflow build JupyterLite từ notebook, dùng base URL `/jupyterlite/`, kiểm tra file rồi commit assets về main. Commit `527fe00` bổ sung jupyter-server/jupyterlab sau lỗi build lịch sử; `2b8ba89` chứa runtime sinh ra. Hệ quả: có thể thêm commit và lượt deploy sau lần push nguồn; `[skip ci]` không phải bằng chứng Vercel sẽ bỏ qua deployment.

Đề xuất cũ gộp build runtime vào build/deploy chung **chưa được triển khai**. Không ghi nhận đây là quyết định kiến trúc đã hoàn tất.

**Bằng chứng:** `.github/workflows/build-jupyterlite.yml`, `jupyterlite/requirements.txt`, lịch sử chat.

## D-09 — Làm main được phép, xuất bản trọn đợt

**Trạng thái:** yêu cầu người dùng đã tái xác nhận trong nhiệm vụ hiện tại.

Ban đầu README/PR dùng feature → develop → main. Sau đó người dùng nói không cần PR và cho làm trực tiếp main trong “Khởi tạo Learning Hub”. Ở “Truy cập source đồng bộ”, người dùng yêu cầu chỉ push tất cả một lần để tiết kiệm build; trợ lý cũ đề xuất chuẩn bị trên branch riêng và push theo đợt. Chat Codex hiện tại tái xác nhận cho phép main, không cần PR.

Áp dụng: kiểm tra repo trước khi ghi, chuẩn bị/kiểm tra toàn bộ, commit có phạm vi rõ, push trọn đợt; PR không bắt buộc. README vẫn ghi quy trình cũ và được giữ nguyên trong đợt sáu file tài liệu này. Quyền làm main không cho phép force push hoặc ghi đè thay đổi người dùng.

## D-10 — Đợt chuyển giao chỉ thay đổi tài liệu

**Trạng thái:** yêu cầu hiện tại.

Tạo AGENTS.md và năm file docs được chỉ định; ưu tiên sự thật kiểm chứng từ mã khi mô tả hiện trạng, giữ lịch sử/kế hoạch riêng. Không sửa workflow để xử lý rate limit, không sửa notebook, route, nguồn hay README trong đợt này. Thiếu Instructions/attachments phải ghi thiếu, không tái dựng như nguyên văn.

## Các điểm chưa có quyết định

| Câu hỏi | Trạng thái |
| --- | --- |
| Cách hợp nhất build JupyterLite và Vercel | Có đề xuất, chưa có thiết kế triển khai được chọn |
| Instructions gốc và phạm vi yêu cầu ban đầu đầy đủ | Chưa truy xuất được |
| Đăng nội dung môn nào tiếp theo, hạn hoàn tất | Người dùng có ý định bổ sung môn, chưa có danh sách/lịch được duyệt |
| Có công bố PDF/VTT và URL tải hay không | Chưa có nguồn gốc/quyền chia sẻ được xác nhận trong đợt này |
| Thêm đăng nhập, tiến độ, CMS, tìm kiếm toàn văn | Chưa có bằng chứng yêu cầu đã duyệt trong nguồn đọc được |
