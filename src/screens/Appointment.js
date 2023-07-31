import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, useColorScheme } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import { Dropdown } from "react-native-element-dropdown";
import { fonts } from "../assets/fonts/fonts";
import { dark } from "../assets/colors/dark.js";
import { light } from "../assets/colors/light.js";
import { JsonCalendar } from "json-calendar";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { CommonActions } from "@react-navigation/native";

const Appointment = (navigation) => {

    const [scheme, setScheme] = useState("");
    const [value, setValue] = useState(false);
    const [yvalue, setY] = useState("")
    const [isFocus, setIsFocus] = useState(false);
    const [active, setActive] = useState("")
    const [ind, setInd] = useState(0);
    const [select, setSelect] = useState("")

    const calendar = new JsonCalendar();
    const week = calendar.dayNames
    const month = calendar.monthNames;
    const date = new Date();
    console.log(week[ind].abbr)

    const theme = useColorScheme();

    useEffect(() => {
        ChangeTheme();
    }, [])

    const ChangeTheme = () => {
        if (theme == 'dark') {
            setScheme(dark)
            // alert("dark")
        }
        else {
            setScheme(light)
            // alert("light")
        }
    }

    const Styles = StyleSheet.create({
        bg: {
            backgroundColor: scheme.white
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: wp("4%"),
            marginHorizontal: wp("6%")
        },
        text: {
            color: scheme.dark_grey,
            fontSize: 18,
            marginLeft: wp("5%"),
            marginBottom: hp("0.2%"),
            fontFamily: fonts.semibold
        },
        dropdown_month: {
            width: wp("25%"),
            height: hp("41%"),
            backgroundColor: scheme.white,
            elevation: 10,
            marginLeft: wp("12%"),
            marginTop: hp("14%"),
            borderRadius: 15,
            position: "absolute"
        },
        dropdown_year: {
            width: wp("24%"),
            marginLeft: wp("8%"),
            fontFamily: fonts.bold,
            color: scheme.black,
            backgroundColor: theme == 'dark' ? scheme.dark_grey : scheme.white,
            borderRadius: 12,
            paddingLeft: wp("3%"),
            elevation: theme == 'dark' ? 10 : 0,

        },
        time_view: {
            height: hp("75%"),
            backgroundColor: scheme.sky_blue,
            marginTop: hp("2.5%"),
            zIndex: -1
        },
        time_header: {
            marginHorizontal: wp("5%"),
            marginTop: hp("1.5%")
        },
        time_header_text: {
            fontFamily: fonts.bold,
            fontSize: 15,
            color: scheme.dark_grey
        },
        slot_button: {
            backgroundColor: scheme.white,
            borderRadius: 10,
            marginLeft: wp("5%"),
            marginTop: hp("2%")
        },
        slot_text: {
            margin: 6,
            fontFamily: fonts.regular,
            fontSize: 15,
            color: scheme.black
        },
        appoint_btn: {
            alignSelf: "center",
            backgroundColor: scheme.blue,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
            marginBottom: hp("5%")
        },
        appoint_text: {
            fontFamily: fonts.semibold,
            fontSize: 18,
            color: scheme.black,
            marginHorizontal: wp("7%"),
            marginVertical: hp("1.7%")
        },
        active_slot_button: {
            backgroundColor: scheme.blue,
            borderRadius: 10,
            marginLeft: wp("5%"),
            marginTop: hp("2%")
        },
        active_slot_text: {
            margin: 6,
            fontFamily: fonts.regular,
            fontSize: 15,
            color: scheme.white
        },
        years_btn: {
            flexDirection: "row",
            marginLeft: wp("12%"),
            backgroundColor: scheme.white,
            height: hp("5%"),
            width: wp("25%"),
            // elevation: 10,
            alignItems: "center",
            justifyContent: "space-evenly",
            borderRadius: 15,
            zIndex: 1
        }
    })

    const active_btn = (id) => {
        setActive(id)
    }

    const years = [
        { label: '1999', value: '1' },
        { label: '2000', value: '2' },
        { label: '2001', value: '3' },
        { label: '2002', value: '4' },
        { label: '2003', value: '5' },
        { label: '2004', value: '6' },
        { label: '2005', value: '7' },
        { label: '2006', value: '8' }
    ];

    const timeSlots = [
        {
            id: 0,
            slot: "Morning slots",
            slottime: [
                {
                    select: "mr1",
                    time: '10:10 AM',
                }, {
                    select: "mr2",
                    time: '10:30 AM'
                },
                {
                    select: "mr3",
                    time: '10:30 AM'
                },
                {
                    select: "mr4",
                    time: '10:30 AM'
                }
            ]
        },
        {
            id: 1,
            slot: "Afternoon Slots",
            slottime: [
                {
                    select: "mr5",
                    time: '02:10 PM'
                },
                {
                    select: "mr6",
                    time: '02:30 PM'
                },
                {
                    select: "mr7",
                    time: '03:00 PM'
                }
            ]
        },
        {
            id: 2,
            slot: "Evening Slots",
            slottime: [
                {
                    select: "mr8",
                    time: '06:30 PM'
                },
                {
                    select: "mr9",
                    time: '07:00 PM'
                },
                {
                    select: "mr10",
                    time: '07:30 PM'
                },
                {
                    select: "mr11",
                    time: '07:50 PM'
                },
                {
                    select: "mr12",
                    time: '08:20 PM'
                }
            ]
        }
    ]

    const renderSlots = ({ item, index }) => {
        return (
            <View style={{ flex: 1, marginBottom: hp("2%") }}>
                <View style={Styles.time_header}>
                    <Text style={Styles.time_header_text}>{item.slot}</Text>
                </View>
                {item.slottime.map((item, index) => {
                    return (
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <TouchableOpacity style={(active == index) ? Styles.active_slot_button : Styles.slot_button} onPress={setActive(index)}>
                                <Text style={(active == index) ? Styles.active_slot_text : Styles.slot_text}>{item.time}</Text>
                            </TouchableOpacity>
                        </View>)
                })}

            </View>
        )
    }

    const renderDays = ({ item, index }) => {
        console.log(item)
        return (
            <TouchableOpacity key={index} style={{ borderRadius: 8, marginHorizontal: wp("3%"), height: hp("3%"), backgroundColor: select == index ? scheme.blue : null }} onPress={() => setSelect(index)}>
                <Text style={{ fontSize: 14, fontFamily: fonts.bold, marginHorizontal: wp("1%"), color: select == index ? scheme.white : scheme.dark_grey }} key={item.name}>{item.abbr}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={Styles.bg}>
            <TouchableOpacity onPress={() => navigation.navigation.dispatch(CommonActions.reset({
                routes: [{
                    name: "TabNav",
                    key: "Tab_Home"
                }]
            }))} style={Styles.header}>
                <Icon name="arrow-back-outline" size={32} color={scheme.black} />
                <Text style={Styles.text}>Appointment</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={Styles.years_btn} onPress={() => setValue(!value)}>
                    <Text style={{ color: scheme.black }}>{ind == "" ? "Month" : month[ind]}</Text>
                    <Icon name={value == true ? "chevron-up-outline" : "chevron-down-outline"} size={20} color={scheme.black} />
                </TouchableOpacity>
                {/* <Dropdown data={month} placeholder={month[0]}
                    containerStyle={{ borderRadius: 12, marginTop: hp("1%"), elevation: 10 }}
                    inputSearchStyle={{ borderRadius: 12 }}
                    fontFamily={fonts.bold}
                    placeholderTextColor="red"
                    placeholderStyle={{ color: scheme.grey }}
                    style={Styles.dropdown_month}
                    labelField="label"
                    valueField="value"
                    search
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    value={value}
                    onChange={index => {
                        setValue(index);
                        setIsFocus(false);
                        console.log("month", index)
                    }}
                /> */}
                <Dropdown data={years} placeholder='...'
                    containerStyle={{ borderRadius: 12, marginTop: hp("1%"), elevation: 10 }}
                    inputSearchStyle={{ borderRadius: 12 }}
                    fontFamily={fonts.bold}
                    // placeholderTextColor="red"
                    placeholderStyle={{ color: scheme.black }}
                    style={Styles.dropdown_year}
                    labelField="label"
                    valueField="value"
                    search
                    searchPlaceholder="Search..."
                    sea
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    value={yvalue}
                    onChange={item => {
                        setY(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>
            {value == true && <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={Styles.dropdown_month}>
                <FlatList scrollEnabled={false} showsVerticalScrollIndicator={false} data={month} renderItem={(item, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setInd(item.index)
                            setValue(false)
                        }}>
                            <Text style={{ color: scheme.dark_grey, margin: 5 }} key={index}>{item.item}</Text>
                        </TouchableOpacity>
                    )
                }} />
            </Animated.View>}
            <CalendarStrip scrollable={true} scrollerPaging={true} showMonth={true} 
                style={{ height: hp("10%"), width: wp("100%"), paddingTop: 20, paddingBottom: 10, paddingHorizontal: wp("6%"), zIndex: -1 }}
                // calendarHeaderStyle={{ color: scheme.white }}
                highlightDateNumberStyle={{
                    color: scheme.white,
                    backgroundColor: scheme.blue,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    height: hp("2.4%"),
                    width: wp("7%"),
                    fontFamily: fonts.regular,
                    fontSize: 14
                }}
                highlightDateNameStyle={{
                    color: scheme.white,
                    backgroundColor: scheme.blue,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: hp("3%"),
                    width: wp("7%"),
                    textAlignVertical: "center",
                    fontFamily: fonts.bold,
                    fontSize: 11,
                    textTransform: "capitalize",
                }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                dateNameStyle={{
                    height: hp("3%"),
                    width: wp("10%"),
                    textTransform: "capitalize",
                    textAlignVertical: "center",
                    fontFamily: fonts.bold,
                    color: scheme.dark_grey,
                    fontSize: 11
                }}
                dateNumberStyle={{ height: hp("2.4%"), width: wp("10%"), fontSize: 14, fontFamily: fonts.regular, color: scheme.date }}
                iconContainer={{ flex: 0, display: "none" }}
                startingDate={"1"}
            />

            <View style={Styles.time_view}>
                <View style={Styles.time_header}>
                    <FlatList scrollEnabled={false} data={timeSlots} renderItem={(item, index) => {
                        return (
                            <View style={{ flex: 1, marginBottom: hp("2%") }}>
                                <View style={Styles.time_header}>
                                    <Text style={Styles.time_header_text} key={index}>{item.item.slot}</Text>
                                </View>
                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                    {item.item.slottime.map((item, index) => {
                                        return (
                                            <View>
                                                <TouchableOpacity style={(active == item.select) ? Styles.active_slot_button : Styles.slot_button} onPress={() => setActive(item.select)}>
                                                    <Text style={(active == item.select) ? Styles.active_slot_text : Styles.slot_text} key={index}>{item.time}</Text>
                                                </TouchableOpacity>
                                            </View>)
                                    })}
                                </View>
                            </View>

                        )
                    }} />
                    <TouchableOpacity style={Styles.appoint_btn} >
                        <Text style={Styles.appoint_text}>Book An Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}



export default Appointment;

