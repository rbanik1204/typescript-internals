interface UserInterface {
  id: number
  name: string
}
type UserAlias = {
  id: number
  name: string
}
const user: UserInterface = {
  id: 1,
  name: "hello",
}
const anotherUser: UserAlias = user
console.log(anotherUser)
