function checkNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return "錯誤：請輸入有效的數字";
  
  if (num > 0) return "正數";
  if (num < 0) return "負數";
  return "這是零";
}

console.log(checkNumber(10));  
console.log(checkNumber("10"));  