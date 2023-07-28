import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, useColorScheme } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
// import { Colors } from "../assets/colors/colors.js";
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import { Dropdown } from "react-native-element-dropdown";
import { fonts } from "../assets/fonts/fonts";
import DocumentPicker from 'react-native-document-picker';
import FileViewer from "react-native-file-viewer";
import { dark } from "../assets/colors/dark.js";
import { light } from "../assets/colors/light.js";
import { Colors } from "../assets/colors/colors";
import { JsonCalendar } from "json-calendar";
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutUp } from "react-native-reanimated";
import { CommonActions } from "@react-navigation/native";

const Appointment = (navigation) => {

    const [scheme, setScheme] = useState("");
    const [value, setValue] = useState(false);
    const [yvalue, setY] = useState("")
    const [isFocus, setIsFocus] = useState(false);
    const [active, setActive] = useState("")
    const [doc, setDoc] = useState("")
    const [fname, setFname] = useState("File")
    const [ind, setInd] = useState(0);
    const [select, setSelect] = useState("")
    const [current, setCurrent] = useState("");

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

    const days = [
        {
            id: 0,
            day: 1
        },
        {
            id: 1,
            day: 2
        },
        {
            id: 2,
            day: 3
        },
        {
            id: 3,
            day: 4
        },
        {
            id: 4,
            day: 5
        },
        {
            id: 5,
            day: 6
        },
        {
            id: 6,
            day: 7
        },
        {
            id: 7,
            day: 8
        },
        {
            id: 8,
            day: 9
        },
        {
            id: 9,
            day: 10
        },
        {
            id: 10,
            day: 11
        },
        {
            id: 11,
            day: 12
        },
        {
            id: 12,
            day: 13
        },
        {
            id: 13,
            day: 14
        },
        {
            id: 14,
            day: 15
        },
        {
            id: 15,
            day: 16
        },
        {
            id: 16,
            day: 17
        },
        {
            id: 17,
            day: 18
        },
        {
            id: 18,
            day: 19
        },
        {
            id: 19,
            day: 20
        },
        {
            id: 20,
            day: 21
        },
        {
            id: 21,
            day: 22
        },
        {
            id: 22,
            day: 23
        },
        {
            id: 23,
            day: 24
        },
        {
            id: 24,
            day: 25
        },
        {
            id: 25,
            day: 26
        },
        {
            id: 26,
            day: 27
        },
        {
            id: 27,
            day: 28
        },
        {
            id: 28,
            day: 29
        },
        {
            id: 29,
            day: 30
        },
        {
            id: 30,
            day: 31
        },
    ]

    const seelectDoc = async () => {
        const document = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] });
        setDoc(document);
        document.map(async (item, index) => {
            setDoc(item.uri)
            setFname(item.name)
        })
        console.log(doc)
    }

    const openFile = async () => {
        await FileViewer.open(doc);
        console.log(doc)

    }

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
            {/* <View style={{ alignItems: "center", marginTop: hp("3%") }}>
                <FlatList horizontal data={week} renderItem={renderDays} />
            </View> */}
            {/* <View style={{ alignItems: "center" }}>
                <ScrollView 
                horizontal 
                pagingEnabled 
                contentContainerStyle={{ zIndex: -1, marginHorizontal: wp("10%") }}
                showsHorizontalScrollIndicator={false}>
                    {days.map((date, index) => { console.log("date", index > 28 && index <= 31 &&  date.day)
                        return (
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity onPress={() => setCurrent(index)} style={{
                                    backgroundColor: current == index ? Colors.blue : null,
                                    flexDirection: "row",
                                    marginRight: wp("5.9%"),
                                    marginLeft: wp("0.4%"),
                                    marginTop: hp("2%"),
                                    borderRadius: 8,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: hp("4%"),
                                    width: wp("6%")
                                }} key={index}>
                                    <Text key={date.id} style={{ fontSize: 14, fontFamily: fonts.bold, 
                                    marginLeft: index >= 7 && index <= 13 ? wp("2%") : index >= 13 && index <= 20 ? wp("30%") : 
                                    index >= 20 && index <= 29 ? wp("20%") : index >= 30 && index <= 31 ? wp("30%") : null,
                                    marginRight: index >= 7 && index <= 13 ? wp("-28%"): index >= 13 && index <= 20 ? wp("-29%") :
                                    index >= 20 && index <= 29 ? wp("-29%") : index >= 30 && index <= 31 ? wp("-19%") : null}}>
                                    {index < 8 && date.day}
                                    {index > 7 && index < 16 && date.day}
                                    {index > 15 && index < 22 && date.day}
                                    {index > 21 && index < 27 && date.day}
                                    {index > 27 && index <= 31 && date.day}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View> */}
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
                    <TouchableOpacity style={Styles.appoint_btn} onPress={seelectDoc} >
                        <Text style={Styles.appoint_text}>Book An Appointment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.appoint_btn} onPress={openFile} >
                        <Text style={Styles.appoint_text}>View {fname}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )
}



export default Appointment;

