import {Animated, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomImage from '../atoms/CustomImage';
import * as images from '../../assets/images';
import CustomButton from './CustomButton';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';
import useThemeColors from '../../themes/colorTheme';

//const internetImg = {uri:'https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_1280.jpg'}
const CustomInput = ({
  placeholder,
  source,
  marginTop,
  onChangeText,
  keyboardType,
  value,
  customStyles,
  disabled,
}) => {
  const colors = useThemeColors();
  const [showPassImg, setShowPassImg] = useState(images.ic_visibility);
  const [secure, setSecure] = useState(
    placeholder.toLowerCase().includes('password') ? true : false,
  );
  const [isSelected, setIsSelected] = useState(false);
  let borderColor = isSelected
    ? {borderColor: colors.primaryColor}
    : {borderColor: colors.borderColor};
  let borderStyle = borderTheme.textInput;
  const onPressVisibility = () => {
    setSecure(!secure);
    showPassImg == images.ic_visibility
      ? setShowPassImg(images.ic_visibility_off)
      : setShowPassImg(images.ic_visibility);
  };
  const borderCol = useRef(new Animated.Value(1)).current;
  const onFocus = () => {
    setIsSelected(true);
    borderColor = borderCol.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.textVariantColor, colors.primaryColor],
    });
  };

  const onBlur = () => {
    setIsSelected(false);
  };

  return (
    <CustomView
      type={'inputrow'}
      backgroundColor={'backgroundInput'}
      marginTop={marginTop}
      borderStyle={borderStyle}
      borderColor={borderColor}>
      <CustomImage source={source} type={'inputIcon'} />
      <TextInput
        onChangeText={onChangeText}
        style={styles.inputStyle}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={disabled}
        selectTextOnFocus={disabled}
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
});
