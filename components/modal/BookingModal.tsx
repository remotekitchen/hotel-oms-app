import { ArrowLeft } from "lucide-react-native";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookingFormData } from "../types/bookings";
import { CustomTextInput } from "../ui/CustomTextInput";

const { width: screenWidth } = Dimensions.get("window");

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  roomType: string;
  roomId: string;
  checkOutDate: string;
  checkInDate: string;
}

// Date formatter helper
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  // Append a default year
  const dateWithYear = `${dateString}, 2025`;
  const parsedDate = new Date(dateWithYear);
  if (isNaN(parsedDate.getTime())) {
    console.warn(`Invalid date format: ${dateString}`);
    return "";
  }
  return parsedDate.toISOString().split("T")[0];
};

export const BookingModal = ({
  visible,
  onClose,
  roomType,
  roomId,
  checkOutDate,
  checkInDate,
}: BookingModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    numberOfAdults: "",
    numberOfChildren: "",
    numberOfRooms: "",
    extraBedRequested: false,
    roomsNeedingExtraBed: "",
    extraBedsPerRoom: "",
    couponCode: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  };

  const updateFormData = (
    field: keyof BookingFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "extraBedRequested" &&
        !value && {
          roomsNeedingExtraBed: "",
          extraBedsPerRoom: "",
        }),
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    const requiredFields: (keyof BookingFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "numberOfAdults",
      "numberOfChildren",
      "numberOfRooms",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (formData.extraBedRequested) {
      if (!formData.roomsNeedingExtraBed) {
        newErrors.roomsNeedingExtraBed = "Required.";
      }
      if (!formData.extraBedsPerRoom) {
        newErrors.extraBedsPerRoom = "Required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const payload = {
        guest: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
        },
        booking: {
          room_type: parseInt(roomId, 10),
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          number_of_adults: parseInt(formData.numberOfAdults, 10),
          number_of_children: parseInt(formData.numberOfChildren, 10),
          number_of_rooms: parseInt(formData.numberOfRooms, 10),
          extra_bed_request: formData.extraBedRequested,
          extra_bed_rooms_count: formData.extraBedRequested
            ? parseInt(formData.roomsNeedingExtraBed, 10)
            : 0,
          extra_bed_count_per_room: formData.extraBedRequested
            ? parseInt(formData.extraBedsPerRoom, 10)
            : 0,
          booking_type: "daily",
          coupon_code: formData.couponCode.trim() || null,
        },
      };

      console.log("=== BOOKING SUBMISSION ===");
      console.log(JSON.stringify(payload, null, 2));
      console.log("========================");
      onClose();
    }
  };

  useEffect(() => {
    if (!visible) {
      setIsClosing(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        numberOfAdults: "",
        numberOfChildren: "",
        numberOfRooms: "",
        extraBedRequested: false,
        roomsNeedingExtraBed: "",
        extraBedsPerRoom: "",
        couponCode: "",
      });
      setErrors({});
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent={false}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
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
          {/* Header */}
          <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
            <TouchableOpacity onPress={handleClose} className="mr-4 p-1">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-medium text-black">
              Create Booking
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View className="px-4 py-6">
              <Text className="text-xl font-bold text-black text-center mb-6">
                Guest Information
              </Text>

              {["firstName", "lastName", "email"].map((field) => (
                <View key={field} className="mb-4">
                  <CustomTextInput
                    placeholder={field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                    value={formData[field as keyof BookingFormData] as string}
                    onChangeText={(text) =>
                      updateFormData(field as keyof BookingFormData, text)
                    }
                    keyboardType={
                      field === "email" ? "email-address" : "default"
                    }
                    autoCapitalize={field === "email" ? "none" : "sentences"}
                  />
                  {errors[field as keyof BookingFormData] && (
                    <Text className="text-xs text-red-600 mt-1">
                      {errors[field as keyof BookingFormData]}
                    </Text>
                  )}
                </View>
              ))}

              <Text className="text-xl font-bold text-black text-center mb-6 mt-8">
                Booking Details
              </Text>

              {["numberOfAdults", "numberOfChildren", "numberOfRooms"].map(
                (field) => (
                  <View key={field} className="mb-4">
                    <CustomTextInput
                      placeholder={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase())}
                      value={formData[field as keyof BookingFormData] as string}
                      onChangeText={(text) =>
                        updateFormData(field as keyof BookingFormData, text)
                      }
                      keyboardType="numeric"
                    />
                    {errors[field as keyof BookingFormData] && (
                      <Text className="text-xs text-red-600 mt-1">
                        {errors[field as keyof BookingFormData]}
                      </Text>
                    )}
                  </View>
                )
              )}

              {/* Extra Bed Toggle */}
              <View className="flex-row items-center justify-between py-3 mb-4">
                <Text className="text-base text-black font-medium">
                  Extra Bed Requested
                </Text>
                <Switch
                  value={formData.extraBedRequested}
                  onValueChange={(value) =>
                    updateFormData("extraBedRequested", value)
                  }
                  trackColor={{ false: "#D1D5DB", true: "#FACC15" }}
                  thumbColor="#ffffff"
                />
              </View>

              {formData.extraBedRequested && (
                <>
                  {[
                    {
                      field: "roomsNeedingExtraBed",
                      placeholder: "Rooms Needing Extra Bed",
                    },
                    {
                      field: "extraBedsPerRoom",
                      placeholder: "Extra Beds Per Room",
                    },
                  ].map(({ field, placeholder }) => (
                    <View key={field} className="mb-4">
                      <CustomTextInput
                        placeholder={placeholder}
                        value={
                          formData[field as keyof BookingFormData] as string
                        }
                        onChangeText={(text) =>
                          updateFormData(field as keyof BookingFormData, text)
                        }
                        keyboardType="numeric"
                      />
                      {errors[field as keyof BookingFormData] && (
                        <Text className="text-xs text-red-600 mt-1">
                          {errors[field as keyof BookingFormData]}
                        </Text>
                      )}
                    </View>
                  ))}
                </>
              )}

              <CustomTextInput
                placeholder="Coupon Code (optional)"
                value={formData.couponCode}
                onChangeText={(text) => updateFormData("couponCode", text)}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-yellow-400 py-4 px-8 rounded-2xl mt-8 mx-auto"
              >
                <Text className="text-base font-bold text-black text-center">
                  Submit Booking
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </MotiView>
      </SafeAreaView>
    </Modal>
  );
};
