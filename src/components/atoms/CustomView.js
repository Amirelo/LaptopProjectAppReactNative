import {StyleSheet, View} from 'react-native';
import React from 'react';
import useThemeColors from '../../themes/colorTheme';
import {deviceHeight, deviceWidth} from '../../utils/helper';

const CustomView = ({
  children,
  type,
  marginTop,
  backgroundColor,
  borderStyle,
  borderColor,
}) => {
  const colors = useThemeColors();
  let containerStyle = type ? styles[`container_${type}`] : styles.container;
  backgroundColor =
    backgroundColor != null
      ? colors[`${backgroundColor}Color`]
      : colors.backgroundColor;

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
        },
        containerStyle,
        borderStyle,
        borderColor,
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
    flex: 1,
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
  },
});
