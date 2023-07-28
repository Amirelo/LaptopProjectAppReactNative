import {StyleSheet, Image} from 'react-native';
import React from 'react';

const CustomImage = ({
  source,
  type,
  marginTop,
  customStyles,
  linkType,
  tintColor,
}) => {
  return (
    <Image
      resizeMode="cover"
      source={linkType === 'uri' ? {uri: source} : source}
      style={[
        type != null ? styles[`${type}`] : {},
        marginTop != null ? {marginTop: marginTop} : {},
        tintColor ? {tintColor: tintColor} : {},
        customStyles ? customStyles : {},
      ]}
    />
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  header: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginTop: 103,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginStart: 16,
    marginEnd: 12,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
    position: 'absolute',
  },
  productItem: {
    width: 139,
    height: 112,
    marginTop: 16,
    marginHorizontal: 8,
    alignSelf: 'center',
    borderRadius: 4,
  },
  cartItem: {
    width: 120,
    height: 70,
    marginTop: 16,
    marginHorizontal: 8,
    alignSelf: 'center',
    borderRadius: 4,
  },
  searchBarIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  productDetail: {
    width: 240,
    height: 200,
    borderRadius: 10,
  },
  headerImage: {
    width: '50%',
    height: 30,
  },
});
