import React, { useEffect } from "react";
import { Alert } from "react-native";

export default function ConfirmationAlert({ visible, title, message, buttons }) {
  useEffect(() => {
    if (visible) {
      Alert.alert(title, message, buttons);
    }
  }, [visible, title, message, buttons]);

  return null;
}

ConfirmationAlert.defaultProps = {
  title: "",
  message: "",
  buttons: [],
};
