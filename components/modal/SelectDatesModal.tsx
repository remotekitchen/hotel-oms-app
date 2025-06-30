import { MotiView } from "moti";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

interface SelectDatesModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (checkIn: string, checkOut: string) => void;
}

export const SelectDatesModal = ({
  visible,
  onClose,
  onSubmit,
}: SelectDatesModalProps) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const handleDayPress = (day: DateData) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Start new selection
      setCheckInDate(day.dateString);
      setCheckOutDate("");
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          color: "#4F46E5",
          textColor: "white",
        },
      });
    } else if (day.dateString > checkInDate) {
      // End of selection
      setCheckOutDate(day.dateString);
      const newMarkedDates = { ...markedDates };
      newMarkedDates[day.dateString] = {
        endingDay: true,
        color: "#4F46E5",
        textColor: "white",
      };

      // Mark dates in between
      let currentDate = new Date(checkInDate);
      const endDate = new Date(day.dateString);

      // We don't want to mark the start date again
      currentDate.setDate(currentDate.getDate() + 1);

      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        newMarkedDates[dateString] = { color: "#D1D5DB", textColor: "black" };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setMarkedDates(newMarkedDates);
    }
  };

  const isSubmitEnabled = checkInDate && checkOutDate;

  const handleSubmit = () => {
    if (isSubmitEnabled) {
      onSubmit(checkInDate, checkOutDate);
    }
  };

  const handleClose = () => {
    setCheckInDate("");
    setCheckOutDate("");
    setMarkedDates({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "timing", duration: 200 }}
          className="bg-white rounded-2xl p-6 w-full max-w-sm"
        >
          <Text className="text-lg font-semibold text-center mb-4">
            Select Dates
          </Text>

          <Calendar
            onDayPress={handleDayPress}
            markingType={"period"}
            markedDates={markedDates}
            minDate={new Date().toISOString().split("T")[0]}
            theme={{
              todayTextColor: "#4F46E5",
              arrowColor: "#4F46E5",
            }}
          />

          <View className="flex-row space-x-3 mt-6">
            <TouchableOpacity
              onPress={handleClose}
              className="flex-1 bg-red-200 py-3 rounded-lg mr-2"
            >
              <Text className="text-red-700 text-center font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
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
