import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View, StyleSheet, StatusBar, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from '../assets/colors/colors.js'
import { fonts } from '../assets/fonts/fonts.js';
import { user_login } from '../services/userServices.js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee from '@notifee/react-native'

const Login = (navigation) => {

    const res = "";
    const err = "";

    const toggleLoader = () => {
        setLoader(true);
    }

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [userErr, setusrErr] = useState("")
    const [passErr, setpassErr] = useState("")
    const [loader, setLoader] = useState(false)
    const [noti, setNoti] = useState(false);

    const notify = async () => {
        await notifee.requestPermission();

        const channelId = await notifee.createChannel({
            id: "login",
            name: "login Channel"
        });

        notifee.getChannel

        await notifee.displayNotification({
            title: 'Authentication',
            body: noti == true ? 'User failed to login' : 'User logged in successfully',
            android: {
                channelId,
                sound: "default",
                pressAction: {
                    id: 'login'
                }
            }
        });
    }


    const handleValidation = async () => {
        // console.log("handle");

        if (user == "") {
            setusrErr("User Name is required")
        }
        else {
            setusrErr("");
        }
        if (pass == "") {
            setpassErr("Password is required")
        }
        else if (user != "" && pass != "") {
            user_login(user, pass, navigation);
            setNoti("User logged in successfully");
            const res = await AsyncStorage.getItem('login_data')
            const err = await AsyncStorage.getItem('login_error')
            console.log(res)
            if (res == "Login Incorrect" || err) {
                toggleLoader();
                setNoti(true);
            }
            else {
                setNoti(false)
            }
        }
        else {
            setpassErr("");
        }

    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={Colors.blue} />
            <View style={styles.bg}>
                <View style={styles.login_bg}>
                    <Text style={styles.login_header}>LOGIN</Text>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.login_text}>
                            User Name
                        </Text>
                        <TextInput
                            placeholder="Username"
                            value={user}
                            onChangeText={(user) => setUser(user)}
                            style={styles.input}
                            placeholderTextColor={Colors.blue}></TextInput>

                        {userErr != "" ? (
                            <Text style={styles.val}>{userErr}</Text>
                        ) : null}
                        <Text style={styles.login_text}>
                            Password
                        </Text>
                        <View style={styles.password}>
                            <TextInput value={pass} secureTextEntry={secureTextEntry} placeholder="Password" onChangeText={(pass) => setPass(pass)} style={styles.pass_color} placeholderTextColor={Colors.blue}>
                            </TextInput>

                            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.icon}>
                                {secureTextEntry == true ? (<Icon name="eye-off" size={20} color={Colors.grey} style={{ transform: [{ rotateY: '180deg' }] }} />) : <Icon name="eye" size={20} color={Colors.grey} />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            {passErr != "" ? (
                                <Text style={styles.val}>{passErr}</Text>
                            ) : null}
                            <Text style={styles.forgot_text}>Forgot Password?</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.login_button} onPress={() => handleValidation()}>
                        {loader == true ? (<ActivityIndicator size="large" />) : (<Text style={styles.btn_text}>Login</Text>)}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.signup_view}>
                <Text style={styles.acc_text}>Don't have an account?</Text>
                <Text onPress={() => navigation.navigation.navigate("Signup")} style={styles.signup_text}> Sign Up</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    bg: {
        height: hp("70%"),
        width: wp("100%"),
        backgroundColor: Colors.blue,
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
    },
    login_bg: {
        height: hp("61.5%"),
        width: wp("85%"),
        backgroundColor: Colors.white,
        alignSelf: "center",
        borderRadius: 39,
        marginTop: hp("10%"),
        elevation: 20,
        shadowColor: Colors.grey,
        alignItems: "center"
    },
    login_header: {
        fontFamily: fonts.semibold,
        fontSize: 25,
        color: Colors.dark_grey,
        paddingTop: hp("7%"),
        letterSpacing: 0.4
    },
    login_text: {
        fontFamily: fonts.semibold,
        fontSize: 16,
        color: Colors.dark_grey,
        marginLeft: hp("2.5%"),
        marginTop: hp("5%"),
        marginBottom: hp("0.4%"),
        letterSpacing: 0.3
    },
    input: {
        width: wp("70%"),
        height: hp("6%"),
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 30,
        fontSize: 16,
        fontFamily: fonts.semibold,
        color: Colors.blue,
        paddingStart: wp("5.1%")
    },
    forgot_text: {
        fontFamily: fonts.medium,
        marginTop: hp(1),
        color: Colors.forget,
        fontSize: 14
    },
    password: {
        flex: 0,
        flexDirection: "row",
        width: wp("70%"),
        height: hp("6.3%"),
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.grey,
        paddingStart: wp("3.5%"),
        fontFamily: fonts.semibold
    },
    icon: {
        marginHorizontal: wp("60.5%"),
        alignSelf: "center",
        position: "absolute"
    },
    pass_color: {
        color: Colors.blue,
        fontSize: 16,
        fontFamily: fonts.semibold,
        width: wp("55%")
    },
    login_button: {
        width: wp("55%"),
        height: hp("6.5%"),
        backgroundColor: Colors.blue,
        alignItems: "center",
        color: Colors.white,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 30,
        marginTop: hp("6%")
    },
    btn_text: {
        fontFamily: fonts.semibold,
        fontSize: 19,
        color: Colors.white
    },
    validation: {
        color: Colors.red,
        paddingHorizontal: wp(5)
    },
    signup_view: {
        flexDirection: "row",
        marginVertical: hp(8),
        justifyContent: "center",
        alignItems: "center"
    },
    acc_text: {
        color: Colors.black,
        fontSize: 16,
        fontFamily: fonts.semibold
    },
    signup_text: {
        color: Colors.blue,
        fontSize: 16,
        fontFamily: fonts.semibold
    },
    val: {
        color: Colors.red,
        marginHorizontal: wp("5%"),
        marginTop: hp(1)
    }

})

export default Login;