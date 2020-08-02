import { Board } from "./Board"
import { Player } from "./Player"
import { colour } from "./utils"
import { WINNING_INDICES } from "./constants"

export class Game {
  private p1!: Player
  private p2!: Player
  private count: number
  public hasWinner = false
  private readonly gameBoard: Board
  private players: Record<string, string> = {}
  private tags: Readonly<Array<string>> = ["✘", "◯"]
  isDraw: boolean = false

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

  checkDraw() {
    const { board } = this.gameBoard
    this.isDraw = !this.hasWinner && board.every((_, index: number) => board[index])

    if (this.isDraw) {
      console.log(`\x1b[92mIt is a TIE.\x1b[0m`)
    }
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
    } else {
      this.gameBoard.board[index] = this.tag
      this.checkWinner()
      this.checkDraw()
      this.showBoard()
      this.count++
    }

  }

  showBoard() {
    const { board } = this.gameBoard
    const title = `
_____________
Game  Board
=============
`
    let i = 0
    let content = "\x1B[34m"
    content += title + "\n"

    while (i < 9) {
      content += i == 0 ? "-------------\n" : ""
      content += `| ${colour(board[i]) ?? i + 1} \x1B[34m`
      content += (i + 1) % 3 == 0 ? "|\n-------------\n" : ""
      i++
    }

    content += "\x1B[0m"
    console.log(content)
  }

  showInfo() {
    const { p1, p2 } = this

    console.info(`
______________
Players' Info
==============
${p1?.name} - ${colour(this.players[p1?.name])}
${p2?.name} - ${colour(this.players[p2?.name])}`)
  }

  start() {
    this.addPlayers()
    this.assignTags()
    this.showInfo()
    this.showBoard()
  }
}
