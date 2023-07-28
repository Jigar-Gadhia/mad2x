import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
// import { Easing, log } from 'react-native-reanimated';

export function Animation(translateX, translateX_x) {
    translateX = useRef(new Animated.Value(0)).current;
    translateX_x = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: -30,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(translateX_x, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }, [])
}

