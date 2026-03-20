const cart = [
  { name: "麵包", price: 45.5, qty: 2 },
  { name: "牛奶", price: 90, qty: 1 }
];

const checkout = (items) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  return `總金額：$${total.toLocaleString()}`; // 使用 LocaleString 加上千分位
};
console.log(checkout(cart)); 