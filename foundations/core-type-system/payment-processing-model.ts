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
  cardNetwork: "Visa" | "Mastercard" | "Rupay" | "Amex"
  last4Digits: string
  expiryMonth: number
  expiryYear: number
  cardHolderName: string
}

interface UpiPayment extends PaymentBase {
  method: "upi" //Discriminant Literal
  vpa: string //e.g., hello@okici
  upiApp?: "Phonepe" | "GPay" | "Paytm" | "BHIM"
  utrNumber?: string //populated once settled
}

interface NetBankingPayment extends PaymentBase {
  method: "netbanking" //Discriminant Literal
  bankCode: string // e.g., "HDFC", "SBI", "ICICI"
  bankReferenceId: string
}

//Union type combining all payment methods
type Payment = CardPayment | UpiPayment | NetBankingPayment

//Composition method : declare type objects for each payment method such as CardDetails,UPIDetails,NetBankingDetails . Every payment gets PaymentBase intersected with one specific payment method
//type Payment = PaymentBase & (CardDetails | UPIDetails | NetBankingDetails)

function processPayment(payment: Payment): string {
  switch (payment.method) {
    case "card":
      return `Charging ${payment.cardNetwork} ending with ${payment.last4Digits}`
    case "netbanking":
      return `redirecting to ${payment.bankCode} portal`
    case "upi":
      return `Sending collect request to ${payment.vpa}`
    default:
      //Compile-time check: errors if any payment method is missed
      const _exhaustiveCheck: never = payment
      return _exhaustiveCheck
  }
}
