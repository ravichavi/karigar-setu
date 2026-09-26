import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function EditProductScreen() {
  const {
    id,
    name: initialName,
    price: initialPrice,
    status: initialStatus,
  } = useLocalSearchParams<{
    id?: string;
    name?: string;
    price?: string;
    status?: string;
  }>();

  const [name, setName] = useState(initialName || "");
  const [price, setPrice] = useState(initialPrice || "");
  const [status, setStatus] = useState(
    initialStatus === "Draft" ? "Draft" : "Active",
  );

  const handleSave = () => {
    if (!name.trim() || !price.trim()) {
      alert("Please enter product name and price.");
      return;
    }

    alert("Product Updated Successfully! 🎉");

    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Edit Product</Text>

      <Text style={styles.subtitle}>Update your product information</Text>

      {/* PRODUCT NAME */}

      <View style={styles.field}>
        <Text style={styles.label}>PRODUCT NAME</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter product name"
          placeholderTextColor="#999"
        />
      </View>

      {/* PRICE */}

      <View style={styles.field}>
        <Text style={styles.label}>PRICE</Text>

        <TextInput
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          placeholder="Enter price"
          placeholderTextColor="#999"
        />
      </View>

      {/* STATUS */}

      <View style={styles.field}>
        <Text style={styles.label}>PRODUCT STATUS</Text>

        <View style={styles.statusRow}>
          <TouchableOpacity
            style={
              status === "Active" ? styles.selectedStatus : styles.statusButton
            }
            onPress={() => setStatus("Active")}
          >
            <Text
              style={
                status === "Active"
                  ? styles.selectedStatusText
                  : styles.statusText
              }
            >
              ● Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              status === "Draft" ? styles.selectedStatus : styles.statusButton
            }
            onPress={() => setStatus("Draft")}
          >
            <Text
              style={
                status === "Draft"
                  ? styles.selectedStatusText
                  : styles.statusText
              }
            >
              ● Draft
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SAVE */}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>✓ Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    padding: 20,
  },

  backButton: {
    marginBottom: 18,
  },

  backText: {
    color: "#7B3F00",
    fontSize: 16,
    fontWeight: "700",
  },

  title: {
    color: "#7B3F00",
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    color: "#777",
    marginTop: 5,
    marginBottom: 25,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    color: "#888",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 15,
    fontSize: 15,
    color: "#29231E",
    borderWidth: 1,
    borderColor: "#E4D7C9",
  },

  statusRow: {
    flexDirection: "row",
    gap: 10,
  },

  statusButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4D7C9",
  },

  selectedStatus: {
    backgroundColor: "#7B3F00",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  statusText: {
    color: "#777",
    fontWeight: "700",
  },

  selectedStatusText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  saveButton: {
    backgroundColor: "#7B3F00",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
