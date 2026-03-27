class Timer {
  constructor() {
    this.intervalId = null;
    this.isRunning = false;
  }

  startCountdown(seconds, callback) {
    if (this.isRunning) {
      console.log("計時器已在執行中");
      return;
    }

    if (typeof seconds !== 'number' || seconds < 0 || !Number.isInteger(seconds)) {
      console.log("請輸入正整數秒數");
      return;
    }

    this.isRunning = true;
    let current = seconds;

    const tick = () => {
      if (current > 0) {
        console.log(`T-minus ${current}...`);
        current--;
      } else {
        console.log("Blast off! 🚀");
        this.stop();
        if (callback) callback();
      }
    };

    tick();
    this.intervalId = setInterval(tick, 1000);
  }

  startCountup(startFrom = 0, callback) {
    if (this.isRunning) {
      console.log("計時器已在執行中");
      return;
    }

    this.isRunning = true;
    let current = startFrom;

    const tick = () => {
      console.log(`経過時間: ${current} 秒`);
      current++;
    };

    tick();
    this.intervalId = setInterval(tick, 1000);
    
    if (callback) {
      this.stopCallback = callback;
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    if (this.stopCallback) {
      this.stopCallback();
      this.stopCallback = null;
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      intervalId: this.intervalId
    };
  }
}

function startTimer(seconds) {
  const timer = new Timer();
  timer.startCountdown(seconds, () => {
    console.log("倒數完成!");
  });
  return timer;
}

function startTimerWithPromise(seconds) {
  return new Promise((resolve) => {
    const timer = new Timer();
    timer.startCountdown(seconds, () => {
      resolve();
    });
  });
}

console.log("=== 倒數計時器 (3秒) ===");
const myTimer = startTimer(3);

setTimeout(() => {
  console.log("\n=== 測試停止功能 ===");
  const timer2 = new Timer();
  timer2.startCountup(0);
  setTimeout(() => {
    timer2.stop();
    console.log("計時器已停止");
  }, 3500);
}, 5000);