# Hướng dẫn làm việc với Learning Hub

## Mục tiêu và cách đọc ngữ cảnh

Learning Hub là website học tập cá nhân bằng tiếng Việt, tổ chức kiến thức theo môn, học kỳ, chủ đề và buổi học; có bài MDX, mô phỏng tương tác, quiz và Python Lab trên trình duyệt.

Đọc [ngữ cảnh và nguồn bằng chứng](docs/PROJECT_CONTEXT.md) trước, sau đó đọc [yêu cầu](docs/REQUIREMENTS.md), [kiến trúc](docs/ARCHITECTURE.md), [kế hoạch](docs/ROADMAP.md) và [quyết định](docs/DECISIONS.md). Bộ tài liệu được đối chiếu ngày 26/11/2026 với `main` tại `2b8ba89511038a0432a4818410115cb7254c1fff`. Kiểm tra lại mã và HEAD trước mỗi nhiệm vụ mới.

## Nguyên tắc thực hiện

- Trao đổi và viết nội dung học bằng tiếng Việt; dùng tên kỹ thuật chính xác khi cần.
- Kiểm tra branch, remote, HEAD và working tree trước khi ghi. Giữ nguyên thay đổi sẵn có của người dùng.
- Chỉ thực hiện phạm vi người dùng yêu cầu. Nhiệm vụ chuyển ngữ cảnh này chỉ thay đổi sáu file Markdown, không sửa logic, nội dung bài học, dependencies hoặc workflow.
- Tách rõ: thực tế đã kiểm chứng trong mã; thông tin lịch sử hội thoại; kế hoạch/đề xuất; thông tin chưa truy xuất được. Không biến lời báo cáo cũ thành kết quả kiểm thử mới.
- Không suy diễn Project Instructions gốc: chưa truy xuất được bản nguyên văn. File này là hướng dẫn chuyển giao dựa trên yêu cầu hiện tại và các nguồn ghi trong PROJECT_CONTEXT.md.
- Không khẳng định một nội dung đã được giảng chỉ vì bài có `sessionIds`. Giữ các ghi chú bổ trợ/slide-only và nhãn đọc trước; chỉ xác nhận trang PDF, mốc VTT khi đã đọc nguồn.
- Dữ liệu minh họa phải được ghi rõ. Chỉ đưa tài nguyên được phép công khai lên repository; MDX phải được người bảo trì review vì được biên dịch thành mã.

## Quy trình Git và xuất bản

- Người dùng cho phép làm trực tiếp trên `main`, không bắt buộc PR; yêu cầu hiện tại tái xác nhận điều này. Quy trình PR `feature/* → develop → main` trong README là mô tả cũ, không phải yêu cầu bắt buộc hiện hành của người dùng.
- Chuẩn bị trọn một đợt, kiểm tra rồi push một lần; không push riêng từng file hay từng lỗi nhỏ. Yêu cầu tiết kiệm lượt build xuất phát từ hội thoại “Truy cập source đồng bộ”. Khi thay đổi lớn có thể chuẩn bị trên branch riêng, nhưng không tự tạo thêm quy trình duyệt nếu người dùng không yêu cầu.
- Vercel tự deploy từ `main` là cấu hình được báo cáo trong lịch sử, cần kiểm tra trạng thái khi thực sự xuất bản. Workflow JupyterLite hiện vẫn có thể tạo commit thứ hai trên `main`; chưa có bảo đảm một push chỉ tạo một deployment.
- Kiểm tra diff, chỉ stage file thuộc nhiệm vụ, không force push. Báo file thay đổi, kiểm tra đã chạy/chưa chạy, commit và tình trạng push.

## Môi trường và kiểm tra

Node.js 24 (engines: `>=24`); Next.js App Router, TypeScript, React, Tailwind. Chưa có `package-lock.json` ở mốc đối chiếu. Cài theo CI bằng `npm install --package-lock=false` khi không có lockfile; không tự thêm lockfile trong nhiệm vụ tài liệu.

Khi sửa ứng dụng hoặc nội dung, chạy:

```sh
npm run lint
npm run typecheck
npm run content:check
npm run build
```

Với thay đổi chỉ tài liệu, kiểm tra diff, khoảng trắng, liên kết nội bộ và phạm vi file. Không báo lint/build đạt nếu chưa chạy. Với thay đổi notebook/runtime, cần thêm kiểm thử mở notebook và chạy cell thực tế trên trình duyệt; file runtime tồn tại không chứng minh kernel chạy thành công.

## Ràng buộc nội dung và runtime

- Mỗi môn ở `content/<course>/` có `course.yml`, `topics.yml`, `sessions.yml`, `sources.yml`, `lessons/*.mdx`. ID môn/bài phải khớp tên thư mục/file.
- Metadata dùng schema chặt trong `lib/content/schema.ts`; tham chiếu được kiểm tra trong `lib/content/catalog.ts`. Bài phải có chủ đề; `sessionIds: []` biểu thị đọc trước.
- Trang PDF tính từ 1; VTT dùng giây bắt đầu và kết thúc tùy chọn (kết thúc phải lớn hơn bắt đầu). Không tự tạo mốc nguồn.
- Hai cách xem danh mục dẫn tới cùng URL bài học chuẩn. Tìm kiếm hiện chỉ lọc tiêu đề và tóm tắt trong một môn, không phải toàn văn hay tìm không dấu.
- Notebook cần đồng bộ tên file với allowlist `lib/notebooks.ts`. Nguồn notebook ở `content/data-analytics/notebooks/`; `public/jupyterlite/` là output sinh tự động, không sửa tay.
- Python chạy qua JupyterLite/Pyodide trong trình duyệt, không có backend Python riêng. Thay đổi của người học không tự đồng bộ lên GitHub.
