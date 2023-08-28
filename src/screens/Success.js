import React, {useState, useEffect} from "react";
import { View, Text, ImageBackground, Image, StyleSheet, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from "../assets/colors/colors.js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../assets/fonts/fonts";
import { CommonActions } from "@react-navigation/native";

const Success = (navigation) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigation.dispatch(CommonActions.reset({
                routes: [{ name: "Login" }]
            }))
            setShow(false)
        }, 3000)
    })

    const [show, setShow] = useState(true)

    return (
        <View style={Styles.container}>
            <View style={Styles.bg}>
                <View style={Styles.back_view}>
                </View>
                <View style={Styles.success_view}>
                    <ImageBackground source={require('../images/success_background.png')} resizeMode="contain" style={Styles.imageback}>
                        <Image source={require('../images/success.png')} style={Styles.image} />
                    </ImageBackground>
                    <View style={{marginTop: hp("8%"), marginBottom: hp("14%"), alignItems: "center"}}>
                        <Text style={Styles.success_text}>Your Password</Text>
                        <Text style={Styles.success_text}>Changed Successfully</Text>
                        <Text style={[Styles.success_text, {marginTop: hp("3%")}]}>Redirecting to Login screen</Text>
                        <ActivityIndicator size={"large"} color={Colors.date} style={{height: hp("1%"), marginTop: hp("3%")}}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: hp("100%")
    },
    bg: {
        backgroundColor: Colors.blue,
        height: hp("70%"),
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        elevation: 10,
        shadowColor: Colors.grey
    },
    back_view: {
        marginHorizontal: wp("7%"),
        marginVertical: hp("2%")
    },
    success_view: {
        alignItems: "center",
        backgroundColor: Colors.white,
        width: wp("85%"),
        alignSelf: "center",
        borderRadius: 40,
        shadowColor: Colors.grey,
        elevation: 10,
        marginTop: hp("5%")
    },
    imageback: {
        margin: 15,
        width: wp("25%"),
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("18%")
    },
    image: {
        height: hp("11%"),
        resizeMode: "contain",
        marginTop: hp("1.5%"),
        marginLeft: wp("1%")
    },
    success_text: {
        fontFamily: fonts.semibold,
        fontSize: 15,
    }
})

export default Success;