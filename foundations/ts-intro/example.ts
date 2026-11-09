let username: string = "sampleUsername"
let age: number = 22
function greet(name: string): string {
  return `Hello ${name}`
}
console.log(greet(username))
console.log(age)
type User = {
  name: string
  age: number
}

const person = {
  name: "Ratul",
  age: 22,
}

const user: User = person
