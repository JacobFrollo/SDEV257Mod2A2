import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, ActivityIndicator, Switch, } from "react-native";
import styles from "./styles";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmationAlert from "./ConfirmationAlert";
import Swipeable from "./Swipeable";

//Finds the planets and sends them
export default function Planets() {
    const [planets, setPlanets] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedPlanets, setSelectedPlanets] = useState(null);
    function toggleModal() {
        setModalVisible(!modalVisible);
    }
    function toggleAlert() {
        setSelectedPlanets(planets);
        setAlertVisible(!alertVisible);
    }

    useEffect(() => {
        fetch("https://www.swapi.tech/api/planets")
            .then((resp) => resp.json())
            .then(({ results }) => {
                setPlanets(results);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    function onSwipe(uid) {
        setPlanets((prev) => prev.filter((planet) => planet.uid !== uid));
    }

    //Views the planets
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Planets</Text>
            <ConfirmationModal
                animationType="fade"
                visible={modalVisible}
                onPressConfirm={toggleModal}
                onPressCancel={toggleModal}
            />
            <ConfirmationAlert
                title="Your Message:"
                message={selectedPlanets}
                visible={alertVisible}
                buttons={[{ text: "OK", onPress: toggleAlert }]}
            />
            <FlatList
                data={planets}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                    <Swipeable
                        key={item.uid}
                        onSwipe={() => onSwipe(item.uid)}
                        onPress={() => toggleAlert(item)}
                        name={item.name}
                    />
                )}
            />
        </View>
    );
}