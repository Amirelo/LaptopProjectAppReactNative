import {Pressable, StyleSheet, Animated} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import useThemeColors from '../../themes/colorTheme';
import {borderTheme} from '../../themes/borderTheme';
import {deviceWidth, priceFormat} from '../../utils/helper';
import CustomView from '../atoms/CustomView';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import {MainContext} from '../../screens/Main/MainContext';
import {useNavigation} from '@react-navigation/native';
import {CustomButtonBare} from '../atoms';

const ProductVItem = ({onPress, data}) => {
  const navigation = useNavigation();
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

  const onProductPressed = () => {
    navigation.navigate('Product Detail', {
      item: data,
      itemProcessor: itemProcessor,
      itemMemory: itemMemory,
      itemScreen: itemScreen,
      itemStorage: itemStorage,
    });
  };

  const getInitData = async () => {
    const processor = await onGetProductProcessor(data.processorID);
    console.log(processor);
    setItemProcessor(processor.data[0]);

    const memory = await onGetProductMemory(data.memoryID);
    setItemMemory(memory.data[0]);

    const screen = await onGetProductScreen(data.screenID);
    setitemScreen(screen.data[0]);

    const storage = await onGetProductStorage(data.storageID);
    setitemStorage(storage.data[0]);
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <CustomButtonBare
      onPress={onProductPressed}
      backgroundColor={'backgroundInput'}
      borderStyle={'textInput'}
      type={'rowJustify90Screen'}>
      <CustomImage
        marginTop={0}
        source={data.productImageLink}
        type={'productItem'}
        linkType={'uri'}
      />
      <CustomView marginTop={0} backgroundColor={'none'} type={'left'}>
        <CustomText textStyle={'normalBold'} maxLines={2} marginTop={0}>
          {data.productName}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemProcessor.name}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemMemory.currentRAM +
            ' ' +
            itemMemory.type +
            ' ' +
            itemMemory.speed}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemStorage.type + ' ' + itemStorage.currentStorage}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemScreen.resolution + ' ' + itemScreen.screenSize}
        </CustomText>

        <CustomView backgroundColor={'none'} type={'rowJustify'}>
          <CustomText textColor={'err'} textStyle={'normalBold'} marginTop={0}>
            {priceFormat(data.currentPrice)}
          </CustomText>

          {data.currentPrice != data.productPrice ? (
            <CustomText
              textStyle={'smallStrike'}
              textColor={'textVariant'}
              marginTop={0}>
              {priceFormat(data.productPrice)}
            </CustomText>
          ) : (
            <></>
          )}
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default ProductVItem;
