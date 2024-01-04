import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { EndUserScreen } from "../screens/EndUserScreen";
import { AdminPanelScreen } from "../screens/AdminPanelScreen";

const Drawer = createDrawerNavigator();
const linking = {
  prefixes: ["yourapp://"], // Replace with your actual app prefix
  config: {
    screens: {
      EndUser: "enduser",
      AdminPanel: "adminpanel",
      TicketDetail: "ticketdetail",
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator initialRouteName="EndUser">
        <Drawer.Screen name="EndUser" component={EndUserScreen} />
        <Drawer.Screen name="AdminPanel" component={AdminPanelScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
