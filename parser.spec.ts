import { test, expect } from 'vitest'
import { NodeType, parser } from './parser'
import { TokenType } from './tokenizer'

test('number', () => {
  const tokens = [
    {
      type: TokenType.Number,
      value: '2'
    }
  ]
  const ast = {
    type: NodeType.Root,
    body: [
      {
        type: NodeType.Number,
        value: "2"
      }
    ]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('callExpression1', () => {
  const tokens = [
    { type: TokenType.Paren, value: "(" },
    { type: TokenType.Name, value: "add" },
    { type: TokenType.Number, value: "1" },
    { type: TokenType.Number, value: "1" },
    { type: TokenType.Paren, value: ")" },
  ];
  const ast = {
    type: NodeType.Root,
    body: [
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.Number,
            value: "1",
          },
          {
            type: NodeType.Number,
            value: "1",
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast)
})

test('callExpression2', () => {
  const tokens = [
    { type: TokenType.Paren, value: "(" },
    { type: TokenType.Name, value: "add" },
    { type: TokenType.Number, value: "1" },
    { type: TokenType.Number, value: "1" },
    { type: TokenType.Paren, value: ")" },
    { type: TokenType.Paren, value: "(" },
    { type: TokenType.Name, value: "add" },
    { type: TokenType.Number, value: "2" },
    { type: TokenType.Number, value: "4" },
    { type: TokenType.Paren, value: ")" },
  ];
  const ast = {
    type: NodeType.Root,
    body: [
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.Number,
            value: "1",
          },
          {
            type: NodeType.Number,
            value: "1",
          },
        ],
      },
      {
        type: NodeType.CallExpression,
        name: "add",
        params: [
          {
            type: NodeType.Number,
            value: "2",
          },
          {
            type: NodeType.Number,
            value: "4",
          },
        ],
      }
    ],
  };

  expect(parser(tokens)).toEqual(ast)
})
