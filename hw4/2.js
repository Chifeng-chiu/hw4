function printMultiplicationTable() {
  for (let i = 1; i <= 9; i++) {
    let row = "";
    for (let j = 1; j <= 9; j++) {
      row += `${i}*${j}=${String(i * j).padStart(2, ' ')}  `;
    }
    console.log(row);
  }
}
printMultiplicationTable();