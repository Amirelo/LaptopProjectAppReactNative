import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Auth/AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomInput from '../../../components/molecules/CustomInput';

const UpdateInfoScreen = ({route, navigation}) => {
  const {email, type} = route.params;
  const [data, setData] = useState();
  const [confirmData, setConfirmData] = useState();

  let inputType = 'default';
  switch (type) {
    case 'PHONENUMBER':
      inputType = 'numeric';
  }

  const {onUpdateUserInfo} = useContext(AuthContext);

  const onChangeButtonPresses = async () => {
    if (type == 'PASSWORD') {
      if (dat > 6 || data == confirmData) {
        const res = await onUpdateUserInfo(data, email, type);
        if (res.response_code == 1) {
          console.warn('Success');
          await AsyncStorage.setItem(type.toLowerCase(), data);
          route.params.onGoBack(data, type);
          navigation.goBack(null);
        } else {
          console.warn('Fail');
          navigation.goBack(null);
        }
      } else {
        console.warn('Check your password info');
      }
    } else {
      const res = await onUpdateUserInfo(data, email, type);
      if (res.response_code == 1) {
        console.warn('Success');
        await AsyncStorage.setItem(type.toLowerCase(), data);
        route.params.onGoBack(data, type);
        navigation.goBack(null);
      } else {
        console.warn('Fail');
        navigation.goBack(null);
      }
    }
  };

  return (
    <CustomView>
      <CustomInput
        onChangeText={setData}
        placeholder={type.toLowerCase()}
        marginTop={103}
        keyboardType={inputType}
      />
      {type == 'PASSWORD' ? (
        <CustomInput
          onChangeText={confirmData}
          placeholder={'Reconfirm ' + type.toLowerCase()}
          marginTop={8}
          keyboardType={inputType}
        />
      ) : (
        <></>
      )}
      <CustomButton
        onPress={onChangeButtonPresses}
        type={'primary'}
        marginTop={60}>{`Change ${type.toLowerCase()}`}</CustomButton>
    </CustomView>
  );
};

export default UpdateInfoScreen;

const styles = StyleSheet.create({});
