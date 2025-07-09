import { useBookingsQuery } from "@/redux/feature/hotel/hotelApi";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BookingCard } from "./BookingCard";
import { IconSymbol } from "./IconSymbol";
import { SearchBar } from "./SearchBar";

interface BookingListProps {
  onSearch?: (text: string) => void;
  onMarkNoShow?: (bookingId: string) => void;
  onTakePayment?: (bookingId: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  onMarkNoShow,
  onTakePayment,
}) => {
  const [searchText, setSearchText] = useState("");

  // Handle search input change
  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  // Fetch bookings from the API
  const { data: bookings } = useBookingsQuery({});

  // Filter bookings:
  // - Apply search filter by hotel name
  // - Exclude bookings with status "no_show"
  const filteredBookings = bookings?.results?.filter((booking: any) => {
    return (
      booking?.hotel_name?.toLowerCase().includes(searchText.toLowerCase()) &&
      booking?.status !== "no_show" &&
      booking?.payment_status !== "paid"
    );
  });

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <SearchBar onSearch={handleSearch} />

      {filteredBookings && filteredBookings.length > 0 ? (
        filteredBookings.map((booking: any) => (
          <BookingCard
            key={booking?.id}
            booking={booking}
            onMarkNoShow={() => onMarkNoShow?.(booking.bookingNumber)}
            onTakePayment={() => onTakePayment?.(booking.bookingNumber)}
          />
        ))
      ) : (
        <View className="flex-1 justify-center items-center mt-20">
          <IconSymbol
            name="exclamationmark.triangle"
            size={40}
            color="#11181C"
          />
          <Text className="text-lg text-gray-500 mt-4">No bookings found.</Text>
        </View>
      )}
    </ScrollView>
  );
};
