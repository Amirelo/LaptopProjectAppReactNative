import {Pressable, StyleSheet, Animated} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import useThemeColors from '../../themes/colorTheme';
import {borderTheme} from '../../themes/borderTheme';
import {deviceWidth, priceFormat} from '../../utils/helper';
import CustomView from '../atoms/CustomView';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import {MainContext} from '../../screens/Main/MainContext';

const ProductVItem = ({onPress, data}) => {
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
    console.log(processor);
    setItemProcessor(processor.data[0]);

    const memory = await onGetProductMemory(data.memoryID);
    setItemMemory(memory.data[0]);

    const screen = await onGetProductScreen(data.screenID);
    setitemScreen(screen.data[0]);

    const storage = await onGetProductStorage(data.storageID);
    setitemStorage(storage.data[0]);
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
    <Animated.View
      style={{
        // Bind opacity to animated value
        opacity: fadeAnim,
      }}>
      <Pressable
        onPress={onPress}
        onPressIn={fadePress}
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundInputColor,
            borderColor: colors.borderColor,
          },
          borderTheme.textInput,
        ]}>
        <CustomImage
          marginTop={0}
          customStyle={styles.image}
          source={data.productImageLink}
          type={'productItem'}
          linkType={'uri'}
        />
        <CustomView backgroundColor={'transparent'} type={'left'}>
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

          <CustomView backgroundColor={'transparent'} type={'rowJustify'}>
            <CustomText
              textColor={'err'}
              textStyle={'normalBold'}
              marginTop={0}>
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
      </Pressable>
    </Animated.View>
  );
};

export default ProductVItem;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.9,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  textMargin: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  image: {
    alignSelf: 'flex-start',
    marginStart: 8,
  },
  infoContainer: {
    flex: 1,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
