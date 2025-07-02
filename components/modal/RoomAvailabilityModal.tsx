import { useCheckAvailabilityQuery } from "@/redux/feature/hotel/hotelApi";
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
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

interface RoomAvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
  room: any;
  startDate?: string;
  endDate?: string;
}

const RoomAvailabilityModal = ({
  visible,
  onClose,
  room,
  startDate,
  endDate,
}: RoomAvailabilityModalProps) => {
  const [isClosing, setIsClosing] = React.useState(false);

  //   console.log(endDate, "get-rrom");
  const { data: roomAvailability } = useCheckAvailabilityQuery({
    roomId: room?.id,
    start_date: startDate,
    end_date: endDate,
  });
  //   console.log(roomAvailability, "get-avsssss");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <MotiView
          from={{ translateX: screenWidth }}
          animate={{ translateX: isClosing ? screenWidth : 0 }}
          transition={{ type: "timing", duration: 350 }}
          style={{ flex: 1, backgroundColor: "white" }}
        >
          <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
            <TouchableOpacity onPress={handleClose} className="mr-4 p-1">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-medium text-black">
              Room Availability
            </Text>
          </View>
          <ScrollView className="px-2 py-4">
            {(roomAvailability?.availability || []).map(
              (item: any, idx: number) => (
                <View
                  key={item.id || idx}
                  className="mb-6 p-4 rounded-2xl"
                  style={{
                    backgroundColor: "#F8F5F3",
                    shadowColor: "#000",
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <Text className="font-bold text-lg mb-2">
                    {room?.name || "Room"}
                  </Text>
                  <Text>Date: {item.date}</Text>
                  <Text>Available Rooms: {item.available_rooms}</Text>
                  <Text>
                    Effective Price:{" "}
                    {item.price_override ?? item.original_price}
                  </Text>
                  <Text>Min. Nights Stay: {item.min_nights_stay}</Text>
                </View>
              )
            )}
          </ScrollView>
        </MotiView>
      </SafeAreaView>
    </Modal>
  );
};

export default RoomAvailabilityModal;
