import { CHESS_BOARD_SIZE, COLUMN_WIDTH, CHESS_BOARD_LINE_COLOR, CHESS_BOARD_BACKGROUND } from '../gameConfig'

export const drawBoardDom = () => {
  const chessBoard = document.createElement('div')
  const boardSize = (CHESS_BOARD_SIZE + 1) * COLUMN_WIDTH
  chessBoard.style.width = boardSize + 'px'
  chessBoard.style.height = boardSize + 'px'
  chessBoard.style.border = `1px solid ${CHESS_BOARD_LINE_COLOR}`
  chessBoard.style.backgroundColor = CHESS_BOARD_BACKGROUND
  chessBoard.style.position = 'relative'

  // 画棋盘线
  const drawLine = (type = 'H') => (item, index, arr) => {
    const elem = document.createElement('div')
    elem.style.backgroundColor = CHESS_BOARD_LINE_COLOR
    elem.style.position = 'absolute'
    if (type === 'H') {
      elem.style.top = (index + 1) * COLUMN_WIDTH + 'px'
      elem.style.width = boardSize + 'px'
      elem.style.height = 1 + 'px'
    } else {
      elem.style.left = (index + 1) * COLUMN_WIDTH + 'px'
      elem.style.height = boardSize + 'px'
      elem.style.width = 1 + 'px'
    }
    return elem
  }
  const sizeArr = new Array(CHESS_BOARD_SIZE).fill(1)
  // 画横线
  sizeArr.map(drawLine('H')).forEach(item => { chessBoard.appendChild(item) })
  // 画竖线
  sizeArr.map(drawLine('V')).forEach(item => { chessBoard.appendChild(item) })
  return chessBoard
}

export const initCanvas = () => {
  const boardCanvs: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')
  boardCanvs.style.display = 'block'
  boardCanvs.style.border = `1px solid ${CHESS_BOARD_LINE_COLOR}`
  boardCanvs.style.backgroundColor = CHESS_BOARD_BACKGROUND
  return boardCanvs
}

export const drawBoardLines = (ctx: CanvasRenderingContext2D) => {
  const boardSize = (CHESS_BOARD_SIZE + 1) * COLUMN_WIDTH
  ctx.clearRect(0, 0, boardSize, boardSize)
  ctx.fillStyle = CHESS_BOARD_LINE_COLOR
  for (let i = 0; i < CHESS_BOARD_SIZE; i++) {
    ctx.fillRect((i + 1) * COLUMN_WIDTH, 0, 1, boardSize)
    ctx.fillRect(0, (i + 1) * COLUMN_WIDTH, boardSize, 1)
  }
}