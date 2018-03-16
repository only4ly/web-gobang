import { CHESS_BOARD_SIZE, COLUMN_WIDTH, CHESS_BOARD_LINE_COLOR, CHESS_BOARD_BACKGROUND } from './config'

export default () => {
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
