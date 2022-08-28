import { test, expect } from 'vitest'
import { tokenizer, TokenType } from './tokenizer'

test('tokenizer', () => {
  const code = `(add 2 (subtract 4 2))`
  const tokens =
    [
      { type: TokenType.Paren, value: '(' },
      { type: TokenType.Name, value: 'add' },
      { type: TokenType.Number, value: '2' },
      { type: TokenType.Paren, value: '(' },
      { type: TokenType.Name, value: 'subtract' },
      { type: TokenType.Number, value: '4' },
      { type: TokenType.Number, value: '2' },
      { type: TokenType.Paren, value: ')' },
      { type: TokenType.Paren, value: ')' },
    ]
  expect(tokenizer(code)).toEqual(tokens)
})

test('left paren', () => {
  const char = '('
  const tokens = [{
    type: TokenType.Paren,
    value: '('
  }]
  expect(tokenizer(char)).toEqual(tokens)
})

test('right paren', () => {
  const char = ')'
  const tokens = [{
    type: TokenType.Paren,
    value: ')'
  }]
  expect(tokenizer(char)).toEqual(tokens)
})

test('add', () => {
  const char = 'add'
  const tokens = [{
    type: TokenType.Name,
    value: "add"
  }]
  expect(tokenizer(char)).toEqual(tokens)
})

test('2', () => {
  const char = '2'
  const tokens = [{
    type: TokenType.Number,
    value: '2'
  }]
  expect(tokenizer(char)).toEqual(tokens)
})

test('(add 1 2)', () => {
  const code = `(add 1 2)`
  const tokens = [
    {
      type: TokenType.Paren,
      value: "("
    },
    {
      type: TokenType.Name,
      value: "add"
    },
    {
      type: TokenType.Number,
      value: "1"
    },
    {
      type: TokenType.Number,
      value: "2"
    },
    {
      type: TokenType.Paren,
      value: ")"
    },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})