/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AuthContextProvider} from './src/screens/Auth/AuthContext';
import AppNavigation from './src/screens/Navigation/AppNavigation';

function App() {
  return (
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
}

export default App;
