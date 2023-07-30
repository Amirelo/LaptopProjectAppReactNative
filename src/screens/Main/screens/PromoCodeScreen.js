import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import CustomView from '../../../components/atoms/CustomView';
import PromoItem from '../../../components/molecules/PromoItem';

const PromoCodeScreen = ({route}) => {
  const {userPromoCodes} = route.params;
  return (
    <CustomView>
      <FlatList
        width={'100%'}
        height={'100%'}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 8, marginBottom: 16, alignItems: 'center'}}
        data={userPromoCodes}
        keyExtractor={item => item.couponID}
        renderItem={({item}) => {
          return <PromoItem data={item} marginTop={103} />;
        }}
      />
    </CustomView>
  );
};

export default PromoCodeScreen;

