import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getCsrfToken = () => {
  // set 'XSRF-TOKEN'
  return Cookies.get("admin_XSRF-TOKEN");
};

// Function to get the JWT token from wherever it's stored (e.g., localStorage)
const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
};

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/",
  baseUrl: "https://food-delevery-dep-1-api.vercel.app/",
  credentials: "include", // Necessary for cookies to be included
  prepareHeaders: (headers) => {
    // const csrfToken = getCsrfToken();
    // if (csrfToken) {
    //   // Set the CSRF token in the request headers
    //   headers.set("x-csrf-token", csrfToken);
    // }
    const token = getJwtToken();
    if (token) {
      // Set the Authorization header with the JWT
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
