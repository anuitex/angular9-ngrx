import { AuthorInPrintingEdition } from "./author-in-edition"

export class Author 
{
  id: string
  name: string
  printingEditions?: AuthorInPrintingEdition[]
}