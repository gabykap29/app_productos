import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Button from "../../components/Button";
import {
  insertProduct,
  getProducts,
  markProductAsDeleted,
  restProducts,
  updateProduct, deleteAllProducts,
} from "../../database/db";
import Icon from "react-native-vector-icons/Ionicons";
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(""); // Nuevo estado para filtro por label
  const [selectedBusiness, setSelectedBusiness] = useState(""); // Nuevo estado para filtro por negocio
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

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, showDeleted, selectedLabel, selectedBusiness]); // Agregamos selectedBusiness a las dependencias

  const loadProducts = async () => {
    try {
      getProducts((productsFromDB) => {
        setProducts(Array.isArray(productsFromDB) ? productsFromDB : []);
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filtrar por estado (mostrar eliminados o no)
    if (!showDeleted) {
      filtered = filtered.filter((product) => product.state !== "deleted");
    }

    // Filtrar por label
    if (selectedLabel) {
      filtered = filtered.filter(
        (product) => product.label?.toString() === selectedLabel,
      );
    }

    // Filtrar por negocio
    if (selectedBusiness) {
      filtered = filtered.filter(
        (product) => product.business?.toString() === selectedBusiness,
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  };

  // Función para obtener labels únicos de los productos
  const getUniqueLabels = () => {
    const labels = products
      .map((product) => product.label?.toString())
      .filter((label) => label && label !== "")
      .filter((label, index, self) => self.indexOf(label) === index)
      .sort((a, b) => parseInt(a) - parseInt(b));
    return labels;
  };

  // Función para obtener negocios únicos de los productos
  const getUniqueBusinesses = () => {
    const businesses = products
      .map((product) => product.label?.toString())
      .filter((business) => business && business !== "")
      .filter((business, index, self) => self.indexOf(business) === index)
      .sort((a, b) => parseInt(a) - parseInt(b));
    return businesses;
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
      selectedLabel,
    });
    insertProduct(
      newProductName,
      parseFloat(newProductPrice) || 0,
      parseFloat(newProductQuantity) || 0,
      parseFloat(newEstimatedPrice) || 0,
      "active",
      selectedLabel,
    )
      .then(() => {
        console.log("Producto añadido, recargando productos...");
        loadProducts();
      })
      .catch((error) => {
        console.error("Error al añadir producto:", error);
      });

    resetAddModalFields();
    return true;
  };

  const resetAddModalFields = () => {
    setNewProductName("");
    setNewProductPrice("");
    setNewProductQuantity("");
    setNewEstimatedPrice("");
  };

  const deleteProduct = (id, productName) => {
    Alert.alert(
      "Eliminar Producto",
      `¿Estás seguro de que quieres eliminar "${productName}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            markProductAsDeleted(id);
            updateProductState(id, "deleted");
          },
        },
      ],
    );
  };

  const restoreProductItem = (id, productName) => {
    Alert.alert("Restaurar Producto", `¿Quieres restaurar "${productName}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Restaurar",
        onPress: () => {
          restProducts(id);
          updateProductState(id, "active");
        },
      },
    ]);
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
        editingProduct.label,
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
      product.state !== "deleted"
        ? sum +
          parseFloat(product.estimatedPrice || 0) *
            parseFloat(product.quantity || 0)
        : sum,
    0,
  );

  const totalCost = products.reduce(
    (sum, product) =>
      product.state !== "deleted"
        ? sum +
          parseFloat(product.price || 0) * parseFloat(product.quantity || 0)
        : sum,
    0,
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLabel("");
    setSelectedBusiness("");
    setShowDeleted(false);
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#CCCCCC"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          placeholderTextColor="#CCCCCC"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="close-circle" size={20} color="#CCCCCC" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScrollContainer}
      >
        {/* Filtro por eliminados */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            showDeleted && styles.filterButtonActive,
          ]}
          onPress={() => setShowDeleted(!showDeleted)}
        >
          <Icon
            name={showDeleted ? "eye-outline" : "eye-off-outline"}
            size={16}
            color={showDeleted ? "#006D77" : "#CCCCCC"}
          />
          <Text
            style={[
              styles.filterButtonText,
              showDeleted && styles.filterButtonTextActive,
            ]}
          >
            Eliminados
          </Text>
        </TouchableOpacity>

        {/* Filtros por label */}
        {getUniqueLabels().map((label) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.filterButton,
              styles.labelFilterButton,
              selectedLabel === label && styles.filterButtonActive,
            ]}
            onPress={() =>
              setSelectedLabel(selectedLabel === label ? "" : label)
            }
          >
            <Icon
              name="pricetag-outline"
              size={16}
              color={selectedLabel === label ? "#006D77" : "#CCCCCC"}
            />
            <Text
              style={[
                styles.filterButtonText,
                selectedLabel === label && styles.filterButtonTextActive,
              ]}
            >
              Label {label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Botón para limpiar filtros */}
        {(selectedLabel || showDeleted || searchQuery) && (
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={clearAllFilters}
          >
            <Icon name="refresh-outline" size={16} color="#FF5722" />
            <Text style={styles.clearFiltersButtonText}>Limpiar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );

  const renderItem = (item) => {
    const isDeleted = item.state === "deleted";
    const totalItemCost =
      parseFloat(item.price || 0) * parseFloat(item.quantity || 0);
    const totalEstimatedItemCost =
      parseFloat(item.estimatedPrice || 0) * parseFloat(item.quantity || 0);

    return (
      <View
        style={[styles.item, isDeleted && styles.deletedItem]}
        key={item.id}
      >
        <View style={styles.itemHeader}>
          <View style={styles.nameContainer}>
            <Text style={[styles.name, isDeleted && styles.deletedName]}>
              {item.name}
            </Text>
            {/* Mostrar label si existe */}
            {item.label && (
              <View style={styles.labelBadge}>
                <Text style={styles.labelBadgeText}>#{item.label}</Text>
              </View>
            )}
          </View>
          {isDeleted && (
            <View style={styles.deletedBadge}>
              <Text style={styles.deletedBadgeText}>ELIMINADO</Text>
            </View>
          )}
        </View>

        <View style={styles.itemContent}>
          <View style={styles.quantityContainer}>
            {["quantity", "price", "estimatedPrice"].map((field) => (
              <View style={styles.inputGroup} key={field}>
                <Text style={styles.inputLabel}>
                  {field === "quantity"
                    ? "Cantidad"
                    : field === "price"
                      ? "Precio"
                      : "Precio Est."}
                </Text>
                <View style={styles.inputValueContainer}>
                  <Text style={styles.inputValue}>
                    {field === "quantity"
                      ? item[field]?.toString() || "0"
                      : `${parseFloat(item[field] || 0).toFixed(2)}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.totalsRow}>
            <Text style={styles.totalItemText}>
              Total: ${totalItemCost.toFixed(2)}
            </Text>
            <Text style={styles.totalEstimatedItemText}>
              Est.: ${totalEstimatedItemCost.toFixed(2)}
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            {!isDeleted ? (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => startEditing(item)}
                >
                  <Icon name="pencil-outline" size={18} color="#FFC107" />
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteActionButton]}
                  onPress={() => deleteProduct(item.id, item.name)}
                >
                  <Icon name="trash-bin-outline" size={18} color="#D9534F" />
                  <Text
                    style={[
                      styles.actionButtonText,
                      styles.deleteActionButtonText,
                    ]}
                  >
                    Eliminar
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, styles.restoreActionButton]}
                onPress={() => restoreProductItem(item.id, item.name)}
              >
                <Icon name="arrow-undo-outline" size={18} color="#4CAF50" />
                <Text
                  style={[
                    styles.actionButtonText,
                    styles.restoreActionButtonText,
                  ]}
                >
                  Restaurar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="cube-outline" size={64} color="#666666" />
      <Text style={styles.emptyStateTitle}>
        {searchQuery || selectedLabel || selectedBusiness
          ? "No se encontraron productos"
          : showDeleted
            ? "No hay productos eliminados"
            : "No hay productos"}
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery || selectedLabel || selectedBusiness
          ? "Intenta con otros términos de búsqueda o filtros"
          : showDeleted
            ? "Los productos eliminados aparecerán aquí"
            : "Presiona el botón + para agregar tu primer producto"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderFilters()}

      <ScrollView contentContainerStyle={styles.list}>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => renderItem(product))
          : renderEmptyState()}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setAddModalVisible(true);
          resetAddModalFields();
        }}
      >
        <Icon name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.clearAllButton} // Asegúrate de definir este estilo
          onPress={() => {
            Alert.alert(
                "Eliminar todos los productos",
                "¿Estás seguro de que deseas eliminar TODOS los productos?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                      await deleteAllProducts();
                      await loadProducts();
                    },
                  },
                ]
            );
          }}
      >
        <Icon name="trash" size={18} color="#FFFFFF" />
      </TouchableOpacity>
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
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
      />

      <EditProductModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEditProduct={handleEditProduct}
        product={editingProduct}
        setProduct={setEditingProduct}
      />

      <View style={styles.totalContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Costo Total:</Text>
          <Text style={styles.totalValue}>
            ${totalCost?.toFixed(2) || "0.00"}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Costo Estimado:</Text>
          <Text style={styles.totalEstimatedValue}>
            $
            {typeof totalEstimatedCost === "number"
              ? totalEstimatedCost.toFixed(2)
              : parseFloat(totalEstimatedCost || 0).toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.differenceLabelText}>Diferencia:</Text>
          <Text
            style={[
              styles.differenceValue,
              totalEstimatedCost - totalCost >= 0
                ? styles.negativeValue
                : styles.positiveValue,
            ]}
          >
            ${Math.abs(totalEstimatedCost - totalCost).toFixed(2)}
            {totalEstimatedCost - totalCost >= 0 ? " ↑" : " ↓"}
          </Text>
        </View>
      </View>

    </View>
  );
};


export default ProductListScreen;
