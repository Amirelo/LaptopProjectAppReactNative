import React from 'react';
import SignInScreen from './screens/SignInScreen';
import VerificationScreen from './screens/VerificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        options={{headerShown: false}}
        component={SplashScreen}
      />
      <Stack.Screen
        name="Sign In"
        options={{headerShown: false}}
        component={SignInScreen}
      />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
