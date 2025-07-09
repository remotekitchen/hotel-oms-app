import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "./IconSymbol";

interface HeaderProps {
  onMenuPress: () => void;
  onCreateBookingPress: any;
  onCreateRoomPress: () => void;
  currentPage: string;
}

export const Header = ({
  onMenuPress,
  onCreateBookingPress,
  onCreateRoomPress,
  currentPage,
}: HeaderProps) => {
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={onMenuPress}
            className="p-2 mr-4 rounded-lg active:bg-gray-100"
          >
            <IconSymbol name="list.bullet" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-black">
            {currentPage === "roomInfo" ? "Rooms" : "Home"}
          </Text>
        </View>
        {currentPage === "roomInfo" ? (
          <TouchableOpacity
            onPress={onCreateRoomPress}
            className="bg-yellow-400 px-4 py-2 rounded-xl"
          >
            <Text className="text-sm font-bold text-black">Create Room</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onCreateBookingPress}
            className="bg-yellow-400 px-4 py-2 rounded-xl"
          >
            <Text className="text-sm font-bold text-black">Create Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
