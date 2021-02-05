import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, args?: any): string 
  {
    if (value === 0)
    {
      return 'None';
    }
    if (value === 1)
    {
      return 'USD';
    }
    if (value === 2)
    {
      return 'EUR';
    }
    if (value === 3)
    {
      return 'GRP';
    }
    if (value === 4)
    {
      return 'CHF';
    }
    if (value === 5)
    {
      return 'JPY';
    }
    if (value === 6)
    {
      return 'UAH';
    }
  }
}