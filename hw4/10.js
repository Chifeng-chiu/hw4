const students = [
  { name: "Alice", score: 98 },
  { name: "Bob", score: 85 },
  { name: "Cindy", score: 98 }
];

function getWinners(list) {
  if (list.length === 0) return "無資料";

  const topScore = Math.max(...list.map(s => s.score));
  const winners = list
    .filter(s => s.score === topScore)
    .map(s => s.name);

  return `最高分：${topScore}，得主：${winners.join(", ")}`;
}
console.log(getWinners(students)); // "最高分：98，得主：Alice, Cindy"