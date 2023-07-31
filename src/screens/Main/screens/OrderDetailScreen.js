import {FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Auth/AuthContext';
import {MainContext} from '../MainContext';
import ProductVItem from '../../../components/molecules/ProductVItem';
import CustomText from '../../../components/atoms/CustomText';
import CustomView from '../../../components/atoms/CustomView';

const OrderDetailScreen = ({route}) => {
  const {item} = route.params;
  const [productList, setProductList] = useState([]);
  const {onGetUserOrderDetail} = useContext(AuthContext);
  const {onGetProductByID} = useContext(MainContext);

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
    <CustomView>
      <CustomView scrollable={true}>
        <CustomView>
          <CustomText>Order</CustomText>
          <CustomView type={'row'}>
            <CustomText>No.</CustomText>
            <CustomText>Soemtihng</CustomText>
          </CustomView>

          <CustomView>
            <CustomText>Date created</CustomText>
            <CustomText>12-12-2023</CustomText>
          </CustomView>

          <CustomView>
            <CustomText>Status</CustomText>
            <CustomText>Delivered</CustomText>
          </CustomView>
          <CustomText marginTop={20}>{'Product(s)'}</CustomText>

          <FlatList
            width={'100%'}
            style={{marginTop: 12}}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 8, marginBottom: 16}}
            data={productList}
            keyExtractor={item => item.productID}
            renderItem={({item}) => {
              return <ProductVItem item={item} />;
            }}
          />

          <CustomText marginTop={20}>Order Information</CustomText>
          <CustomView>
            <CustomText>Shipping Address</CustomText>
            <CustomText>23 NVXOK</CustomText>
          </CustomView>
          <CustomView>
            <CustomText>'Payment Method</CustomText>
            <CustomText>**** **** **** ****</CustomText>
          </CustomView>
          <CustomView>
            <CustomText>Discount</CustomText>
            <CustomText>None</CustomText>
          </CustomView>
          <CustomView>
            <CustomText>Discount Code</CustomText>
            <CustomText>None</CustomText>
          </CustomView>
          <CustomView>
            <CustomText>Total</CustomText>
            <CustomText>{item.totalPrice}</CustomText>
          </CustomView>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default OrderDetailScreen;
