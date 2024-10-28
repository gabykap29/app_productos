import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import ProductListScreen from "../Lists/List";

export default function Home() {
  return (
    <View style={styles.container}>
      <Button title="Ver Lista" onPress={() => console.log("Nueva Lista")} />
      <StatusBar style="auto" />
    </View>
  );
}
//<Button title="Ver listas" onPress={() => console.log("Ver listas")} />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
