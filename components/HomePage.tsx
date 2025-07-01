import { availableRoomsData } from "@/constants/RoomsData";
import {
  useBookingsQuery,
  useHotelsQuery,
} from "@/redux/feature/hotel/hotelApi";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import HistoryPage from "./HistoryPage";
import { AvailableRoomsModal } from "./modal/AvailableRoomsModal";
import { SelectDatesModal } from "./modal/SelectDatesModal";
import { ThemedView } from "./ThemedView";
import { BookingList } from "./ui/BookingList";
import { Header } from "./ui/Header";
import { Sidebar } from "./ui/Sidebar";

export default function HomePage() {
  const [selectDatesVisible, setSelectDatesVisible] = useState(false);
  const [availableRoomsVisible, setAvailableRoomsVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  console.log(currentPage, "currentPage");
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const { data: booking } = useBookingsQuery({});
  const { data: hotels } = useHotelsQuery({});

  // Set default selected hotel to first active hotel
  useEffect(() => {
    if (
      hotels &&
      hotels.results &&
      hotels.results.length > 0 &&
      !selectedHotel
    ) {
      const firstActiveHotel = hotels.results.find(
        (hotel: any) => hotel.is_active
      );
      if (firstActiveHotel) {
        setSelectedHotel(firstActiveHotel.id.toString());
      }
    }
  }, [hotels, selectedHotel]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
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

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleSubmitDates = (checkIn: string, checkOut: string) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    console.log("Check-In Date:", checkIn);
    console.log("Check-Out Date:", checkOut);

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
      <ThemedView className="flex-1 bg-white h-screen">
        {!historyModalVisible && (
          <>
            <Header
              onCreateBookingPress={handleCreateBookingPress}
              onMenuPress={handleToggleSidebar}
            />
            <Sidebar
              hotels={hotels}
              isOpen={isSidebarOpen}
              onClose={handleCloseSidebar}
              selectedHotel={selectedHotel}
              setSelectedHotel={setSelectedHotel}
              onNavigate={(route) => {
                if (route === "history") {
                  setHistoryModalVisible(true);
                } else {
                  setCurrentPage(route);
                }
              }}
            />
          </>
        )}
        <View className="flex-1 pt-4">
          {currentPage === "home" && (
            <BookingList
              onMarkNoShow={handleMarkNoShow}
              onTakePayment={handleTakePayment}
            />
          )}
          <SelectDatesModal
            visible={selectDatesVisible}
            onClose={handleCloseModal}
            onSubmit={handleSubmitDates}
          />
          <AvailableRoomsModal
            visible={availableRoomsVisible}
            onClose={handleCloseAvailableRooms}
            data={availableRoomsData}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
          />
          <AnimatePresence>
            {historyModalVisible && (
              <MotiView
                from={{ translateX: SCREEN_WIDTH }}
                animate={{ translateX: 0 }}
                exit={{ translateX: SCREEN_WIDTH }}
                transition={{ type: "timing", duration: 400 }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  zIndex: 9999,
                  height: "100%",
                  width: "100%",
                }}
              >
                <StatusBar style="light" backgroundColor="#000" />
                <HistoryPage onBack={() => setHistoryModalVisible(false)} />
              </MotiView>
            )}
          </AnimatePresence>
        </View>
      </ThemedView>
    </ScrollView>
  );
}
