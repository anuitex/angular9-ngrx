import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edition'
})
export class EditionPipe implements PipeTransform {

  transform(value: any, args?: any): string 
  {
    if (value === 0)
    {
      return 'None';
    }
    if (value === 1)
    {
      return 'Book';
    }
    if (value === 2)
    {
      return 'Journal';
    }
    if (value === 3)
    {
      return 'Newspaper';
    }
  }

}