export enum TokenType {
  Paren,
  Name,
  Number
}

export interface Token {
  type: TokenType
  value: string
}

export function tokenizer(code: string) {
  let current = 0
  const tokens: Token[] = []

  while (current < code.length) {
    let char = code[current]

    // space
    const SPACE = /\s/
    if (SPACE.test(char)) {
      current++
      continue
    }

    // paren
    if (char === '(' || char === ')') {
      tokens.push({
        type: TokenType.Paren,
        value: char
      })
      current++
      continue
    }

    // name
    const LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ""
      while (LETTERS.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }
      tokens.push({
        type: TokenType.Name,
        value
      })
    }

    // number
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      tokens.push({
        type: TokenType.Number,
        value: char
      })
      current++
      continue
    }
  }

  return tokens
}