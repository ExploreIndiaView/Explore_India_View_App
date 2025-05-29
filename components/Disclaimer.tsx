import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Disclaimer() {
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

        {/* Terms and Conditions */}
        <Text style={styles.subheading}>
          <Text role="img" aria-label="briefcase">
            💼{" "}
          </Text>
          Terms and Conditions
        </Text>
        <Text style={styles.paragraph}>
          1. Acceptance of Terms {"\n"}
          By using our app or website, you agree to these Terms & Conditions. If
          you do not agree, please refrain from using our services. {"\n\n"}
          2. Links and Offers {"\n"}
          Explore India View shares affiliate links for train tickets, hotel
          bookings, flights, recharges, and shopping offers. When users make a
          purchase or transaction through these links, we may earn a commission.
          {"\n\n"}
          3. Cashback Rewards {"\n"}
          Users may be eligible for cashback or rewards on successful, verified
          transactions. The reward process may take 30-90 days, depending on the
          affiliate platform's confirmation. {"\n\n"}
          4. Acceptance of Terms {"\n"}
          By using our app or website, you agree to these Terms & Conditions. If
          you do not agree, please refrain from using our services. {"\n\n"}
          5. User Data & Tracking {"\n"}
          We use SubID tracking and may store transaction IDs or device details
          to identify users eligible for rewards. All data is handled securely
          and per our Privacy Policy. {"\n\n"}
          6. Limitation of Liability {"\n"}
          By using our app or website, you agree to these Terms & Conditions. If
          you do not agree, please refrain from using our services.{"\n\n"}
          7. Modifications {"\n"}
          We reserve the right to modify these terms at any time. Updated terms
          will be posted on the app/website.{"\n\n"}
          {"\n\n"}
        </Text>

        {/* Privacy Policy */}
        <Text style={[styles.subheading, {marginTop: -50}]}>
          <Text role="img" aria-label="briefcase">
            💼{" "}
          </Text>
          Privacy Policy
        </Text>
        <Text style={styles.paragraph}>
          1. Information we collect {"\n"}
          We collect basic user data such as name, email, mobile number, device
          ID, and transaction IDs (if provided). This helps us track offers and
          reward eligibility. {"\n\n"}
          2. How we use your information {"\n"}- To track affiliate transactions
          via SubID {"\n"}- To communicate about rewards, offers, and app {"\t"}
          updates {"\n"}- To improve app features and user experienc
          {"\n\n"}
          3. Data Sharing {"\n"}
          We do not sell your personal data. We may share it with trusted
          partners (e.g., affiliate networks) for transaction verification and
          cashback processing. {"\n\n"}
          4. Cookies and Analytics {"\n"}
          We may use cookies and analytics tools to understand user behavior and
          improve our services.{"\n\n"}
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
    marginVertical:10,
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
