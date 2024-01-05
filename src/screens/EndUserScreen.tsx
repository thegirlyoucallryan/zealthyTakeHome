import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import { supabase } from "../../supabase";
import { Ticket } from "./AdminPanelScreen";
import { useQueryClient } from "react-query";

//for Photos/attachements I am deeming it a string.  Normally, I would ask for permissions to access media gallery and if permissions were granted users could select an image/file,
//  I'd use like expo fs or react native file system, convert the file to a blob and store it in a storage bucket like s3 to be hosted and pass the string url from that to the backend.
//I currently have a project in which I am doing this if you'd like to see.

export function EndUserScreen() {
  const { control, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const queryKey = "tickets";
  const submitTicket = async (data: Ticket) => {
    const { name, email, photo, description } = data;
    const { data: responseData, error } = await supabase
      .from("zealthy")
      .insert([{ name, email, photo, description, status: "new" }]);

    if (error) {
      console.error("Error submitting ticket:", error);
    } else {
      console.log(
        "New ticket submitted:",
        responseData ? responseData[0] : "noResponseData",
        queryClient.invalidateQueries(queryKey)
      );
      reset({});
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        padding: 5,
        backgroundColor: "whitesmoke",
      }}
    >
      <Text style={{ color: "blue", fontSize: 30, textAlign: "center" }}>
        Submit Ticket
      </Text>
      <View style={{ backgroundColor: "white", padding: 20 }}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              returnKeyType="done"
              style={styles.input}
              placeholder="Name"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="name"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              returnKeyType="done"
              style={styles.input}
              placeholder="Email"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="email"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              returnKeyType="done"
              style={styles.input}
              placeholder="Photo/Attachment"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="photo"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              multiline
              textAlignVertical="top"
              returnKeyType="done"
              style={styles.input}
              placeholder="Description"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="description"
          defaultValue=""
        />
        <Button title="Submit Ticket" onPress={handleSubmit(submitTicket)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});
