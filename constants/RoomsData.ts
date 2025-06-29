import { AvailableRoomsData } from "@/components/types/room";

export const availableRoomsData: AvailableRoomsData = {
  location: "sohag",
  address: "saver dhaka",
  rooms: [
    {
      id: "1",
      type: "y",
      totalRooms: 100,
      supportsHourlyBooking: false,
      availableRooms: 6,
      date: "2025-06-07",
    },
    {
      id: "2",
      type: "Deluxe",
      totalRooms: 50,
      supportsHourlyBooking: true,
      availableRooms: 3,
      date: "2025-06-07",
    },
    {
      id: "3",
      type: "Standard",
      totalRooms: 75,
      supportsHourlyBooking: false,
      availableRooms: 12,
      date: "2025-06-07",
    },
    {
      id: "4",
      type: "Suite",
      totalRooms: 25,
      supportsHourlyBooking: true,
      availableRooms: 2,
      date: "2025-06-07",
    },
  ],
};
