import {index, dashboard, profileFetch} from './constants';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendUrl, dashboardData, profile} from '../data/URLs';
import {hideLoader, showLoader} from '../services/globalLoader';

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
        console.log('res: ', response);
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
      showLoader();
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(backendUrl + profile, {
        headers: {
          Authorization: token,
        },
      });

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
    } finally {
      hideLoader();
    }
  };
};
