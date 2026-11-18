import ts from "typescript"

const sourceCode: string = `const examples=[10,
                               20, 
                               30]`
const fileName: string = "multiline-check.ts"
//Parse the source string into an AST
const sourceFile: ts.SourceFile = ts.createSourceFile(
  fileName,
  sourceCode,
  ts.ScriptTarget.Latest,
  true // setParentNodes: required for getting text/line info easily
) //retrieves the root of AST node for a file path
const options: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext, //Compile my output JS to bleeding-edge ECMAScript Standard
  strict: true, //set Parent Pointers to AST nodes
}
const host: ts.CompilerHost = ts.createCompilerHost(options)
const originalGetSourceFile = host.getSourceFile.bind(host)

//Intercept file lookup to serve in-memory AST
host.getSourceFile = (name, languageVersion) => {
  if (name === fileName) return sourceFile
  return originalGetSourceFile(name, languageVersion)
}

const program: ts.Program = ts.createProgram({
  rootNames: [fileName],
  options,
  host,
})

// const checker:ts.TypeChecker = program.getTypeChecker()

ts.forEachChild(sourceFile, (node) => {
  if (ts.isVariableStatement(node)) {
    console.log(node.getText(sourceFile)) //const examples = [10, 20 , 30]
    const declaration: ts.VariableDeclaration =
      node.declarationList.declarations[0]!
    console.log(declaration.getText(sourceFile)) //examples = [10, 20, 30]
    if (ts.isIdentifier(declaration.name)) {
      const identifierNode: ts.Identifier = declaration.name
      console.log({
        kind: ts.SyntaxKind[identifierNode.kind],
        rawText: identifierNode.text,
        escapedText: identifierNode.escapedText, //Internal compiler symbol name
        pos: identifierNode.pos,
        end: identifierNode.end,
      })
    }
    if (
      declaration.initializer &&
      ts.isArrayLiteralExpression(declaration.initializer)
    ) {
      const initializerNode = declaration.initializer
      const start = initializerNode.getStart(sourceFile)
      const end = initializerNode.getEnd()
      const sourceText = sourceFile.text.slice(start, end)
      const isMultiline = sourceText.includes("\n")
      console.log(isMultiline)
    }
  }
})
