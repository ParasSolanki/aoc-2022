const input = await Deno.readTextFile('./input.txt')

const steps = input.split('\r\n').map((inp) => inp.split(' '))

function main() {
  const head = { x: 0, y: 0 }
  const points = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]

  const visitedNodes = new Set()

  for (const step of steps) {
    const [direction, move] = [step[0], parseInt(step[1], 10)]

    for (let i = 0; i < move; i++) {
      if (direction === 'R') head.y += 1
      if (direction === 'L') head.y -= 1
      if (direction === 'U') head.x -= 1
      if (direction === 'D') head.x += 1

      for (let index = 0; index < points.length; index++) {
        const distance =
          index === 0
            ? Math.max(
                Math.abs(head.x - points[index].x),
                Math.abs(head.y - points[index].y)
              )
            : Math.max(
                Math.abs(points[index - 1].x - points[index].x),
                Math.abs(points[index - 1].y - points[index].y)
              )

        if (distance > 1) {
          const deltaX =
            index === 0
              ? head.x - points[index].x
              : points[index - 1].x - points[index].x
          const deltaY =
            index === 0
              ? head.y - points[index].y
              : points[index - 1].y - points[index].y

          points[index].x += Math.abs(deltaX) === 2 ? deltaX / 2 : deltaX
          points[index].y += Math.abs(deltaY) === 2 ? deltaY / 2 : deltaY
        }
      }

      visitedNodes.add(`${points[8].x}-${points[8].y}`)
    }
  }
  console.log(visitedNodes.size)
}
main()
