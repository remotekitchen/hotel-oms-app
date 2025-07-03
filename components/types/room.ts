export interface Room {
  id: string;
  type: string;
  totalRooms: number;
  supportsHourlyBooking: boolean;
  availableRooms: number;
  total_rooms: number;
  supports_hourly_booking: boolean;
  availability: any;
  room_type_name: string;
  room_type_id: any;
  date: string;
}

export interface AvailableRoomsData {
  location: string;
  address: string;
  rooms: Room[];
}
