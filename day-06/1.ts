const input = await Deno.readTextFile('./input.txt')

const str: string[] = []
let index = 0
for (const [idx, ch] of input.split('').entries()) {
  if (str.length === 4) {
    index = idx
    break
  }
  // has in array
  if (str.includes(ch)) {
    // check index from remove previous character from list
    const index = str.findIndex((c) => c === ch)
    str.splice(0, index + 1)
  }
  str.push(ch)
}

console.log(index) // 1100
