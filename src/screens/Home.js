import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../assets/colors/colors.js';
import {fonts} from '../assets/fonts/fonts.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useAppState} from '@react-native-community/hooks';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dashboard, fetchProfile} from '../redux/actions.js';
import Details from '../components/Details.js';

const Home = () => {
  const [animating, setAnimating] = useState(false);
  const key = useRef('');
  const dispatch = useDispatch();
  const scale = useSharedValue(1);
  const data = useSelector(state => state.data.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Dashboard());
    const keyShow = Keyboard.addListener('keyboardDidShow', () => {
      key.current.focus();
      scale.value = 1.09;
    });

    const keyHide = Keyboard.addListener('keyboardDidHide', () => {
      key.current.blur();
      scale.value = 1;
    });

    return () => {
      keyShow.remove();
      keyHide.remove();
    };
  }, [dispatch, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, {
            stiffness: 300,
            velocity: 1,
            restSpeedThreshold: 1,
          }),
        },
      ],
    };
  });

  const api = useSelector(state => state.result.result);

  const state = useAppState();

  const notify = () => {
    notifee.displayNotification({
      id: 'demo',
      title: 'App is running in the background',
      android: {
        channelId: 'demo',
        ongoing: true,
        tag: 'back',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
      },
    });
  };

  const cancel = () => {
    notifee.cancelDisplayedNotification('demo', 'back');
  };

  state === 'background' ? notify() : cancel();

  const [showD, setShowD] = useState(false);
  const [ind, setInd] = useState('');
  const [doclist, setdoclist] = useState('');

  const image =
    data?.profilePic ??
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const ToggleD = () => {
    setShowD(!showD);
  };

  const [doc, setdoc] = useState(false);

  const dataCat = [
    {
      path: require('../images/bill.png'),
      name: 'Patient bill',
      color: Colors.blue,
    },
    {
      path: require('../images/bed.png'),
      name: 'Occupacy',
      color: Colors.green,
    },
    {
      path: require('../images/cal.png'),
      name: 'Charge List',
      color: Colors.cyan,
    },
    {
      path: require('../images/contacts.png'),
      name: 'Contacts',
      color: Colors.lite_green,
    },
    {
      path: require('../images/deases.png'),
      name: 'Patients',
      color: Colors.blue,
    },
  ];

  const renderCat = ({item, index}) => (
    <Animated.View entering={FadeIn.delay(200 * index)}>
      <TouchableOpacity
        style={[
          Styles.doc_banner_view,
          {
            backgroundColor: item.color,
          },
        ]}>
        <Image
          source={item.path}
          style={{height: hp('4%'), resizeMode: 'contain'}}
        />
        <Text
          style={{
            marginTop: hp('1%'),
            fontFamily: fonts.regular,
            color: Colors.white,
            fontSize: 13,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderDoc = ({item, index}) => {
    return (
      <Animated.View entering={FadeInUp.delay(200 * index)}>
        <TouchableOpacity
          ref={showD}
          style={[
            Styles.doc_banner,
            {
              elevation: animating ? 0 : 10,
              display: !doc && index > 2 ? 'none' : 'flex',
            },
          ]}
          onPress={() => {
            setInd(index);
            ToggleD();
          }}>
          <ImageBackground
            style={Styles.doc_image}
            source={{uri: item?.profilePic || image}}
            borderRadius={10}
            resizeMode="cover">
            <View style={Styles.doc_indicator} />
          </ImageBackground>
          <View>
            <Text style={Styles.doc_banner_header}>
              {item.specialityName !== ''
                ? item.specialityName
                : 'Speciality not specified'}
            </Text>
            <Text style={Styles.doc_banner_text}>
              {item.DoctorName !== '' ? item.doctorName : 'Name not specifeid'}
            </Text>
          </View>
          <View>
            <Icon
              name="ellipse"
              size={10}
              color={Colors.options}
              style={{marginVertical: hp('1%')}}
            />
            <Icon
              name="ellipse"
              size={10}
              color={Colors.options}
              style={{marginBottom: hp('1%')}}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const searchRes = text => {
    const result = api.filter(item => {
      const doctorName = item.DoctorName.toLowerCase(); // Convert to lowercase for case-insensitive matching
      const searchText = text.toLowerCase(); // Convert search text to lowercase
      return doctorName.includes(searchText); // Check if doctorName includes the search text
    });
    setdoclist(result);
    console.log('search: ', result);
    if (text === '') {
      setdoclist('');
    }
  };

  return (
    <Animated.View entering={FadeInDown} style={Styles.container}>
      <StatusBar
        backgroundColor={showD ? Colors.blue : Colors.white}
        barStyle={showD ? 'light-content' : 'dark-content'}
        key={showD}
      />
      {showD && <Details ToggleD={ToggleD} api={api} image={image} ind={ind} />}
      <View style={Styles.header}>
        <Text style={Styles.header_text}>Doctor {'\n'}Appointment</Text>
        <Image
          style={Styles.header_image}
          source={{
            uri: image,
          }}
        />
      </View>
      <Animated.View style={[Styles.searchbar, animatedStyle]}>
        <View style={Styles.searchbar_view}>
          <TextInput
            placeholder="Search e.g. Dr Louis"
            ref={key}
            placeholderTextColor={Colors.search_place}
            style={Styles.search_input}
            onChangeText={text => searchRes(text)}
          />
          <TouchableOpacity style={Styles.search_button}>
            <Icon name="search" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {!doc && (
        <View style={Styles.flatlist_header}>
          <Text style={Styles.flatlist_header_text}>Categories</Text>
          <View style={{width: wp('100%'), height: hp('13%')}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dataCat}
              renderItem={renderCat}
            />
          </View>
        </View>
      )}
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
        }}>
        <View style={Styles.doc_view}>
          <Text style={Styles.doc_header}>Top Doctors</Text>
          <TouchableOpacity
            onPress={() => {
              setdoc(!doc);
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
                () => {
                  setAnimating(false);
                },
              );
              setAnimating(true);
            }}>
            {api === '' ? (
              <ActivityIndicator size={'small'} color={Colors.date} />
            ) : (
              <Text style={Styles.doc_text}>
                {doc === false
                  ? doclist !== ''
                    ? null
                    : 'See All'
                  : 'See less'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={Styles.doc_details}>
          {api === '' ? (
            <View>
              <ActivityIndicator
                color={Colors.date}
                size={'large'}
                style={{
                  marginTop: hp('15%'),
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: fonts.semibold,
                  fontSize: 18,
                  marginTop: hp('1%'),
                  marginLeft: wp('3%'),
                }}>
                Loading...
              </Text>
            </View>
          ) : api.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black'}}>No data found !</Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: Colors.white,
                flexGrow: 1,
              }}>
              <FlatList
                data={api}
                style={{flex: 1}}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={renderDoc}
                initialNumToRender={10}
              />
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: hp('2%'),
  },
  header: {
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
  },
  header_text: {
    fontFamily: fonts.heavy,
    fontSize: 20,
    color: Colors.dark_grey,
    width: wp('72%'),
  },
  header_image: {
    height: hp('6%'),
    width: wp('12%'),
    resizeMode: 'center',
    borderRadius: 8,
  },
  flatlist_header: {
    flex: 0,
    alignItems: 'center',
  },
  flatlist_header_text: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: Colors.dark_grey,
    width: wp('87.9%'),
    height: hp('5%'),
  },
  searchbar: {
    flex: 0,
    alignItems: 'center',
  },
  searchbar_view: {
    flexDirection: 'row',
    height: hp('6%'),
    borderRadius: 50,
    backgroundColor: Colors.search_bar,
    width: wp('88%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3.5%'),
    marginBottom: hp('2%'),
  },
  search_button: {
    height: hp('4.5%'),
    width: wp('9.6%'),
    backgroundColor: Colors.searchbar_button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  search_input: {
    width: wp('74.5%'),
    paddingHorizontal: wp(5),
    color: Colors.dark_grey,
    fontFamily: fonts.regular,
  },
  doc_view: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp('4%'),
    marginTop: hp('2%'),
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  doc_header: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: Colors.dark_grey,
  },
  doc_text: {
    fontFamily: fonts.regular,
    color: Colors.dark_grey,
    fontSize: 14,
  },
  doc_details: {
    width: wp('100%'),
    flexGrow: 1,
  },
  doc_image: {
    height: hp('7%'),
    width: wp('14%'),
  },
  doc_indicator: {
    backgroundColor: Colors.lite_green,
    height: hp('2%'),
    width: hp('2%'),
    marginHorizontal: wp('11%'),
    marginTop: hp('-0.5%'),
    borderRadius: hp('2%'),
    borderWidth: 2,
    borderColor: Colors.search_bar,
  },
  doc_banner: {
    height: hp('10%'),
    borderRadius: 15,
    shadowColor: Colors.grey,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: wp('5%'),
    marginBottom: wp('2%'),
    marginTop: hp('2%'),
  },
  doc_banner_header: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.dark_grey,
    width: wp('50%'),
    marginHorizontal: wp('5%'),
    textTransform: 'capitalize',
  },
  doc_banner_text: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: Colors.dark_grey,
    width: wp('50%'),
    marginHorizontal: wp('5%'),
    textTransform: 'capitalize',
  },
  doc_banner_view: {
    height: hp('12%'),
    width: wp('24%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginLeft: wp('7.3%'),
    marginRight: wp('-2%'),
    elevation: 5,
  },
});

export default Home;
