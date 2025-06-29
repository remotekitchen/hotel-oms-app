import React from "react";
import { ScrollView } from "react-native";
import { BookingCard, BookingData } from "./BookingCard";
import { SearchBar } from "./SearchBar";

interface BookingListProps {
  bookings: BookingData[];
  onSearch?: (text: string) => void;
  onMarkNoShow?: (bookingId: string) => void;
  onTakePayment?: (bookingId: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onSearch,
  onMarkNoShow,
  onTakePayment,
}) => {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <SearchBar onSearch={onSearch} />

      {bookings.map((booking, index) => (
        <BookingCard
          key={`${booking.bookingNumber}-${index}`}
          booking={booking}
          onMarkNoShow={() => onMarkNoShow?.(booking.bookingNumber)}
          onTakePayment={() => onTakePayment?.(booking.bookingNumber)}
        />
      ))}
    </ScrollView>
  );
};
