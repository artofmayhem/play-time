export class Player {
  private playerName: string
  private static playerCount = 1

  constructor(name?: string) {
    this.playerName = name ?? `Player ${Player.playerCount++}`
  }

  get name() {
    return this.playerName
  }
}