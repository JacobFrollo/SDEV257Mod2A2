import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, ActivityIndicator, Switch, } from "react-native";
import styles from "./styles";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmationAlert from "./ConfirmationAlert";
import Swipeable from "./Swipeable";

//Finds films and sends them
export default function Films() {
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    function toggleModal() {
        setModalVisible(!modalVisible);
    }
    function toggleAlert() {
        setSelectedFilm(film);
        setAlertVisible(!alertVisible);
    }
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/films")
            .then((resp) => resp.json())
            .then(({ result }) => {
                setFilms(result);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
    function onSwipe(uid) {
        setFilms((prev) => prev.filter((film) => film.uid !== uid));
    }

    //Views the films
    return (

        <View style={styles.container}>
            <ConfirmationModal
                animationType="fade"
                visible={modalVisible}
                onPressConfirm={toggleModal}
                onPressCancel={toggleModal}
            />
            <ConfirmationAlert
                title="Your Message:"
                message={selectedFilm}
                visible={alertVisible}
                buttons={[{ text: "OK", onPress: toggleAlert }]}
            />
            <Text style={styles.title}>Films</Text>
            <FlatList
                data={films}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                    <Swipeable
                        key={item.uid}
                        onSwipe={() => onSwipe(item.uid)}
                        onPress={() => toggleAlert(item)}
                        name={item.properties.title}
                    />
                )}
            />
        </View>
    );
}