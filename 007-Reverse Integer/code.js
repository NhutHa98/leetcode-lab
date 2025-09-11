/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);
  let rev = 0;
  while (x !== 0) {
    const pop = x % 10;
    x = (x / 10) | 0;
    if (rev > MAX / 10 || (rev === MAX / 10 && pop > 7)) return 0;
    if (rev < MIN / 10 || (rev === MIN / 10 && pop < -8)) return 0;
    rev = rev * 10 + pop;
  }
  return rev;
};
