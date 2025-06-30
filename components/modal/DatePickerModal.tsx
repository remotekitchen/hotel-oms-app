import { ChevronLeft, ChevronRight, Edit3 } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

export const DatePickerModal = ({
  visible,
  onClose,
  onDateSelect,
}: DatePickerModalProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentMonth] = useState("June 2025");

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
  };

  const handleOK = () => {
    if (selectedDay) {
      // Build a proper ISO date string
      const dateObj = new Date(2025, 5, selectedDay); // Month is 0-based: 5 = June
      const isoDateString = dateObj.toISOString().split("T")[0]; // e.g., 2025-06-07

      onDateSelect(isoDateString);
      setSelectedDay(null);
    }
  };

  const handleCancel = () => {
    setSelectedDay(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "timing", duration: 200 }}
          className="bg-white rounded-2xl p-6 w-full max-w-sm"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold">Select date</Text>
            <TouchableOpacity>
              <Edit3 size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {selectedDay && (
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Sun, Jun {selectedDay}
            </Text>
          )}

          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity>
              <ChevronLeft size={20} color="#666" />
            </TouchableOpacity>
            <Text className="text-base font-medium">{currentMonth}</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between mb-2">
              {daysOfWeek.map((day, index) => (
                <View
                  key={index}
                  className="w-10 h-10 items-center justify-center"
                >
                  <Text className="text-sm font-medium text-gray-600">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {daysInMonth.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => handleDayPress(day)}
                  className={`w-10 h-10 items-center justify-center rounded-full m-1 ${
                    day === selectedDay ? "bg-yellow-600" : ""
                  }`}
                >
                  <Text
                    className={`text-base ${
                      day === selectedDay
                        ? "text-white font-bold"
                        : "text-gray-800"
                    }`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 mr-1 bg-red-200 py-3 rounded-lg"
            >
              <Text className="text-gray-700 text-center font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOK}
              disabled={!selectedDay}
              className={`flex-1 ml-1 py-3 rounded-lg ${
                selectedDay ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  selectedDay ? "text-white" : "text-gray-500"
                }`}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};
