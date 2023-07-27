import {Pressable, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import CustomText from '../atoms/CustomText';

const bannerData = {
  day: 21,
  hour: 2,
  minute: 30,
};

const CustomBanner = ({source, data, marginTop}) => {
  const timeLengthCheck = time => {
    if (time.toString().length < 2) {
      return '0' + time;
    } else {
      return time;
    }
  };
  return (
    <Pressable
      style={[styles.container, marginTop ? {marginTop: marginTop} : {}]}>
      <Image style={styles.banner_image} source={source} />
      <CustomText
        customStyles={{marginStart: '5%'}}
        marginTop={32}
        textStyle={'titleBold'}
        textColor={'textConstrast'}>
        Super Flash Sale
      </CustomText>
      <View style={styles.timerContainer}>
        <CustomText hasBox={true}>{timeLengthCheck(bannerData.day)}</CustomText>
        <CustomText textColor={'textConstrast'}>:</CustomText>
        <CustomText hasBox={true}>
          {timeLengthCheck(bannerData.hour)}
        </CustomText>
        <CustomText textColor={'textConstrast'}>:</CustomText>
        <CustomText hasBox={true}>
          {timeLengthCheck(bannerData.minute)}
        </CustomText>
      </View>
    </Pressable>
  );
};

export default CustomBanner;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 206,
    borderRadius: 16,
  },
  banner_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginStart: 16,
  },
});
