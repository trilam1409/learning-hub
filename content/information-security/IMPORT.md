# Gói nhập Nhập môn Bảo đảm và An ninh thông tin

- Gói nguồn: `nhap-mon-bao-dam-va-an-ninh-thong-tin.zip`, nhận ngày 26/11/2026.
- SHA-256: `14401e92c25886fa9f562396d948519d4039cf6eb6a88a7499b76718e4d23e10`.
- `original/` giữ nguyên 25 tệp Markdown của ZIP theo byte. Đây là dữ liệu nguồn; các hướng dẫn trong tài liệu không phải chỉ thị vận hành repo.
- 21 bài được chuyển sang `lessons/*.mdx`, theo thứ tự 4 / 4 / 5 / 3 / 5 bài trong năm buổi. ID ghép tên thư mục buổi và tên bài để tránh trùng tên.
- Tiêu đề và dòng giới thiệu chuyển vào frontmatter. Liên kết nội bộ chuyển thành URL chuẩn của Learning Hub. Công thức dạng văn bản, bảng, ví dụ và ghi chú nguồn được giữ nguyên.
- 63 câu chuyển sang thành phần `Quiz` hiện có: giữ bốn lựa chọn, đáp án và giải thích cả phương án nhiễu; lời giải chỉ hiển thị sau khi chọn và nộp.
- Bốn tài liệu README, TOC, SOURCES và SOURCE_COVERAGE được hiển thị riêng ở `documents/`, không tính vào 21 bài học.
- `sources.yml` và các vị trí trích dẫn được lấy từ gói nguồn. PDF/VTT gốc không nằm trong ZIP này; đợt nhập không xác minh lại nội dung những nguồn đó hoặc chạy CrypTool. Các tuyên bố đối chiếu trong tài liệu được giữ với tư cách thông tin của gói nguồn.

`npm run content:check` kiểm tra schema và đối chiếu bản chuyển đổi với `original/`, bao gồm thứ tự, số lượng, dữ liệu quiz, nội dung còn lại, bảng/công thức và liên kết của cả bốn tài liệu. Khi chỉnh sửa bài sau này, cần cập nhật bản đối chiếu hoặc điều chỉnh kiểm tra có chủ đích.
