import { availableRoomsData } from "@/constants/RoomsData";
import {
  useBookingsQuery,
  useHotelsQuery,
} from "@/redux/feature/hotel/hotelApi";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import HistoryModal from "./HistoryPage";
import { AvailableRoomsModal } from "./modal/AvailableRoomsModal";
import { CreateRoomModal } from "./modal/CreateRoomModal";
import { SelectDatesModal } from "./modal/SelectDatesModal";
// Remove: import { FixedView } from "./ThemedView";
import { BookingList } from "./ui/BookingList";
import { Header } from "./ui/Header";
import RoomList from "./ui/RoomList";
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
  const [createRoomVisible, setCreateRoomVisible] = useState(false);

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
      <View className="flex-1 bg-white h-screen">
        {!historyModalVisible && (
          <>
            <Header
              onCreateBookingPress={handleCreateBookingPress}
              onMenuPress={handleToggleSidebar}
              onCreateRoomPress={() => setCreateRoomVisible(true)}
              currentPage={currentPage}
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
        <View className="flex-1">
          {currentPage === "home" && (
            <BookingList
              onMarkNoShow={handleMarkNoShow}
              onTakePayment={handleTakePayment}
            />
          )}
          {currentPage === "roomInfo" && <RoomList />}
          {currentPage === "roomInfo" && (
            <CreateRoomModal
              selectedHotel={selectedHotel}
              visible={createRoomVisible}
              onClose={() => setCreateRoomVisible(false)}
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
          <HistoryModal
            visible={historyModalVisible}
            onExited={() => setHistoryModalVisible(false)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
