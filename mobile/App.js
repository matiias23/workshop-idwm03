import React from "react";
import { PaperProvider, MD3LightTheme as Theme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from "./navigator/Navigator";

const theme  = {
  ...Theme,
  colors: {
    ...Theme.colors,
    primary: "#fcaf43",
    secondary: "#fcaf43"
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Navigator/>
        </SafeAreaProvider>
      </PaperProvider>
    </NavigationContainer>
   
  
  );
}

