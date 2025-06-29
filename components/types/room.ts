export interface Room {
  id: string;
  type: string;
  totalRooms: number;
  supportsHourlyBooking: boolean;
  availableRooms: number;
  date: string;
}

export interface AvailableRoomsData {
  location: string;
  address: string;
  rooms: Room[];
}
