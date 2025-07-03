import { MotiView } from "moti";
import React from "react";
import { TouchableOpacity } from "react-native";

interface CustomToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const CustomToggle = ({ value, onValueChange }: CustomToggleProps) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      className={`w-12 h-6 rounded-full p-1 ${
        value ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <MotiView
        animate={{
          translateX: value ? 24 : 0,
        }}
        transition={{
          type: "timing",
          duration: 200,
        }}
        className="w-4 h-4 bg-white rounded-full"
      />
    </TouchableOpacity>
  );
};
