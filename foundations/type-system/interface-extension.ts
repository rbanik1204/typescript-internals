interface Person {
  name: string
}

interface Employee extends Person {
  employeeId: string
}

const emp01: Employee = {
  name: "hello",
  employeeId: "pid001",
}
