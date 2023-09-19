import { index, dashboard, profileFetch } from "./constants";
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Index = (val) => {
    return {
        type: index,
        payload: val
    }
}

export const Dashboard = () => {
    return (dispatch) => {
        axios.get("http://staging.webmynehost.com/hospital_demo/services/dashboard.php", {
            params: {
                format: "json",
                length: 10
            }
        }).then(response => {
            console.log("data: ", response.data.response[0])
            dispatch({
                type: dashboard,
                payload: response.data.response,
            });
        }).catch(error => {
            dispatch({
                type: dashboard,
                payload: error,
            });
        });
    };
}

export const fetchProfile = () => {
    return async (dispatch) => {
        try {
            const did = await AsyncStorage.getItem('dataid');
            const userid = JSON.parse(did);

            const response = await axios.get("http://staging.webmynehost.com/hospital_demo/services/getProfile.php", {
                params: {
                    profileId: userid
                }
            });

            dispatch({
                type: profileFetch,
                payload: response.data.ResponseData
            });
        } catch (error) {
            dispatch({
                type: profileFetch,
                payload: error
            });
        }
    };
};
