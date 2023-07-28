import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import CustomView from '../../../components/atoms/CustomView';
import {MainContext} from '../MainContext';
import ProductHItem from '../../../components/molecules/ProductHItem';
import CustomText from '../../../components/atoms/CustomText';
import {deviceWidth} from '../../../utils/helper';
import CustomHeader from '../../../components/molecules/CustomHeader';
import CustomButton from '../../../components/molecules/CustomButton';
import ProductVItem from '../../../components/molecules/ProductVItem';
import * as images from '../../../assets/images';
import CustomBanner from '../../../components/molecules/CustomBanner';
import CustomButtonBare from '../../../components/atoms/CustomButtonBare';

const HomeScreen = ({navigation}) => {
  const [listProducts, setListProducts] = useState([]);
  const [listPopProducts, setListPopProducts] = useState([]);
  const [listBestBuy, setListBestBuy] = useState([]);
  const [maxItem, setMaxItem] = useState(6);
  const {onGetAllProduct} = useContext(MainContext);

  const initData = async () => {
    const prosRes = await onGetAllProduct();
    setListProducts(prosRes);

    let myList = [...prosRes];
    myList = myList
      .sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, maxItem);
    setListPopProducts(myList);
    console.log(myList);

    let bestBuy = [...prosRes];
    bestBuy = bestBuy
      .sort((a, b) => b.onSale.localeCompare(a.onSale))
      .slice(0, maxItem);
    setListBestBuy(bestBuy);
  };

  const onToFavoritePress = () => {
    navigation.navigate('Favorite');
  };

  const onToNotificationPress = () => {
    navigation.navigate('Notification');
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView>
      <CustomView scrollable={true}>
        <CustomButtonBare marginTop={24}>
          <CustomBanner source={images.banner} header={'Super Flash Sale'} />
        </CustomButtonBare>

        <CustomView type={'rowJustify'} marginTop={48}>
          <CustomText textStyle={'normalBold'}>Popular</CustomText>
          <CustomButton type={'tertiary'}>See more</CustomButton>
        </CustomView>
        <FlatList
          width={deviceWidth * 0.9}
          horizontal={true}
          marginTop={12}
          contentContainerStyle={{
            gap: 16,
            flexGrow: 0,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}
          data={listPopProducts}
          initialNumToRender={3}
          keyExtractor={item => item.productID}
          renderItem={({item}) => {
            return <ProductHItem data={item} />;
          }}
        />

        <CustomView type={'rowJustify'} marginTop={16}>
          <CustomText textStyle={'normalBold'}>Best buy</CustomText>
          <CustomButton type={'tertiary'}>See more</CustomButton>
        </CustomView>

        <FlatList
          width={deviceWidth * 0.9}
          horizontal={true}
          marginTop={12}
          contentContainerStyle={{
            gap: 16,
            flexGrow: 0,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}
          data={listBestBuy}
          initialNumToRender={3}
          keyExtractor={item => item.productID}
          renderItem={({item}) => {
            return <ProductHItem data={item} />;
          }}
        />

        <CustomView type={'rowJustify'} marginTop={16}>
          <CustomText textStyle={'normalBold'}>You might like</CustomText>
          <CustomButton type={'tertiary'}>See more</CustomButton>
        </CustomView>

        <FlatList
          width={deviceWidth * 0.9}
          marginTop={12}
          scrollEnabled={false}
          contentContainerStyle={{gap: 16, flexGrow: 0}}
          showsHorizontalScrollIndicator={false}
          data={listProducts.slice(0, maxItem)}
          initialNumToRender={3}
          keyExtractor={item => item.productID}
          renderItem={({item}) => {
            return <ProductVItem data={item} />;
          }}
        />
      </CustomView>
    </CustomView>
  );
};

export default HomeScreen;
