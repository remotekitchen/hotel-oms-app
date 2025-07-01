import { useBookingHistoryQuery } from "@/redux/feature/hotel/hotelApi";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "./ui/SearchBar";

const columns = [
  { key: "id", label: "ID", width: 50 },
  { key: "guestName", label: "Name", width: 120 },
  { key: "checkIn", label: "Check-in Date", width: 110 },
  { key: "checkOut", label: "Check-out Date", width: 120 },
  { key: "payment", label: "Payment", width: 80 },
  { key: "status", label: "Status", width: 90 },
];

interface HistoryPageProps {
  onBack?: () => void;
}

// Define a type for the table row
interface HistoryRow {
  id: number;
  guestName: string;
  checkIn: string;
  checkOut: string;
  payment: string;
  status: string;
}

const HistoryPage = ({ onBack }: HistoryPageProps) => {
  const [search, setSearch] = useState("");
  const { data: bookingHistory } = useBookingHistoryQuery({});

  // Map API data to table row format
  const realHistory: HistoryRow[] = (bookingHistory?.results || []).map(
    (item: any) => ({
      id: item.id,
      guestName:
        item.guest?.first_name +
        (item.guest?.last_name ? ` ${item.guest.last_name}` : ""),
      checkIn: item.check_in_date,
      checkOut: item.check_out_date,
      payment: item.payment_status,
      status: item.status,
    })
  );

  // Search logic
  const filtered = realHistory.filter(
    (row: HistoryRow) =>
      row.guestName?.toLowerCase().includes(search.toLowerCase()) ||
      row.checkIn?.includes(search) ||
      row.checkOut?.includes(search) ||
      row.payment?.toLowerCase().includes(search.toLowerCase()) ||
      row.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" backgroundColor="#000" />
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white">
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            className="mr-2"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-bold text-black">History</Text>
      </View>
      <View className="px-2 pt-2">
        <SearchBar
          placeholder="Name, Check-in/out Date, Payment ..."
          onSearch={setSearch}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2"
      >
        <View>
          {/* Table Header */}
          <View className="flex-row border-b border-gray-300 bg-gray-50">
            {columns.map((col) => (
              <Text
                key={col.key}
                style={{ width: col.width }}
                className="font-semibold text-gray-800 py-2 px-1"
              >
                {col.label}
              </Text>
            ))}
          </View>
          {/* Table Rows */}
          {filtered.map((row: HistoryRow) => (
            <View key={row.id} className="flex-row border-b border-gray-200">
              {columns.map((col) => (
                <Text
                  key={col.key}
                  style={{ width: col.width }}
                  className="py-2 px-1 text-gray-700"
                >
                  {row[col.key as keyof HistoryRow]}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryPage;
