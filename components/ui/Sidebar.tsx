import { userLoggedOut } from "@/redux/feature/authentication/authenticationSlice";
import { ChevronDown } from "lucide-react-native"; // Lucide icon
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { IconSymbol } from "./IconSymbol";

interface HeaderProps {
  onMenuPress: () => void;
}

export const Header = ({ onMenuPress }: HeaderProps) => {
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
          <Text className="text-xl font-bold text-black">Home</Text>
        </View>
        <TouchableOpacity className="bg-yellow-400 px-4 py-2 rounded-xl">
          <Text className="text-sm font-bold text-black">Create Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIDEBAR_WIDTH = 300;

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useDispatch();
  const [selectedHotel, setSelectedHotel] = useState("sohag");

  const hotelOptions = [
    { label: "Sohag Hotel", value: "sohag" },
    { label: "Green Palace", value: "green_palace" },
    { label: "Royal Inn", value: "royal_inn" },
  ];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isOpen ? 0 : -SIDEBAR_WIDTH, {
            duration: 300,
          }),
        },
      ],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOpen ? 0.5 : 0, {
        duration: 300,
      }),
      display: isOpen ? "flex" : "none",
    };
  });

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  const menuItems = [
    { icon: "house.fill", label: "Home" },
    { icon: "clock.fill", label: "History" },
    { icon: "info.circle.fill", label: "Room Info" },
  ];

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            zIndex: 10,
          },
          overlayStyle,
        ]}
      >
        <TouchableOpacity className="flex-1" onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            backgroundColor: "#FFF7F0",
            zIndex: 20,
          },
          animatedStyle,
        ]}
        className="pt-10 rounded-tr-3xl rounded-br-3xl"
      >
        <View className="bg-blue-500 px-6 py-6">
          <Text className="text-2xl font-bold text-white mb-1">
            Hotel Management
          </Text>
          <Text className="text-white text-sm">
            Welcome to the Hotel Management System
          </Text>
        </View>

        <View className="px-6 py-4">
          <Text className="text-sm mb-2 text-black">Hotel Selection</Text>
          <View className="border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <RNPickerSelect
              onValueChange={(value) => setSelectedHotel(value)}
              value={selectedHotel}
              placeholder={{ label: "Select a hotel...", value: null }}
              items={hotelOptions}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: "#000",
                  paddingVertical: 8,
                },
                inputAndroid: {
                  fontSize: 16,
                  color: "#000",
                  paddingVertical: 8,
                },
                iconContainer: {
                  top: Platform.OS === "android" ? 12 : 10,
                  right: 10,
                },
              }}
              Icon={() => <ChevronDown size={20} color="#000" />}
            />
          </View>
        </View>

        <View className="px-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4"
            >
              {/* @ts-ignore */}
              <IconSymbol name={item.icon} size={24} color="#000" />
              <Text className="ml-3 text-base text-black">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          className="absolute bottom-6 left-6 flex-row items-center"
          onPress={handleLogout}
        >
          <IconSymbol name="arrow.left.circle.fill" size={24} color="#000" />
          <Text className="ml-3 text-base text-black">Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
