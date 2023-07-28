import React, { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Colors } from "../assets/colors/colors.js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../assets/fonts/fonts";
import Icon from 'react-native-vector-icons/Ionicons'
import { CommonActions } from "@react-navigation/native";
import Animated, { FadeIn, SlideInDown, SlideOutDown } from "react-native-reanimated";
import axios from 'react-native-axios';
import { pdata, options } from "../data/profile_data.js";
import { useQuery } from '@tanstack/react-query'
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, { AndroidImportance } from '@notifee/react-native';

const Profile = (navigation) => {

    const [url, setUrl] = useState("");
    const [uname, setUname] = useState("");
    const [pwd, setPass] = useState("");

    useEffect(() => {
        get_email();
        get_image();
    }, [])

    const notify = async() => {
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

    const get_image = async() => {
        const path = await AsyncStorage.getItem('image_uri')
        console.log("path", path)
        setUrl(path)
        // if(path == null)
        // {
        //     setUrl("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
        //     alert(url)
        // }
        // else{
        //     setUrl(path)
        //     alert(url)
        // }
        
    }

    console.log("url", url)

    const Apidata = async () => {
        const did = await AsyncStorage.getItem('dataid')
        const userid = JSON.parse(did);
        const username = await AsyncStorage.getItem('dataname')
        const response = await axios.get("http://staging.webmynehost.com/hospital_demo/services/getProfile.php", {
            params: {
                profileId: userid
            }
        })
        console.log(response)
        return response.data.ResponseData;
    };

    const GetProfile = () => {
        const { data, error, status, isFetched, isLoading } = useQuery(['data_profile'], Apidata, { refetchOnMount: true, refetchOnReconnect: true });
        return { data, error, status, isFetched, isLoading };
    };

    const { data, status, isFetched, isLoading, error } = GetProfile();
    console.log("fetching", data)

    const get_email = async () => {
        if (data) {
            await AsyncStorage.setItem('email_data', JSON.stringify(data))
        }
        else {
            await AsyncStorage.setItem('email_error', JSON.stringify(error))
        }
        const pass = await AsyncStorage.getItem('pass_data')
        setPass(pass)
        const name = await AsyncStorage.getItem('dataname')
        setUname(name)
        console.log(uname)
    }

    const ApiLogout = async () => {
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
        isLoading ? <Animated.View entering={FadeIn} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.date} />
        </Animated.View> : error || isFetched == false ? <Animated.View entering={FadeIn} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{fontSize: 20}}>Something went
            <Text style={{color: Colors.red}}> wrong</Text>, please
            <Text style={{color: Colors.red}}> re-login !</Text></Text>
            <TouchableOpacity style={{borderRadius: 10, backgroundColor: Colors.date, marginTop: hp("3%")}} onPress={() => navigation.navigation.dispatch(CommonActions.reset({ routes: [{ name: "Login" }]}))}>
                <Text style={{marginHorizontal: wp("7%"), marginVertical: hp("1.5%"),  fontSize: 20, color: Colors.white}}>Login</Text>
            </TouchableOpacity>
        </Animated.View> : 
            <View>
                <StatusBar backgroundColor={Colors.blue} barStyle={"light-content"} />
                <View style={Styles.container}>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity style={Styles.back} onPress={() => navigation.navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'Settings' }],
                                })
                            )}>
                                <Icon name="arrow-back" size={30} color={Colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.back} onPress={() => {notify();
                                ApiLogout();}}>
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
                                    <Image style={Styles.profile_image} source={{ uri: url }} />
                                    <TouchableOpacity style={Styles.profile_btn} onPress={() => navigation.navigation.navigate("Edit_Profile")}>
                                        <Text style={Styles.profile_btn_text}>My Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={Styles.profile_text_view}>
                                <Text style={Styles.profile_header_text}>{data.email}</Text>
                                <Text style={Styles.profile_text_main}>33 Years{'\n'}British Colombia, CA</Text>
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