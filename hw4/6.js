const rawData = '[{"id":1, "price":200}, {"id":2, "price":1500}, {"id":3, "price":850}]';

function filterOrders(jsonStr, minPrice) {
  try {
    const orders = JSON.parse(jsonStr);
    // 使用 filter 過濾，這比 for 迴圈更簡潔
    return orders.filter(order => order.price >= minPrice);
  } catch (e) {
    console.error("解析 JSON 失敗");
    return [];
  }
}
console.log(filterOrders(rawData, 1000)); // [{id: 2, price: 1500}]