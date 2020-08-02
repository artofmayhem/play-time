export class Board {
  board: Array<string>

  constructor() {
    this.board  = new Array(9).fill(null)
  }

  resetBoard() {
    this.board = new Array(9).fill(null)
  }
}