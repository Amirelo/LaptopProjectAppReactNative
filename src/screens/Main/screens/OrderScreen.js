import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import OrderItem from '../../../components/molecules/OrderItem';
import CustomView from '../../../components/atoms/CustomView';

const OrderScreen = ({route}) => {
  const {userInfo, userOrders} = route.params;
  console.log(userOrders);

  return (
    <CustomView>
      <FlatList
        width={'100%'}
        height={'100%'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 8, marginBottom: 16}}
        data={userOrders}
        keyExtractor={item => item.userOrderID}
        renderItem={({item}) => {
          return <OrderItem item={item} />;
        }}
      />
    </CustomView>
  );
};

export default OrderScreen;

