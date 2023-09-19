import axios from 'react-native-axios';
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ApiLogout = async (uname, pwd, navigation) => {
    var formdata = new FormData();
    formdata.append("email", uname);
    formdata.append("password", pwd);
    axios.post('http://staging.webmynehost.com/hospital_demo/services/logout.php', formdata, {
        headers: { 'content-type': 'multipart/form-data' }
    }).then(async function (response) {
        console.log(response)
        if (response.data.ResponseCode == 0) {
            alert(response.data.ResponseMsg);
        }
        else {
            navigation.navigation.dispatch(CommonActions.reset({
                routes: [{ name: 'Login' }]
            }))
            setUrl("")
            await AsyncStorage.clear();
        }
    }).catch(function (error) {
        console.log(error)
    })
}