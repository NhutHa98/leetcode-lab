/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  let i = 0,
    n = s.length;
  // Skip leading whitespace
  while (i < n && s[i] === " ") i++;

  // Check sign
  let sign = 1;
  if (i < n && (s[i] === "-" || s[i] === "+")) {
    if (s[i] === "-") sign = -1;
    i++;
  }

  // Read digits
  let num = 0,
    digitFound = false;
  while (i < n && s[i] === "0") {
    digitFound = true;
    i++; // skip leading zeros
  }
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    digitFound = true;
    num = num * 10 + (s[i].charCodeAt(0) - "0".charCodeAt(0));
    i++;
  }

  if (!digitFound) return 0;

  num *= sign;
  if (num < INT_MIN) return INT_MIN;
  if (num > INT_MAX) return INT_MAX;
  return num;
};
