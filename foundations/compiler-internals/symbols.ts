import ts from "typescript" //compiler as import
const program = ts.createProgram({
  //creates the compiler's program infrastructure
  rootNames: ["./type-inspection.ts"], //Start reading here and grab any other imports this single import has
  options: {
    strict: true,
    target: ts.ScriptTarget.ESNext, //Compile my output JavaScript to the bleeding-edge ECMAScript standard
  },
})
//! ---> non-null assertion operator
const sourceFile = program.getSourceFile("./type-inspection.ts")! //retrieves the root AST file node for a given file path, while asserting TS type checker that result will not be `undefined`
if (!sourceFile) throw new Error("Source file not found!")

const checker = program.getTypeChecker() //API through which we can inspect semantic informations - TS brain
function inspectType(node: ts.Node): void {
  const type: ts.Type = checker.getTypeAtLocation(node) //internal type object for this AST node
  const typeName: string = checker.typeToString(type) //convert the internal type Object into a human-readable string
  const nodeText: string = node.getText(sourceFile) // Get the original source code text for this AST node(e.g., variable name, Numeric Literal)
  const syntaxKind = ts.SyntaxKind[node.kind] //Get the AST syntax category name (e.g., "Identifier", "NumericLiteral")
  console.log({
    kind: syntaxKind,
    text: nodeText,
    type: typeName,
    flags: ts.TypeFlags[type.flags], //internal compiler category ( or "kind") of resolved type
  })
  if (type.flags & ts.TypeFlags.StringLike)
    console.log(` ->${nodeText} evaluates to string!`)
  else if (type.flags & ts.TypeFlags.NumberLike)
    console.log(` ->${nodeText} evaluates to number!`)
}
function inspect(node: ts.Node): void {
  //tree climber
  // Symbol inspection (for names/identifiers)
  if (ts.isIdentifier(node)) {
    //TypeScript  binds `symbols` to Identifier nodes
    //typescript type guard
    const symbol = checker.getSymbolAtLocation(node) // Type checker to find symbol associated with this identifier AST node
    if (symbol) {
      if (symbol.flags & ts.SymbolFlags.Function) {
        console.log(`Symbol [${symbol.getName()}]: This is a function!`)
      }

      if (symbol.flags & ts.SymbolFlags.BlockScopedVariable) {
        console.log(
          `Symbol [${symbol.getName()}]: This is a let or const variable!`
        )
      }
      //   console.log({
      //     symbol: symbol.getName(),
      //     flags: symbol.getFlags(), // whether its a variable, function or class
      //   })
    }
  }
  //Type Inspection : Filter out structural syntax nodes (e.g., Whole File, Empty Blocks)
  if (
    ts.isIdentifier(node) ||
    ts.isVariableDeclaration(node) ||
    ts.isCallExpression(node) ||
    ts.isLiteralExpression(node)
  ) {
    inspectType(node)
  }
  ts.forEachChild(node, inspect)
}
inspect(sourceFile)
