/**
 * @param {number} x
 * @return {boolean}
 */
/*
Time: O(n), n = number of digits in x.
- x.toString(), split, reverse, join, and comparison are all O(n).
Space: O(n), due to new strings/arrays.
*/
var isPalindrome = function (x) {
  if (x < 0) return false;
  let str = x.toString();
  let reversed = str.split("").reverse().join("");
  return str === reversed;
};

/*
Time: O(log₁₀ n), n = input number x.
- Each loop iteration removes a digit (divide by 10).
- Runs for about half the digits.
Space: O(1), only a few variables used.
- No string or array allocation.

Eg: 123321
x = 123321, reversed = 0
- Iteration 1: reversed = 1, x = 12332
- Iteration 2: reversed = 12, x = 1233
- Iteration 3: reversed = 123, x = 123
- End loop: x = 123, reversed = 123
- Return true.

Eg: 12321
x = 12321, reversed = 0
- Iteration 1: reversed = 1, x = 1232
- Iteration 2: reversed = 12, x = 123
- Iteration 3: reversed = 123, x = 12
- End loop: x = 12, reversed = 123
- Return true (after removing middle digit).
*/
var isPalindromeMath = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reversed || x === Math.floor(reversed / 10);
};
