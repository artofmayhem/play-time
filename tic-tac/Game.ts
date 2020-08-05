import { Board } from "./Board"
import { colour } from "./utils"
import { Player } from "./Player"
import { Scoreboard } from "./Scoreboard"
import { TAGS, WINNING_INDICES } from "./constants"

export class Game {
  private p1!: Player
  private p2!: Player
  private count: number
  public hasWinner = false
  private scoreboard: Scoreboard
  public isDraw: boolean = false
  private readonly gameBoard: Board
  private tags: Record<string, string> = {}

  constructor() {
    this.count = 0
    this.gameBoard = new Board()
    this.scoreboard = new Scoreboard()
  }

  addPlayers(p1?: string, p2?: string) {
    this.p1 = new Player(p1)
    this.p2 = new Player(p2)
    this.scoreboard.initScores(this.p1.name, this.p2.name)
  }

  assignTags() {
    const index = Math.round(Math.random())
    this.tags[this.p1.name] = TAGS[index]
    this.tags[this.p2.name] = TAGS[1 - index]
  }

  checkDraw() {
    const { board } = this.gameBoard
    this.isDraw =
      !this.hasWinner && board.every((_, index: number) => board[index])

    if (this.isDraw) {
      console.log(`\x1b[92mIt is a TIE.\x1b[0m`)
    }
  }

  checkWinner() {
    this.hasWinner = WINNING_INDICES.some((indices) =>
      indices.every((index) => this.gameBoard.board[index] === this.tag)
    )

    if (this.hasWinner) {
      this.scoreboard.updateScores(this.player)
      console.log(`\x1b[92m${this.player} WON this round.\x1b[0m`)
      this.showScores()
    }
  }

  get player() {
    return this.count % 2 == 0 ? this.p1.name : this.p2.name
  }

  get tag() {
    return this.tags[this.player]
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

  resetGame() {
    this.count = 0
    this.isDraw = false
    this.hasWinner = false
    this.gameBoard.resetBoard()
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

    while (i < board.length) {
      content += i == 0 ? "-------------\n" : ""
      content += `| ${colour(board[i++]) ?? i} \x1B[34m`
      content += i % 3 == 0 ? "|\n-------------\n" : ""
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
${p1?.name} - ${colour(this.tags[p1?.name])}
${p2?.name} - ${colour(this.tags[p2?.name])}`)
  }

  showScores() {
    const { scoreboard } = this
    const p1 = this.p1.name
    const p2 = this.p2.name
    const p1Score = scoreboard.scores[p1]
    const p2Score = scoreboard.scores[p2]
    console.info(`
SCOREBOARD
=================
${p1}: ${p1Score}
-----------------
${p2}: ${p2Score}
=================
    `)
  }

  start(p1?: string, p2?: string) {
    this.addPlayers(p1, p2)
    this.assignTags()
    this.showInfo()
    this.showScores()
    this.showBoard()
  }
}
