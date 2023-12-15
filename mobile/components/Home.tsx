import { Link } from "expo-router";
import React from "react";
import { View,StyleSheet, Image } from "react-native";
import { Button, Text } from "react-native-paper";

const Home = ({ navigation }) => {

    const toLogin = () => {
        navigation.navigate('Login')
    }

    const toRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <View style={style.container}>
            <Image source={require("../assets/images/MobileHub.png")} style={style.image}/>
            <Button mode="contained" onPress={() => toLogin()} style={style.button}>
                Iniciar Sesión
            </Button>    
            <Button mode="outlined" onPress={() => toRegister()}style={style.button}>
                Registrarme
            </Button>
        </View>
    );

    
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        gap: 20,
    },
    button: {
        width:"100%"
    },
    image: {
        width: 200, 
        height: 200, 
    }
})

export default Home;
