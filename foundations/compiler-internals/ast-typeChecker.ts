import * as ts from "typescript"

const program = ts.createProgram(["example.ts"], { strict: true })
const checker = program.getTypeChecker() // The TS brain
const sourceFile = program.getSourceFile("example.ts")!

ts.forEachChild(sourceFile, (node) => {
  if (ts.isVariableStatement(node)) {
    const declaration = node.declarationList.declarations[0]

    // Ask the checker for the semantic type of this AST node
    const type = checker.getTypeAtLocation(declaration)
    console.log(declaration.name.getText(), "->", checker.typeToString(type))
  }
})
