# JavaScript 練習題目 (hw4)

> 本專案包含 10 道 JavaScript 練習題目，涵蓋基礎語法、物件導向設計、陣列處理等主題。

## 題目列表

| 題號 | 檔案 | 功能說明 |
|:----:|------|----------|
| 1 | `1.js` | 數字類型檢查（正數、負數、零、Infinity） |
| 2 | `2.js` | 九九乘法表（完整表格 + 單一數字查詢） |
| 3 | `3.js` | 陣列統計（sum, avg, min, max, median, stdDev） |
| 4 | `4.js` | 猜數字遊戲（回合制互動、hint 提示） |
| 5 | `5.js` | 通訊錄管理（Email/Phone 驗證、timestamp） |
| 6 | `6.js` | 訂單管理（JSON 解析、價格篩選、排序） |
| 7 | `7.js` | 購物車系統（加入/移除商品、折扣計算） |
| 8 | `8.js` | 倒數計時器（倒數/遞增計時、停止功能） |
| 9 | `9.js` | 字串工具（反轉、回文檢測、首都大寫） |
| 10 | `10.js` | 學生管理（排名、分數分布、平均計算） |

---

## 執行結果總覽

### 1.js - 數字類型檢查

```javascript
checkNumber(10)           // → "正數"
checkNumber("10")         // → "錯誤：請輸入有效的數字"
checkNumber(Infinity)    // → "錯誤：請輸入有效的數字"
checkNumber(-5)          // → "負數"
checkNumber(0)           // → "這是零"
checkNumberType(100)     // → { valid: true, type: '正數', value: 100 }
```

### 2.js - 九九乘法表

```
=== 完整九九乘法表 ===
     1  2  3  4  5  6  7  8  9
---------------------------------------
 1 |  1   2   3   4   5   6   7   8   9 
 2 |  2   4   6   8  10  12  14  16  18 
 3 |  3   6   9  12  15  18  21  24  27 
 4 |  4   8  12  16  20  24  28  32  36 
 5 |  5  10  15  20  25  30  35  40  45 
 6 |  6  12  18  24  30  36  42  48  54 
 7 |  7  14  21  28  35  42  49  56  63 
 8 |  8  16  24  32  40  48  56  64  72 
 9 |  9  18  27  36  45  54  63  72  81 

=== 單一數字乘法表 (範例: 7) ===
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
...
7 x 9 = 63
```

### 3.js - 陣列統計

```javascript
// 輸入: [1, 2, 3, 4, 5, 10]
getStats([1, 2, 3, 4, 5, 10])
// → { sum: 25, avg: 4.17, min: 1, max: 10, median: 3.5, count: 6 }

getStatsExtended([1, 2, 3, 4, 5, 10])
// → { sum: 25, avg: 4.17, min: 1, max: 10, median: 3.5, count: 6, stdDev: 2.91 }
```

### 4.js - 猜數字遊戲

```javascript
const game = createGame(7);

game.guess(50)  // → { success: false, hint: '太小了', attempts: 1 }
game.guess(25) // → { success: false, hint: '太小了', attempts: 2 }
game.guess(10) // → { success: false, hint: '太小了', attempts: 3 }
game.guess(7)  // → { success: true, message: '恭喜猜對！答案就是 7', attempts: 4 }

game.getHistory() // → [50, 25, 10, 7]
```

### 5.js - 通訊錄管理

```javascript
const contact = new Contact("Leo", "leo@test.com", "0912345678");

// 初始資料
{
  name: 'Leo',
  email: 'leo@test.com',
  phone: '0912345678',
  createdAt: '2026-03-27T03:14:40.180Z',
  updatedAt: '2026-03-27T03:14:40.180Z'
}

// 更新 Email
contact.updateEmail("new_leo@example.com")  // → "✓ Email 更新成功: new_leo@example.com"
contact.updateEmail("invalid-email")         // → "✗ 無效的 Email 格式"

// 更新後
{
  name: 'Leo',
  email: 'new_leo@example.com',
  phone: '0988-123-456',
  createdAt: '2026-03-27T03:14:40.180Z',
  updatedAt: '2026-03-27T03:14:40.183Z'
}
```

### 6.js - 訂單管理

```javascript
const rawData = '[{"id":1,"name":"商品A","price":200},{"id":2,"name":"商品B","price":1500},{"id":3,"name":"商品C","price":850}]';
const manager = new OrderManager();

manager.loadFromJson(rawData)      // → { success: true, count: 3 }
manager.filterByMinPrice(1000)    // → [{ id: 2, name: '商品B', price: 1500 }]
manager.sortByPrice()             // → 按價格排序的陣列
manager.getTotalPrice()           // → 2550
manager.getAveragePrice()         // → 850
```

### 7.js - 購物車系統

```javascript
const cart = new ShoppingCart();
cart.addItem("麵包", 45.5, 2);  // 91 元
cart.addItem("牛奶", 90, 1);   // 90 元
cart.addItem("雞蛋", 65, 3);   // 195 元

// 購物車內容
[
  { name: '麵包', price: 45.5, qty: 2, subtotal: 91 },
  { name: '牛奶', price: 90, qty: 1, subtotal: 90 },
  { name: '雞蛋', price: 65, qty: 3, subtotal: 195 }
]

// 結帳 (無折扣)
cart.checkout()
// → { success: true, subtotal: 376, discount: 0, total: 376, itemCount: 3 }

// 結帳 (10% 折扣)
cart.addItem("餅乾", 35, 2);
cart.setDiscount(10);
cart.checkout()
// → { success: true, subtotal: 70, discount: 7, total: 63, itemCount: 1 }
```

### 8.js - 倒數計時器

```javascript
const timer = new Timer();

// 倒數計時 (3秒)
timer.startCountdown(3, () => console.log("倒數完成!"));
// 輸出:
// T-minus 3...
// T-minus 2...
// T-minus 1...
// Blast off! 🚀
// 倒數完成!

// 遞增計時 + 停止
const timer2 = new Timer();
timer2.startCountup(0);
// ... 3.5 秒後 ...
timer2.stop();  // → "計時器已停止"
```

### 9.js - 字串工具

```javascript
// 基本反轉
StringUtils.reverseText("JavaScript")    // → "tpircSavaJ"
StringUtils.reverseText("Hello World")   // → "dlroW olleH"

// 單字順序反轉
StringUtils.reverseWords("Hello World")  // → "World Hello"

// 每個單字內部反轉
StringUtils.reverseWordsKeepOrder("Hello World")  // → "olleH dlroW"

// 回文檢測
StringUtils.isPalindrome("A man a plan a canal Panama")  // → true
StringUtils.isPalindrome("hello")                        // → false
StringUtils.isPalindrome("racecar")                       // → true

// 字首都大寫
StringUtils.capitalize("hello world javascript")  // → "Hello World Javascript"

// 字元計數
StringUtils.countCharacters("hello")  // → { h: 1, e: 1, l: 2, o: 1 }
```

### 10.js - 學生管理

```javascript
const students = [
  { name: "Alice", score: 98 },
  { name: "Bob", score: 85 },
  { name: "Cindy", score: 98 },
  { name: "David", score: 72 },
  { name: "Eve", score: 55 }
];
const manager = new StudentManager(students);

// 找出最高分得主
manager.getWinners()
// → {
//   success: true,
//   winners: [{ name: 'Alice', score: 98 }, { name: 'Cindy', score: 98 }],
//   topScore: 98,
//   winnerCount: 2,
//   message: '最高分：98，得主：Alice, Cindy'
// }

// 排名列表
manager.getRanking()
// → [
//   { rank: 1, name: 'Alice', score: 98 },
//   { rank: 2, name: 'Cindy', score: 98 },
//   { rank: 3, name: 'Bob', score: 85 },
//   { rank: 4, name: 'David', score: 72 },
//   { rank: 5, name: 'Eve', score: 55 }
// ]

// 分數分布
manager.getScoreDistribution()
// → { 'A (90-100)': 2, 'B (80-89)': 1, 'C (70-79)': 1, 'D (60-69)': 0, 'F (<60)': 1 }

// 平均分數
manager.getAverageScore()  // → 81.6
```

---

## 使用方式

### 執行單一題目
```bash
node 1.js
node 2.js
# ...以此類推
```

---

## 技術栈

- **JavaScript (ES6+)** - 核心語言
- **Class 語法** - 物件導向設計 (5-10題)
- **Array 方法** - map, filter, reduce, sort
- **正則表達式** - Email/Phone 驗證

---

## 學習重點

| 題號 | 學習重點 |
|------|----------|
| 1 | 類型檢查、邊界條件處理 |
| 2 | 巢狀迴圈、字串格式化 |
| 3 | 陣列統計、中位數、標準差 |
| 4 | Class 設計、遊戲邏輯 |
| 5 | 物件導向、Getter/Setter、驗證 |
| 6 | JSON 處理、資料篩選排序 |
| 7 | 購物車邏輯、折扣計算 |
| 8 | 非同步計時、setInterval |
| 9 | 字串操作、回文演算法 |
| 10 | 資料排序、分組統計 |

---

## 授權

MIT License
