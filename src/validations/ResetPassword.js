import React from "react";
import { Text, View } from "react-native";
import { Styles } from "../styles/Styles";

export const ResetPassword = ({ olderror, newperror, conerror, index }) => { console.log("error: ", olderror)
    return (
        <View>
            {olderror != "" && index.index == 0 && <Text style={Styles.error_text}>{olderror}</Text>}
            {newperror != "" && index.index == 1 && <Text style={Styles.error_text}>{newperror}</Text>}
            {conerror != "" && index.index == 2 && <Text style={Styles.error_text}>{conerror}</Text>}
        </View>
    );
};