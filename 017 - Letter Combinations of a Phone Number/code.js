/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits) return [];
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const result = [];
    const backtrack = (combination, nextDigits) => {
        if (nextDigits.length === 0) {
            result.push(combination);
        } else {
            for (let letter of map[nextDigits[0]]) {
                backtrack(combination + letter, nextDigits.slice(1));
            }
        }
    };
    backtrack('', digits);
    return result;
};