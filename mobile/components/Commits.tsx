import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import PropTypes from "prop-types"; // Importa PropTypes

/**
 * Componente funcional para mostrar los commits de un repositorio.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.navigation - Objeto de navegación de React Navigation.
 * @param {Object} props.route - Objeto de ruta de React Navigation.
 * @param {string} props.route.params.name - Nombre del repositorio seleccionado.
 * @returns {JSX.Element} - React element que representa el componente.
 */
const Commits = ({ navigation, route }) => {
  // Estados del componente
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Efecto secundario que se ejecuta al montar o actualizar el componente.
   * Realiza una solicitud HTTP para obtener los commits del repositorio seleccionado.
   *
   * @memberof Commits
   * @inner
   * @function
   * @param {string} route.params.name - Nombre del repositorio seleccionado.
   * @returns {void}
   */
  useEffect(() => {
    //console.log(route.params);
    const selectedRepository = route.params?.name;

    setIsLoading(true);
    axios.get(`http://192.168.1.83:5023/Repositories/${selectedRepository}`)
      .then((response) => {
        setCommits(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [route.params]);

  /**
   * Navega de vuelta a la pantalla de Repositorios.
   *
   * @memberof Commits
   * @inner
   * @function
   * @returns {void}
   */
  const toRepositories = () => {
    navigation.navigate('Repositories');
  };

  // Renderizar el componente
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonBack} onPress={toRepositories}>
        <Icon name="arrow-left" size={20} color="black" weight="light" />
      </TouchableOpacity>
      <Text variant={"displayMedium"}> {route.params?.name}</Text>
      <ScrollView>
        {commits.map((r) => (
          <Card style={styles.card} key={r.date}>
            <Card.Content>
              <Text variant={"bodyMedium"}>Autor del commit: {r.author}</Text>
              <Text variant={"bodyMedium"}>Mensaje: {r.message} </Text>
              <Text variant={"bodyMedium"}>Fecha: {r.date.split("T")[0]}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Propiedades del componente
Commits.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

// Estilos del componente
const styles = StyleSheet.create({
  buttonBack: {
    margin: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "F0F0F0",
    marginBottom: 15,
  },
  ScrollView: {
    width: "100%",
    margin: 0,
    padding: 0,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Commits;
