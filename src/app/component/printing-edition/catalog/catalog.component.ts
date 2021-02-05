import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CurrencyType } from 'src/app/enums/currency-type';
import * as selectors from '../../../store/printing-edition/printing-edition.selectors'
import { PrintingEdition } from 'src/app/models/printing-edition/printing-edition.model';
import { PrintingEditionState } from '../../../store/printing-edition/printing-edition.reducer';
import { getPrintingEditions } from '../../../store/printing-edition/printing-edition.selectors';
import { PrintingEditionFilter } from 'src/app/models/filter/printing-edition-filter';
import { PrintingEditionType } from 'src/app/enums/edition-type';
import { getPage } from '../../../store/printing-edition/printing-edition.actions';
import { Options } from '@angular-slider/ngx-slider';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-printing-edition-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  readonly roundTo = Constants.ROUND_TO;
  readonly searchText = "searchText";
  readonly currency = "currency";
  readonly sort = "sort";

  pageSize: number;
  pageNumber: number;

  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;

  keysCurrency: string[];
  currencyType = CurrencyType;

  printingEditions: PrintingEdition[];

  options: Options = {
    floor: Constants.MIN_PRICE,
    ceil: Constants.MAX_PRICE
  };

  categories = this.formBuilder.group({
    book: false,
    journal: false,
    newspaper: false
  });

  min: number = Constants.MIN_PRICE;
  max: number = Constants.MAX_PRICE;

  searchBlock = this.formBuilder.group({
    searchText: "",
    currency: null,
    sort: null,
  });


  filter: PrintingEditionFilter;
  
  constructor(
    private store$: Store<PrintingEditionState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    this.keysCurrency = Object.keys(this.currencyType).filter(Number);

    this.store$.pipe(select(selectors.getPageSize)).subscribe(
      data => {
        this.pageSize = data
      }
    )

    this.store$.pipe(select(selectors.getPageNumber)).subscribe(
      data => {
        this.pageNumber = data
      }
    )
    
    this.store$.pipe(select(selectors.getHasNextPage)).subscribe(
      data => {
        this.hasNextPage = data
      }
    )
    
    this.store$.pipe(select(selectors.getHasPreviousPage)).subscribe(
      data => {
        this.hasPreviousPage = data
      }
    )
     
    this.store$.dispatch(getPage({ request: {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber, 
      searchText: this.searchBlock.get(this.searchText).value,
      filter: null }}
    )) 

    this.store$.pipe(select(getPrintingEditions)).subscribe(
      data => {
        this.printingEditions = data
      }
    )
  }

  get(id: string)
  {
    this.router.navigate(['/printing-editions/get',id])
  }

  nextPage()
  {
    if (this.hasNextPage)
    {
      this.store$.dispatch(getPage({ request: {
        pageNumber: this.pageNumber + Constants.INCREMENT,
        pageSize: this.pageSize,
        searchText: this.searchBlock.get(this.searchText).value,
        filter: this.filter
      }}))
    }
  }

  previousPage()
  {
    if (this.hasPreviousPage)
    {
      this.store$.dispatch(getPage({ request: {
        pageNumber: this.pageNumber - Constants.DECREMENT,
        pageSize: this.pageSize,
        searchText: this.searchBlock.get(this.searchText).value,
        filter: this.filter }}
      ))
    }
  }

  applyFilter()
  {
    let types: Array<PrintingEditionType> = [];

    if (this.categories.get(PrintingEditionType[PrintingEditionType.Book].toLowerCase()).value && 
      !types.includes(PrintingEditionType.Book))
    {
        types.push(PrintingEditionType.Book);
    }
    if (this.categories.get(PrintingEditionType[PrintingEditionType.Journal].toLowerCase()).value && 
      !types.includes(PrintingEditionType.Journal))
    {
        types.push(PrintingEditionType.Journal);
    }
    if (this.categories.get(PrintingEditionType[PrintingEditionType.Newspaper].toLowerCase()).value && 
      !types.includes(PrintingEditionType.Newspaper))
    {
        types.push(PrintingEditionType.Newspaper);
    }

    this.filter = {
      types: types,
      min: this.min,
      max: this.max,
      currency: this.searchBlock.get(this.currency).value,
      sort: this.searchBlock.get(this.sort).value,
    };

    this.store$.dispatch(getPage({ 
      request : {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        filter: this.filter,
        searchText: this.searchBlock.get(this.searchText).value,
      }
    }));
  }
}