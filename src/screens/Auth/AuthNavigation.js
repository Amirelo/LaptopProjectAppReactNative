import React from 'react';
import SignInScreen from './screens/SignInScreen';
import VerificationScreen from './screens/VerificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import useThemeColors from '../../themes/colorTheme';
import {AuthContext} from './AuthContext';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const colors = useThemeColors();
  const {language} = React.useContext(AuthContext);
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
          title: language.header_text_verification,
          headerStyle: customHeaderStyle,
        }}
        name="Verification"
        component={VerificationScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_changePassword,
          headerStyle: customHeaderStyle,
        }}
        name="Forgot Password"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_signUp,
          headerStyle: customHeaderStyle,
        }}
        name="Sign Up"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
