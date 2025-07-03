import HomePage from "@/components/HomePage";
import LoginScreen from "@/components/LoginScreen";
import {
  selectToken,
  userLoggedIn,
} from "@/redux/feature/authentication/authenticationSlice";
import { store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../global.css";

// Optional: basic NativeBase theme (can remove or customize later)
const theme = extendTheme({});

function AuthGate() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const hydrateAuth = async () => {
      const authData = await AsyncStorage.getItem("auth");
      if (authData) {
        const { token, user } = JSON.parse(authData);
        if (token && user) {
          dispatch(userLoggedIn({ token, user }));
        }
      }
    };
    hydrateAuth();
  }, [dispatch]);
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
