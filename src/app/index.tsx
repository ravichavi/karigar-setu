import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Namaste, Artisan 👋
          </Text>

          <Text style={styles.subtitle}>
            Grow your craft. Grow your business.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.profileIcon}>👩‍🎨</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CTA */}

      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Turn your craft into commerce
          </Text>

          <Text style={styles.heroText}>
            Create professional product listings
            with the help of AI.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/add-product")}
          >
            <Text style={styles.primaryButtonText}>
              ✨ Create Product Listing
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heroEmoji}>
          🧑‍🎨
        </Text>
      </View>

      {/* QUICK ACTIONS */}

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actionGrid}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/add-product")}
        >
          <Text style={styles.actionIcon}>
            📸
          </Text>

          <Text style={styles.actionTitle}>
            Add Product
          </Text>

          <Text style={styles.actionText}>
            Create a new listing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/catalogue")}
        >
          <Text style={styles.actionIcon}>
            📦
          </Text>

          <Text style={styles.actionTitle}>
            My Catalogue
          </Text>

          <Text style={styles.actionText}>
            Manage your products
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/rewards")}
        >
          <Text style={styles.actionIcon}>
            🏆
          </Text>

          <Text style={styles.actionTitle}>
            Rewards
          </Text>

          <Text style={styles.actionText}>
            85 artisan points
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.actionIcon}>
            👤
          </Text>

          <Text style={styles.actionTitle}>
            My Profile
          </Text>

          <Text style={styles.actionText}>
            Manage your business
          </Text>
        </TouchableOpacity>

      </View>

      {/* BUSINESS OVERVIEW */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Business Overview
        </Text>

        <Text style={styles.thisMonth}>
          This Month
        </Text>
      </View>

      <View style={styles.statsCard}>

        <View style={styles.stat}>
          <Text style={styles.statIcon}>
            📦
          </Text>

          <Text style={styles.statNumber}>
            12
          </Text>

          <Text style={styles.statLabel}>
            Products
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={styles.statIcon}>
            💰
          </Text>

          <Text style={styles.statNumber}>
            ₹8.5K
          </Text>

          <Text style={styles.statLabel}>
            Sales
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={styles.statIcon}>
            ⭐
          </Text>

          <Text style={styles.statNumber}>
            85
          </Text>

          <Text style={styles.statLabel}>
            Points
          </Text>
        </View>

      </View>

      {/* REWARD PROGRESS */}

      <TouchableOpacity
        style={styles.rewardCard}
        onPress={() => router.push("/rewards")}
      >
        <View style={styles.rewardHeader}>

          <View>
            <Text style={styles.rewardTitle}>
              🥈 Silver Artisan
            </Text>

            <Text style={styles.rewardText}>
              You're 15 points away from Gold!
            </Text>
          </View>

          <Text style={styles.rewardArrow}>
            →
          </Text>

        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progress} />
        </View>

      </TouchableOpacity>

      {/* TIP */}

      <View style={styles.tipCard}>
        <Text style={styles.tipIcon}>
          💡
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.tipTitle}>
            Artisan Tip
          </Text>

          <Text style={styles.tipText}>
            Upload clear product photos and add
            detailed descriptions to attract more buyers.
          </Text>
        </View>
      </View>

      {/* BRAND */}

      <Text style={styles.brand}>
        KarigarSetu
      </Text>

      <Text style={styles.tagline}>
        From Craft to Commerce
      </Text>

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
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#7B3F00",
  },

  subtitle: {
    color: "#777",
    fontSize: 13,
    marginTop: 5,
  },

  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE4C4",
    justifyContent: "center",
    alignItems: "center",
  },

  profileIcon: {
    fontSize: 25,
  },

  heroCard: {
    backgroundColor: "#7B3F00",
    borderRadius: 22,
    padding: 22,
    minHeight: 205,
    flexDirection: "row",
    overflow: "hidden",
  },

  heroContent: {
    flex: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 29,
  },

  heroText: {
    color: "#F3DCC4",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 9,
  },

  heroEmoji: {
    fontSize: 70,
    position: "absolute",
    right: 5,
    bottom: 5,
    opacity: 0.9,
  },

  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 18,
  },

  primaryButtonText: {
    color: "#7B3F00",
    fontWeight: "800",
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#29231E",
    marginTop: 25,
    marginBottom: 12,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    minHeight: 125,
  },

  actionIcon: {
    fontSize: 28,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginTop: 9,
  },

  actionText: {
    color: "#888",
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  thisMonth: {
    color: "#999",
    fontSize: 11,
  },

  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 21,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7B3F00",
    marginTop: 5,
  },

  statLabel: {
    color: "#888",
    fontSize: 11,
    marginTop: 3,
  },

  statDivider: {
    width: 1,
    height: 55,
    backgroundColor: "#E9E1D9",
  },

  rewardCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 17,
    marginTop: 14,
  },

  rewardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  rewardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7B3F00",
  },

  rewardText: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  rewardArrow: {
    marginLeft: "auto",
    fontSize: 22,
    color: "#7B3F00",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E8DED4",
    borderRadius: 10,
    marginTop: 15,
  },

  progress: {
    width: "85%",
    height: 8,
    backgroundColor: "#D28A3A",
    borderRadius: 10,
  },

  tipCard: {
    backgroundColor: "#FFF0D9",
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    flexDirection: "row",
  },

  tipIcon: {
    fontSize: 25,
    marginRight: 12,
  },

  tipTitle: {
    color: "#7B3F00",
    fontWeight: "800",
  },

  tipText: {
    color: "#6D5947",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  brand: {
    textAlign: "center",
    color: "#7B3F00",
    fontSize: 21,
    fontWeight: "800",
    marginTop: 30,
  },

  tagline: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 3,
  },
});