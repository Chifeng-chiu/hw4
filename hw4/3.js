function getStats(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return { sum: 0, avg: 0 };

  const sum = arr.reduce((acc, val) => acc + val, 0);
  const avg = Number((sum / arr.length).toFixed(2)); 
  
  return { sum, avg };
}

console.log(getStats([1, 2, 3, 4, 5, 10])); 