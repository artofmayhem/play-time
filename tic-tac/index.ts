import * as readline from "readline"
import { Game } from "./Game"

let count = 0
const game = new Game()
let players: Record<string, string> = {
  p1: "",
  p2: "",
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function play() {
  rl.question(
    `${game.player}, please enter a number between 1 - 9, to play: `,
    (answer) => {
      const move = parseInt(answer, 10)
      const isNaN = Number.isNaN(Number(move))

      if (isNaN || move < 1 || move > 9) {
        console.error(
          "\x1B[31mInvalid number entered, please try again.\x1B[0m"
        )
        play()
      } else {
        game.play(move)
  
        if (game.isDraw || game.hasWinner) {
          rl.close()
        } else {
          play()
        }
      }
    }
  )
}

function addPlayers() {
  rl.question(
    `Please enter a name for Player ${count > 0 ? "2" : "1"}: `,
    (name) => {
      if (!name) {
        console.error("\x1B[31mName is required, please try again.\x1B[0m")
        addPlayers()
      } else {
        players[`p${++count}`] = name
        if (count == 2) {
          game.start(players.p1, players.p2)
          play()
        } else {
          addPlayers()
        }
      }
    }
  )
}

addPlayers()
