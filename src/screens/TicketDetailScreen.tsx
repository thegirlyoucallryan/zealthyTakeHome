import { Button, Pressable, Text, TextInput, View } from "react-native";
import { supabase } from "../../supabase";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { useQueryClient } from "react-query";

export type Status = "new" | "resolved" | "in progress";

export function TicketDetailScreen({
  item,
  close,
  stat,
}: {
  item: any;
  close: () => void;
  stat: Status;
}) {
  const [status, setStatus] = useState<Status>(stat);
  const queryClient = useQueryClient();
  const queryKey = "tickets";
  const [open, setOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const [items, setItems] = useState([
    { label: "New", value: "New" },
    { label: "Resolved", value: "Resolved" },
    { label: "In Progress", value: "In Progress" },
  ]);

  const handleStatusUpdate = async () => {
    try {
      // Update the status in Supabase
      const { data, error } = await supabase
        .from("zealthy")
        .update({ status: status.toLowerCase() })
        .eq("id", item.id)
        .select();

      // Handle success or error
      if (data) {
        console.log("Status updated successfully:", data);
        queryClient.invalidateQueries(queryKey);
      } else if (error) {
        console.error("Error updating status:", error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        alignSelf: "center",

        padding: 30,
      }}
    >
      <Pressable onPress={close}>
        <Text
          style={{
            alignSelf: "flex-end",
            marginBottom: 30,
            textDecorationLine: "underline",
          }}
        >
          Close X
        </Text>
      </Pressable>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ textTransform: "capitalize" }}>Name: {item.name}</Text>
        <Text>Status:{status ? status : item.status}</Text>
      </View>
      <View>
        <View
          style={{
            width: "70%",
            alignItems: "center",
            alignContent: "center",
            marginVertical: 20,
          }}
        >
          <DropDownPicker
            style={{
              backgroundColor: "white",
              zIndex: 200,
            }}
            open={open}
            setOpen={setOpen}
            value={status}
            items={items}
            setValue={setStatus}
            setItems={setItems}
            multiple={false}
            multipleText={status}
          />
          <Button title="Update Status" onPress={handleStatusUpdate} />
        </View>
      </View>

      <Text style={{ marginVertical: 15 }}>
        Description: {item.description}
      </Text>

      <View>
        <Text>Response</Text>
        <TextInput
          style={{
            margin: 15,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 11,
            padding: 12,
          }}
          multiline
          textAlignVertical="top"
          returnKeyType="done"
          placeholder="Submit a response to this ticket"
          value={response}
          onChangeText={(text) => {
            setResponse(text);
          }}
        />
        <Pressable
          style={{ backgroundColor: "blue", padding: 9, borderRadius: 9 }}
          onPress={() =>
            console.log("Would normally send email here with body:", response)
          }
        >
          <Text style={{ textAlign: "center", color: "white" }}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
