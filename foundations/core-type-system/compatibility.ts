import ts from "typescript"

const sourceCode = `
type User = {
    id:string
};
type Employee = {
    id:string;
    salary:number;
};
const employee:Employee = {
    id:"EMP001",
    salary:50000
}
const user:User= employee`

const fileName = "example.ts"

const sourceFile: ts.SourceFile = ts.createSourceFile(
  fileName,
  sourceCode,
  ts.ScriptTarget.Latest,
  true
)
const compilerOptions: ts.CompilerOptions = {
  noEmit: true,
  strict: true,
}
const host: ts.CompilerHost = ts.createCompilerHost(compilerOptions)
const program: ts.Program = ts.createProgram([fileName], compilerOptions, host)
const checker = program.getTypeChecker()
