import { RemoteLoader } from '../models/remote-loader';
/**
 *
 * This class allow get the script source on node environment
 */
export declare class NodeRemoteLoader implements RemoteLoader {
    private _restler;
    constructor();
    readonly restler: any;
    getScript(url: string): Promise<string>;
}
