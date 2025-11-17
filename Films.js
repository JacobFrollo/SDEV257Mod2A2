import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import styles from "./styles";

//Finds films and sends them
export default function Films() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/films")
            .then((resp) => resp.json())
            .then(({ results }) => {
                setFilms(results);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);
    //Views the films
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Films</Text>
            <FlatList
                data={films}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title</Text>
                    </View>
                )}
            />
        </View>
    );

}
