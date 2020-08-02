import { Game } from "./Game"

const game = new Game()

game.start()
// Player 1
game.play(7)
// Player 2 - invalid move
game.play(7)
// Player 2 - valid move
game.play(1)
game.play(8)
game.play(2)
game.play(9)
game.play(3)