import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddProductScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access to upload a product.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const generateListing = () => {
    if (!image) {
      Alert.alert("Add Product Photo", "Please upload or take a photo first.");
      return;
    }

    router.push({
      pathname: "/ai-result",
      params: {
        image,
        description,
      },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER */}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add New Product</Text>

      <Text style={styles.subtitle}>
        Turn your craftsmanship into a professional digital listing.
      </Text>

      {/* PHOTO SECTION */}

      <Text style={styles.sectionTitle}>1. Product Photo</Text>

      <TouchableOpacity style={styles.photoBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.productImage} />
        ) : (
          <>
            <Text style={styles.cameraIcon}>📸</Text>

            <Text style={styles.photoTitle}>Upload Product Photo</Text>

            <Text style={styles.photoSubtitle}>Tap to choose from gallery</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.photoButtons}>
        <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
          <Text style={styles.secondaryText}>🖼️ Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
          <Text style={styles.secondaryText}>📷 Camera</Text>
        </TouchableOpacity>
      </View>

      {/* DESCRIPTION */}

      <Text style={styles.sectionTitle}>2. Describe Your Product</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Tell us about your product..."
          placeholderTextColor="#999"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={styles.micButton}
          onPress={() =>
            Alert.alert(
              "Voice Assistant 🎙️",
              "Voice-to-text will be connected here.",
            )
          }
        >
          <Text style={styles.micIcon}>🎙️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hint}>
        💡 You can speak in Hindi or your preferred language.
      </Text>

      {/* AI INFO */}

      <View style={styles.aiInfo}>
        <Text style={styles.aiIcon}>✨</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.aiTitle}>Let AI do the work</Text>

          <Text style={styles.aiText}>
            We'll create a professional product name, description and suggest a
            suitable price.
          </Text>
        </View>
      </View>

      {/* GENERATE BUTTON */}

      <TouchableOpacity style={styles.generateButton} onPress={generateListing}>
        <Text style={styles.generateText}>✨ Generate My Listing</Text>
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
    fontSize: 16,
    fontWeight: "700",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#7B3F00",
  },

  subtitle: {
    color: "#777",
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#29231E",
    marginBottom: 12,
    marginTop: 8,
  },

  photoBox: {
    height: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#D8C3AC",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  cameraIcon: {
    fontSize: 45,
  },

  photoTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
  },

  photoSubtitle: {
    color: "#888",
    marginTop: 5,
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  photoButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    marginBottom: 15,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0D2C4",
  },

  secondaryText: {
    color: "#7B3F00",
    fontWeight: "700",
  },

  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    minHeight: 130,
    padding: 15,
    flexDirection: "row",
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    textAlignVertical: "top",
    color: "#333",
  },

  micButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF0DD",
    justifyContent: "center",
    alignItems: "center",
  },

  micIcon: {
    fontSize: 22,
  },

  hint: {
    fontSize: 12,
    color: "#777",
    marginTop: 7,
  },

  aiInfo: {
    backgroundColor: "#FFF0D9",
    borderRadius: 16,
    padding: 16,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },

  aiIcon: {
    fontSize: 30,
    marginRight: 12,
  },

  aiTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7B3F00",
  },

  aiText: {
    color: "#6D5947",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  generateButton: {
    backgroundColor: "#7B3F00",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  generateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
