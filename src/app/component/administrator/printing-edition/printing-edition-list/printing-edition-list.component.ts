import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';
import { PrintingEditionType } from 'src/app/enums/edition-type';
import { PrintingEdition } from 'src/app/models/printing-edition/printing-edition.model';
import { PrintingEditionFormService } from 'src/app/services/form-services/printing-edition-form.service';
import { PrintingEditionState } from 'src/app/store/printing-edition/printing-edition.reducer';
import * as actions from 'src/app/store/printing-edition/printing-edition.actions';
import { AddPrintingEditionComponent } from '../add-printing-edition/add-printing-edition.component';
import { UpdatePrintingEditionComponent } from '../update-printing-edition/update-printing-edition.component';
import { Author } from 'src/app/models/author/author-model';
import { PrintingEditionFilter } from 'src/app/models/filter/printing-edition-filter';
import { getPageSize, getPageNumber, getHasNextPage, getHasPreviousPage } from 'src/app/store/printing-edition/printing-edition.selectors';
import { getPrintingEditions } from 'src/app/store/printing-edition/printing-edition.selectors';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-printing-edition-list',
  templateUrl: './printing-edition-list.component.html',
  styleUrls: ['./printing-edition-list.component.scss']
})

export class PrintingEditionListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort

  readonly roundTo = Constants.ROUND_TO;

  dialogConfig: MatDialogConfig = {
    autoFocus: true,
    width: "70%"
  }

  displayedColunms: string[] = ['id','title','description','category','authors','price','actions']

  pageSize: number;
  pageNumber: number;

  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;

  searchTextVisible: boolean = false;
  searchText: string = null;

  categoryFilter: boolean = false;
  types: Array<PrintingEditionType> = new Array<PrintingEditionType>();

  filter: PrintingEditionFilter;
  
  authors: Author[];

  categories = this.formBuilder.group({
    book: false,
    newspaper: false,
    journal: false
  });
  
  printingEditions: MatTableDataSource<any>;

  constructor(
    private store: Store<PrintingEditionState>,
    private dialog: MatDialog,
    private peFormService: PrintingEditionFormService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void 
  {
    this.categories.valueChanges.pipe(
      debounceTime(2000)
      ).subscribe(
      () => this.applyFilter()
    )
    this.store.pipe(select(getPageSize)).subscribe(
      data => {
        this.pageSize = data
      }
    )
    this.store.pipe(select(getPageNumber)).subscribe(
      data => {
        this.pageNumber = data
      }
    ) 
    this.store.pipe(select(getHasNextPage)).subscribe(
      data => {
        this.hasNextPage = data
      }
    )
    this.store.pipe(select(getHasPreviousPage)).subscribe(
      data => {
        this.hasPreviousPage = data
      }
    )  

    this.store.dispatch(actions.getPage({ 
      request: {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber, 
        searchText: this.searchText,
        filter: null 
      }
    }))   
    this.store.pipe(select(getPrintingEditions)).subscribe(
      data => {
        this.printingEditions = new MatTableDataSource(data)
        this.printingEditions.sort = this.sort
      }
    )
  }

  addPrintingEdition() 
  {
    this.peFormService.initalizeForm();
    this.dialog.open(AddPrintingEditionComponent, this.dialogConfig);
  }

  editPrintingEdition(printingEdition: PrintingEdition) 
  {
    this.peFormService.populateForm(printingEdition);
    this.dialog.open(UpdatePrintingEditionComponent, this.dialogConfig);
  }

  deletePrintingEdition(printingEdition: PrintingEdition) 
  {
    this.store.dispatch(actions.deletePrintingEdition({id: printingEdition.id}));
  }

  nextPage() 
  {
    if (this.hasNextPage)
    {
      this.store.dispatch(actions.getPage({ 
          request: {
          pageNumber: this.pageNumber + Constants.INCREMENT,
          pageSize: this.pageSize,
          searchText: this.searchText,
          filter: this.filter
        }
      }));
    }
  }

  previousPage() 
  {
    if (this.hasPreviousPage)
    {
      this.store.dispatch(actions.getPage({ 
          request: {
          pageNumber: this.pageNumber - Constants.DECREMENT,
          pageSize: this.pageSize,
          searchText: this.searchText,
          filter: this.filter 
        }
      }));
    }
  }

  changeTableSize() 
  {
    this.store.dispatch(actions.getPage({ 
        request: {
        pageNumber: Constants.FIRST_PAGE,
        pageSize: this.pageSize,
        searchText: this.searchText,
        filter: this.filter 
      }
    }));
  }

  changeCategory() 
  {
    const updateTime: number = 1000;

    this.bookInFilter();
    this.journalInFilter();
    this.newspaperInFilter();

    setTimeout(() => {
      this.categoryFilter = false;

      if (this.types === undefined)
      {
        this.types = [];
      }
    }, updateTime);
  }

  applyFilter() 
  {
    this.filter = {
      types: this.types
    }

    this.store.dispatch(actions.getPage({ 
      request: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        searchText: this.searchText,
        filter: this.filter 
      }
    }));

    this.searchTextVisible = false;
    this.searchText = null;
  }

  newspaperInFilter() 
  {
    if (this.categories.get(PrintingEditionType[PrintingEditionType.Newspaper].toLowerCase()).value 
      && !this.types.includes(PrintingEditionType.Newspaper)) 
    {
        this.types.push(PrintingEditionType.Newspaper);
    }
    if (!this.categories.get(PrintingEditionType[PrintingEditionType.Newspaper].toLowerCase()).value 
    && this.types.includes(PrintingEditionType.Newspaper)) 
    {
      this.types = this.types.filter(i => i != PrintingEditionType.Newspaper);
    }
  }

  bookInFilter() 
  {
    if (this.categories.get(PrintingEditionType[PrintingEditionType.Book].toLowerCase()).value 
      && !this.types.includes(PrintingEditionType.Book)) 
    {
        this.types.push(PrintingEditionType.Book);
    }
    if (!this.categories.get(PrintingEditionType[PrintingEditionType.Book].toLowerCase()).value 
      && this.types.includes(PrintingEditionType.Book))  
    {
      this.types = this.types.filter(i => i != PrintingEditionType.Book);
    }
  }

  journalInFilter() 
  {
    if (this.categories.get(PrintingEditionType[PrintingEditionType.Journal].toLowerCase()).value 
      && !this.types.includes(PrintingEditionType.Journal)) 
    {
        this.types.push(PrintingEditionType.Journal);
    }
    if (!this.categories.get(PrintingEditionType[PrintingEditionType.Journal].toLowerCase()).value 
      && this.types.includes(PrintingEditionType.Journal)) 
    {
      this.types = this.types.filter(i => i != PrintingEditionType.Journal);
    }
  }
}
