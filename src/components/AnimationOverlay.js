import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AnimationOverlay = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <LottieView
          source={require('../assets/animations/heartbeat.json')}
          autoPlay
          loop
          duration={6000}
          style={styles.lottie}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: wp('70%'),
    height: hp('70%'),
  },
});

export default AnimationOverlay;
