import React, {useContext, useState, useEffect} from 'react';
import * as images from '../../../assets/images';
import {MainContext} from '../MainContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomText from '../../../components/atoms/CustomText';
import CustomButton from '../../../components/molecules/CustomButton';
import {priceFormat} from '../../../utils/helper';
import AddressItem from '../../../components/molecules/AddressItem';
import CustomButtonBare from '../../../components/atoms/CustomButtonBare';
import CustomImage from '../../../components/atoms/CustomImage';

const CheckOutScreen = ({navigation, route}) => {
  const {location, fullName, phoneNumber, totalPrice, note, cart, userID} =
    route.params;

  const [shippingPrice, setShippingPrice] = useState(200000);
  const [finalPrice, setFinalPrice] = useState(totalPrice + shippingPrice);

  const {onInsertUserOrder, onInsertOrderDetail, onDemoPaymentVNPay} =
    useContext(MainContext);

  const onSubmitOrderPressed = async () => {
    const insertOrderResult = await onInsertUserOrder(
      finalPrice,
      finalPrice,
      note,
      fullName,
      shippingPrice,
      location.addressID,
      userID,
      1,
      1,
    );
    console.log('Insert order result:', insertOrderResult);
    if (insertOrderResult.response_code == 1) {
      for (let index = 0; index < cart.length; index++) {
        const insertOrderDetailResult = await onInsertOrderDetail(
          cart[index].itemQuantity,
          insertOrderResult.data.userOrderID,
          cart[index].productID,
          cart[index].cartID,
        );
        console.log('Insert order detail result:', insertOrderDetailResult);
      }
    }
    navigation.navigate('Cart');
  };

  useEffect(() => {
    console.log('cart', cart);
  }, []);

  return (
    <CustomView>
      <CustomView type="rowJustify90">
        <CustomText>Shipping address</CustomText>
        <CustomButton type={'tertiary'}>Change</CustomButton>
      </CustomView>
      <AddressItem
        onlyInfo={true}
        data={{
          address:
            location.addressName +
            ', P.' +
            location.ward +
            ', Q.' +
            location.district +
            ', ' +
            location.city,
          fullname: fullName,
          phonenumber: phoneNumber,
        }}
        phonenumber={phoneNumber}
        fullname={fullName}
      />
      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomText>Products price</CustomText>
        <CustomText>{priceFormat(totalPrice)}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomText>Shipping price</CustomText>
        <CustomText>{priceFormat(shippingPrice)}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomText>Summary</CustomText>
        <CustomText>{priceFormat(finalPrice)}</CustomText>
      </CustomView>

      <CustomText>Payment</CustomText>

      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomButtonBare onPress={onSubmitOrderPressed}>
          <CustomImage source={images.cash} type={'header'} />
        </CustomButtonBare>
      </CustomView>
    </CustomView>
  );
};

export default CheckOutScreen;
