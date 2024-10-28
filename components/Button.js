import { TouchableHighlight, Text, StyleSheet, View } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor="#004d4d" // Color al presionar
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006D77",
    borderRadius: 25,
    width: 200,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Sombra en Android
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1, // Borde adicional
    borderColor: "#004d4d", // Color del borde
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase", // Texto en mayúsculas
  },
});

export default Button;
