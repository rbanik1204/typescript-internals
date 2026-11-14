const score = 95

const student = {
  name: "Ratul",
  score: score,
}

function calculateBonus(value: number) {
  return value + 5
}

const finalScore = calculateBonus(score)
