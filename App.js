import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import styles from "./styles";
import Planets from "./Planets";
import Films from "./Films";
import Spaceships from "./Spaceships";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmationAlert from "./ConfirmationAlert";
import PropTypes from "prop-types";
import { Text, TextInput, View } from "react-native";

//Creates navigation
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Defines Input
function Input({ label, ...textInputProps }) {
    return (
        <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>{label}</Text>
            <TextInput style={styles.textInput} {...textInputProps} />
        </View>
    );
}
Input.propTypes = {
    label: PropTypes.string,
};

//Builds the app
export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [submittedText, setSubmittedText] = useState("");
    function toggleModal() {
        setModalVisible(!modalVisible);
    }
    function toggleAlert() {
        setAlertVisible(!alertVisible);
    }
    return (
            <View style={styles.container}>
                <Input
                    onSubmitEditing={(e) => {
                        setSubmittedText(e.nativeEvent.text);
                        toggleAlert();
                    }}
            />
            <ConfirmationModal
                animationType="fade"
                visible={modalVisible}
                onPressConfirm={toggleModal}
                onPressCancel={toggleModal}
            />
                <ConfirmationAlert
                    title="Your Message:"
                    message={submittedText}
                    visible={alertVisible}
                    buttons={[{ text: "OK", onPress: toggleAlert }]}
            />
            <Text style={styles.text} onPress={toggleAlert}>
                Show Confimation Alert
            </Text>
            <NavigationContainer>
            {Platform.OS === "ios" && (
                <Tab.Navigator>
                    <Tab.Screen name="Planets" component={Planets} />
                    <Tab.Screen name="Films" component={Films} />
                    <Tab.Screen name="Spaceships" component={Spaceships} />
                </Tab.Navigator>
            )}

            {Platform.OS === "android" && (
                <Drawer.Navigator>
                    <Drawer.Screen name="Planets" component={Planets} />
                    <Drawer.Screen name="Films" component={Films} />
                    <Drawer.Screen name="Spaceships" component={Spaceships} />
                </Drawer.Navigator>
            )}

            {Platform.OS === "web" && (
                <Tab.Navigator>
                    <Tab.Screen name="Planets" component={Planets} />
                    <Tab.Screen name="Films" component={Films} />
                    <Tab.Screen name="Starships" component={Spaceships} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
        </View >
    );
}