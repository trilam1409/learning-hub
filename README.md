# Learning Hub

Website học tập cá nhân, tổ chức bài học theo chủ đề và buổi học.

## Phát triển local

Yêu cầu Node.js 24.

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run content:check
npm run build
```

## Nội dung

Mỗi thư mục `content/<subject>/` chứa `course.yml`, `topics.yml`,
`sessions.yml`, `sources.yml` và các bài MDX trong `lessons/`.
ID môn và bài phải khớp tên thư mục và tên tệp tương ứng. Cả trang chủ đề
và buổi học đều dẫn về URL chuẩn của bài.

Trong frontmatter bài học, `topicIds` và `sessionIds` tham chiếu metadata cùng môn.
`relatedLessons` tham chiếu cặp `courseId` và `lessonId`.
`references` ghi `sourceId` và `page` cho PDF, hoặc `startSeconds` và
`endSeconds` tùy chọn cho VTT. Dùng số trang PDF bắt đầu từ 1.

Chỉ commit nội dung và tài nguyên được phép công bố. Giữ MDX trong phạm vi
nội dung do người bảo trì review vì MDX được biên dịch thành mã ứng dụng.

## Git workflow

Mở PR từ `feature/*` hoặc `content/*` về `develop`.
PR phát hành đi từ `develop` về `main` sau khi chủ dự án duyệt.

## Nội dung đọc trước

Bài thuộc các buổi đã học có `sessionIds` dẫn đến một hoặc nhiều buổi trong `sessions.yml`.
Bài **đọc trước** (chưa có VTT) sử dụng `sessionIds: []`, chỉ cần khai báo `topicIds` và dẫn trang slide PDF đã xác minh.
Trang môn học hiển thị nhãn “Đọc trước” và nhóm riêng trong chế độ xem theo buổi.
Sau khi có transcript buổi học, cập nhật lại `sessionIds`, bổ sung nguồn VTT/mốc thời gian và rà soát ví dụ.

Hai chế độ **Theo chủ đề** và **Theo buổi học** là tab thực sự; trang bài học có liên kết quay về danh sách ở cả đầu và cuối.

Các file `.ipynb` trong `content/data-analytics/notebooks/` được tích hợp với trang `/courses/data-analytics/notebooks/<filename>.ipynb`. Runtime JupyterLite/Pyodide được dựng bằng GitHub Actions tại `public/jupyterlite/`; khi chưa xuất bản assets, giao diện hiển thị trạng thái chờ và vẫn cho tải notebook.

## Chạy Python Notebook bằng JupyterLite

- Notebook được khai báo trong `lib/notebooks.ts` và liên kết từ bài học tương ứng.
- GitHub Actions workflow `.github/workflows/build-jupyterlite.yml` tự dựng JupyterLite khi notebook hoặc cấu hình runtime thay đổi trên `main`.
- Workflow commit các static assets vào `public/jupyterlite/`, sau đó Vercel có thể deploy site chứa JupyterLite tại cùng domain với Learning Hub.
- Nếu không thấy Notebook chạy trên trang, vào GitHub Actions → **Build JupyterLite notebook runtime** → **Run workflow**; kiểm tra bước Install/Build/Commit, quyền `contents: write` và branch protection.
- Python thực thi trong trình duyệt bằng Pyodide (WebAssembly), không yêu cầu API server; thư viện lớn có thể tải hơi lâu và không phải mọi package Python đều được hỗ trợ.
- Trạng thái sửa code, dữ liệu trong JupyterLite thường lưu tại trình duyệt và có thể khác giữa các thiết bị. Tải lại `.ipynb` nếu cần lưu trữ lâu dài.
