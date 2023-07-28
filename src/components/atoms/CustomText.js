import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import React from 'react';
import useThemeColors from '../../themes/colorTheme';
import {textTheme} from '../../themes/textTheme';

const CustomText = ({
  children,
  textColor,
  textStyle,
  customStyles,
  marginTop,
  hasBox,
  maxLines,
}) => {
  const colors = useThemeColors();
  return (
    <Text
      numberOfLines={maxLines}
      style={[
        textColor != null
          ? {color: colors[`${textColor}Color`]}
          : {color: colors.textColor},
        textStyle != null ? textTheme[`text_${textStyle}`] : {},
        marginTop != null ? {marginTop: marginTop} : {marginTop: 8},
        hasBox ? styles.box : {},
        customStyles,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  box: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
