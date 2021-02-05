import { CurrencyType } from "src/app/enums/currency-type";
import { PrintingEdition } from "../printing-edition/printing-edition.model";
import { Order } from "./order-model";

export class OrderItem
{
  id: string
  count: number
  currency: CurrencyType
  printingEditionId: string
  printingEdition: PrintingEdition
  orderId?: string
  order: Order
}