import { COLUMN_WIDTH } from './src/config'
import init from './src/drawChessBoard'
import ChessPiece from './src/ChessPiece'

let counts = 0

const chessBoard = init()
const transfromOffset2Grid = val => ~~((val / COLUMN_WIDTH) - 0.5)
// 鼠标指针在点击元素（DOM）中的X坐标
chessBoard.onclick = ({clientX, clientY}) => {
  const x = transfromOffset2Grid(clientX)
  const y = transfromOffset2Grid(clientY)
  const type = counts % 2 === 0 ? 'BLACK_CHESS_PIECE' : 'WHITE_CHESS_PIECE'
  const chessPiece = new ChessPiece(x, y, type, counts)
  counts++
  chessPiece.draw(chessBoard)
}

document.getElementById('app').appendChild(chessBoard)
