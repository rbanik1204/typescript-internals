type User = {
  name: string
  age: number
}
// const user: User = {
//     name: "hello",
//     age: 65,
//     email:"hello@example.com" //TS 2353
// }//Excess Property Check - Freshly created Object Literal
const person = {
  name: "hello",
  age: 65,
  email: "hello@example.com",
}
const user: User = person
console.log(user)
