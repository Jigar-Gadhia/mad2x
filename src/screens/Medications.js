import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import { Colors } from '../assets/colors/colors.js';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Medications = (navigation) => {
    return (
        <View style={{backgroundColor: Colors.white, height: hp("100%")}}>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
            <TouchableOpacity onPress={() => Alert.alert("Desclaimer", "Drawer feature is under development !")}>
                <Image source={require('../images/menu.png')} style={Styles.drawer_image} />
            </TouchableOpacity>
            <View style={Styles.container}>
                <Text style={Styles.text}>Medications</Text>
                <TouchableOpacity style={Styles.app_btn} onPress={() => navigation.navigation.navigate("Appointment")}>
                    <Text style={Styles.app_text}>Book an appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: Colors.dark_grey
    },
    drawer_image: {
        height: hp("1.5%"),
        resizeMode: "contain",
        marginVertical: hp("3%"),
        marginLeft: wp("5%")
    },
    app_btn: {
        height: hp("6%"),
        width: wp("50%"),
        alignSelf: "center",
        backgroundColor: Colors.blue,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: hp("2%")
    },
    app_text: {
        fontSize: 18,
        color: Colors.white
    }
})

export default Medications;