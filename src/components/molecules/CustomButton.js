import {Animated, Pressable, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useRef} from 'react';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import useThemeColors from '../../themes/colorTheme';
import {deviceWidth} from '../../utils/helper';

const CustomButton = ({
  children,
  type,
  marginTop,
  alignSelf,
  source,
  onPress,
  customStyles,
  disabled,
  noAnim,
}) => {
  const colors = useThemeColors();
  const buttonBackgroundColor =
    type == 'primary'
      ? colors.primaryColor
      : type == 'social'
      ? colors.backgroundInputColor
      : '';
  const borderColor = type == 'social' ? colors.borderColor : '';
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const textColor =
    type == 'tertiary' || type == 'social'
      ? 'text'
      : type == 'highlight'
      ? 'primary'
      : 'textConstrast';
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
      style={alignSelf != null ? {alignSelf: alignSelf} : {}}
      onPress={onPress}
      onPressIn={fadeIn}
      disabled={disabled}>
      <Animated.View
        style={[
          type != null ? styles[`button_${type}`] : {},
          marginTop != null ? {marginTop: marginTop} : {marginTop: 16},
          {
            backgroundColor: buttonBackgroundColor,
            borderColor: borderColor,
          },
          customStyles != null ? customStyles : {},
          noAnim ? {} : {opacity: fadeAnim},
        ]}>
        {type == 'social' ? (
          <CustomImage source={source} type={'socialIcon'} />
        ) : type == 'image' ? (
          <CustomImage source={source} type={'inputIcon'} />
        ) : (
          <></>
        )}
        {type != 'image' ? (
          disabled == true && type == 'primary' ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <CustomText
              marginTop={0}
              textColor={textColor}
              textStyle={
                type == 'tertiary'
                  ? 'normal'
                  : type == 'social'
                  ? 'center'
                  : 'normalBold'
              }>
              {children}
            </CustomText>
          )
        ) : (
          <></>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button_primary: {
    width: deviceWidth * 0.9,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button_social: {
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    height: 56,
    alignItems: 'center',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 10,
  },
  text_social: {
    flex: 1,
    textAlign: 'center',
  },
  text_primary: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
