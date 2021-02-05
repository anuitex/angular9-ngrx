import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/constants/constants';
import { PrintingEditionItem } from 'src/app/models/printing-edition/printing-edition-item';
import { PrintingEdition } from 'src/app/models/printing-edition/printing-edition.model';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionFormService {

  printingEditionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(null, Validators.maxLength(1000)),
    type: new FormControl(0, [Validators.required]),
    authors: new FormControl(null, Validators.required),
    price: new FormControl(0.00, [Validators.required, Validators.min(1)]),
    currency: new FormControl(0, Validators.required)
  })

  constructor() {}

  initalizeForm() 
  {
    this.printingEditionForm.setValue({
      id: Constants.DEFAULT_ID,
      title: null,
      description: null,
      type: null,
      authors: null,
      price: 0.00,
      currency: null
    });
  }

  populateForm(printingEdition: PrintingEdition) 
  {
    this.printingEditionForm.setValue({
      id: printingEdition.id,
      title: printingEdition.title,
      description: printingEdition.description,
      type: printingEdition.type.toString(),
      authors: printingEdition.authors.map(a => a.authorId),
      price: printingEdition.price,
      currency: printingEdition.currency.toString()
    });
  }

  formValue(): PrintingEditionItem 
  {
    return {
      id : this.id.value,
      title : this.title.value,
      description : this.description.value,
      price : this.price.value,
      type : this.type.value,
      currency : this.currency.value,
      authors : this.authors.value
    }
  }
  
  get id() 
  {
    return this.printingEditionForm.get('id') as FormControl;
  }

  get title() 
  {
    return this.printingEditionForm.get('title') as FormControl;
  }

  get description() 
  {
    return this.printingEditionForm.get('description') as FormControl;
  }

  get type() 
  {
    return this.printingEditionForm.get('type') as FormControl;
  }

  get authors() 
  {
    return this.printingEditionForm.get('authors') as FormControl;
  }

  get price() 
  {
    return this.printingEditionForm.get('price') as FormControl;
  }

  get currency() 
  {
    return this.printingEditionForm.get('currency') as FormControl;
  }

  get isRemoved() 
  {
    return this.printingEditionForm.get('isRemoved') as FormControl;
  }
}