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
const sourceFile = program.getSourceFile("./type-inspection.ts")! //retrieves the root AST file node for a given AST node, while asserting TS type checker that result will not be `undefined`
if (!sourceFile) throw new Error("Source file not found!")

const checker = program.getTypeChecker() //API through which we can inspect semantic informations
console.log(checker)
function inspect(node: ts.Node): void {
  if (ts.isIdentifier(node)) {
    //typescript type guard
    const symbol = checker.getSymbolAtLocation(node) // Type checker to find symbol associated with this identifier AST node
    if (symbol) {
      if (symbol.flags & ts.SymbolFlags.Function) {
        console.log("This is a function!")
      }
      if (symbol.flags & ts.SymbolFlags.BlockScopedVariable) {
        console.log("This is a let or const variable!")
      }

      console.log({
        symbol: symbol.getName(),
        flags: symbol.getFlags(), // whether its a variable, function or class
      })
    }
  }
  ts.forEachChild(node, (child) => {
    inspect(child)
  })
}
inspect(sourceFile)
