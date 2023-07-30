import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import CustomView from '../../../components/atoms/CustomView';
import ItemCard from '../../../components/molecules/ItemCard';

const CardScreen = ({route}) => {
  const {userCards} = route.params;
  return (
    <CustomView>
      <FlatList
        width={'100%'}
        height={'100%'}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 8, marginBottom: 16, alignItems: 'center'}}
        data={userCards}
        keyExtractor={item => item.cardID}
        renderItem={({item}) => {
          return <ItemCard data={item} marginTop={8} />;
        }}
      />
    </CustomView>
  );
};

export default CardScreen;

const styles = StyleSheet.create({});
