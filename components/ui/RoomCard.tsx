import { MotiView } from "moti";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BookingModal } from "../modal/BookingModal";
import { Room } from "../types/room";

interface RoomCardProps {
  room: Room;
  checkOutDate: string;
  checkInDate: string;
}

export const RoomCard = ({
  room,
  checkOutDate,
  checkInDate,
}: RoomCardProps) => {
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [roomTypeId, setRoomTypeId] = useState();

  const handleBookNow = (roomTypeId: any) => {
    console.log("Book Now pressed for room:", roomTypeId);
    setRoomTypeId(roomTypeId);
    setBookingModalVisible(true);
  };

  return (
    <>
      <MotiView
        from={{
          opacity: 0,
          translateY: 30,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 120,
        }}
        className="mb-2 rounded-xl bg-white p-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        {/* Room Type */}
        <Text className="mb-3 text-xl font-bold text-black">
          {room?.room_type_name}
        </Text>

        {/* Room Details */}
        <View className="mb-3">
          <Text className="mb-1 text-sm text-gray-700">
            Total Rooms: {room?.total_rooms}
          </Text>
          <Text className="text-sm text-gray-700">
            Supports Hourly Booking:{" "}
            {room.supports_hourly_booking ? "Yes" : "No"}
          </Text>
        </View>

        {/* Availability */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-black">
            Availability
          </Text>
          <View className="flex-row items-center space-x-2">
            <Text className="text-sm text-gray-700">{room.date}</Text>
            <Text className="text-sm font-medium text-emerald-600">
              {room?.availability[0]?.available_rooms} room(s) available
            </Text>
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          onPress={() => handleBookNow(room?.room_type_id)}
          disabled={room?.availability[0]?.is_fully_booked}
          className={`self-start rounded-md px-5 py-2 ${
            room?.availability[0]?.is_fully_booked
              ? "bg-red-500 opacity-70"
              : "bg-yellow-400"
          }`}
        >
          <Text className="text-base font-bold text-black">
            {room?.availability[0]?.is_fully_booked
              ? "Fully Booked"
              : "Book Now"}
          </Text>
        </TouchableOpacity>
      </MotiView>

      <BookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        roomType={room.type}
        roomId={room.id}
        checkOutDate={checkOutDate}
        checkInDate={checkInDate}
        roomTypeId={roomTypeId}
      />
    </>
  );
};
