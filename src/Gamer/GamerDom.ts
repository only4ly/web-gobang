import Judger from './Judger'
import Gamer from './Gamer'
import { drawBoardDom } from './util'
import { transfromOffset2Grid, initChessPieceArr } from '../util/index'
import ChessPieceDom from '../ChessPiece/ChessPieceDom'
import { CHESS_TYPES, CHESS_NAMES, CHESS_PIECE_CLASS_NAME } from '../gameConfig'
import GameViewer from './GameViewer'

export default class GamerDom extends Gamer implements GameViewer{
  viewContext: HTMLElement
  constructor (indexedPiece?: [number, number, number][]) {
    super(indexedPiece)
    document.getElementById('cancel').onclick = () => {
      if (this.gameOver) {
        window.alert('game is over...')
        return
      }
      if (this.canceled) {
        this.rollbackCancel()
      } else {
        this.cancel()
      }
    }
    document.getElementById('start').onclick = () => { this.restart() }
  }
  initView () {
    if (!this.viewContext) {
      this.viewContext = drawBoardDom()
      document.getElementById('app').appendChild(this.viewContext)
    }
  }
  start () {
    super.start()
    this.indexedPiece.forEach((item, index) => new ChessPieceDom(item[0], item[1], item[2], index + 1, this.viewContext).draw())
    this.initView()
    const lastChess = this.indexedPiece[this.indexedPiece.length - 1]
    this.viewContext.onclick = (event: MouseEvent) => { this.onClick(event.clientX, event.clientY + window.scrollY) }
    if (lastChess) {
      this.judge(lastChess[0], lastChess[1])
    }
  }
  onClick (clientX: number, clientY:number): boolean {
    const isLegalClick = super.onClick(clientX, clientY)
    if (isLegalClick) {
      const clicked = this.indexedPiece[this.indexedPiece.length - 1]
      new ChessPieceDom(clicked[0], clicked[1], clicked[2], this.indexedPiece.length, this.viewContext).draw()
      this.judge(clicked[0], clicked[1])
    }
    return isLegalClick
  }
  cancel () {
    super.cancel()
    this.viewContext.removeChild(document.getElementById(String(this.indexedPiece.length + 1)))
  }
  rollbackCancel () {
    super.rollbackCancel()
    const r = this.indexedPiece[this.indexedPiece.length - 1]
    new ChessPieceDom(r[0], r[1], r[2], this.indexedPiece.length, this.viewContext).draw()
  }
  judge (x: number, y: number) {
    const isWin = super.judge(x, y)
    if (isWin) {
      const name = CHESS_NAMES[(this.indexedPiece.length - 1) % 2]
      this.viewContext.onclick = () => { window.alert(`game is overed, winner is ${name}`) }
    }
    return isWin
  }
  restart () {
    super.restart()
    const pieces = Array.from(document.getElementsByClassName(CHESS_PIECE_CLASS_NAME))
    pieces.forEach(item => { item.parentNode.removeChild(item) })
    this.start()
  }
  destroyView () {
    document.getElementById('app').removeChild(this.viewContext)
  }
}