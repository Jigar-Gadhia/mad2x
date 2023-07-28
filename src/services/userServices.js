import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CommonActions } from "@react-navigation/native";
import notifee from '@notifee/react-native';
import { useState } from "react";

export function user_login(user, pass, navigation) {

    axios.get("http://staging.webmynehost.com/hospital_demo/services/login.php", {
        params: {
            format: "json",
            uname: user,
            pwd: pass,
            gsm: 1213321,
            deviceid: 4568979
        }
    })
        .then(async function (response) {
            // notify();
            // console.log(response)
            if (response.data.code == "Login Incorrect") {
                alert(response.data.code)
            }
            else {
                const id = response.data.did
                const name = response.data.username
                await AsyncStorage.setItem('dataid', id)
                await AsyncStorage.setItem('dataname', name)
                console.log("response", response)
                navigation.navigation.navigate("TabNav")
                await AsyncStorage.setItem("pass_data", response.config.params.pwd)
                const status = "true";
                await AsyncStorage.setItem('true', status)
            }
        })
        .catch(async function (error) {
            console.log(error)
            await AsyncStorage.setItem('login_error', JSON.stringify(error))
        })
}

export function user_signup(user, email, pass, cpass, navigation) {
    axios.get('http://staging.webmynehost.com/hospital_demo/services/signup.php', {
        params: {
            username: user,
            emailid: email,
            password: pass,
            confirm_password: cpass
        }
    })
        .then(async function (response) {
            console.log(response);
            await AsyncStorage.setItem('signup_res', JSON.stringify(response))

            if (response.data.ResponseCode == 0) {
                alert(response.data.ResponseMsg)
            }
            else {
                const status = "true";
                await AsyncStorage.setItem('true', status)
                navigation.navigation.navigate("TabNav")
            }
        })
        .catch(async function (error) {
            console.log(error)
            await AsyncStorage.setItem('signup_error', JSON.stringify(error))
        })
}