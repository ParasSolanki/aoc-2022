const input = await Deno.readTextFile('./input.txt')

const foods = input.split('\r\n\r').map((f) => {
  return f.split('\r\n').map((cal) => parseInt(cal, 10))
})

const eachElfCarryingFood: { [key: number]: number } = {}

for (const [index, food] of foods.entries()) {
  eachElfCarryingFood[index] = food.reduce((total, val) => (total += val), 0)
}

const maxFood = Math.max(...Object.values(eachElfCarryingFood).map((t) => t))

console.log(maxFood) // 69289
