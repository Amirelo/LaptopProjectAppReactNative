import {Animated, Pressable, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CustomText from '../atoms/CustomText';
import CustomImage from '../atoms/CustomImage';
import CustomView from '../atoms/CustomView';
import {
  deviceHeight,
  deviceWidth,
  discountFormat,
  priceFormat,
} from '../../utils/helper';
import {MainContext} from '../../screens/Main/MainContext';
import useThemeColors from '../../themes/colorTheme';
import {borderTheme} from '../../themes/borderTheme';

const ProductHItem = ({onPress, data}) => {
  const {
    onGetProductProcessor,
    onGetProductMemory,
    onGetProductScreen,
    onGetProductStorage,
  } = useContext(MainContext);
  const [itemProcessor, setItemProcessor] = useState({});
  const [itemMemory, setItemMemory] = useState({});
  const [itemScreen, setitemScreen] = useState({});
  const [itemStorage, setitemStorage] = useState({});
  const colors = useThemeColors();

  const getInitData = async () => {
    const processor = await onGetProductProcessor(data.processorID);
    setItemProcessor(processor);

    const memory = await onGetProductMemory(data.memoryID);
    setItemMemory(memory);

    const screen = await onGetProductScreen(data.screenID);
    setitemScreen(screen);

    const storage = await onGetProductStorage(data.storageID);
    setitemStorage(storage);
  };

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadePress = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundInputColor,
          borderColor: colors.borderColor,
        },
        borderTheme.textInput,
      ]}
      onPress={onPress}
      onPressIn={fadePress}>
      <Animated.View
        style={{
          // Bind opacity to animated value
          opacity: fadeAnim,
        }}>
        <CustomImage
          source={data.productImageLink}
          linkType={'uri'}
          type={'productItem'}
        />
        <CustomText maxLines={2} textStyle={'normalBold'}>
          {data.productName}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={4}>
          {itemProcessor.name}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={4}>
          {itemMemory.currentRAM +
            ' ' +
            itemMemory.type +
            ' ' +
            itemMemory.speed}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={4}>
          {itemScreen.resolution + ' ' + itemScreen.screenSize}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={4}>
          {itemStorage.type + ' ' + itemStorage.currentStorage}
        </CustomText>
        <CustomText textColor={'err'} textStyle={'normalBold'}>
          {priceFormat(data.currentPrice)}
        </CustomText>
        {data.currentPrice != data.productPrice ? (
          <CustomView
            backgroundColor={'transparent'}
            type={'rowJustify'}
            marginTop={4}>
            <CustomText
              textStyle={'smallStrike'}
              textColor={'textVariant'}
              marginTop={0}>
              {priceFormat(data.productPrice)}
            </CustomText>
            <CustomText textStyle={'small'} textColor={'err'} marginTop={0}>
              {discountFormat(data.onSale)}
            </CustomText>
          </CustomView>
        ) : (
          <></>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default ProductHItem;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.46,
    height: deviceHeight * 0.4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
