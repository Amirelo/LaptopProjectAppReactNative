import {Animated, Pressable} from 'react-native';
import React, {useRef} from 'react';
import useThemeColors from '../../themes/colorTheme';
import CustomView from './CustomView';
import {borderTheme} from '../../themes/borderTheme';

const CustomButtonBare = ({
  children,
  disabled,
  onPress,
  alignSelf,
  marginTop,
  backgroundColor,
  borderStyle,
  borderColor,
  type,
  paddingVertical,
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
        borderStyle != null ? borderStyle : {},
        borderColor != null
          ? {borderColor: colors[`${borderColor}Color`]}
          : {borderColor: colors.borderColor},
        {backgroundColor: backgroundColor},
        paddingVertical ? {paddingVertical: paddingVertical} : {},
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
