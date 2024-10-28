import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";

export default function NewList() {
  const [listName, setListName] = useState("");

  const handleCreateList = () => {
    if (listName.trim() === "") {
      Alert.alert("Error", "Por favor, ingresa un nombre para la lista.");
    } else {
      // Aquí puedes manejar la creación de la lista
      Alert.alert("Lista Creada", `La lista "${listName}" ha sido creada.`);
      setListName(""); // Limpia el campo de entrada
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Lista</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la lista"
        placeholderTextColor="#B0B0B0"
        value={listName}
        onChangeText={setListName}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateList}>
        <Text style={styles.buttonText}>Crear Lista</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#EAEAEA",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#333333",
    borderColor: "#006D77",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#EAEAEA",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#006D77",
    borderRadius: 10,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
