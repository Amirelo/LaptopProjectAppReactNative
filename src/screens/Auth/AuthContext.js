import React, {useState, createContext, useEffect} from 'react';
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
  getUserNotification,
  updateNotificationStatus,
  insertNotification,
  insertAddress,
  updateAddressInfo,
} from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkLanguage} from '../../themes/languageTheme';
import {setThemeColors, useThemeColors} from '../../themes/colorTheme';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState(checkLanguage('en'));
  const [theme, setTheme] = useState(setThemeColors());

  const changeLanguage = async lang => {
    setLanguage(checkLanguage(lang));
    await AsyncStorage.setItem('language', lang);
  };

  const changeTheme = async themeType => {
    setTheme(setThemeColors(themeType));
    await AsyncStorage.setItem('theme', themeType);
  };

  const checkSaveUser = async () => {
    try {
      let email = await AsyncStorage.getItem('email');
      email != null ? setIsLoggedIn(true) : {};
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

  const onSocialSignIn = () => {
    setIsLoggedIn(true);
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
      const res = await insertAddress(
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
      const res = await updateAddressInfo(data, type, addressID, userID);
      console.log('On Update User Address success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Update User Address error', error);
      return null;
    }
  };

  const onGetUserNotification = async userID => {
    try {
      const res = await getUserNotification(userID);
      console.log('On Get User Notification success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User Notification error', error);
      return null;
    }
  };

  const onUpdateUserNotificationStatus = async (
    status,
    userID,
    notificationID,
  ) => {
    try {
      const res = await updateNotificationStatus(
        status,
        userID,
        notificationID,
      );
      console.log('On Update User Notification success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Update User Notification error', error);
      return null;
    }
  };

  const onInsertNotification = async (title, detail, userID) => {
    try {
      const res = await insertNotification(title, detail, userID);
      console.log('On Get User Notification success', res.data);
      return res.data;
    } catch (error) {
      console.log('On Get User Notification error', error);
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

  const getCurLanguage = async () => {
    const langKey = await AsyncStorage.getItem('language');
    console.log('key', langKey);
    setLanguage(checkLanguage(langKey));
  };

  const getCurTheme = async () => {
    const themeType = await AsyncStorage.getItem('theme');
    console.log('theme type', themeType);
    setTheme(setThemeColors(themeType));
    console.log('theme', theme);
  };

  useEffect(() => {
    getCurLanguage();
    getCurTheme();
  }, []);

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
        onGetUserNotification,
        onUpdateUserNotificationStatus,
        onInsertNotification,
        onGetUserByUsername,
        onGetUserOrder,
        onGetUserOrderDetail,
        onGetUserCoupon,
        onGetUserCards,
        onGoogleSignIn,
        onGetUserByEmail,
        onGetAddressesByEmail,
        onSocialSignIn,
        language,
        changeLanguage,
        theme,
        changeTheme,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
