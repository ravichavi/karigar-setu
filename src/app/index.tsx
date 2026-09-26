import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RoleSelection() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* LOGO / BRAND */}

        <View style={styles.brandSection}>
          <Text style={styles.logo}>KarigarSetu</Text>

          <Text style={styles.tagline}>From Craft to Commerce</Text>
        </View>

        {/* WELCOME */}

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to KarigarSetu</Text>

          <Text style={styles.welcomeText}>
            Choose how you want to continue
          </Text>
        </View>

        {/* CUSTOMER */}

        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.85}
          onPress={() => router.replace("/customer")}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.roleIcon}>🛍️</Text>
          </View>

          <View style={styles.roleInfo}>
            <Text style={styles.roleTitle}>As Customer</Text>

            <Text style={styles.roleDescription}>
              Explore and shop handcrafted products from local artisans.
            </Text>
          </View>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* SELLER / ARTISAN */}

        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.85}
          onPress={() => router.replace("/artisan-home")}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.roleIcon}>🧑‍🎨</Text>
          </View>

          <View style={styles.roleInfo}>
            <Text style={styles.roleTitle}>As Seller</Text>

            <Text style={styles.roleDescription}>
              Showcase your craft, manage products and grow your business.
            </Text>
          </View>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Supporting local artisans • Empowering handmade businesses
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  brandSection: {
    alignItems: "center",
    marginBottom: 45,
  },

  logo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#7B3F00",
  },

  tagline: {
    fontSize: 13,
    color: "#999",
    marginTop: 5,
  },

  welcomeSection: {
    marginBottom: 22,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#29231E",
    textAlign: "center",
  },

  welcomeText: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginTop: 7,
  },

  roleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#FFF0DF",
    alignItems: "center",
    justifyContent: "center",
  },

  roleIcon: {
    fontSize: 29,
  },

  roleInfo: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 8,
  },

  roleTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#29231E",
  },

  roleDescription: {
    fontSize: 11,
    color: "#888",
    lineHeight: 17,
    marginTop: 5,
  },

  arrow: {
    fontSize: 25,
    color: "#7B3F00",
    fontWeight: "600",
  },

  footer: {
    marginTop: 25,
    alignItems: "center",
  },

  footerText: {
    fontSize: 10,
    color: "#AAA",
    textAlign: "center",
  },
});
