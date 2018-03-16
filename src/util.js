import { CHESS_BOARD_SIZE, COLUMN_WIDTH } from './config'
/**
 * 初始化一个存储五子棋棋局信息的数组
 */
export const initChessPieceArr = () => new Array(CHESS_BOARD_SIZE).fill(0).map(() => new Array(CHESS_BOARD_SIZE).fill(null))
/**
 * 将棋盘坐标转化为棋盘格子坐标
 * @param {Number} val 棋盘上的坐标
 */
export const transfromOffset2Grid = val => ~~((val / COLUMN_WIDTH) - 0.5)
/**
 * 输入若干个参数, 判断是否至少有一个为真值
 */
export const atLeastOneTrue = function () {
  return Array.from(arguments).map(item => !!item).map(item => item + 0).reduce((pre, next) => pre + next)
}
