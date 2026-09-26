import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* BACK */}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* PROFILE */}

      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👩‍🎨</Text>
        </View>

        <Text style={styles.name}>Artisan</Text>

        <Text style={styles.location}>Rajasthan, India</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>🥈 Silver Artisan</Text>
        </View>
      </View>

      {/* BUSINESS STATS */}

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>12</Text>

          <Text style={styles.statLabel}>Products</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statNumber}>₹8.5K</Text>

          <Text style={styles.statLabel}>Sales</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statNumber}>85</Text>

          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      {/* REWARDS */}

      <Text style={styles.sectionTitle}>Your Rewards 🏆</Text>

      <View style={styles.rewardCard}>
        <View style={styles.rewardTop}>
          <View style={styles.rewardIcon}>
            <Text style={styles.rewardEmoji}>🥈</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.rewardTitle}>Silver Artisan</Text>

            <Text style={styles.rewardSubtitle}>
              Keep selling to unlock Gold
            </Text>
          </View>

          <Text style={styles.points}>85 pts</Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progress} />
        </View>

        <Text style={styles.progressText}>15 more points to reach Gold</Text>
      </View>

      {/* REWARD LEVELS */}

      <Text style={styles.sectionTitle}>Reward Levels</Text>

      <View style={styles.levelCard}>
        <View style={styles.levelRow}>
          <Text style={styles.levelEmoji}>🥉</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.levelTitle}>Bronze Artisan</Text>

            <Text style={styles.levelSub}>0 – 49 points</Text>
          </View>

          <Text style={styles.completed}>✓</Text>
        </View>

        <View style={styles.levelRow}>
          <Text style={styles.levelEmoji}>🥈</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.levelTitle}>Silver Artisan</Text>

            <Text style={styles.levelSub}>50 – 99 points</Text>
          </View>

          <Text style={styles.current}>Current</Text>
        </View>

        <View style={styles.levelRow}>
          <Text style={styles.levelEmoji}>🥇</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.levelTitle}>Gold Artisan</Text>

            <Text style={styles.levelSub}>100+ points</Text>
          </View>

          <Text style={styles.locked}>🔒</Text>
        </View>
      </View>

      {/* BUSINESS PROFILE */}

      <Text style={styles.sectionTitle}>Business Profile</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🎨</Text>

          <View>
            <Text style={styles.infoLabel}>Craft</Text>

            <Text style={styles.infoValue}>Handmade Pottery</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📍</Text>

          <View>
            <Text style={styles.infoLabel}>Location</Text>

            <Text style={styles.infoValue}>Rajasthan, India</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🛍️</Text>

          <View>
            <Text style={styles.infoLabel}>Selling Since</Text>

            <Text style={styles.infoValue}>2026</Text>
          </View>
        </View>
      </View>

      {/* FOOTER */}

      <Text style={styles.footer}>KarigarSetu</Text>

      <Text style={styles.footerSub}>From Craft to Commerce</Text>
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

  backButton: {
    marginBottom: 15,
  },

  backText: {
    color: "#7B3F00",
    fontWeight: "700",
    fontSize: 16,
  },

  profileHeader: {
    alignItems: "center",
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "#FFE3C1",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 42,
  },

  name: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 12,
    color: "#29231E",
  },

  location: {
    color: "#777",
    marginTop: 4,
  },

  badge: {
    backgroundColor: "#FFF0D9",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },

  badgeText: {
    color: "#7B3F00",
    fontWeight: "700",
    fontSize: 12,
  },

  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 19,
    fontWeight: "800",
    color: "#7B3F00",
  },

  statLabel: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#E7DED5",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#29231E",
    marginTop: 25,
    marginBottom: 12,
  },

  rewardCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
  },

  rewardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  rewardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F2E5D6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  rewardEmoji: {
    fontSize: 27,
  },

  rewardTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  rewardSubtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },

  points: {
    color: "#7B3F00",
    fontWeight: "800",
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#E9DED3",
    borderRadius: 10,
    marginTop: 18,
  },

  progress: {
    width: "85%",
    height: 9,
    backgroundColor: "#D98B39",
    borderRadius: 10,
  },

  progressText: {
    color: "#777",
    fontSize: 12,
    marginTop: 8,
  },

  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
  },

  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0E9E2",
  },

  levelEmoji: {
    fontSize: 27,
    width: 48,
  },

  levelTitle: {
    fontWeight: "700",
  },

  levelSub: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  completed: {
    color: "#3A7D44",
    fontSize: 20,
  },

  current: {
    color: "#7B3F00",
    fontSize: 11,
    fontWeight: "800",
  },

  locked: {
    fontSize: 16,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
  },

  infoIcon: {
    fontSize: 22,
    width: 45,
  },

  infoLabel: {
    color: "#888",
    fontSize: 11,
  },

  infoValue: {
    fontWeight: "700",
    marginTop: 3,
  },

  footer: {
    textAlign: "center",
    color: "#7B3F00",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 30,
  },

  footerSub: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
});
