import React from 'react';
import * as images from '../../../assets/images';
import CustomView from '../../../components/atoms/CustomView';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomText from '../../../components/atoms/CustomText';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Sign In'}],
    });
  }, 2000);
  return (
    <CustomView backgroundColor={'primary'}>
      <CustomImage
        source={images.app_logo_splash}
        marginTop={'50%'}
        type={'header'}
      />
      <CustomText type={'titleBold'} textColor={'textConstrast'} marginTop={20}>
        Simplify your life
      </CustomText>
    </CustomView>
  );
};

export default SplashScreen;
