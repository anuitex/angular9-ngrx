export class PagedResponse<T>
{
    data: T[]
    pageNumber: number
    pageSize: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    request: any
  }
  