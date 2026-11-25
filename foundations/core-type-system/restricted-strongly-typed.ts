type Customer = {
  name: string
  id: "Addhaar" | "PAN" | "ration"
  address: string
}
const customer = {
  name: "hello",
  id: "Addhaar",
  address: "USA",
} as const satisfies Customer //as const => readonly + literal types are preserved , satifies => strongly typed domain
console.log(customer)
