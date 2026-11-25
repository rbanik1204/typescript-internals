interface Person {
  name: string
}

interface Employee extends Person {
  employeeId: string
}
/* 
`Employee inherits the contract of `Person` and adds another property 
 BUT
 interface A {
    id:number
 }
 interface B extends A {
    id:string
 } ERROR ---> Interface cannot extend another interface by changing an inherited property's type incompatibly! 
*/
const emp01: Employee = {
  name: "hello",
  employeeId: "pid001",
}

//Type Intersection
type A = {
  id: string
}
type B = {
  id: number
}
type C = A & B
type ID = C["id"] //Resulting Property type is : never
