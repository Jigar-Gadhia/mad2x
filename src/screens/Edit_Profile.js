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
import { useQuery } from '@tanstack/react-query'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from 'buffer'

const array = [
    {
        name: "Name",
        placeholder: "John Doe",
        value: ""
    },
    {
        name: "Email",
        placeholder: "johndoe@mail.com",
        value: ""/*userdata.email*/
    },
    {
        name: "Mobile Number",
        placeholder: "+88 012 575 3365",
        value: ""/*userdata.mobile*/
    },
    {
        name: "Age",
        placeholder: "35 Years",
        value: ""/*userdata.age*/
    },
    {
        name: "Address",
        placeholder: "Lorem ipsum dolor sit amet",
        value: ""/*userdata.address*/
    },

]

const Profile_Edit = (navigation) => {

    useEffect(() => {
        static_image();
        ProfileData[0].value = data.name
        ProfileData[2].value = data.mobile
        ProfileData[3].value = data.age
        ProfileData[4].value = data.address
    }, [])

    const [id, setId] = useState("");

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
        console.log(response)
        return response.data.ResponseData;
    };

    const GetProfile = () => {
        const { data, error, status, isFetched, isLoading } = useQuery(['data_profile'], Apidata, { refetchOnMount: true, refetchOnReconnect: true });
        return { data, error, status, isFetched, isLoading };
    };

    const { data, status, isFetched, isLoading, error } = GetProfile();
    console.log("fetching", data)

    const [ProfileData, setPost] = useState(array);
    const newData = Object.assign(array, ProfileData)
    const default_image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [url, setUrl] = useState(default_image);
    const [uname, setUname] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");
    const [address, SetAddress] = useState("");

    const static_image = async () => {
        await AsyncStorage.setItem('image_uri', url)
    }

    const ApiPost = () => {

        var formdata = new FormData();
        // console.log("uname", ProfileData[0].value, ProfileData[2].value, ProfileData[3].value, ProfileData[4].value)
        formdata.append("profileId", id);
        formdata.append("name", ProfileData[0].value.toString());
        formdata.append("age", ProfileData[2].value.toString());
        formdata.append("address", ProfileData[4].value.toString());
        formdata.append("image(base64)", url)
        formdata.append("mobile", ProfileData[3].value.toString());

        axios.post('http://staging.webmynehost.com/hospital_demo/services/editProfile.php', formdata, { headers: { 'content-type': 'multipart/form-data' } })

            .then(function (response) {
                console.log("postApi", response);
                // console.log("post", post)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const toggleSave = () => {
        setPost(newData)
        setUname(ProfileData[0].value)
        setMobile(ProfileData[2].value)
        setAge(ProfileData[3].value)
        SetAddress(ProfileData[4].value)
    }

    const toggleAbort = () => {
        ProfileData[0].value = data.name
        ProfileData[2].value = data.mobile
        ProfileData[3].value = data.age
        ProfileData[4].value = data.address
        console.log("array updated: ", ProfileData)
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
            const img = await AsyncStorage.getItem("image_uri")
            setUrl(img)
        })
        navigation.navigation, dispatch(CommonActions.reset(
            {
                routes: [
                    {
                        name: "Edit_Profile"
                    },
                ]
            }
        ))
    }

    const load_camera = async () => {
        const result = await launchCamera()
        result.assets.map(async (item) => {
            await AsyncStorage.setItem('image_uri', item.uri)
            const img = await AsyncStorage.getItem("image_uri")
            setUrl(img)

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

    const renderProfile = ({ item, index }) => {
        return (
            <View style={Styles.profile_view} key={index}>
                <Text style={Styles.profile_text} key={index}>{item.name}</Text>
                <TextInput style={[Styles.input, item.name == "Email" && edit == true ? { color: Colors.grey } : null, edit == true ? { elevation: 5 } : null]}
                    placeholder={item.placeholder}
                    value={item.name == "Email" ? data.email : null}
                    defaultValue={item.value}
                    placeholderTextColor={Colors.blue}
                    editable={item.name == "Email" ? false : edit}
                    onChangeText={(text) => {
                        newData[index].value = text
                    }} />
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

    // reader.readAsDataURL(default_image)


    return (
        isLoading ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator size={"large"} color={Colors.date} /></View> :
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
                            <View style={{ marginBottom: hp("3%") }}>
                                <FlatList data={ProfileData} renderItem={renderProfile} scrollEnabled={false} />
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