import { Container } from "inversify";
import axios, { Axios } from "axios";
import { ToastService } from "../services/toastNotification.service";
import { ApiCallService } from "../services/api-call.service";
import { LoaderService } from "../services/loader.service";

export const ContainerSymbol = Symbol("ContainerSymbol");
export const container = new Container({
  autoBindInjectable: true
});

container.bind(ApiCallService).to(ApiCallService).inSingletonScope();
container.bind(Axios).toConstantValue(axios.create());
container.bind(LoaderService).to(LoaderService).inSingletonScope();
container.bind(ToastService).to(ToastService).inSingletonScope();