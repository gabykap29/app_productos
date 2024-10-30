import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AddProductModal = ({
  visible,
  onClose,
  onAddProduct,
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  newProductQuantity, // Nuevo prop para la cantidad
  setNewProductQuantity, // Función para establecer la cantidad
  newEstimatedPrice, // Nuevo prop para el precio estimado
  setNewEstimatedPrice, // Función para establecer el precio estimado
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Agregar Producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            placeholderTextColor="#AAAAAA"
            value={newProductName}
            onChangeText={setNewProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio Estimado"
            placeholderTextColor="#AAAAAA"
            keyboardType="numeric"
            value={newEstimatedPrice} // Usar el nuevo prop
            onChangeText={setNewEstimatedPrice} // Usar la función para establecer el precio estimado
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor="#AAAAAA"
            keyboardType="numeric"
            value={newProductQuantity} // Usar el nuevo prop
            onChangeText={setNewProductQuantity} // Usar la función para establecer la cantidad
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onAddProduct} style={styles.addButton}>
              <Text style={styles.textAddButton}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#2E2E2E",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "#3C3C3C",
    color: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: "#dc2626",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#006D77", // Cambié a un color azul más común para botones
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textAddButton: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
});

export default AddProductModal;
