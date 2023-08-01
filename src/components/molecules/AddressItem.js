import React from 'react';
import CustomView from '../atoms/CustomView';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import {borderTheme} from '../../themes/borderTheme';

const AddressItem = ({data, onEditPressed, onlyInfo}) => {
  console.log(data);

  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomText>
        {data.addressName +
          ', P.' +
          data.ward +
          ', Q.' +
          data.district +
          ', ' +
          data.city}
      </CustomText>

      {onlyInfo ? (
        <CustomView backgroundColor={'none'}>
          <CustomText textStyle={'normalBold'}>{data.fullname}</CustomText>

          <CustomText>{data.phonenumber}</CustomText>
        </CustomView>
      ) : (
        <CustomView backgroundColor={'transparent'} type={'rowJustify90'}>
          <CustomView backgroundColor={'transparent'} type={'row'}>
            {data.status == 1 ? (
              <CustomText textStyle={'normalBold'}>Default</CustomText>
            ) : (
              <></>
            )}
          </CustomView>
          <CustomButton onPress={onEditPressed} type={'primarySmall'}>
            Edit
          </CustomButton>
        </CustomView>
      )}
    </CustomView>
  );
};

export default AddressItem;
