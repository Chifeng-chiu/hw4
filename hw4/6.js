class OrderManager {
  constructor() {
    this.orders = [];
  }

  addOrder(order) {
    if (!order.id || typeof order.price !== 'number' || order.price <= 0) {
      return { success: false, message: "無效的訂單資料" };
    }
    this.orders.push(order);
    return { success: true, message: "訂單已新增" };
  }

  loadFromJson(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (!Array.isArray(data)) {
        throw new Error("JSON 格式應為陣列");
      }
      this.orders = data;
      return { success: true, count: data.length };
    } catch (e) {
      console.error("解析 JSON 失敗:", e.message);
      return { success: false, message: e.message };
    }
  }

  filterByMinPrice(minPrice) {
    if (typeof minPrice !== 'number' || minPrice < 0) {
      return [];
    }
    return this.orders.filter(order => order.price >= minPrice);
  }

  filterByMaxPrice(maxPrice) {
    if (typeof maxPrice !== 'number' || maxPrice < 0) {
      return this.orders;
    }
    return this.orders.filter(order => order.price <= maxPrice);
  }

  filterByPriceRange(minPrice, maxPrice) {
    return this.orders.filter(order => order.price >= minPrice && order.price <= maxPrice);
  }

  getTotalPrice() {
    return this.orders.reduce((acc, order) => acc + order.price, 0);
  }

  getAveragePrice() {
    if (this.orders.length === 0) return 0;
    return this.getTotalPrice() / this.orders.length;
  }

  sortByPrice(ascending = true) {
    return [...this.orders].sort((a, b) => 
      ascending ? a.price - b.price : b.price - a.price
    );
  }

  getAll() {
    return this.orders;
  }
}

const rawData = '[{"id":1, "name":"商品A", "price":200}, {"id":2, "name":"商品B", "price":1500}, {"id":3, "name":"商品C", "price":850}]';
const manager = new OrderManager();

console.log("=== 載入訂單資料 ===");
console.log(manager.loadFromJson(rawData));

console.log("\n=== 篩選價格 >= 1000 ===");
console.log(manager.filterByMinPrice(1000));

console.log("\n=== 所有訂單 (按價格排序) ===");
console.log(manager.sortByPrice());

console.log("\n=== 總金額 ===");
console.log(manager.getTotalPrice());

console.log("\n=== 平均價格 ===");
console.log(manager.getAveragePrice());