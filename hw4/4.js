class GuessingGame {
  constructor(target, maxAttempts = 10) {
    this.target = target;
    this.maxAttempts = maxAttempts;
    this.attempts = 0;
    this.history = [];
  }

  guess(number) {
    if (this.attempts >= this.maxAttempts) {
      return { success: false, message: "遊戲結束，已達最大嘗試次數", attempts: this.attempts };
    }

    this.attempts++;
    this.history.push(number);

    if (typeof number !== 'number' || number < 1 || number > 100 || !Number.isInteger(number)) {
      return { success: false, message: "請輸入 1-100 的整數", attempts: this.attempts };
    }

    if (number === this.target) {
      return { success: true, message: `恭喜猜對！答案就是 ${this.target}`, attempts: this.attempts };
    }

    const hint = number < this.target ? "太大了" : "太小了";
    return { success: false, message: `${hint}，再試一次！`, attempts: this.attempts, hint };
  }

  getHistory() {
    return this.history;
  }

  isGameOver() {
    return this.attempts >= this.maxAttempts;
  }

  getRemainingAttempts() {
    return this.maxAttempts - this.attempts;
  }
}

function createGame(target) {
  if (typeof target !== 'number' || target < 1 || target > 100 || !Number.isInteger(target)) {
    return null;
  }
  return new GuessingGame(target);
}

const game = createGame(7);
if (game) {
  console.log("=== 猜數字遊戲 (1-100) ===");
  console.log(game.guess(50));
  console.log(game.guess(25));
  console.log(game.guess(10));
  console.log(game.guess(7));
  console.log("猜測歷史:", game.getHistory());
} else {
  console.log("請設定 1-100 的目標數字");
}