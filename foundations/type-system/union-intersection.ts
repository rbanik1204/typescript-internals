type OrderBase = {
  id: string
  total: number
}

type PendingOrder = {
  status: "pending"
  paymentId?: never
}
type PaidOrder = {
  status: "paid"
  paymentId: string
}
type CancelledOrder = {
  status: "cancelled"
  reason: string
}

type Order = OrderBase & (PendingOrder | PaidOrder | CancelledOrder)
