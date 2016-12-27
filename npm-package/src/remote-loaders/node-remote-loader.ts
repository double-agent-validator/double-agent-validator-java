import { RemoteLoader } from '../models/remote-loader';

declare var require: any;
/**
 *
 * This class allow get the script source on node environment
 */
export class NodeRemoteLoader implements RemoteLoader {

  private _restler: any;
  constructor() {
    require.ensure([], function(requireRuntime) {
      this._restler = requireRuntime('restler');
    });
  }

  get restler(): any {
    return this._restler;
  }

  getScript(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.restler.get(url).on('complete', (data?: any, response?: any) => {
        if (data instanceof Error) {
          reject(data.message);
        } else {
          resolve(data);
        }
      });
    });
  }
}
