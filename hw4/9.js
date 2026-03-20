const reverseText = (text) => {
  if (typeof text !== 'string') return "";
  // 拆分 -> 反轉 -> 合併
  return [...text].reverse().join("");
};
console.log(reverseText("JavaScript")); // "tpircSavaJ"