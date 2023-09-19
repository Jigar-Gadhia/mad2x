import { StyleSheet } from 'react-native';
import { fonts } from '../assets/fonts/fonts';
import { Colors } from '../assets/colors/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    image_top: {
        resizeMode: "contain",
        height: hp("19%"),
        width: wp("122%"),
        marginTop: hp("-7.5%"),
        transform: [{ rotate: "180deg" }],
    },
    image_bg_top: {
        height: hp("19%"),
        width: wp("122%"),
        resizeMode: "contain",
        position: "absolute",
        alignSelf: 'flex-start',
        transform: [{ rotate: "180deg" }],
        marginTop: hp("-6%"),
    },
    logo: {
        width: wp("70%"),
        resizeMode: "contain",
    },
    logo_view: {
        flex: 1,
        alignItems: "center",
        marginTop: hp("20%")
    },
    image_bottom: {
        resizeMode: "contain",
        height: hp("24%"),
        width: wp("98%"),
    },
    image_bg_bottom: {
        height: hp("31%"),
        width: wp("97%"),
        resizeMode: "contain",
        position: "absolute",
        marginTop: hp("-4.5%"),
    },
    error_text: {
        color: Colors.red
    },
    inputTitle: {
        fontFamily: fonts.semibold,
        fontSize: 15,
        marginTop: hp("1%"),
        color: Colors.dark_grey
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
    splash_view: {
        flex: 1,
        alignItems: "flex-start"
    },
    bottom_view: {
        flex: 1, 
        marginLeft: wp("12%"), 
        marginTop: hp("35%")
    }
})