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
    availableRooms: builder.query({
      query: ({ hotelId, start_date, end_date }) => ({
        url: `api/hotel/v1/oms/room-types/${hotelId}/room-availability/?start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      providesTags: ["ACCOUNT"],
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: `api/hotel/v1/bookings/create/`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["ACCOUNT"],
    }),
  }),
});

export const {
  useBookingsQuery,
  useHotelsQuery,
  useAvailableRoomsQuery,
  useCreateBookingMutation,
} = hotelApi;
