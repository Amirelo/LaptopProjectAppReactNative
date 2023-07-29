import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import * as images from '../../assets/images';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import CustomButtonBare from '../atoms/CustomButtonBare';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';

const AccountTab = ({title, subtitle, onPress, type, source}) => {
  return (
    <CustomButtonBare onPress={onPress}>
      <CustomView
        type={'accountTab'}
        backgroundColor={'backgroundInput'}
        borderStyle={borderTheme.textInput}>
        <CustomView backgroundColor={'none'} type={'rowJustify'}>
          {type == 'usertab' ? (
            <CustomImage source={source} linkType={'uri'} type={'logo'} />
          ) : (
            <></>
          )}
          {type == 'profile' ? (
            <>
              <CustomText marginTop={0}>{title}</CustomText>
              <CustomView marginTop={0} backgroundColor={'none'} type={'row'}>
                <CustomText marginTop={0}>{subtitle}</CustomText>
                <CustomImage
                  type={'searchBarIcon'}
                  source={images.ic_arrow_right}
                />
              </CustomView>
            </>
          ) : (
            <>
              <CustomView backgroundColor={'none'} type={'left'}>
                <CustomText marginTop={0}>{title}</CustomText>
                <CustomText marginTop={0}>{subtitle}</CustomText>
              </CustomView>
              <CustomImage
                type={'searchBarIcon'}
                source={images.ic_arrow_right}
              />
            </>
          )}
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default AccountTab;
