import { useAvailableRoomsQuery } from "@/redux/feature/hotel/hotelApi";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AvailableRoomsData } from "../types/room";
import { RoomCard } from "../ui/RoomCard";

interface AvailableRoomsModalProps {
  visible: boolean;
  onClose: () => void;
  data: AvailableRoomsData;
  checkInDate: string;
  checkOutDate: string;
  selectedHotel: any;
  setSelectedHotel: any;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export const AvailableRoomsModal = ({
  visible,
  onClose,
  data,
  checkInDate,
  checkOutDate,
  selectedHotel,
  setSelectedHotel,
}: AvailableRoomsModalProps) => {
  const {
    data: availableHotels,
    isLoading,
    isError,
    error,
  } = useAvailableRoomsQuery({
    hotelId: selectedHotel,
    start_date: checkInDate,
    end_date: checkOutDate,
  });
  const [isClosing, setIsClosing] = React.useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  };
  React.useEffect(() => {
    if (!visible) setIsClosing(false);
  }, [visible]);
  return (
    <Modal
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar style="dark" />
        <MotiView
          from={{ translateX: SCREEN_WIDTH }}
          animate={{ translateX: isClosing ? SCREEN_WIDTH : 0 }}
          transition={{
            type: "timing",
            duration: 350,
            easing: Easing.inOut(Easing.cubic),
          }}
          style={{ flex: 1, backgroundColor: "white" }}
        >
          <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
            <TouchableOpacity onPress={handleClose} className="mr-4">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-medium">All Available Rooms</Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Location Info */}
            <View className="px-4 py-6">
              <Text className="text-2xl font-bold text-black mb-1">
                {availableHotels?.hotel_name}
              </Text>
              <Text className="text-base text-gray-500 mb-4">
                {availableHotels?.address ? availableHotels?.address : "Khulna"}
              </Text>
              <View className="h-px bg-gray-300" />
            </View>
            {/* Room Cards */}
            <View className="px-4">
              {availableHotels?.room_availability?.map((room: any) => (
                <RoomCard
                  checkOutDate={checkOutDate}
                  checkInDate={checkInDate}
                  key={room.room_type_id}
                  room={room}
                />
              ))}
            </View>
          </ScrollView>
        </MotiView>
      </SafeAreaView>
    </Modal>
  );
};
