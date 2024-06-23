import { ApiCallService } from "./api-call.service";
import { inject, injectable } from "inversify";
import type { AxiosInstance } from "axios";
import { Axios } from "axios";
import { ClientInterface } from "../interfaces/client.interface";

@injectable()
export class ClientService {
  constructor(
    @inject(ApiCallService) public apiCallService: ApiCallService,
    @inject(Axios) public axios: AxiosInstance,
  ) {

  }

  async getClientList(options: {
    pageNumber: number;
    perPage: number;
    id: number | null;
    email: string | null;
    cin: string | null,
    name: string | null;
  }): Promise<any> {
    const {
      pageNumber,
      perPage,
      id = null,
      email,
      cin,
      name,
    } = options
    const result = await this.axios
      .get(this.apiCallService.apiUrl(`clients`), {
        params: {
          page: pageNumber,
          perPage: perPage,
          id: id,
          email: email,
          cin: cin,
          name: name
        }
      })
    return result.data
  }

  getClient(id: number) : Promise<ClientInterface | any>{
    return this.axios
      .get(this.apiCallService.apiUrl(`clients/${id}`))
      .then((result) => {
        return result;
      });
  }

  deleteClient(id: number) {
    return this.axios
      .delete(this.apiCallService.apiUrl(`clients/${id}`))
      .then((result) => {
        return result;
      });
  }

  async createClient(clientData : any) {
    return this.axios
      .post(this.apiCallService.apiUrl(`clients`),clientData)
      .then((result) => {
        return result;
      });
  }

  async updateClient(clientId : number,clientData : any) {
    return this.axios
      .post(this.apiCallService.apiUrl(`clients/${clientId}`),clientData)
      .then((result) => {
        return result;
      });
  }
}   