import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import PropTypes from 'prop-types'; // Importa PropTypes

/**
 * Componente funcional para la pantalla de inicio.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {JSX.Element} - React element que representa el componente.
 */
const Home = ({ navigation }) => {

    /**
     * Navega a la pantalla de inicio de sesión.
     *
     * @memberof Home
     * @inner
     * @function
     * @returns {void}
     */
    const toLogin = () => {
        navigation.navigate('Login');
    };

    /**
     * Navega a la pantalla de registro.
     *
     * @memberof Home
     * @inner
     * @function
     * @returns {void}
     */
    const toRegister = () => {
        navigation.navigate('Register');
    };

    // Renderizar el componente
    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/MobileHub.png")} style={styles.image}/>
            <Button mode="contained" onPress={toLogin} style={styles.button}>
                Iniciar Sesión
            </Button>    
            <Button mode="outlined" onPress={toRegister} style={styles.button}>
                Registrarme
            </Button>
        </View>
    );
}

// Propiedades del componente
Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

// Estilos del componente
const styles = StyleSheet.create({
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
});

export default Home;
