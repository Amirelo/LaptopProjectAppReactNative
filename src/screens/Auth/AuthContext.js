import React, {useState, createContext} from 'react';
import {
  checkEmail,
  getUserByUsername,
  sendVerificationCode,
  signIn,
  signUp,
  updateUserInfo,
  getUserAddress,
  getUserOrders,
  getUserOrderDetail,
  getUserCoupon,
  getUserCards,
  getAddressesByEmail,
  getUserByEmail,
} from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSaveUser = async () => {
    try {
      let username = await AsyncStorage.getItem('email');
      username != null ? setIsLoggedIn(true) : {};
    } catch (error) {
      console.warn('On check save user error', error);
    }
  };

  const onGoogleSignIn = () => {
    setIsLoggedIn(true);
  };

  const onSignIn = async (username, password) => {
    try {
      const res = await signIn(username, password);
      console.warn(res.data);
      if (res.data.response_code === 1) {
        setIsLoggedIn(true);
        return res.data;
      } else {
        console.log(res.data.message);
        return res.data;
      }
    } catch (error) {
      console.log('On sign In error', error);
      return false;
    }
  };

  const onSignUp = async (
    username,
    password,
    email,
    phoneNumber,
    fullName,
    birthday,
  ) => {
    try {
      const res = await signUp(
        username,
        password,
        email,
        phoneNumber,
        fullName,
        birthday,
      );
      return res.data;
    } catch (error) {
      console.log('On Sign Up error', error);
      return null;
    }
  };

  const onSignOut = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const onSendVerificationCode = async email => {
    try {
      const res = await sendVerificationCode(email);
      console.log('On Send Verification Code success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Send Verification Code error', error);
      return null;
    }
  };

  const onCheckEmail = async (email, type) => {
    try {
      const res = await checkEmail(email, type);
      console.log('On Check Email success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Check Email error', error);
      return null;
    }
  };

  const onUpdateUserInfo = async (data, email, type) => {
    try {
      const res = await updateUserInfo(data, email, type);
      console.log('On Update User Info success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Update User Info error', error);
      return null;
    }
  };

  const onGetUserByUsername = async username => {
    try {
      const res = await getUserByUsername(username);
      console.log('On Get User info success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User info error', error);
      return null;
    }
  };

  const onGetUserByEmail = async email => {
    try {
      const res = await getUserByEmail(email);
      console.log('On Get User info success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User info error', error);
      return null;
    }
  };

  const onGetUserAddress = async username => {
    try {
      const res = await getUserAddress(username);
      console.log('On Get User Address success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User Address error', error);
      return null;
    }
  };

  const onGetAddressesByEmail = async email => {
    try {
      const res = await getAddressesByEmail(email);
      console.log('On Get User Address success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User Address error', error);
      return null;
    }
  };

  const insertUserAddress = async (
    addressName,
    ward,
    district,
    city,
    status,
    userID,
  ) => {
    try {
      const res = await insertUserAddress(
        addressName,
        ward,
        district,
        city,
        status,
        userID,
      );
      console.log('On Insert User Address success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Insert User Address error', error);
      return null;
    }
  };

  const updateUserAddress = async (data, type, addressID, userID) => {
    try {
      const res = await updateUserAddress(data, type, addressID, userID);
      console.log('On Update User Address success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Update User Address error', error);
      return null;
    }
  };

  const onGetUserOrder = async userID => {
    try {
      const res = await getUserOrders(userID);
      console.log('On Get User Order success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User Order error', error);
      return null;
    }
  };

  const onGetUserOrderDetail = async userOrderID => {
    try {
      const res = await getUserOrderDetail(userOrderID);
      console.log('On Get Order Detail success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get Order Detail error', error);
      return null;
    }
  };

  const onGetUserCoupon = async userID => {
    try {
      const res = await getUserCoupon(userID);
      console.log('On Get user coupon success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get user coupon error', error);
      return null;
    }
  };

  const onGetUserCards = async userID => {
    try {
      const res = await getUserCards(userID);
      console.log('On Get user coupon success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get user coupon error', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onSignIn,
        onSignUp,
        onSignOut,
        onSendVerificationCode,
        onUpdateUserInfo,
        onGetUserAddress,
        insertUserAddress,
        updateUserAddress,
        onCheckEmail,
        checkSaveUser,
        onGetUserByUsername,
        onGetUserOrder,
        onGetUserOrderDetail,
        onGetUserCoupon,
        onGetUserCards,
        onGoogleSignIn,
        onGetUserByEmail,
        onGetAddressesByEmail,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
