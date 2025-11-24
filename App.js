import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Planets from "./Planets";
import Films from "./Films";
import Spaceships from "./Spaceships";
import PropTypes from "prop-types";
import { Text, TextInput, View } from "react-native";

//Creates navigation
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Defines Input
function Input(props) {
    return (
        <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>{props.label}
            </Text>
            <TextInput style={styles.textInput} {...props} />
        </View>
    );
}
Input.propTypes = {
    label: PropTypes.string,
};

//Collects Text
export default function CollectingTextInput() {
    return (
        <View style={styles.container}>
            <Input label="Basic Text Input:" />
        </View>
    );
}

//Builds the app
export default function App() {
    return (
        <NavigationContainer>
            {Platform.OS === "ios" && (
                <Tab.Navigator>
                    <Tab.Screen name="Planets" component={Planets} />
                    <Tab.Screen name="Films" component={Films} />
                    <Tab.Screen name="Spaceships" component={Spaceships} />
                </Tab.Navigator>
            )}

            {Platform.OS == "android" && (
                <Drawer.Navigator>
                    <Drawer.Screen name="Planets" component={Planets} />
                    <Drawer.Screen name="Films" component={Films} />
                    <Drawer.Screen name="Spaceships" component={Spaceships} />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
}
