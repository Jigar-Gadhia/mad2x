import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, StatusBar, ActivityIndicator, Alert, Keyboard, ScrollView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from '../assets/colors/colors.js';
import { fonts } from '../assets/fonts/fonts.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import { Rating } from "react-native-ratings";
import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInRight, SlideOutRight, useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useAppState } from '@react-native-community/hooks';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard } from "../redux/actions.js";

const Home = (navigation) => {

    const up = useSharedValue(-160);
    const down = useSharedValue(0);
    const [edit, setEdit] = useState(true);
    const key = useRef("");
    const [keyb, setKey] = useState(Keyboard.isVisible());
    const dispatch = useDispatch();
    const scale = useSharedValue(1);

    useEffect(() => {
        dispatch(Dashboard());
        const keyShow = Keyboard.addListener('keyboardDidShow', () => {
            key.current.focus();
            scale.value = 1.09
        })

        const keyHide = Keyboard.addListener('keyboardDidHide', () => {
            key.current.blur();
            scale.value = 1
        })

        return () => {
            keyShow.remove();
            keyHide.remove();
        }
    }, [keyb])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withSpring(scale.value, {stiffness: 300, velocity: 1, restSpeedThreshold: 1}) }],
        };
    });

    const api = useSelector((state) => state.result.result)
    console.log(api.length)

    const state = useAppState();

    const notify = () => {
        notifee.displayNotification({
            id: "demo",
            title: 'App is running in the background',
            android: {
                channelId: 'demo',
                ongoing: true,
                tag: 'back',
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC
            }
        });
    }

    const cancel = () => {
        notifee.cancelDisplayedNotification('demo', 'back')
    }

    state === "background" ? notify() : cancel();


    const [showD, setShowD] = useState(false);
    const [ind, setInd] = useState("");
    const [doclist, setdoclist] = useState("");

    const image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    const Details = () => {
        return (
            <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={{
                height: hp("100%"),
                width: wp("100%"),
                backgroundColor: Colors.white,
            }}>
                <View style={Styles.bg}>
                    <TouchableOpacity style={Styles.detail_back} onPress={() => ToggleD()}>
                        <Icon name="arrow-back" size={32} color={Colors.white} />
                    </TouchableOpacity>
                    <View style={Styles.profile_bg}>
                        <View style={Styles.bg_image}>
                            <ImageBackground source={{ uri: image }} resizeMode='contain' style={{ height: hp("15%") }} borderRadius={16}>
                                <View style={Styles.profile_indicator}></View>
                            </ImageBackground>
                        </View>
                        <Text style={Styles.doc_text_sp}>{api[ind].SpecialityName != "" ? api[ind].SpecialityName : "None"}</Text>
                        <Text style={Styles.doc_text_title}>{api[ind].DoctorName}</Text>
                        <View style={Styles.doc_icon_view}>
                            <TouchableOpacity style={Styles.doc_icon_button}>
                                <Image style={[Styles.doc_icons, { width: wp("5%") }]} source={require('../images/message.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.doc_icon_button}>
                                <Image style={[Styles.doc_icons, { width: wp("4%") }]} source={require('../images/call.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.doc_icon_button}>
                                <Image style={[Styles.doc_icons, { width: wp("5%") }]} source={require('../images/video.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.doc_icon_button}>
                                <Image style={[Styles.doc_icons, { width: wp("4%") }]} source={require('../images/location.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={Styles.hos_text}>{api[ind].hospital}</Text>
                        <Rating
                            style={{ justifyContent: "flex-end", marginRight: wp("48%"), marginTop: hp("1%") }}
                            type="star"
                            ratingCount={"5"}
                            imageSize={20}
                            readonly={true}
                            startingValue={4} />
                        <Text style={Styles.about}>About</Text>
                        <Text style={[Styles.hos_text, { width: wp("70%"), fontSize: 13, }]}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={Styles.doc_exp}>Patients</Text>
                            <Text style={Styles.doc_exp}>Experiance</Text>
                            <Text style={Styles.doc_exp}>Reviews</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Text style={Styles.doc_exp_data}>NA</Text>
                            <Text style={Styles.doc_exp_data}>{api[ind].Experience}</Text>
                            <Text style={Styles.doc_exp_data}>{api[ind].Reviews}</Text>
                        </View>
                        <View style={Styles.book_app_view}>
                            <TouchableOpacity style={Styles.book_app_btn} onPress={() => navigation.navigation.navigate("Appointment")}>
                                <Text style={Styles.book_app_text}>Book An Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    }

    const ToggleD = () => {
        setShowD(!showD)
    }

    const [doc, setdoc] = useState(false)

    const dataCat = [{
        path: require('../images/bill.png'),
        name: "Patient bill",
        color: Colors.blue
    },
    {
        path: require('../images/bed.png'),
        name: "Occupacy",
        color: Colors.green
    },
    {
        path: require('../images/cal.png'),
        name: "Charge List",
        color: Colors.cyan
    },
    {
        path: require('../images/contacts.png'),
        name: "Contacts",
        color: Colors.lite_green
    },
    {
        path: require('../images/deases.png'),
        name: "Patients",
        color: Colors.blue
    }
    ];

    const renderCat = ({ item, index }) => (
        <Animated.View entering={FadeIn.delay(200 * index)}>
            <TouchableOpacity style={[Styles.doc_banner_view, {
                backgroundColor: item.color,
            }]}>
                <Image source={item.path} style={{ height: hp("4%"), resizeMode: "contain" }} />
                <Text style={{ marginTop: hp("1%"), fontFamily: fonts.regular, color: Colors.white, fontSize: 13 }}>{item.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderSearch = ({ item, index }) => {
        return (
            item.DoctorName != "" && item.SpecialityName != "" ?
                <Animated.View entering={FadeInUp.delay(200 * index)}>
                    <TouchableOpacity style={Styles.doc_banner} onPress={() => {
                        setInd(index)
                        ToggleD()
                    }}>
                        <ImageBackground style={Styles.doc_image} source={{ uri: image }} borderRadius={10} resizeMode="cover">
                            <View style={Styles.doc_indicator}></View>
                        </ImageBackground>
                        <View>
                            <Text style={Styles.doc_banner_header}>{item.SpecialityName}</Text>
                            <Text style={Styles.doc_banner_text}>{item.DoctorName}</Text>
                        </View>
                        <View>
                            <Icon name="ellipse" size={10} color={Colors.options} style={{ marginVertical: hp("1%") }} />
                            <Icon name="ellipse" size={10} color={Colors.options} style={{ marginBottom: hp("1%") }} />
                        </View>
                    </TouchableOpacity>
                </Animated.View> : null
        )
    }

    const renderDoc = ({ item, index }) => {
        return (
            <View>
                {doc == false ? (
                    <View>
                        {index < 3 && (<Animated.View entering={FadeInUp.delay(200 * index)}>
                            <TouchableOpacity style={[Styles.doc_banner, index == 2 ? { marginBottom: hp("4%") } : null]} onPress={() => {
                                setInd(index)
                                ToggleD()
                            }}>
                                <ImageBackground style={Styles.doc_image} source={{ uri: image }} borderRadius={10} resizeMode="cover">
                                    <View style={Styles.doc_indicator}></View>
                                </ImageBackground>
                                <View>
                                    <Text style={Styles.doc_banner_header}>{item.SpecialityName != "" ? item.SpecialityName : "Speciality not specified"}</Text>
                                    <Text style={Styles.doc_banner_text}>{item.DoctorName != "" ? item.DoctorName : "Name not specifeid"}</Text>
                                </View>
                                <View>
                                    <Icon name="ellipse" size={10} color={Colors.options} style={{ marginVertical: hp("1%") }} />
                                    <Icon name="ellipse" size={10} color={Colors.options} style={{ marginBottom: hp("1%") }} />
                                </View>
                            </TouchableOpacity></Animated.View>
                        )}
                    </View>
                ) : (index < 10 && <Animated.View entering={FadeInUp.delay(200 * index)}>
                    <TouchableOpacity ref={showD} style={Styles.doc_banner} onPress={() => {
                        setInd(index)
                        ToggleD()
                    }}>
                        <ImageBackground style={Styles.doc_image} source={{ uri: image }} borderRadius={10} resizeMode="cover">
                            <View style={Styles.doc_indicator}></View>
                        </ImageBackground>
                        <View>
                            <Text style={Styles.doc_banner_header}>{item.SpecialityName != "" ? item.SpecialityName : "Speciality not specified"}</Text>
                            <Text style={Styles.doc_banner_text}>{item.DoctorName != "" ? item.DoctorName : "Name not specifeid"}</Text>
                        </View>
                        <View>
                            <Icon name="ellipse" size={10} color={Colors.options} style={{ marginVertical: hp("1%") }} />
                            <Icon name="ellipse" size={10} color={Colors.options} style={{ marginBottom: hp("1%") }} />
                        </View>
                    </TouchableOpacity></Animated.View>
                )}
            </View>
        )
    };

    const searchRes = (text) => {
        const result = api.filter((item) => {
            const doctorName = item.DoctorName.toLowerCase(); // Convert to lowercase for case-insensitive matching
            const searchText = text.toLowerCase(); // Convert search text to lowercase
            return doctorName.includes(searchText); // Check if doctorName includes the search text
        }
        );
        setdoclist(result)
        console.log("search: ", result)
        if (text === "") {
            setdoclist("");
        }
    };

    return (
        <Animated.View entering={FadeInDown} style={Styles.container}>
            {showD == true && <Details />}
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <View style={{ height: hp("91.4%"), marginLeft: wp("3%") }}>
                <View style={{ flex: 1 }}>
                    <View style={Styles.drawer}>
                        <TouchableOpacity onPress={() => Alert.alert("Desclaimer", "Drawer feature is under development !")}>
                            <Image source={require('../images/menu.png')} style={Styles.drawer_image} />
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.header}>
                        <Text style={Styles.header_text}>Doctor {'\n'}Appointment</Text>
                        <Image style={Styles.header_image} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} />
                    </View>
                    <Animated.View style={[Styles.searchbar, animatedStyle]}>
                        <View style={Styles.searchbar_view}>
                            <TextInput placeholder="Search e.g. Dr Louis"
                                ref={key}
                                onTouchStart={() => keyb == false ? key.current.blur() : null}
                                placeholderTextColor={Colors.search_place}
                                style={Styles.search_input}
                                editable={edit}
                                onChangeText={(text) => searchRes(text)} />
                            <TouchableOpacity style={Styles.search_button}>
                                <Icon name="search" size={25} color={Colors.white}></Icon>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>


                    <View style={Styles.flatlist_header}>
                        <Text style={Styles.flatlist_header_text}>Categories</Text>
                        <View style={{ width: wp("100%"), height: hp("13%") }}>
                            <FlatList horizontal showsHorizontalScrollIndicator={false} data={dataCat} renderItem={renderCat} />
                        </View>

                    </View>
                    <Animated.View style={{
                        backgroundColor: Colors.white,
                        transform: [{
                            translateY: doc == true ? up.value : down.value
                        }],
                        zIndex: 1,

                    }
                    } >
                        <View style={Styles.doc_view}>
                            <Text style={Styles.doc_header}>Top Doctors</Text>
                            <TouchableOpacity onPress={() => setdoc(!doc)}>
                                {api == "" ? <ActivityIndicator size={"small"} color={Colors.date} /> : <Text style={Styles.doc_text}>{doc == false ? (doclist != "" ? null : "See All") : "See less"}</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.doc_details}>
                            {api == "" ?
                                <View><ActivityIndicator color={Colors.date} size={"large"}
                                    style={{
                                        marginTop: hp("15%"),
                                    }} />
                                    <Text style={{ alignSelf: "center", fontFamily: fonts.semibold, fontSize: 18, marginTop: hp("1%"), marginLeft: wp("3%") }}>Loading...</Text>
                                </View> : api.length == 0 ? <View><Text style={{ color: "black" }}>Something is wrong !</Text></View> :

                                    <View
                                        style={{
                                            backgroundColor: Colors.white,
                                        }}>
                                        {doclist == "" ?
                                            <FlatList
                                                data={api}
                                                renderItem={renderDoc}
                                                initialNumToRender={doc == false ? 10 : 5} /> :
                                            <View style={{ height: hp("41.5%") }}>
                                                <ScrollView><FlatList data={doclist}
                                                    renderItem={renderSearch}
                                                    scrollEnabled={false}
                                                />
                                                </ScrollView>
                                            </View>}</View>}
                        </View>
                    </Animated.View>
                </View>
            </View>
        </Animated.View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: hp("100%"),
    },
    bg: {
        backgroundColor: Colors.blue,
        width: wp("100%"),
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
        // elevation: 20,
        shadowColor: Colors.grey
    },
    drawer: {
        flex: 0
    },
    drawer_image: {
        height: hp("1.5%"),
        resizeMode: "contain",
        marginVertical: hp("3%"),
        marginLeft: wp("4.5%")
    },
    header: {
        marginTop: hp("1%"),
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: wp("5%")
    },
    header_text: {
        fontFamily: fonts.heavy,
        fontSize: 20,
        color: Colors.dark_grey,
        width: wp("72%")
    },
    header_image: {
        height: hp("6%"),
        width: wp("12%"),
        resizeMode: "center",
        borderRadius: 8
    },
    flatlist_header: {
        flex: 0,
        alignItems: "center",

    },
    flatlist_header_text: {
        fontFamily: fonts.semibold,
        fontSize: 20,
        color: Colors.dark_grey,
        width: wp("87.9%"),
        height: hp("5%")
    },
    searchbar: {
        flex: 0,
        alignItems: "center",
    },
    searchbar_view: {
        flexDirection: "row",
        height: hp("6%"),
        borderRadius: 50,
        backgroundColor: Colors.search_bar,
        width: wp("88%"),
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("3.5%"),
        marginBottom: hp("2%")
    },
    search_button: {
        height: hp("4.5%"),
        width: wp("9.6%"),
        backgroundColor: Colors.searchbar_button,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },
    search_input: {
        width: wp("74.5%"),
        paddingHorizontal: wp(5),
        color: Colors.dark_grey,
        fontFamily: fonts.regular
    },
    doc_view: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: wp("4%"),
        marginTop: hp("2%"),
        justifyContent: "space-between",
        paddingHorizontal: 22
    },
    doc_header: {
        fontFamily: fonts.semibold,
        fontSize: 20,
        color: Colors.dark_grey
    },
    doc_text: {
        fontFamily: fonts.regular,
        color: Colors.dark_grey,
        fontSize: 14
    },
    doc_details: {
        width: wp("100%"),
        // alignItems: "center",
        // height: hp("100%"),
        paddingBottom: hp("-2%")
    },
    doc_image: {
        height: hp("7%"),
        width: wp("14%"),
    },
    doc_indicator: {
        backgroundColor: Colors.lite_green,
        height: hp("2%"),
        width: hp("2%"),
        marginHorizontal: wp("11%"),
        marginTop: hp("-0.5%"),
        borderRadius: hp("2%"),
        borderWidth: 2,
        borderColor: Colors.search_bar
    },
    doc_banner: {
        height: hp("10%"),
        width: wp("85%"),
        borderRadius: 15,
        shadowColor: Colors.grey,
        elevation: 10,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: hp("2.5%"),
        marginBottom: wp("2%"),
        marginTop: hp("2%"),
    },
    doc_banner_header: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: Colors.dark_grey,
        width: wp("50%"),
        marginHorizontal: wp("5%"),
        textTransform: "capitalize"
    },
    doc_banner_text: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: Colors.dark_grey,
        width: wp("50%"),
        marginHorizontal: wp("5%"),
        textTransform: "capitalize"

    },
    doc_banner_view: {
        height: hp("12%"),
        width: wp("24%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        marginLeft: wp("7.3%"),
        marginRight: wp("-2%"),
        elevation: 5
    },
    detail_back: {
        marginHorizontal: wp("5%"),
        marginVertical: hp("1%")
    },
    profile_bg: {
        width: wp("85%"),
        backgroundColor: Colors.white,
        borderRadius: 39,
        alignSelf: "center",
        shadowColor: Colors.dark_grey,
        elevation: 5,
    },
    bg_image: {
        height: hp("15%"),
        width: wp("30%"),
        alignSelf: "center",
        marginVertical: hp("3%")
    },
    profile_indicator: {
        height: hp("2.5%"),
        width: wp("5.5%"),
        borderRadius: 15,
        backgroundColor: Colors.green,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp("25.5%"),
        marginTop: hp("-0.3%"),
        shadowColor: Colors.dark_grey,
        borderColor: Colors.white,
        borderWidth: 4
    },
    doc_text_sp: {
        fontFamily: fonts.semibold,
        color: Colors.grey,
        fontSize: 16,
        alignSelf: "center",
        textTransform: "capitalize",
    },
    doc_text_title: {
        fontFamily: fonts.semibold,
        color: Colors.dark_grey,
        fontSize: 18,
        alignSelf: "center",
        textTransform: "capitalize",
        // marginBottom: hp("3%")
    },
    hos_text: {
        fontFamily: fonts.semibold,
        color: Colors.date,
        fontSize: 14,
        marginHorizontal: wp("7%"),
        marginTop: hp("2%"),
        marginBottom: hp("1.5%")
    },
    doc_icon_view: {
        flexDirection: "row",
        alignSelf: "center"
    },
    doc_icons: {
        resizeMode: "contain",
    },
    doc_icon_button: {
        height: hp("5%"),
        width: wp("5%"),
        marginHorizontal: wp("2%"),
        alignItems: "center",
        justifyContent: "center"
    },
    doc_exp: {
        fontFamily: fonts.semibold,
        color: Colors.date,
        fontSize: 12,
        marginHorizontal: wp("5%"),
        marginTop: hp("2%")
    },
    doc_exp_data: {
        fontFamily: fonts.semibold,
        color: Colors.grey,
        fontSize: 14,
        marginHorizontal: wp("6%"),
        marginTop: hp("1%")
    },
    book_app_view: {
        marginTop: hp("3%"),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp("5%")
    },
    book_app_btn: {
        backgroundColor: Colors.blue,
        borderRadius: 24
    },
    book_app_text: {
        color: Colors.white,
        fontFamily: fonts.semibold,
        fontSize: 18,
        marginHorizontal: wp("6%"),
        marginVertical: hp("1.3%")
    },
    about: {
        fontFamily: fonts.semibold,
        color: Colors.date,
        fontSize: 14,
        marginHorizontal: wp("7%"),
        marginTop: hp("2%"),
    },
    overlayContainer: {
        position: 'absolute',
        zIndex: 1,
        top: hp("25%"),
        bottom: hp("50%"),
        left: wp("7%"),
        right: wp("7%"),
        backgroundColor: Colors.white,
        elevation: 10,
        shadowColor: Colors.grey,
        borderRadius: 10
    },
    search_Text: {
        zIndex: 1,
        color: Colors.grey,
        marginHorizontal: wp("3%"),
        marginTop: hp("0.3%"),
        paddingBottom: 5,
        borderBottomColor: Colors.date,
        fontFamily: fonts.regular,
        textTransform: "capitalize"
    }
})

export default Home;