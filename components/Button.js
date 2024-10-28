import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Asegúrate de tener expo-linear-gradient instalada

const Button = ({ title, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.buttonContainer}
      onPress={onPress}
      underlayColor="#004d4d"
    >
      <LinearGradient
        colors={["#006D77", "#008080"]} // Gradiente de color
        style={styles.button}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    overflow: "hidden", // Hace que el gradiente siga la forma del botón
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 220,
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 7,
    borderWidth: 1,
    borderColor: "#004d4d",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default Button;
