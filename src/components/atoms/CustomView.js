import {ScrollView, StyleSheet, View} from 'react-native';
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
  scrollable,
}) => {
  const colors = useThemeColors();
  let containerStyle = type ? styles[`container_${type}`] : styles.container;
  backgroundColor =
    backgroundColor != null
      ? colors[`${backgroundColor}Color`]
      : colors.backgroundColor;

  return scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container_scrollView}
      style={[
        {
          backgroundColor: backgroundColor,
        },

        borderStyle,
        borderColor,
        marginTop
          ? {marginTop: marginTop}
          : type == null
          ? {marginTop: 0}
          : {marginTop: 8},
      ]}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
        },
        containerStyle,
        borderStyle,
        borderColor,
        marginTop
          ? {marginTop: marginTop}
          : type == null
          ? {marginTop: 0}
          : {marginTop: 8},
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
  container_rowJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 0,
  },
  container_left: {
    alignSelf: 'flex-start',
    paddingStart: 8,
    flex: 1,
  },
  container_scrollView: {
    alignItems: 'center',
    width: deviceWidth,
    paddingBottom: 64,
  },
  container_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 8,
  },
});
