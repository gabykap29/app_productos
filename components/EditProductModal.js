import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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

  const handlePriceChange = (text) => {
    // Permitir cualquier texto y solo convertir a float en el submit
    handleChange("price", text);
  };

  const handleEstimatedPriceChange = (text) => {
    // Permitir cualquier texto y solo convertir a float en el submit
    handleChange("estimatedPrice", text);
  };

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

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={product?.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="Precio"
            keyboardType="decimal-pad"
            value={product?.price} // Mantenerlo como texto
            onChangeText={handlePriceChange} // Usando la nueva función para manejar cambios
          />

          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={product?.quantity?.toString()}
            onChangeText={(text) =>
              handleChange("quantity", parseInt(text) || 0)
            }
          />

          <Text style={styles.label}>Precio Estimado</Text>
          <TextInput
            style={styles.input}
            placeholder="Precio Estimado"
            keyboardType="decimal-pad"
            value={product?.estimatedPrice} // Mantenerlo como texto
            onChangeText={handleEstimatedPriceChange} // Usando la nueva función para manejar cambios
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Convertir a float solo en el submit
              const priceFloat = parseFloat(product.price) || 0;
              const estimatedPriceFloat =
                parseFloat(product.estimatedPrice) || 0;
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#2E2E2E",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 15,
  },
  label: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#3C3C3C",
    color: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#006D77",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#D9534F",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default EditProductModal;
