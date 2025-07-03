import { Search } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Name, Check-in/out Date, Payment ...",
  onSearch,
}) => {
  return (
    <View className="mx-4 mb-4 bg-white rounded-2xl border border-gray-200 flex-row items-center px-4 py-3 shadow-sm">
      <Search size={20} color="#9CA3AF" className="mr-3" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-gray-700 text-base"
        onChangeText={onSearch}
      />
    </View>
  );
};
