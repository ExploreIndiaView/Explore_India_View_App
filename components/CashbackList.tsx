import { useAuthStore } from "@/assets/store/auth.store";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function CashbackList() {
  const { user } = useAuthStore();

  // Sort by date descending and take the latest 3
  const cashbackData = Array.isArray(user?.CashbackDetail)
    ? [...user.CashbackDetail]
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 3)
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cashbacks</Text>
      <FlatList
        data={cashbackData}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.cashbackItem}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
              <Text style={styles.cashbackUser}>
                You have won the cashback of
              </Text>
              <Text style={styles.cashbackAmount}>₹ {item.amount}</Text>
            </View>
            <Text style={{ textAlign: "right", color: "#888", fontSize: 10 }}>
              {item.date?.toLocaleDateString?.().split("T")[0] ??
                (item.date as unknown as string).split("T")[0]}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No cashback records found.</Text>
        }
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 12,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 8,
    textAlign: "center",
  },
  cashbackItem: {
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  cashbackUser: {
    fontSize: 16,
    color: "#22223b",
  },
  cashbackAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
});