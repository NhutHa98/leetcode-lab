Rõ rồi 👍. Mình sẽ gom toàn bộ các phần trả lời trước về **Sliding Window** thành một bản viết chuyên nghiệp, gọn gàng, dễ lưu trữ như một bài chia sẻ trên diễn đàn/kỹ thuật blog.

---

# Sliding Window trong Lập Trình và Ứng Dụng Thực Tế

## 1. Khái niệm

**Sliding Window (cửa sổ trượt)** là kỹ thuật duyệt qua mảng/chuỗi bằng cách sử dụng một đoạn con liên tiếp (window), sau đó **trượt** cửa sổ qua dữ liệu thay vì duyệt lại toàn bộ từ đầu.

* Giúp giảm độ phức tạp từ `O(n*k)` xuống `O(n)`.
* Có hai dạng chính: **kích thước cố định** (fixed window) và **kích thước thay đổi** (variable window).

---

## 2. Nguyên lý hoạt động

* Dùng **hai con trỏ** `left` và `right` xác định biên cửa sổ.
* Khi dịch chuyển:

  * Mở rộng `right` để thêm phần tử mới.
  * Co `left` để loại bỏ phần tử cũ hoặc khi không thỏa điều kiện.
* Cửa sổ sẽ lần lượt quét qua toàn bộ mảng/chuỗi.

---

## 3. Ví dụ minh họa

### 3.1. Tổng lớn nhất của k phần tử liên tiếp

Mảng: `[2, 1, 5, 1, 3, 2]`, `k = 3`.

Thay vì tính tổng cho từng đoạn (`O(n*k)`), chỉ cần:

* Cộng thêm phần tử mới.
* Trừ đi phần tử vừa bị loại khỏi cửa sổ.

Kết quả: `max = 9`.

### 3.2. Chuỗi con dài nhất không có ký tự lặp

Với chuỗi `"abcabcbb"`, dùng cửa sổ + HashSet để kiểm tra ký tự trùng.
Kết quả: `"abc"`, độ dài = 3.

---

## 4. Ứng dụng thực tế

* **Phân tích log:** đếm số request tối đa trong 5 phút gần nhất.
* **Xử lý tín hiệu:** tính **moving average** để làm mượt dữ liệu.
* **Bảo mật:** phát hiện brute-force login trong khoảng thời gian ngắn.
* **Xử lý chuỗi/mảng:** tìm substring thỏa điều kiện (không lặp, tổng nhỏ hơn K, v.v.).
* **Big Data / Stream Processing:** xử lý dữ liệu đến liên tục mà không cần lưu toàn bộ vào bộ nhớ.

---

## 5. Triển khai Java

### 5.1. Cơ bản (tổng lớn nhất của k phần tử liên tiếp)

```java
public static int maxSum(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = windowSum;

    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
```

### 5.2. Nâng cao (chuỗi con dài nhất không lặp)

```java
public static int lengthOfLongestSubstring(String s) {
    HashSet<Character> set = new HashSet<>();
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

---

## 6. Thư viện Java có hỗ trợ Sliding Window

* **Guava (Google):** `EvictingQueue` – queue có kích thước cố định, khi thêm phần tử mới thì loại phần tử cũ.
* **RxJava / Project Reactor:** `buffer()` / `window()` – sliding window trên reactive stream.
* **Kafka Streams:** hỗ trợ **tumbling window, hopping window, sliding window** cho xử lý dữ liệu thời gian thực.
* **Apache Flink:** `timeWindow()` với tham số size & slide, xử lý stream quy mô lớn.
* **Esper / Siddhi (CEP):** hỗ trợ `win:time`, `win:length` để định nghĩa cửa sổ theo thời gian hoặc độ dài.

---

## 7. Tóm lại

Sliding Window là một kỹ thuật cơ bản nhưng cực kỳ hiệu quả trong xử lý dữ liệu tuần tự. Trong Java:

* Các bài toán nhỏ thường tự cài đặt bằng cách dùng **2 con trỏ**.
* Với ứng dụng **stream processing** hoặc **real-time analytics**, có thể dùng sẵn trong các thư viện/framework như **Guava, RxJava, Reactor, Kafka Streams, Flink, Esper**.

---

Bạn có muốn mình đóng gói bản này thành file **Markdown (.md)** để bạn lưu lại làm tài liệu học tập không?
