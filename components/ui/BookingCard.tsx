import {
  Building,
  Calendar,
  CreditCard,
  DollarSign,
  Hash,
  Info,
  User,
  Users,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface BookingData {
  hotelName: string;
  customerName: string;
  roomType: string;
  bookingNumber: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  rooms: number;
  totalPrice: string;
  status: "confirmed" | "pending" | "cancelled";
  payment: "pending" | "completed" | "failed";
}

interface BookingCardProps {
  booking: BookingData;
  onMarkNoShow?: () => void;
  onTakePayment?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onMarkNoShow,
  onTakePayment,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <View className="mx-4 mb-4 bg-gray-100 rounded-2xl p-4 shadow-sm">
      {/* Hotel Name */}
      <Text className="text-2xl font-bold text-gray-900 mb-4">
        Hotel: {booking.hotelName}
      </Text>

      {/* Booking Details */}
      <View className="space-y-3">
        {/* Customer Name */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <User size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Customer Name</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.customerName}
          </Text>
        </View>

        {/* Room Type */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Building size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Room Type</Text>
          </View>
          <Text className="text-gray-900 font-medium">{booking.roomType}</Text>
        </View>

        {/* Separator */}
        <View className="h-px bg-gray-300 my-2" />

        {/* Booking Number */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Hash size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Booking Number</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.bookingNumber}
          </Text>
        </View>

        {/* Check-in */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Calendar size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Check-in</Text>
          </View>
          <Text className="text-gray-900 font-medium">{booking.checkIn}</Text>
        </View>

        {/* Check-out */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Calendar size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Check-out</Text>
          </View>
          <Text className="text-gray-900 font-medium">{booking.checkOut}</Text>
        </View>

        {/* Guests */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Users size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Guests</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.guests.adults + booking.guests.children} (Adults:{" "}
            {booking.guests.adults}, Children: {booking.guests.children})
          </Text>
        </View>

        {/* Rooms */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Building size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Rooms</Text>
          </View>
          <Text className="text-gray-900 font-medium">{booking.rooms}</Text>
        </View>

        {/* Total Price */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <DollarSign size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Total Price</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            ৳{booking.totalPrice}
          </Text>
        </View>

        {/* Status */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Info size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Status</Text>
          </View>
          <Text className={`font-medium ${getStatusColor(booking.status)}`}>
            {booking.status}
          </Text>
        </View>

        {/* Payment */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <CreditCard size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Payment</Text>
          </View>
          <Text className={`font-medium ${getPaymentColor(booking.payment)}`}>
            {booking.payment}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-6 space-x-4">
        <TouchableOpacity
          onPress={onMarkNoShow}
          className="flex-1 bg-red-500 rounded-2xl py-4 mr-2"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Mark No-Show
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onTakePayment}
          className="flex-1 bg-green-500 rounded-2xl py-4 ml-2"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Take Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
