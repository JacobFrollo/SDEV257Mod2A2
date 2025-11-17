import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import styles from "./styles";

//Finds the spaceships and sends them
export default function Spaceships() {
    const [starships, setStarships] = useState([]);

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

    //Views the spaceships
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Spaceships</Text>
            <FlatList
                data={starships}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}