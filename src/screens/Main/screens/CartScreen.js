import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import customStyle from '../../../assets/stylesheets/customStyle'
import { CustomButton, CustomText, ProductHorizontal, ProductVertical } from '../../../components'
import * as images from '../../../assets/images'
import CartItems from '../../../components/CartItems'
import { MainContext } from '../MainContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { priceFormat } from '../../../utils/helper'
import ProductPressOption from '../../../components/ProductPressOption'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Cart = ({ navigation }) => {

  const { onGetCartByEmail, onDeleteCart } = useContext(MainContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [onItemOptionPressed, setOnItemOptionPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const onCheckOutPressed = () => {
    navigation.navigate("Recipient Info", { totalPrice: totalPrice, cart: data });
  }

  const onDeleteFromListPressed = async () => {
    const result = await onDeleteCart(selectedItem.cartID);
    console.log(result)
    setTotalPrice(prev => prev - (item.productPrice * item.itemQuantity))
    setData(data.filter(item => item.productID != selectedItem.productID));
    setOnItemOptionPressed(false)

  }

  const onActionOptionPressed = (item) => {
    setOnItemOptionPressed(true)
    setSelectedItem(item)
    console.log(item)
  }



  const getData = async () => {
    email = await AsyncStorage.getItem('email');
    const cartData = await onGetCartByEmail(email);
    console.log(cartData)
    setData(cartData.data);
    setTotalPrice(0);
    let myPrice = 0
    if (cartData.data != null) {
      cartData.data.map(item => {
        myPrice += (item.productPrice * item.itemQuantity);
      });
      setTotalPrice(myPrice);
    }
    else {
      setTotalPrice(0)
    }

  }

  const onOptionHidePressed = () => {
    setOnItemOptionPressed(false)
  }


  useEffect(() => {
    const load = navigation.addListener('focus', () => {
      getData();
    });

    return load;
  }, [navigation])




  return (
    <SafeAreaView style={customStyle.container}>
      {isLoading == false ?
        <>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{}}>

            <FlatList
              width={'100%'}
              height={'100%'}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, marginBottom: 16, alignItems: 'center' }}
              data={data}
              keyExtractor={item => item.productID}
              renderItem={({ item }) => {
                return <CartItems setTotalPrice={setTotalPrice} onActionOptionPressed={onActionOptionPressed}
                  item={item}
                />
              }}
            />
          </ScrollView>
          {onItemOptionPressed ?
        <View style={{width:'100%', position:'absolute'}}>
          <CustomButton onPress={onOptionHidePressed} customStyles={styles.unselectable} />
          <ProductPressOption onDelete={onDeleteFromListPressed} />
        </View>
        : <></>}
          <View style={styles.rowContainer}>
            <CustomText value={"Total"} />
            <CustomText textColor={"cancel"} fontWeight={'heavy'} value={priceFormat(totalPrice)} />
          </View>
          <CustomButton value={"Place order"} type={`primary`} marginTop={32} onPress={onCheckOutPressed} />
          <CustomText />
        </> :
        <></>
      }
      
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: '70%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  unselectable: {
    backgroundColor: '#00000020',
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: deviceHeight,
    alignItems: 'center',
    paddingTop: '40%'
  }
})