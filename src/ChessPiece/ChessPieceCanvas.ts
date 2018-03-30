import ChessPiece from './ChessPiece'
import { CHESS_COLORS, COLUMN_WIDTH, CHESS_PIECE_WIDTH } from '../gameConfig';

export default class ChessPieceCanvas implements ChessPiece {
  x: number
  y: number
  chessType: number
  ctx: CanvasRenderingContext2D
  constructor (x: number, y: number, chessType: number, ctx: CanvasRenderingContext2D) {
    this.x = x
    this.y = y
    this.chessType = chessType
    this.ctx = ctx
  }
  draw (): void {
    this.ctx.fillStyle = CHESS_COLORS[this.chessType]
    const getOffset = val => (val + 1) * COLUMN_WIDTH
    const circle = new Path2D()
    const x = getOffset(this.x)
    const y = getOffset(this.y)
    circle.moveTo(x, y)
    circle.arc(x, y, CHESS_PIECE_WIDTH / 2, 0, 2 * Math.PI)
    this.ctx.fill(circle)
  }
}