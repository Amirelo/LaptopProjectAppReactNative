import {StyleSheet, View} from 'react-native';
import React from 'react';
import useThemeColors from '../../themes/colorTheme';
import {deviceWidth} from '../../utils/helper';
import {borderTheme} from '../../themes/borderTheme';

const CustomView = ({children, type, marginTop, backgroundColor}) => {
  const colors = useThemeColors();
  let containerStyle = type ? styles[`container_${type}`] : styles.container;
  let borderColor = backgroundColor != null ? colors.borderColor : '';
  let borderStyle = backgroundColor != null ? borderTheme.textInput : '';
  backgroundColor =
    backgroundColor != null
      ? colors[`${backgroundColor}Color`]
      : colors.backgroundColor;

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        containerStyle,
        borderStyle,
        marginTop ? {marginTop: marginTop} : {marginTop: 8},
      ]}>
      {children}
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  container_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_inputrow: {
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    height: 48,
    alignItems: 'center',
    flex: 1,
  },
});
