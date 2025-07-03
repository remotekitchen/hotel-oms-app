import { useAddRoomMutation } from "@/redux/feature/hotel/hotelApi";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { CustomTextInput } from "./ui/CustomTextInput";
import { CustomToggle } from "./ui/CustomToggle";

const initialState = {
  roomName: "",
  description: "",
  maxOccupancy: "",
  numberOfBeds: "",
  bedType: "",
  roomSize: "",
  pricePerNight: "",
  minAge: "",
  discountPrice: "",
  totalRooms: "",
  roomCode: "",
  hasAirConditioning: false,
  hasPrivateBathroom: false,
  hasBalcony: false,
  hasTV: false,
  hasRefrigerator: false,
  hasToiletries: false,
  hasTowels: false,
  hasSlippers: false,
  hasClothesRack: false,
  hasSafe: false,
  hasDesk: false,
  hasMinibar: false,
  hasCoffeeMaker: false,
  hasBathtub: false,
  hasHairdryer: false,
  hasIron: false,
  hasSeatingArea: false,
  hasView: false,
  isRefundable: false,
  cancellationPolicy: "",
  smokingAllowed: false,
  extraBedFee: "",
  earlyCheckinFee: "",
  lateCheckoutFee: "",
  isAvailable: false,
};

export default function CreateRoomForm({ selectedHotel, handleClose }: any) {
  const [form, setForm] = useState(initialState);
  const [addRoom, { isLoading }] = useAddRoomMutation();

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      hotel: selectedHotel,
      name: form.roomName,
      description: form.description,
      max_occupancy: form.maxOccupancy ? Number(form.maxOccupancy) : null,
      number_of_beds: form.numberOfBeds ? Number(form.numberOfBeds) : null,
      bed_type: form.bedType,
      room_size: form.roomSize || null,
      price_per_night: form.pricePerNight || null,
      discount_price: form.discountPrice || null,
      total_rooms: form.totalRooms ? Number(form.totalRooms) : null,
      room_code: form.roomCode,
      has_air_conditioning: form.hasAirConditioning,
      has_private_bathroom: form.hasPrivateBathroom,
      has_balcony: form.hasBalcony,
      has_tv: form.hasTV,
      has_refrigerator: form.hasRefrigerator,
      has_toiletries: form.hasToiletries,
      has_towels: form.hasTowels,
      has_slippers: form.hasSlippers,
      has_clothes_rack: form.hasClothesRack,
      has_safe: form.hasSafe,
      has_desk: form.hasDesk,
      has_minibar: form.hasMinibar,
      has_coffee_maker: form.hasCoffeeMaker,
      has_bathtub: form.hasBathtub,
      has_hairdryer: form.hasHairdryer,
      has_iron: form.hasIron,
      has_seating_area: form.hasSeatingArea,
      has_view: form.hasView,
      view_type: null,
      is_refundable: form.isRefundable,
      refundable_until_days: null,
      cancellation_policy: form.cancellationPolicy,
      smoking_allowed: form.smokingAllowed,
      min_age_checkin: form.minAge ? Number(form.minAge) : null,
      extra_bed_fee: form.extraBedFee || null,
      early_checkin_fee: form.earlyCheckinFee || null,
      late_checkout_fee: form.lateCheckoutFee || null,
      is_available: form.isAvailable,
    };
    try {
      await addRoom(payload).unwrap();
      Toast.show({
        type: "success",
        text1: "Room Created",
        text2: "The room was created successfully.",
      });
      handleClose();
    } catch (error) {
      console.error("Create room error:", error);
    }
  };

  return (
    <View className="px-4 py-6">
      <CustomTextInput
        placeholder="Room Name"
        value={form.roomName}
        onChangeText={(v) => handleChange("roomName", v)}
      />
      <CustomTextInput
        placeholder="Description"
        value={form.description}
        onChangeText={(v) => handleChange("description", v)}
      />
      <CustomTextInput
        placeholder="Max Occupancy"
        value={form.maxOccupancy}
        onChangeText={(v) => handleChange("maxOccupancy", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Number of Beds"
        value={form.numberOfBeds}
        onChangeText={(v) => handleChange("numberOfBeds", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Bed Type"
        value={form.bedType}
        onChangeText={(v) => handleChange("bedType", v)}
      />
      <CustomTextInput
        placeholder="Room Size (sq ft)"
        value={form.roomSize}
        onChangeText={(v) => handleChange("roomSize", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Price per Night"
        value={form.pricePerNight}
        onChangeText={(v) => handleChange("pricePerNight", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Minimum Age for Check-in"
        value={form.minAge}
        onChangeText={(v) => handleChange("minAge", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Discount Price"
        value={form.discountPrice}
        onChangeText={(v) => handleChange("discountPrice", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Total Rooms"
        value={form.totalRooms}
        onChangeText={(v) => handleChange("totalRooms", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Room Code"
        value={form.roomCode}
        onChangeText={(v) => handleChange("roomCode", v)}
      />
      {/* Toggles */}
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Air Conditioning</Text>
        <CustomToggle
          value={form.hasAirConditioning}
          onValueChange={(v) => handleChange("hasAirConditioning", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Private Bathroom</Text>
        <CustomToggle
          value={form.hasPrivateBathroom}
          onValueChange={(v) => handleChange("hasPrivateBathroom", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Balcony</Text>
        <CustomToggle
          value={form.hasBalcony}
          onValueChange={(v) => handleChange("hasBalcony", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has TV</Text>
        <CustomToggle
          value={form.hasTV}
          onValueChange={(v) => handleChange("hasTV", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Refrigerator</Text>
        <CustomToggle
          value={form.hasRefrigerator}
          onValueChange={(v) => handleChange("hasRefrigerator", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Toiletries</Text>
        <CustomToggle
          value={form.hasToiletries}
          onValueChange={(v) => handleChange("hasToiletries", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Towels</Text>
        <CustomToggle
          value={form.hasTowels}
          onValueChange={(v) => handleChange("hasTowels", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Slippers</Text>
        <CustomToggle
          value={form.hasSlippers}
          onValueChange={(v) => handleChange("hasSlippers", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Clothes Rack</Text>
        <CustomToggle
          value={form.hasClothesRack}
          onValueChange={(v) => handleChange("hasClothesRack", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Safe</Text>
        <CustomToggle
          value={form.hasSafe}
          onValueChange={(v) => handleChange("hasSafe", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Desk</Text>
        <CustomToggle
          value={form.hasDesk}
          onValueChange={(v) => handleChange("hasDesk", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Minibar</Text>
        <CustomToggle
          value={form.hasMinibar}
          onValueChange={(v) => handleChange("hasMinibar", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Coffee Maker</Text>
        <CustomToggle
          value={form.hasCoffeeMaker}
          onValueChange={(v) => handleChange("hasCoffeeMaker", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Bathtub</Text>
        <CustomToggle
          value={form.hasBathtub}
          onValueChange={(v) => handleChange("hasBathtub", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Hairdryer</Text>
        <CustomToggle
          value={form.hasHairdryer}
          onValueChange={(v) => handleChange("hasHairdryer", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Iron</Text>
        <CustomToggle
          value={form.hasIron}
          onValueChange={(v) => handleChange("hasIron", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has Seating Area</Text>
        <CustomToggle
          value={form.hasSeatingArea}
          onValueChange={(v) => handleChange("hasSeatingArea", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Has View</Text>
        <CustomToggle
          value={form.hasView}
          onValueChange={(v) => handleChange("hasView", v)}
        />
      </View>
      <View className="flex-row items-center justify-between my-2">
        <Text>Is Refundable</Text>
        <CustomToggle
          value={form.isRefundable}
          onValueChange={(v) => handleChange("isRefundable", v)}
        />
      </View>
      <CustomTextInput
        placeholder="Cancellation Policy"
        value={form.cancellationPolicy}
        onChangeText={(v) => handleChange("cancellationPolicy", v)}
      />
      <View className="flex-row items-center justify-between my-2">
        <Text>Smoking Allowed</Text>
        <CustomToggle
          value={form.smokingAllowed}
          onValueChange={(v) => handleChange("smokingAllowed", v)}
        />
      </View>
      <CustomTextInput
        placeholder="Extra Bed Fee"
        value={form.extraBedFee}
        onChangeText={(v) => handleChange("extraBedFee", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Early Check-in Fee"
        value={form.earlyCheckinFee}
        onChangeText={(v) => handleChange("earlyCheckinFee", v)}
        keyboardType="numeric"
      />
      <CustomTextInput
        placeholder="Late Checkout Fee"
        value={form.lateCheckoutFee}
        onChangeText={(v) => handleChange("lateCheckoutFee", v)}
        keyboardType="numeric"
      />
      <View className="flex-row items-center justify-between my-2">
        <Text>Is Available</Text>
        <CustomToggle
          value={form.isAvailable}
          onValueChange={(v) => handleChange("isAvailable", v)}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-yellow-400 py-4 px-8 rounded-2xl mt-8 mx-auto"
        disabled={isLoading}
      >
        <Text className="text-base font-bold text-black text-center">
          {isLoading ? "Creating..." : "Create Room"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
