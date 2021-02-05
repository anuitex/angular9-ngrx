import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/constants/constants';
import { AuthorItem } from 'src/app/models/author/author-item';
import { Author } from 'src/app/models/author/author-model';

@Injectable({
  providedIn: 'root'
})
export class AuthorFormService {

  authorForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    printingEditions: new FormControl(null)
  })

  constructor() { }

  initalizeAuthorForm()
  {
    this.authorForm.setValue({
      id: Constants.DEFAULT_ID,
      name: null,
      printingEditions: null
    });
  }

  populateAuthorForm(author: Author)
  {
    this.authorForm.setValue({
      id: author.id,
      name: author.name,
      printingEditions: author.printingEditions
    });
  }

  get authorFromForm(): AuthorItem 
  {
    return {
      id: this.id.value,
      name: this.name.value,
      printingEditions: this.printingEditions.value,
    };
  }

  get id()
  {
    return this.authorForm.get('id') as FormControl;
  }

  get name()
  {
    return this.authorForm.get('name') as FormControl;
  }

  get printingEditions()
  {
    return this.authorForm.get('printingEditions') as FormControl;
  }
}