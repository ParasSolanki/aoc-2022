const input = await Deno.readTextFile('./input.txt')

type Expression = '*' | '+'
type Param = 'old' | number
type MonkeyData = {
  monkeyNumber: number
  startingItems: number[]
  divisibleNumber: number
  operation: {
    firstParam: 'old'
    expression: Expression
    secondParam: Param
  }
  trueMonkeyNumber: number
  falseMonkeyNumber: number
}

const rawLines = input.split('\r\n\r\n')

function parse(rawData: string[]) {
  const data = new Map<number, MonkeyData>()

  for (const d of rawData) {
    const lines = d.split('\r\n')

    const monkeyData = {} as MonkeyData
    let currentMonkey = null as null | number

    for (const line of lines) {
      const trimedLine = line.trim()
      const monkeyRegex = /^Monkey (?<number>\w+):?$/.exec(trimedLine)
      const startingRegex = /^Starting items: (?<items>.*)?$/.exec(trimedLine)
      const operationRegex =
        /^Operation: new = (?<first>\w+)? (?<expression>.*)? (?<second>.*)?$/.exec(
          trimedLine
        )
      const divisibleRegex = /^Test: divisible by (?<divisible>\w+)?$/.exec(
        trimedLine
      )
      const trueMonkeyRegex =
        /^If true: throw to monkey (?<monkey>\w+):?$/.exec(trimedLine)
      const falseMonkeyRegex =
        /^If false: throw to monkey (?<monkey>\w+):?$/.exec(trimedLine)

      if (monkeyRegex?.groups?.number) {
        monkeyData['monkeyNumber'] = parseInt(monkeyRegex.groups.number, 10)
        currentMonkey = parseInt(monkeyRegex.groups.number, 10)
      }

      if (startingRegex?.groups?.items) {
        monkeyData['startingItems'] = startingRegex.groups.items
          .split(',')
          .map((i) => parseInt(i, 10))
      }

      if (divisibleRegex?.groups?.divisible) {
        monkeyData['divisibleNumber'] = parseInt(
          divisibleRegex.groups.divisible,
          10
        )
      }

      if (operationRegex?.groups) {
        monkeyData['operation'] = {
          firstParam: operationRegex.groups.first as 'old',
          expression: operationRegex.groups.expression as Expression,
          secondParam:
            operationRegex.groups.second === 'old'
              ? 'old'
              : (parseInt(operationRegex.groups.second, 10) as Param),
        }
      }

      if (trueMonkeyRegex?.groups?.monkey) {
        monkeyData['trueMonkeyNumber'] = parseInt(
          trueMonkeyRegex.groups.monkey,
          10
        )
      }
      if (falseMonkeyRegex?.groups?.monkey) {
        monkeyData['falseMonkeyNumber'] = parseInt(
          falseMonkeyRegex.groups.monkey,
          10
        )
      }
    }

    if (currentMonkey !== null) data.set(currentMonkey, monkeyData)
  }

  return data
}

function main() {
  const rounds = 10000
  const parsedMonkeys = parse(rawLines)
  const inspections = {} as { [key: string]: number }
  let globalMod = 1

  parsedMonkeys.forEach((m) => {
    globalMod *= m.divisibleNumber
  })

  // 20 round
  for (let index = 0; index < rounds; index++) {
    parsedMonkeys.forEach((monkey) => {
      const {
        operation: { expression, secondParam },
        trueMonkeyNumber,
        divisibleNumber,
        falseMonkeyNumber,
        monkeyNumber,
        startingItems,
      } = monkey

      for (const item of [...startingItems]) {
        monkey.startingItems.shift() // remove current item
        // update current monkey inspections
        if (!inspections[monkeyNumber]) {
          inspections[monkeyNumber] = 1
        } else {
          inspections[monkeyNumber]++
        }

        let value = 0
        if (expression === '*') {
          if (secondParam !== 'old') value = item * secondParam
          if (secondParam === 'old') value = item * item
        } else if (expression === '+') {
          if (secondParam !== 'old') value = item + secondParam
        }

        value = value % globalMod

        if (value % divisibleNumber === 0) {
          parsedMonkeys.get(trueMonkeyNumber)?.startingItems.push(value)
        } else {
          parsedMonkeys.get(falseMonkeyNumber)?.startingItems.push(value)
        }
      }
    })
  }

  const [firstMost, secondMost] = Object.values(inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)

  console.log(firstMost * secondMost)
}

main()
