import * as ts from "typescript"

const program: ts.Program = ts.createProgram(["example.ts"], { strict: true })
const checker: ts.TypeChecker = program.getTypeChecker() // The TS brain
const sourceFile: ts.SourceFile | undefined =
  program.getSourceFile("example.ts")!

ts.forEachChild(sourceFile, (node) => {
  if (ts.isVariableStatement(node)) {
    console.log(node.getText(sourceFile)) //const examples = [25, "hello", true, null]
    const declaration: ts.VariableDeclaration =
      node.declarationList.declarations[0]
    console.log(declaration.getText(sourceFile)) //examples = [25, "hello", true, null]
    console.log({
      kind: ts.SyntaxKind[node.kind],
      Initializer: declaration.initializer?.getFullText(sourceFile), //Info: has no special AST node Flag set on it thats why declaration.initializer?.flags gives 0 or if human readable string then 'None'
      flags: ts.NodeFlags[declaration.parent.flags],
      name: declaration.name.getText(sourceFile),
      parent: ts.SyntaxKind[declaration.parent.kind],
      Let: (ts.NodeFlags.Let & declaration.parent.flags) !== 0, //
      Const: (declaration.parent.flags & ts.NodeFlags.Const) !== 0,
    })
    if (ts.isIdentifier(declaration.name)) {
      const identifierNode: ts.Identifier = declaration.name
      console.log({
        kind: ts.SyntaxKind[identifierNode.kind], //"Identifier"
        escapedText: identifierNode.escapedText, //Internal compiler symbol name
        rawText: identifierNode.text, //"examples"
        pos: identifierNode.pos,
        end: identifierNode.end,
      })
      if (
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      ) {
        const initializerNode = declaration.initializer
        console.log({
          kind: ts.SyntaxKind[initializerNode.kind],
          rawText: initializerNode.getText(sourceFile), //Only literal tokens with a single raw value have .text prop.An array literal contains multiple expressions, not a single string.
          elementCount: initializerNode.elements.length, //4
          //multiline:initializerNode.multiline ?? false,
          pos: initializerNode.pos,
          end: initializerNode.end,
        })
      }
    }
  }
})
//VariableStatement (node): Represents the entire statement, including modifiers like export or declare and the trailing semicolon. Its flags property is usually 0 (ts.NodeFlags.None).
