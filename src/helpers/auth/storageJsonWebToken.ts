class StorageJsonWebToken {
  storageName: string;

  constructor(storageName: string) {
    this.storageName = storageName;
  }

  set(token: string) {
    localStorage.setItem(this.storageName, "Bearer " + token);
  }

  get() {
    return localStorage.getItem(this.storageName);
  }

  clear() {
    localStorage.setItem(this.storageName, "");
  }
}

const storageJsonWebToken = new StorageJsonWebToken("accessToken");

export { storageJsonWebToken };
