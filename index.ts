import GamerDom from "./src/Gamer/GamerDom"
import GamerCanvas from './src/Gamer/GamerCanvas'

console.log('hello world')
console.log(new Array(100).fill(1))
console.log(`1 + 1 = ${1+1}`)

let mode = 'dom'
let indexedPiece = []
let game 
game = new GamerDom(indexedPiece)
game.start()

document.getElementById('switch').onclick = () => {
  game && game.destroyView()
  indexedPiece = game.indexedPiece
  console.log(indexedPiece)
  if (mode === 'dom') {
    const newGame = new GamerCanvas(indexedPiece)
    newGame.start()
    game = newGame
    mode = 'dom'
  } else {
    const newGame = new GamerDom(indexedPiece)
    newGame.start()
    game = newGame
    mode = 'canvas'
  }
}