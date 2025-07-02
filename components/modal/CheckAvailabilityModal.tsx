import { MotiView } from "moti";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface CheckAvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
  room: any;
}

export const CheckAvailabilityModal = ({
  visible,
  onClose,
}: CheckAvailabilityModalProps) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [markedDates, setMarkedDates] = useState<any>({});

  const handleDayPress = (day: DateData) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(day.dateString);
      setCheckOutDate("");
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          color: "#FACC15",
          textColor: "black",
        },
      });
    } else if (day.dateString > checkInDate) {
      setCheckOutDate(day.dateString);
      const newMarkedDates = { ...markedDates };
      newMarkedDates[day.dateString] = {
        endingDay: true,
        color: "#FACC15",
        textColor: "black",
      };
      let currentDate = new Date(checkInDate);
      const endDate = new Date(day.dateString);
      currentDate.setDate(currentDate.getDate() + 1);
      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        newMarkedDates[dateString] = { color: "#FEF08A", textColor: "black" };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setMarkedDates(newMarkedDates);
    }
  };

  const isSubmitEnabled = checkInDate && checkOutDate;

  const handleSubmit = () => {
    if (isSubmitEnabled) {
      // handle submit logic here
      onClose();
    }
  };

  const handleCancel = () => {
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
          <Text className="text-base font-semibold mb-4 text-left">
            Select Dates
          </Text>
          <Calendar
            onDayPress={handleDayPress}
            markingType={"period"}
            markedDates={markedDates}
            minDate={new Date().toISOString().split("T")[0]}
            theme={{ todayTextColor: "#FACC15", arrowColor: "#FACC15" }}
          />
          <View className="flex-row mt-6">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 bg-white border border-gray-400 py-3 rounded-lg mr-2"
            >
              <Text className="text-black text-center font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isSubmitEnabled}
              className={`flex-1 py-3 rounded-lg ml-2 ${
                isSubmitEnabled ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  isSubmitEnabled ? "text-black" : "text-gray-500"
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
