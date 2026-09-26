import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Product, products } from "../../../data/product";

const WISHLIST_KEY = "customer_wishlist";
const CART_KEY = "customer_cart";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"cart" | "order">("cart");

  const product = products.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (product) {
      checkWishlist();
    }
  }, [product]);

  /* ---------------- WISHLIST ---------------- */

  const checkWishlist = async () => {
    try {
      const saved = await AsyncStorage.getItem(WISHLIST_KEY);

      if (!saved || !product) {
        setIsWishlisted(false);
        return;
      }

      const wishlist: Product[] = JSON.parse(saved);

      const exists = wishlist.some(
        (item) => String(item.id) === String(product.id),
      );

      setIsWishlisted(exists);
    } catch (error) {
      console.log("Wishlist check error:", error);
    }
  };

  const toggleWishlist = async () => {
    if (!product) return;

    try {
      const saved = await AsyncStorage.getItem(WISHLIST_KEY);

      let wishlist: Product[] = saved ? JSON.parse(saved) : [];

      const exists = wishlist.some(
        (item) => String(item.id) === String(product.id),
      );

      if (exists) {
        wishlist = wishlist.filter(
          (item) => String(item.id) !== String(product.id),
        );

        setIsWishlisted(false);
      } else {
        wishlist.push(product);
        setIsWishlisted(true);
      }

      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));

      console.log("Wishlist saved:", wishlist);
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  };

  /* ---------------- PRODUCT NOT FOUND ---------------- */

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={50} color="#8B4513" />

          <Text style={styles.notFoundTitle}>Product not found</Text>

          <TouchableOpacity
            style={styles.backToProducts}
            onPress={() => router.push("/customer/products")}
          >
            <Text style={styles.backToProductsText}>Back to Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* ---------------- ADD TO CART ---------------- */

  const addToCart = async () => {
    try {
      console.log("ADD TO CART PRESSED");

      const saved = await AsyncStorage.getItem(CART_KEY);

      let cart: any[] = saved ? JSON.parse(saved) : [];

      const existingIndex = cart.findIndex(
        (item) => String(item.id) === String(product.id),
      );

      if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));

      setModalTitle("Added to Cart");
      setModalMessage(`${product.name} has been added to your cart.`);
      setModalType("cart");
      setModalVisible(true);

      console.log("Cart saved:", cart);
    } catch (error) {
      console.log("Add to cart error:", error);

      setModalTitle("Something went wrong");
      setModalMessage("Unable to add this product to your cart.");
      setModalType("cart");
      setModalVisible(true);
    }
  };

  /* ---------------- PLACE ORDER ---------------- */

  const placeOrder = async () => {
    try {
      const saved = await AsyncStorage.getItem(CART_KEY);

      let cart: any[] = saved ? JSON.parse(saved) : [];

      const existingIndex = cart.findIndex(
        (item) => String(item.id) === String(product.id),
      );

      if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));

      router.push("/customer/checkout");
    } catch (error) {
      console.log("Place order error:", error);

      setModalTitle("Something went wrong");
      setModalMessage("Unable to continue with your order.");
      setModalType("order");
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Product Details</Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push("/customer/cart")}
          >
            <Ionicons name="cart-outline" size={23} color="#222" />
          </TouchableOpacity>
        </View>

        {/* PRODUCT IMAGE */}

        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />

          {/* WISHLIST - DO NOT CHANGE */}

          <TouchableOpacity
            style={styles.heartButton}
            onPress={toggleWishlist}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={25}
              color={isWishlisted ? "#C0392B" : "#222"}
            />
          </TouchableOpacity>

          {/* RATING */}

          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color="#C58A27" />

            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {/* PRODUCT INFO */}

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>

          <Text style={styles.artisanName}>{product.artisan}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color="#888" />

            <Text style={styles.location}>{product.location}</Text>
          </View>

          <Text style={styles.price}>
            ₹{product.price.toLocaleString("en-IN")}
          </Text>

          {/* DESCRIPTION */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* PRODUCT DETAILS */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Material</Text>

              <Text style={styles.detailValue}>{product.material}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Craft Type</Text>

              <Text style={styles.detailValue}>{product.craftType}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>

              <Text style={styles.detailValue}>{product.category}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Artisan</Text>

              <Text style={styles.detailValue}>{product.artisan}</Text>
            </View>
          </View>

          {/* ACTIONS */}

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.cartButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={addToCart}
            >
              <Ionicons name="cart-outline" size={21} color="#8B4513" />

              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.orderButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={placeOrder}
            >
              <Text style={styles.orderButtonText}>Place Order</Text>

              <Ionicons name="arrow-forward" size={19} color="#FFF" />
            </Pressable>
          </View>

          <View style={{ height: 25 }} />
        </View>
      </ScrollView>

      {/* CUSTOM POPUP */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIcon}>
              <Ionicons
                name={modalType === "cart" ? "cart" : "checkmark-circle"}
                size={30}
                color="#8B4513"
              />
            </View>

            <Text style={styles.modalTitle}>{modalTitle}</Text>

            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalContinueButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalContinueText}>Continue Shopping</Text>
              </Pressable>

              {modalType === "cart" && (
                <Pressable
                  style={styles.modalCartButton}
                  onPress={() => {
                    setModalVisible(false);
                    router.push("/customer/cart");
                  }}
                >
                  <Text style={styles.modalCartText}>Go to Cart</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },

  content: {
    paddingBottom: 20,
  },

  header: {
    height: 62,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#222",
  },

  imageContainer: {
    height: 330,
    backgroundColor: "#F2EEEA",
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  heartButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  ratingBadge: {
    position: "absolute",
    left: 15,
    bottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#555",
  },

  productInfo: {
    padding: 20,
  },

  productName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#222",
    lineHeight: 31,
  },

  artisanName: {
    fontSize: 13,
    color: "#8B4513",
    fontWeight: "700",
    marginTop: 7,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 4,
  },

  location: {
    fontSize: 11,
    color: "#888",
  },

  price: {
    fontSize: 24,
    fontWeight: "800",
    color: "#8B4513",
    marginTop: 14,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
    marginBottom: 10,
  },

  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 21,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  detailLabel: {
    fontSize: 12,
    color: "#888",
  },

  detailValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    maxWidth: "60%",
    textAlign: "right",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 28,
  },

  cartButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#8B4513",
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  orderButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#8B4513",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  cartButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#8B4513",
  },

  orderButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFF",
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  modalBox: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },

  modalIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#F3EAE3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
  },

  modalMessage: {
    fontSize: 13,
    color: "#777",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },

  modalActions: {
    width: "100%",
    marginTop: 22,
    gap: 10,
  },

  modalContinueButton: {
    height: 48,
    borderRadius: 13,
    backgroundColor: "#8B4513",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContinueText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },

  modalCartButton: {
    height: 48,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#8B4513",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCartText: {
    color: "#8B4513",
    fontSize: 13,
    fontWeight: "800",
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
    marginTop: 12,
  },

  backToProducts: {
    marginTop: 20,
    backgroundColor: "#8B4513",
    paddingHorizontal: 22,
    height: 48,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  backToProductsText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
