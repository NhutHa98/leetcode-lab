## Explanation

This function, `lengthOfLongestSubstringxx`, finds the length of the longest substring without repeating characters in a given string `s`.

### How it works

- It uses a sliding window approach with two pointers: `start` (beginning of the window) and `end` (end of the window).
- A `Map` called `charIndexMap` keeps track of the last index where each character was seen.
- As it iterates through the string:
  - If the current character has been seen before and its last occurrence is within the current window, the `start` pointer moves to one position after the last occurrence of that character.
  - The character's latest index is updated in the map.
  - The maximum length of the substring found so far is updated.

### Step-by-step

1. Initialize `maxLength` to 0, `start` to 0, and an empty map.
2. For each character at index `end`:
   - If the character exists in the map and its index is >= `start`, move `start` to `charIndexMap.get(s[end]) + 1`.
   - Update the character's index in the map.
   - Update `maxLength` with the length of the current window (`end - start + 1`).
3. Return `maxLength` after the loop.

### Example

For input `"abcabcbb"`:
- The longest substring without repeating characters is `"abc"`, so the function returns `3`.

---

## Time Complexity (Big O)

- **Time Complexity:** O(n)
  - Each character is processed at most twice (once by `end`, once by `start`), so the algorithm runs in linear time relative to the length of the string.
- **Space Complexity:** O(min(n, m))
  - `n` is the length of the string, `m` is the size of the character set (number of unique characters in `s`). The map stores at most one entry per unique character.
