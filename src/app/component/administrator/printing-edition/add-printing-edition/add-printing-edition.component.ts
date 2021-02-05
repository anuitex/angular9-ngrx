import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CurrencyType } from 'src/app/enums/currency-type';
import { PrintingEditionType } from 'src/app/enums/edition-type';
import { addPrintingEdition } from 'src/app/store/printing-edition/printing-edition.actions'
import { getAuthors } from 'src/app/store/author/author.selectors';
import { PrintingEditionFormService } from '../../../../services/form-services/printing-edition-form.service';
import * as authorActions from 'src/app/store/author/author.actions';
import { Author } from 'src/app/models/author/author-model';
import {  FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-add-printing-edition',
  templateUrl: './add-printing-edition.component.html',
  styleUrls: ['./add-printing-edition.component.scss']
})

export class AddPrintingEditionComponent implements OnInit {
  @ViewChild('search') searchTextBox: ElementRef;

  readonly minLength = Constants.MIN_LENGTH;
  
  editionTypes: string[];
  editionType = PrintingEditionType;

  currencyTypes: string[];
  currencyType = CurrencyType;

  authors: Author[];

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];

  filteredOptions: Observable<Author[]>;

  constructor(
    private store$: Store,
    public formService: PrintingEditionFormService,
    private dialogRef: MatDialogRef<AddPrintingEditionComponent>  ) { }

  ngOnInit(): void 
  {
    this.store$.dispatch(authorActions.getAuthors());
    this.store$.pipe(select(getAuthors)).subscribe(
      data => {
        this.authors = data
      }
    );
  
    this.filteredOptions = this.searchTextboxControl.valueChanges
    .pipe(
      startWith<string>(''),
      map(name => this._filter(name))
    );
    
    this.editionTypes = Object.keys(this.editionType).filter(Number);
    this.currencyTypes = Object.keys(this.currencyType).filter(Number);
  }

  onSubmit() 
  {
    if (this.formService.printingEditionForm.valid)
    {
      let printingEdition = this.formService.formValue();
      this.store$.dispatch(addPrintingEdition({ 
        printingEdition: printingEdition
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

  private _filter(name: string): Author[] 
  {
    const filterValue = name.toLowerCase();

    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);

    let filteredList = this.authors.filter(option => 
      option.name.toLowerCase().indexOf(filterValue) === Constants.FIRST_INDEX);

    return filteredList;
  }

  selectionChange(event) 
  {
    if (event.isUserInput && event.source.selected == false) 
    {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, Constants.ONE_ITEM)
    }
  }

  openedChange(e) 
  {
    this.searchTextboxControl.patchValue('');

    if (e == true) 
    {
      this.searchTextBox.nativeElement.focus();
    }
  }

  clearSearch(event) 
  {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  setSelectedValues() 
  {
    if (!(this.selectFormControl.value && this.selectFormControl.value.length >= Constants.MIN_LENGTH))
    {
      return;
    }

    this.selectFormControl.value.forEach((e) => {
      if (this.selectedValues.indexOf(e) == Constants.NOT_FOUND_INDEX) 
      {
        this.selectedValues.push(e);
      }
    });
  }
}


