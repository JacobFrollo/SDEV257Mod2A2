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
import { Text, TextInput, View, Pressable } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

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
    const radius = useSharedValue(30);
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);
    const color = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            color.value,
            [0, 1],
            ["red", "blue"]
        );

        return {
            opacity: opacity.value,
            borderRadius: radius.value,
            transform: [{ scale: scale.value }],
            backgroundColor: backgroundColor,
        };
    }, []);

    const onPressIn = () => {
        radius.value = withSpring(20);
        opacity.value = withSpring(0.7);
        scale.value = withSpring(0.9);
    };

    const onLongPress = () => {
        scale.value = withSpring(0.8);
        color.value = withSpring(1);
    };

    const onPressOut = () => {
        radius.value = withSpring(30);
        opacity.value = withSpring(1);
        scale.value = withSpring(1, { damping: 50 });
        color.value = withSpring(0);
    }
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
            <Animated.View style={[styles.buttonContainer, animatedStyles]}>
                <Pressable
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onLongPress={onLongPress}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} onPress={toggleAlert}>
                        Show Confimation Alert
                    </Text>
                </Pressable>
            </Animated.View>
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