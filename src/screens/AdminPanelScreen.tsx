import { useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Pressable } from "react-native";
import { supabase } from "../../supabase";
import { View } from "react-native";
import { TicketDetailScreen } from "./TicketDetailScreen";
import { useQuery } from "react-query";

interface Ticket {
  id: number;
  name: string;
  status: string;
  // Add other properties as needed
}

export function AdminPanelScreen() {
  const [currentTicket, setCurrentTicket] = useState(null);

  const fetchTickets = async (): Promise<Ticket[]> => {
    try {
      const { data, error } = await supabase.from("zealthy").select("*");
      if (error) {
        throw new Error("Error fetching tickets");
      }
      return data as Ticket[];
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  };
  const {
    data: tickets,
    isLoading,
    isError,
    refetch,
  } = useQuery<Ticket[], Error>("tickets", fetchTickets);

  function RenderTickets(item: any) {
    return (
      <Pressable
        onPress={() => {
          setCurrentTicket(item);
        }}
        style={({ pressed }) => [
          {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: pressed ? "lightgray" : "white",
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          },
        ]}
      >
        <Text> {item.id}</Text>
        <Text>{item.name}</Text>
        <Text> {item.status}</Text>
      </Pressable>
    );
  }

  const ListHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        backgroundColor: "lightgray",
      }}
    >
      <Text>ID</Text>
      <Text>Name</Text>
      <Text>Status</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={{ color: "blue", fontSize: 30, textAlign: "center" }}>
        Tickets:
      </Text>
      {currentTicket ? (
        <TicketDetailScreen
          stat={currentTicket.status}
          item={currentTicket}
          close={() => setCurrentTicket(null)}
        />
      ) : (
        <FlatList
          ListHeaderComponent={ListHeader}
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: any) => RenderTickets(item)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  ticketsTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  ticketText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
