import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "./IconSymbol";

interface HeaderProps {
  onMenuPress: () => void;
  onCreateBookingPress: any;
}

export const Header = ({ onMenuPress, onCreateBookingPress }: HeaderProps) => {
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
          <ThemedText className="text-xl font-bold text-black">Home</ThemedText>
        </View>
        <TouchableOpacity
          onPress={onCreateBookingPress}
          className="bg-yellow-400 px-4 py-2 rounded-xl"
        >
          <ThemedText className="text-sm font-bold text-black">
            Create Booking
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
