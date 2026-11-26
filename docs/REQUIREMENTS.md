# Yêu cầu và phạm vi Learning Hub

Mốc kiểm chứng: `main` tại `2b8ba89511038a0432a4818410115cb7254c1fff`, ngày 26/11/2026. Nguồn và giới hạn ở [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md). “Có trong mã” dưới đây không có nghĩa đã kiểm thử lại trên production.

## Yêu cầu đang áp dụng cho đợt chuyển giao

| ID | Yêu cầu trực tiếp của người dùng | Kết quả cần có |
| --- | --- | --- |
| DOC-01 | Tổng hợp lịch sử, Instructions, yêu cầu, kiến trúc, quyết định, trạng thái và kế hoạch | Sáu file được yêu cầu, có dẫn nguồn và ghi phần thiếu |
| DOC-02 | Đối chiếu main hiện tại | Ghi SHA, nhánh và nguồn mã; ưu tiên mã khi báo cáo hành vi hiện tại |
| DOC-03 | Chỉ sửa tài liệu | Không thay logic, tính năng, bài học, dependencies hoặc quy trình build |
| DOC-04 | Kiểm tra repo trước khi ghi và kiểm tra diff | Ghi trạng thái ban đầu, kiểm tra chỉ sáu file Markdown thay đổi |
| DOC-05 | Được làm trực tiếp main, không cần PR | Chuẩn bị trọn đợt, báo file và SHA commit nếu commit; tránh push lẻ |

## Hành vi sản phẩm đã có trong mã

Các yêu cầu sản phẩm sau được chuẩn hóa từ README, mô tả PR và mã; không khẳng định tất cả là nguyên văn yêu cầu ban đầu đã truy xuất được.

| ID | Hành vi / tiêu chí hiện tại | Bằng chứng |
| --- | --- | --- |
| LH-01 | Trang chủ nhóm môn theo học kỳ, dẫn đến trang môn | `app/page.tsx`, `course.yml` |
| LH-02 | Xem bài theo chủ đề hoặc buổi bằng tab; hai cách dẫn cùng URL bài học | `course-catalog.tsx`, route lessons |
| LH-03 | Lọc tiêu đề + tóm tắt trong một môn, không phân biệt hoa/thường theo locale vi-VN; có trạng thái rỗng và đếm bài | `course-catalog.tsx` |
| LH-04 | Bài MDX có tiêu đề, tóm tắt, ví dụ, quiz và nguồn tham khảo; nút quay lại ở đầu/cuối bài | `lessons/*.mdx`, trang lessons |
| LH-05 | Bài chưa có buổi (`sessionIds: []`) có nhãn đọc trước và nhóm riêng khi xem theo buổi | Schema, catalog và trang lessons |
| LH-06 | Quiz một lựa chọn hiển thị đúng/sai, đáp án và giải thích sau khi nộp; chọn lại thì bỏ phản hồi cũ | `quiz.tsx` |
| LH-07 | Công thức LaTeX hiển thị qua thành phần MathFormula/KaTeX; biểu đồ và thanh trượt minh họa kiến thức | `math-formula.tsx`, các explorer, `mean-chart.tsx` |
| LH-08 | Metadata nguồn hỗ trợ trang PDF và mốc VTT; PDF có URL thì thêm `#page=N` | `schema.ts`, `lesson-sources.tsx` |
| LH-09 | Liên kết notebook ở trang môn và các bài liên quan; route chỉ chấp nhận tên trong allowlist | `lib/notebooks.ts`, các trang courses/lessons/notebooks |
| LH-10 | Có iframe và mở toàn màn hình khi file Lab tồn tại lúc dựng trang; khi thiếu thì có thông báo chờ; luôn có tải .ipynb | Trang notebooks |
| LH-11 | Python thực thi trong trình duyệt; chỉnh sửa không tự đẩy về GitHub; có phương án tải về | Trang notebooks, cấu hình JupyterLite |
| LH-12 | Kiểm tra metadata, ID và tham chiếu; sinh trước route hợp lệ, route ngoài danh sách bị từ chối | `catalog.ts`, `schema.ts`, `generateStaticParams`, `dynamicParams = false` |

Giới hạn LH-03: chưa có full-text search, bỏ dấu tiếng Việt, xếp hạng, tìm toàn bộ môn hoặc nội dung PDF/VTT. Lịch sử từng đặt “tìm kiếm tiếng Việt theo môn” làm bước tiếp; mức thực hiện hiện tại là lọc chuỗi có dấu như mô tả trên.

## Quy tắc dữ liệu nội dung

- `course.yml`: `id`, `title`, `semesterId`, `description`; URL ChatGPT Project tùy chọn. Hiện môn data-analytics chưa đặt URL này.
- `topics.yml`: `id`, `title`, `order`; `sessions.yml`: `id`, `title`, `number`, ngày ISO tùy chọn. Hiện 5 buổi không khai báo ngày.
- `sources.yml`: `id`, `title`, loại `pdf`/`vtt`, URL HTTP(S) tùy chọn. Hiện 13 nguồn chưa có URL và không có file gốc trong repo.
- Frontmatter bài: `id`, `title`, `summary`, `order`, ít nhất một `topicIds`, `sessionIds` (có thể rỗng); `relatedLessons` và `references` mặc định rỗng nếu thiếu.
- ID dạng chữ thường/số nối bằng gạch ngang; ID môn trùng thư mục, ID bài trùng tên MDX. Schema strict từ chối trường lạ; không trùng ID trong các danh sách được index.
- Tham chiếu chủ đề/buổi/nguồn/bài liên quan phải tồn tại. Nguồn PDF dùng `page` nguyên dương, VTT dùng `startSeconds >= 0`, `endSeconds` nếu có phải lớn hơn bắt đầu.
- Validation kiểm tra cấu trúc và tham chiếu, **không** đọc tài liệu gốc để chứng minh trang/mốc hoặc nội dung học thuật chính xác; không kiểm tra toàn bộ liên kết trong thân MDX hay chạy notebook.
- Giữ ghi chú nội dung bổ trợ: `python-control-flow` gắn Buổi 02 nhưng chưa xác nhận giảng hết; `data-inspection` gắn Buổi 03 nhưng chưa xác nhận mốc VTT.

## Yêu cầu vận hành và chất lượng

| Nội dung | Trạng thái / tiêu chí |
| --- | --- |
| Node.js 24, lint/typecheck/content check/build | Có scripts và CI. Cần chạy khi sửa ứng dụng/nội dung; không lấy CI lịch sử làm kết quả mới |
| Ít lượt build Vercel | Yêu cầu người dùng trong lịch sử: chuẩn bị, kiểm tra, push trọn đợt một lần |
| Tự động build JupyterLite | Có workflow riêng, Python 3.12; vẫn tạo commit assets về main |
| Gộp build runtime vào deploy chung | Đề xuất lịch sử, chưa triển khai và chưa có thiết kế được duyệt |
| Tài nguyên được phép công bố, MDX được review | Quy tắc README; không tự đưa tài liệu riêng từ ChatGPT lên repo công khai |
| Accessibility và responsive | Có label, tab roles, aria-live và layout responsive trong mã; chưa có audit toàn diện |

## Ngữ cảnh bài tập, không phải backlog tính năng đã duyệt

Chat “Tổng hợp yêu cầu bài tập” yêu cầu `Buoi05.ipynb`, hai biểu đồ dữ liệu Canada Immigration 1980–2013, code đơn giản như người mới học. Sửa cuối cùng của người dùng chọn **bar đứng**: X là quốc gia Top 10, Y là tổng số người di cư; thay thế hướng bar ngang trước đó. Phần line là tổng di cư theo năm.

File bài tập cũ và dữ liệu gốc chưa truy xuất được trong đợt này. Notebook Buổi 05 của repo hiện dùng dữ liệu doanh số tự tạo, không phải bài nộp Canada. Không tự thay notebook hoặc đưa bài tập vào website khi chỉ được yêu cầu chuyển tài liệu.

## Chưa có bằng chứng là yêu cầu đã duyệt

Không thấy triển khai hoặc yêu cầu đã được duyệt trong các nguồn đọc được cho tài khoản/đăng nhập, theo dõi tiến độ, đồng bộ đám mây, CMS, chấm điểm phía server hay backend Python. Không tự thêm các hạng mục này vào phạm vi phát triển tiếp theo. Ưu tiên và lịch phát hành dài hạn chưa được xác định; xem [ROADMAP.md](ROADMAP.md).
