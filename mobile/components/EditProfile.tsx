import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types'; // Importa PropTypes

/**
 * Componente funcional para editar el perfil de usuario.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {JSX.Element} - React element que representa el componente.
 */
const EditProfile = ({ navigation }) => {
  // Contexto de autenticación
  const { rut } = useContext(AuthContext);
  const { updateUser } = useContext(AuthContext);

  // Estados del componente
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');

  /**
   * Navega de vuelta a la pantalla de Repositorios.
   *
   * @memberof EditProfile
   * @inner
   * @function
   * @returns {void}
   */
  const toRepositories = () => {
    navigation.navigate('Repositories');
  };

  /**
   * Obtiene la información del usuario por su RUT.
   *
   * @memberof EditProfile
   * @inner
   * @async
   * @function
   * @param {string} rut - RUT del usuario.
   * @returns {Promise<Object|null>} - Objeto de usuario o null si hay un error.
   */
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

  /**
   * Efecto secundario que se ejecuta al montar o actualizar el componente.
   * Obtiene la información del usuario por su RUT y actualiza los estados.
   *
   * @memberof EditProfile
   * @inner
   * @function
   * @returns {void}
   */
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

  /**
   * Maneja el evento de guardar cambios en el perfil del usuario.
   *
   * @memberof EditProfile
   * @inner
   * @async
   * @function
   * @returns {void}
   */
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://192.168.1.83:5023/Users/${rut}`, {
        fullName,
        email,
        birthYear,
      });

      console.log('Actualización exitosa:', response.data);
      navigation.navigate('Repositories');
    } catch (error) {
      // Manejar errores de red u otros errores durante la solicitud
      console.error('Error durante la solicitud:', error.message);
    }
  };

  // Renderizar el componente
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonBack} onPress={toRepositories}>
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
      <Button mode="contained" style={styles.button} onPress={handleSaveChanges}>
        Guardar Cambios
      </Button>
    </SafeAreaView>
  );
};

// Propiedades del componente
EditProfile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

// Estilos del componente
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
    margin: 5,
  },
});

export default EditProfile;
