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
import CustomBanner from '../../components/molecules/CustomBanner';
import CustomHeader from '../../components/molecules/CustomHeader';
import ExploreFilterScreen from './screens/ExploreFilterScreen';

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
    </Stack.Navigator>
  );
};

export default MainNavigation;
