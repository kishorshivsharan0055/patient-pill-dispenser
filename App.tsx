import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NavigationRoutes from './src/components/NavigationRoutes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'purple',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <NavigationRoutes />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
