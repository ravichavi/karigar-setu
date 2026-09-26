import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function RewardsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER */}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Rewards</Text>

      <Text style={styles.subtitle}>Earn points as your business grows</Text>

      {/* POINTS CARD */}

      <View style={styles.pointsCard}>
        <Text style={styles.smallTitle}>YOUR POINTS</Text>

        <View style={styles.pointsRow}>
          <Text style={styles.trophy}>🏆</Text>

          <View>
            <Text style={styles.points}>85</Text>
            <Text style={styles.pointsLabel}>Artisan Points</Text>
          </View>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progress} />
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>Silver Artisan</Text>

          <Text style={styles.progressText}>15 pts to Gold</Text>
        </View>
      </View>

      {/* HOW IT WORKS */}

      <Text style={styles.sectionTitle}>How You Earn Points</Text>

      <View style={styles.earnCard}>
        <View style={styles.earnRow}>
          <View style={styles.iconCircle}>
            <Text>💰</Text>
          </View>

          <View style={styles.earnInfo}>
            <Text style={styles.earnTitle}>Make a Sale</Text>

            <Text style={styles.earnDescription}>
              Earn 1 point for every ₹100 in sales
            </Text>
          </View>

          <Text style={styles.pointsValue}>+1</Text>
        </View>

        <View style={styles.earnRow}>
          <View style={styles.iconCircle}>
            <Text>📦</Text>
          </View>

          <View style={styles.earnInfo}>
            <Text style={styles.earnTitle}>Add Products</Text>

            <Text style={styles.earnDescription}>
              Keep your digital catalogue updated
            </Text>
          </View>

          <Text style={styles.pointsValue}>+2</Text>
        </View>

        <View style={styles.earnRow}>
          <View style={styles.iconCircle}>
            <Text>⭐</Text>
          </View>

          <View style={styles.earnInfo}>
            <Text style={styles.earnTitle}>Customer Review</Text>

            <Text style={styles.earnDescription}>
              Get positive reviews from buyers
            </Text>
          </View>

          <Text style={styles.pointsValue}>+5</Text>
        </View>
      </View>

      {/* LEVELS */}

      <Text style={styles.sectionTitle}>Artisan Levels</Text>

      <View style={styles.levelCard}>
        <View style={styles.level}>
          <Text style={styles.levelIcon}>🥉</Text>

          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Bronze</Text>

            <Text style={styles.levelPoints}>0 – 49 points</Text>
          </View>

          <Text style={styles.done}>✓</Text>
        </View>

        <View style={styles.level}>
          <Text style={styles.levelIcon}>🥈</Text>

          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Silver</Text>

            <Text style={styles.levelPoints}>50 – 99 points</Text>
          </View>

          <Text style={styles.current}>YOU</Text>
        </View>

        <View style={styles.level}>
          <Text style={styles.levelIcon}>🥇</Text>

          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Gold</Text>

            <Text style={styles.levelPoints}>100+ points</Text>
          </View>

          <Text style={styles.lock}>🔒</Text>
        </View>
      </View>

      {/* MOTIVATION */}

      <View style={styles.motivation}>
        <Text style={styles.motivationIcon}>🚀</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.motivationTitle}>You're almost there!</Text>

          <Text style={styles.motivationText}>
            Make ₹1,500 more in sales to unlock Gold Artisan.
          </Text>
        </View>
      </View>
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
    fontSize: 16,
    fontWeight: "700",
  },

  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#7B3F00",
  },

  subtitle: {
    color: "#777",
    marginTop: 5,
    marginBottom: 22,
  },

  pointsCard: {
    backgroundColor: "#7B3F00",
    borderRadius: 20,
    padding: 20,
  },

  smallTitle: {
    color: "#EED9C2",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  trophy: {
    fontSize: 42,
    marginRight: 15,
  },

  points: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
  },

  pointsLabel: {
    color: "#EED9C2",
    fontSize: 12,
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#9A6235",
    borderRadius: 10,
    marginTop: 22,
  },

  progress: {
    width: "85%",
    height: 9,
    backgroundColor: "#F5C47A",
    borderRadius: 10,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  progressText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginTop: 25,
    marginBottom: 12,
    color: "#29231E",
  },

  earnCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 15,
  },

  earnRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0E9E2",
  },

  iconCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#FFF0D9",
    justifyContent: "center",
    alignItems: "center",
  },

  earnInfo: {
    flex: 1,
    marginLeft: 12,
  },

  earnTitle: {
    fontWeight: "800",
    fontSize: 14,
  },

  earnDescription: {
    color: "#888",
    fontSize: 11,
    marginTop: 3,
  },

  pointsValue: {
    color: "#3A7D44",
    fontWeight: "800",
  },

  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 15,
  },

  level: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0E9E2",
  },

  levelIcon: {
    fontSize: 30,
    width: 50,
  },

  levelInfo: {
    flex: 1,
  },

  levelTitle: {
    fontSize: 15,
    fontWeight: "800",
  },

  levelPoints: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  done: {
    color: "#3A7D44",
    fontSize: 20,
  },

  current: {
    color: "#7B3F00",
    fontSize: 10,
    fontWeight: "800",
  },

  lock: {
    fontSize: 15,
  },

  motivation: {
    backgroundColor: "#FFF0D9",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  motivationIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  motivationTitle: {
    color: "#7B3F00",
    fontWeight: "800",
  },

  motivationText: {
    color: "#6D5947",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
});
