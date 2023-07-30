import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomView from '../atoms/CustomView';
import CustomText from '../atoms/CustomText';
import { priceFormat } from '../../utils/helper';
import CustomButton from './CustomButton';

const OrderItem = ({marginTop, item}) => {
  const navigation = useNavigation();

  const getOrderStatus = () => {
    if (item.status == 4) {
      return 'Delivered';
    }
    if (item.status == 3) {
      return 'On the way';
    }
    if (item.status == 2) {
      return 'Packing';
    }
    if (item.status == 1) {
      return 'Processing';
    }
    if (item.status == 0) {
      return 'Cancel';
    }
  };
  const status = getOrderStatus();

  const onDetailButtonPressed = () => {
    navigation.navigate('Order Details', {item: item});
  };

  return (
    <CustomView type={'tab'}>
      <CustomView type={'row'}>
        <CustomText value={'Order No'} />
        <CustomText>{item.userOrderID}</CustomText>
        <CustomText>{item.arrivedDate}</CustomText>
      </CustomView>

      <CustomView type={'row'}>
        <CustomText value={'Quantity'} />
        <CustomText value={2} />
      </CustomView>

      <CustomView type={'row'}>
        <CustomText>'Total'</CustomText>
        <CustomText>{priceFormat(item.totalPrice)}</CustomText>
      </CustomView>

      <CustomView>
        <CustomButton
          type={'tertiary'}
          onPress={onDetailButtonPressed}
          customStyles={styles.itemMargin}>
          Details
        </CustomButton>
        <CustomText
          textColor={
            item.status == 3
              ? 'success'
              : status == 2
              ? 'review'
              : status == 1
              ? 'processing'
              : 'cancel'
          }>
          {status}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 6,
  },
  rowContainerCustom: {
    flexDirection: 'row',
  },
  textStyle: {
    flex: 1,
  },

  textStyle2: {
    flex: 2,
  },
});
