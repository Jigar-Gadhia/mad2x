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
  Animated,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '../assets/colors/colors.js';
import {fonts} from '../assets/fonts/fonts.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import {useAppState} from '@react-native-community/hooks';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dashboard, fetchProfile} from '../redux/actions.js';
import Details from '../components/Details.js';
import {responsiveHeight, responsiveWidth} from '../services/ResponsiveSize.js';
import LinearGradient from 'react-native-linear-gradient';
import {Screens} from '../services/Screens.js';
import {currentDetails} from '../redux/constants.js';

const Home = ({navigation}) => {
  const [animating, setAnimating] = useState(false);
  const key = useRef('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.data);
  const topFadeOpacity = useRef(new Animated.Value(1)).current;
  const bottomFadeOpacity = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  useEffect(() => {
    const id = scrollY.addListener(({value}) => {
      topFadeOpacity.setValue(value <= 1 ? 0 : 1);
      bottomFadeOpacity.setValue(value >= 200 ? 0 : 1); // adjust 200 based on content
    });

    return () => scrollY.removeListener(id);
  }, [bottomFadeOpacity, scrollY, topFadeOpacity]);

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
    },
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Dashboard());
    const keyShow = Keyboard.addListener('keyboardDidShow', () => {
      key.current.focus();
    });

    const keyHide = Keyboard.addListener('keyboardDidHide', () => {
      key.current.blur();
    });

    return () => {
      keyShow.remove();
      keyHide.remove();
    };
  }, [dispatch]);

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

  const [doclist, setdoclist] = useState('');

  const image =
    data?.profilePic ??
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const ToggleD = item => {
    dispatch({type: currentDetails, payload: item});
    navigation.navigate(Screens.DoctorDetails);
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
    <View>
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
    </View>
  );

  const renderDoc = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={[
            Styles.doc_banner,
            {
              elevation: animating ? 0 : 10,
              display: !doc && index > 2 ? 'none' : 'flex',
            },
          ]}
          onPress={() => {
            ToggleD(item);
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
              color={Colors.blue}
              style={{marginBottom: responsiveHeight(5)}}
            />
            <Icon name="ellipse" size={10} color={Colors.blue} />
          </View>
        </TouchableOpacity>
      </View>
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
    <View style={Styles.container}>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
        key={Math.random()}
      />
      <View style={Styles.header}>
        <Text style={Styles.header_text}>Doctor {'\n'}Appointment</Text>
        <Image
          style={Styles.header_image}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={[Styles.searchbar]}>
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
      </View>
      <View style={[Styles.flatlist_header, {display: !doc ? 'flex' : 'none'}]}>
        <Text style={Styles.flatlist_header_text}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveWidth(20),
            marginHorizontal: responsiveWidth(25),
          }}
          data={dataCat}
          renderItem={renderCat}
        />
      </View>
      <View style={Styles.doc_view}>
        <Text style={Styles.doc_header}>Top Doctors</Text>
        <TouchableOpacity
          onPress={() => {
            setdoc(!doc);
          }}>
          {api === '' ? (
            <ActivityIndicator size={'small'} color={Colors.date} />
          ) : (
            <Text style={Styles.doc_text}>
              {doc === false ? (doclist !== '' ? null : 'See All') : 'See less'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <AnimatedFlatList
        data={api}
        contentContainerStyle={{
          gap: 20,
          paddingBottom: responsiveHeight(15),
        }}
        onScroll={onScroll}
        overScrollMode="never"
        renderItem={renderDoc}
        initialNumToRender={3}
      />
      <Animated.View
        style={[Styles.fadeTop, {opacity: topFadeOpacity}]}
        pointerEvents="none">
        <LinearGradient
          colors={['white', 'transparent']}
          style={[
            Styles.fadeTop,
            {
              top: doc ? responsiveHeight(230) : responsiveHeight(390),
            },
          ]}
          pointerEvents="none"
        />
      </Animated.View>
      <Animated.View
        style={[Styles.fadeBottom, {opacity: bottomFadeOpacity}]}
        pointerEvents="none">
        {/* Bottom Fade */}
        <LinearGradient
          colors={['transparent', 'white']}
          style={[Styles.fadeBottom]}
          pointerEvents="none"
        />
      </Animated.View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: '93%',
  },
  header: {
    marginTop: hp('2%'),
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
    flexGrow: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(15),
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(25),
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
    height: 70,
    width: 70,
    elevation: 5,
  },
  doc_indicator: {
    backgroundColor: Colors.lite_green,
    height: hp('2%'),
    width: hp('2%'),
    alignSelf: 'flex-end',
    bottom: '10%',
    borderRadius: hp('2%'),
    borderWidth: 2,
    borderColor: Colors.search_bar,
  },
  doc_banner: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.blue,
    shadowColor: Colors.grey,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(25),
    padding: responsiveHeight(10),
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
    elevation: 5,
    marginBottom: responsiveHeight(10),
  },
  fadeTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    zIndex: 4,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 10,
  },
});

export default Home;
