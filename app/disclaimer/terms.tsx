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

export default function Disclaimer() {
  const router = useRouter();
  return (
    <>
      <BackHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Terms and Conditions */}
          <Text style={styles.subheading}>
            <Text role="img" aria-label="briefcase">
              💼{" "}
            </Text>
            Terms and Conditions
          </Text>
          <Text style={styles.paragraph}>
            1. Acceptance of Terms {"\n"}
            By using our app or website, you agree to these Terms & Conditions.
            If you do not agree, please refrain from using our services.{" "}
            {"\n\n"}
            2. Links and Offers {"\n"}
            Explore India View shares affiliate links for train tickets, hotel
            bookings, flights, recharges, and shopping offers. When users make a
            purchase or transaction through these links, we may earn a
            commission.
            {"\n\n"}
            3. Cashback Rewards {"\n"}
            Users may be eligible for cashback or rewards on successful,
            verified transactions. The reward process may take 30-90 days,
            depending on the affiliate platform's confirmation. {"\n\n"}
            4. Acceptance of Terms {"\n"}
            By using our app or website, you agree to these Terms & Conditions.
            If you do not agree, please refrain from using our services.{" "}
            {"\n\n"}
            5. User Data & Tracking {"\n"}
            We use SubID tracking and may store transaction IDs or device
            details to identify users eligible for rewards. All data is handled
            securely and per our Privacy Policy. {"\n\n"}
            6. Limitation of Liability {"\n"}
            By using our app or website, you agree to these Terms & Conditions.
            If you do not agree, please refrain from using our services.{"\n\n"}
            7. Modifications {"\n"}
            We reserve the right to modify these terms at any time. Updated
            terms will be posted on the app/website.{"\n\n"}
            {"\n\n"}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                router.replace("/disclaimer/privacy");
              }}
            >
              <Text style={{ textDecorationLine: "underline" }}>
                Privacy Policy
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
    marginBottom: 2,
    color: "#374151",
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "justify",
  },
});
