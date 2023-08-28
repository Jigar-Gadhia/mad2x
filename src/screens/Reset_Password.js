import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Colors } from "../assets/colors/colors.js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Ionicons'
import { fonts } from "../assets/fonts/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { InputForm } from "../components/InputForm.js";
import { ResetPassword } from "../validations/ResetPassword.js";
import { data } from "../data/resetPassword.js";

const Reset_Password = (navigation) => {


    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const [visible, setVisible] = useState(false)
    const [match, setMatch] = useState("")
    const [old, setOld] = useState("")
    const [newp, setNewp] = useState("")
    const [con, setCon] = useState("")
    const [olderror, setOlderror] = useState("")
    const [newperror, setNewperror] = useState("")
    const [conerror, setConerror] = useState("")
    const [emailid, setEmail] = useState("")
    const [emailerr, setErr] = useState("")
    const [index, setIndex] = useState("");

    const post_reset = async () => {

        const email = await AsyncStorage.getItem('email_data') 

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("old_password", old);
        formdata.append("new_password", newp);
        formdata.append("confirm_password", con);

        email != undefined ? axios.post('http://staging.webmynehost.com/hospital_demo/services/change_password.php', formdata, {
            headers: { 'content-type': 'multipart/form-data' }
        })

            .then(function (response) {
                console.log("postApi", response);
            })
            .catch(function (error) {
                console.log(error);
            }) : alert("error")
    }

    const showValidation = () => {

        setOlderror("");
        setNewperror("");
        setConerror("");

        if (old === "") {
            setOlderror("Current password is required");
        }

        if (newp === "") {
            setNewperror("New password is required");
        }

        if (con === "") {
            setConerror("Confirm password is required");
        } else if (con !== newp) {
            setConerror("Password does not match");
        }

        if (con === newp && con !== "" && newp !== "" && old !== "") {
            post_reset();
            post_reset() ? navigation.navigation.navigate("Success") : alert("something went wrong!")
        }
    }

    const [array, setArray] = useState(data)

    return (
        <ScrollView contentContainerStyle={Styles.container} >
            <View style={Styles.bg}>
                <View style={Styles.back_view}>
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
                        <Icon name="arrow-back" size={27} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={Styles.back_text}>Reset Password</Text>
                </View>
                <View style={Styles.reset_bg}>
                    <Image style={Styles.header_image} source={require('../images/lock.png')} />
                    <InputForm data={array} Validation={(index) => ResetPassword({ olderror, newperror, conerror, index })} PressEvent={(index) => {
                        const updatedArray = [...array]; // Create a copy of the array state
                        updatedArray[index].show = !updatedArray[index].show; // Toggle the show property
                        setArray(updatedArray);
                    }} TextChangeEvent={(text, index) => {
                        const updated = [...array]
                        updated[index].value = text;
                        setArray(updated);
                        setOld(array[0].value)
                        setNewp(array[1].value)
                        setCon(array[2].value)
                    }} />
                    <TouchableOpacity style={Styles.reset_btn} onPress={() => showValidation()}>
                        <Text style={Styles.reset_text}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        shadowColor: Colors.grey,
        elevation: 10
    },
    back_view: {
        marginHorizontal: wp("6%"),
        marginVertical: hp("2%"),
        flexDirection: "row"
    },
    back_text: {
        fontFamily: fonts.bold,
        fontSize: 18,
        marginLeft: wp("5%"),
        color: Colors.white
    },
    reset_bg: {
        backgroundColor: Colors.white,
        borderRadius: 50,
        alignItems: "center",
        width: wp("87%"),
        shadowColor: Colors.grey,
        elevation: 20,
        marginVertical: hp("0.8%"),
        alignSelf: "center"
    },
    header_image: {
        marginVertical: hp("7%"),
        resizeMode: "contain",
        height: hp("9%")
    },
    input_view: {
        backgroundColor: Colors.sky_blue,
        width: wp("70%"),
        height: hp("6%"),
        flexDirection: "row",
        marginTop: hp("1%"),
        borderRadius: 12
    },
    input: {
        width: wp("56%"),
        marginLeft: wp("4%"),
        color: Colors.blue
    },
    pass_btn: {
        alignItems: "center",
        justifyContent: "center"
    },
    reset_btn: {
        backgroundColor: Colors.blue,
        borderRadius: 30,
        marginVertical: hp("5%")
    },
    reset_text: {
        marginHorizontal: wp("8%"),
        marginVertical: hp("1.5%"),
        fontSize: 18,
        fontFamily: fonts.semibold,
        color: Colors.white
    },
    popup: {
        borderRadius: 20,
        backgroundColor: Colors.white
    },
    popup_text: {
        fontSize: 18,
        fontFamily: fonts.semibold,
        marginLeft: 5,
        color: Colors.dark_grey,
        width: wp("70%")
    },
    error: {
        color: Colors.red
    }
})

export default Reset_Password;
