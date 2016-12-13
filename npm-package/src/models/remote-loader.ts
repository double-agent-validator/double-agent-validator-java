export class RemoteLoader {
  getScript(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      reject(`You should provide a custom remote loader either using NodeRemoteLoader,
          the Angular2 Remote Loader or another extension that yourself wants to provide.`);
    });
  }
}
