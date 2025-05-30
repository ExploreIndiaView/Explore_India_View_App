import BackHeader from "@/components/BackHeader";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Privacy() {
  const router = useRouter();
  return (
    <>
      <BackHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Privacy Policy */}
          <Text style={[styles.subheading]}>
            <Text role="img" aria-label="briefcase">
              💼{" "}
            </Text>
            Privacy Policy
          </Text>
          <Text style={styles.paragraph}>
            1. Information we collect {"\n"}
            We collect basic user data such as name, email, mobile number,
            device ID, and transaction IDs (if provided). This helps us track
            offers and reward eligibility. {"\n\n"}
            2. How we use your information {"\n"}- To track affiliate
            transactions via SubID {"\n"}- To communicate about rewards, offers,
            and app {"\t"}
            updates {"\n"}- To improve app features and user experienc
            {"\n\n"}
            3. Data Sharing {"\n"}
            We do not sell your personal data. We may share it with trusted
            partners (e.g., affiliate networks) for transaction verification and
            cashback processing. {"\n\n"}
            4. Cookies and Analytics {"\n"}
            We may use cookies and analytics tools to understand user behavior
            and improve our services.{"\n\n"}
            5. Security {"\n"}
            We use industry-standard security measures to protect your data from
            unauthorized access or disclosure {"\n\n"}
            6. Your Rights {"\n"}
            You can request access, correction, or deletion of your data by
            emailing us.{"\n\n"}
            7. Contact {"\n"}
            For privacy concerns and related queries, email us at:
            support@exploreindiaview.com
            {"\n\n"}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                router.replace("/disclaimer/terms");
              }}
            >
              <Text style={{ textDecorationLine: "underline" }}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.replace("/disclaimer");
              }}
            >
              <Text style={{ textDecorationLine: "underline" }}>
                Disclaimer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "auto",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 22,
    width: "100%",
    maxWidth: 600,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginVertical: 5,
    textAlign: "center",
  },
  subheading: {
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "700",
    color: "#334155",
  },
  paragraph: {
    fontSize: 15,
    marginVertical: 15,
    color: "#374151",
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "justify",
  },
});
