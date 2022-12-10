const input = await Deno.readTextFile('./input.txt')

const trees = input.split('\r\n').map((inp) => inp.split(''))

function main() {
  const parsedTrees = trees.map((numbers) =>
    numbers.map((num) => parseInt(num, 10))
  )

  let maxScenicScore = 0

  for (let i = 0; i < parsedTrees.length; i++) {
    // don't consider this because this are edge tree and will not have high scenic score compare to middle ones
    if (i === 0 || i === parsedTrees.length - 1) continue

    for (let j = 0; j < parsedTrees[i].length; j++) {
      // edge trees
      if (j === 0 || j === parsedTrees[i].length - 1) continue

      const currentTree = parsedTrees[i][j]
      let [
        leftScenicScore,
        topScenicScore,
        rightScenicScore,
        bottomScenicScore,
        currentTreeScenicScore,
      ] = [0, 0, 0, 0, 1]

      for (let left = j - 1; left >= 0; left--) {
        leftScenicScore++
        if (parsedTrees[i][left] >= currentTree) break
      }

      for (let top = i - 1; top >= 0; top--) {
        topScenicScore++
        if (parsedTrees[top][j] >= currentTree) break
      }

      for (let right = j + 1; right < parsedTrees[i].length; right++) {
        rightScenicScore++
        if (parsedTrees[i][right] >= currentTree) break
      }

      for (let bottom = i + 1; bottom < parsedTrees[i].length; bottom++) {
        bottomScenicScore++
        if (parsedTrees[bottom][j] >= currentTree) break
      }

      if (leftScenicScore > 0) currentTreeScenicScore *= leftScenicScore
      if (topScenicScore > 0) currentTreeScenicScore *= topScenicScore
      if (rightScenicScore > 0) currentTreeScenicScore *= rightScenicScore
      if (bottomScenicScore > 0) currentTreeScenicScore *= bottomScenicScore

      if (currentTreeScenicScore > maxScenicScore) {
        maxScenicScore = currentTreeScenicScore
      }
    }
  }

  console.log(maxScenicScore)
}

main()
