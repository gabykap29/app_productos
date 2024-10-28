// .eslintrc.js
module.exports = {
  extends: [
    "expo", // Configuración base de Expo
    "plugin:prettier/recommended", // Añade Prettier e integra sus reglas con ESLint
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error", // Muestra errores para problemas de estilo detectados por Prettier
  },
};
