import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import * as images from '../../assets/images/';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import CustomView from '../atoms/CustomView';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({
  type,
  onSearchText,
  onViewListPressed,
  onSortPressed,
  sortType,
}) => {
  const [viewListPressed, setViewListPressed] = useState(true);
  const navigation = useNavigation();
  const onFavoritePress = () => {
    navigation.navigate('Favorite');
  };

  const onNotificationPress = () => {
    navigation.navigate('Notification');
  };

  return (
    <>
      {type == 'home' ? (
        <CustomView type={'header'}>
          <CustomImage type={'headerImage'} source={images.header} />
          <CustomView type={'row'}>
            <CustomButton
              type={'image'}
              source={images.ic_favorite}
              onPress={onFavoritePress}
              marginTop={0}
            />
            <CustomButton
              type={'image'}
              source={images.ic_notification}
              onPress={onNotificationPress}
              marginTop={0}
            />
          </CustomView>
        </CustomView>
      ) : (
        <View>
          <CustomInput
            source={images.ic_search}
            type={'tertiary'}
            onChangeText={onSearchText}
            placeholder={'Search'}
            width={'90%'}
          />
          <View style={styles.sortContainer}>
            <Pressable style={styles.itemContainer}>
              <CustomImage source={images.ic_filter} type={'searchBarIcon'} />
              <CustomText value={'Filters'} type={'subtitle'} />
            </Pressable>
            <Pressable style={styles.itemContainer} onPress={onSortPressed}>
              <CustomImage source={images.ic_sort} type={'searchBarIcon'} />
              <CustomText value={sortType} type={'subtitle'} />
            </Pressable>
            <Pressable onPress={onViewListPressed}>
              {viewListPressed ? (
                <CustomImage
                  source={images.ic_view_list}
                  type={'searchBarIcon'}
                />
              ) : (
                <CustomImage
                  source={images.ic_view_module}
                  type={'searchBarIcon'}
                />
              )}
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 100,
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 8,
  },
});
