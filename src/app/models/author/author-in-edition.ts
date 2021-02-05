import { Author } from "./author-model"
import { PrintingEdition } from "../printing-edition/printing-edition.model"


export class AuthorInPrintingEdition
{
  authorId: string
  author?: Author
  printingEditionId: string
  printingEdition?: PrintingEdition
  date?: Date
}
