import HomePage from "@/components/HomePage";
import LoginScreen from "@/components/LoginScreen";
import { selectToken } from "@/redux/feature/authentication/authenticationSlice";
import { store } from "@/redux/store";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider, useSelector } from "react-redux";
import "../global.css";

// Optional: basic NativeBase theme (can remove or customize later)
const theme = extendTheme({});

function AuthGate() {
  const token = useSelector(selectToken);
  console.log(token, "get-tokennnn");
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
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <StatusBar style="auto" translucent />
        <AuthGate />
        <Toast />
      </Provider>
    </NativeBaseProvider>
  );
}
