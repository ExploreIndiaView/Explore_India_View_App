import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { BLOGS } from "@/assets/services/Options"; // Adjust path as needed
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Blogs({ expand }: { expand?: boolean }) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>Travel Blogs</Text>
        {!expand && (
          <Pressable onPress={() => router.push("/blogs")}>
            <Text style={styles.showMore}>Show more</Text>
          </Pressable>
        )}
      </View>
      <Carousel
        width={width * 0.85}
        height={expand ? 800 : 220}
        autoPlay
        data={BLOGS}
        scrollAnimationDuration={1200}
        style={styles.carousel}
        renderItem={({ item }) => (
          <View style={[styles.card, { height: expand ? "auto" : 200 }]}>
            <Text style={styles.blogTitle}>{item.BlogTitle}</Text>
            <Text style={styles.metaTitle}>{item.MetaDescription}</Text>
            <Text style={styles.contentSummary} numberOfLines={!expand ? 3 : 0}>
              {item.Content}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#f3f4f6",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 18,
  },
  carousel: {
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  metaTitle: {
    color: "#7c3aed",
    fontSize: 15,
    marginVertical: 4,
  },
  metaDesc: {
    color: "#4b5563",
    fontSize: 13,
    marginBottom: 4,
  },
  contentSummary: {
    color: "#6b7280",
    fontSize: 12,
  },
  showMore: {
    color: "#7c3aed",
    fontSize: 15,
    textDecorationLine:"underline"
  },
});
