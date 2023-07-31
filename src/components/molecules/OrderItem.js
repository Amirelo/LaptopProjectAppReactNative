import {StyleSheet} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomView from '../atoms/CustomView';
import CustomText from '../atoms/CustomText';
import {priceFormat} from '../../utils/helper';
import CustomButton from './CustomButton';
import {AuthContext} from '../../screens/Auth/AuthContext';
import {borderTheme} from '../../themes/borderTheme';

const OrderItem = ({item}) => {
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
  const orderStatusArr = [
    {status: 'Delivered', color: 'success'},
    {status: 'On the way', color: 'warn'},
    {status: 'Packing', color: 'text'},
    {status: 'Processing', color: 'process'},
    {status: 'Cancel', color: 'err'},
  ];

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
    navigation.navigate('Order Details', {item: item});
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
        <CustomText hasFlex={true}>Order No</CustomText>
        <CustomText hasFlex={true}>{item.userOrderID}</CustomText>
        <CustomText>{itemDate}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText hasFlex={true}>Quantity</CustomText>
        <CustomText hasFlex={true}>{totalItems}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText hasFlex={true}>'Total'</CustomText>
        <CustomText hasFlex={true}>{priceFormat(item.totalPrice)}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} backgroundColor={'none'}>
        <CustomButton
          type={'tertiary'}
          onPress={onDetailButtonPressed}
          customStyles={styles.itemMargin}>
          Details
        </CustomButton>
        <CustomText textColor={orderStatusArr[item.status].color}>
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
