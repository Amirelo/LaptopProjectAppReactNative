import React from 'react';
import AuthNavigation from '../Auth/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import CustomView from '../../components/atoms/CustomView';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
