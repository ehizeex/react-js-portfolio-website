import { Subject } from 'rxjs';

class LoaderService {
    /* Loader Service Instance */
    static loaderService = new LoaderService();
    loaderChangeEmitter = new Subject();

    start = () => {
      this.loaderChangeEmitter.next("start");
    }

    complete = () => {
      this.loaderChangeEmitter.next("complete");
    }
}

export default LoaderService.loaderService;
