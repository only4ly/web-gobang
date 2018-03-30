import Judger from './Judger'
import { transfromOffset2Grid, initChessPieceArr } from '../util'
import { CHESS_NAMES } from '../gameConfig';

export default class Gamer extends Judger {
  canceled: [number, number, number]
  gameOver: boolean
  constructor (indexedPiece?: [number, number, number][]) {
    super(indexedPiece)
  }
  start () {
    this.indexedPiece.forEach(item => this.chessPieceArr[item[0]][item[1]] = item[2])
    this.gameOver = false
  }
  onClick (clientX, clientY): boolean {
    const x = transfromOffset2Grid(clientX)
    const y = transfromOffset2Grid(clientY)
    if (this.chessPieceArr[x][y] === -1) {
      const type = this.indexedPiece.length % 2
      const cancel = document.getElementById('cancel')
      if (cancel.innerHTML !== '悔棋') {
        cancel.innerHTML = '悔棋'
        this.canceled = null
      }
      this.chessPieceArr[x][y] = type
      this.indexedPiece.push([x, y, type])
      return true
    }
    return false
  }
  judge (x: number, y: number): boolean {
    const isWin = this.judgeWin(x, y)
    if (isWin){
      const type = (this.indexedPiece.length - 1) % 2
      const name = CHESS_NAMES[type]
      setTimeout(() => { window.alert(`${name} win !!!`) }, 100)
      this.gameOver = true
    }
    return isWin
  }
  cancel () {
    this.canceled = this.indexedPiece.pop()
    if (this.canceled) {
      const cancel = document.getElementById('cancel')
      cancel.innerHTML = '撤销悔棋'
    } else {
      window.alert('there is no chess piece to go back')
    }
  }
  rollbackCancel () {
    this.indexedPiece.push(this.canceled)
    this.canceled = null
    const cancel = document.getElementById('cancel')
    cancel.innerHTML = '悔棋'
  }
  restart () {
    this.chessPieceArr = initChessPieceArr()
    this.indexedPiece = []
    this.start()
  }
}