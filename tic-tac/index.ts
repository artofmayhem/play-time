import * as readline from "readline"
import { Game } from "./Game"

const game = new Game()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

game.start()

function play() {
  rl.question(
    `${game.player}, please enter a number between 1 - 9, to play: `,
    (answer) => {
      const move = parseInt(answer, 10)
      const isNaN = Number.isNaN(Number(move))

      if (isNaN || move < 1 || move > 9) {
        console.log("\x1B[31mInvalid number entered, please try again.\x1B[30m")
        play()
        return
      }

      game.play(move)

      if (game.isDraw || game.hasWinner) {
        rl.close()
      } else {
        play()
      }
    }
  )
}

play()
