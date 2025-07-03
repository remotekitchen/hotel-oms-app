import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.chatchefs.com/",
    prepareHeaders: async (headers) => {
      headers.set("Content-Type", "application/json");

      try {
        const authData = await AsyncStorage.getItem("auth");
        const token: string | null = authData
          ? JSON.parse(authData)?.token
          : null;

        if (token) {
          headers.set("Authorization", `token ${token}`);
        }
      } catch (err) {
        console.error("Failed to load auth token:", err);
      }

      return headers;
    },
  }),
  tagTypes: ["HOTEL", "ACCOUNT"],
  endpoints: () => ({}),
});
