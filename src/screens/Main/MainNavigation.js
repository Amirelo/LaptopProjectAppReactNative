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
import InsertCommentScreen from './screens/InsertCommentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const colors = useThemeColors();
  const customHeaderStyle = {
    backgroundColor: colors.borderColor,
    elevation: 10,
    shadowColor: colors.primaryColor,
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: colors.borderColor, paddingBottom: 4},
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: colors.primaryColor,
          headerTitle: () => {
            return null;
          },
          headerStyle: customHeaderStyle,
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
          tabBarActiveTintColor: colors.primaryColor,
          headerStyle: customHeaderStyle,
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
          tabBarActiveTintColor: colors.primaryColor,
          headerStyle: customHeaderStyle,
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
          tabBarActiveTintColor: colors.primaryColor,
          headerStyle: customHeaderStyle,
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
  const colors = useThemeColors();
  const customHeaderStyle = {
    backgroundColor: colors.borderColor,
    elevation: 10,
    shadowColor: colors.primaryColor,
  };
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        options={{
          headerShown: false,
        }}
        component={TabNavigation}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Favorite"
        component={FavoriteScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Notification"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Filter"
        component={ExploreFilterScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Recipient Info"
        component={CartRecipientScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Checkout"
        component={CheckOutScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="New Address"
        component={InsertAddressScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="New Card"
        component={InsertCardScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="User Order"
        component={OrderScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Order Details"
        component={OrderDetailScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Promocodes"
        component={PromoCodeScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Card"
        component={CardScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Product Detail"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Product Comments"
        component={ProductCommentScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="New Comment"
        component={InsertCommentScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Update User Information"
        component={UpdateInfoScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Shipping Address"
        component={ShippingAddressScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
