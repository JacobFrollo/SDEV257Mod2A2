import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "ghostwhite",
        padding: 10,
        paddingTop: 80,
    },

    textInputContainer: {
        alignSelf: "stretch",
        marginBottom: 30,
    },

    textInputLabel: {
        marginBottom: 4,
    },

    textInput: {
        backgroundColor: "white",
        height: 20,
        fontSize: 11,
    },

    scroll: {
        height: 1,
        alignSelf: "stretch",
    },

    scrollItem: {
        margin: 20,
        alignSelf: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
    },
    buttonContainer: {
        height: 100,
        width: 200,
        backgroundColor: "orange",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.4,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});