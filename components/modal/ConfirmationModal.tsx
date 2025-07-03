import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <Text className="text-2xl font-bold text-center mb-4 text-gray-900">
            {title}
          </Text>
          <Text className="text-lg text-gray-700 text-center mb-8">
            {message}
          </Text>
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-red-500 rounded-2xl py-3 mr-2"
            >
              <Text className="text-white text-center font-semibold text-base">
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-green-500 rounded-2xl py-3 ml-2"
            >
              <Text className="text-white text-center font-semibold text-base">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
