import React, { useState } from "react";
import { View } from "react-native";
import { ThemedView } from "./ThemedView";
import { Header } from "./ui/Header";
import { Sidebar } from "./ui/Sidebar";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemedView className="flex-1 bg-white">
      <Header onMenuPress={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <View className="flex-1 p-4">{/* Add your main content here */}</View>
    </ThemedView>
  );
}
