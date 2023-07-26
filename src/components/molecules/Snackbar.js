import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import {deviceWidth} from '../../utils/helper';
import useThemeColors from '../../themes/colorTheme';

const Snackbar = ({message}) => {
  const [active, setActive] = useState(false);
  const colors = useThemeColors();

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 3000);
  }, [message]);
  return active ? (
    <View style={[styles.container, {backgroundColor: colors.primaryColor}]}>
      <CustomText textColor={'background'} marginTop={0}>
        {message}
      </CustomText>
      <CustomButton type={'tertiary'} marginTop={0}>
        Dismiss
      </CustomButton>
    </View>
  ) : (
    <></>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0,
    width: deviceWidth * 0.9,
    padding: 10,
    borderRadius: 10,
  },
});
