import {FlatList} from 'react-native';
import React,{useState} from 'react';
import AddressItem from '../../../components/molecules/AddressItem';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import {useNavigation} from '@react-navigation/native';

const ShippingAddressScreen = ({route}) => {
  const navigation = useNavigation();
  let {userAddresses, userInfo} = route.params;
  const [addresses, setAddresses] = useState(userAddresses);

  const onAddNewAddressPressed = () => {
    navigation.navigate('New Address', {
      userInfo: userInfo,
    });
  };

  return (
    <CustomView scrollable={true}>
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
        data={addresses}
        keyExtractor={item => item.addressID}
        renderItem={({item}) => {
          return <AddressItem data={item} />;
        }}
      />
    </CustomView>
  );
};

export default ShippingAddressScreen;
