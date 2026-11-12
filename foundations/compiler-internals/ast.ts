import * as ts from "typescript"

const sourceCode = `
    const age:number = 22;

    function greet(name:string):string {
        return "hello "+name;
    }
`

const sourceFile = ts.createSourceFile(
  "example.ts",
  sourceCode,
  ts.ScriptTarget.Latest,
  true
)

function printAST(node: ts.Node, depth = 0): void {
  const indentation = " ".repeat(depth * 2)
  console.log(
    indentation +
      ts.SyntaxKind[node.kind] +
      " : " +
      node.getText(sourceFile).slice(0.5)
  )

  ts.forEachChild(node, (child) => {
    printAST(child, depth + 1)
  })
}

printAST(sourceFile)
