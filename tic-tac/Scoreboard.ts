export class Scoreboard {
  private scoreboard: Record<string, number> = {}

  constructor() {}

  initScores(p1: string, p2: string) {
    this.scoreboard[p1] = 0
    this.scoreboard[p2] = 0
  }

  get scores() {
    return this.scoreboard
  }

  updateScores(player: string) {
    if (this.scoreboard[player] == null) {
      return
    }

    this.scoreboard[player]++
  }
}
