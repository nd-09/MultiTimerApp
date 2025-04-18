import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TimerProvider } from "./src/contexts/TimerContext";
import {HomeScreen} from "./src/screens/HomeScreen";
import AddTimerScreen from "./src/screens/AddTimerScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import { PlusCircle, Clock, History } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === "Home") return <Clock color={color} size={size} />;
              if (route.name === "Add") return <PlusCircle color={color} size={size} />;
              if (route.name === "History") return <History color={color} size={size} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add" component={AddTimerScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}