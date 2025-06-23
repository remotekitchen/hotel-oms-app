import HomePage from "@/components/HomePage";
import LoginScreen from "@/components/LoginScreen";
import { selectToken } from "@/redux/feature/authentication/authenticationSlice";
import { store } from "@/redux/store";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider, useSelector } from "react-redux";
import { NativeBaseProvider, extendTheme } from "native-base";
import "../global.css";

// Optional: basic NativeBase theme (can remove or customize later)
const theme = extendTheme({});

function AuthGate() {
  const token = useSelector(selectToken);
  return token ? <HomePage /> : <LoginScreen />;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <StatusBar style="auto" translucent />
        <AuthGate />
        <Toast />
      </NativeBaseProvider>
    </Provider>
  );
}
