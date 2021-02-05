import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthorInPrintingEdition } from 'src/app/models/author/author-in-edition';
import { AuthorFormService } from 'src/app/services/form-services/author-form.service';
import { updateAuthor } from 'src/app/store/author/author.actions';

@Component({
  selector: 'update-add-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent implements OnInit {

  printingEditions: AuthorInPrintingEdition[]

  constructor(
    private store: Store,
    public formService: AuthorFormService,
    private dialogRef: MatDialogRef<UpdateAuthorComponent>
    ) { }

  ngOnInit(): void 
  {
  }

  onSubmit()
  {
    if (this.formService.authorForm.valid)
    {
      this.store.dispatch(updateAuthor({ 
          author: this.formService.authorFromForm 
        }));

      this.onClose();
    }
  }

  onClose()
  {
    this.formService.authorForm.reset();
    this.formService.initalizeAuthorForm();
    this.dialogRef.close();
  }
}
