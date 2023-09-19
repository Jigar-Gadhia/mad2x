import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Colors } from "../assets/colors/colors.js";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../assets/fonts/fonts";
import Icon from 'react-native-vector-icons/Ionicons'
import { CommonActions } from "@react-navigation/native";
import Modal from 'react-native-modal';
import axios from 'react-native-axios';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../data/getProfile.js";
import { InputForm } from "../components/InputForm.js";
import { fetchProfile } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

const Profile_Edit = (navigation) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile());
        static_image();
        array[0].value = data.name
        array[1].value = data.email
        array[2].value = data.mobile
        array[3].value = data.age
        array[4].value = data.address
    }, [])

    const [id, setId] = useState("");
    const data = useSelector((data) => data.data.data)

    const Apidata = async () => {
        const did = await AsyncStorage.getItem('dataid')
        const userid = JSON.parse(did);
        setId(userid)
        const username = await AsyncStorage.getItem('dataname')
        const response = await axios.get("http://staging.webmynehost.com/hospital_demo/services/getProfile.php", {
            params: {
                profileId: userid
            }
        })
        return response.data.ResponseData;
    };

    // const GetProfile = () => {
    //     const { data, error, status, isFetched, isLoading } = useQuery(['data_profile'], Apidata, { refetchOnMount: true, refetchOnReconnect: true });
    //     return { data, error, status, isFetched, isLoading };
    // };

    // const { data, status, isFetched, isLoading, error } = GetProfile();

    const [array, setArray] = useState(getProfile);
    const newData = [...array]
    const default_image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [url, setUrl] = useState(default_image);
    const [uname, setUname] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");
    const [address, SetAddress] = useState("");

    const static_image = async () => {
        await AsyncStorage.setItem('image_uri', url.toString())
    }

    const ApiPost = () => {

        var formdata = new FormData();
        formdata.append("profileId", id);
        formdata.append("name", array[0].value.toString());
        formdata.append("age", array[2].value.toString());
        formdata.append("address", array[4].value.toString());
        formdata.append("image(base64)", url)
        formdata.append("mobile", array[3].value.toString());

        axios.post('http://staging.webmynehost.com/hospital_demo/services/editProfile.php', formdata, { headers: { 'content-type': 'multipart/form-data' } })

            .then(function (response) {
                console.log("postApi", response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const toggleSave = () => {
        // setPost(newData)
        setUname(array[0].value)
        setMobile(array[2].value)
        setAge(array[3].value)
        SetAddress(array[4].value)
    }

    const toggleAbort = () => {
        array[0].value = data.name
        array[2].value = data.mobile
        array[3].value = data.age
        array[4].value = data.address
        navigation.navigation.dispatch(CommonActions.reset({
            routes: [{ name: "Edit_Profile" }]
        }))
    }


    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const load_gallery = async () => {
        const result = await launchImageLibrary()
        result.assets.map(async (item) => {
            await AsyncStorage.setItem('image_uri', item.uri)
            setUrl(item.uri)
        })
    }

    const load_camera = async () => {
        const result = await launchCamera()
        result.assets.map(async (item) => {
            await AsyncStorage.setItem('image_uri', item.uri)
            setUrl(item.uri)
        })
    }

    const popup = () => {
        return (
            <View onTouchStart={toggleModal}>
                <Modal isVisible={visible} animationIn={"slideInUp"} animationInTiming={400} animationOut={"slideOutDown"}>
                    <View style={Styles.popup_view}>
                        <TouchableOpacity style={Styles.modal_btn} onPress={load_gallery}>
                            <Icon name="images-outline" size={40} color={Colors.dark_grey} style={Styles.modal_icon} />
                            <Text style={Styles.modal_text}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.modal_btn} onPress={load_camera}>
                            <Icon name="camera" size={40} color={Colors.dark_grey} style={Styles.modal_icon} />
                            <Text style={Styles.modal_text}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

        )

    }

    const toggleModal = () => {
        if (edit == true) {
            setVisible(!visible);
        }
        else {
            alert("Please toggle edit button to set or edit profile picture")
        }
    }

    const toggleEdit = () => {
        setEdit(!edit)
    }

    return (
        !data ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator size={"large"} color={Colors.date} /></View> :
            <ScrollView automaticallyAdjustKeyboardInsets>
                <View style={{ height: hp("100%") }}>
                    <View>
                        {popup()}
                    </View>
                    <View style={Styles.bg}>
                        <View style={Styles.back_view}>
                            {edit == false ? (
                                <TouchableOpacity onPress={() => navigation.navigation.dispatch(CommonActions.reset({ routes: [{ name: "Profile" }] }))}>
                                    <Icon name="arrow-back-outline" size={32} color={Colors.white} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity>
                                    <Icon name={"close-outline"} onPress={() => {
                                        toggleEdit()
                                        toggleAbort()
                                    }} size={32} color={Colors.white} />
                                </TouchableOpacity>
                            )}
                            <Text style={Styles.back_text}>Profile</Text>
                            <TouchableOpacity onPress={toggleEdit} style={{ marginLeft: wp("58%") }}>
                                {edit == false ? <Icon name="create-outline" size={32} color={Colors.white} /> : <Icon name="checkmark-outline" onPress={() => {
                                    toggleEdit();
                                    toggleSave();
                                    ApiPost();
                                    // Apidata();
                                }} size={32} color={Colors.white} />}
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.profile_bg}>
                            <View style={[Styles.bg_image, edit == true ? { elevation: 10 } : null]}>
                                <ImageBackground source={{ uri: url }} resizeMode='center' style={{ height: hp("15%") }} borderRadius={24}>
                                    <TouchableOpacity onPress={toggleModal} style={Styles.camera_indicator}>
                                        <Icon name="camera" size={20} color={Colors.blue} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={{ marginBottom: hp("3%"), alignItems: "center" }}>
                                <InputForm
                                    TouchEvent={(index) => console.log(index)}
                                    data={array}
                                    TextSpace={hp("1%")}
                                    TextChangeEvent={(text, index) => {
                                        newData[index].value = text
                                    }} 
                                    editable={edit}
                                    />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
    )
}

const Styles = StyleSheet.create({
    profile_view: {
        alignSelf: "center",
        width: wp("70%"),
        marginBottom: hp("1%")
    },
    profile_text: {
        color: Colors.dark_grey,
        marginVertical: hp("1%"),
        fontSize: 15,
        fontFamily: fonts.semibold,

    },
    input: {
        height: hp("6.5%"),
        backgroundColor: Colors.lite_blue,
        borderRadius: 12,
        fontFamily: fonts.semibold,
        fontSize: 15,
        paddingLeft: wp("5%"),
        shadowColor: Colors.dark_grey,
        color: Colors.dark_grey
    },
    camera_indicator: {
        height: hp("3.5%"),
        width: wp("7.5%"),
        borderRadius: 15,
        borderWidth: 3,
        borderColor: Colors.blue,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp("23.5%"),
        marginTop: hp("-0.5%"),
        shadowColor: Colors.dark_grey,
        elevation: 5
    },
    popup_view: {
        borderRadius: 20,
        backgroundColor: Colors.white
    },
    modal_btn: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: Colors.lite_blue,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    modal_text: {
        fontSize: 18,
        fontFamily: fonts.semibold,
        marginLeft: 5,
        color: Colors.dark_grey,
        width: wp("70%")
    },
    modal_icon: {
        margin: 5
    },
    bg: {
        backgroundColor: Colors.blue,
        height: hp("80%"),
        width: wp("100%"),
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
        elevation: 20,
        shadowColor: Colors.grey,
    },
    back_view: {
        marginLeft: wp("5%"),
        marginTop: hp("2%"),
        flexDirection: "row",
        alignItems: "center"
    },
    back_text: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: Colors.white,
        marginLeft: wp("4%")
    },
    profile_bg: {
        width: wp("85%"),
        backgroundColor: Colors.white,
        borderRadius: 39,
        marginTop: hp("8%"),
        alignSelf: "center",
        shadowColor: Colors.dark_grey,
        elevation: 5
    },
    bg_image: {
        height: hp("15%"),
        width: wp("30%"),
        marginTop: hp("-7%"),
        borderRadius: 24,
        alignSelf: "center",
        backgroundColor: Colors.white
    }
})

export default Profile_Edit;