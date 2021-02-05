import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CurrencyType } from 'src/app/enums/currency-type';
import { PrintingEditionType } from 'src/app/enums/edition-type';
import { updatePrintingEdition } from 'src/app/store/printing-edition/printing-edition.actions'
import { getAuthors } from 'src/app/store/author/author.selectors';
import { PrintingEditionFormService } from '../../../../services/form-services/printing-edition-form.service';
import * as authorActions from 'src/app/store/author/author.actions';
import { Author } from 'src/app/models/author/author-model';

@Component({
  selector: 'app-update-printing-edition',
  templateUrl: './update-printing-edition.component.html',
  styleUrls: ['./update-printing-edition.component.scss']
})

export class UpdatePrintingEditionComponent implements OnInit {

  keysEdition: string[];
  edition = PrintingEditionType;

  keysCurrency: string[];
  currency = CurrencyType;

  authors: Author[];

  constructor(
    private store: Store,
    public formService: PrintingEditionFormService,
    private dialogRef: MatDialogRef<UpdatePrintingEditionComponent>,
  ){}

  ngOnInit(): void {
    this.store.dispatch(authorActions.getAuthors());
    this.store.pipe(select(getAuthors)).subscribe(
      data => {
        this.authors = data
      }
    );
    
    this.keysEdition = Object.keys(this.edition).filter(Number);
    this.keysCurrency = Object.keys(this.currency).filter(Number);
  }

  onSubmit()
  {
    if (this.formService.printingEditionForm.valid)
    {
      this.store.dispatch(updatePrintingEdition({ 
        printingEdition: this.formService.formValue() 
      }));

      this.onClose();
    }
  }

  onClose()
  {
    this.formService.printingEditionForm.reset();
    this.formService.initalizeForm();
    this.dialogRef.close();
  }
}

