//Shared metadata contract (Interface)
interface PaymentBase {
  readonly transactionId: string
  amount: number //Store in smallest currency unit(e.g.,paise, cents) in production;
  currency: "INR" | "USD" | "EUR"
  status: "pending" | "completed" | "failed"
  createdAt: Date
}
//Method specific contracts extending interface PaymentBase
interface CardPayment extends PaymentBase {
  method: "card" //Discriminant Literal
}
