import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styleModal";

const AddProductModal = ({
  visible,
  onClose,
  onAddProduct,
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  newProductQuantity,
  setNewProductQuantity,
  newEstimatedPrice,
  setNewEstimatedPrice,
  selectedLabel,
  setSelectedLabel,
}) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!newProductName.trim())
      newErrors.name = "El nombre del producto es requerido";
    if (!newProductQuantity || parseFloat(newProductQuantity) <= 0)
      newErrors.quantity = "La cantidad debe ser mayor a 0";
    if (!newEstimatedPrice || parseFloat(newEstimatedPrice) <= 0)
      newErrors.estimatedPrice = "El precio estimado debe ser mayor a 0";
    if (!selectedLabel) newErrors.business = "Selecciona un negocio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = () => {
    if (validateFields()) {
      onAddProduct();
      setSelectedLabel("");
      setErrors({});
    }
  };

  const handleClose = () => {
    setSelectedLabel("");
    setErrors({});
    onClose();
  };

  const clearField = (fieldSetter) => fieldSetter("");

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.backdrop} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Agregar Producto</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
                <Icon name="close" size={28} color="#CCCCCC" />
              </TouchableOpacity>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              {/* Nombre */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  Nombre del producto <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="cube-outline"
                    size={20}
                    color="#CCCCCC"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Ej: Café molido, Leche, Pan"
                    placeholderTextColor="#888888"
                    value={newProductName}
                    onChangeText={(text) => {
                      setNewProductName(text);
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                  />
                  {newProductName.length > 0 && (
                    <TouchableOpacity
                      onPress={() => clearField(setNewProductName)}
                      style={styles.clearButton}
                    >
                      <Icon name="close-circle" size={20} color="#888888" />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Cantidad */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  Cantidad <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="layers-outline"
                    size={20}
                    color="#CCCCCC"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, errors.quantity && styles.inputError]}
                    placeholder="Ej: 2, 1.5, 10"
                    placeholderTextColor="#888888"
                    keyboardType="numeric"
                    value={newProductQuantity}
                    onChangeText={(text) => {
                      setNewProductQuantity(text);
                      if (errors.quantity)
                        setErrors({ ...errors, quantity: null });
                    }}
                  />
                  {newProductQuantity.length > 0 && (
                    <TouchableOpacity
                      onPress={() => clearField(setNewProductQuantity)}
                      style={styles.clearButton}
                    >
                      <Icon name="close-circle" size={20} color="#888888" />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.quantity && (
                  <Text style={styles.errorText}>{errors.quantity}</Text>
                )}
              </View>

              {/* Precio estimado */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  Precio estimado <Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <Icon
                    name="cash-outline"
                    size={20}
                    color="#CCCCCC"
                    style={styles.inputIcon}
                  />
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.priceInput,
                      errors.estimatedPrice && styles.inputError,
                    ]}
                    placeholder="0.00"
                    placeholderTextColor="#888888"
                    keyboardType="numeric"
                    value={newEstimatedPrice}
                    onChangeText={(text) => {
                      setNewEstimatedPrice(text);
                      if (errors.estimatedPrice)
                        setErrors({ ...errors, estimatedPrice: null });
                    }}
                  />
                  {newEstimatedPrice.length > 0 && (
                    <TouchableOpacity
                      onPress={() => clearField(setNewEstimatedPrice)}
                      style={styles.clearButton}
                    >
                      <Icon name="close-circle" size={20} color="#888888" />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.estimatedPrice && (
                  <Text style={styles.errorText}>{errors.estimatedPrice}</Text>
                )}
              </View>

              {/* Selector negocio */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  Negocio <Text style={styles.required}>*</Text>
                </Text>
                <View
                  style={[
                    styles.pickerContainer,
                    errors.business && styles.inputError,
                  ]}
                >
                  <Icon
                    name="storefront-outline"
                    size={20}
                    color="#CCCCCC"
                    style={styles.pickerIcon}
                  />
                  <Picker
                    selectedValue={selectedLabel}
                    onValueChange={(itemValue) => {
                      setSelectedLabel(itemValue);
                      if (errors.business)
                        setErrors({ ...errors, business: null });
                    }}
                    dropdownIconColor="#CCCCCC"
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecciona un negocio..." value="" />
                    <Picker.Item label="🏪 El Pibe" value="El_Pibe" />
                    <Picker.Item label="🏬 Friar" value="Friar" />
                    <Picker.Item label="🏢 APA" value="APA" />
                    <Picker.Item label="🏢 Otros" value="Otros" />
                  </Picker>
                </View>
                {errors.business && (
                  <Text style={styles.errorText}>{errors.business}</Text>
                )}
              </View>

              {/* Info negocio */}
              {selectedLabel && (
                <View style={styles.businessInfo}>
                  <Icon name="checkmark-circle" size={18} color="#4CAF50" />
                  <Text style={styles.businessInfoText}>
                    Negocio {selectedLabel} seleccionado
                  </Text>
                </View>
              )}
            </View>

            {/* Botones */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.cancelButton}
              >
                <Icon name="close-outline" size={20} color="#FFFFFF" />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddProduct}
                style={styles.addButton}
              >
                <Icon name="add-outline" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddProductModal;
