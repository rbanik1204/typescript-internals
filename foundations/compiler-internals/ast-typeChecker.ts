import * as ts from "typescript"

const program = ts.createProgram(["example.ts"], { strict: true })
const checker = program.getTypeChecker() // The TS brain
const sourceFile = program.getSourceFile("example.ts")!

ts.forEachChild(sourceFile, (node) => {
  if (ts.isVariableStatement(node)) {
    console.log(node.getText(sourceFile)) //const examples = [25, "hello", true, null]
    const declaration = node.declarationList.declarations[0]
    console.log(declaration.getText(sourceFile)) //examples = [25, "hello", true, null]
    console.log({
      kind: ts.SyntaxKind[node.kind],
      flags: ts.NodeFlags[declaration.parent.flags],
      parent: ts.SyntaxKind[declaration.parent.kind],
      Let: (ts.NodeFlags.Let & declaration.parent.flags) !== 0, //
      Const: (declaration.parent.flags & ts.NodeFlags.Const) !== 0,
    })
  }
})
//VariableStatement (node): Represents the entire statement, including modifiers like export or declare and the trailing semicolon. Its flags property is usually 0 (ts.NodeFlags.None).
