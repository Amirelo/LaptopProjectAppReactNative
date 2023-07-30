import {StyleSheet, View, FlatList} from 'react-native';
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
    setitemOS(oss.data);

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
          <CustomText>{item.productName}</CustomText>
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
          <CustomText>{priceFormat(item.currentPrice)}</CustomText>
          <CustomText>{priceFormat(item.productPrice)}</CustomText>
        </CustomView>
        {/* General info */}
        <CustomText alignSelf={'flex-start'} marginTop={20}>General Info</CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Brand</CustomText>
          <CustomText hasFlex={true}>
            {item.productName.split(' ')[0]}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>P/N</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {item.modelCode}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Manufacturer</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {item.manufacturer}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Warranty</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {item.warranty + ' months'}
          </CustomText>
        </CustomView>

        {/* Dimensions and weight */}
        <CustomText hasFlex={true} marginTop={20}>
          Dimensions and weight
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Size</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {item.length + ' x ' + item.width + ' x ' + item.height + ' mm'}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Weight</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {item.weight}
          </CustomText>
        </CustomView>

        {/* Processor */}
        <CustomText hasFlex={true} marginTop={20}>
          Processor
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Name</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.name}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>CPU speed</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.CPU_Speed}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Cores</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.cores}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Logical processors</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.logicalProcessor}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Cache memory</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.cacheMemory}
          </CustomText>
        </CustomView>

        {/* Memory */}
        <CustomText hasFlex={true} marginTop={20}>
          Memory/RAM
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>RAM</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemMemory.currentRAM}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Type</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemMemory.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Speed</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemMemory.speed}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Available slots</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemMemory.availableSlots}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Max Memory</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemMemory.maxRam}
          </CustomText>
        </CustomView>

        {/* Screen */}
        <CustomText hasFlex={true} marginTop={20}>
          Screen
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Size</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemScreen.screenSize}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Resolution</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemScreen.resolution}
          </CustomText>
        </CustomView>

        {/* Storage */}
        <CustomText hasFlex={true} marginTop={20}>
          Storage
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Type</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemStorage.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Available slots</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemStorage.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Current storage</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemStorage.currentStorage}
          </CustomText>
        </CustomView>

        {/* Operating System */}
        <CustomText hasFlex={true} marginTop={20}>
          Operating System
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>OS</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemOS.OS}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Version</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemOS.version}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText hasFlex={true}>Type</CustomText>
          <CustomText hasFlex={true} textColor={'textVariant'}>
            {itemOS.type}
          </CustomText>
        </CustomView>

        <CustomButton marginTop={32}>Add To Cart</CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  priceRight: {
    alignSelf: 'flex-end',
  },
});
