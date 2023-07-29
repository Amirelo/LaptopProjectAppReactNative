import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Auth/AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import AccountTab from '../../../components/molecules/AccountTab';

const AccountScreen = ({route, navigation}) => {
  const {
    onGetUserOrder,
    onSignOut,
    onGetUserCoupon,
    onGetUserCards,
    onGetUserByEmail,
    onGetAddressesByEmail,
  } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [userAddresses, setUserAddresses] = useState({});
  const [userOrders, setUserOrders] = useState({});
  const [userPromoCodes, setUserPromoCodes] = useState({});
  const [userCards, setUserCards] = useState({});

  const getUserInfo = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    setUserData(userInfo.data);

    const userAddress = await onGetAddressesByEmail(email);
    setUserAddresses(userAddress.data);
    const userOrder = await onGetUserOrder(userInfo.data.userId);
    setUserOrders(userOrder.data);

    const userCoupon = await onGetUserCoupon(userInfo.data.userId);
    setUserPromoCodes(userCoupon.data);

    const userCard = await onGetUserCards(userInfo.data.userId);
    setUserCards(userCard.data);
  };

  const onGoBackAccount = data => {
    setUserData(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onPressUserTab = () => {
    navigation.navigate('Profile', {userInfo: userData, onGoBackAccount});
  };

  const onShippingAddressPress = () => {
    navigation.navigate('Shipping Address', {
      userAddresses: userAddresses,
      userInfo: userData,
    });
  };

  const onMyOrderPressed = () => {
    navigation.navigate('Order', {userInfo: userData, userOrders: userOrders});
  };

  const onChangePasswordPressed = () => {
    navigation.navigate('Update User Information', {
      email: userData.email,
      type: 'PASSWORD',
    });
  };

  const onPromoCodesScreenPressed = () => {
    navigation.navigate('Promocodes', {
      userInfo: userData,
      userPromoCodes: userPromoCodes,
    });
  };

  const onCardScreenPressed = () => {
    navigation.navigate('User Cards', {userCards: userCards});
  };

  const onSignOutPressed = () => {
    onSignOut();
  };

  return (
    <CustomView>
      <CustomView scrollable={true}>
        <AccountTab
          title={userData.username}
          subtitle={userData.email}
          type={'usertab'}
          source={userData.imageLink}
          onPress={onPressUserTab}
        />
        <AccountTab
          title={'My order'}
          subtitle={'12 orders in progress'}
          onPress={onMyOrderPressed}
        />
        <AccountTab
          title={'Shipping address'}
          subtitle={'3 addresses'}
          onPress={onShippingAddressPress}
        />
        <AccountTab
          title={'Payment methods'}
          subtitle={'Union'}
          onPress={onCardScreenPressed}
        />
        <AccountTab
          title={'Promocodes'}
          subtitle={'3 promocodes available'}
          onPress={onPromoCodesScreenPressed}
        />
        <AccountTab
          title={'Change password'}
          subtitle={'Change your password'}
          onPress={onChangePasswordPressed}
          isHighlight={true}
        />
        <AccountTab
          title={'Logout'}
          subtitle={'Logout of your account'}
          onPress={onSignOutPressed}
          isHighlight={true}
        />
      </CustomView>
    </CustomView>
  );
};

export default AccountScreen;
