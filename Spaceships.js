import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, ActivityIndicator, Switch, } from "react-native";
import styles from "./styles";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmationAlert from "./ConfirmationAlert";
import Swipeable from "./Swipeable";

//Finds the starships and sends them
export default function Starships() {
    const [starships, setStarships] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedStarships, setSelectedStarships] = useState(null);
    function toggleModal() {
        setModalVisible(!modalVisible);
    }
    function toggleAlert() {
        setSelectedStarships(starships);
        setAlertVisible(!alertVisible);
    }

    useEffect(() => {
        fetch("https://www.swapi.tech/api/starships")
            .then((resp) => resp.json())
            .then(({ results }) => {
                setStarships(results);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    function onSwipe(uid) {
        setStarships((prev) => prev.filter((starships) => starships.uid !== uid));
    }

    //Views the starships
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Starships</Text>
            <ConfirmationModal
                animationType="fade"
                visible={modalVisible}
                onPressConfirm={toggleModal}
                onPressCancel={toggleModal}
            />
            <ConfirmationAlert
                title="Your Message:"
                message={selectedStarships}
                visible={alertVisible}
                buttons={[{ text: "OK", onPress: toggleAlert }]}
            />
            <FlatList
                data={starships}
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