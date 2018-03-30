import Judger from "./Judger";
import Gamer from './Gamer'
import { drawBoardLines, initCanvas } from './util'
import { transfromOffset2Grid, initChessPieceArr } from '../util/index'
import { CHESS_TYPES, CHESS_NAMES } from '../gameConfig'
import ChessPieceCanvas from "../ChessPiece/ChessPieceCanvas"
import GameViewer from "./GameViewer"

export default class GamerCanvas extends Gamer implements GameViewer{
  viewContext: CanvasRenderingContext2D
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
      this.viewContext = initCanvas().getContext('2d')
    }
    drawBoardLines(this.viewContext)
  }
  repaint () {
    this.initView()
    this.indexedPiece.forEach((item, index) => { new ChessPieceCanvas(item[0], item[1], item[2], this.viewContext).draw() })
  }
  start () {
    super.start()
    this.repaint()
    const lastChess = this.indexedPiece[this.indexedPiece.length - 1]
    document.getElementById('canvas').onclick = (event) => { this.onClick(event.clientX, event.clientY + window.scrollY) }
    if (lastChess) {
      this.judge(lastChess[0], lastChess[1])
    }
  }
  cancel () {
    super.cancel()
    this.repaint()
  }
  rollbackCancel () {
    super.rollbackCancel()
    const r = this.indexedPiece[this.indexedPiece.length - 1]
    new ChessPieceCanvas(r[0], r[1], r[2], this.viewContext).draw()
  }
  judge (x: number, y: number): boolean {
    const isWin = super.judge(x, y)
    if (isWin){
      const name = CHESS_NAMES[(this.indexedPiece.length - 1) % 2]
      document.getElementById('canvas').onclick = () => { window.alert(`game is overed, winner is ${name}`) }
    }
    return isWin
  }
  onClick (clientX: number, clientY: number): boolean {
    const isClickLegal =  super.onClick(clientX, clientY)
    if (isClickLegal) {
      const clicked = this.indexedPiece[this.indexedPiece.length - 1]
      new ChessPieceCanvas(clicked[0], clicked[1], clicked[2], this.viewContext).draw()
      this.judge(clicked[0], clicked[1])
    }
    return isClickLegal
  }
  restart () {
    super.restart()
    this.repaint()
  }
  destroyView () {
    document.getElementById('canvas').style.display = 'none'
  }
}