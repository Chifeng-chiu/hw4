class StringUtils {
  static reverseText(text) {
    if (typeof text !== 'string') return "";
    return [...text].reverse().join("");
  }

  static reverseWords(text) {
    if (typeof text !== 'string') return "";
    return text.split(' ').reverse().join(' ');
  }

  static reverseWordsKeepOrder(text) {
    if (typeof text !== 'string') return "";
    return text.split(' ').map(word => this.reverseText(word)).join(' ');
  }

  static isPalindrome(text) {
    if (typeof text !== 'string') return false;
    const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === this.reverseText(cleaned);
  }

  static capitalize(text) {
    if (typeof text !== 'string') return "";
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  static countCharacters(text) {
    if (typeof text !== 'string') return {};
    return text.split('').reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});
  }
}

const reverseText = (text) => StringUtils.reverseText(text);

console.log("=== 基本反轉 ===");
console.log(reverseText("JavaScript"));
console.log(reverseText("Hello World"));

console.log("\n=== 單字順序反轉 ===");
console.log(StringUtils.reverseWords("Hello World"));

console.log("\n=== 每個單字內部反轉 ===");
console.log(StringUtils.reverseWordsKeepOrder("Hello World"));

console.log("\n=== 回文檢測 ===");
console.log(StringUtils.isPalindrome("A man a plan a canal Panama"));
console.log(StringUtils.isPalindrome("hello"));
console.log(StringUtils.isPalindrome("racecar"));

console.log("\n=== 字首都大寫 ===");
console.log(StringUtils.capitalize("hello world javascript"));

console.log("\n=== 字元計數 ===");
console.log(StringUtils.countCharacters("hello"));