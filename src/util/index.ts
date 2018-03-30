import { CHESS_BOARD_SIZE, COLUMN_WIDTH } from '../gameConfig'

export const initChessPieceArr = () => new Array(CHESS_BOARD_SIZE).fill(0).map(() => new Array(CHESS_BOARD_SIZE).fill(-1))

export const transfromOffset2Grid = (val: number) => ~~((val / COLUMN_WIDTH) - 0.5)

export const atLeastOneTrue = (...rest: any[]) => rest.map(item => +(!!item)).reduce((pre, next) => pre + next)