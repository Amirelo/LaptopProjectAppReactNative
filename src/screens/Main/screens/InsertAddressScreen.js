import React from 'react';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/CustomButton';

const InsertAddressScreen = () => {
  return (
    <CustomView>
      <CustomInput placeholder={'Address name'} />
      <CustomInput placeholder={'Ward'} />
      <CustomInput placeholder={'District'} />
      <CustomInput placeholder={'City'} />
      <CustomInput placeholder={'Status'} />
      <CustomButton type={'primary'}>Confirm</CustomButton>
    </CustomView>
  );
};

export default InsertAddressScreen;
