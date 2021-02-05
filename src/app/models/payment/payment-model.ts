import { Order } from "../order/order-model";

export interface Payment
{
  order: Order,
  token: string
}
