import React from "react";
import { PaperProvider, MD3LightTheme as Theme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from "expo-router";

const theme  = {
  ...Theme,
  colors: {
    ...Theme.colors,
    primary: "#fcaf43",
    secondary: "#fcaf43"
  }
}

const HomeLayout = () => {
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <Slot/>
            </SafeAreaProvider>
        </PaperProvider>  
        );
    }


export default HomeLayout;