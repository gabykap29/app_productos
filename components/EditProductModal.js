import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const EditProductModal = ({
                            visible,
                            onClose,
                            onEditProduct,
                            product,
                            setProduct,
                          }) => {
  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handlePriceChange = (text) => handleChange("price", text);
  const handleEstimatedPriceChange = (text) => handleChange("estimatedPrice", text);

  return (
      <Modal
          transparent={true}
          visible={visible}
          animationType="slide"
          onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Editar Producto</Text>

            <View style={styles.inputGroup}>
              <FontAwesome5 name="tag" size={16} color="#FFF" style={styles.icon} />
              <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  placeholderTextColor="#AAA"
                  value={product?.name}
                  onChangeText={(text) => handleChange("name", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <FontAwesome5 name="dollar-sign" size={16} color="#FFF" style={styles.icon} />
              <TextInput
                  style={styles.input}
                  placeholder="Precio"
                  placeholderTextColor="#AAA"
                  keyboardType="decimal-pad"
                  value={product?.price}
                  onChangeText={handlePriceChange}
              />
            </View>

            <View style={styles.inputGroup}>
              <MaterialIcons name="format-list-numbered" size={20} color="#FFF" style={styles.icon} />
              <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  placeholderTextColor="#AAA"
                  keyboardType="numeric"
                  value={product?.quantity?.toString()}
                  onChangeText={(text) =>
                      handleChange("quantity", parseInt(text) || 0)
                  }
              />
            </View>

            <View style={styles.inputGroup}>
              <FontAwesome5 name="calculator" size={16} color="#FFF" style={styles.icon} />
              <TextInput
                  style={styles.input}
                  placeholder="Precio Estimado"
                  placeholderTextColor="#AAA"
                  keyboardType="decimal-pad"
                  value={product?.estimatedPrice}
                  onChangeText={handleEstimatedPriceChange}
              />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const priceFloat = parseFloat(product.price) || 0;
                  const estimatedPriceFloat = parseFloat(product.estimatedPrice) || 0;
                  onEditProduct({
                    ...product,
                    price: priceFloat,
                    estimatedPrice: estimatedPriceFloat,
                  });
                }}
            >
              <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#2E2E2E",
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C3C3C",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    height: 45,
  },
  button: {
    backgroundColor: "#006D77",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#D9534F",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default EditProductModal;
