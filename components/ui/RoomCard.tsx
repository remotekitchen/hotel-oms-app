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

  const handleBookNow = () => {
    console.log("Book Now pressed for room:", room.id);
    setBookingModalVisible(true);
  };

  return (
    <>
      <MotiView
        from={{
          opacity: 0,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: "timing",
          duration: 400,
        }}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Room Type */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
            marginBottom: 12,
          }}
        >
          {room.type}
        </Text>

        {/* Room Details */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: "#333", marginBottom: 4 }}>
            Total Rooms: {room.totalRooms}
          </Text>
          <Text style={{ fontSize: 14, color: "#333" }}>
            Supports Hourly Booking: {room.supportsHourlyBooking ? "Yes" : "No"}
          </Text>
        </View>

        {/* Availability */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#000",
              marginBottom: 8,
            }}
          >
            Availability
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#333" }}>{room.date}</Text>
            <Text style={{ fontSize: 14, color: "#059669", fontWeight: "500" }}>
              {room.availableRooms} room(s) available
            </Text>
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          onPress={handleBookNow}
          style={{
            backgroundColor: "#FACC15", // yellow-400
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000" }}>
            Book Now
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
      />
    </>
  );
};
