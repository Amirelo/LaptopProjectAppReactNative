import React from 'react';
import SignInScreen from './screens/SignInScreen';
import VerificationScreen from './screens/VerificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Sign In">
      <Stack.Screen
        name="Sign In"
        options={{headerShown: false}}
        component={SignInScreen}
      />
      <Stack.Screen
        name="Verification"
        options={{headerShown: false}}
        component={VerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
