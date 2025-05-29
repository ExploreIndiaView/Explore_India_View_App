import { API_URL } from "@/assets/services/API"; // Adjust path as needed
import { useAuthStore } from "@/assets/store/auth.store"; // Adjust path as needed
import CashbackPage from "@/components/AddCashbackDialog";
import BackHeader from "@/components/BackHeader";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import BookingTable from "./_components/BookingTable"; // Use the BookingTable provided earlier
import Details from "./_components/Details"; // Use the Details component provided earlier
import QueriesTable from "./_components/QueriesTable"; // Use the QueriesTable provided earlier

export default function AdminScreen() {
  const { isAdmin, token } = useAuthStore();
  const [Queries, setQueries] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [queriesPageNumber, setqueriesPageNumber] = useState(1);
  const [loading, setloading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"bookings" | "queries">(
    "bookings"
  );
  const [bookings, setbookings] = useState([]);

  // Fetch Queries
  const fetchQueries = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${API_URL}/api/v1/query/get-queries?page=${queriesPageNumber}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQueries(response.data.queries);
    } catch (error) {
      // handle error
    } finally {
      setloading(false);
    }
  };

  // Fetch All Bookings
  const fetchAllBookings = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `${API_URL}/api/v1/booking/get-bookings-admin?page=${pageNumber}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setbookings(response.data.bookings);
    } catch (error) {
      // handle error
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [pageNumber]);

  useEffect(() => {
    fetchQueries();
  }, [queriesPageNumber]);

  if (!isAdmin) {
    return (
      <View style={styles.unauthContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.unauthText}>Unauthorized</Text>
      </View>
    );
  }

  return (
    <>
      <BackHeader />
      <Details token={token as string} />
      <CashbackPage token={token as string} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.tabButtons}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "bookings" && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab("bookings")}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === "bookings" && styles.tabButtonTextActive,
              ]}
            >
              Bookings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "queries" && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab("queries")}
          >
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === "queries" && styles.tabButtonTextActive,
              ]}
            >
              Queries
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          {selectedTab === "bookings" ? (
            <BookingTable
              bookings={bookings}
              pageNumber={pageNumber}
              setpageNumber={setpageNumber}
              loading={loading}
            />
          ) : (
            <QueriesTable
              Queries={Queries}
              pageNumber={queriesPageNumber}
              setPageNumber={setqueriesPageNumber}
              loading={loading}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  tabButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  tabButtonActive: {
    backgroundColor: "#10b981",
  },
  tabButtonText: {
    color: "#22223b",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: "#fff",
  },
  detailsWrapper: {
    // No flex, just takes its own height
    height: 100,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  tabViewWrapper: {
    flex: 1, // Fills the rest of the space
    minHeight: 0, // Ensures proper flex behavior
  },
  tabBar: {
    backgroundColor: Colors.GRAY,
    elevation: 2,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  tabLabel: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabView: {
    flex: 1,
    marginTop: 0,
  },
  unauthContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  unauthText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ef4444",
    fontFamily: "monospace",
  },
});
