import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const CART_KEY = "customer_cart";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
  try {
    const savedCart = await AsyncStorage.getItem(CART_KEY);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  } catch (error) {
    console.log("Error loading cart:", error);
    setCart([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = async (updatedCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem(
        CART_KEY,
        JSON.stringify(updatedCart)
      );

      setCart(updatedCart);
    } catch (error) {
      console.log("Error saving cart:", error);
    }
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeItem = (id: string) => {
    Alert.alert(
      "Remove item",
      "Are you sure you want to remove this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const updatedCart = cart.filter(
              (item) => item.id !== id
            );

            saveCart(updatedCart);
          },
        },
      ]
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;


  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Cart</Text>
          <Text style={styles.itemCount}>
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/customer")}
        >
          <Text style={styles.continueText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>

      {cart.length === 0 ? (
        /* EMPTY CART */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="cart-outline"
              size={55}
              color="#8B4513"
            />
          </View>

          <Text style={styles.emptyTitle}>
            Your cart is empty
          </Text>

          <Text style={styles.emptyDescription}>
            Discover beautiful handmade products from local
            artisans and add your favourites here.
          </Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push("/customer/products")}
          >
            <Text style={styles.exploreText}>
              Explore Products
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* CART ITEMS */}
          {cart.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <View style={styles.nameRow}>
                  <Text
                    style={styles.productName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.artisan}>
                  By {item.artisan}
                </Text>

                <View style={styles.bottomRow}>
                  <Text style={styles.price}>
                    ₹{item.price.toLocaleString("en-IN")}
                  </Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      <Ionicons
                        name="remove"
                        size={16}
                        color="#333"
                      />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      <Ionicons
                        name="add"
                        size={16}
                        color="#333"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* DELIVERY INFO */}
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryIcon}>
              <Ionicons
                name="car-outline"
                size={22}
                color="#8B4513"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.deliveryTitle}>
                Delivery
              </Text>

              <Text style={styles.deliveryText}>
                {subtotal > 999
                  ? "You get free delivery!"
                  : "Free delivery on orders above ₹999"}
              </Text>
            </View>
          </View>

          {/* PRICE SUMMARY */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>
              Price Details
            </Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Subtotal
              </Text>

              <Text style={styles.summaryValue}>
                ₹{subtotal.toLocaleString("en-IN")}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Delivery
              </Text>

              <Text
                style={[
                  styles.summaryValue,
                  deliveryFee === 0 && styles.freeText,
                ]}
              >
                {deliveryFee === 0
                  ? "FREE"
                  : `₹${deliveryFee}`}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>

              <Text style={styles.totalValue}>
                ₹{total.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>

          {/* CHECKOUT */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push("/customer/checkout")}
          >
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={{ height: 25 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#777",
    fontSize: 14,
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#222",
  },

  itemCount: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  continueButton: {
    paddingHorizontal: 10,
  },

  continueText: {
    color: "#8B4513",
    fontSize: 11,
    fontWeight: "700",
  },

  scrollContent: {
    paddingHorizontal: 18,
  },

  cartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 11,
    flexDirection: "row",
    marginBottom: 13,
    elevation: 1,
  },

  productImage: {
    width: 95,
    height: 105,
    borderRadius: 12,
    backgroundColor: "#EEE",
  },

  productInfo: {
    flex: 1,
    marginLeft: 12,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    lineHeight: 19,
  },

  artisan: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#8B4513",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F1EE",
    borderRadius: 10,
    padding: 3,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  quantity: {
    width: 28,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
  },

  deliveryCard: {
    backgroundColor: "#F1E7DD",
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 14,
  },

  deliveryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  deliveryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },

  deliveryText: {
    fontSize: 10,
    color: "#777",
    marginTop: 3,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 17,
    marginBottom: 15,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#777",
  },

  summaryValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },

  freeText: {
    color: "#398A4B",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 4,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#8B4513",
  },

  checkoutButton: {
    height: 52,
    backgroundColor: "#8B4513",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginTop: 60,
  },

  emptyIcon: {
    width: 105,
    height: 105,
    borderRadius: 52,
    backgroundColor: "#F1E7DD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#222",
  },

  emptyDescription: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 22,
  },

  exploreButton: {
    backgroundColor: "#8B4513",
    borderRadius: 13,
    paddingHorizontal: 20,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  exploreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});