import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RemoteLoader } from '../models/remote-loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Angular2RemoteLoader implements RemoteLoader {
  constructor(private http: Http) { }

  getScript(url: string) {
    return new Promise((resolve, reject) => {
      let observable: Observable<Response> = this.http.get(url);
      observable.subscribe((response: Response) => {
        resolve(response.text());
      },
      (error) => { /* error handling block*/
          reject(error);
      });
    });
  }
}
