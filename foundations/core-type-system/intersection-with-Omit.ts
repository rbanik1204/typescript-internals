interface A {
  id: string
  name: string
}
type B = {
  id: number
  role: string
}
//Strip "id" from B before intersection with A
type C = A & Omit<B, "id">
//Now C["id"] clearly `string`
const user: C = {
  id: "user_123",
  name: "hello",
  role: "admin",
}
console.log(user)

//Fixing interface... extends with `Omit`
interface D extends Omit<B, "id"> {
  id: string
  name: string
}
const anotherUser: D = {
  id: "user_12",
  name: "hellow",
  role: "user",
}
console.log(anotherUser)

//Reusable Overwrite utility helper
type Overwrite<T, U> = Omit<T, keyof U> & U
//A's property Override any matching properties in B
type Merged = Overwrite<B, A>
const newUser: Merged = {
  id: "user_12",
  name: "hellow",
  role: "user",
}
