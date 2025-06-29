import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
}

export const CustomTextInput = ({
  placeholder,
  ...props
}: CustomTextInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 mb-4 text-base text-black"
      {...props}
    />
  );
};
