import { CurrencyType } from "src/app/enums/currency-type";
import { PrintingEditionType } from "src/app/enums/edition-type";

export interface PrintingEditionFilter 
{
    types?: PrintingEditionType[]
    min?: number
    max?: number
    currency?: CurrencyType
    sort?: boolean
}