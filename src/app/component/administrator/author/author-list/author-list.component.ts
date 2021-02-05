import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Author } from 'src/app/models/author/author-model';
import { AuthorFormService } from 'src/app/services/form-services/author-form.service';
import { AuthorState } from 'src/app/store/author/author.reducer';
import { getAuthors, getHasNextPage, getHasPreviousPage, getPageNumber, getPageSize } from 'src/app/store/author/author.selectors';
import * as authorActions from '../../../../store/author/author.actions'
import { AddAuthorComponent } from '../add-author/add-author.component';
import { UpdateAuthorComponent } from '../update-author/update-author.component';
import { getPage } from '../../../../store/author/author.actions';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-author',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'products', 'actions'];

  authors: Author[];

  pageNumber: number;
  pageSize: number;

  searchTextVisible: boolean;
  searchText: string = null;

  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(
    private store: Store<AuthorState>,
    private dialog: MatDialog,
    private formService: AuthorFormService
  ) { }

  ngOnInit(): void 
  {
    this.store.pipe(select(getPageSize)).subscribe(
      data => {
        this.pageSize = data
      }
    );
    this.store.pipe(select(getPageNumber)).subscribe(
      data => {
        this.pageNumber = data
      }
    );
    this.store.pipe(select(getHasNextPage)).subscribe(
      data => {
        this.hasNextPage = data
      }
    );
    this.store.pipe(select(getHasPreviousPage)).subscribe(
      data => {
        this.hasPreviousPage = data
      }
    );

    this.store.dispatch(authorActions.getPage({ request: {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchText: this.searchText
    }}));

    this.store.pipe(select(getAuthors)).subscribe(
      data => {
        this.authors = data
      }
    );
  }

  addAuthor() 
  {
    this.formService.initalizeAuthorForm();
    this.dialog.open(AddAuthorComponent);
  }

  updateAuthor(author: Author) 
  {
    this.formService.populateAuthorForm(author);
    this.dialog.open(UpdateAuthorComponent);
  }

  deleteAuthor(author: Author) 
  {
    this.store.dispatch(authorActions.deleteAuthor({ id: author.id }));
  }

  nextPage()
  {
    if (this.hasNextPage) 
    {
      this.store.dispatch(authorActions.getPage({ 
        request: {
          pageNumber: this.pageNumber + Constants.INCREMENT,
          pageSize: this.pageSize,
          searchText: this.searchText
        }
      }));
    }
  }

  previousPage()
  {
    if (this.hasPreviousPage)
    {
      this.store.dispatch(authorActions.getPage({ 
        request: {
          pageNumber: this.pageNumber - Constants.DECREMENT,
          pageSize: this.pageSize,
          searchText: this.searchText
        }
      }));
    }
  }
  
  changeTableSize()
  {
    this.store.dispatch(authorActions.getPage({ 
      request: {
        pageNumber: Constants.FIRST_PAGE,
        pageSize: this.pageSize,
        searchText: this.searchText,
      }
    }));
  }

  applyFilter()
  {
    this.store.dispatch(getPage({
      request : {
        pageNumber: Constants.FIRST_PAGE,
        pageSize: this.pageSize,
        searchText: this.searchText
      }
    }));

    this.searchTextVisible = false;
    this.searchText = null;
  }
}
