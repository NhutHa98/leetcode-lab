# 2042. Check if Numbers Are Ascending in a Sentence

## 1. Idea
The goal is to determine if all numbers in a given sentence appear in strictly ascending order. The intuition is to scan the sentence, extract all numbers, and check if each number is greater than the previous one. This works because the problem only cares about the order of numbers, not their position in the sentence.

## 2. Step-by-Step Walkthrough
1. Split the sentence into words using spaces.
2. Iterate through each word:
   - If the word is a number (all digits), convert it to an integer.
   - Compare it to the previous number found (if any).
   - If the current number is not greater than the previous, return `false`.
3. If all numbers are in strictly ascending order, return `true`.

## 3. Algorithm Used
- **String Parsing**
- **Linear Scan**
- **Comparison Tracking**

## 4. Time and Space Complexity
- **Time Complexity:** O(n), where n is the number of words in the sentence.
- **Space Complexity:** O(1), since only a few variables are used for tracking.

## 5. Alternative Solutions
### a. Regular Expression Extraction
- Use regex to extract all numbers from the sentence, then check if the resulting array is strictly increasing.
- **Pros:** Concise, easy to read.
- **Cons:** Slightly more overhead due to regex engine.

### b. Store All Numbers First
- Parse all numbers into an array, then check if the array is strictly increasing.
- **Pros:** Clear separation of extraction and checking.
- **Cons:** Uses O(k) space, where k is the number of numbers in the sentence.

## 6. Example Walkthrough
**Input:**
```
"1 box has 3 blue 4 red 6 green and 12 yellow balls"
```
- Extracted numbers: 1, 3, 4, 6, 12
- Check: 1 < 3 < 4 < 6 < 12 → All strictly increasing
- **Output:** `true`

**Input:**
```
"hello 5 world 5"
```
- Extracted numbers: 5, 5
- Check: 5 is not less than 5
- **Output:** `false`

---

# Other Solutions

## Solution 2: Regular Expression Extraction

### Idea
Use a regular expression to extract all numbers from the sentence, then check if the sequence is strictly increasing.

### Step-by-Step
1. Use regex `/\d+/g` to find all numbers in the sentence.
2. Convert each match to an integer.
3. Iterate through the array and check if each number is greater than the previous.

### Algorithm
- **Regex Extraction**
- **Array Comparison**

### Complexity
- **Time:** O(n) (n = sentence length)
- **Space:** O(k) (k = number of numbers)

### Pros/Cons
- **Pros:** Very concise, easy to implement.
- **Cons:** Slightly higher space usage.

### Example
**Input:** "1 box has 3 blue 4 red 6 green and 12 yellow balls"
- Regex finds ["1", "3", "4", "6", "12"]
- Check: 1 < 3 < 4 < 6 < 12 → `true`

## Solution 3: Two Pointers

### Idea
Use two pointers to scan the sentence and compare numbers as they are found, without storing all numbers.

### Step-by-Step
1. Initialize a pointer to scan the sentence.
2. When a digit is found, parse the full number.
3. Compare to the previous number.
4. If not strictly increasing, return `false`.
5. Continue until the end of the sentence.

### Algorithm
- **Two Pointers**
- **On-the-fly Comparison**

### Complexity
- **Time:** O(n)
- **Space:** O(1)

### Pros/Cons
- **Pros:** Minimal space usage, efficient.
- **Cons:** Slightly more complex to implement.

### Example
**Input:** "hello 5 world 5"
- First number: 5
- Second number: 5 (not greater)
- Output: `false`

---

## Summary
All solutions efficiently check for strictly ascending numbers in a sentence. The choice depends on preference for readability, space usage, and familiarity with regex or pointer techniques.