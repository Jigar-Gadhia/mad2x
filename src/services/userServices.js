import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import notifee from '@notifee/react-native';
import {useState} from 'react';
import {backendUrl, signInUrl, signupUrl} from '../data/URLs';
import {hideLoader, showLoader} from './globalLoader';

export function user_login(user, pass, navigation) {
  showLoader();
  axios
    .post(backendUrl + signInUrl, {
      email: user,
      password: pass,
    })
    .then(async function (response) {
      console.log('res: ', response);
      // notify();
      // console.log(response)
      if (response.data.code == 'Login Incorrect') {
        alert(response.data.code);
      } else {
        const token = response?.data?.token;
        await AsyncStorage.setItem('token', token);
        const id = response?.data?.user?.id;
        const name = response?.data?.user?.name;
        await AsyncStorage.setItem('dataid', id);
        await AsyncStorage.setItem('dataname', name);
        navigation.navigation.navigate('TabNav');
        const status = 'true';
        await AsyncStorage.setItem('isLoggedIn', status);
      }
    })
    .catch(async function (error) {
      console.log('error', error);
      await AsyncStorage.setItem('login_error', JSON.stringify(error));
    })
    .finally(() => {
      hideLoader();
    });
}

export function user_signup(user, email, pass, navigation) {
  showLoader();
  axios
    .post(backendUrl + signupUrl, {
      name: user,
      email,
      password: pass,
      mobile: null,
      address: null,
    })
    .then(async function (response) {
      await AsyncStorage.setItem('signup_res', JSON.stringify(response));

      if (response.data.ResponseCode === 0) {
        alert(response.data.ResponseMsg);
      } else {
        const status = 'true';
        await AsyncStorage.setItem('true', status);
        navigation.navigation.navigate('TabNav');
      }
    })
    .catch(async function (error) {
      console.log(error);
      await AsyncStorage.setItem('signup_error', JSON.stringify(error));
    })
    .finally(() => {
      hideLoader();
    });
}
