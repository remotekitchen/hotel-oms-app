import { MotiView } from "moti";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface SelectDatesModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  checkInDate: string;
  checkOutDate: string;
  onCheckInPress: () => void;
  onCheckOutPress: () => void;
}

export const SelectDatesModal = ({
  visible,
  onClose,
  onSubmit,
  checkInDate,
  checkOutDate,
  onCheckInPress,
  onCheckOutPress,
}: SelectDatesModalProps) => {
  const isSubmitEnabled = checkInDate && checkOutDate;

  // Helper to format ISO date to "Month Day, Year"
  const formatDisplayDate = (date: string) => {
    if (!date) return "Select date";
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return date; // fallback if invalid
    return parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "timing", duration: 200 }}
          className="bg-white rounded-2xl p-6 w-full max-w-sm"
        >
          <Text className="text-lg font-semibold text-center mb-6">
            Select Dates
          </Text>

          <TouchableOpacity
            onPress={onCheckInPress}
            className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
          >
            <Text className="text-sm text-gray-600 mb-1">Check-In Date</Text>
            <Text
              className={`text-base ${
                checkInDate ? "font-medium text-black" : "text-gray-400"
              }`}
            >
              {formatDisplayDate(checkInDate)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onCheckOutPress}
            className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200"
          >
            <Text className="text-sm text-gray-600 mb-1">Check-Out Date</Text>
            <Text
              className={`text-base ${
                checkOutDate ? "font-medium text-black" : "text-gray-400"
              }`}
            >
              {formatDisplayDate(checkOutDate)}
            </Text>
          </TouchableOpacity>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-red-200 py-3 rounded-lg mr-2"
            >
              <Text className="text-red-700 text-center font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={!isSubmitEnabled}
              className={`ml-2 flex-1 py-3 rounded-lg ${
                isSubmitEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  isSubmitEnabled ? "text-white" : "text-gray-500"
                }`}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};
