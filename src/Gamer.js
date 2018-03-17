import drawBorad from './drawchessBoard'
import { initCanvas, drawBoardLines } from './drawchessBoardCanvas'
import ChessPiece from './ChessPiece'
import { CHESS_TYPES } from './config'
import { initChessPieceArr, transfromOffset2Grid, atLeastOneTrue } from './util'

/**
 * Gamer 类, 初始化一局五子棋游戏
 * PS: 我觉得这个类写的有点乱了...
 * 总共维护了6个状态
 * isCanvas 是否是canvas模式
 * chessPieceArr 保存棋盘中的棋子状态
 * count 棋盘中棋子数量, 关系到落子轮替顺序
 * lastStep 保存上一次的落子情况, 用于悔棋操作 (当可以毁多子的时候, 用数组去维护)
 * chessBoardDom 保存棋盘Dom节点
 * chessBoardCtx 当渲染模式是canvas时, 保存canvas的Context (其实也可以不保存, 根据dom去getContext即可)
 */
export default class Gamer {
  /**
   * 可以用这个数组恢复棋局, 顺便在进行切换canvas和dom的时候也可以用的
   * @param {Array<Array<Object>>} chessPieceArr 保存棋局的数组
   */
  constructor ({isCanvas, chessPieceArr = initChessPieceArr()} = {isCanvas: false, chessPieceArr: initChessPieceArr()}) {
    this.chessPieceArr = chessPieceArr
    this.isCanvas = isCanvas
    const chessTemp = this.getRecoverArray(chessPieceArr)
    this.count = chessTemp.length
    if (this.isCanvas) {
      this.chessBoardDom = initCanvas()
      const chessBoardCtx = this.chessBoardDom.getContext('2d')
      this.chessBoardCtx = chessBoardCtx
      drawBoardLines(chessBoardCtx)
      chessTemp.forEach(item => { item.drawCanvas(chessBoardCtx) })
    } else {
      this.chessBoardDom = drawBorad()
      chessTemp.forEach(item => { item.draw(this.chessBoardDom) })
    }
    this.chessBoardDom.onclick = (e) => { this.onBoardClick(e) }
    if (!isCanvas) {
      document.getElementById('app').appendChild(this.chessBoardDom)
    }
    document.getElementById('cancel').style.display = 'inline'
  }
  getRecoverArray (chessPieceArr) {
    const chessTemp = []
    // 把初始的棋子拿出来并画在棋盘上, 这个时候要祭出for循环大法了
    for (let i = 0, len1 = chessPieceArr.length; i < len1; i++) {
      for (let j = 0, len2 = chessPieceArr[i].length; j < len2; j++) {
        let chessSave = chessPieceArr[i][j]
        if (chessSave) {
          let chessPieceNew = new ChessPiece(i, j, chessSave.type, chessSave.id)
          chessTemp.push(chessPieceNew)
        }
      }
    }
    return chessTemp
  }
  onBoardClick ({clientX, clientY}) {
    console.log(this)
    const x = transfromOffset2Grid(clientX)
    const y = transfromOffset2Grid(clientY + window.scrollY)
    // 如果当前位置已经有棋子了, 大家就当做无事发生
    if (!this.chessPieceArr[x][y]) {
      const type = this.count % 2 === 0 ? 'BLACK_CHESS_PIECE' : 'WHITE_CHESS_PIECE'
      // 维护lastStep这个状态
      this.lastStep = {x, y, type, id: this.count}
      const cancel = document.getElementById('cancel')
      if (cancel.innerHTML !== '悔棋') { cancel.innerHTML = '悔棋' }
      const chessPiece = new ChessPiece(x, y, type, this.count)
      this.chessPieceArr[x][y] = {type, id: this.count}
      console.log(this.chessPieceArr[x][y])
      this.count++
      if (this.isCanvas) {
        chessPiece.drawCanvas(this.chessBoardCtx)
      } else {
        chessPiece.draw(this.chessBoardDom)
      }
      this.judge(x, y)
    }
  }
  // 悔棋
  cancelLastStep () {
    document.getElementById('cancel').innerHTML = '撤销悔棋'
    if (this.lastStep) {
      const {x, y} = this.lastStep
      this.count = this.count - 1
      this.chessPieceArr[x][y] = null
      if (this.isCanvas) {
        const temp = this.getRecoverArray(this.chessPieceArr)
        drawBoardLines(this.chessBoardCtx)
        temp.forEach(item => { item.drawCanvas() })
      } else {
        const chessPiece = document.getElementById(this.count)
        chessPiece.parentNode.removeChild(chessPiece)
      }
    }
  }
  // 撤销悔棋
  cancelTheCancel () {
    document.getElementById('cancel').innerHTML = '悔棋'
    const {x, y, type, id} = this.lastStep
    const canceledPiece = new ChessPiece(x, y, type, id)
    if (this.isCanvas) {
      canceledPiece.drawCanvas(this.chessBoardCtx)
    } else {
      canceledPiece.draw(this.chessBoardDom)
    }
    this.chessPieceArr[x][y] = {type, id}
    this.count = this.count + 1
  }
  removeDom () {
    if (!this.isCanvas) {
      this.chessBoardDom.parentNode.removeChild(this.chessBoardDom)
    } else {
      this.chessBoardDom.style.display = 'none'
    }
  }
  /**
   * 判断当前棋子是否构成胜利条件
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子y坐标
   */
  judge (x, y) {
    const type = this.chessPieceArr[x][y].type
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
    if (isWin) {
      setTimeout(() => window.alert(`${CHESS_TYPES[type].name}赢了!!!`), 0)
      document.getElementById('cancel').style.display = 'none'
      this.chessBoardDom.onclick = () => { window.alert(`${CHESS_TYPES[type].name}赢了, 别点了...`) }
    }
  }
  /**
   * 向右方向判断是否构成胜利条件 (已测试)
   * @param {Number} x 棋子x坐标
   * @param {Number} y 棋子x坐标
   * @param {String} type 目标棋子type
   */
  judgeX (x, y, type) {
    const end = x + 4
    for (let i = x + 1, len = this.chessPieceArr[x].length; i < len && i <= end; i++) {
      if ((!this.chessPieceArr[i][y]) || (this.chessPieceArr[i][y].type !== type)) {
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
  judgeX_ (x, y, type) {
    const end = x - 4
    for (let i = x - 1; i > -1 && i >= end; i--) {
      if ((!this.chessPieceArr[i][y]) || (this.chessPieceArr[i][y].type !== type)) {
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
  judgeY (x, y, type) {
    const end = y + 4
    for (let i = y + 1, len = this.chessPieceArr.length; i < len && i <= end; i++) {
      if ((!this.chessPieceArr[x][i]) || (this.chessPieceArr[x][i].type !== type)) {
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
  judgeY_ (x, y, type) {
    const end = y - 4
    for (let i = y - 1; i > -1 && i >= end; i--) {
      if ((!this.chessPieceArr[x][i]) || (this.chessPieceArr[x][i].type !== type)) {
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
  judgeXY (x, y, type) {
    const endX = x + 4
    const endY = y + 4
    let i = x + 1
    let j = y + 1
    let lenY = this.chessPieceArr.length
    let lenX = this.chessPieceArr[x].length
    while ((i < lenX) && (j < lenY) && (i <= endX) && (j <= endY)) {
      if ((!this.chessPieceArr[i][j]) || (this.chessPieceArr[i][j].type !== type)) {
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
  judgeXY_ (x, y, type) {
    const endX = x - 4
    const endY = y - 4
    let i = x - 1
    let j = y - 1
    while ((i > -1) && (j > -1) && (i >= endX) && (j >= endY)) {
      if ((!this.chessPieceArr[i][j]) || (this.chessPieceArr[i][j].type !== type)) {
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
  judgeYX (x, y, type) {
    const endX = x + 4
    const endY = y - 4
    let i = x + 1
    let j = y - 1
    let lenX = this.chessPieceArr[x].length
    while ((i < lenX) && (j > -1) && (i <= endX) && (j >= endY)) {
      if ((!this.chessPieceArr[i][j]) || (this.chessPieceArr[i][j].type !== type)) {
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
  judgeYX_ (x, y, type) {
    const endX = x - 4
    const endY = y + 4
    let i = x - 1
    let j = y + 1
    let lenY = this.chessPieceArr.length
    while ((i > -1) && (j < lenY) && (i >= endX) && (j <= endY)) {
      if ((!this.chessPieceArr[i][j]) || (this.chessPieceArr[i][j].type !== type)) {
        return false
      }
      i--
      j++
    }
    return true
  }
}
