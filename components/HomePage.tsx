import { userLoggedOut } from "@/redux/feature/authentication/authenticationSlice";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Welcome to HomePage!
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: "#f87171", padding: 16, borderRadius: 8 }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
