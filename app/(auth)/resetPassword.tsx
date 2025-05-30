import { ResetInput, UserInput } from "@/assets/services/types";
import { useAuthStore } from "@/assets/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { CountryCode } from "react-native-country-picker-modal";
import CountryPicker from "react-native-country-picker-modal";

export default function ResetPasswordScreen() {
  const [input, setInput] = useState<ResetInput>({
    isoCode: "+91",
    mobile: "",
    password: "",
    answer: "",
    question: "",
  });
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [country, setCountry] = useState<Country | null>(null);
  const [withCountryNameButton] = useState(false);
  const [showPassowrd, setshowPassowrd] = useState(false);
  const [withFlag] = useState(true);
  const [withCallingCode] = useState(true);
  const [loading, setLoading] = useState(false);
  const { resetPassword, error } = useAuthStore();

  interface Country {
    cca2: CountryCode;
    callingCode: string[];
    [key: string]: any;
  }

  const onSelect = (country: Country): void => {
    setCountryCode(country.cca2);
    setCountry(country);
    setInput({ ...input, isoCode: `+${country.callingCode[0]}` });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await resetPassword(input);
      if(res) {
        router.replace("/(auth)");
      }
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {/* Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <View style={styles.row}>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag={withFlag}
            withCallingCode={withCallingCode}
            withCallingCodeButton={withCallingCode}
            withCountryNameButton={withCountryNameButton}
            onSelect={onSelect}
            containerButtonStyle={styles.countryPicker}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 8 }]}
            placeholder="Enter Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            value={input.mobile}
            onChangeText={(text) => setInput({ ...input, mobile: text })}
          />
        </View>
        {/* Security Question */}
        <Text style={styles.label}>Security Question</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={input.question}
            onValueChange={(itemValue) =>
              setInput({ ...input, question: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Security Question" value={undefined} />
            <Picker.Item label="What is your pet's name?" value={"pet"} />
            <Picker.Item
              label="What was the name of your first school?"
              value={"school"}
            />
            <Picker.Item label="In which city were you born?" value={"city"} />
          </Picker>
        </View>
        {/* Answer */}
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Answer"
          value={input.answer}
          onChangeText={(text) => setInput({ ...input, answer: text })}
        />
        {/* Password */}
        <Text style={styles.label}>New Password</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter new Password"
            secureTextEntry={!showPassowrd}
            value={input.password}
            onChangeText={(text) => setInput({ ...input, password: text })}
          />
          <Pressable
            style={styles.showPassword}
            onPress={() => setshowPassowrd(!showPassowrd)}
          >
            <Ionicons
              name={showPassowrd ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        {/* Submit */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => {
              router.push("/(auth)");
            }}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#dbeafe",
    paddingBottom: 8,
  },
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    color: "#000",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 12,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    height: 44,
    paddingHorizontal: 8,
  },
  showPassword: {
    position: "absolute",
    top: -5,
    right: 0,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 14,
  },
  footerText: {
    marginTop: 18,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
});
