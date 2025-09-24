/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const openCharacters = ["(", "{", "["];
    const closeCharacters = [")", "}", "]"];
    const ls = (s ?? "").split(""); // split into individual characters
    for (let i = 0; i < ls.length; i++) {
        const char = ls[i];
        if (openCharacters.includes(char)) {
            stack.push(char);
        } else if (closeCharacters.includes(char)) {
            if (stack.length === 0) {
                return false;
            }
            const lastOpen = stack.pop();
            if (openCharacters.indexOf(lastOpen) !== closeCharacters.indexOf(char)) {
                return false;
            }
        }
    }
    return stack.length === 0;
};


var isValidAlt = function(s) {
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    const stack = [];
    for (let char of s) {
        if (map[char]) {
            stack.push(char);
        } else if (Object.values(map).includes(char)) {
            if (stack.length === 0 || map[stack.pop()] !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
};