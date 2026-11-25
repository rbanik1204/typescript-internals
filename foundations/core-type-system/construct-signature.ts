interface User {
  name: string
}
interface UserConstructor {
  new (name: string): User
}
class Admin implements User {
  constructor(public name: string) {}
}
//Accepts any class whose constructor takes a string and returns a User
function createUser(ctor: UserConstructor, name: string): User {
  return new ctor(name)
}
const admin = createUser(Admin, "hello")
