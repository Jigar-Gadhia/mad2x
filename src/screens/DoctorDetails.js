import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Details from '../components/Details';
import {useSelector} from 'react-redux';
import {Colors} from '../assets/colors/colors';

const DoctorDetails = () => {
  const api = useSelector(state => state.result.currentResult);
  return (
    <>
      <StatusBar backgroundColor={Colors.blue} barStyle={'light-content'} />
      <Details api={api} image={api.profilePic} />
    </>
  );
};

export default DoctorDetails;
