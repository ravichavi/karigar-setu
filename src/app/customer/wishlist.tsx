import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const WISHLIST_KEY = "customer_wishlist";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadWishlist();
    }, []),
  );

  const loadWishlist = async () => {
    try {
      const saved = await AsyncStorage.getItem(WISHLIST_KEY);

      if (!saved) {
        setWishlist([]);
        return;
      }

      const parsedWishlist = JSON.parse(saved);

      if (Array.isArray(parsedWishlist)) {
        setWishlist(parsedWishlist);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.log("Wishlist loading error:", error);
      setWishlist([]);
    }
  };

  const removeFromWishlist = async (id: string | number) => {
    try {
      const updated = wishlist.filter(
        (product) => String(product.id) !== String(id),
      );

      setWishlist(updated);

      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log("Remove wishlist error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#222" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wishlist</Text>

        <View style={styles.headerSpace} />
      </View>

      {/* EMPTY */}
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="heart-outline" size={55} color="#8B4513" />
          </View>

          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>

          <Text style={styles.emptyText}>
            Save your favourite handcrafted products here.
          </Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push("/customer/products")}
          >
            <Text style={styles.exploreText}>Explore Products</Text>

            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push(`/customer/product/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>

                <Text style={styles.artisan} numberOfLines={1}>
                  {item.artisan}
                </Text>

                <Text style={styles.price}>
                  ₹{item.price.toLocaleString("en-IN")}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => removeFromWishlist(item.id)}
              >
                <Ionicons name="heart" size={21} color="#8B4513" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
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
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  iconButton: {
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

  headerSpace: {
    width: 42,
  },

  list: {
    padding: 18,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#F2EEEA",
  },

  info: {
    flex: 1,
    paddingHorizontal: 12,
  },

  productName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#222",
  },

  artisan: {
    fontSize: 11,
    color: "#888",
    marginTop: 5,
  },

  price: {
    fontSize: 14,
    fontWeight: "800",
    color: "#8B4513",
    marginTop: 8,
  },

  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F8F1EC",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },

  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3EAE3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
  },

  emptyText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },

  exploreButton: {
    height: 50,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: "#8B4513",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 22,
  },

  exploreText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
