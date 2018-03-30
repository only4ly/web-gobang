import ChessPiece from './ChessPiece'
import { CHESS_PIECE_WIDTH, COLUMN_WIDTH, CHESS_COLORS, CHESS_PIECE_CLASS_NAME } from '../gameConfig'

export default class ChessPieceDom implements ChessPiece {
  x: number
  y: number
  chessType: number
  chessBoard: HTMLElement
  id: number
  constructor (x: number, y: number, chessType: number, id: number, chessBoard: HTMLElement) {
    this.x = x
    this.y = y
    this.chessType = chessType
    this.id = id
    this.chessBoard = chessBoard
  }
  draw (): void {
    const chessPieceDom = this.createDom()
    this.chessBoard.appendChild(chessPieceDom)
  }
  createDom () {
    console.log(CHESS_COLORS[this.chessType])
    const chessPieceDom: HTMLElement = document.createElement('div')
    chessPieceDom.id = this.id + ''
    chessPieceDom.style.width = CHESS_PIECE_WIDTH + 'px'
    chessPieceDom.style.height = CHESS_PIECE_WIDTH + 'px'
    chessPieceDom.style.borderRadius = (CHESS_PIECE_WIDTH / 2) + 'px'
    chessPieceDom.style.backgroundColor = CHESS_COLORS[this.chessType]
    chessPieceDom.style.position = 'absolute'
    chessPieceDom.className = CHESS_PIECE_CLASS_NAME
    const getOffset = val => (((val + 1) * COLUMN_WIDTH) - CHESS_PIECE_WIDTH / 2) + 'px'
    chessPieceDom.style.left = getOffset(this.x)
    chessPieceDom.style.top = getOffset(this.y)
    return chessPieceDom
  }
}