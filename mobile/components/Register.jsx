import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState( "");
  const [fullname, setFullname] = useState( "");
  const [birthyear, setBirthyear] = useState( "");
  const [rut, setRut] = useState( "");
  const [error, setError] = useState(null);
  const { signUp } = useContext(AuthContext);

  const toHome = () => {
    navigation.navigate('Home')
}

const handleRegister = async () => {
  if (!email || !fullname || !birthyear || !rut) {
    Alert.alert('Error', 'Por favor, completa todos los campos.');
    return;
  }

  try {
  
    await signUp({ email, fullname, birthyear, rut });

    // Utilizas 'response' para obtener datos
    navigation.navigate('Home');
  } catch (error) {
    console.error('Error al registrar:', error.response ? error.response.data : error.message);

    if (error.response && error.response.data && error.response.data.errors) {
      const validationErrors = error.response.data.errors;
      let errorMessage = 'Error';

      // Construir un mensaje de error amigable basado en los errores de validación
      for (const key in validationErrors) {
        errorMessage += `${key}: ${validationErrors[key][0]}\n`;
      }

      setError(errorMessage);
      Alert.alert('Error de validación', errorMessage);
    } else {
      // Manejar otros tipos de errores
      setError('Error al procesar la solicitud.');
      Alert.alert('Error', 'Ocurrió un error al procesar la solicitud.');
    }
  }
};

  

  return (
    <SafeAreaView style={styles.container}> 
        <TouchableOpacity style={styles.buttonBack} onPress={() => toHome()}>
          <Icon name="arrow-left" size={20} color="black" weight="light" />
        </TouchableOpacity>
        <Text variant="displayMedium"> Registrate!</Text>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        <TextInput
          label={"Correo Electronico"} 
          placeholder={"tucorreo@ucn.cl"}
          placeholderTextColor={"#B2B2B2"}
          autoComplete={"email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode={"outlined"}
          style={styles.textInput} 
          />
          <TextInput
          label={"Nombre Completo"} 
          placeholder={"Matias Nuñez"}
          placeholderTextColor={"#B2B2B2"}
          autoComplete={"name"}
          value={fullname}
          onChangeText={(text) => setFullname(text)}
          mode={"outlined"}
          style={styles.textInput} 
          />
          <TextInput
          label={"Año de Nacimiento"} 
          placeholder={"1901"}
          placeholderTextColor={"#B2B2B2"}
          autoComplete={"birthyear"}
          value={birthyear}
          onChangeText={(text) => setBirthyear(text)}
          mode={"outlined"}
          style={styles.textInput} 
          />
          <TextInput
          label={"Rut"} 
          placeholder={"19.951.835-6"}
          placeholderTextColor={"#B2B2B2"}
          value={rut}
          onChangeText={(text) => setRut(text)}
          mode={"outlined"}
          style={styles.textInput} 
          />
          <Button mode={"contained"} style={styles.button} onPress={handleRegister} >
            Registrarme
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

export default Register;
