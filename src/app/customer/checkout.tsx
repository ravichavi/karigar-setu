import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const CART_KEY = "customer_cart";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem(CART_KEY);

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 999 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    if (!name || !phone || !address || !city || !pincode) {
      Alert.alert(
        "Missing Information",
        "Please fill in all delivery details.",
      );
      return;
    }

    if (phone.length !== 10) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number.",
      );
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert("Invalid Pincode", "Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      const order = {
        id: `ORD-${Date.now()}`,
        items: cart,
        customer: {
          name,
          phone,
          address,
          city,
          pincode,
        },
        paymentMethod,
        subtotal,
        deliveryFee,
        total,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      console.log("ORDER CREATED:", order);

      await AsyncStorage.setItem("latest_order", JSON.stringify(order));

      await AsyncStorage.removeItem("customer_cart");

      setOrderPlaced(true);
    } catch (error) {
      console.log("PLACE ORDER ERROR:", error);

      Alert.alert(
        "Something went wrong",
        "Unable to place your order. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#222" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* DELIVERY ADDRESS */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="House No., Street, Area"
            placeholderTextColor="#999"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              placeholderTextColor="#999"
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Pincode"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
              value={pincode}
              onChangeText={setPincode}
            />
          </View>
        </View>

        {/* PAYMENT */}
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === "cod" && styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod("cod")}
        >
          <View style={styles.paymentIcon}>
            <Ionicons name="cash-outline" size={22} color="#8B4513" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Cash on Delivery</Text>

            <Text style={styles.paymentSubtitle}>
              Pay when your order arrives
            </Text>
          </View>

          <Ionicons
            name={
              paymentMethod === "cod" ? "radio-button-on" : "radio-button-off"
            }
            size={22}
            color="#8B4513"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === "online" && styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod("online")}
        >
          <View style={styles.paymentIcon}>
            <Ionicons name="card-outline" size={22} color="#8B4513" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Online Payment</Text>

            <Text style={styles.paymentSubtitle}>UPI / Card / Net Banking</Text>
          </View>

          <Ionicons
            name={
              paymentMethod === "online"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
            color="#8B4513"
          />
        </TouchableOpacity>

        {/* ORDER SUMMARY */}
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.summaryCard}>
          {cart.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>

                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>

              <Text style={styles.itemPrice}>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>

            <Text style={styles.priceValue}>
              ₹{subtotal.toLocaleString("en-IN")}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>

            <Text style={[styles.priceValue, deliveryFee === 0 && styles.free]}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>

            <Text style={styles.totalValue}>
              ₹{total.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* PLACE ORDER */}
        <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>

          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={{ height: 25 }} />
      </ScrollView>
      <Modal visible={orderPlaced} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={42} color="#fff" />
            </View>

            <Text style={styles.successTitle}>Order Placed!</Text>

            <Text style={styles.successText}>
              Your order has been successfully placed.
            </Text>

            <TouchableOpacity
              style={styles.viewOrdersButton}
              onPress={() => {
                setOrderPlaced(false);
                router.replace("/customer/orders");
              }}
            >
              <Text style={styles.viewOrdersText}>View Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },

  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#FFF",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
  },

  content: {
    padding: 18,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
    marginTop: 5,
    marginBottom: 11,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 22,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E0DC",
    borderRadius: 11,
    paddingHorizontal: 13,
    fontSize: 12,
    color: "#333",
    marginBottom: 11,
    backgroundColor: "#FFFEFD",
  },

  multiline: {
    height: 75,
    paddingTop: 13,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  halfInput: {
    flex: 1,
  },

  paymentCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EAE5E1",
  },

  selectedPayment: {
    borderColor: "#8B4513",
    backgroundColor: "#FDF8F4",
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F1E7DD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  paymentTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },

  paymentSubtitle: {
    fontSize: 10,
    color: "#888",
    marginTop: 3,
  },

  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  itemName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
  },

  itemQuantity: {
    fontSize: 10,
    color: "#888",
    marginTop: 3,
  },

  itemPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8B4513",
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 8,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  priceLabel: {
    fontSize: 12,
    color: "#777",
  },

  priceValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },

  free: {
    color: "#398A4B",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
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

  placeOrderButton: {
    height: 53,
    borderRadius: 14,
    backgroundColor: "#8B4513",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    zIndex: 999,
    elevation: 10,
  },

  placeOrderText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "800",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  successModal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
  },

  successIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#398A4B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222",
  },

  successText: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  viewOrdersButton: {
    width: "100%",
    height: 50,
    borderRadius: 13,
    backgroundColor: "#8B4513",
    alignItems: "center",
    justifyContent: "center",
  },

  viewOrdersText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});
