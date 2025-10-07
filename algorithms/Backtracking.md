Giải thuật **backtracking** (quay lui) là một **kỹ thuật duyệt và thử sai có hệ thống**, được dùng để **tìm lời giải cho các bài toán có nhiều khả năng lựa chọn**, ví dụ như sinh hoán vị, tổ hợp, giải Sudoku, n-queens, hay tìm đường đi trong mê cung.

---

## 🔍 1. Ý tưởng chính

Backtracking là **duyệt tất cả các khả năng**, nhưng **loại bỏ sớm** những hướng đi không hợp lệ (gọi là *cắt tỉa*).

Quy trình tổng quát:

1. **Chọn** một bước tiếp theo (ví dụ: đặt giá trị, chọn phần tử, di chuyển,...).
2. **Kiểm tra điều kiện**: nếu bước này hợp lệ thì tiếp tục.
3. **Gọi đệ quy** để xử lý bước kế tiếp.
4. Nếu không tìm thấy lời giải → **quay lui (backtrack)**, **hoàn tác** lựa chọn vừa rồi và thử hướng khác.

---

## ⚙️ 2. Mẫu (template) của backtracking (pseudo code)

```pseudo
procedure backtrack(state):
    if state là lời giải:
        ghi nhận lời giải
        return
    
    for mỗi lựa chọn hợp lệ trong state:
        áp dụng lựa chọn
        backtrack(state mới)
        hoàn tác lựa chọn (quay lui)
```

---

## 🧩 3. Ví dụ minh họa: N-Queens

**Bài toán:** đặt `N` quân hậu lên bàn cờ `N×N` sao cho không quân nào ăn nhau.

```python
def solve_n_queens(n):
    board = [-1] * n  # board[row] = col
    results = []

    def is_valid(row, col):
        for r in range(row):
            c = board[r]
            if c == col or abs(c - col) == abs(r - row):
                return False
        return True

    def backtrack(row):
        if row == n:
            results.append(board[:])
            return
        for col in range(n):
            if is_valid(row, col):
                board[row] = col
                backtrack(row + 1)
                board[row] = -1  # quay lui

    backtrack(0)
    return results
```

---

## 🌳 4. Minh họa bằng cây quyết định

Ví dụ cho `N = 4`:

```
Row 0: thử col 0 ─┬─> Row 1: thử col 2 ─┬─> Row 2: thử col 3 ─┬─> Row 3: ...
                  │                     │
                  │                     └─> col không hợp lệ → quay lui
                  │
                  └─> col 1, col 3 ... (thử tiếp)
```

Mỗi **nút** là một trạng thái, mỗi **nhánh** là một lựa chọn, và ta duyệt **theo chiều sâu (DFS)**.

---

## ✂️ 5. Kỹ thuật “cắt tỉa” (pruning)

Để tối ưu, ta **loại bỏ sớm** các hướng đi chắc chắn sai:

* Ví dụ trong Sudoku, nếu một số trùng trong hàng/cột thì dừng nhánh đó.
* Giúp giảm đáng kể số lần thử → tăng tốc độ.

---

## 🧠 6. Khi nào dùng backtracking?

| Tình huống                                         | Ví dụ                                         |
| -------------------------------------------------- | --------------------------------------------- |
| Cần sinh tất cả lời giải                           | Tổ hợp, hoán vị, phân hoạch                   |
| Tìm lời giải hợp lệ đầu tiên                       | Sudoku, N-Queens                              |
| Duyệt không gian trạng thái lớn nhưng có ràng buộc | Pathfinding, Constraint satisfaction problems |

---

## 📈 7. So sánh nhanh

| Phương pháp         | Đặc điểm                                                  |
| ------------------- | --------------------------------------------------------- |
| Brute force         | Thử mọi khả năng, không cắt tỉa                           |
| Backtracking        | Thử và **cắt tỉa sớm** các hướng sai                      |
| Dynamic Programming | Ghi nhớ kết quả con để tránh tính lại                     |
| Branch & Bound      | Cắt tỉa dựa trên giá trị ước lượng tốt nhất (có trọng số) |

---

Nếu bạn muốn, mình có thể vẽ **sơ đồ cây quyết định** cho ví dụ cụ thể (như Sudoku hoặc N-Queens) để bạn thấy rõ cơ chế “quay lui”.
👉 Bạn muốn mình minh họa bằng ví dụ nào?
