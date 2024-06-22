export interface PaginatedDataInterface<T> {
   page : number;
   nextPage : number;
   prevPage : number;
   offset : number;
   totalItems : number;
   itemCount : number;
   totalPages : number;
   items : Array<T>   
}