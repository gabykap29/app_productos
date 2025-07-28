import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
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
    <>
      <StatusBar style="light" backgroundColor="#121212" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIconStyle: styles.tabBarIconStyle,
            tabBarActiveTintColor: "#006D77",
            tabBarInactiveTintColor: "#B0B0B0",
            tabBarHideOnKeyboard: true, // Oculta la barra cuando aparece el teclado
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Inicio",
              tabBarIcon: ({ color, size, focused }) => (
                <IconName
                  name={focused ? "home" : "home-outline"}
                  size={focused ? size + 2 : size}
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="ProductList"
            component={ProductList}
            options={{
              tabBarLabel: "Productos",
              tabBarIcon: ({ color, size, focused }) => (
                <IconName
                  name={focused ? "list" : "list-outline"}
                  size={focused ? size + 2 : size}
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="NewList"
            component={NewList}
            options={{
              tabBarLabel: "Nueva Lista",
              tabBarIcon: ({ color, size, focused }) => (
                <IconName
                  name={focused ? "add-circle" : "add-circle-outline"}
                  size={focused ? size + 2 : size}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 25 : 45, // Diferente posición para iOS y Android
    left: 20,
    right: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 25,
    height: Platform.OS === "ios" ? 70 : 65,
    paddingBottom: Platform.OS === "ios" ? 30 : 10,
    paddingTop: 10,
    borderTopWidth: 0, // Remover borde superior por defecto
    // Sombra mejorada
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 16,
    // Borde sutil
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: Platform.OS === "ios" ? -5 : 2,
    marginBottom: Platform.OS === "ios" ? 0 : 5,
  },
  tabBarIconStyle: {
    marginTop: Platform.OS === "ios" ? 5 : 0,
  },
});
