import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { products } from "../../data/product";

const categories = [
  { name: "Handicrafts", icon: "🪔" },
  { name: "Jewellery", icon: "💍" },
  { name: "Pottery", icon: "🏺" },
  { name: "Textiles", icon: "🧵" },
  { name: "Decor", icon: "🪷" },
];

export default function CustomerHome() {
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [hasWishlist, setHasWishlist] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const checkWishlist = async () => {
        try {
          const saved = await AsyncStorage.getItem("customer_wishlist");

          const wishlist = saved ? JSON.parse(saved) : [];

          setHasWishlist(Array.isArray(wishlist) && wishlist.length > 0);
        } catch (error) {
          console.log("Home wishlist error:", error);
          setHasWishlist(false);
        }
      };

      checkWishlist();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>
          {/* Brand */}
          <Text style={styles.logoText}>KarigarSetu</Text>

          {/* Right icons */}
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => router.push("/customer/wishlist")}
            >
              <Ionicons name="heart-outline" size={23} color="#8B4513" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => router.push("/customer/cart")}
            >
              <Ionicons name="cart-outline" size={23} color="#222" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={22} color="#777" />

          <TextInput
            placeholder="Search crafts, products or artisans"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (search.trim()) {
                router.push({
                  pathname: "/customer/products",
                  params: {
                    search: search.trim(),
                  },
                });
              }
            }}
          />

          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={styles.filterButton}
          >
            <Ionicons name="options-outline" size={22} color="#8B4513" />
          </TouchableOpacity>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSmall}>SUPPORT LOCAL ARTISANS</Text>

            <Text style={styles.bannerTitle}>
              Handmade products.{`\n`}Real stories.
            </Text>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push("/customer/products")}
            >
              <Text style={styles.exploreButtonText}>Explore Products</Text>

              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.bannerEmoji}>🏺</Text>
        </View>

        {/* CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>

          <TouchableOpacity
            onPress={() => {
              router.push("/customer/products");
            }}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={styles.categoryButton}
              activeOpacity={0.75}
              onPress={() => {
                router.push({
                  pathname: "/customer/products",
                  params: {
                    category: category.name,
                  },
                });
              }}
            >
              <Ionicons
                name={
                  category.name === "Pottery"
                    ? "color-palette-outline"
                    : category.name === "Textiles"
                      ? "shirt-outline"
                      : category.name === "Decor"
                        ? "home-outline"
                        : "diamond-outline"
                }
                size={22}
                color="#8B4513"
              />

              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FEATURED PRODUCTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              router.push("/customer/products");
            }}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              activeOpacity={0.9}
              onPress={() => router.push(`/customer/product/${product.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />

                <TouchableOpacity style={styles.heartButton}>
                  <Ionicons name="heart-outline" size={20} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>

                <Text style={styles.artisanName}>By {product.artisan}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>{product.price}</Text>

                  <View style={styles.rating}>
                    <Ionicons name="star" size={13} color="#F5A623" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ARTISAN SECTION */}
        <View style={styles.artisanSection}>
          <View style={styles.artisanIcon}>
            <Text style={{ fontSize: 30 }}>👨‍🎨</Text>
          </View>

          <View style={styles.artisanTextContainer}>
            <Text style={styles.artisanTitle}>Buy directly from artisans</Text>

            <Text style={styles.artisanDescription}>
              Every purchase supports a real artisan and their craft.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#8B4513" />
        </View>

        {/* BOTTOM SPACE */}
        <View style={{ height: 20 }} />
      </ScrollView>
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.filterOverlay}>
          <View style={styles.filterModal}>
            {/* HEADER */}
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filters</Text>

              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Ionicons name="close" size={25} color="#333" />
              </TouchableOpacity>
            </View>

            {/* CATEGORY */}
            <Text style={styles.filterSectionTitle}>Category</Text>

            <View style={styles.filterOptions}>
              {["All", "Pottery", "Textiles", "Decor", "Jewellery"].map(
                (category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterOption,
                      selectedFilter === category &&
                        styles.selectedFilterOption,
                    ]}
                    onPress={() => setSelectedFilter(category)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedFilter === category &&
                          styles.selectedFilterText,
                      ]}
                    >
                      {category}
                    </Text>

                    {selectedFilter === category && (
                      <Ionicons name="checkmark" size={18} color="#FFF" />
                    )}
                  </TouchableOpacity>
                ),
              )}
            </View>

            {/* SORT */}
            <Text style={styles.filterSectionTitle}>Sort By</Text>

            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  sortBy === "low" && styles.selectedFilterOption,
                ]}
                onPress={() => setSortBy("low")}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    sortBy === "low" && styles.selectedFilterText,
                  ]}
                >
                  Price: Low to High
                </Text>

                {sortBy === "low" && (
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterOption,
                  sortBy === "high" && styles.selectedFilterOption,
                ]}
                onPress={() => setSortBy("high")}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    sortBy === "high" && styles.selectedFilterText,
                  ]}
                >
                  Price: High to Low
                </Text>

                {sortBy === "high" && (
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                )}
              </TouchableOpacity>
            </View>

            {/* BUTTONS */}
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSelectedFilter("All");
                  setSortBy("None");
                }}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setFilterVisible(false);

                  router.push({
                    pathname: "/customer/products",
                    params: {
                      search: search.trim(),
                      category: selectedFilter,
                      sort: sortBy,
                    },
                  });
                }}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
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

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: "#777",
    marginBottom: 3,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#222",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  notificationDot: {
    position: "absolute",
    right: 11,
    top: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D35400",
  },

  searchContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    elevation: 1,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },

  banner: {
    backgroundColor: "#8B4513",
    borderRadius: 20,
    minHeight: 175,
    padding: 20,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 25,
  },

  bannerContent: {
    flex: 1,
    zIndex: 2,
  },

  bannerSmall: {
    color: "#F5DCC7",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
  },

  shopButton: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  shopButtonText: {
    color: "#8B4513",
    fontSize: 12,
    fontWeight: "700",
  },

  bannerEmoji: {
    position: "absolute",
    right: 5,
    bottom: -15,
    fontSize: 115,
    opacity: 0.25,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  seeAll: {
    fontSize: 13,
    color: "#8B4513",
    fontWeight: "600",
  },

  categoryList: {
    gap: 20,
    paddingBottom: 4,
    paddingRight: 8,
  },

  categoryCard: {
    width: 82,
    alignItems: "center",
    marginRight: 14,
  },

  categoryIcon: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
    elevation: 1,
  },

  categoryEmoji: {
    fontSize: 30,
  },

  categoryName: {
    fontSize: 11,
    color: "#444",
    textAlign: "center",
    fontWeight: "500",
  },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
  },

  imageContainer: {
    height: 155,
    position: "relative",
    backgroundColor: "#EEE",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  heartButton: {
    position: "absolute",
    right: 9,
    top: 9,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  productInfo: {
    padding: 11,
  },

  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    lineHeight: 19,
  },

  artisanName: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#8B4513",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  ratingText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600",
  },

  artisanSection: {
    backgroundColor: "#F1E7DD",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  artisanIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  artisanTextContainer: {
    flex: 1,
  },

  artisanTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  artisanDescription: {
    fontSize: 11,
    color: "#777",
    lineHeight: 16,
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    height: 62,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  logoText: {
    fontSize: 21,
    fontWeight: "800",
    color: "#8B4513",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  exploreButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#8B4513",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 15,
  },

  exploreButtonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },

  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  filterOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  filterModal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
  },

  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#222",
  },

  filterSectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222",
    marginBottom: 10,
  },

  filterOptions: {
    gap: 8,
    marginBottom: 18,
  },

  filterOption: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedFilterOption: {
    backgroundColor: "#8B4513",
  },

  filterOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  selectedFilterText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  filterButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },

  clearButton: {
    flex: 1,
    height: 50,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#8B4513",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  clearButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8B4513",
  },

  applyButton: {
    flex: 2,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#8B4513",
    alignItems: "center",
    justifyContent: "center",
  },

  applyButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerIconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFE4C4",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 24,
    color: "#7B3F00",
    fontWeight: "700",
  },
});
