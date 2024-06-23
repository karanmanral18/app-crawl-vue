
import { injectable } from "inversify";
import { useToast } from "vue-toast-notification";

@injectable()
export class ToastService {
  private toast;
  constructor() {
    this.toast = useToast();
  }

  public success(message: string) {
    this.toast.success(message);
  }

  public error(message: string) {
    this.toast.error(message);
  }
}
