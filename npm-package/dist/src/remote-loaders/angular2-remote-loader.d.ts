import { Http } from '@angular/http';
import { RemoteLoader } from '../models/remote-loader';
import 'rxjs/add/operator/toPromise';
export declare class Angular2RemoteLoader implements RemoteLoader {
    private http;
    constructor(http: Http);
    getScript(url: string): Promise<{}>;
}
