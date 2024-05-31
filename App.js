import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./Components/Home";
import Combo from "./Components/Combo";
import Cart from "./Components/Cart";
import Account from "./Components/Account";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Item from "./Components/Item";
import Order from "./Components/Order";

const Stack = createNativeStackNavigator();

export default function App() {
  enableScreens();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            animation: "none",
          }}
        >
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Combo}
            name="Combo"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Cart}
            name="Cart"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Account}
            name="Account"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Signup}
            name="Signup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Login}
            name="Login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Item}
            name="Item"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Order}
            name="Order"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
