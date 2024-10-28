import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import {
  inserProduct,
  getProducts,
  markProductAsDeleted,
  restProducts,
} from "../../database/db";
import Icon from "react-native-vector-icons/Ionicons";
import AddProductModal from "../../components/AddProductModal";
const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddProduct = () => {
    setModalVisible(false);
    addProduct(); // Esta es tu función para agregar el producto.
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    getProducts((productsFromDB) => {
      setProducts(Array.isArray(productsFromDB) ? productsFromDB : []);
    });
  };

  const totalEstimatedCost = products.reduce(
    (sum, product) => sum + (product.estimatedPrice || 0),
    0,
  );

  const totalCost = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const updatePrice = (id, newPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, price: parseFloat(newPrice) || 0 }
          : product,
      ),
    );
  };

  const updateQuantity = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, parseInt(newQuantity) || 0) }
          : product,
      ),
    );
  };

  const updateEstimatedPrice = (id, newEstimatedPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, estimatedPrice: parseFloat(newEstimatedPrice) || 0 }
          : product,
      ),
    );
  };

  const addProduct = () => {
    if (newProductName && newProductPrice) {
      const newProduct = {
        id: Math.random().toString(),
        name: newProductName,
        price: parseFloat(newProductPrice) || 0,
        quantity: 0,
        estimatedPrice: 0,
        state: "active", // Añadir estado aquí
      };
      inserProduct(
        newProduct.name,
        newProduct.price,
        newProduct.quantity,
        newProduct.estimatedPrice,
        newProduct.state,
      );
      loadProducts();
      setNewProductName("");
      setNewProductPrice("");
    }
  };

  const deleteProduct = (id) => {
    markProductAsDeleted(id); // Marca el producto como eliminado en la base de datos
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, state: "deleted" } : product,
      ),
    );
  };

  const restoreProduct = (id) => {
    restProducts(id); // Llama a la función para restaurar en la base de datos
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, state: "active" } : product,
      ),
    );
  };

  const renderItem = (item) => {
    const isDeleted = item.state === "deleted";

    return (
      <View style={styles.item} key={item.id}>
        <Text style={[styles.name, isDeleted && styles.deletedName]}>
          {item.name}
        </Text>
        <View style={styles.quantityContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cantidad</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.quantity ? item.quantity.toString() : "0"}
              onChangeText={(text) => updateQuantity(item.id, text)}
              placeholder="Cantidad"
              editable={!isDeleted} // Habilitar solo si no está eliminado
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Precio Estimado</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.price ? item.price.toString() : "0"}
              onChangeText={(text) => updatePrice(item.id, text)}
              placeholder="Precio"
              editable={!isDeleted}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Precio</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.estimatedPrice ? item.estimatedPrice.toString() : "0"}
              onChangeText={(text) => updateEstimatedPrice(item.id, text)}
              placeholder="Precio Estimado"
              editable={!isDeleted}
            />
          </View>
          <Icon
            name="trash-bin-outline"
            size={25}
            color="#D9534F"
            onPress={() => deleteProduct(item.id)}
            style={styles.deleteIcon}
          />
        </View>
        {isDeleted && (
          <TouchableOpacity
            onPress={() => restoreProduct(item.id)}
            style={styles.restoreButton}
          >
            <Icon name="arrow-undo-outline" size={20} color="#FFFFFF" />
            <Text style={styles.restoreButtonText}> Restaurar Producto</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {products.map((product) => renderItem(product))}
      </ScrollView>
      <View style={styles.addButton}>
        <TouchableOpacity style={styles.addButtonContainer}>
          <Icon
            name="add-circle-outline"
            size={25}
            color="#FFFFFF"
            onPress={() => setModalVisible(true)}
          />
        </TouchableOpacity>
      </View>
      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddProduct={handleAddProduct}
        newProductName={newProductName}
        setNewProductName={setNewProductName}
        newProductPrice={newProductPrice}
        setNewProductPrice={setNewProductPrice}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Costo Total : ${totalCost.toFixed(2)}
        </Text>
        <Text style={styles.totalText}>
          Costo Total Estimado: ${totalEstimatedCost.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 25,
    paddingBottom: 80,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#2E2E2E",
    borderRadius: 10,
    padding: 7,
    marginVertical: 10,
    elevation: 3,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  deletedName: {
    textDecorationLine: "line-through",
    color: "red", // Color para nombre eliminado
  },
  input: {
    width: 52,
    backgroundColor: "#3C3C3C",
    color: "#FFFFFF",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    marginHorizontal: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  totalContainer: {
    marginTop: 20,
    padding: 5,
    backgroundColor: "#006D77",
    borderRadius: 10,
    alignItems: "center",
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  newProductContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newInput: {
    flex: 1,
    backgroundColor: "#3C3C3C",
    color: "#FFFFFF",
    borderRadius: 5,
    padding: 0,
    marginHorizontal: 3,
  },
  deleteIcon: {
    marginLeft: 5,
  },
  restoreButton: {
    backgroundColor: "#006D77",
    borderRadius: 5,
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  restoreButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
  addButton: {
    bottom: 0,
    right: 0,
  },
  addButtonContainer: {
    backgroundColor: "#006D77",
    borderRadius: 10,
    elevation: 3,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});

export default ProductListScreen;
