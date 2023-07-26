import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import * as images from '../../../assets/images';
import CustomButton from '../../../components/molecules/CustomButton';
import {AuthContext} from '../AuthContext';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomText from '../../../components/atoms/CustomText';
import {textTheme} from '../../../themes/textTheme';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomView from '../../../components/atoms/CustomView';

const VerificationScreen = ({navigation, route}) => {
  const [email, setEmail] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [receivedCode, setReceivedCode] = useState('aesd');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState();

  const {onSendVerificationCode, onCheckEmail} = useContext(AuthContext);
  const {paramKey} = route.params;

  const onSendPress = async () => {
    let checkEmailResult = await onCheckEmail(email, paramKey);

    if (checkEmailResult.response_code == 1) {
      let result2 = await onSendVerificationCode(email);
      setReceivedCode(result2.data);
      if (result2.response_code == 1) {
        () => myTimer();
        setTimeout(() => {
          setReceivedCode();
        }, 60000);
      } else {
        setError(result2.message);
      }
    } else {
      setError(checkEmailResult.message);
    }
  };

  const myTimer = () => {
    setTimer(60);
    let my = setInterval(() => {
      setTimer(prev => prev - 1);
      if (timer == 0) {
        clearInterval(my);
      }
    }, 2000);
  };

  const onVerifyPress = () => {
    if (verificationCode == receivedCode) {
      setVerificationCode();
      switch (paramKey) {
        case 'CHANGEPASSWORD':
          navigation.navigate('Forgot password', {
            email: email,
            type: 'PASSWORD',
          });
          break;
        case 'SIGNUP':
          navigation.navigate('Sign Up', {email: email});
          break;
        default:
          setError('Invalid navigation');
      }
    } else {
      setError('Invalid verification code');
    }
  };

  const onToSignInPress = () => {
    navigation.navigate('Sign In');
  };

  return (
    <>
      {receivedCode == null ? (
        <CustomView>
          <CustomInput
            source={images.ic_email}
            placeholder={'Email'}
            marginTop={103}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <CustomText
            textColor={'textVariant'}
            textStyle={textTheme.text_normal}
            marginTop={8}>
            We will send a verification code to your email
          </CustomText>
          {error != null ? (
            <CustomText textColor={'err'} textStyle={textTheme.text_normal}>
              {error}
            </CustomText>
          ) : (
            <></>
          )}
          <CustomButton
            type={'primary'}
            // onPress={onSendPress}
            marginTop={40}>
            Send
          </CustomButton>
          <CustomButton type={'tertiary'}>
            <CustomView type={'row'} marginTop={24}>
              <CustomText marginTop={0}>Already have an account? </CustomText>
              <CustomText
                type={'highlight'}
                textColor={'primary'}
                textStyle={textTheme.text_normalBold}
                marginTop={0}>
                Sign In here
              </CustomText>
            </CustomView>
          </CustomButton>
        </CustomView>
      ) : (
        <CustomView>
          <CustomInput
            source={images.ic_verification}
            placeholder={'Verification code'}
            keyboardType={'numeric'}
            marginTop={103}
            onChangeText={setVerificationCode}
          />
          <CustomImage source={images.ic_timer} type={'logo'} marginTop={32} />
          <CustomText textStyle={textTheme.text_subtitleBold} marginTop={12}>
            Please verify before the timer expire
          </CustomText>
          <CustomText
            value={timer}
            textStyle={textTheme.text_header}
            marginTop={12}
          />
          <CustomButton
            value={'Resend verification code'}
            type={'tertiary'}
            marginTop={52}
            alignSelf={'flex-end'}
            // onPress={onSendPress}
          />
          <CustomButton
            // onPress={onVerifyPress}
            type={'primary'}
            marginTop={16}>
            Verify
          </CustomButton>
        </CustomView>
      )}
    </>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({});
