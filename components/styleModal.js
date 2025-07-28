import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    scrollContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    modalContainer: {
        width: "100%",
        maxWidth: 450, // Más ancho y proporcional
        backgroundColor: "#1F1F1F",
        borderRadius: 24, // Bordes más redondeados
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.15)",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24, // Más padding
        paddingTop: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    modalTitle: {
        fontSize: 24, // Título más grande
        fontWeight: "700",
        color: "#FFFFFF",
    },
    closeIcon: {
        padding: 8, // Área de toque más grande
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    form: {
        padding: 24, // Más padding en el formulario
    },
    fieldContainer: {
        marginBottom: 24, // Más espacio entre campos
    },
    label: {
        color: "#CCCCCC",
        fontSize: 15, // Etiquetas ligeramente más grandes
        fontWeight: "600",
        marginBottom: 10,
    },
    required: {
        color: "#FF5722",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E2E2E",
        borderRadius: 14, // Más redondeado
        paddingHorizontal: 16, // Más padding horizontal
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        minHeight: 56, // Altura mínima más robusta
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 16,
        paddingVertical: 16, // Más padding vertical
    },
    priceInput: {
        paddingLeft: 8,
    },
    currencySymbol: {
        color: "#CCCCCC",
        fontSize: 16,
        fontWeight: "600",
    },
    clearButton: {
        padding: 4, // Área de toque para el botón de limpiar
    },
    inputError: {
        borderColor: "#FF5722",
        borderWidth: 1.5,
    },
    errorText: {
        color: "#FF5722",
        fontSize: 12,
        marginTop: 6,
        marginLeft: 6,
    },
    helperText: {
        color: "#888888",
        fontSize: 12,
        marginTop: 6,
        marginLeft: 6,
        fontStyle: "italic",
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E2E2E",
        borderRadius: 14,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        minHeight: 56,
    },
    pickerIcon: {
        marginRight: 12,
    },
    picker: {
        flex: 1,
        color: "#FFFFFF",
        height: 56, // Altura consistente
    },
    businessInfo: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(76, 175, 80, 0.15)",
        padding: 12, // Más padding
        borderRadius: 10,
        marginTop: -8,
        marginBottom: 12,
    },
    businessInfoText: {
        color: "#4CAF50",
        fontSize: 13,
        marginLeft: 6,
        fontWeight: "500",
    },
    summary: {
        backgroundColor: "#2A2A2A",
        borderRadius: 14,
        padding: 18, // Más padding
        marginTop: 12,
        borderWidth: 1,
        borderColor: "rgba(0, 109, 119, 0.3)",
    },
    summaryTitle: {
        color: "#006D77",
        fontSize: 17, // Título del resumen más grande
        fontWeight: "600",
        marginBottom: 12,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8, // Más espacio entre filas
    },
    summaryLabel: {
        color: "#CCCCCC",
        fontSize: 14,
    },
    summaryValue: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    summaryValueHighlight: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "700",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24, // Más padding horizontal
        paddingBottom: 24,
        paddingTop: 8,
        gap: 16, // Más espacio entre botones
    },
    cancelButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#424242",
        borderRadius: 14, // Más redondeado
        paddingVertical: 16, // Botones más altos
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: "center",
        gap: 10,
        minHeight: 52,
    },
    cancelButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 12,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#006D77",
        borderRadius: 14,
        paddingVertical: 16, // Botones más altos
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: "center",
        gap: 10,
        elevation: 4, // Más elevación
        shadowColor: "#006D77",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        minHeight: 52, // Altura mínima robusta
    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 12,
    },
});

