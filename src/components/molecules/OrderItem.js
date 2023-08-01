import {StyleSheet} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomView from '../atoms/CustomView';
import CustomText from '../atoms/CustomText';
import {priceFormat} from '../../utils/helper';
import CustomButton from './CustomButton';
import {AuthContext} from '../../screens/Auth/AuthContext';
import {borderTheme} from '../../themes/borderTheme';
import {orderStatusArr} from '../../utils/array';

const OrderItem = ({item, address}) => {
  const [totalItems, setTotalItems] = useState(0);
  const navigation = useNavigation();
  const {onGetUserOrderDetail} = useContext(AuthContext);
  const itemDate = item.arrivedDate
    ? item.arrivedDate
    : item.deliveryDate
    ? item.deliveryDate
    : item.prepareDate
    ? item.prepareDate
    : item.pendingDate;

  const orderAddress = addressID => {
    return address.filter(addressItem => {
      console.log('Address item', addressItem);
      return addressItem.addressID == addressID;
    })[0];
  };

  const initData = async () => {
    setTotalItems(0);
    const orderDetailResult = await onGetUserOrderDetail(item.userOrderID);
    orderDetailResult.data.map(curItem => {
      setTotalItems(prev => prev + curItem.productQuantity);
    });
  };

  const getOrderStatus = () => {
    return orderStatusArr[item.status].status;
  };
  const status = getOrderStatus();

  const onDetailButtonPressed = () => {
    navigation.navigate('Order Details', {
      item: item,
      address: orderAddress(item.addressID),
    });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView
      backgroundColor={'backgroundInput'}
      borderStyle={borderTheme.textInput}
      type={'tab'}>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'normalBold'} hasFlex={true}>
          Order No
        </CustomText>
        <CustomText hasFlex={true}>{item.userOrderID}</CustomText>
        <CustomText>{itemDate}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'normalBold'} hasFlex={true}>
          Quantity
        </CustomText>
        <CustomText hasFlex={true}>{totalItems}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'normalBold'} hasFlex={true}>
          Total
        </CustomText>
        <CustomText hasFlex={true}>{priceFormat(item.totalPrice)}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'normalBold'} hasFlex={true}>
          Status
        </CustomText>
        <CustomText
          hasFlex={true}
          textStyle={'normalBold'}
          textColor={orderStatusArr[item.status].color}>
          {status}
        </CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} backgroundColor={'none'}>
        <CustomButton
          type={'primarySmall'}
          onPress={onDetailButtonPressed}
          customStyles={styles.itemMargin}>
          Details
        </CustomButton>
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
