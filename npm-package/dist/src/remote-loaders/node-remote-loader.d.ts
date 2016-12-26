import { RemoteLoader } from '../models/remote-loader';
/**
 * This class allow get the script source on node environment
 */
export declare class NodeRemoteLoader implements RemoteLoader {
    getScript(url: string): Promise<string>;
}
