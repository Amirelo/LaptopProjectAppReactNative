import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {MainContext} from '../MainContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomHeader from '../../../components/molecules/CustomHeader';
import ProductVItem from '../../../components/molecules/ProductVItem';
import ProductHItem from '../../../components/molecules/ProductHItem';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomText from '../../../components/atoms/CustomText';
import SortOption from '../../../components/molecules/SortOption';
import {deviceHeight} from '../../../utils/helper';

const ExploreScreen = ({navigation}) => {
  const {onGetAllProduct} = useContext(MainContext);

  const [listProducts, setListProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [showAmount, setShowAmount] = useState(6);

  const [itemViewVertical, setItemViewVertical] = useState(true);
  const [sortOption, setSortOption] = useState(0);
  const [sortPressed, setSortPressed] = useState(false);
  const [sortType, setSortType] = useState('None');

  const searchList = () => {
    setFilterProduct(
      listProducts.filter(item =>
        item.productName.toLowerCase().includes(searchText),
      ),
    );
  };

  const onViewListPressed = () => {
    setShowAmount(6);
    setItemViewVertical(!itemViewVertical);
  };

  const onSortPressed = () => {
    setSortPressed(true);
  };

  const onOptionHidePressed = () => {
    setSortPressed(false);
  };

  const onFiltersPressed = () => {
    navigation.navigate('Filter');
  };

  const sortListItem = async () => {
    /* 
  1 -- Popular
  2 -- new
  3 -- price low->high
  4 -- price high->low
  */
    const sortList = [...filterProduct];
    console.log('In sorting function ', sortOption);
    switch (sortOption) {
      case 0:
        break;
      case 1:
        setSortType('Popular');
        setFilterProduct(
          sortList.sort((a, b) => {
            return b.totalRating - a.totalRating;
          }),
        );
        break;
      case 2:
        setSortType('Newest');
        setFilterProduct(
          sortList.sort((a, b) => {
            return a.releasedDate.localeCompare(b.releasedDate);
          }),
        );
        break;
      case 3:
        setSortType('Price low to high');
        setFilterProduct(
          sortList.sort((a, b) => {
            return a.currentPrice - b.currentPrice;
          }),
        );
        break;
      case 4:
        setSortType('Price high to low');
        setFilterProduct(
          sortList.sort((a, b) => {
            return b.currentPrice - a.currentPrice;
          }),
        );
        break;
    }
    setFilterProduct(sortList);
  };
  const loadMore = () => {
    setShowAmount(prev => prev + 3);
  };

  const initData = async () => {
    const prodRes = await onGetAllProduct();
    setListProducts(prodRes);
    setFilterProduct(prodRes);
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    searchList();
  }, [searchText]);

  useEffect(() => {
    sortListItem();
  }, [sortOption]);

  useEffect(() => {
    setShowAmount(6);
  }, [navigation]);

  return (
    <CustomView>
      <CustomHeader
        onSearchText={setSearchText}
        onSortPressed={onSortPressed}
        onViewListPressed={onViewListPressed}
        onFilterPressed={onFiltersPressed}
        sortType={sortType}
      />
      <CustomView>
        {searchText ? (
          <CustomText
            type={'header'}
            customStyles={{alignSelf: 'flex-start', marginStart: '5%'}}
            marginTop={30}>
            {filterProduct.length + ' result(s)'}
          </CustomText>
        ) : (
          <></>
        )}
        {itemViewVertical == true ? (
          <FlatList
            width={'100%'}
            height={deviceHeight}
            customStyle={{flex: 1}}
            scrollEnabled={true}
            marginTop={24}
            showsVerticalScrollIndicator={false}
            extraData={sortOption}
            contentContainerStyle={{
              gap: 8,
              paddingVertical: 16,
              alignItems: 'center',
            }}
            data={filterProduct.slice(0, showAmount)}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.productID}
            renderItem={({item}) => {
              return <ProductVItem data={item} />;
            }}
          />
        ) : (
          <FlatList
            width={'100%'}
            marginTop={24}
            scrollEnabled={true}
            columnWrapperStyle={{gap: 16}}
            contentContainerStyle={{
              gap: 16,
              alignItems: 'center',
              paddingVertical: 16,
            }}
            data={filterProduct.slice(0, showAmount)}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.5}
            numColumns={2}
            key={'#'}
            initialNumToRender={3}
            keyExtractor={item => item.productID}
            renderItem={({item}) => {
              return <ProductHItem data={item} />;
            }}
          />
        )}
      </CustomView>
      {sortPressed ? (
        <SortOption
          setSortOption={setSortOption}
          setSortPressed={setSortPressed}
          onBackgroundPressed={onOptionHidePressed}
        />
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  unselectable: {
    backgroundColor: '#00000020',
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: deviceHeight,
    alignItems: 'center',
  },
});