import ts from "typescript" //compiler as import
const program = ts.createProgram({
  //creates the compiler's program infrastructure
  rootNames: ["./example.ts"],
  options: {
    strict: true,
    target: ts.ScriptTarget.ESNext,
  },
})
const sourceFile = program.getSourceFile("./example.ts")
if (!sourceFile) throw new Error("Source file not found!")

const checker = program.getTypeChecker()
console.log(checker)
