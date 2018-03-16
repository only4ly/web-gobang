import { CHESS_BOARD_SIZE, COLUMN_WIDTH, CHESS_BOARD_LINE_COLOR, CHESS_BOARD_BACKGROUND } from './config'

export const initCanvas = () => {
  const boardCanvs = document.getElementById('canvas')
  boardCanvs.style.display = 'block'
  boardCanvs.style.border = `1px solid ${CHESS_BOARD_LINE_COLOR}`
  boardCanvs.style.backgroundColor = CHESS_BOARD_BACKGROUND
  return boardCanvs
}

export const drawBoardLines = (ctx) => {
  const boardSize = (CHESS_BOARD_SIZE + 1) * COLUMN_WIDTH
  ctx.clearRect(0, 0, boardSize, boardSize)
  ctx.fillStyle = CHESS_BOARD_LINE_COLOR
  for (let i = 0; i < CHESS_BOARD_SIZE; i++) {
    ctx.fillRect((i + 1) * COLUMN_WIDTH, 0, 1, boardSize)
    ctx.fillRect(0, (i + 1) * COLUMN_WIDTH, boardSize, 1)
  }
}
