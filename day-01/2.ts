const input = await Deno.readTextFile('./input.txt')

const foods = input.split('\r\n\r').map((f) => {
  return f.split('\r\n').map((cal) => parseInt(cal, 10))
})

const eachElfCarryingFood: { [key: number]: number } = {}

for (const [index, food] of foods.entries()) {
  eachElfCarryingFood[index] = food.reduce((total, val) => (total += val), 0)
}

// to get the max three number from array
// we will first sort the number ASC and then reverse it so we will get max values at the start
const reversedSortedEachElfsTotalFood = Object.values(eachElfCarryingFood)
  .sort((a, b) => a - b)
  .reverse()

const maxThreeOfEachElfsTotalFood = reversedSortedEachElfsTotalFood.slice(0, 3)
const maxThreeElfsTotal = maxThreeOfEachElfsTotalFood.reduce(
  (total, val) => (total += val),
  0
)

console.log(maxThreeElfsTotal) // 205615
