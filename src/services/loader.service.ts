import { injectable } from "inversify";
import { useLoading } from "vue-loading-overlay";
import type {
  PluginApi,
  ActiveLoader,
  Props,
  Slots,
} from "vue-loading-overlay";

export interface LoaderState {
  isVisible: boolean;
  hide(): Promise<boolean>;
  wrappedInstance: ActiveLoader;
}

@injectable()
export class LoaderService {
  public loader!: PluginApi;

  /**
   * Initializes the loading instance
   * @param handler
   */
  public init(): void {
    this.loader = useLoading({
      // options
    });
  }
  constructor() {
    this.init();
  }

  protected createLoaderState(): LoaderState {
    return { isVisible: false } as LoaderState;
  }

  /**
   * Shows loader
   * @param props
   * @param slots
   */
  public async show(props?: Props, slots?: Slots): Promise<LoaderState> {
    const state = this.createLoaderState();
    const activeLoader = this.loader.show(props, slots);
    state.hide = async () => {
      activeLoader.hide();
      return true;
    };
    state.wrappedInstance = activeLoader;
    return state;
  }

  /**
   * Hides loader
   */
  public hide(state: LoaderState): Promise<boolean> {
    return state.hide();
  }
}
