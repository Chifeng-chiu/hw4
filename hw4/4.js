function playGame(target) {
  let guess = 0;
  let attempts = 0;
  const maxAttempts = 100; 

  while (guess !== target && attempts < maxAttempts) {
    guess = Math.floor(Math.random() * 10) + 1;
    attempts++;
    console.log(`第 ${attempts} 次嘗試：猜測 ${guess}`);
  }

  if (guess === target) console.log(`成功！共花了 ${attempts} 次。`);
  else console.log("達到最大嘗試次數，失敗。");
}
playGame(7);