import ts from "typescript"

const fileName: string = "examples.ts"
const sourceCode: string = "const examples = [10, 'Ratul',True,null];"

//PHASE - Scanning/Lexing
//Converts raw source text into stream of lexical tokens (e.g., Keywords, Identifiers, Punctuations, Literals)
console.log("---SCANNING---")
const scanner = ts.createScanner(
  ts.ScriptTarget.Latest,
  true,
  ts.LanguageVariant.Standard,
  sourceCode
)
scanner.setText(sourceCode)
let token: ts.SyntaxKind = scanner.scan()
while (token !== ts.SyntaxKind.EndOfFileToken) {
  console.log(
    `Token: ${ts.SyntaxKind[token]} -> "${scanner.getTokenText()}" Token: ${ts.SyntaxKind[scanner.getToken()]} Start: ${scanner.getTokenStart()} End: ${scanner.getTokenEnd()}`
  )
  token = scanner.scan()
}
