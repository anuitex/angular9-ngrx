import { CurrencyType } from '../../enums/currency-type'
import { PrintingEditionType } from '../../enums/edition-type'
import { AuthorInPrintingEdition } from '../author/author-in-edition'

export class PrintingEdition 
{
  id?: string
  title: string
  description: string
  price: number
  type: PrintingEditionType
  currency: CurrencyType
  authors?: AuthorInPrintingEdition[]
}
