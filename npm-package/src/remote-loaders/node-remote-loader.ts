import * as restler from 'restler';
import * as http from 'http';
import { RemoteLoader } from '../models/remote-loader';

/**
 * This class allow get the script source on node environment
 */
export class NodeRemoteLoader implements RemoteLoader {

  getScript(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      restler.get(url).on('complete', (data?: any, response?: http.ServerResponse) => {
        if (data instanceof Error) {
          reject(data.message);
        } else {
          resolve(data);
        }
      });
    });
  }
}
