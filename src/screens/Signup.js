import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View, StyleSheet, Image, StatusBar, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from '../assets/colors/colors.js'
import { fonts } from '../assets/fonts/fonts.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_signup } from '../services/userServices.js';
import { InputForm } from "../components/InputForm.js";
import { SignupData } from "../data/SignupData.js";
import { SignupValidations } from "../validations/SignupValidations.js";

const Signup = (navigation) => {

    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [userErr, setUserErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [cpassErr, setCpassErr] = useState("");
    const [loader, setLoader] = useState(false)
    const [array, setArray] = useState(SignupData)

    const strongRegex = new RegExp("^[.]+[@]");

    const toggleLoader = () => {
        setLoader(!loader)
    }

    const Validation = async () => {
        { email == "" ? setEmailErr("Email ID is required") : setEmailErr("") }
        { user == "" ? setUserErr("Username is required") : setUserErr("") }
        { pass == "" ? setPassErr("Password is required") : setPassErr("") }

        if (cpass == "") {
            setCpassErr("Confirm Password is required")
        }
        else if (cpass != pass) {
            setCpassErr("Password does not match")
        }
        else {
            setCpassErr("")
        }

        if (email != "" && user != "" && pass != "" && cpass != "" && pass == cpass) {
            toggleLoader();
            user_signup(user, email, pass, cpass, navigation)
            const res = await AsyncStorage.getItem('signup_res')
            const err = await AsyncStorage.getItem('signup_error')
            if (res) {
                toggleLoader();
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={Colors.blue} />
            {/* <FlashMessage position={"top"}/> */}
            <View style={styles.bg}>
                <View style={styles.signup_bg}>
                    <View style={{ alignSelf: "center", flex: 1, justifyContent: "space-evenly", marginHorizontal: wp("8%"), marginTop: wp("7%") }}>
                        <Text style={styles.signup_header}>SIGN UP</Text>
                        <InputForm
                            data={array}
                            backColor={Colors.white}
                            border={1}
                            borderRadius={30}
                            TextShift={wp("2.5%")}
                            TextChangeEvent={(text, index) => {
                                const updated = [...array]
                                updated[index].value = text;
                                setArray(updated);
                                setEmail(array[0].value)
                                setUser(array[1].value)
                                setPass(array[2].value)
                                setCpass(array[2].value)
                            }}
                            PressEvent={(index) => {
                                const updatedArray = [...array]; // Create a copy of the array state
                                updatedArray[index].show = !updatedArray[index].show; // Toggle the show property
                                setArray(updatedArray);
                            }}
                            Validation={(index) => SignupValidations({ emailErr, userErr, passErr, cpassErr, index })}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.signup_button} onPress={() => Validation()}>
                            {loader == true ? (<ActivityIndicator size="large" />) : (<Text style={styles.btn_text}>Signup</Text>)}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.login_view}>
                <Text style={styles.acc_text}>Already have an account?</Text>
                <Text style={styles.login_text} onPress={() => navigation.navigation.navigate("Login")}> Login Here</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        height: hp("100%")
    },
    bg: {
        height: hp("70%"),
        backgroundColor: Colors.blue,
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
    },
    signup_bg: {
        height: hp("75%"),
        backgroundColor: Colors.white,
        alignSelf: "center",
        borderRadius: 39,
        marginTop: hp("10%"),
        elevation: 20,
        shadowColor: Colors.grey,
        alignItems: "center"
    },
    signup_header: {
        fontFamily: fonts.semibold,
        fontSize: 25,
        color: Colors.dark_grey,
        letterSpacing: 0.4,
        alignSelf: "center",
        marginTop: hp("3%")
    },
    signup_text: {
        flex: 0,
        fontFamily: fonts.semibold,
        fontSize: 16,
        color: Colors.dark_grey,
        marginLeft: hp("2.5%"),
        marginBottom: hp("0.4%"),
        letterSpacing: 0.3,
        marginVertical: hp("4%")
    },
    password: {
        flexDirection: "row",
        width: wp("70%"),
        height: hp("6%"),
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.grey,
        paddingStart: wp("3.5%"),
        fontFamily: fonts.semibold,
        color: Colors.blue
    },
    icon: {
        marginHorizontal: wp("62.5%"),
        alignSelf: "center",
        position: "absolute",
        transform: [{ rotateY: '180deg' }]
    },
    text_input: {
        color: Colors.blue,
        fontSize: 16,
        fontFamily: fonts.semibold,
        paddingHorizontal: wp("2%"),
        width: wp("57%")
    },
    signup_button: {
        width: wp("55%"),
        height: hp("6.5%"),
        backgroundColor: Colors.blue,
        alignItems: "center",
        color: Colors.white,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 30,
        marginVertical: hp("5%")
    },
    btn_text: {
        fontFamily: fonts.semibold,
        fontSize: 19,
        color: Colors.white
    },
    login_view: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("22%")
    },
    acc_text: {
        color: Colors.black,
        fontSize: 16,
        fontFamily: fonts.semibold
    },
    login_text: {
        color: Colors.blue,
        fontSize: 16,
        fontFamily: fonts.semibold
    },
    val: {
        color: Colors.red,
        marginHorizontal: wp("5%"),
        marginTop: hp(1)
    },
    pass_val: {
        marginHorizontal: wp("5%"),
        justifyContent: "center"
    },
    pass_input: {
        color: Colors.blue,
        fontSize: 16,
        fontFamily: fonts.semibold,
        paddingHorizontal: wp("2%"),
        width: wp("52%")
    },
    eye: {
        transform: [{ rotateY: '180deg' }]
    }

})

export default Signup;