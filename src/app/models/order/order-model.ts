import { OrderStatus } from "src/app/enums/order-status";
import { Payment } from "../payment/payment-model";
import { User } from "../user/user.model";
import { OrderItem } from "./order-item-model";


export class Order
{
  id: string
  userId: string
  user: User
  date: Date
  paymentId: string
  payment: Payment
  status: OrderStatus
  totalCost: number
  items: OrderItem[]
}
