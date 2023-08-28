import {StyleSheet} from 'react-native';
import { fonts } from '../assets/fonts/fonts';
import { Colors } from '../assets/colors/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const Styles = StyleSheet.create({
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
    }
})