import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthorFormService } from 'src/app/services/form-services/author-form.service';
import { addAuthor } from 'src/app/store/author/author.actions';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {

  constructor(
    private store: Store,
    public formService: AuthorFormService,
    private dialogRef: MatDialogRef<AddAuthorComponent>
  ) { }

  ngOnInit(): void { }

  onSubmit()
  {
    if (this.formService.authorForm.valid)
    {
      this.store.dispatch(addAuthor({ 
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
