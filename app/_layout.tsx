import HomePage from "@/components/HomePage";
import LoginScreen from "@/components/LoginScreen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { selectToken } from "@/redux/feature/authentication/authenticationSlice";
import { store } from "@/redux/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider, useSelector } from "react-redux";
import "../global.css";

function AuthGate() {
  const token = useSelector(selectToken);
  return token ? <HomePage /> : <LoginScreen />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* Ensure the StatusBar is shown and themed properly */}
        <StatusBar
          style={colorScheme === "dark" ? "dark" : "light"}
          translucent
        />
        <AuthGate />
        <Toast />
      </ThemeProvider>
    </Provider>
  );
}
