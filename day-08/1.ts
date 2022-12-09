const input = await Deno.readTextFile('./input.txt')

const trees = input.split('\r\n').map((inp) => inp.split(''))

function main() {
  const parsedTrees = trees.map((numbers) =>
    numbers.map((num) => parseInt(num, 10))
  )

  let visible = 0

  for (let i = 0; i < parsedTrees.length; i++) {
    if (i === 0 || i === parsedTrees.length - 1) {
      visible += parsedTrees.length
      continue
    }

    for (let j = 0; j < parsedTrees.length; j++) {
      if (j === 0 || j === parsedTrees.length - 1) {
        visible++
        continue
      }

      const currentTree = parsedTrees[i][j]
      let [leftVisible, topVisible, rightVisible, bottomVisible] = [
        true,
        true,
        true,
        true,
      ]

      for (let left = j - 1; left >= 0; left--) {
        if (parsedTrees[i][left] >= currentTree) {
          leftVisible = false
          break
        }
      }

      for (let top = i - 1; top >= 0; top--) {
        if (parsedTrees[top][j] >= currentTree) {
          topVisible = false
          break
        }
      }

      for (let right = j + 1; right < parsedTrees[i].length; right++) {
        if (parsedTrees[i][right] >= currentTree) {
          rightVisible = false
          break
        }
      }

      for (let bottom = i + 1; bottom < parsedTrees[i].length; bottom++) {
        if (parsedTrees[bottom][j] >= currentTree) {
          bottomVisible = false
          break
        }
      }

      if (leftVisible || topVisible || rightVisible || bottomVisible) {
        visible++
      }
    }
  }

  console.log(visible)
}

main()
