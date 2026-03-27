function checkNumber(num) {
  if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
    return "錯誤：請輸入有效的數字";
  }
  
  if (num > 0) return "正數";
  if (num < 0) return "負數";
  return "這是零";
}

function checkNumberType(num) {
  const result = checkNumber(num);
  if (result !== "正數" && result !== "負數" && result !== "這是零") {
    return { valid: false, message: result };
  }
  return { valid: true, type: result, value: num };
}

console.log(checkNumber(10));  
console.log(checkNumber("10"));
console.log(checkNumber(Infinity));
console.log(checkNumber(-5));
console.log(checkNumber(0));
console.log(checkNumberType(100));  