import { Board } from "./Board"
import { Player } from "./Player"
import { tag } from "./utils"
import { WINNING_INDICES } from "./constants"

export class Game {
  private p1!: Player
  private p2!: Player
  private count: number
  private hasWinner = false
  private readonly gameBoard: Board
  private players: Record<string, string> = {}
  private tags: Readonly<Array<string>> = ["✘", "◯"]

  constructor() {
    this.count = 0
    this.gameBoard = new Board()
  }

  addPlayers(p1?: string, p2?: string) {
    this.p1 = new Player(p1)
    this.p2 = new Player(p2)
  }

  assignTags() {
    const index = Math.round(Math.random())
    this.players[this.p1.name] = this.tags[index]
    this.players[this.p2.name] = this.tags[1 - index]
  }

  checkWinner() {
    this.hasWinner = WINNING_INDICES.some((indices) =>
      indices.every((index) => this.gameBoard.board[index] === this.tag)
    )

    if (this.hasWinner) {
      console.log(`\x1b[92m${this.player} WON this round.\x1b[0m`)
    }
  }

  get player() {
    return this.count % 2 == 0 ? this.p1.name : this.p2.name
  }

  get tag() {
    return this.players[this.player]
  }

  isValidMove(index: number) {
    return this.gameBoard.board[index] == null
  }

  play(input: number) {
    if (this.hasWinner) {
      return
    }

    const index = --input
    if (!this.isValidMove(index)) {
      console.error(
        `\x1B[31m${this.player} made an invalid move. Move was already played, please try again.\x1B[0m`
      )
      return
    }

    this.gameBoard.board[index] = this.tag
    this.checkWinner()
    this.showBoard()
    this.count++
  }

  showBoard() {
    const { board } = this.gameBoard
    const title = `
_____________
Game  Board
=============
`
    let content = "\x1B[34m"
    content += title + "\n"

    Array.from({ length: 9 }, (_, i) => i).forEach((_, i) => {
      content += i == 0 ? "-------------\n" : ""
      content += `| ${tag(board[i])} \x1B[34m`
      content += (i + 1) % 3 == 0 ? "|\n-------------\n" : ""
      content += i == 8 ? "\x1B[0m" : ""
    })

    console.log(content)
  }

  showInfo() {
    const { p1, p2 } = this

    console.info(
      `______________
Players' Info
==============
${p1?.name} - ${tag(this.players[p1?.name])}
${p2?.name} - ${tag(this.players[p2?.name])}`
    )
  }

  start() {
    this.addPlayers()
    this.assignTags()
    this.showInfo()
    this.showBoard()
  }
}
