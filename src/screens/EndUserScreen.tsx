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

export function EndUserScreen() {
  const { control, handleSubmit, reset } = useForm();

  const submitTicket = async (data) => {
    const { name, email, photo, description } = data;
    const { data: responseData, error } = await supabase
      .from("zealthy")
      .insert([{ name, email, photo, description, status: "new" }]);

    if (error) {
      console.error("Error submitting ticket:", error);
    } else {
      console.log(
        "New ticket submitted:",
        responseData ? responseData[0] : "noResponseData"
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
