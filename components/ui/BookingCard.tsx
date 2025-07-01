import {
  useHideBookingMutation,
  useTakePaymentMutation,
} from "@/redux/feature/hotel/hotelApi";
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
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message"; // Importing react-native-toast-message
import ConfirmationModal from "../modal/ConfirmationModal";

export interface BookingData {
  id: number;
  hotel_name: string;
  customer_name: string;
  room_type_name: string;
  booking_number: string;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  number_of_adults: number;
  number_of_children: number;
  number_of_rooms: number;
  total_price: string;
  status: "confirmed" | "pending" | "cancelled";
  payment_status: "pending" | "completed" | "failed";
  guest?: {
    first_name: string;
    last_name: string;
    email: string;
  };
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
  const [isNoShowModalVisible, setNoShowModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);

  const [hideBooking] = useHideBookingMutation();
  const [takePayment] = useTakePaymentMutation();

  const handleMarkNoShow = (bookingId: number) => {
    setNoShowModalVisible(true);
  };

  const handleTakePayment = () => {
    setPaymentModalVisible(true);
  };

  const confirmMarkNoShow = async () => {
    try {
      const response = await hideBooking(booking.id).unwrap(); // Unwrap to handle the response
      Toast.show({
        type: "success",
        position: "top",
        text1: "Booking Hidden",
        text2: "The booking has been marked as no-show.",
      });
    } catch (error) {
      console.error("Error hiding booking:", error);
    } finally {
      setNoShowModalVisible(false);
    }
  };

  const confirmTakePayment = async () => {
    try {
      const response = await takePayment({
        bookingId: booking.id,
        amount: booking.total_price,
        payment_method: "cash",
        payment_type: "full",
      }).unwrap(); // Unwrap to handle the response
      Toast.show({
        type: "success",
        position: "top",
        text1: "Payment Successful",
        text2: `Payment of ৳${booking.total_price} has been completed.`,
      });
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setPaymentModalVisible(false);
    }
  };

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
        Hotel: {booking?.hotel_name}
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
            {booking.guest?.first_name}
          </Text>
        </View>

        {/* Room Type */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Building size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Room Type</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking?.room_type_name}
          </Text>
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
            {booking.booking_number}
          </Text>
        </View>

        {/* Check-in */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Calendar size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Check-in</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.check_in_date}
          </Text>
        </View>

        {/* Check-out */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Calendar size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Check-out</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.check_out_date}
          </Text>
        </View>

        {/* Guests */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Users size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Guests</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.number_of_guests} (Adults: {booking.number_of_adults},
            Children: {booking.number_of_children})
          </Text>
        </View>

        {/* Rooms */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <Building size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Rooms</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            {booking.number_of_rooms}
          </Text>
        </View>

        {/* Total Price */}
        <View className="flex-row items-center justify-between my-1">
          <View className="flex-row items-center">
            <DollarSign size={20} color="#6B7280" className="mr-3" />
            <Text className="text-gray-700 font-medium">Total Price</Text>
          </View>
          <Text className="text-gray-900 font-medium">
            ৳{booking.total_price}
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
          <Text
            className={`font-medium ${getPaymentColor(booking.payment_status)}`}
          >
            {booking.payment_status}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-6 space-x-4">
        <TouchableOpacity
          onPress={() => handleMarkNoShow(booking.id)}
          className="flex-1 bg-red-500 rounded-2xl py-4 mr-2"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Hide Booking
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTakePayment}
          className="flex-1 bg-green-500 rounded-2xl py-4 ml-2"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Take Payment
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mark No-Show Modal */}
      <ConfirmationModal
        visible={isNoShowModalVisible}
        title="Hide Booking"
        message="Are you sure you want to hide this booking?"
        onConfirm={confirmMarkNoShow}
        onCancel={() => setNoShowModalVisible(false)}
        confirmText="Confirm"
        cancelText="Cancel"
      />

      {/* Take Payment Modal */}
      <ConfirmationModal
        visible={isPaymentModalVisible}
        title="Payment Confirmation"
        message={`Did you receive the payment of ৳${booking.total_price} taka from the guest?`}
        onConfirm={confirmTakePayment}
        onCancel={() => setPaymentModalVisible(false)}
        confirmText="Yes"
        cancelText="No"
      />
    </View>
  );
};
