import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as images from '../../assets/images';
import CustomView from '../atoms/CustomView';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import { promoDetail } from '../../utils/helper';

const PromoItem = ({data}) => {
  return (
    <CustomView>
      <CustomView>
        <CustomImage source={images.app_logo} />
        <CustomView>
          <CustomView type={'row'}>
            <CustomText>{data.name}</CustomText>
            <CustomText>6 days remaining</CustomText>
          </CustomView>
          <CustomText marginTop={8}>
            {promoDetail(data.effect, data.maxEffectValue)}
          </CustomText>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default PromoItem;
