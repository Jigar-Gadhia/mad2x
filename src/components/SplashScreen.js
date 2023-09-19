import { Image } from 'react-native';
import { Styles } from '../styles/Styles';
import Animated, {FadeIn, FadeOut, FadeInUp, FadeInDown} from 'react-native-reanimated';

export const Splashscreen = () => {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={Styles.container}>
            <Animated.View entering={FadeInDown.delay(500).duration(500)} style={Styles.splash_view}>
                <Image source={require('../images/front1.png')} style={Styles.image_top} />
                <Image style={Styles.image_bg_top} source={require('../images/back1.png')} />
            </Animated.View>
            <Animated.View entering={FadeIn.delay(1000).duration(500)} style={Styles.logo_view}>
                <Image style={Styles.logo} source={require('../images/logo.png')} />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(500).duration(500)} style={Styles.bottom_view}>
                <Image source={require('../images/front1.png')} style={Styles.image_bottom} />
                <Image style={Styles.image_bg_bottom} source={require('../images/back1.png')} />
            </Animated.View>
        </Animated.View>
    )
}