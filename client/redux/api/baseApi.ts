/* eslint-disable */

import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { destroyCookie } from "nookies";
import { removeUser, setUser } from "../slice/authSlice";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASEURL,
  prepareHeaders: (headers: Headers) => {
    let token: string | null = null;

    if (typeof window !== "undefined") {
      token =
        localStorage.getItem("accessToken") ||
        Cookies.get("accessToken") ||
        null;
    }

    headers.set("accept", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // send refreshToken cookie
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/refresh-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // cookie refresh
        }
      );

      const data = await res.json();

      if (data?.success && data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        Cookies.set("accessToken", data.data.accessToken, {
          secure: true,
          sameSite: "strict",
        });

        if (data.data.user) {
          api.dispatch(
            setUser({ user: data.data.user, token: data.data.accessToken })
          );
        }

        result = await baseQuery(args, api, extraOptions);
      } else {
        cleanupAuthState(api);
      }
    } catch (error) {
      cleanupAuthState(api);
    }
  }

  return result;
};

function cleanupAuthState(api: any) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  destroyCookie(null, "accessToken");
  destroyCookie(null, "refreshToken");

  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  api.dispatch(removeUser());

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["Auth", "User", "Jobs"],
  endpoints: () => ({}),
});
