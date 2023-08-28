import { index, dashboard } from "./constants";
import axios from 'react-native-axios';

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
