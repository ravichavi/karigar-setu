import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const products = [
  {
    id: "1",
    name: "Handcrafted Traditional Pottery",
    price: "₹450",
    status: "Active",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
  },
  {
    id: "2",
    name: "Traditional Wall Art",
    price: "₹850",
    status: "Active",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
  },
  {
    id: "3",
    name: "Handmade Bamboo Basket",
    price: "₹650",
    status: "Draft",
    image: "https://images.unsplash.com/photo-1595521624992-48a59aef95c3",
  },
];

export default function CatalogueScreen() {
  const { image, name, price, status } = useLocalSearchParams<{
    image?: string;
    name?: string;
    price?: string;
    status?: string;
  }>();

  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Active" | "Draft"
  >("All");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [catalogueProducts, setCatalogueProducts] = useState(products);

  const newProduct =
    image && name
      ? {
          id: "new-product",
          name,
          price: price || "₹450",
          status: status || "Active",
          image,
        }
      : null;

  const allProducts = newProduct
    ? [newProduct, ...catalogueProducts]
    : catalogueProducts;

  const filteredProducts =
    selectedFilter === "All"
      ? allProducts
      : allProducts.filter((product) => product.status === selectedFilter);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER */}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>My Catalogue</Text>

          <Text style={styles.subtitle}>Manage your digital products</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{allProducts.length}</Text>
        </View>
      </View>

      {/* ADD PRODUCT */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-product")}
      >
        <Text style={styles.addIcon}>＋</Text>

        <View>
          <Text style={styles.addTitle}>Add New Product</Text>

          <Text style={styles.addSubtitle}>Create a listing with AI</Text>
        </View>

        <Text style={styles.addArrow}>→</Text>
      </TouchableOpacity>

      {/* FILTERS */}

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={selectedFilter === "All" ? styles.activeFilter : styles.filter}
          onPress={() => setSelectedFilter("All")}
        >
          <Text
            style={
              selectedFilter === "All"
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectedFilter === "Active" ? styles.activeFilter : styles.filter
          }
          onPress={() => setSelectedFilter("Active")}
        >
          <Text
            style={
              selectedFilter === "Active"
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectedFilter === "Draft" ? styles.activeFilter : styles.filter
          }
          onPress={() => setSelectedFilter("Draft")}
        >
          <Text
            style={
              selectedFilter === "Draft"
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Drafts
          </Text>
        </TouchableOpacity>
      </View>

      {/* PRODUCTS */}

      <Text style={styles.sectionTitle}>Your Products</Text>

      {filteredProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📦</Text>

          <Text style={styles.emptyTitle}>No products found</Text>

          <Text style={styles.emptyText}>
            Products with this status will appear here.
          </Text>
        </View>
      ) : (
        filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />

            <View style={styles.productInfo}>
              <View style={styles.productTopRow}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedProduct(product);
                    setMenuVisible(true);
                  }}
                >
                  <Text style={styles.more}>⋮</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.price}>{product.price}</Text>

              <View style={styles.bottomRow}>
                <View
                  style={[
                    styles.statusBadge,
                    product.status === "Draft" && styles.draftBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      product.status === "Draft" && styles.draftText,
                    ]}
                  >
                    ● {product.status}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/edit-product",
                      params: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        status: product.status,
                        image: product.image,
                      },
                    })
                  }
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}

      {/* BUSINESS TIP */}

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>💡</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.tipTitle}>Business Tip</Text>

          <Text style={styles.tipText}>
            Add clear product photos and detailed descriptions to attract more
            buyers.
          </Text>
        </View>
      </View>
      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>💡</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.tipTitle}>Business Tip</Text>

          <Text style={styles.tipText}>
            Add clear product photos and detailed descriptions to attract more
            buyers.
          </Text>
        </View>
      </View>

      {/* PRODUCT OPTIONS MODAL */}

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuCard}>
            <View style={styles.menuHandle} />

            <Text style={styles.menuTitle}>Product Options</Text>

            <Text style={styles.menuProductName}>{selectedProduct?.name}</Text>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);

                if (selectedProduct) {
                  router.push({
                    pathname: "/edit-product",
                    params: {
                      id: selectedProduct.id,
                      name: selectedProduct.name,
                      price: selectedProduct.price,
                      status: selectedProduct.status,
                      image: selectedProduct.image,
                    },
                  });
                }
              }}
            >
              <Text style={styles.menuIcon}>✏️</Text>
              <Text style={styles.menuOptionText}>Edit Product</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);

                if (selectedProduct?.status === "Active") {
                  alert("Product moved to Draft");
                } else {
                  alert("Product activated");
                }
              }}
            >
              <Text style={styles.menuIcon}>📦</Text>

              <Text style={styles.menuOptionText}>
                {selectedProduct?.status === "Active"
                  ? "Move to Draft"
                  : "Activate Product"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                if (!selectedProduct) return;

                Alert.alert(
                  "Delete Product?",
                  `"${selectedProduct.name}" will be removed from your catalogue.`,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => {
                        setCatalogueProducts((currentProducts) =>
                          currentProducts.filter(
                            (product) => product.id !== selectedProduct.id,
                          ),
                        );

                        setSelectedProduct(null);
                        setMenuVisible(false);
                      },
                    },
                  ],
                );
              }}
            >
              <Text style={styles.menuIcon}>🗑️</Text>

              <Text style={styles.deleteText}>Delete Product</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 15,
  },

  backText: {
    color: "#7B3F00",
    fontWeight: "700",
    fontSize: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#7B3F00",
  },

  subtitle: {
    color: "#777",
    marginTop: 5,
  },

  countBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3E3D2",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    color: "#7B3F00",
    fontSize: 18,
    fontWeight: "800",
  },

  addButton: {
    backgroundColor: "#7B3F00",
    borderRadius: 16,
    padding: 16,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },

  addIcon: {
    color: "#FFFFFF",
    fontSize: 30,
    marginRight: 12,
  },

  addTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  addSubtitle: {
    color: "#F3DCC4",
    fontSize: 12,
    marginTop: 3,
  },

  addArrow: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: "auto",
  },

  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
    marginBottom: 22,
  },

  activeFilter: {
    backgroundColor: "#7B3F00",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  filter: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },

  filterText: {
    color: "#777",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 12,
  },

  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 35,
    alignItems: "center",
    marginBottom: 15,
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7B3F00",
    marginTop: 10,
  },

  emptyText: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    marginBottom: 12,
  },

  productImage: {
    width: 105,
    height: 105,
    borderRadius: 12,
  },

  productInfo: {
    flex: 1,
    marginLeft: 13,
    paddingVertical: 2,
  },

  productTopRow: {
    flexDirection: "row",
  },

  productName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },

  more: {
    fontSize: 23,
    color: "#777",
  },

  price: {
    color: "#7B3F00",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 8,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  statusBadge: {
    backgroundColor: "#E8F4EA",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  draftBadge: {
    backgroundColor: "#FFF0D9",
  },

  statusText: {
    color: "#3A7D44",
    fontSize: 11,
    fontWeight: "700",
  },

  draftText: {
    color: "#B06B19",
  },

  editText: {
    color: "#7B3F00",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 12,
  },

  tipCard: {
    backgroundColor: "#FFF0D9",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    marginTop: 12,
  },

  tipIcon: {
    fontSize: 25,
    marginRight: 12,
  },

  tipTitle: {
    fontWeight: "800",
    color: "#7B3F00",
  },

  tipText: {
    color: "#6D5947",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  menuCard: {
    backgroundColor: "#FFF8EF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    paddingBottom: 30,
  },

  menuHandle: {
    width: 45,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#D5C8BB",
    alignSelf: "center",
    marginBottom: 18,
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#7B3F00",
  },

  menuProductName: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 15,
  },

  menuOption: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  menuIcon: {
    fontSize: 21,
    width: 38,
  },

  menuOptionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#29231E",
  },

  deleteText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#B3261E",
  },

  cancelButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },

  cancelText: {
    color: "#7B3F00",
    fontWeight: "800",
    fontSize: 15,
  },
});
