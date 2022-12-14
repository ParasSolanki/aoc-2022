const input = await Deno.readTextFile('./input.txt')

const instructions = input.split('\r\n').map((inp) => inp.split(' '))

function main() {
  let position = 0
  let currentCRTRow = 0
  let registerX = 1
  const crtImage = new Array(6).fill('').map(() => new Array(40).fill('.'))
  const spritePosition = new Array(40)
    .fill('.')
    .map((_, index) => (index < 3 ? '#' : '.'))

  for (const instruction of instructions) {
    const expression = instruction[0] as 'noop' | 'addx'
    const value = instruction[1] ? parseInt(instruction[1], 10) : 0

    position++
    crtImage[currentCRTRow][position - 1] =
      spritePosition[position - 1] === '#' ? '#' : '.'

    if (position % 40 == 0) {
      currentCRTRow++
      position = 0
    }

    if (expression === 'addx') {
      position++

      crtImage[currentCRTRow][position - 1] =
        spritePosition[position - 1] === '#' ? '#' : '.'

      if (position % 40 == 0) {
        currentCRTRow++
        position = 0
      }

      spritePosition[registerX] = '.'
      spritePosition[registerX + 1] = '.'
      spritePosition[registerX - 1] = '.'
      registerX += value
      spritePosition[registerX] = '#'
      spritePosition[registerX - 1] = '#'
      spritePosition[registerX + 1] = '#'
    }
  }
  console.log(crtImage.map((c) => c.join('')))
}

main()
