import {Animated, Pressable, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {deviceWidth} from '../../utils/helper';
import useThemeColors from '../../themes/colorTheme';

const CustomButtonBare = ({
  children,
  disabled,
  onPress,
  alignSelf,
  marginTop,
  backgroundColor,
  borderStyle,
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
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default CustomButtonBare;

const styles = StyleSheet.create({
  button_primary: {
    width: deviceWidth * 0.9,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button_tertiary: {
    marginHorizontal: '5%',
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
