import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment"
import { PrintingEditionFilter } from "../models/filter/printing-edition-filter";
import { PrintingEditionItem } from "../models/printing-edition/printing-edition-item";
import { PrintingEdition } from "../models/printing-edition/printing-edition.model"
import { FilterPagedRequest } from "../models/shared/filter-paged-request";
import { PagedResponse } from "../models/shared/paged-responce";

@Injectable({
    providedIn: 'root'
  })
  export class PrintingEditionService {
  
    private url = `${environment.bookstoreApiUrl}/printing-editions`;
  
    constructor(
      private http: HttpClient
    ) { }
  
    getPrintingEdition(id: string)
    {
      return this.http.get<PrintingEdition>(`${this.url}/${id}`);
    }

    getPrintingEditions()
    {
      return this.http.get<PrintingEdition[]>(`${this.url}/all`);
    }

    getPage(request: FilterPagedRequest<PrintingEditionFilter>) 
    {    
      let params = new HttpParams();

      if (request == null)
      {
        return this.http.get<PagedResponse<PrintingEdition>>(`${this.url}`, { params: params });
      }
      if (request.pageNumber != null) 
      {
        params = params.append('pageNumber', request.pageNumber.toString());
      }
      if (request.pageSize != null) 
      {
        params = params.append('pageSize', request.pageSize.toString());
      }
      if (request.searchText != null && request.searchText != "") 
      {
        params = params.append('searchText', request.searchText);
      }
      if ( request.filter == null) 
      {
        return this.http.get<PagedResponse<PrintingEdition>>(`${this.url}`, { params: params });
      }
      if (request.filter.currency != null) 
      {
        params = params.append('filter.currency', request.filter.currency.toString());
      }
      if (request.filter.sort != null) 
      {
        params = params.append('filter.sort', request.filter.sort.toString());
      }
      if (request.filter.types != null) 
      {
        for (let type of request.filter.types)
        {
          params = params.append('filter.types', type.toString());
        }
      }
      if (request.filter.max != null) 
      {
        params = params.append('filter.max', request.filter.max.toString());
      }
      if (request.filter.min != null) 
      {
        params = params.append('filter.min', request.filter.min.toString());
      }

      return this.http.get<PagedResponse<PrintingEdition>>(`${this.url}`, { params: params });
    }

    addPrintingEdition(printingEdition: PrintingEditionItem): Observable<PrintingEdition> 
    {
      return this.http.post<PrintingEdition>(`${this.url}/add`, printingEdition);
    }
  
    updatePrintingEdition(printingEdition: PrintingEditionItem): Observable<PrintingEdition>
    {
      return this.http.post<PrintingEdition>(`${this.url}/update`, printingEdition);
    }
  
    deletePrintingEdition(id: string)
    {
      return this.http.delete<string>(`${this.url}/remove/${id}`);
    }
}