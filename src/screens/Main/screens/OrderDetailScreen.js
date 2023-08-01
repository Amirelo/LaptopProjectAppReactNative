import {FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Auth/AuthContext';
import {MainContext} from '../MainContext';
import ProductVItem from '../../../components/molecules/ProductVItem';
import CustomText from '../../../components/atoms/CustomText';
import CustomView from '../../../components/atoms/CustomView';
import {orderStatusArr} from '../../../utils/array';
import {addressFormat, deviceWidth, priceFormat} from '../../../utils/helper';

const OrderDetailScreen = ({route}) => {
  const {item, address} = route.params;
  const [productList, setProductList] = useState([]);
  const {onGetUserOrderDetail} = useContext(AuthContext);
  const {onGetProductByID} = useContext(MainContext);
  console.log('Detail screen', address);

  const getData = async () => {
    const orderDetailResult = await onGetUserOrderDetail(item.userOrderID);
    try {
      setProductList([]);
      for (let index = 0; index < orderDetailResult.data.length; index++) {
        const productResult = await onGetProductByID(
          orderDetailResult.data[index].productID,
        );
        setProductList(oldArr => [...oldArr, productResult.data[0]]);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView scrollable={true}>
      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={32}>
        Order
      </CustomText>
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>No.</CustomText>
        <CustomText hasFlex={true}>{item.userOrderID}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>Order Date</CustomText>
        <CustomText hasFlex={true}>{item.pendingDate}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>Status</CustomText>
        <CustomText
          textColor={orderStatusArr[item.status].color}
          textStyle={'normalBold'}
          hasFlex={true}>
          {orderStatusArr[item.status].status}
        </CustomText>
      </CustomView>
      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={20}>
        {'Product(s)'}
      </CustomText>

      <FlatList
        width={deviceWidth * 0.9}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 8, marginVertical: 16}}
        data={productList}
        keyExtractor={item => item.productID}
        renderItem={({item}) => {
          return <ProductVItem data={item} />;
        }}
      />

      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={20}>
        Order Information
      </CustomText>
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>Shipping Address</CustomText>
        <CustomText hasFlex={true}>
          {addressFormat(
            address.addressName,
            address.ward,
            address.district,
            address.city,
          )}
        </CustomText>
      </CustomView>
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>Payment Method</CustomText>
        <CustomText hasFlex={true}>
          {item.cardID ? item.cardID : 'Cash'}
        </CustomText>
      </CustomView>
      {item.discount ? (
        <>
          <CustomView type={'rowJustify90'}>
            <CustomText hasFlex={true}>Discount</CustomText>
            <CustomText hasFlex={true}>
              {item.discountID ? item.counponID : 'none'}
            </CustomText>
          </CustomView>
          <CustomView type={'rowJustify90'}>
            <CustomText hasFlex={true}>Discount Code</CustomText>
            <CustomText hasFlex={true}>None</CustomText>
          </CustomView>
        </>
      ) : (
        <></>
      )}
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>Total</CustomText>
        <CustomText textStyle={'subtitleBold'} textColor={'err'} hasFlex={true}>
          {priceFormat(item.totalPrice)}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default OrderDetailScreen;
