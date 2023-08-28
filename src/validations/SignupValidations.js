import React from "react";
import { Text, View } from "react-native";
import { Styles } from "../styles/Styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const SignupValidations = ({ emailErr, userErr, passErr, cpassErr, index }) => {
    return (
        <View>
            {emailErr != "" && index.index == 0 && <Text style={[Styles.error_text, {marginLeft: wp("2.5%")}]}>{emailErr}</Text>}
            {userErr != "" && index.index == 1 && <Text style={[Styles.error_text, {marginLeft: wp("2.5%")}]}>{userErr}</Text>}
            {passErr != "" && index.index == 2 && <Text style={[Styles.error_text, {marginLeft: wp("2.5%")}]}>{passErr}</Text>}
            {cpassErr != "" && index.index == 3 && <Text style={[Styles.error_text, {marginLeft: wp("2.5%")}]}>{cpassErr}</Text>}
        </View>
    );
};