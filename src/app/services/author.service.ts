import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthorItem } from "../models/author/author-item";
import { Author } from "../models/author/author-model";
import { PagedRequest } from "../models/shared/paged-request";
import { PagedResponse } from "../models/shared/paged-responce";


@Injectable({
    providedIn: 'root'
  })
export class AuthorService {  

    private url = `${environment.bookstoreApiUrl}/authors`;

    constructor(
        private http: HttpClient
    ){}

    getAuthor(id: string) 
    {
        return this.http.get<Author>(`${this.url}/${id}`);
    }
    
    getPage(request: PagedRequest) 
    { 
        let params = new HttpParams();

        if (request == null)
        {
            return this.http.get<PagedResponse<Author>>(`${this.url}`, { params :params });
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
        
        return this.http.get<PagedResponse<Author>>(`${this.url}`, { params :params });
    }    

    getAuthors() 
    {
        return this.http.get<Author[]>(`${this.url}/all`);
    }

    addAuthor(author: AuthorItem) : Observable<Author> 
    {
        return this.http.post<Author>(`${this.url}/add`, author);
    }

    deleteAuthor(id: string) 
    {
        return this.http.delete<string>(`${this.url}/remove/${id}`);
    }

    updateAuthor(author: AuthorItem) 
    {
        return this.http.post<Author>(`${this.url}/update`, author);
    }
}