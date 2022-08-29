import { Token, TokenType } from './tokenizer'

type ChildNode = NumberNode | CallExpressionNode

export enum NodeType {
  Root,
  Number,
  CallExpression
}

interface Node {
  type: NodeType
}

interface RootNode extends Node {
  body: any[]
}

interface NumberNode extends Node {
  value: string
}

interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
}

function creatRootNode(): RootNode {
  return {
    type: NodeType.Root,
    body: []
  }
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeType.Number,
    value
  }
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeType.CallExpression,
    name,
    params: []
  }
}


export function parser(tokens: Token[]) {
  let current = 0
  const rootNode = creatRootNode()

  function walk() {
    let token = tokens[current]

    // 数字
    if (token.type === TokenType.Number) {
      current++
      return createNumberNode(token.value)
    }

    // 表达式
    if (token.type === TokenType.Paren && token.value === '(') {
      token = tokens[++current]
      const node = createCallExpressionNode(token.value)

      token = tokens[++current]
      while (!(token.type === TokenType.Paren && token.value === ')')) {
        if (token.type === TokenType.Number) {
          node.params.push(walk())
          token = tokens[current]
        }
      }
      current++
      return node
    }

    throw new Error(`unknown token: ${token}`)
  }

  while (current < tokens.length) {
    rootNode.body.push(walk())
  }

  return rootNode
}
