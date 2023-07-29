import React from 'react';
import * as images from '../../assets/images';
import CustomView from '../atoms/CustomView';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import {borderTheme} from '../../themes/borderTheme';

const AddressItem = ({data, onlyInfo}) => {
  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomText textStyle={'normalBold'}>{data.fullname}</CustomText>
      <CustomText>{data.address}</CustomText>
      <CustomText>{data.phonenumber}</CustomText>
      {onlyInfo ? (
        <></>
      ) : (
        <CustomView backgroundColor={'transparent'} type={'rowJustify90'}>
          <CustomView backgroundColor={'transparent'} type={'row'}>
            {data.status == 1 ? (
              <CustomButton
                type={'image'}
                source={images.ic_radio_square_selected}
              />
            ) : (
              <CustomButton type={'image'} source={images.ic_radio_square} />
            )}
            <CustomText>Use as default address</CustomText>
          </CustomView>
          <CustomButton type={'tertiary'}>Edit</CustomButton>
        </CustomView>
      )}
    </CustomView>
  );
};

export default AddressItem;

