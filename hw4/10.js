class StudentManager {
  constructor(students = []) {
    this.students = students.map(s => ({
      name: s.name,
      score: typeof s.score === 'number' ? s.score : 0
    }));
  }

  addStudent(name, score) {
    if (!name || typeof score !== 'number') {
      return { success: false, message: "無效的學生資料" };
    }
    this.students.push({ name, score });
    return { success: true, message: `已新增: ${name}` };
  }

  removeStudent(name) {
    const index = this.students.findIndex(s => s.name === name);
    if (index !== -1) {
      this.students.splice(index, 1);
      return { success: true, message: `已移除: ${name}` };
    }
    return { success: false, message: "找不到該學生" };
  }

  getWinners() {
    if (this.students.length === 0) {
      return { success: false, message: "無資料", winners: [], topScore: 0 };
    }

    const topScore = Math.max(...this.students.map(s => s.score));
    const winners = this.students
      .filter(s => s.score === topScore)
      .map(s => ({ name: s.name, score: s.score }));

    return {
      success: true,
      winners,
      topScore,
      winnerCount: winners.length,
      message: `最高分：${topScore}，得主：${winners.map(w => w.name).join(", ")}`
    };
  }

  getBottomScore() {
    if (this.students.length === 0) return 0;
    return Math.min(...this.students.map(s => s.score));
  }

  getAverageScore() {
    if (this.students.length === 0) return 0;
    const sum = this.students.reduce((acc, s) => acc + s.score, 0);
    return Math.round((sum / this.students.length) * 100) / 100;
  }

  getRanking() {
    return [...this.students]
      .sort((a, b) => b.score - a.score)
      .map((s, i) => ({ rank: i + 1, name: s.name, score: s.score }));
  }

  getScoreDistribution() {
    const ranges = {
      'A (90-100)': 0,
      'B (80-89)': 0,
      'C (70-79)': 0,
      'D (60-69)': 0,
      'F (<60)': 0
    };
    
    this.students.forEach(s => {
      if (s.score >= 90) ranges['A (90-100)']++;
      else if (s.score >= 80) ranges['B (80-89)']++;
      else if (s.score >= 70) ranges['C (70-79)']++;
      else if (s.score >= 60) ranges['D (60-69)']++;
      else ranges['F (<60)']++;
    });
    
    return ranges;
  }

  getAll() {
    return this.students;
  }
}

const students = [
  { name: "Alice", score: 98 },
  { name: "Bob", score: 85 },
  { name: "Cindy", score: 98 },
  { name: "David", score: 72 },
  { name: "Eve", score: 55 }
];

const manager = new StudentManager(students);

console.log("=== 找出最高分得主 ===");
console.log(manager.getWinners());

console.log("\n=== 排名列表 ===");
console.log(manager.getRanking());

console.log("\n=== 分數分布 ===");
console.log(manager.getScoreDistribution());

console.log("\n=== 平均分數 ===");
console.log(manager.getAverageScore());

console.log("\n=== 新增學生 ===");
console.log(manager.addStudent("Frank", 92));
console.log(manager.getWinners());