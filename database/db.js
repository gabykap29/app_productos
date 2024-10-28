import * as SQLite from "expo-sqlite";

// Abrir o crear una base de datos de forma asíncrona
const db = SQLite.openDatabaseAsync("product");

const createTable = async () => {
  try {
    (await db).execAsync(
      "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, quantity INTEGER, stimatedPrice REAL, state TEXT)",
    );
  } catch (error) {
    console.error("Error creando tabla:", error);
  }
};

// Ejecutar la creación de la tabla al iniciar el módulo
createTable();

// Función para insertar un producto
const inserProduct = async (name, price, quantity, stimatedPrice, state) => {
  try {
    (await db).runAsync(
      "INSERT INTO products (name, price, stimatedPrice, quantity, state) VALUES (?, ?, ?, ?, ?)",
      [name, price, quantity, stimatedPrice, state],
    );
    console.log("Producto insertado");
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
    }));

    callback(products);
  } catch (error) {
    console.error("Error en getProducts:", error);
  }
};
const restProducts = async (id) => {
  try {
    const result = await (
      await db
    ).runAsync("UPDATE products SET state = 'active' WHERE id = ?", [id]);
    console.log(result);
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

export { inserProduct, getProducts, markProductAsDeleted, restProducts };
