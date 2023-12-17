import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = ({ navigation }) => {
    const { rut } = useContext(AuthContext);
  const { user, updateUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState("user.fullName");
  const [email, setEmail] = useState("user.email");
  const [birthYear, setBirthYear] = useState("user.birthYear");

  const toRepositories = () => {
    navigation.navigate('Repositories')
};
//console.log(rut);
const getUserByRut = async (rut) => {
  try {
    const response = await axios.get(`http://192.168.1.83:5023/Users/${rut}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Error al obtener el usuario por RUT:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error durante la solicitud para obtener el usuario por RUT:', error.message);
    return null;
  }
};

useEffect(() => {
  const fetchData = async () => {
    const userByRut = await getUserByRut(rut);

    if (userByRut) {
      setFullName(userByRut.fullname);
      setEmail(userByRut.email);
      setBirthYear(userByRut.birthYear.toString());
    }
  };

  fetchData();
}, [rut]);

const handleSaveChanges = async (setFullName, setEmail, setBirthYear) => {
  try {
    const response = await axios.put(`http://192.168.1.83:5023/Users/${rut}`, {
      fullName: setFullName,
      email: setEmail,
      birthYear: setBirthYear,
    });

      console.log('Actualización exitosa:', response.data);
      navigation.navigate('Repositories');
  } catch (error) {
    // Manejar errores de red u otros errores durante la solicitud
    console.error('Error durante la solicitud:', error.message);
  }
};

// Luego, al llamar a la función, deberías pasar las funciones de actualización:
// handleSaveChanges(setNuevoFullName, setNuevoEmail, setNuevoBirthYear);


  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => toRepositories()}>
          <Icon name="arrow-left" size={20} color="black" weight="light" />
        </TouchableOpacity>
      <Text variant="displayMedium">Editar Perfil</Text>
      <TextInput
        label="Nombre Completo"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        mode="outlined"
        style={styles.textInput}
      />
      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.textInput}
      />
      <TextInput
        label="Año de Nacimiento"
        value={birthYear}
        onChangeText={(text) => setBirthYear(text)}
        mode="outlined"
        style={styles.textInput}
      />
      <Button mode="contained" style={styles.button} onPress={() => handleSaveChanges(fullName, email, birthYear)}>
        Guardar Cambios
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonBack: {
    margin: 5
  }
});

export default EditProfile;

