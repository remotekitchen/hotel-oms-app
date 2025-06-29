import { availableRoomsData } from "@/constants/RoomsData";
import {
  useBookingsQuery,
  useHotelsQuery,
} from "@/redux/feature/hotel/hotelApi";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { AvailableRoomsModal } from "./modal/AvailableRoomsModal";
import { DatePickerModal } from "./modal/DatePickerModal";
import { SelectDatesModal } from "./modal/SelectDatesModal";
import { ThemedView } from "./ThemedView";
import { BookingData } from "./ui/BookingCard";
import { BookingList } from "./ui/BookingList";
import { Header } from "./ui/Header";
import { Sidebar } from "./ui/Sidebar";

// Sample data matching the image
const sampleBookings: BookingData[] = [
  {
    hotelName: "sohag",
    customerName: "71y2 gwgw",
    roomType: "y",
    bookingNumber: "H1325240004",
    checkIn: "2025-06-29",
    checkOut: "2025-06-30",
    guests: { adults: 2, children: 2 },
    rooms: 2,
    totalPrice: "12.00",
    status: "confirmed",
    payment: "pending",
  },
  {
    hotelName: "sohag",
    customerName: "ysgs wgsgs",
    roomType: "y",
    bookingNumber: "H1325841163",
    checkIn: "2025-06-26",
    checkOut: "2025-06-28",
    guests: { adults: 1, children: 0 },
    rooms: 1,
    totalPrice: "8.00",
    status: "confirmed",
    payment: "pending",
  },
  {
    hotelName: "sohag",
    customerName: "ysgs wgsgs",
    roomType: "y",
    bookingNumber: "H1325841163",
    checkIn: "2025-06-26",
    checkOut: "2025-06-28",
    guests: { adults: 1, children: 0 },
    rooms: 1,
    totalPrice: "8.00",
    status: "confirmed",
    payment: "pending",
  },
];

export default function HomePage() {
  const [selectDatesVisible, setSelectDatesVisible] = useState(false);
  const [availableRoomsVisible, setAvailableRoomsVisible] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>(sampleBookings);

  const { data: booking } = useBookingsQuery({});
  const { data: hotels } = useHotelsQuery({});
  // console.log(JSON.stringify(hotels, null, 2), "get-bookingsss");

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearch = (searchText: string) => {
    // Implement search logic here
    console.log("Searching for:", searchText);
  };
  const handleCreateBookingPress = () => {
    setSelectDatesVisible(true);
  };
  const handleMarkNoShow = (bookingId: string) => {
    // Implement mark no-show logic
    console.log("Mark no-show for booking:", bookingId);
  };

  const handleTakePayment = (bookingId: string) => {
    // Implement take payment logic
    console.log("Take payment for booking:", bookingId);
  };

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isSelectingCheckIn, setIsSelectingCheckIn] = useState(true);

  const handleCheckInPress = () => {
    setIsSelectingCheckIn(true);
    setDatePickerVisible(true);
  };

  const handleCheckOutPress = () => {
    setIsSelectingCheckIn(false);
    setDatePickerVisible(true);
  };

  const handleDateSelect = (date: string) => {
    if (isSelectingCheckIn) {
      setCheckInDate(date);
    } else {
      setCheckOutDate(date);
    }
    setDatePickerVisible(false);
  };

  const handleSubmitDates = () => {
    console.log("Check-In Date:", checkInDate);
    console.log("Check-Out Date:", checkOutDate);

    // Reset and close modal
    // router.push("/available-rooms");
    // setSelectDatesVisible(false);
    // setCheckInDate("");
    // setCheckOutDate("");
    // Close date modal and open available rooms modal
    setSelectDatesVisible(false);
    setAvailableRoomsVisible(true);
  };

  const handleCloseModal = () => {
    setSelectDatesVisible(false);
    setCheckInDate("");
    setCheckOutDate("");
  };

  const handleCloseAvailableRooms = () => {
    setAvailableRoomsVisible(false);
    // Reset dates when closing available rooms
    setCheckInDate("");
    setCheckOutDate("");
  };
  return (
    <ScrollView>
      <ThemedView className="flex-1 bg-white">
        <Header
          onCreateBookingPress={handleCreateBookingPress}
          onMenuPress={handleToggleSidebar}
        />
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

        <View className="flex-1 pt-4">
          <BookingList
            bookings={bookings}
            onSearch={handleSearch}
            onMarkNoShow={handleMarkNoShow}
            onTakePayment={handleTakePayment}
          />
          <SelectDatesModal
            visible={selectDatesVisible}
            onClose={handleCloseModal}
            onSubmit={handleSubmitDates}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onCheckInPress={handleCheckInPress}
            onCheckOutPress={handleCheckOutPress}
          />

          <DatePickerModal
            visible={datePickerVisible}
            onClose={() => setDatePickerVisible(false)}
            onDateSelect={handleDateSelect}
          />
          <AvailableRoomsModal
            visible={availableRoomsVisible}
            onClose={handleCloseAvailableRooms}
            data={availableRoomsData}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
        </View>
      </ThemedView>
    </ScrollView>
  );
}
