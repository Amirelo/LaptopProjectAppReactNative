import {FlatList} from 'react-native';
import React from 'react';
import AddressItem from '../../../components/molecules/AddressItem';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import {useNavigation} from '@react-navigation/native';

const ShippingAddressScreen = ({route}) => {
  const navigation = useNavigation();
  const {userAddresses} = route.params;

  const onAddNewAddressPressed = () => {
    navigation.navigate('New Address');
  };

  return (
    <CustomView>
      <CustomButton onPress={onAddNewAddressPressed} type={'primary'}>
        Add New Address
      </CustomButton>
      <FlatList
        width={'100%'}
        height={'30%'}
        styles={{marginTop: 32}}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          marginVertical: 16,
          alignItems: 'center',
        }}
        data={userAddresses}
        keyExtractor={item => item.addressID}
        renderItem={({item}) => {
          return <AddressItem data={item} />;
        }}
      />
    </CustomView>
  );
};

export default ShippingAddressScreen;
