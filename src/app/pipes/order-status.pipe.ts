import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any 
  {
    if (value === 0)
    {
      return 'None';
    }
    if (value === 1)
    {
      return 'Paid';
    }
    if (value === 2)
    {
      return 'Unpaid';
    }
  }
}