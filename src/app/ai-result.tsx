import { router, useLocalSearchParams } from "expo-router";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AIResultScreen() {
  const { image, description } = useLocalSearchParams<{
    image?: string;
    description?: string;
  }>();

  const productImage = typeof image === "string" ? image : null;

  const handleAddToCatalogue = () => {
    router.push({
      pathname: "/catalogue",
      params: {
        image: productImage || "",
        name: "Handcrafted Traditional Pottery",
        price: "₹450",
        status: "Active",
      },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER */}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>AI Generated Listing</Text>

          <Text style={styles.subtitle}>
            Review your listing before publishing.
          </Text>
        </View>

        <Text style={styles.sparkle}>✨</Text>
      </View>

      {/* IMAGE */}

      <View style={styles.imageCard}>
        {productImage ? (
          <Image source={{ uri: productImage }} style={styles.productImage} />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageIcon}>🖼️</Text>

            <Text style={styles.noImageText}>Product Image</Text>
          </View>
        )}
      </View>

      {/* AI BADGE */}

      <View style={styles.aiBadge}>
        <Text style={styles.aiBadgeText}>✨ AI Assisted</Text>
      </View>

      {/* PRODUCT NAME */}

      <View style={styles.card}>
        <Text style={styles.label}>PRODUCT NAME</Text>

        <Text style={styles.productName}>Handcrafted Traditional Pottery</Text>
      </View>

      {/* DESCRIPTION */}

      <View style={styles.card}>
        <Text style={styles.label}>PROFESSIONAL DESCRIPTION</Text>

        <Text style={styles.description}>
          Beautifully handcrafted traditional pottery created by skilled
          artisans. Each piece reflects India's rich cultural heritage and
          traditional craftsmanship.
        </Text>

        {description ? (
          <View style={styles.originalBox}>
            <Text style={styles.originalTitle}>Your description</Text>

            <Text style={styles.originalText}>{description}</Text>
          </View>
        ) : null}
      </View>

      {/* PRICE */}

      <View style={styles.card}>
        <Text style={styles.label}>AI SUGGESTED PRICE</Text>

        <Text style={styles.price}>₹450 – ₹550</Text>

        <Text style={styles.priceHint}>
          Based on product type and market value
        </Text>
      </View>

      {/* TAGS */}

      <View style={styles.card}>
        <Text style={styles.label}>SUGGESTED TAGS</Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>Handmade</Text>

          <Text style={styles.tag}>Pottery</Text>

          <Text style={styles.tag}>Traditional</Text>

          <Text style={styles.tag}>Indian Craft</Text>
        </View>
      </View>

      {/* EDIT */}

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          Alert.alert(
            "Edit Listing",
            "Editing functionality will be connected here.",
          )
        }
      >
        <Text style={styles.editText}>✏️ Edit Listing</Text>
      </TouchableOpacity>

      {/* ADD TO CATALOGUE */}

      <TouchableOpacity
  style={styles.publishButton}
  activeOpacity={0.7}
  onPress={handleAddToCatalogue}
>
  <Text style={styles.publishText}>
    📦 Add to My Catalogue
  </Text>
</TouchableOpacity>
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

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#7B3F00",
  },

  subtitle: {
    color: "#777",
    marginTop: 5,
  },

  sparkle: {
    fontSize: 30,
  },

  imageCard: {
    height: 270,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noImageIcon: {
    fontSize: 45,
  },

  noImageText: {
    color: "#777",
    marginTop: 8,
  },

  aiBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF0D9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },

  aiBadgeText: {
    color: "#7B3F00",
    fontWeight: "700",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginTop: 14,
  },

  label: {
    color: "#999",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 7,
  },

  productName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#29231E",
  },

  description: {
    color: "#555",
    lineHeight: 21,
    fontSize: 14,
  },

  originalBox: {
    backgroundColor: "#FFF8EF",
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
  },

  originalTitle: {
    fontSize: 11,
    color: "#888",
    fontWeight: "700",
  },

  originalText: {
    color: "#555",
    marginTop: 4,
    fontSize: 13,
  },

  price: {
    color: "#3A7D44",
    fontSize: 25,
    fontWeight: "800",
  },

  priceHint: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#F3E7D9",
    color: "#7B3F00",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },

  editButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9C7B5",
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 20,
  },

  editText: {
    color: "#7B3F00",
    fontWeight: "700",
  },

  publishButton: {
    backgroundColor: "#7B3F00",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  publishText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
