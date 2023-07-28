import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { Colors } from "../assets/colors/colors.js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Ionicons'
import { fonts } from "../assets/fonts/fonts";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';

const Reset_Password = (navigation) => {

    useEffect(() => {
        get_email();
    })

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

    const get_email = async () => {
        const email_id = await AsyncStorage.getItem('email_data')
        const pass = await AsyncStorage.getItem('pass_data')
        const pass_str = JSON.parse(pass)
        setMatch(pass_str)
        const email = JSON.parse(email_id)
        setEmail(email)
        const email_error = await AsyncStorage.getItem('email_error')
        setErr(email_error)
    }

    const post_reset = async () => {

        var formdata = new FormData();
        formdata.append("email", "test");
        formdata.append("old_password", "Hello");
        formdata.append("new_password", "test");
        formdata.append("confirm_password", "test");

        axios.post('http://staging.webmynehost.com/hospital_demo/services/change_password.php', formdata, { headers: { 'content-type': 'multipart/form-data' } })

            .then(function (response) {
                console.log("postApi", response);
                // console.log("post", post)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const showValidation = () => {

        setOlderror("")
        setNewperror("")
        setConerror("")
        // if (passw.exec(old, newp, con)) {
        //     showMessage({
        //         message: "Success",
        //         type: "success",
        //         duration: 3000,
        //         icon: props => <Icon style={{ marginVertical: hp("-0.4%"), marginHorizontal: wp("1%") }} name="checkmark-circle-outline" size={25} color={Colors.white} />
        //     })
        //     navigation.navigation.navigate("Success")
        // }
        // else {
        //     showMessage({
        //         message: "Password does not match the criteria !",
        //         description: "Password must contain 1 upercase letter, 1 lowercase letter, 1 number and length must be between 6 and 20",
        //         type: "danger",
        //         duration: 4000,
        //         icon: props => <Icon style={{ marginVertical: hp("-0.4%"), marginHorizontal: wp("1%") }} name="close-circle-outline" size={25} color={Colors.white} />
        //     })
        // }


        if (old == "") {

            setOlderror("current password is required")

        }
        // else if (old != match) {
        //     setOlderror("Old password is invalid")
        // }
        else {
            setOlderror("")
        }

        if (newp == "") {

            setNewperror("New password is required")
        } else {
            setNewperror("")
        }

        if (con == "") {

            setConerror("Confirm password is required")
        }
        else if (con !== newp) {
            setNewperror("password does not match")
        } else {
            setConerror("")
            setNewperror("")
        }

        if (newp == con && old != "" && newp != "" && con != "") {
            post_reset();
            navigation.navigation.navigate("Success")
        }

        // if (index && item.value != "" && old == "" && array[1].value == array[2].value ) {

        // }
    }


    const data = ([
        {
            id: 0,
            text: "Old Password",
            placeholder: "********",
            color: Colors.blue,
            show: false,
            value: ""
        },
        {
            id: 1,
            text: "New Password",
            placeholder: "********",
            color: Colors.blue,
            show: false,
            value: ""
        },
        {
            id: 2,
            text: "Confirm Password",
            placeholder: "********",
            color: Colors.blue,
            show: false,
            value: ""
        }

    ])

    const modalRender = ({ item }) => {
        return (
            <View>
                <Text style={{ marginHorizontal: wp("5%"), marginVertical: hp("1.5%") }}>{item.text} : {item.value}</Text>
            </View>
        )
    }

    const showModal = () => {
        setVisible(!visible)
    }

    const [array, setArray] = useState(data)
    const updated = Object.assign(data, array)

    // const toggleSecure = (index) => {
    //     console.log("index",index);
    // };

    const showPopup = () => {
        return (
            <View onTouchStart={showModal}>
                <Modal isVisible={visible} animationIn={"slideInUp"} animationInTiming={400} animationOut={"slideOutDown"}>
                    <View style={Styles.popup}>
                        <FlatList data={array} renderItem={modalRender} />
                    </View>
                </Modal>
            </View>
        )

    }

    const renderInput = ({ item, index }) => {
        return (
            <View>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 15, marginTop: hp("1%") }}>{item.text}</Text>
                <View style={Styles.input_view}>
                    <TextInput style={Styles.input}
                        secureTextEntry={item.show} value={item.value} placeholder={item.placeholder} placeholderTextColor={item.color}
                        onChangeText={(text) => {
                            updated[index].value = text;
                            setArray(updated);
                            setOld(array[0].value)
                            setNewp(array[1].value)
                            setCon(array[2].value)
                        }} />
                    <TouchableOpacity style={Styles.pass_btn} onPress={() => {
                        updated[index].show = !updated[index].show;
                        setArray(updated);
                    }}>
                        {item.show ? <Icon name="eye" size={20} color={Colors.grey} /> : <Icon name="eye-off" size={20} color={Colors.grey} />}
                    </TouchableOpacity>
                </View>

                {
                    olderror !== "" && item.id == 0 ? (
                        <View>
                            <Text style={Styles.error}>{olderror}</Text>
                        </View>
                    ) : (null)
                }
                {
                    newperror !== "" && item.id == 1 ? (<Text style={Styles.error}>{newperror}</Text>) : (null)
                }
                {
                    conerror !== "" && item.id == 2 ? (<Text style={Styles.error}>{conerror}</Text>) : (null)
                }
            </View>
        )
    };

    return (
        <ScrollView contentContainerStyle={Styles.container} >
            {/* <FlashMessage position={"top"} autoHide /> */}
            <View style={Styles.bg}>
                <View style={Styles.back_view}>
                    <TouchableOpacity onPress={() => navigation.navigation.navigate("TabNav")}>
                        <Icon name="arrow-back" size={27} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={Styles.back_text}>Reset Password</Text>
                </View>
                {/* {showPopup()} */}
                <View style={Styles.reset_bg}>
                    <Image style={Styles.header_image} source={require('../images/lock.png')} />
                    <FlatList data={array} renderItem={renderInput} scrollEnabled={false} />
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
