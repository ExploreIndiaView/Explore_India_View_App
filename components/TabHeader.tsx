import { useAuthStore } from "@/assets/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabHeader({
  onSidebarPress,
  onProfilePress,
}: {
  onSidebarPress?: () => void;
  onProfilePress?: () => void;
}) {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [langDropdownVisible, setLangDropdownVisible] = useState(false);
  const { logout } = useAuthStore();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    router.push("/(auth)");
    setDropdownVisible(false);
  };

  const handleLanguageChange = (lang: string) => {
    // i18n.changeLanguage(lang);
    setLangDropdownVisible(false);
  };

  const handleProfilePress = () => {
    setDropdownVisible(!dropdownVisible);
    if (onProfilePress) onProfilePress();
  };

  const handleMenuOption = (option: string) => {
    setDropdownVisible(false);
    // Handle navigation or actions here
    if (option === "profile") router.push("/profile");
    if (option === "logout") handleLogout();
    if (option === "T&C") router.push("/disclaimer")
  };
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        {/* Sidebar/Menu Button */}
        <TouchableOpacity onPress={onSidebarPress} style={styles.iconButton}>
          <Ionicons name="menu" size={28} color="#22223b" />
        </TouchableOpacity>

        {/* App Logo */}
        <Pressable
          onPress={() => {
            router.push("/");
          }}
        >
          <Image
            source={require("@/assets/images/logo.png")} // Update path to your logo
            style={styles.logo}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* User Profile Icon */}
      {/* Right Side: Language + Profile */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Language Dropdown */}
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => setLangDropdownVisible((v) => !v)}
            style={styles.iconButton}
          >
            <Ionicons name="language" size={20} color="#22223b" />
            <Ionicons
              name={langDropdownVisible ? "chevron-up" : "chevron-down"}
              size={18}
              color="#22223b"
              style={{ marginLeft: -8, marginTop: 2 }}
            />
          </TouchableOpacity>
          {langDropdownVisible && (
            <View style={styles.langDropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleLanguageChange("en")}
              >
                <Text style={styles.dropdownText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleLanguageChange("hi")}
              >
                <Text style={styles.dropdownText}>हिन्दी</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* User Profile Icon */}
        <View>
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.iconButton}
          >
            <Image
              source={require("@/assets/images/user-profile.png")}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleMenuOption("profile")}
              >
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleMenuOption("T&C")}
              >
                <Text style={styles.dropdownText}>T&C</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleMenuOption("logout")}
              >
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: "relative", // <-- Add this
    zIndex: 10, // <-- Add this
  },
  iconButton: {
    marginTop: 5,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logo: {
    width: 120,
    height: 50,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 120,
    zIndex: 100,
  },
  langDropdownMenu: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 100,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  dropdownText: {
    fontSize: 16,
    color: "#22223b",
  },
});
