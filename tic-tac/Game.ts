import { Board } from "./Board"
import { Player } from "./Player"

export class Game {
  private p1!: Player
  private p2!: Player
  private count: number
  private readonly gameBoard: Board
  private players: Record<string, string> = {}
  private tags: Readonly<Array<string>> = ["✘", "〇"]

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

  get player() {
    return this.count % 2 == 0 ? this.p1.name : this.p2.name
  }

  get tag() {
    return this.players[this.player]
  }

  play(input: number) {
    this.gameBoard.board[input - 1] = this.tag
    this.count++
  }

  showBoard() {
    const { board } = this.gameBoard

    console.log(
      `
        _____________
         Game  Board
        =============

        -------------
        | ${board[0] ?? " "} | ${board[1] ?? " "} | ${board[2] ?? " "} |
        -------------
        | ${board[3] ?? " "} | ${board[4] ?? " "} | ${board[5] ?? " "} |
        -------------
        | ${board[6] ?? " "} | ${board[7] ?? " "} | ${board[8] ?? " "} |
        -------------
      `
    )
  }

  showInfo() {
    const { p1, p2 } = this

    console.info(
      `
        _____________
        Players Info
        =============
        ${p1?.name} - ${this.players[p1?.name]}
        ${p2?.name} - ${this.players[p2?.name]}
      `
    )
  }

  start() {
    this.addPlayers()
    this.assignTags()
    this.showInfo()
  }
}
