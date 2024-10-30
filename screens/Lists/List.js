import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import {
  insertProduct,
  getProducts,
  markProductAsDeleted,
  restProducts,
  updateProduct,
} from "../../database/db";
import Icon from "react-native-vector-icons/Ionicons";
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newEstimatedPrice, setNewEstimatedPrice] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      getProducts((productsFromDB) => {
        setProducts(Array.isArray(productsFromDB) ? productsFromDB : []);
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleAddProduct = () => {
    setAddModalVisible(false);
    addProduct();
  };

  const addProduct = () => {
    console.log("Valores de producto antes de la validación:", {
      newProductName,
      newProductPrice,
      newProductQuantity,
      newEstimatedPrice,
    });
    insertProduct(
      newProductName,
      parseFloat(newProductPrice) || 0,
      parseFloat(newProductQuantity) || 0,
      parseFloat(newEstimatedPrice) || 0,
      "active",
    )
      .then(() => {
        console.log("Producto añadido, recargando productos...");
        loadProducts();
      })
      .catch((error) => {
        console.error("Error al añadir producto:", error);
      });

    resetAddModalFields();
    return true; // Indica que el producto fue añadido correctamente
  };

  const resetAddModalFields = () => {
    setNewProductName("");
    setNewProductPrice("");
    setNewProductQuantity("");
    setNewEstimatedPrice("");
  };

  const deleteProduct = (id) => {
    markProductAsDeleted(id);
    updateProductState(id, "deleted");
  };

  const restoreProductItem = (id) => {
    restProducts(id);
    updateProductState(id, "active");
  };

  const updateProductState = (id, newState) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, state: newState } : product,
      ),
    );
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setEditModalVisible(true);
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      updateProduct(
        editingProduct.id,
        editingProduct.name,
        editingProduct.price,
        editingProduct.quantity,
        editingProduct.estimatedPrice,
      )
        .then(() => {
          setEditingProduct(null);
          setEditModalVisible(false);
        })
        .catch((error) => {
          console.error("Error al editar producto:", error);
        });
    }
    loadProducts();
  };

  const totalEstimatedCost = products.reduce(
    (sum, product) =>
      product.state !== "deleted" // Solo sumar productos no eliminados
        ? sum + (product.estimatedPrice || 0) * (product.quantity || 0)
        : sum,
    0,
  );

  const totalCost = products.reduce(
    (sum, product) =>
      product.state !== "deleted" // Solo sumar productos no eliminados
        ? sum + (product.price || 0) * (product.quantity || 0)
        : sum,
    0,
  );

  const renderItem = (item) => {
    const isDeleted = item.state === "deleted";

    return (
      <View style={styles.item} key={item.id}>
        <Text style={[styles.name, isDeleted && styles.deletedName]}>
          {item.name}
        </Text>
        <View style={styles.quantityContainer}>
          {["quantity", "price", "estimatedPrice"].map((field) => (
            <View style={styles.inputGroup} key={field}>
              <Text style={styles.inputLabel}>
                {field === "quantity"
                  ? "Cantidad"
                  : field === "price"
                    ? "Precio"
                    : "Precio Estimado"}
              </Text>
              <Text style={styles.inputValue}>
                {item[field]?.toString() || "0"}
              </Text>
            </View>
          ))}
          <Icon
            name="trash-bin-outline"
            size={25}
            color="#D9534F"
            onPress={() => deleteProduct(item.id)}
            style={styles.deleteIcon}
          />
          <Icon
            name="pencil-outline"
            size={25}
            color="#FFC107"
            onPress={() => startEditing(item)}
            style={styles.editIcon}
          />
        </View>
        {isDeleted && (
          <TouchableOpacity
            onPress={() => restoreProductItem(item.id)}
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
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            setAddModalVisible(true);
            resetAddModalFields(); // Limpiar campos del modal de agregar
          }}
        >
          <Icon name="add-circle-outline" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <AddProductModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddProduct={handleAddProduct}
        newProductName={newProductName}
        setNewProductName={setNewProductName}
        newProductPrice={newProductPrice}
        setNewProductPrice={setNewProductPrice}
        newProductQuantity={newProductQuantity}
        setNewProductQuantity={setNewProductQuantity}
        newEstimatedPrice={newEstimatedPrice}
        setNewEstimatedPrice={setNewEstimatedPrice}
      />
      <EditProductModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEditProduct={handleEditProduct}
        product={editingProduct}
        setProduct={setEditingProduct}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Costo Total : ${totalCost?.toFixed(2) || 0}
        </Text>
        <Text style={styles.totalText}>
          Costo Total Estimado: $
          {typeof totalEstimatedCost === "number"
            ? totalEstimatedCost.toFixed(2)
            : parseFloat(totalEstimatedCost || 0).toFixed(2)}
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
    color: "red",
  },
  inputValue: {
    width: 52,
    backgroundColor: "#3C3C3C",
    color: "#FFFFFF",
    borderRadius: 5,
    padding: 5,
    textAlign: "center", // Centrar el texto en el campo
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    color: "#FFFFFF",
    marginBottom: 3,
    textAlign: "center",
  },
  deleteIcon: {
    marginLeft: 10,
  },
  editIcon: {
    marginLeft: 10,
  },
  restoreButton: {
    marginTop: 5,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  restoreButtonText: {
    color: "#FFFFFF",
    marginLeft: 5,
  },
  addButtonContainer: {
    backgroundColor: "#006D77",
    borderRadius: 50,
    padding: 15,
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: "#2E2E2E",
    borderRadius: 10,
    padding: 10,
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ProductListScreen;
