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
const anotherUser: UserAlias = user // It doesnt require source and destination to have same declaration Type
console.log(anotherUser)
