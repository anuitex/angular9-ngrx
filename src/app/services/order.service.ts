import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderFilter } from '../models/filter/order-filter';
import { OrderItem } from '../models/order/order-item-model';
import { Order } from '../models/order/order-model';
import { Payment } from '../models/payment/payment-model';
import { FilterPagedRequest } from '../models/shared/filter-paged-request';
import { PagedResponse } from '../models/shared/paged-responce';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private url = `${environment.bookstoreApiUrl}/orders`;

    constructor(
        private http: HttpClient
    ) { }

    public getOrder(id: string) {
        return this.http.get<Order>(`${this.url}/${id}`)
    }

    public getOrders(request: FilterPagedRequest<OrderFilter>): Observable<PagedResponse<Order>> {
        let params = new HttpParams()

        if(request == null)
        {
            return this.http.get<PagedResponse<Order>>(`${this.url}`, { params: params });
        }
        if(request.pageNumber != null ) 
        {
            params = params.append('pageNumber', request.pageNumber.toString());
        }
        if(request.pageSize != null ) 
        {
            params = params.append('pageSize', request.pageSize.toString());
        }
        if(request.searchText != null ) 
        {
            params = params.append('searchText', request.searchText);
        }
        if(request.filter == null || request.filter == undefined)
        {
            return this.http.get<PagedResponse<Order>>(`${this.url}`, { params: params });
        }
        if(request.filter.status != null)
        {
            params = params.append('filter.status', request.filter.status.toString());
        }

        return this.http.get<PagedResponse<Order>>(`${this.url}`, { params: params });
    }

    public getClientOrders(): Observable<Order[]> 
    {
        return this.http.get<Order[]>(`${this.url}/client/orders`);
    }

    public createOrder(items: Array<OrderItem> ): Observable<Order>
    {
        return this.http.post<Order>(`${this.url}/add`, items);
    }

    public payOrder(order: Order, token: string) 
    {
        let payment: Payment = {
            order: order,
            token: token
        };

        return this.http.post(`${this.url}/charge`, payment);
    }
}
