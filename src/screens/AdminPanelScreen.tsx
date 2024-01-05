import { useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../supabase";
import { View } from "react-native";
import { Status, TicketDetailScreen } from "./TicketDetailScreen";
import { useQuery } from "react-query";

export interface Ticket {
  id: number;
  name: string;
  email: string;
  status: Status;
  photo: string;
  description: string;
}

export function AdminPanelScreen() {
  const [currentTicket, setCurrentTicket] = useState<Ticket>(null);

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
        <Text style={{ textTransform: "capitalize" }}>{item.name}</Text>
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
      {isLoading && <ActivityIndicator size={20} color={"blue"} />}
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
});
