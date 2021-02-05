import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user/user.model';
import { UserFormService } from 'src/app/services/form-services/user-form.service';
import { UserState } from 'src/app/store/user/user.reducer';
import { UserItemComponent } from '../user-item/user-item.component';
import * as actions from '../../../../store/user/user.actions'
import * as selectors from '../../../../store/user/user.selectors'
import { UserFilter } from 'src/app/models/filter/user-filter';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
  users$ = this.store$.select(selectors.getUsers);

  pageNumber: number;
  pageSize: number;

  searchText: string = "";
  searchTextVisible: boolean;

  status: boolean = null;
  statusSelectVisible: boolean;

  filter: UserFilter = null;
  displayedColumns: string[] = ['name', 'username', 'email', 'status', 'actions'];

  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(
    private store$: Store<UserState>,
    private dialog: MatDialog,
    private formService: UserFormService
  ) { }

  ngOnInit(): void 
  {
    this.store$.pipe(select(selectors.getPageSize)).subscribe(
      data => {
        this.pageSize = data
      }
    );
    this.store$.pipe(select(selectors.getPageNumber)).subscribe(
      data => {
        this.pageNumber = data
      }
    ); 
    this.store$.pipe(select(selectors.getHasNextPage)).subscribe(
      data => {
        this.hasNextPage = data
      }
    );
    this.store$.pipe(select(selectors.getHasPreviousPage)).subscribe(
      data => {
        this.hasPreviousPage = data
      }
    );
    
    this.store$.dispatch(actions.getUsers({ 
      request: {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber, 
        searchText: this.searchText,
        filter: this.filter 
      }
    })); 
  }

  updateUser(user: User) 
  {
    this.formService.populateForm(user);
    this.dialog.open(UserItemComponent);
  }

  deleteUser(user: User) 
  {
    this.store$.dispatch(actions.deleteUser({ id: user.id }));
  }

  changeBlockStatus(user: User) 
  {
    this.store$.dispatch(actions.changeBlockStatus({ id: user.id }));
  }

  nextPage() 
  {
    if (this.hasNextPage)
    {
      this.store$.dispatch(actions.getUsers({ 
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
      this.store$.dispatch(actions.getUsers({ 
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
    this.store$.dispatch(actions.getUsers({ 
      request: {
        pageNumber: Constants.FIRST_PAGE,
        pageSize: this.pageSize,
        searchText: this.searchText,
        filter: this.filter 
      }
    }));
  }

  changeStatus() 
  {
    const updateTime: number = 2000;

    setTimeout(() => {
      this.statusSelectVisible = false;

      if (status != null)
      {
        this.applyFilter();
      }
    }, updateTime);
  }

  applyFilter() 
  {
    this.filter = {
      status: this.status
    };

    this.store$.dispatch(actions.getUsers({
      request: {
        pageNumber: Constants.FIRST_PAGE,
        pageSize: this.pageSize,
        searchText: this.searchText,
        filter: this.filter
      }
    }));
    
    this.searchTextVisible = false;
  }
}
