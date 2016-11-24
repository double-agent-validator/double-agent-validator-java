export interface RemoteLoader {
    getScript(url: string): Promise<string>;
}
