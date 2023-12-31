import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Colors } from '../assets/colors/colors.js';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons.js';
import { fonts } from '../assets/fonts/fonts.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SettingsData } from '../data/SettingsData.js';

const Settings = (navigation) => {
    const [url, setUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

    useEffect(() => {
        getDrawerStatusFromState()
    }, [])

    const getDrawerStatusFromState = async () => {
        const path = await AsyncStorage.getItem('image_uri')
        setUrl(path)
    }

    const renderData = ({ item, index }) => {
        return (<Animated.View style={{ width: wp("80%"), borderRadius: 20 }} entering={FadeIn.delay(50 * index)}>
            <TouchableOpacity
                style={Styles.data_button}
                >
                <View style={Styles.image_view}>
                    <Image style={[Styles.image, { height: item.id == 3 ? hp("3.5%") : hp("2.2%"), marginRight: item.id == 3 ? wp("0.8%") : wp("0%") }]} source={item.path} />
                </View>
                <Text style={Styles.image_text}>{item.text}</Text>
            </TouchableOpacity>
        </Animated.View>
        )
    }

    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor={Colors.blue} barStyle={"light-content"} />
            <View style={Styles.bg}>
                <View style={Styles.back_view}>
                    <TouchableOpacity onPress={() => navigation.navigation.navigate("TabNav")}>
                        <Icon name="arrow-back" size={27} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={Styles.back_text}>Settings</Text>
                </View>
                <View style={Styles.header_image_view}>
                    <Image style={Styles.header_image} source={{ uri: url }} />
                    <Text style={Styles.header_text}>John Doe</Text>
                </View>
                <View style={Styles.settings_bg}>
                    <Animated.FlatList entering={FadeIn} contentContainerStyle={{ marginVertical: hp("4%") }} data={SettingsData} renderItem={renderData} />
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: hp("100%"),
        zIndex: -1
    },
    bg: {
        backgroundColor: Colors.blue,
        height: hp("70%"),
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        zIndex: -1
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
    back_view: {
        marginHorizontal: wp("7%"),
        marginVertical: wp("4%"),
        alignItems: "center",
        flexDirection: "row"
    },
    back_text: {
        fontSize: 18,
        color: Colors.white,
        fontFamily: fonts.semibold,
        marginLeft: wp("3%"),
        marginBottom: hp("0.2%")
    },
    header_image_view: {
        marginHorizontal: wp("7%"),
        marginVertical: hp("2%"),
        flexDirection: "row",
        alignItems: "center"
    },
    header_image: {
        height: hp("5.4%"),
        width: wp("11.2%"),
        resizeMode: "contain",
        borderRadius: 50
    },
    header_text: {
        color: Colors.white,
        fontFamily: fonts.heavy,
        fontSize: 14,
        marginLeft: wp("3%"),
    },
    settings_bg: {
        alignSelf: "center",
        borderRadius: 39,
        backgroundColor: Colors.white,
        shadowColor: Colors.grey,
        elevation: 20,
        width: wp("85%"),
        zIndex: -1
    },
    data_button: {
        marginVertical: hp("1%"),
        marginLeft: wp("6%"),
        marginRight: wp("10%"),
        flexDirection: "row",
        alignItems: "center",
        zIndex: -1
    },
    image_view: {
        backgroundColor: Colors.blue,
        height: hp("4.5%"),
        width: wp("9.3%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        zIndex: -1
    },
    image: {
        resizeMode: "contain",
        zIndex: -1
    },
    image_text: {
        marginLeft: wp("2%"),
        fontFamily: fonts.heavy,
        fontSize: 12,
        color: Colors.dark_grey
    },
    profile_view: {
        zIndex: 1,
        position: "absolute",
        alignSelf: "center",
        borderRadius: 39,
        backgroundColor: Colors.white,
        shadowColor: Colors.grey,
        width: wp("85%"),
        marginTop: hp("16.5%"),
        height: hp("60%"),
        elevation: 1
    },
    profile_button: {
        marginVertical: hp("1%"),
        marginLeft: wp("6%"),
        marginRight: wp("10%"),
        flexDirection: "row",
        alignItems: "center",
    },
    change_view: {
        backgroundColor: Colors.blue,
        height: hp("4.5%"),
        width: wp("9.3%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    }
})

export default Settings;