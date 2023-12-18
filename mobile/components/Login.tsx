import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../context/AuthContext";

/**
 * Componente funcional para la pantalla de inicio de sesión.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de inicio de sesión.
 */
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [hidePwd, setHidePwd] = useState(true);
  const { signIn } = useContext(AuthContext);

  /**
   * Navega a la pantalla de inicio.
   * @returns {void}
   */
  const toHome = () => {
    navigation.navigate('Home');
  };

  /**
   * Maneja el cambio en el campo de correo electrónico.
   * @param {string} text - Nuevo valor del campo de correo electrónico.
   * @returns {void}
   */
  const handleEmail = (text) => {
    setEmail(text);
  };

  /**
   * Maneja el cambio en el campo de contraseña.
   * @param {string} text - Nuevo valor del campo de contraseña.
   * @returns {void}
   */
  const handlePwd = (text) => {
    setPwd(text);
  };

  /**
   * Alternar la visibilidad de la contraseña.
   * @returns {void}
   */
  const handleShowPwd = () => {
    setHidePwd(!hidePwd);
  };

  /**
   * Maneja el evento de inicio de sesión.
   * @returns {void}
   */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      await signIn({ email, password });

      // Puedes manejar el token de sesión o redirigir a la siguiente pantalla aquí
      navigation.navigate('Repositories');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Credenciales inválidas. Verifica tu correo electrónico y contraseña.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonBack} onPress={() => toHome()}>
        <Icon name="arrow-left" size={20} color="black" weight="light" />
      </TouchableOpacity>
      <Text variant="displayMedium"> Bienvenido!</Text>
      <TextInput
        label={"Correo Electronico"}
        placeholder={"tucorreo@ucn.cl"}
        placeholderTextColor={"#B2B2B2"}
        autoComplete={"email"}
        value={email}
        onChangeText={handleEmail}
        mode={"outlined"}
        style={styles.textInput}
      />
      <TextInput
        label={"Contraseña"}
        secureTextEntry={hidePwd}
        placeholder={"tucontraseña"}
        placeholderTextColor={"#B2B2B2"}
        autoComplete={"password"}
        value={password}
        onChangeText={handlePwd}
        mode={"outlined"}
        style={styles.textInput}
        right={
          <TextInput.Icon
            icon={hidePwd ? "eye" : "eye-off"}
            onPress={handleShowPwd}
          />
        }
      />
      <Button mode={"contained"} style={styles.button} onPress={handleLogin}>
        Ingresar
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonBack: {
    margin: 5
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 20,
  },
  textInput: {
    width: "100%"
  },
  button: {
    width: "100%",
    marginTop: 20
  }
});

export default Login;
