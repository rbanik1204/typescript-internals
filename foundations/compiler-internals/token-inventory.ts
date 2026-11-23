import ts from "typescript"

const fileName: string = "examples.ts"
const sourceCode: string = "const examples = [10, 'Ratul',true,null];"

//PHASE - Scanning/Lexing
//Converts raw source text into stream of lexical tokens (e.g., Keywords, Identifiers, Punctuations, Literals)
console.log("---SCANNING---")
const scanner: ts.Scanner = ts.createScanner(
  ts.ScriptTarget.Latest,
  true,
  ts.LanguageVariant.Standard,
  sourceCode
)
scanner.setText(sourceCode) //internal position = 0
let totalTokens: number = 0
let token: ts.SyntaxKind = scanner.scan() //Gets first token
const tokenCounts = new Map<string, number>() //type already on RHS thats why depend on type inference
while (token !== ts.SyntaxKind.EndOfFileToken) {
  const tokenCategory: string = ts.SyntaxKind[token] //reverse enum lookup
  const tokenText: string = scanner.getTokenText()
  const start: number = scanner.getTokenStart() //getTokenPos() is deprecated
  const end: number = scanner.getTokenEnd()
  totalTokens++
  tokenCounts.set(tokenCategory, (tokenCounts.get(tokenCategory) ?? 0) + 1)
  if (scanner.isUnterminated()) throw Error("Unterminated token stream!")
  if (scanner.isIdentifier() || scanner.isReservedWord()) {
    console.log({
      tokenCategory,
      tokenText,
      start,
      end,
    })
  }
  token = scanner.scan()
}
console.log("Token Counts: " + totalTokens)
console.log("Unique categories:", tokenCounts.size)
