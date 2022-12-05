const input = await Deno.readTextFile('./input.txt')

const pairAssignments = input.split('\r\n')

let total = 0
for (const assignments of pairAssignments) {
  const [first, second] = assignments.split(',')
  const [firstElfStartRoom, firstElfEndRoom] = first
    .split('-')
    .map((a) => parseInt(a, 10))
  const [secondElfStartRoom, secondElfEndRoom] = second
    .split('-')
    .map((a) => parseInt(a, 10))

  if (
    firstElfStartRoom <= secondElfEndRoom &&
    secondElfStartRoom <= firstElfEndRoom
  ) {
    total++
  }
}

console.log(total)
