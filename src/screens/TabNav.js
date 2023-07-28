import React from 'react';
import { Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Home from './Home.js';
import Medications from './Medications.js';
import Settings from "./Settings.js";
import Profile from "./Profile.js";
import Profile_Edit from './Edit_Profile.js';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from '../assets/colors/colors.js';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Show_Profile = () => {
    return (
        <Stack.Navigator initialRouteName='Profile' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} options={{ animation: "fade_from_bottom" }} />
            <Stack.Screen name="Edit_Profile" component={Profile_Edit} options={{ animation: "fade_from_bottom" }} />
        </Stack.Navigator>
    )
}

const TabNav = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    height: hp("7%"),
                    backgroundColor: Colors.blue,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                },
                headerShown: false,
                tabBarActiveTintColor: '#1a3c43',
                tabBarInactiveTintColor: '#1a3c43',
                tabBarActiveBackgroundColor: component = { Profile_Edit } ? component = { Profile } && Colors.slight_blue : Colors.slight_blue,
                tabBarInactiveBackgroundColor: Colors.blue,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                key="Tab_Home"
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => <Text style={Styles.label}>Home</Text>,
                    tabBarIcon: () => <Image source={require('../images/home.png')}
                        resizeMode='contain'
                        style={{
                            height: hp("2%"),
                            marginTop: hp("1.5%")
                        }} />
                }}
            />
            <Tab.Screen
                name="Medications"
                component={Medications}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => <Text style={Styles.label}>Medications<StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} /></Text>,
                    tabBarIcon: () => <Image source={require('../images/set.png')}
                        resizeMode='contain'
                        style={{
                            height: hp("1.5%"),
                            marginTop: hp("1.5%")
                        }} />
                }}
            />
            <Tab.Screen
                name='Settings'
                component={Settings}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => <Text style={Styles.label}><StatusBar backgroundColor={Colors.blue} />Settings</Text>,
                    tabBarIcon: () => <Image source={require('../images/settings.png')}
                        resizeMode='contain'
                        style={{
                            height: hp("2%"),
                            marginTop: hp("1.5%")
                        }} />
                }} />
            <Tab.Screen
                name='Show_Profile'
                component={Show_Profile}
                key="Tab_Profile"

                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => <Text style={Styles.label}>Profile<StatusBar backgroundColor={Colors.blue} /></Text>,
                    tabBarIcon: () => <Image source={require('../images/person.png')}
                        resizeMode='contain'
                        style={{
                            height: hp("2%"),
                            marginTop: hp("1.5%")
                        }} />,
                    headerShown: false
                }}
            />
            {/* <Tab.Screen name='Edit_Profile' component={Profile_Edit} options={{headerShown: false, tabBarButton: () => null}}/> */}
        </Tab.Navigator>
    )
}

const Styles = StyleSheet.create({
    label: {
        color: Colors.white,
        marginBottom: hp("1.5%"),
        fontSize: 10
    }
})

export default TabNav;