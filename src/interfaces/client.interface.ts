import { PaginatedDataInterface } from "./paginated-data.interface";

export interface ClientInterface {
    id : number;
    name : string;
    cin : string;
    pin : string;
    email : string;
    created_at : string;
    updated_at : string;
}

export interface ClientListingInterface {
    clients : PaginatedDataInterface<ClientInterface>
}