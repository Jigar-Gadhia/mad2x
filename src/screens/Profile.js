import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, StatusBar, ActivityIndicator } from "react-native";
import { Colors } from "../assets/colors/colors.js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../assets/fonts/fonts";
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { FadeIn } from "react-native-reanimated";
import axios from 'react-native-axios';
import { pdata, options } from "../data/profile_data.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, { AndroidImportance } from '@notifee/react-native';
import { fetchProfile } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from '@react-native-community/netinfo';

const Profile = (navigation) => {

    const [url, setUrl] = useState("");
    const [uname, setUname] = useState("");
    const [pwd, setPass] = useState("");
    const [connected, setConnected] = useState("");
    const default_image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log("state: ", state.isConnected);
            setConnected(state.isConnected);
        });

        dispatch(fetchProfile());
        get_email();
        get_image();

        return () => {
            unsubscribe();
        };
    }, [])

    const data = useSelector((data) => data.data.data)
    const error = useSelector((data) => data.data.error)

    console.log("error: ", data)

    const notify = async () => {
        await notifee.requestPermission();

        const channelId = await notifee.createChannel({
            id: "logout",
            name: "logout Channel",
            sound: "doorbell",
            importance: AndroidImportance.HIGH
        });

        await notifee.displayNotification({
            title: 'Authentication',
            body: 'User logged out successfully',
            android: {
                channelId,
                sound: "doorbell",
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'logout'
                }
            }
        });
    }

    const get_image = async () => {
        const path = await AsyncStorage.getItem('image_uri')
        setUrl(path)
    }

    console.log("fetching", data)

    const get_email = async () => {
        if (data !== "") {
            await AsyncStorage.setItem('email_data', data.email)
        }
        else {
            await AsyncStorage.setItem('email_error', JSON.stringify(error))
        }
        const pass = await AsyncStorage.getItem('pass_data')
        setPass(pass)
        const name = await AsyncStorage.getItem('dataname')
        setUname(name)
        console.log("uname: ", uname)
    }

    const ApiLogout = async (uname, pwd) => {
        var formdata = new FormData();
        formdata.append("email", uname);
        formdata.append("password", pwd);
        axios.post('http://staging.webmynehost.com/hospital_demo/services/logout.php', formdata, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(async function (response) {
            console.log(response)
            if (response.data.ResponseCode == 0) {
                alert(response.data.ResponseMsg);
            }
            else {
                navigation.navigation.dispatch(CommonActions.reset({
                    routes: [{ name: 'Login' }]
                }))
                setUrl("")
                await AsyncStorage.clear();
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    console.log(pwd)

    const renderData = ({ item, index }) => {
        return (
            <Animated.View entering={FadeIn.delay(50 * index)} style={Styles.pdetails}>
                <View style={Styles.image_view}>
                    {index == 0 ? <ImageBackground resizeMode="contain" style={Styles.image} source={item.path}><Image style={{ height: hp("1%"), resizeMode: "contain" }} source={require('../images/layer1.png')} /></ImageBackground> : <Image style={Styles.image} source={item.path} />}
                </View>
                <Text style={Styles.image_text}>{item.text}</Text>
            </Animated.View>
        )
    }

    const renderOptions = ({ item, index }) => {
        return (
            <Animated.View entering={FadeIn.delay(50 * index)}>
                <TouchableOpacity style={[Styles.options_btn, index == 1 || index == 3 ? { marginLeft: wp("3.5%") } : null]}>
                    <Image style={{ height: hp("4%"), resizeMode: "contain" }} source={item.path} key={index} />
                    <Text style={{ color: Colors.dark_grey }} key={item.text}>{item.text}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (
        !data ? <Animated.View entering={FadeIn} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.date} />
        </Animated.View> : data == "" ? <Animated.View entering={FadeIn} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, color: Colors.black }}>Something went
                <Text style={{ color: Colors.red }}> wrong</Text>, please
                <Text style={{ color: Colors.red }}> re-login !</Text></Text>
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: Colors.date, marginTop: hp("3%") }} onPress={() => navigation.navigation.dispatch(CommonActions.reset({ routes: [{ name: "Login" }] }))}>
                <Text style={{ marginHorizontal: wp("7%"), marginVertical: hp("1.5%"), fontSize: 20, color: Colors.white }}>Login</Text>
            </TouchableOpacity>
        </Animated.View> :
            <View>
                <StatusBar backgroundColor={Colors.blue} barStyle={"light-content"} />
                <View style={Styles.container}>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity accessibilityLabel="Back button"
                                accessibilityHint="Tap to go the homescreen"
                                style={Styles.back}
                                onPress={() => navigation.navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: 'Settings' }],
                                    })
                                )}>
                                <Icon name="arrow-back" size={30} color={Colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity accessibilityLabel="Logout button" accessibilityHint="Tap to logout" style={Styles.back} onPress={() => {
                                notify();
                                ApiLogout(uname, pwd);
                            }}>
                                <Icon name="power" size={27} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                        <Animated.View entering={FadeIn} style={Styles.profile_header}>
                            <View style={{
                                backgroundColor: Colors.slight_blue,
                                borderRadius: 8,
                                marginBottom: hp("2%"),
                                marginLeft: wp("9%")
                            }}>
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: hp("1.2%"),
                                    marginHorizontal: wp("2%"),
                                    marginBottom: hp("1.2%")
                                }}>
                                    <Image accessibilityLabel="Profile Picture" style={Styles.profile_image} source={{ uri: url == "" || url == undefined ? default_image : url }} />
                                    <TouchableOpacity style={Styles.profile_btn} onPress={() => navigation.navigation.navigate("Edit_Profile")}>
                                        <Text accessibilityLabel="Profile button" style={Styles.profile_btn_text}>My Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={Styles.profile_text_view}>
                                <Text accessibilityLabel="Email ID" style={Styles.profile_header_text}>{data.email}</Text>
                                <Text accessibilityLabel="Age" style={Styles.profile_text_main}>{data.age} Years</Text>
                                <Text accessibilityLabel="Address" style={Styles.profile_text_main}>{data.address}</Text>
                            </View>
                        </Animated.View>
                        <View style={{ backgroundColor: Colors.white }}>
                            <Animated.FlatList entering={FadeIn} data={pdata} contentContainerStyle={Styles.flatlist} numColumns={"2"} scrollEnabled={false} renderItem={renderData} />
                        </View>
                        <View style={{ backgroundColor: Colors.lite_blue }}>
                            <Animated.FlatList entering={FadeIn}
                                data={options} numColumns={2} scrollEnabled={false}
                                renderItem={renderOptions}
                                contentContainerStyle={{ justifyContent: "space-between", marginBottom: hp(2) }}
                            />
                        </View>
                    </View>
                </View>
            </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blue
    },
    back: {
        marginHorizontal: wp("6%"),
        marginTop: hp("2%")
    },
    profile_header: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: wp("10%"),
        marginTop: hp("1%"),
    },
    profile_image: {
        height: hp("10%"),
        width: wp("20%"),
        resizeMode: "center",
        borderRadius: 8,
        marginBottom: hp("1%")
    },
    profile_text_view: {
        marginBottom: hp("3%"),
        marginLeft: wp("1%"),
        // backgroundColor: Colors.cyan,
        borderRadius: 8
    },
    profile_header_text: {
        color: Colors.white,
        fontFamily: fonts.semibold,
        fontSize: 25,
        marginHorizontal: wp("3%"),
        marginTop: hp("5.3%")
    },
    profile_text_main: {
        color: Colors.white,
        fontFamily: fonts.lite,
        fontSize: 18,
        marginHorizontal: wp("3%")
    },
    profile_btn: {
        backgroundColor: Colors.profile,
        borderRadius: 8,
    },
    profile_btn_text: {
        color: Colors.blue,
        fontFamily: fonts.semibold,
        fontSize: 14,
        marginHorizontal: wp("2.5%"),
        marginVertical: hp("0.4")
    },
    pdetails: {
        margin: 10,
        flexDirection: "row",
        marginVertical: hp("3%"),
    },
    image_view: {
        backgroundColor: Colors.blue,
        height: hp("4.3%"),
        width: wp("8.8%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    image: {
        height: hp("2.1%"),
        resizeMode: "contain",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    image_text: {
        color: Colors.dark_grey,
        fontSize: 14,
        fontFamily: fonts.semibold,
        width: wp("25%"),
        marginLeft: wp("3%")
    },
    flatlist: {
        alignItems: "center",
        marginVertical: hp("2%")
    },
    options_btn: {
        backgroundColor: Colors.white,
        marginTop: hp("2%"),
        width: wp("48%"),
        height: hp("10%"),
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Profile;