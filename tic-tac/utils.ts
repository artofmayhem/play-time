const CROSS = "✘"
const CIRCLE = "◯"

export const colour = (tag?: string) => {
  switch (tag) {
    case CROSS:
      return `\x1B[95m${tag}\x1B[0m`
    case CIRCLE:
      return `\x1B[93m${tag}\x1B[0m`

    default:
      return null
  }
}
