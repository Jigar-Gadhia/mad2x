import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons.js';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../assets/fonts/fonts';

const Details = ({api, image}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View style={Styles.bg}>
        <TouchableOpacity
          style={Styles.detail_back}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={32} color={Colors.white} />
        </TouchableOpacity>
        <View style={Styles.profile_bg}>
          <View style={Styles.bg_image}>
            <ImageBackground
              source={{uri: api?.profilePic || image}}
              resizeMode="contain"
              style={{height: hp('15%')}}
              borderRadius={16}>
              <View style={Styles.profile_indicator} />
            </ImageBackground>
          </View>
          <Text style={Styles.doc_text_sp}>
            {api?.specialityName !== '' ? api?.specialityName : 'None'}
          </Text>
          <Text style={Styles.doc_text_title}>{api?.doctorName}</Text>
          <View style={Styles.doc_icon_view}>
            <TouchableOpacity style={Styles.doc_icon_button}>
              <Image
                style={[Styles.doc_icons, {width: wp('5%')}]}
                source={require('../images/message.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.doc_icon_button}>
              <Image
                style={[Styles.doc_icons, {width: wp('4%')}]}
                source={require('../images/call.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.doc_icon_button}>
              <Image
                style={[Styles.doc_icons, {width: wp('5%')}]}
                source={require('../images/video.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.doc_icon_button}>
              <Image
                style={[Styles.doc_icons, {width: wp('4%')}]}
                source={require('../images/location.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={Styles.hos_text}>{api?.hospital}</Text>
          <Rating
            style={Styles.ratingStyle}
            type="star"
            ratingCount={'5'}
            imageSize={20}
            readonly={true}
            startingValue={api?.rating}
          />
          <Text style={Styles.about}>About</Text>
          <Text style={[Styles.hos_text, {width: wp('70%'), fontSize: 13}]}>
            {api?.about}
          </Text>
          <View style={Styles.countStyle}>
            <View>
              <Text style={Styles.doc_exp}>Patients</Text>
              <Text style={Styles.doc_exp_data}>{api?.patients}</Text>
            </View>
            <View>
              <Text style={Styles.doc_exp}>Experiance</Text>
              <Text style={Styles.doc_exp_data}>{api?.experience}</Text>
            </View>
            <View>
              <Text style={Styles.doc_exp}>Reviews</Text>
              <Text style={Styles.doc_exp_data}>{api?.reviews}</Text>
            </View>
          </View>
          <View style={Styles.book_app_view}>
            <TouchableOpacity
              style={Styles.book_app_btn}
              onPress={() => navigation.navigate('Appointment')}>
              <Text style={Styles.book_app_text}>Book An Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  ratingStyle: {
    justifyContent: 'flex-end',
    marginRight: wp('48%'),
    marginTop: hp('1%'),
  },
  countStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(10),
  },
  bg: {
    backgroundColor: Colors.blue,
    width: wp('100%'),
    borderBottomLeftRadius: 105,
    borderBottomRightRadius: 105,
    // elevation: 20,
    shadowColor: Colors.grey,
  },
  detail_back: {
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
  },
  profile_bg: {
    width: wp('85%'),
    backgroundColor: Colors.white,
    borderRadius: 39,
    alignSelf: 'center',
    shadowColor: Colors.dark_grey,
    elevation: 5,
  },
  bg_image: {
    height: hp('15%'),
    width: wp('30%'),
    alignSelf: 'center',
    marginVertical: hp('3%'),
  },
  profile_indicator: {
    height: hp('2.5%'),
    width: wp('5.5%'),
    borderRadius: 15,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('25.5%'),
    marginTop: hp('-0.3%'),
    shadowColor: Colors.dark_grey,
    borderColor: Colors.white,
    borderWidth: 4,
  },
  doc_text_sp: {
    fontFamily: fonts.semibold,
    color: Colors.grey,
    fontSize: 16,
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  doc_text_title: {
    fontFamily: fonts.semibold,
    color: Colors.dark_grey,
    fontSize: 18,
    alignSelf: 'center',
    textTransform: 'capitalize',
    // marginBottom: hp("3%")
  },
  hos_text: {
    fontFamily: fonts.semibold,
    color: Colors.date,
    fontSize: 14,
    marginHorizontal: wp('7%'),
    marginTop: hp('2%'),
    marginBottom: hp('1.5%'),
  },
  doc_icon_view: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  doc_icons: {
    resizeMode: 'contain',
  },
  doc_icon_button: {
    height: hp('5%'),
    width: wp('5%'),
    marginHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doc_exp: {
    fontFamily: fonts.semibold,
    color: Colors.date,
    fontSize: 12,
    marginTop: hp('2%'),
  },
  doc_exp_data: {
    fontFamily: fonts.semibold,
    color: Colors.grey,
    fontSize: 14,
    marginTop: hp('1%'),
  },
  book_app_view: {
    marginTop: hp('3%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('5%'),
  },
  book_app_btn: {
    backgroundColor: Colors.blue,
    borderRadius: 24,
  },
  book_app_text: {
    color: Colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    marginHorizontal: wp('6%'),
    marginVertical: hp('1.3%'),
  },
  about: {
    fontFamily: fonts.semibold,
    color: Colors.date,
    fontSize: 14,
    marginHorizontal: wp('7%'),
    marginTop: hp('2%'),
  },
});

export default Details;
