const input = await Deno.readTextFile('./input.txt')

const steps = input.split('\r\n').map((inp) => inp.split(' '))

function main() {
  const head = { x: 0, y: 0 }
  const tail = { x: 0, y: 0 }
  const atLeastOneTimeVisitedNodes = new Set()

  for (const step of steps) {
    const [direction, move] = [step[0], parseInt(step[1], 10)]

    for (let i = 0; i < move; i++) {
      if (direction === 'R') head.y += 1
      if (direction === 'L') head.y -= 1
      if (direction === 'U') head.x -= 1
      if (direction === 'D') head.x += 1

      const distance = Math.max(
        Math.abs(head.x - tail.x),
        Math.abs(head.y - tail.y)
      )

      if (distance > 1) {
        const deltaX = head.x - tail.x
        const deltaY = head.y - tail.y

        tail.x += Math.abs(deltaX) === 2 ? deltaX / 2 : deltaX
        tail.y += Math.abs(deltaY) === 2 ? deltaY / 2 : deltaY
      }

      atLeastOneTimeVisitedNodes.add(`${tail.x}-${tail.y}`)
    }
  }
  console.log(atLeastOneTimeVisitedNodes.size)
}
main()
