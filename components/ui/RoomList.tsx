import { useGetRoomsQuery } from "@/redux/feature/hotel/hotelApi";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CheckAvailabilityModal } from "../modal/CheckAvailabilityModal";
import MakeAvailableModal from "../modal/MakeAvailableModal";

interface Room {
  id: string;
  name: string;
  price: number;
  bedType: string;
  isAvailable: boolean;
}

const RoomList: React.FC = () => {
  const rooms: Room[] = [
    {
      id: "1",
      name: "Deluxe Room",
      price: 150.0,
      bedType: "King",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Standard Room",
      price: 89.0,
      bedType: "Queen",
      isAvailable: false,
    },
    {
      id: "3",
      name: "Suite",
      price: 250.0,
      bedType: "King",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Economy Room",
      price: 65.0,
      bedType: "Twin",
      isAvailable: true,
    },
  ];

  const { data: getRooms } = useGetRoomsQuery({});
  const [checkAvailabilityVisible, setCheckAvailabilityVisible] =
    useState(false);
  const [makeAvailableVisible, setMakeAvailableVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // console.log(JSON.stringify(getRooms?.results, null, 2), "get-rooms updated");

  return (
    <>
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          All rooms
        </Text>

        {/* Room List */}
        <View className="flex-col">
          {getRooms?.results?.map((item: any) => (
            <View
              key={item.id}
              className="w-full bg-white rounded-lg shadow-lg mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 8,
              }}
            >
              {/* Room Image Placeholder */}
              <View className="h-32 bg-gray-300 rounded-t-lg relative overflow-hidden">
                {/* Mountain shapes */}
                <View className="absolute bottom-0 left-0 right-0">
                  <View className="flex-row">
                    <View className="w-20 h-16 bg-gray-100 rounded-tl-full" />
                    <View className="w-24 h-20 bg-white rounded-tl-full -ml-2" />
                    <View className="w-28 h-12 bg-gray-100 rounded-tl-full -ml-3" />
                    <View className="flex-1 h-8 bg-white -ml-2" />
                  </View>
                </View>
                {/* Sun */}
                <View className="absolute top-4 left-4 w-6 h-6 bg-white rounded-full" />
              </View>

              {/* Room Details */}
              <View className="p-4">
                <Text
                  className="text-lg font-bold text-gray-900 mb-2"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                  Price Per Night: ৳ {item.price_per_night}
                </Text>
                <Text className="text-sm text-gray-600 mb-4">
                  Bed Type: {item.bed_type}
                </Text>

                {/* Buttons */}
                <View>
                  <TouchableOpacity
                    className={`py-2 px-4 rounded-md mb-2 bg-yellow-400`}
                    onPress={() => {
                      setSelectedRoom(item);
                      setCheckAvailabilityVisible(true);
                    }}
                  >
                    <Text className="text-center text-black font-medium text-sm">
                      Check Availability
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-white border border-gray-300 py-2 px-4 rounded-md"
                    onPress={() => {
                      setSelectedRoom(item);
                      setMakeAvailableVisible(true);
                    }}
                  >
                    <Text className="text-center text-black font-medium text-sm">
                      Make Available
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <CheckAvailabilityModal
        visible={checkAvailabilityVisible}
        onClose={() => setCheckAvailabilityVisible(false)}
        room={selectedRoom}
      />
      <MakeAvailableModal
        visible={makeAvailableVisible}
        onClose={() => setMakeAvailableVisible(false)}
        room={selectedRoom}
        selectedRoom={selectedRoom?.id}
      />
    </>
  );
};

export default RoomList;
