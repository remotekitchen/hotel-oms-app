import { ArrowLeft } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateRoomForm from "../CreateRoomForm";

const { width: screenWidth } = Dimensions.get("window");

interface CreateRoomModalProps {
  visible: boolean;
  onClose: () => void;
  selectedHotel: any;
}

export const CreateRoomModal = ({
  visible,
  onClose,
  selectedHotel,
}: CreateRoomModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  };

  useEffect(() => {
    if (!visible) setIsClosing(false);
  }, [visible]);

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
          transition={{
            type: "timing",
            duration: 350,
            easing: Easing.inOut(Easing.cubic),
          }}
          style={{ flex: 1, backgroundColor: "white" }}
        >
          <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
            <TouchableOpacity onPress={handleClose} className="mr-4 p-1">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-medium text-black">Create Room</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <CreateRoomForm
              selectedHotel={selectedHotel}
              handleClose={handleClose}
            />
          </ScrollView>
        </MotiView>
      </SafeAreaView>
    </Modal>
  );
};
