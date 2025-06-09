import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login.js';
import Signup from './src/screens/Signup.js';
import Home from './src/screens/Home.js';
import TabNav from './src/screens/TabNav.js';
import DrawNav from './src/screens/DrawNav.js';
import Appointment from './src/screens/Appointment.js';
import Success from './src/screens/Success.js';
import Settings from './src/screens/Settings.js';
import {connectToDevTools} from 'react-devtools-core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Splashscreen} from './src/components/SplashScreen.js';
import AnimationOverlay from './src/components/AnimationOverlay.js';
import {setLoaderRef} from './src/services/globalLoader.js';
import {Screens} from './src/services/Screens.js';

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  });
}

const App = () => {
  const [splash, setSplash] = useState(true);
  const [check, setCheck] = useState(false);
  const loaderRef = useRef();

  useEffect(() => {
    setLoaderRef(loaderRef.current);
  }, []);

  const check_status = async () => {
    const status = (await AsyncStorage.getItem('isLoggedIn')) ?? false;
    setCheck(status);
    console.log('status', status);
    if (status === 'true') {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  useEffect(() => {
    check_status();
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);

  const Stack = createNativeStackNavigator();

  return splash ? (
    <Splashscreen />
  ) : (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={check ? Screens.TabNav : Screens.Login}
          screenOptions={{headerShown: false, freezeOnBlur: true}}
          key="main">
          <Stack.Screen
            name={Screens.Login}
            component={Login}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={Screens.TabNav}
            component={TabNav}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={Screens.Home}
            component={Home}
            options={{animation: 'slide_from_bottom'}}
          />
          {/* <Stack.Screen
            name="DrawNav"
            component={DrawNav}
            options={{animation: 'slide_from_bottom'}}
          /> */}
          <Stack.Screen
            name={Screens.Appointment}
            component={Appointment}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={Screens.Success}
            component={Success}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name={Screens.Settings}
            component={Settings}
            options={{animation: 'slide_from_bottom'}}
          />
          {/* <Stack.Screen name="Animation" component={Animation}/> */}
        </Stack.Navigator>
      </NavigationContainer>
      <AnimationOverlay ref={loaderRef} />
    </>
  );
};

export default App;
