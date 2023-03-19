import { RequestURL } from "../common/constants";
import { storageJsonWebToken } from "../helpers/auth";

const http = async ({ url = "", params = {}, isAuth = true }) => {
  const link = new URL(RequestURL + url);
  if (Object.keys(params).length) {
    Object.entries(params).forEach(([key, value]) => {
      link.searchParams.append(key, value as string);
    });
  }
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
  };

  if (isAuth) {
    Object.assign(headers, { Authorization: storageJsonWebToken.get() });
  }

  const response = await fetch(link, {
    method: "GET",
    headers,
  });

  if (response.ok) return response.json();

  throw new Error("Network error");
};

export { http };
