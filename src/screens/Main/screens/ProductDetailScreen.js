import {FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Auth/AuthContext';
import {MainContext} from '../MainContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomText from '../../../components/atoms/CustomText';
import CustomButton from '../../../components/molecules/CustomButton';
import {priceFormat} from '../../../utils/helper';

const ProductDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {item, itemProcessor, itemMemory, itemScreen, itemStorage} =
    route.params;
  const {onGetUserByEmail} = useContext(AuthContext);
  const {
    onInsertCart,
    onGetProductImagesByProductID,
    onGetProductOS,
    onCheckUserFavorite,
    onGetUserFavorite,
  } = useContext(MainContext);

  const [prodImages, setProdImages] = useState([]);
  const [itemOS, setitemOS] = useState({});
  const [itemFavorite, setItemFavorite] = useState();
  const [user, setUser] = useState({});

  const getInitData = async () => {
    const prodImagesResult = await onGetProductImagesByProductID(
      item.productID,
    );
    setProdImages(prodImagesResult.data);

    const oss = await onGetProductOS(item.operatingSystemID);
    setitemOS(oss.data[0]);

    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    if (userInfo.response_code == 1) {
      setUser(userInfo.data);
    }
    const favoriteRes = await onGetUserFavorite(userInfo.data.userId);
    if (favoriteRes.response_code == 1) {
      const productID = item.productID;
      favoriteRes.data.map(item => {
        if (item.productID == productID) {
          setItemFavorite(item.isFavorite);
        }
      });
    }
  };

  const onAddToCartPressed = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    if (userInfo.response_code == 1) {
      const insertCartResult = await onInsertCart(
        1,
        userInfo.data.userId,
        item.productID,
      );
      if (insertCartResult.response_code == 1) {
        navigation.goBack();
      } else {
        console.log('Something wrong happen:', insertCartResult);
      }
    }
  };

  const onFavoritePressed = async () => {
    try {
      console.log('userId:', user.userId, 'productID:', item.productID);
      const favoriteResult = await onCheckUserFavorite(
        user.userId,
        item.productID,
      );
      console.log(favoriteResult);
      if (favoriteResult.response_code == 1) {
        setItemFavorite(!itemFavorite);
        console.log(itemFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <CustomView>
      <CustomView scrollable={true}>
        <FlatList
          height={'100%'}
          width={240}
          marginTop={8}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'space-between', gap: 16}}
          style={{alignSelf: 'center'}}
          snapToAlignment="start"
          decelerationRate={'fast'}
          data={prodImages}
          initialNumToRender={3}
          keyExtractor={item => item.productImageID}
          renderItem={({item}) => {
            return (
              <CustomImage
                type={'productDetail'}
                source={item.productImageLink}
                linkType={'uri'}
              />
            );
          }}
        />
        <CustomView type={'rowJustify90'}>
          <CustomText textStyle={'titleBold'}>{item.productName}</CustomText>
          {itemFavorite ? (
            <CustomButton
              onPress={onFavoritePressed}
              type={'image'}
              source={images.ic_favorite_selected}
            />
          ) : (
            <CustomButton
              onPress={onFavoritePressed}
              type={'image'}
              source={images.ic_favorite}
            />
          )}
        </CustomView>
        <CustomView type={'right'}>
          <CustomText textColor={'err'} textStyle={'subtitleBold'}>
            {priceFormat(item.currentPrice)}
          </CustomText>
          {item.productPrice != item.currentPrice ? (
            <CustomText>{priceFormat(item.productPrice)}</CustomText>
          ) : (
            <></>
          )}
        </CustomView>
        {/* General info */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          General Info
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Brand
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.productName.split(' ')[0]}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            P/N
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.modelCode}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Manufacturer
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.manufacturer}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Warranty
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.warranty + ' months'}
          </CustomText>
        </CustomView>

        {/* Dimensions and weight */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          Dimensions and weight
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Size
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.length + ' x ' + item.width + ' x ' + item.height + ' mm'}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Weight
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.weight}
          </CustomText>
        </CustomView>

        {/* Processor */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          Processor
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Name
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.name}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            CPU speed
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.CPU_Speed}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Cores
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.cores}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Logical processors
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.logicalProcessor}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Cache memory
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.cacheMemory}
          </CustomText>
        </CustomView>

        {/* Memory */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          Memory/RAM
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            RAM
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.currentRAM}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Type
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Speed
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.speed}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Available slots
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.availableSlots}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Max Memory
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.maxRam}
          </CustomText>
        </CustomView>

        {/* Screen */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          Screen
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Size
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemScreen.screenSize}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Resolution
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemScreen.resolution}
          </CustomText>
        </CustomView>

        {/* Storage */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          Storage
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Type
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemStorage.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Available slots
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemStorage.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Current storage
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemStorage.currentStorage}
          </CustomText>
        </CustomView>

        {/* Operating System */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          Operating System
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            OS
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemOS.OS}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Version
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemOS.version}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            Type
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemOS.type}
          </CustomText>
        </CustomView>

        <CustomButton
          onPress={onAddToCartPressed}
          type={'primary'}
          marginTop={32}>
          Add To Cart
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default ProductDetailScreen;
