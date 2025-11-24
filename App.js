import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, Text, TextInput, View, Button } from "react-native";
import PropTypes from "prop-types";
import ConfirmationAlert from "./ConfirmationAlert";
import Planets from "./Planets";
import Films from "./Films";
import Spaceships from "./Spaceships";

// Navigation
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Input component
function Input(props) {
  return (
    <View style={{ margin: 10 }}>
      <Text>{props.label}</Text>
      <TextInput style={{ borderWidth: 1, padding: 5 }} {...props} />
    </View>
  );
}
Input.propTypes = {
  label: PropTypes.string,
};

// What the screen displays
export default function App() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");
  function toggleAlert() {
    setAlertVisible(!alertVisible);
  }

  return (
    <View style={{ flex: 1 }}>
      <Input
        onSubmitEditing={(e) => {
          setSubmittedText(e.nativeEvent.text);
          toggleAlert();
        }}
      />
      <ConfirmationAlert
        title="Your Message:"
        message={submittedText}
        visible={alertVisible}
        buttons={[{ text: "OK", onPress: toggleAlert }]}
      />
      <NavigationContainer>
        {Platform.OS === "ios" ? (
          <Tab.Navigator>
            <Tab.Screen name="Planets" component={Planets} />
            <Tab.Screen name="Films" component={Films} />
            <Tab.Screen name="Spaceships" component={Spaceships} />
          </Tab.Navigator>
        ) : (
          <Drawer.Navigator>
            <Drawer.Screen name="Planets" component={Planets} />
            <Drawer.Screen name="Films" component={Films} />
            <Drawer.Screen name="Spaceships" component={Spaceships} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}
