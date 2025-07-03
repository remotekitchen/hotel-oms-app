import { useMakeAvailableMutation } from "@/redux/feature/hotel/hotelApi";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import Toast from "react-native-toast-message";
import { CustomTextInput } from "../ui/CustomTextInput";

interface MakeAvailableModalProps {
  visible: boolean;
  onClose: () => void;
  room: any;
  selectedRoom: any;
}

const MakeAvailableModal = ({
  visible,
  onClose,
  selectedRoom,
}: MakeAvailableModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [markedDates, setMarkedDates] = useState<any>({});
  const [availableRooms, setAvailableRooms] = useState("");
  const [makeAvailable, { isLoading }] = useMakeAvailableMutation();

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedColor: "#FACC15",
        selectedTextColor: "black",
      },
    });
  };

  const isNumber = (val: string) => /^\d+$/.test(val);
  const isSubmitEnabled =
    !!selectedDate && !!availableRooms && isNumber(availableRooms);

  const handleSubmit = async () => {
    if (!isSubmitEnabled) return;
    const payload = {
      room_type: selectedRoom,
      date: selectedDate,
      available_rooms: Number(availableRooms),
    };
    try {
      await makeAvailable(payload).unwrap();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Room availability updated.",
      });
      onClose();
    } catch (error: any) {
      const errorMsg =
        error?.data?.detail || error?.message || "Something went wrong.";
      //   console.error("Make available error:", errorMsg);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMsg,
      });
    }
  };

  const handleCancel = () => {
    setSelectedDate("");
    setMarkedDates({});
    setAvailableRooms("");
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
          <Text className="text-base font-semibold text-center mb-4">
            Make Available
          </Text>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            minDate={new Date().toISOString().split("T")[0]}
            theme={{ todayTextColor: "#FACC15", arrowColor: "#FACC15" }}
          />
          <CustomTextInput
            placeholder="Available Rooms"
            value={availableRooms}
            onChangeText={setAvailableRooms}
            keyboardType="numeric"
          />
          <View className="flex-row mt-6">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 bg-white border border-gray-400 py-3 rounded-lg mr-2"
              disabled={isLoading}
            >
              <Text className="text-black text-center font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isSubmitEnabled || isLoading}
              className={`flex-1 py-3 rounded-lg ml-2 ${
                isSubmitEnabled ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  isSubmitEnabled ? "text-black" : "text-gray-500"
                }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

export default MakeAvailableModal;
