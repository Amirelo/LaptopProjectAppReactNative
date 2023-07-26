/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import useThemeColors from './src/themes/colorTheme';
import {textTheme} from './src/themes/textTheme';
import CustomText from './src/components/atoms/CustomText';
import SignInScreen from './src/screens/Auth/screens/SignInScreen';
import {AuthContextProvider} from './src/screens/Auth/AuthContext';

function App() {
  const colors = useThemeColors();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <AuthContextProvider>
          <SignInScreen />
        </AuthContextProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  custsomText: {
    color: 'black',
  },
});

export default App;
