
import React from 'react'
import Login from '../components/Login';
import Home from '../components/Home';
import Register from '../components/Register';
import Repositories from '../components/Repositories';
import EditProfile from '../components/EditProfile';
import UpdatePassword from '../components/UpdatePassword';
import Commits from '../components/Commits';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />  
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Repositories" component={Repositories} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{ headerShown: false }} />
            <Stack.Screen name="Commits" component={Commits} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
}