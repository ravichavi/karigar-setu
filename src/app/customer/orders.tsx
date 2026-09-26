import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ORDER_KEY = "latest_order";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  createdAt: string;
};

export default function Orders() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const savedOrder = await AsyncStorage.getItem(ORDER_KEY);

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.log("Error loading order:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Orders</Text>

          <View style={{ width: 42 }} />
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="receipt-outline" size={50} color="#8B4513" />
          </View>

          <Text style={styles.emptyTitle}>No orders yet</Text>

          <Text style={styles.emptyText}>
            Your placed orders will appear here.
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push("/customer")}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#222" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ORDER CARD */}
        <View style={styles.orderCard}>
          <View style={styles.orderTop}>
            <View>
              <Text style={styles.orderLabel}>ORDER ID</Text>

              <Text style={styles.orderId}>{order.id}</Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />

              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ITEMS */}
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemIcon}>
                <Ionicons name="bag-handle-outline" size={22} color="#8B4513" />
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
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

          {/* ORDER INFO */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Date</Text>

            <Text style={styles.infoValue}>{formatDate(order.createdAt)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment</Text>

            <Text style={styles.infoValue}>
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Amount</Text>

            <Text style={styles.totalValue}>
              ₹{order.total.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* TRACK ORDER */}
        <Text style={styles.sectionTitle}>Track Order</Text>

        <View style={styles.trackingCard}>
          <TrackingStep
            icon="checkmark-circle"
            title="Order Confirmed"
            subtitle="Your order has been confirmed"
            active
          />

          <View style={styles.verticalLine} />

          <TrackingStep
            icon="cube-outline"
            title="Packed"
            subtitle="Your artisan is preparing the order"
            active={false}
          />

          <View style={styles.verticalLine} />

          <TrackingStep
            icon="car-outline"
            title="Shipped"
            subtitle="Your order is on the way"
            active={false}
          />

          <View style={styles.verticalLine} />

          <TrackingStep
            icon="home-outline"
            title="Delivered"
            subtitle="Order delivered to your address"
            active={false}
          />
        </View>

        {/* DELIVERY ADDRESS */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <View style={styles.addressCard}>
          <View style={styles.addressIcon}>
            <Ionicons name="location-outline" size={22} color="#8B4513" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.addressName}>{order.customer.name}</Text>

            <Text style={styles.addressText}>{order.customer.address}</Text>

            <Text style={styles.addressText}>
              {order.customer.city} - {order.customer.pincode}
            </Text>

            <Text style={styles.addressPhone}>+91 {order.customer.phone}</Text>
          </View>
        </View>

        {/* SHOP MORE */}
        <TouchableOpacity
          style={styles.shopMoreButton}
          onPress={() => router.push("/customer")}
        >
          <Ionicons name="bag-outline" size={19} color="#8B4513" />

          <Text style={styles.shopMoreText}>Continue Shopping</Text>
        </TouchableOpacity>

        <View style={{ height: 25 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function TrackingStep({
  icon,
  title,
  subtitle,
  active,
}: {
  icon: any;
  title: string;
  subtitle: string;
  active: boolean;
}) {
  return (
    <View style={styles.trackingStep}>
      <View style={[styles.trackingIcon, active && styles.activeTrackingIcon]}>
        <Ionicons name={icon} size={20} color={active ? "#8B4513" : "#AAA"} />
      </View>

      <View style={styles.trackingInfo}>
        <Text style={[styles.trackingTitle, !active && styles.inactiveText]}>
          {title}
        </Text>

        <Text style={styles.trackingSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F5",
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

  orderCard: {
    backgroundColor: "#FFF",
    borderRadius: 17,
    padding: 16,
  },

  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderLabel: {
    fontSize: 9,
    color: "#999",
    fontWeight: "700",
    letterSpacing: 1,
  },

  orderId: {
    fontSize: 13,
    fontWeight: "800",
    color: "#333",
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6ED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#398A4B",
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    color: "#398A4B",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 13,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  itemIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#F1E7DD",
    alignItems: "center",
    justifyContent: "center",
  },

  itemInfo: {
    flex: 1,
    marginLeft: 11,
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
    marginLeft: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  infoLabel: {
    fontSize: 11,
    color: "#888",
  },

  infoValue: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
  },

  totalValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#8B4513",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
    marginTop: 22,
    marginBottom: 11,
  },

  trackingCard: {
    backgroundColor: "#FFF",
    borderRadius: 17,
    padding: 16,
  },

  trackingStep: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
  },

  trackingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },

  activeTrackingIcon: {
    backgroundColor: "#F1E7DD",
  },

  trackingInfo: {
    marginLeft: 12,
    flex: 1,
  },

  trackingTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
  },

  inactiveText: {
    color: "#999",
  },

  trackingSubtitle: {
    fontSize: 10,
    color: "#999",
    marginTop: 3,
  },

  verticalLine: {
    width: 1,
    height: 18,
    backgroundColor: "#DDD",
    marginLeft: 20,
  },

  addressCard: {
    backgroundColor: "#FFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
  },

  addressIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F1E7DD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  addressName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  addressText: {
    fontSize: 11,
    color: "#777",
    lineHeight: 17,
  },

  addressPhone: {
    fontSize: 11,
    color: "#777",
    marginTop: 4,
  },

  shopMoreButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CDB9AA",
    backgroundColor: "#FFF",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  shopMoreText: {
    color: "#8B4513",
    fontSize: 13,
    fontWeight: "700",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },

  emptyIcon: {
    width: 105,
    height: 105,
    borderRadius: 53,
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

  emptyText: {
    fontSize: 12,
    color: "#888",
    marginTop: 7,
    textAlign: "center",
  },

  shopButton: {
    marginTop: 22,
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 13,
    backgroundColor: "#8B4513",
    alignItems: "center",
    justifyContent: "center",
  },

  shopButtonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
