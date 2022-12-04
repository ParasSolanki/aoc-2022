const input = await Deno.readTextFile('./input.txt')

const stratergys = input.split('\r\n')

type OpponentMove = 'A' | 'B' | 'C'
type MyMove = 'X' | 'Y' | 'Z'

const OPPONENT_MOVES = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSIORS',
} as const

const MY_MOVE_RESULT = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
} as const

const POINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSIORS: 3,
  DRAW: 3,
  WIN: 6,
  LOSE: 0,
} as const

let total = 0
for (const stratergy of stratergys) {
  const [opponentMove, myMove] = stratergy.split(' ') as [OpponentMove, MyMove]

  const opponentMoveType = OPPONENT_MOVES[opponentMove]
  const myMoveResultType = MY_MOVE_RESULT[myMove]

  if (myMoveResultType === 'draw') {
    total += POINTS.DRAW + POINTS[OPPONENT_MOVES[opponentMove]]
  }
  if (myMoveResultType === 'win') {
    if (opponentMoveType === 'PAPER') {
      total += POINTS.WIN + POINTS[OPPONENT_MOVES['C']]
    }
    if (opponentMoveType === 'ROCK') {
      total += POINTS.WIN + POINTS[OPPONENT_MOVES['B']]
    }
    if (opponentMoveType === 'SCISSIORS') {
      total += POINTS.WIN + POINTS[OPPONENT_MOVES['A']]
    }
  }
  if (myMoveResultType === 'lose') {
    if (opponentMoveType === 'PAPER') {
      total += POINTS.LOSE + POINTS[OPPONENT_MOVES['A']]
    }
    if (opponentMoveType === 'ROCK') {
      total += POINTS.LOSE + POINTS[OPPONENT_MOVES['C']]
    }
    if (opponentMoveType === 'SCISSIORS') {
      total += POINTS.LOSE + POINTS[OPPONENT_MOVES['B']]
    }
  }
  console.log(total)
}

console.log(total)
