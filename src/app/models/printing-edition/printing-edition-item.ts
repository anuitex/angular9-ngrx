import { CurrencyType } from 'src/app/enums/currency-type'
import { PrintingEditionType } from 'src/app/enums/edition-type'

export class PrintingEditionItem
{
  id?: string
  title: string
  description: string
  price: number
  type: PrintingEditionType
  currency: CurrencyType
  authors: Array<string>
}