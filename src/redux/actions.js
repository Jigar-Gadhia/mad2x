import {index, dashboard, profileFetch} from './constants';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendUrl, dashboardData, profile} from '../data/URLs';

export const Index = val => {
  return {
    type: index,
    payload: val,
  };
};

export const Dashboard = () => {
  return dispatch => {
    axios
      .get(backendUrl + dashboardData, {
        params: {
          pageNumber: 1,
          pageSize: 10,
        },
      })
      .then(response => {
        dispatch({
          type: dashboard,
          payload: response.data.data,
        });
      })
      .catch(error => {
        dispatch({
          type: dashboard,
          payload: error,
        });
      });
  };
};

export const fetchProfile = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token: ', token);
      const response = await axios.get(backendUrl + profile, {
        headers: {
          Authorization: token,
        },
      });
      console.log('response: ', response);

      dispatch({
        type: profileFetch,
        payload: response.data,
      });
    } catch (error) {
      console.log('error: ', error);
      dispatch({
        type: profileFetch,
        payload: error,
      });
    }
  };
};
