import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { products } from "../../data/product";

const categories = ["All", "Pottery", "Textiles", "Decor", "Jewellery"];

export default function Products() {
  const {
    search: initialSearch,
    category,
    sort,
  } = useLocalSearchParams<{
    search?: string;
    category?: string;
    sort?: string;
  }>();

  const [search, setSearch] = useState(initialSearch ?? "");

  const [selectedCategory, setSelectedCategory] = useState(category ?? "All");

  const filteredProducts = useMemo(() => {
    const text = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !text ||
        product.name.toLowerCase().includes(text) ||
        product.artisan.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, selectedCategory, sort]);
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

        <Text style={styles.headerTitle}>Explore</Text>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/customer/cart")}
        >
          <Ionicons name="cart-outline" size={23} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={21} color="#888" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search products or artisans..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={(text) => {
              console.log("SEARCH:", text);
              setSearch(text);
            }}
            autoCorrect={false}
            autoCapitalize="none"
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, active && styles.activeCategory]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* PRODUCT COUNT */}
        <View style={styles.resultsRow}>
          <Text style={styles.sectionTitle}>All Products</Text>

          <Text style={styles.resultCount}>
            {filteredProducts.length} products
          </Text>
        </View>

        {/* PRODUCTS */}
        <View style={styles.grid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              activeOpacity={0.85}
              onPress={() => router.push(`/customer/product/${product.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />

                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={11} color="#C58A27" />

                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>

                <Text style={styles.artisanName} numberOfLines={1}>
                  {product.artisan}
                </Text>

                <View style={styles.bottomRow}>
                  <Text style={styles.price}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </Text>

                  <Ionicons
                    name="arrow-forward-circle"
                    size={23}
                    color="#8B4513"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* NO RESULTS */}
        {filteredProducts.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={48} color="#B8A99F" />

            <Text style={styles.noResultsTitle}>No products found</Text>

            <Text style={styles.noResultsText}>
              Try another product name or category.
            </Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
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

  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 18,
  },

  searchBox: {
    height: 52,
    backgroundColor: "#FFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E8E2DE",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#333",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
    marginTop: 20,
    marginBottom: 10,
  },

  categoryList: {
    gap: 9,
    paddingBottom: 2,
  },

  categoryButton: {
    paddingHorizontal: 17,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E3DDD8",
    alignItems: "center",
    justifyContent: "center",
  },

  activeCategory: {
    backgroundColor: "#8B4513",
    borderColor: "#8B4513",
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
  },

  activeCategoryText: {
    color: "#FFF",
  },

  resultsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  resultCount: {
    fontSize: 10,
    color: "#999",
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 15,
  },

  imageContainer: {
    height: 155,
    position: "relative",
    backgroundColor: "#F2EEEA",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  ratingBadge: {
    position: "absolute",
    top: 9,
    right: 9,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  ratingText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#555",
  },

  productInfo: {
    padding: 11,
  },

  productName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2B2B2B",
    lineHeight: 17,
  },

  artisanName: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  price: {
    fontSize: 14,
    fontWeight: "800",
    color: "#8B4513",
  },

  noResults: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  noResultsTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#333",
    marginTop: 12,
  },

  noResultsText: {
    fontSize: 11,
    color: "#999",
    marginTop: 5,
  },
});
