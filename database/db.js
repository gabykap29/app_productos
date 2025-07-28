import * as SQLite from "expo-sqlite";

// Abrir o crear una base de datos de forma asíncrona
const db = SQLite.openDatabaseAsync("product");

const createTable = async () => {
  try {
    (await db).execAsync(
      `CREATE TABLE IF NOT EXISTS products (
                                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                                               name TEXT,
                                               price REAL,
                                               quantity INTEGER,
                                               estimatedPrice REAL,
                                               state TEXT,
                                               label TEXT
         )`,
    );
    console.log("Tabla creada o ya existe");
  } catch (error) {
    console.error("Error creando tabla:", error);
  }
};

// Ejecutar la creación de la tabla al iniciar el módulo
createTable();

// Función para insertar un producto
const insertProduct = async (
  name,
  price = 0,
  quantity,
  estimatedPrice,
  state,
  label,
) => {
  try {
    await (
      await db
    ).runAsync(
      "INSERT INTO products (name, price, quantity, estimatedPrice, state, label) VALUES (?, ?, ?, ?, ?, ?)",
      [name, price, quantity, estimatedPrice, state, label],
    );
    console.log(
      "Producto insertado",
      name,
      price,
      quantity,
      estimatedPrice,
      state,
      label,
    );
  } catch (error) {
    console.error("Error insertando producto:", error);
  }
};

// Función para obtener productos
const getProducts = async (callback) => {
  try {
    const rows = await (await db).getAllAsync("SELECT * FROM products");

    const products = rows.map((product) => ({
      ...product,
      price: product.price ? parseFloat(product.price).toFixed(2) : "0.00",
      quantity: product.quantity || 0,
      estimatedPrice: product.estimatedPrice
        ? parseFloat(product.estimatedPrice).toFixed(2)
        : "0.00",
    }));

    callback(products);
  } catch (error) {
    console.error("Error en getProducts:", error);
  }
};

const restProducts = async (id) => {
  try {
    await (
      await db
    ).runAsync("UPDATE products SET state = 'active' WHERE id = ?", [id]);
    console.log("Producto restaurado");
  } catch (error) {
    console.log("error restaurando", error);
  }
};

const markProductAsDeleted = async (id) => {
  try {
    await (
      await db
    ).runAsync("UPDATE products SET state = 'deleted' WHERE id = ?", [id]);
    console.log("Producto marcado como eliminado");
  } catch (error) {
    console.error("Error marcando producto como eliminado:", error);
  }
};

const updateProduct = async (
  id,
  name,
  price,
  quantity,
  estimatedPrice,
  label,
) => {
  try {
    await (
      await db
    ).runAsync(
      "UPDATE products SET name = ?, price = ?, quantity = ?, estimatedPrice = ?, label = ? WHERE id = ?",
      [name, price, quantity, estimatedPrice, label, id],
    );
    console.log(
      "Producto actualizado con los datos: ",
      id,
      name,
      price,
      quantity,
      estimatedPrice,
    );
  } catch (error) {
    console.error("Error actualizando producto:", error);
  }
};

const deleteAllProducts = async () => {
  try {
    await (await db).runAsync("DELETE FROM products");
  } catch (error) {
    console.error("Error al eliminar los productos! ", error);
  }
};

export {
  insertProduct,
  getProducts,
  markProductAsDeleted,
  restProducts,
  updateProduct,
  deleteAllProducts,
};
