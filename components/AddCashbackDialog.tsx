import { API_URL } from "@/assets/services/API";
import { User } from "@/assets/services/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

// Dummy users and cashback data for demonstration


export default function CashbackPage({ token }: { token: string }) {
  const [UserList, setUserList] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(UserList);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  //  fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/auth/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 400) throw new Error(response.data.message);
      setUserList(response.data.users);
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Filter users as user types
  const handleSearch = (text: string) => {
    setSearch(text);
    setSelectedUser(null);
    if (text.trim() === "") {
      setFilteredUsers(UserList);
    } else {
      setFilteredUsers(
        UserList.filter(
          (u) =>
            u.fullname.toLowerCase().includes(text.toLowerCase()) ||
            u.mobile.includes(text)
        )
      );
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearch(`${user.fullname} (${user.mobile})`);
    setFilteredUsers([]);
  };

  const handleAddCashback = async () => {
    if (!selectedUser || !amount) return;
    const cashbackData = {
      mobile: selectedUser.mobile,
      CashbackAmount: parseFloat(amount),
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/addCashback`,
        cashbackData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 400) throw new Error(response.data.message);
      Alert.alert("Cashback added successfully!");
      // Reset form
      setSelectedUser(null);
      setAmount("");
      setSearch("");
      setModalVisible(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message || "Failed to add cashback");
      } else {
        Alert.alert("An unexpected error occurred");
      }      
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addBtnText}>Add Cashback</Text>
      </TouchableOpacity>

      {/* Dialog/Modal for Add Cashback */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Cashback</Text>
            <Text style={styles.label}>Select User</Text>
            <TextInput
              style={styles.input}
              placeholder="Search by name or number"
              value={search}
              onChangeText={handleSearch}
              onFocus={() => setFilteredUsers(UserList)}
            />
            {filteredUsers.length > 0 && !selectedUser && (
              <View style={styles.dropdown}>
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleUserSelect(item)}
                    >
                      <Text>
                        {item.fullname} ({item.mobile})
                      </Text>
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: 120 }}
                />
              </View>
            )}
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cashback amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleAddCashback}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitBtnText}>Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#22223b",
    textAlign: "center",
  },
  cashbackItem: {
    flexDirection: "row",
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
  addBtn: {
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 22,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    color: "#22223b",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: "#22223b",
    backgroundColor: "#f9fafb",
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 8,
    maxHeight: 120,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  submitBtn: {
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    minWidth: 100,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
    minWidth: 80,
  },
  cancelBtnText: {
    color: "#22223b",
    fontWeight: "bold",
    fontSize: 16,
  },
});
