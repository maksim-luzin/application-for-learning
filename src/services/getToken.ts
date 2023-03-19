import { storageJsonWebToken } from "../helpers/auth";
import { http } from "./http";
import { AuthURL } from "../common/constants";

const getToken = async () => {
  if (storageJsonWebToken.get()) return storageJsonWebToken.get();
  const { token } = await http({ url: AuthURL.url, params: AuthURL.params });
  storageJsonWebToken.set(token);
  return token;
};

export { getToken };
