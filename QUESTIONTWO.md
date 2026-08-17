# Câu hỏi 2 - AI và trách nhiệm của người lập trình

## Câu hỏi

> Đọc bài viết về "rác AI" nơi công sở và trả lời:
>
> **"Bạn sẽ làm gì để có thể nói câu: Đây là code của tôi dù phần lớn solution ban đầu được AI tạo ra?"**

## Câu trả lời

Theo tôi, việc AI tạo ra phần lớn solution ban đầu không phải là vấn đề. Điều quan trọng là **người lập trình có thực sự hiểu, kiểm chứng và chịu trách nhiệm với solution đó hay không**.

Tôi có thể nói **"Đây là code của tôi"** khi tôi là người đưa ra quyết định cuối cùng đối với code đó: hiểu nó hoạt động như thế nào, tại sao lại chọn cách triển khai đó, biết những ưu nhược điểm của nó, có khả năng sửa đổi khi yêu cầu thay đổi và chịu trách nhiệm nếu code xảy ra vấn đề.

Tôi sẽ sử dụng AI như một **công cụ hỗ trợ**, không phải như một người thay thế tư duy của mình.

### 1. Tôi phải hiểu code trước khi sử dụng

Nếu AI tạo ra một đoạn code, tôi không sử dụng nó một cách máy móc.

Tôi sẽ đọc và tìm hiểu:

- Code này đang giải quyết vấn đề gì?
- Tại sao lại sử dụng cách triển khai này?
- Các thành phần trong code hoạt động như thế nào?
- Có giải pháp nào đơn giản hoặc tốt hơn không?
- Có ảnh hưởng đến performance, security hoặc maintainability không?
- Code có phù hợp với kiến trúc hiện tại của project không?

Nếu tôi không thể giải thích được code cho một developer khác thì tôi chưa thể coi đó là code của mình.

### 2. Tôi chịu trách nhiệm với output của AI

Tôi xem mọi output của AI là **một đề xuất**, không phải đáp án tuyệt đối.

AI có thể:

- Viết code không chính xác
- Sử dụng API hoặc thư viện đã thay đổi
- Bỏ sót edge case
- Tạo ra security vulnerability
- Tạo ra solution phức tạp không cần thiết
- Không phù hợp với business logic của hệ thống

Vì vậy, trách nhiệm cuối cùng vẫn thuộc về tôi - người đưa code vào sản phẩm.

AI không thể là lý do để tôi nói:

> "AI viết nên nếu code sai thì không phải trách nhiệm của tôi."

Nếu tôi quyết định sử dụng code đó, thì tôi phải chịu trách nhiệm với quyết định của mình.

### 3. Tôi phải kiểm chứng bằng chính kiến thức của mình

Tôi sẽ kiểm chứng code bằng nhiều cách:

- Đọc và review code
- Chạy TypeScript type checking
- Chạy lint
- Viết và chạy test
- Test các trường hợp bình thường và edge case
- Kiểm tra database query
- Kiểm tra error handling
- Kiểm tra security
- Kiểm tra performance khi cần thiết
- Review lại solution trước khi merge

Ví dụ, nếu AI tạo cho tôi một checkout API có logic trừ stock, tôi không chỉ kiểm tra xem API có chạy hay không.

Tôi phải hiểu và kiểm tra thêm:

- Transaction có được sử dụng đúng không?
- Có thể xảy ra race condition không?
- Có thể oversell stock không?
- Giá sản phẩm có được lấy từ database không?
- Client có thể tự gửi total amount giả hay không?
- Nếu tạo order thất bại sau khi trừ stock thì stock có được rollback không?

Đó là phần tư duy mà người lập trình phải đảm nhận.

### 4. Tôi phải có khả năng sửa và mở rộng code

Một tiêu chí quan trọng để tôi coi solution AI tạo ra là code của mình là:

> **Tôi có thể tiếp tục phát triển nó mà không cần phụ thuộc hoàn toàn vào AI.**

Ví dụ, nếu ngày mai requirement thay đổi từ:

```text
Mua sản phẩm → trừ stock → tạo order
```

thành:

```text
Mua sản phẩm
→ giữ stock trong 15 phút
→ thanh toán
→ thanh toán thành công mới trừ stock
→ hết thời gian thì release stock
```

tôi phải có khả năng hiểu code hiện tại và tự thiết kế cách thay đổi.

AI có thể hỗ trợ tôi viết code nhanh hơn, nhưng kiến trúc và quyết định kỹ thuật vẫn phải đến từ người lập trình.

### 5. Tôi sử dụng AI để tăng năng suất, không để thay thế tư duy

Tôi nghĩ AI đang thay đổi cách một software engineer làm việc.

Trước đây:

```text
Problem
   ↓
Developer tự tìm hiểu
   ↓
Developer tự thiết kế
   ↓
Developer tự viết code
   ↓
Testing
```

Hiện tại:

```text
Problem
   ↓
Developer phân tích
   ↓
Developer thiết kế solution
   ↓
AI hỗ trợ implementation
   ↓
Developer review
   ↓
Testing
   ↓
Developer chịu trách nhiệm
```

AI giúp giảm rất nhiều thời gian cho những công việc như:

- Boilerplate code
- Documentation
- Refactoring
- Debugging
- Viết test
- Giải thích code
- Tìm kiếm solution
- Generate code mẫu

Nhưng AI không nên lấy đi khả năng **phân tích vấn đề, thiết kế hệ thống và ra quyết định kỹ thuật** của developer.

---

## AI không thể thay thế trách nhiệm của con người

Theo tôi, vấn đề lớn nhất không phải là **"AI viết bao nhiêu phần trăm code?"**.

Một developer có thể để AI viết 80% code nhưng vẫn hoàn toàn làm chủ solution nếu người đó:

- Hiểu code
- Hiểu architecture
- Kiểm chứng output
- Kiểm tra edge cases
- Test solution
- Có khả năng debug
- Có khả năng thay đổi và mở rộng
- Chịu trách nhiệm với kết quả cuối cùng

Ngược lại, một developer tự viết 100% code nhưng không hiểu architecture, không test và không review thì cũng không đảm bảo đó là một solution tốt.

Vì vậy, tôi cho rằng **tỷ lệ code do AI tạo ra không phải tiêu chí để đánh giá ownership của developer**.

Tiêu chí quan trọng hơn là:

> **Ai hiểu solution? Ai đưa ra quyết định? Ai kiểm chứng? Và ai chịu trách nhiệm với kết quả cuối cùng?**

Nếu câu trả lời là tôi, thì tôi có thể nói:

> **"Đây là code của tôi."**

---

## AI là một kỹ năng bắt buộc trong thời đại hiện nay

Tôi cũng cho rằng trong thời đại AI, việc cố gắng tránh sử dụng AI hoàn toàn không phải là hướng đi phù hợp.

Thay vì xem AI là mối đe dọa đối với developer, tôi xem nó là một **công cụ mới mà software engineer cần học cách sử dụng**.

Giống như trước đây developer phải biết sử dụng:

- IDE
- Git
- Debugger
- Stack Overflow
- Documentation
- Framework
- Cloud tools

thì hiện nay khả năng làm việc với AI cũng đang trở thành một kỹ năng quan trọng.

Tuy nhiên, **biết sử dụng AI không có nghĩa là biết copy code từ AI**.

Một developer sử dụng AI tốt phải biết:

```text
Đặt vấn đề đúng
      ↓
Cung cấp context đúng
      ↓
Đánh giá solution
      ↓
Kiểm chứng
      ↓
Chỉnh sửa
      ↓
Test
      ↓
Chịu trách nhiệm
```

Do đó, tôi muốn phát triển theo hướng **AI-assisted software engineer**: sử dụng AI để tăng tốc độ và năng suất nhưng vẫn giữ khả năng tư duy độc lập và làm chủ hệ thống.

---

## Kết luận

Theo tôi, **AI không thay thế người lập trình; AI thay đổi cách người lập trình làm việc**.

Tôi không cần chứng minh rằng mình tự viết từng dòng code để có thể nói:

> **"Đây là code của tôi."**

Điều tôi cần chứng minh là tôi **hiểu, kiểm soát, kiểm chứng và chịu trách nhiệm** với code đó.

AI có thể giúp tôi viết code nhanh hơn, đưa ra nhiều hướng giải quyết hơn và giảm thời gian cho những công việc lặp lại.

Nhưng:

> **AI đưa ra đề xuất, con người đưa ra quyết định.**

Và trong một hệ thống phần mềm thực tế, người chịu trách nhiệm cuối cùng vẫn phải là người lập trình.

Vì vậy, thay vì phụ thuộc vào AI, tôi cho rằng chúng ta nên học cách sử dụng AI như một công cụ hỗ trợ bắt buộc trong thời đại mới, đồng thời tiếp tục phát triển những năng lực mà AI không thể thay thế hoàn toàn: **tư duy logic, hiểu nghiệp vụ, thiết kế hệ thống, đánh giá trade-off, khả năng kiểm chứng và trách nhiệm với sản phẩm mình tạo ra.**
