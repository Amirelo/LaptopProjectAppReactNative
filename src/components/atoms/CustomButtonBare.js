import {Animated, Pressable, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {deviceWidth} from '../../utils/helper';
import useThemeColors from '../../themes/colorTheme';
import CustomView from './CustomView';

const CustomButtonBare = ({
  children,
  disabled,
  onPress,
  alignSelf,
  marginTop,
  backgroundColor,
  borderStyle,
  type,
}) => {
  const colors = useThemeColors();
  backgroundColor =
    backgroundColor != null ? colors[`${backgroundColor}Color`] : '';
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      style={[
        alignSelf != null ? {alignSelf: alignSelf} : {},
        marginTop ? {marginTop: marginTop} : {},
        borderStyle,
        {backgroundColor: backgroundColor},
      ]}
      onPress={onPress}
      onPressIn={fadeIn}
      disabled={disabled}>
      <CustomView
        animated={true}
        marginTop={0}
        backgroundColor={'none'}
        type={type ? type : 'none'}
        customStyles={{
          opacity: fadeAnim,
        }}>
        {children}
      </CustomView>
    </Pressable>
  );
};

export default CustomButtonBare;
