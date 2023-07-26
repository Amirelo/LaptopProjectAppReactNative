import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../atoms/CustomImage';
import * as images from '../../assets/images';
import CustomButton from './CustomButton';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';

//const internetImg = {uri:'https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_1280.jpg'}
const CustomInput = ({
  placeholder,
  source,
  marginTop,
  onChangeText,
  keyboardType,
  value,
  customStyles,
}) => {
  const [showPassImg, setShowPassImg] = useState(images.ic_visibility);
  const [secure, setSecure] = useState(
    placeholder.toLowerCase().includes('password') ? true : false,
  );
  const onPressVisibility = () => {
    setSecure(!secure);
    showPassImg == images.ic_visibility
      ? setShowPassImg(images.ic_visibility_off)
      : setShowPassImg(images.ic_visibility);
  };

  return (
    <CustomView
      type={'inputrow'}
      backgroundColor={'backgroundInput'}
      marginTop={marginTop}>
      <CustomImage source={source} type={'inputIcon'} />
      <TextInput
        onChangeText={onChangeText}
        style={styles.inputStyle}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : 'default'}
        secureTextEntry={secure}
      />
      {placeholder.toLowerCase().includes('password') ? (
        <CustomButton
          source={showPassImg}
          type={'image'}
          marginTop={0}
          onPress={onPressVisibility}
        />
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: '100%',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    height: 48,
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderColor: '#EBF0FF',
  },
  endIcon: {
    marginEnd: 24,
  },
});
