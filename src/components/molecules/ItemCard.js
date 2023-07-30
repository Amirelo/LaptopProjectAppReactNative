import React from 'react';
import * as images from '../../assets/images';
import CustomText from '../atoms/CustomText';
import CustomView from '../atoms/CustomView';
import CustomButton from './CustomButton';

const CardItem = ({data}) => {
  return (
    <CustomView>
      <CustomText>{data.cardNumber}</CustomText>
      <CustomText>Card holder</CustomText>
      <CustomText>{data.cardHolder}</CustomText>
      <CustomText>Expiry date</CustomText>
      <CustomText>{data.expiryMonth + '/' + data.expiryYear}</CustomText>
      <CustomView type={'row'}>
        {data.status == 1 ? (
          <CustomButton source={images.ic_radio_square_selected} />
        ) : (
          <CustomButton source={images.ic_radio_square} />
        )}
        <CustomText>Use as default address</CustomText>
      </CustomView>
    </CustomView>
  );
};

export default CardItem;
