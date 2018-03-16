import Gamer from './src/Gamer'

let gameConfig = {isCanvas: false}
let game = new Gamer(gameConfig)

document.getElementById('start').onclick = () => {
  game.removeDom()
  game = new Gamer(gameConfig) // 这里可以优化的, 懒得写了
}
document.getElementById('switch').onclick = () => {
  game.removeDom()
  gameConfig = {chessPieceArr: game.chessPieceArr, isCanvas: !gameConfig.isCanvas}
  game = new Gamer(gameConfig)
}
document.getElementById('cancel').onclick = () => {
  game.cancelLastStep()
}
