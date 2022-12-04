const input = await Deno.readTextFile('./input.txt')

const stratergys = input.split('\r\n')

type OpponentMove = 'A' | 'B' | 'C'
type MyMove = 'X' | 'Y' | 'Z'

const OPPONENT_MOVES = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSIORS',
} as const

const MY_MOVES = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSIORS',
} as const

const POINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSIORS: 3,
  DRAW: 3,
  WIN: 6,
  LOSE: 0,
} as const

const getResultOfMoves = (opponentMove: OpponentMove, myMove: MyMove) => {
  // draw
  const opponentMoveType = OPPONENT_MOVES[opponentMove]
  const myMoveType = MY_MOVES[myMove]

  if (opponentMoveType === myMoveType) {
    return 'draw'
  }

  if (
    (opponentMoveType === 'ROCK' || myMoveType === 'ROCK') &&
    (opponentMoveType === 'PAPER' || myMoveType === 'PAPER')
  ) {
    return myMoveType === 'PAPER' ? 'win' : 'lose'
  } else if (
    (opponentMoveType === 'SCISSIORS' || myMoveType === 'SCISSIORS') &&
    (opponentMoveType === 'PAPER' || myMoveType === 'PAPER')
  ) {
    return myMoveType === 'SCISSIORS' ? 'win' : 'lose'
  } else if (
    (opponentMoveType === 'ROCK' || myMoveType === 'ROCK') &&
    (opponentMoveType === 'SCISSIORS' || myMoveType === 'SCISSIORS')
  ) {
    return myMoveType === 'ROCK' ? 'win' : 'lose'
  }
}

let total = 0

for (const stratergy of stratergys) {
  const [opponentMove, myMove] = stratergy.split(' ') as [OpponentMove, MyMove]

  const result = getResultOfMoves(opponentMove, myMove)

  if (result === 'draw') {
    total += POINTS.DRAW + POINTS[MY_MOVES[myMove]]
  }
  if (result === 'win') {
    total += POINTS.WIN + POINTS[MY_MOVES[myMove]]
  }
  if (result === 'lose') {
    total += POINTS.LOSE + POINTS[MY_MOVES[myMove]]
  }
}

console.log(total)
