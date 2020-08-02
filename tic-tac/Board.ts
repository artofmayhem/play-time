export class Board {
  board: Array<string>
  private readonly size = 9

  constructor() {
    this.board  = new Array(this.size)
  }

  resetBoard() {
    this.board = new Array(this.size)
  }
}