import { ArrowLeft } from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AvailableRoomsData } from "../types/room";
import { RoomCard } from "../ui/RoomCard";

interface AvailableRoomsModalProps {
  visible: boolean;
  onClose: () => void;
  data: AvailableRoomsData;
  checkInDate: string;
  checkOutDate: string;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export const AvailableRoomsModal = ({
  visible,
  onClose,
  data,
  checkInDate,
  checkOutDate,
}: AvailableRoomsModalProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <MotiView
          from={{ translateX: SCREEN_WIDTH }}
          animate={{ translateX: 0 }}
          exit={{ translateX: SCREEN_WIDTH }}
          transition={{
            type: "timing",
            duration: 400,
          }}
          //   @ts-ignore
          style={{
            position: "absolute",
            top: -100,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 9999,
            height: "100vh", // ensure full height
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
              <TouchableOpacity onPress={onClose} className="mr-4">
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
                  {data.location}
                </Text>
                <Text className="text-base text-gray-500 mb-4">
                  {data.address}
                </Text>
                <View className="h-px bg-gray-300 mb-6" />
              </View>

              {/* Room Cards */}
              <View className="px-4">
                {data.rooms.map((room) => (
                  <RoomCard
                    checkOutDate={checkOutDate}
                    checkInDate={checkInDate}
                    key={room.id}
                    room={room}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </MotiView>
      )}
    </AnimatePresence>
  );
};
