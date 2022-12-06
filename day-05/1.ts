const input = await Deno.readTextFile('./input.txt')

const [cratesArrangement, allSteps] = input.split('\r\n\r\n')

const steps = allSteps.split('\r\n')

const cratesArrangementArray = cratesArrangement.split('\r\n')
cratesArrangementArray.splice(-1, 1)

const arr: string[][] = []

for (const crates of cratesArrangementArray) {
  let index = 0
  const crate = crates.split(' ')
  // loop through all the items
  for (let i = 0; i < crate.length; i++) {
    // if has empty space character and leading i + 4 item is not empty then increment counter
    // to that item and increase index because its from other column
    if (crate[i] === '') {
      i += 3
      index++
    }

    // check item is not empty
    if (crate[i] !== '') {
      // if not in arr
      if (!arr[index]) {
        arr[index] = [] // create array for that index
      }

      arr[index].push(crate[i].replace('[', '').replace(']', '')) // push current item to that index array

      index++ // update index
    }
  }
}

for (const step of steps) {
  const { 1: moveCount, 3: fromBoxIndex, 5: toBoxIndex } = step.split(' ')
  const moveCountInt = parseInt(moveCount, 10)
  const fromBoxIndexInt = parseInt(fromBoxIndex, 10)
  const toBoxIndexInt = parseInt(toBoxIndex, 10)

  arr[toBoxIndexInt - 1] = [
    ...arr[fromBoxIndexInt - 1].slice(0, moveCountInt).reverse(),
    ...arr[toBoxIndexInt - 1],
  ]

  arr[fromBoxIndexInt - 1].splice(0, moveCountInt)
  // console.log(arr, index)
}

let str = ''
for (const piece of arr) {
  str += piece[0] ?? ''
}

console.log(str) // SPFMVDTZT
