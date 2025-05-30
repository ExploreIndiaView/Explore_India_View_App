import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Disclaimer() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>
          <Text role="img" aria-label="scroll">
            📜{" "}
          </Text>
          Disclaimer
        </Text>
        <Text style={styles.paragraph}>
          Explore India View is a platform that provides access to third-party
          services, including travel booking, recharges, hotel reservations, and
          shopping offers via affiliate links. We do not own or operate these
          services and are not responsible for service delivery, delays,
          cancellations, or payments processed by third-party platforms such as
          Amazon, Flipkart, IRCTC, Meesho, Ola, Uber, etc
          {"\n\n"}
          All content, offers, prices, and availability are subject to change
          and may vary on the respective partner websites. Cashback and rewards
          are subject to verification and confirmation from our affiliate
          partners. Explore India View shall not be held liable for any disputes
          or losses arising from transactions made on partner platforms
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
              router.replace("/disclaimer/privacy");
            }}
          >
            <Text style={{ textDecorationLine: "underline" }}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
