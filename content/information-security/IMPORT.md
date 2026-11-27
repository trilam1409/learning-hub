# Biên soạn lại 5 buổi đầu

Đợt cập nhật ngày 27/11/2026 dựa trên gói bàn giao `learning-hub-5-buoi-ban-giao-2026-11-27.zip`. Mã SHA-256 của gói là `24449e8b9ef5c420538fcc63a6fcf82a576e10a437daf6e1bb467d526132374c`.

`original/` chứa Markdown của bản biên soạn hiện hành. Bản nhập 26/11/2026 có thể tra trong lịch sử tại commit `d4449c94c949939a1cd1a1aab30fa4a29d2305e3`.

- `lessons/` giữ 21 ID và URL của năm buổi theo thứ tự 4 / 4 / 5 / 3 / 5. Mỗi bài dùng ba thành phần Quiz để hiển thị đáp án và lời giải của cả bốn lựa chọn sau khi nộp.
- `documents/` có mục lục, hướng dẫn học, danh mục nguồn, bảng đối chiếu và bài tập tổng hợp. Tệp thực hành công khai là dữ liệu minh họa do gói soạn và biểu mẫu ghi kết quả.
- Dẫn nguồn trỏ tới bản PDF/VTT cục bộ đã đọc. Các giới hạn về Sources Project, âm thanh gốc và CrypTool được ghi trong hướng dẫn học và tài liệu nguồn.

`npm run content:check` kiểm schema và đối chiếu bản Markdown với MDX, gồm thứ tự bài, quiz, văn bản, bảng, công thức, tài liệu và liên kết. Khi cập nhật nội dung, đồng bộ bản Markdown và MDX tương ứng.
