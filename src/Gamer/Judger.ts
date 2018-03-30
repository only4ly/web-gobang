import { atLeastOneTrue } from '../util/index'
import { initChessPieceArr } from '../util/index'

export default class Judger {
  chessPieceArr: number[][]
  indexedPiece: [number, number, number][] // [x, y, type]
  constructor (indexedPiece?: [number, number, number][]) {
    this.indexedPiece = indexedPiece || []
    this.chessPieceArr = initChessPieceArr()
  }
  public judgeWin (x: number, y: number): boolean {
    const type = this.chessPieceArr[x][y]
    const isWin = atLeastOneTrue(
      this.judgeX(x, y, type),
      this.judgeX_(x, y, type),
      this.judgeY(x, y, type),
      this.judgeY_(x, y, type),
      this.judgeXY(x, y, type),
      this.judgeXY_(x, y, type),
      this.judgeYX(x, y, type),
      this.judgeYX_(x, y, type)
    )
    return !!isWin
  }
  /**
   * 向右方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeX (x, y, type) {
    const end = x + 4
    for (let i = x + 1, len = this.chessPieceArr[x].length; i < len && i <= end; i++) {
      if ((this.chessPieceArr[i][y] < 0) || (this.chessPieceArr[i][y] !== type)) {
        return false
      }
    }
    return true
  }
  /**
   * 向左方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeX_ (x, y, type) {
    const end = x - 4
    for (let i = x - 1; i > -1 && i >= end; i--) {
      if ((this.chessPieceArr[i][y] < 0) || (this.chessPieceArr[i][y] !== type)) {
        return false
      }
    }
    return true
  }
  /**
   * 向下方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeY (x, y, type) {
    const end = y + 4
    for (let i = y + 1, len = this.chessPieceArr.length; i < len && i <= end; i++) {
      if ((this.chessPieceArr[x][i] < 0) || (this.chessPieceArr[x][i] !== type)) {
        return false
      }
    }
    return true
  }
  /**
   * 向上方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeY_ (x, y, type) {
    const end = y - 4
    for (let i = y - 1; i > -1 && i >= end; i--) {
      if ((this.chessPieceArr[x][i] < 0) || (this.chessPieceArr[x][i] !== type)) {
        return false
      }
    }
    return true
  }
  /**
   * 向右下方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeXY (x, y, type) {
    const endX = x + 4
    const endY = y + 4
    let i = x + 1
    let j = y + 1
    let lenY = this.chessPieceArr.length
    let lenX = this.chessPieceArr[x].length
    while ((i < lenX) && (j < lenY) && (i <= endX) && (j <= endY)) {
      if ((this.chessPieceArr[i][j] < 0) || (this.chessPieceArr[i][j] !== type)) {
        return false
      }
      i++
      j++
    }
    return true
  }
  /**
   * 向左上方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeXY_ (x, y, type) {
    const endX = x - 4
    const endY = y - 4
    let i = x - 1
    let j = y - 1
    while ((i > -1) && (j > -1) && (i >= endX) && (j >= endY)) {
      if ((this.chessPieceArr[i][j] < 0) || (this.chessPieceArr[i][j] !== type)) {
        return false
      }
      i--
      j--
    }
    return true
  }
  /**
   * 向右上方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeYX (x, y, type) {
    const endX = x + 4
    const endY = y - 4
    let i = x + 1
    let j = y - 1
    let lenX = this.chessPieceArr[x].length
    while ((i < lenX) && (j > -1) && (i <= endX) && (j >= endY)) {
      if ((this.chessPieceArr[i][j] < 0) || (this.chessPieceArr[i][j] !== type)) {
        return false
      }
      i++
      j--
    }
    return true
  }
  /**
   * 向左下方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  private judgeYX_ (x, y, type) {
    const endX = x - 4
    const endY = y + 4
    let i = x - 1
    let j = y + 1
    let lenY = this.chessPieceArr.length
    while ((i > -1) && (j < lenY) && (i >= endX) && (j <= endY)) {
      if ((this.chessPieceArr[i][j] < 0) || (this.chessPieceArr[i][j] !== type)) {
        return false
      }
      i--
      j++
    }
    return true
  }
}