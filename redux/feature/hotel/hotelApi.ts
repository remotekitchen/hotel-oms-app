import { apiSlice } from "../api/apiSlice";

export const hotelApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    bookings: builder.query({
      query: () => ({
        url: `api/hotel/v1/oms/bookings/`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    hotels: builder.query({
      query: () => ({
        url: `api/hotel/v1/manage-hotels/`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
  }),
});

export const { useBookingsQuery, useHotelsQuery } = hotelApi;
