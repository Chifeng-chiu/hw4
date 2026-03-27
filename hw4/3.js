function getStats(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { sum: 0, avg: 0, min: 0, max: 0, median: 0, count: 0 };
  }

  const validNumbers = arr.filter(n => typeof n === 'number' && !isNaN(n));
  if (validNumbers.length === 0) {
    return { sum: 0, avg: 0, min: 0, max: 0, median: 0, count: 0 };
  }

  const sorted = [...validNumbers].sort((a, b) => a - b);
  const sum = validNumbers.reduce((acc, val) => acc + val, 0);
  const avg = Number((sum / validNumbers.length).toFixed(2));
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 
    ? sorted[mid] 
    : Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
  
  return { sum, avg, min, max, median, count: validNumbers.length };
}

function getStatsExtended(arr) {
  const stats = getStats(arr);
  const variance = arr.reduce((acc, val) => acc + Math.pow(val - stats.avg, 2), 0) / stats.count;
  stats.stdDev = Number(Math.sqrt(variance).toFixed(2));
  return stats;
}

console.log(getStats([1, 2, 3, 4, 5, 10])); 
console.log(getStatsExtended([1, 2, 3, 4, 5, 10]));
console.log(getStats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); 