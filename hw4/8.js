function startTimer(seconds) {
  if (seconds < 0) return console.log("請輸入正數");
  
  let current = seconds;
  while (current >= 0) {
    const msg = current === 0 ? "Blast off! 🚀" : `T-minus ${current}...`;
    console.log(msg);
    current--;
  }
}
startTimer(3);