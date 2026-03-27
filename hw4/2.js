function printMultiplicationTable() {
  const header = "   " + [...Array(9)].map((_, i) => String(i + 1).padStart(3, ' ')).join('');
  console.log(header);
  console.log("-".repeat(39));
  
  for (let i = 1; i <= 9; i++) {
    let row = String(i).padStart(2, ' ') + " |";
    for (let j = 1; j <= 9; j++) {
      const result = i * j;
      row += String(result).padStart(3, ' ') + " ";
    }
    console.log(row);
  }
}

function getMultiplicationTable(n) {
  if (typeof n !== 'number' || n < 1 || n > 9 || !Number.isInteger(n)) {
    return "請輸入 1-9 的整數";
  }
  return [...Array(9)].map((_, i) => {
    const j = i + 1;
    return `${n} x ${j} = ${n * j}`;
  });
}

console.log("=== 完整九九乘法表 ===");
printMultiplicationTable();
console.log("\n=== 單一數字乘法表 (範例: 7) ===");
console.log(getMultiplicationTable(7).join('\n'));