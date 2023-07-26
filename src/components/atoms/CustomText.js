import {Text} from 'react-native';
import React from 'react';
import useThemeColors from '../../themes/colorTheme';
import {textTheme} from '../../themes/textTheme';

const CustomText = ({
  children,
  textColor,
  textStyle,
  customStyles,
  marginTop,
  maxLines,
}) => {
  const colors = useThemeColors();
  return (
    <Text
      numberOfLines={maxLines}
      style={[
        textColor != null ? {color: colors[`${textColor}Color`]} : {},
        textStyle != null ? textTheme[`text_${textStyle}`] : {},
        marginTop != null ? {marginTop: marginTop} : {marginTop: 8},
        customStyles,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;
