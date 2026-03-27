class CartItem {
  constructor(name, price, qty = 1) {
    this.name = name;
    this.price = price;
    this.qty = qty;
  }

  getSubtotal() {
    return this.price * this.qty;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountRate = 0;
  }

  addItem(name, price, qty = 1) {
    if (!name || typeof price !== 'number' || price <= 0 || qty <= 0) {
      return { success: false, message: "無效的商品資料" };
    }
    this.items.push(new CartItem(name, price, qty));
    return { success: true, message: `已加入: ${name}` };
  }

  removeItem(name) {
    const index = this.items.findIndex(item => item.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
      return { success: true, message: `已移除: ${name}` };
    }
    return { success: false, message: "找不到該商品" };
  }

  setDiscount(rate) {
    if (typeof rate !== 'number' || rate < 0 || rate > 100) {
      return { success: false, message: "折扣率應為 0-100 的數字" };
    }
    this.discountRate = rate;
    return { success: true, message: `折扣設定為 ${rate}%` };
  }

  getSubtotal() {
    return this.items.reduce((acc, item) => acc + item.getSubtotal(), 0);
  }

  getDiscountAmount() {
    return this.getSubtotal() * (this.discountRate / 100);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    return Math.round((subtotal - this.getDiscountAmount()) * 100) / 100;
  }

  checkout() {
    if (this.items.length === 0) {
      return { success: false, message: "購物車是空的" };
    }
    const result = {
      items: this.items.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
        subtotal: item.getSubtotal()
      })),
      subtotal: this.getSubtotal(),
      discount: this.getDiscountAmount(),
      total: this.getTotal(),
      itemCount: this.items.length
    };
    this.items = [];
    return { success: true, ...result };
  }

  getCartDetails() {
    return this.items.map(item => ({
      name: item.name,
      price: item.price,
      qty: item.qty,
      subtotal: item.getSubtotal()
    }));
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

const cart = new ShoppingCart();
cart.addItem("麵包", 45.5, 2);
cart.addItem("牛奶", 90, 1);
cart.addItem("雞蛋", 65, 3);

console.log("=== 購物車內容 ===");
console.log(cart.getCartDetails());

console.log("\n=== 結帳 (無折扣) ===");
console.log(cart.checkout());

cart.addItem("餅乾", 35, 2);
cart.setDiscount(10);

console.log("\n=== 結帳 (10% 折扣) ===");
console.log(cart.checkout()); 