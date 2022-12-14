const input = await Deno.readTextFile('./input.txt')

const instructions = input.split('\r\n').map((inp) => inp.split(' '))

function main() {
  let noOfCycles = 0
  let registerX = 1
  let totalSignalStrength = 0
  for (const instruction of instructions) {
    const expression = instruction[0] as 'noop' | 'addx'
    const value = instruction[1] ? parseInt(instruction[1], 10) : 0

    noOfCycles++ // first cycle of noop and addx

    if ([20, 60, 100, 140, 180, 220].includes(noOfCycles)) {
      totalSignalStrength +=
        noOfCycles === 20 ? registerX * 20 : noOfCycles * registerX
    }

    // second cycle of addx
    if (expression === 'addx') {
      noOfCycles++
      if ([20, 60, 100, 140, 180, 220].includes(noOfCycles)) {
        totalSignalStrength +=
          noOfCycles === 20 ? registerX * 20 : noOfCycles * registerX
      }
      registerX += value
    }
  }
  console.log(totalSignalStrength)
}

main()
