import { CHESS_PIECE_WIDTH, CHESS_TYPES, COLUMN_WIDTH } from './config'

export default class ChessPiece {
  constructor (x, y, chessType, id) {
    this.x = x
    this.y = y
    this.chessType = chessType
    this.id = id
  }
  draw (chessBoard) {
    const chessPieceDom = document.createElement('div')
    chessPieceDom.id = this.id
    chessPieceDom.style.width = CHESS_PIECE_WIDTH + 'px'
    chessPieceDom.style.height = CHESS_PIECE_WIDTH + 'px'
    chessPieceDom.style.borderRadius = (CHESS_PIECE_WIDTH / 2) + 'px'
    chessPieceDom.style.backgroundColor = CHESS_TYPES[this.chessType].color
    chessPieceDom.style.position = 'absolute'
    const getOffset = val => (((val + 1) * COLUMN_WIDTH) - CHESS_PIECE_WIDTH / 2) + 'px'
    chessPieceDom.style.left = getOffset(this.x)
    chessPieceDom.style.top = getOffset(this.y)
    chessBoard.appendChild(chessPieceDom)
  }
  remove () {
    const chessPieceDom = document.getElementById(this.id)
    chessPieceDom.parentNode.removeChild(chessPieceDom)
  }
}
