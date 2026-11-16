import ts from "typescript"
const program = ts.createProgram({
  rootNames: ["./example.ts"],
  options: {
    strict: true,
    target: ts.ScriptTarget.ESNext, //Compile my output JS to bleeding-edge ECMAScript Standard
  },
})
//non-null assertion operator
const sourceFile = program.getSourceFile("./example.ts")! //retrieves the root of AST node for a file path
const checker = program.getTypeChecker() // initializes the TypeScript TypeChecker, which acts as the semantic analysis engine of the TypeScript Compiler API.
//While an Abstract Syntax Tree (AST) only tells you the structural layout of your code (such as where a variable or function is located), the checker understands what that code actually means across your entire project
function inspectType(node: ts.Node): void {
  const type = checker.getTypeAtLocation(node)
  console.log({
    kind: ts.SyntaxKind[node.kind],
    type: checker.typeToString(type),
    text: node.getText(sourceFile),
    flags: type.getFlags(),
  })
  ts.forEachChild(node, inspectType)
}
inspectType(sourceFile)
