import React from 'react';
import SignInScreen from './screens/SignInScreen';
import VerificationScreen from './screens/VerificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import useThemeColors from '../../themes/colorTheme';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const colors = useThemeColors();
  const customHeaderStyle = {
    backgroundColor: colors.borderColor,
    elevation: 10,
    shadowColor: colors.primaryColor,
  };
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
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Verification"
        component={VerificationScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Forgot Password"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: customHeaderStyle,
        }}
        name="Sign Up"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
