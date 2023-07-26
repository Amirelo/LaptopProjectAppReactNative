import {View, Text} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../../components/atoms/CustomText';
import CustomImage from '../../../components/atoms/CustomImage';
import * as images from '../../../assets/images';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomInput from '../../../components/molecules/CustomInput';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {onSignIn, checkSaveUser, onGoogleSignIn, checkEmail} =
    useContext(AuthContext);
  const getUserInfo = async () => {
    try {
      const respone = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${respone.authentication.accessToken}`,
        },
      });
      const user = await respone.json();
      let checkEmailResult = await checkEmail(user.email, 'SIGNUP');
      if (checkEmailResult.data.response_code === 0) {
        await AsyncStorage.setItem('email', user.email);
        onGoogleSignIn();
      } else {
        navigation.navigate('Sign Up', {email: user.email, userData: user});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onToForgotPasswordPress = () => {
    navigation.navigate('Verification', {paramKey: 'CHANGEPASSWORD'});
  };

  const onSignInPress = async () => {
    if (signInCheck() === true) {
      console.warn(signInCheck());
      const result = await onSignIn(username, password);
      if (result.response_code === 1 && result.data.accountStatus !== 0) {
        setError('');
        await AsyncStorage.setItem('email', result.data.email);
      } else {
        setError('Wrong username or password');
      }
    }
  };

  const signInCheck = () => {
    if (username.length === 0) {
      setError('Username cannot be empty');
      return false;
    }
    if (password.length === 0) {
      setError('Password cannot be empty');
      return false;
    }
    return true;
  };

  const onToSignUpPress = () => {
    navigation.navigate('Verification', {paramKey: 'SIGNUP'});
  };

  const onSocialButtonPress = () => {
    console.log('Social button');
  };
  useEffect(() => {
    checkSaveUser();
  });

  return (
    <CustomView>
      <CustomImage type={'header'} source={images.app_logo} />
      <CustomText textColor={'primary'} textStyle={'subtitleBold'}>
        Welcome to Laptop Store
      </CustomText>
      <CustomText textColor={'textVariant'} textStyle={'small'} marginTop={0}>
        Sign In to continue
      </CustomText>
      <CustomInput
        value={username}
        onChangeText={setUsername}
        placeholder={'username'}
        source={images.ic_person}
        marginTop={50}
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder={'password'}
        source={images.ic_person}
      />

      <CustomButton alignSelf={'flex-end'} type={'tertiary'}>
        Forgot password
      </CustomButton>
      <CustomButton type={'primary'}>Sign In</CustomButton>
      <CustomButton type={'social'} source={images.ic_apple}>
        Sign In
      </CustomButton>
      <CustomButton type={'tertiary'}>
        <CustomView type={'row'} marginTop={24}>
          <CustomText marginTop={0}>Don't have an account? </CustomText>
          <CustomText type={'highlight'} textColor={'primary'} marginTop={0}>
            Sign Up here
          </CustomText>
        </CustomView>
      </CustomButton>
    </CustomView>
  );
};

export default SignInScreen;
