import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home/Home";
import Icon from "react-native-vector-icons/Ionicons";
import NewList from "./screens/Lists/NewList";
import ProductList from "./screens/Lists/List";

const Tab = createBottomTabNavigator();

const IconName = ({ name, size, color }) => (
  <Icon name={name} size={size} color={color} />
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 0,
            backgroundColor: "#1E1E1E",
            borderRadius: 15,
            height: 60,
            ...styles.shadow,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <IconName name="home-outline" size={size} color={color} />
            ),
            tabBarActiveTintColor: "#006D77",
            tabBarInactiveTintColor: "#B0B0B0",
          }}
        />

        <Tab.Screen
          name="ProductList"
          component={ProductList}
          options={{
            tabBarLabel: "Lista de Productos",
            tabBarIcon: ({ color, size }) => (
              <IconName name="add-outline" size={size} color={color} />
            ),
            tabBarActiveTintColor: "#006D77",
            tabBarInactiveTintColor: "#B0B0B0",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Estilos adicionales para la sombra
const styles = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
};
