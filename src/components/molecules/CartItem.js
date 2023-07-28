import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../assets/images';
import {MainContext} from '../../screens/Main/MainContext';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import {deviceWidth, priceFormat} from '../../utils/helper';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';

const CartItem = ({marginTop, item, setTotalPrice, onActionOptionPressed}) => {
  const {onUpdateCartQuantity, onGetProductByID} = useContext(MainContext);
  const [curProduct, setCurProduct] = useState();

  const [quantity, setQuantity] = useState(item.itemQuantity);

  const getData = async () => {
    const result = await onGetProductByID(item.productID);
    console.log(result[0]);
    setCurProduct(result[0]);
  };

  const onAddQuantityPressed = async () => {
    if (quantity < curProduct.productQuantity) {
      const result = await onUpdateCartQuantity(item.cartID, 1);
      console.log(result);
      if (result.response_code == 1) {
        setQuantity(quantity + 1);
        setTotalPrice(price => price + item.productPrice);
      }
    } else {
      console.log('Not enough quantity');
    }
  };

  const onSubtractQuantityPressed = async () => {
    if (quantity > 1) {
      const result = await onUpdateCartQuantity(item.cartID, -1);
      console.log(result);
      if (result.response_code == 1) {
        setQuantity(quantity - 1);
        setTotalPrice(price => price - item.productPrice);
      }
    } else {
      console.log('Fail');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomView backgroundColor={'transparent'} type={'rowJustify'}>
        <CustomImage
          source={item.productImageLink}
          linkType={'uri'}
          type={'cartItem'}
        />
        <CustomView type={'left'} backgroundColor={'transparent'}>
          <CustomText textStyle={'normalBold'} maxLines={2}>
            {item.productName}
          </CustomText>
          <CustomText textStyle={'normalBold'} maxLines={2} textColor={'err'}>
            {priceFormat(item.productPrice * quantity)}
          </CustomText>
          <CustomView backgroundColor={'transparent'} type={'rowJustify'}>
            <CustomView backgroundColor={'transparent'} type={'rowJustify90'}>
              <CustomButton
                onPress={onSubtractQuantityPressed}
                source={images.ic_minus}
                type={'image'}
              />
              <CustomText>{quantity}</CustomText>
              <CustomButton
                onPress={onAddQuantityPressed}
                source={images.ic_add}
                type={'image'}
              />
            </CustomView>
          </CustomView>
        </CustomView>
        <CustomButton
          source={images.ic_more_vert}
          onPress={() => onActionOptionPressed(item)}
          type={'image'}
          marginTop={8}
        />
      </CustomView>
    </CustomView>
  );
};

export default CartItem;
