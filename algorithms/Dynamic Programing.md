# Quy hoạch động (Dynamic Programming)

## 1. Ý tưởng

Quy hoạch động (DP) là một kỹ thuật trong khoa học máy tính để giải quyết các bài toán tối ưu bằng cách:

1. **Chia nhỏ** bài toán lớn thành nhiều bài toán con.
2. **Nhận diện sự chồng chéo** của các bài toán con.
3. **Lưu trữ (memoize/tabulate)** kết quả của các bài toán con đã giải, tránh tính toán lại.

Điểm mạnh của DP là biến những bài toán có độ phức tạp hàm mũ (**O(2^n)**, **O(3^n)**) thành bài toán có độ phức tạp tuyến tính hoặc đa thức (**O(n)**, **O(n·m)**).

---

## 2. Cách hoạt động

Quy hoạch động thường tuân theo 4 bước chính:

1. **Xác định trạng thái (State)**: Biểu diễn một phần của nghiệm (ví dụ: `dp[i][j]` = giá trị tốt nhất xét đến i phần tử, với dung lượng j).
2. **Xây dựng công thức truy hồi (Recurrence Relation)**: Xác định mối quan hệ giữa trạng thái hiện tại và các trạng thái nhỏ hơn.
3. **Khởi tạo (Initialization)**: Đặt giá trị cơ sở (base cases).
4. **Tính toán**:

   * **Top-down (Memoization)**: Dùng đệ quy + lưu kết quả.
   * **Bottom-up (Tabulation)**: Duyệt tuần tự, lưu bảng DP.

---

## 3. Độ phức tạp (Big O)

* Fibonacci: từ **O(2^n)** (brute force) → **O(n)** (DP).
* Knapsack 0/1: **O(n·W)** với `n` là số vật phẩm, `W` là trọng lượng tối đa.
* Edit Distance: **O(n·m)** với `n, m` là độ dài chuỗi.
* Floyd-Warshall: **O(n^3)** nhưng khả thi nhờ DP lưu trạng thái trung gian.

---

## 4. Code minh họa (Javascript – Fibonacci & Knapsack)

```javascript
// Fibonacci - Bottom-up DP
function fib(n) {
  if (n <= 1) return n;
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
console.log(fib(10)); // 55

// 0/1 Knapsack
function knapsack(weights, values, W) {
  let n = weights.length;
  let dp = Array(n + 1).fill().map(() => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][W];
}
console.log(knapsack([2,3,4], [4,5,10], 6)); // 14
```

---

## 5. Thư viện & GitHub Repo trực tiếp về DP

* **JavaScript**

  * `memoizee`, `lodash.memoize` (memoization cho các hàm đệ quy).
  * GitHub: [TheAlgorithms/Javascript](https://github.com/TheAlgorithms/Javascript/tree/master/Dynamic%20Programming).

* **Java**

  * Tích hợp `HashMap`, `Arrays.fill` cho memoization.
  * Framework: [OptaPlanner](https://github.com/kiegroup/optaplanner) (sử dụng DP trong tối ưu hóa lập lịch).
  * GitHub: [TheAlgorithms/Java](https://github.com/TheAlgorithms/Java/tree/master/Dynamic%20Programming).

* **Python**

  * `functools.lru_cache` (memoization tự động).
  * `NumPy` để xử lý bảng DP nhiều chiều.
  * `OR-Tools` (Google) dùng DP cho tối ưu hóa tuyến tính & tổ hợp.
  * GitHub: [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python/tree/master/dynamic_programming).

* **Khác**

  * **C++**: [cp-algorithms](https://cp-algorithms.com/) – kho tài liệu và code DP.
  * **Rust**: [Rust Algorithms](https://github.com/TheAlgorithms/Rust).
  * **Phần mềm**: MATLAB, Excel Solver, Gurobi, CPLEX – đều ứng dụng DP trong tối ưu hóa.

---

## 6. Ứng dụng thực tế

* **Đường đi ngắn nhất**: Floyd-Warshall, Bellman-Ford (Google Maps, GPS).
* **Xử lý chuỗi**: Edit Distance, Longest Common Subsequence (NLP, Spell Checker, Bioinformatics).
* **Tối ưu hóa logistics**: Bài toán phân phối, Knapsack, TSP.
* **AI/Game**: Quyết định chiến lược tối ưu, Minimax + DP.
* **Sinh học**: So khớp chuỗi DNA/Protein bằng DP (Smith-Waterman, Needleman-Wunsch).

---

## 7. Case Study

* **Knapsack Problem**: Lựa chọn hàng hóa tối ưu trong giới hạn trọng lượng (ứng dụng thương mại & logistics).
* **Protein Sequence Alignment**: DP giúp so khớp chuỗi sinh học nhanh chóng (dùng trong nghiên cứu y sinh).
* **Google Maps / GPS**: Floyd-Warshall & Dijkstra cải thiện tính toán đường đi.
* **Speech Recognition**: Thuật toán Viterbi (DP) trong HMM để giải mã chuỗi âm thanh.

---

## 8. Benchmark

* **Fibonacci (n=50)**

  * Brute force: mất hàng giờ.
  * DP: chạy trong < 1ms.
* **Edit Distance (chuỗi dài 1k ký tự)**

  * Brute force: không khả thi.
  * DP: tính được trong vài giây.
* **Knapsack (n=100, W=1000)**

  * Brute force: \~2^100 (bất khả thi).
  * DP: \~10^5 phép tính, chạy dưới 1s.

---

## 9. Kết luận

Quy hoạch động là nền tảng quan trọng trong lập trình và khoa học máy tính, giúp giải quyết các bài toán tối ưu phức tạp bằng cách tận dụng tính chất **chồng chéo của bài toán con**.
Nhờ DP, nhiều bài toán từ AI, NLP, y sinh, đến logistics đều trở nên khả thi. Các GitHub repo và framework (TheAlgorithms, OR-Tools, OptaPlanner) là nguồn tài liệu tuyệt vời để học và áp dụng.

---
