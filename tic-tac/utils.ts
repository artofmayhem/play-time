const cross = "✘"
const circle = "◯"

export const tag = (tag?: string) => {
  switch (tag) {
    case cross:
      return `\x1B[95m${tag}\x1B[0m`
    case circle:
      return `\x1B[93m${tag}\x1B[0m`

    default:
      return " "
  }
}
