import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserFilter } from "../models/filter/user-filter";
import { FilterPagedRequest } from "../models/shared/filter-paged-request";
import { PagedResponse } from "../models/shared/paged-responce";
import { EditUserModel } from "../models/user/edit-user.model";
import { User } from "../models/user/user.model";

@Injectable({
    providedIn: 'root'
  })
export class UserService {  
    constructor(
        private http: HttpClient
    ){}

    private url = `${environment.bookstoreApiUrl}/users`;

    getUser(id: string)
    {
        return this.http.get<User>(`${this.url}/${id}`);
    }
    
    getUsers(request: FilterPagedRequest<UserFilter>) 
    { 
        let params = new HttpParams()

        if (request == null)
        {
            return this.http.get<PagedResponse<User>>(`${this.url}`, { params  : params });
        }
        if (request.pageNumber != null ) 
        {
            params = params.append('pageNumber', request.pageNumber.toString());
        }
        if (request.pageSize != null ) 
        {
            params = params.append('pageSize', request.pageSize.toString());
        }
        if (request.searchText != null ) 
        {
            params = params.append('searchText', request.searchText);
        }
        if (request.filter == null) 
        {
            return this.http.get<PagedResponse<User>>(`${this.url}`, { params  : params });
        }
        if (request.filter.status != null) 
        {
            params = params.append('filter.blockStatus', request.filter.status.toString());
        }

        return this.http.get<PagedResponse<User>>(`${this.url}`, { params  : params });
    }

    updateUser(user: EditUserModel)
    {
        return this.http.post<User>(`${this.url}/update`, user);
    }

    deleteUser(id: string)
    {
        return this.http.delete<string>(`${this.url}/remove/${id}`);
    }

    changeBlockStatus(id: string): Observable<User>
    {
        return this.http.post<User>(`${this.url}/change-block-status`, null , { params: { id } });
    }
}