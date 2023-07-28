import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNav from './TabNav';
import Medications from "./Medications";
import Settings from "./Settings";

const Drawer = createDrawerNavigator();

const DrawNav = (navigation) => { 
    
    return (
        <Drawer.Navigator initialRouteName="TabNav" screenOptions={{headerShown: false}}>
            <Drawer.Screen name="TabNav" component={TabNav}/>
            <Drawer.Screen name="Medications" component={Medications} />
            <Drawer.Screen name="Settings" component={Settings}/>
            {/* <Drawer.Screen name="Profile" component={Profile} options={{headerShown: false}} /> */}
        </Drawer.Navigator>
    )
    
}

export default DrawNav;