import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import NotificationScreen from './screens/NotificationScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreScreen from './screens/ExploreScreen';
import * as images from '../../assets/images';
import CustomImage from '../../components/atoms/CustomImage';
import useThemeColors from '../../themes/colorTheme';
import CustomHeader from '../../components/molecules/CustomHeader';
import ExploreFilterScreen from './screens/ExploreFilterScreen';
import CartScreen from './screens/CartScreen';
import CartRecipientScreen from './screens/CartRecipientScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import AccountScreen from './screens/AccountScreen';
import ProfileScreen from './screens/ProfileScreen';
import UpdateInfoScreen from './screens/UpdateInfoScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import InsertAddressScreen from './screens/InsertAddressScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import PromoCodeScreen from './screens/PromoCodeScreen';
import CardScreen from './screens/CardScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import InsertCardScreen from './screens/InsertCardScreen';
import ProductCommentScreen from './screens/ProductCommentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const colors = useThemeColors();
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#02A9F7',
          headerTitle: () => {
            return null;
          },
          headerRight: () => <CustomHeader type={'home'} />,
          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? colors.primaryColor : colors.textColor}
                type={'inputIcon'}
                source={images.ic_home}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarActiveTintColor: '#02A9F7',

          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? colors.primaryColor : colors.textColor}
                type={'inputIcon'}
                source={images.ic_explore}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarActiveTintColor: '#02A9F7',

          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? colors.primaryColor : colors.textColor}
                type={'inputIcon'}
                source={images.ic_cart}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarActiveTintColor: '#02A9F7',

          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? colors.primaryColor : colors.textColor}
                type={'inputIcon'}
                source={images.ic_person}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        options={{
          headerShown: false,
        }}
        component={TabNavigation}
      />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Filter" component={ExploreFilterScreen} />
      <Stack.Screen name="Recipient Info" component={CartRecipientScreen} />
      <Stack.Screen name="Checkout" component={CheckOutScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="New Address" component={InsertAddressScreen} />
      <Stack.Screen name="New Card" component={InsertCardScreen} />
      <Stack.Screen name="User Order" component={OrderScreen} />
      <Stack.Screen name="Order Details" component={OrderDetailScreen} />
      <Stack.Screen name="Promocodes" component={PromoCodeScreen} />
      <Stack.Screen name="Card" component={CardScreen} />
      <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
      <Stack.Screen name="Product Comments" component={ProductCommentScreen} />
      <Stack.Screen
        name="Update User Information"
        component={UpdateInfoScreen}
      />
      <Stack.Screen name="Shipping Address" component={ShippingAddressScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
