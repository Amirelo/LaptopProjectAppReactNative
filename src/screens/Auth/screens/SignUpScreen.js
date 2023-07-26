import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../../assets/images';
import {AuthContext} from '../AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/CustomButton';

const SignUpScreen = ({navigation, route}) => {
  const {email, userData} = route.params;

  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [error, setError] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const {onSignUp, onUpdateUserInfo} = useContext(AuthContext);

  const onConfirmPressed = async () => {
    checkInput();
    console.warn(error);
    if (!error) {
      console.warn('Sign up');
      let result = await onSignUp(
        username,
        password,
        email,
        phoneNumber,
        fullName,
        birthday,
      );
      console.warn(result);
      if (result.response_code == 1) {
        if (userData != null) {
          await onUpdateUserInfo(userData.picture, userData.email, 'source');
        }

        navigation.navigate('Sign In', {title: 'Sign Up success'});
      } else {
        navigation.navigate('Sign In', {title: 'Sign Up fail'});
      }
    }
  };

  const checkInput = () => {
    if (
      username == null ||
      password == null ||
      confirmPassword == null ||
      phoneNumber == null ||
      birthday == null ||
      gender == null ||
      password != confirmPassword
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <CustomView>
      <CustomInput
        source={images.ic_person}
        placeholder={'Username'}
        onChangeText={setUsername}
        marginTop={103}
      />
      <CustomInput
        source={images.ic_person}
        placeholder={'Fullname'}
        value={fullName}
        onChangeText={setFullName}
        marginTop={8}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={'Password'}
        marginTop={8}
        type={'password'}
        onChangeText={setPassword}
        isSecure={true}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={'Confirm Password'}
        marginTop={8}
        type={'password'}
        onChangeText={setConfirmPassword}
        isSecure={true}
      />
      <CustomInput
        source={images.ic_phone}
        placeholder={'Phone number'}
        keyboardType={'numeric'}
        onChangeText={setPhoneNumber}
        marginTop={8}
      />
      <CustomInput
        source={images.ic_calendar}
        placeholder={'Birthday'}
        onChangeText={setBirthday}
        marginTop={8}
      />

      <CustomButton type={'primary'} onPress={onConfirmPressed} marginTop={48}>
        Confirm
      </CustomButton>
    </CustomView>
  );
};

export default SignUpScreen;
