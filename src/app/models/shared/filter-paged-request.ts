export class FilterPagedRequest<T> 
{
    pageNumber: number
    pageSize: number
    searchText: string
    filter: T
}