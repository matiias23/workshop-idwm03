import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../models/Repository";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

/**
 * Componente funcional para la pantalla de repositorios.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de repositorios.
 */
const Repositories = ({ navigation }) => {
    const { logOut } = useContext(AuthContext);
    const [repositories, setRepositores] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const url = "http://192.168.1.83:5023/Repositories";

    /**
     * Hook de efecto para cargar los repositorios.
     * @returns {void}
     */
    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then((response) => {
                setRepositores(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    /**
     * Navega a la pantalla de commits para un repositorio específico.
     * @param {Repository} repository - Objeto de repositorio.
     * @returns {void}
     */
    const toCommits = (repository) => {
        navigation.navigate('Commits', repository);
    };

    /**
     * Maneja el evento de cierre de sesión.
     * @returns {void}
     */
    const handleLogOut = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        logOut();
    };

    /**
     * Navega a la pantalla de edición de perfil.
     * @returns {void}
     */
    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    /**
     * Navega a la pantalla de actualización de contraseña.
     * @returns {void}
     */
    const handleUpdatePassword = () => {
        navigation.navigate('UpdatePassword');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text variant={"displayMedium"}> Mis Repositorios</Text>
            <ScrollView>
                {repositories.map((r) => (
                    <Card style={styles.card} key={r.name}>
                        <Card.Title title={r.name} titleVariant={"headlineSmall"} />
                        <Card.Content>
                            <Text variant={"bodyMedium"}>Creado el: {r.createdAt.split("T")[0]}</Text>
                            <Text variant={"bodyMedium"}>Última actualización: {r.updatedAt.split("T")[0]} </Text>
                            <Text variant={"bodyMedium"}>Commits: {r.commitsAmount}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                onPress={() => toCommits(r)}
                                mode={"contained"}
                            >
                                Ver más
                            </Button>
                        </Card.Actions>
                    </Card>
                ))}
                <Button
                    style={styles.smallButton}
                    mode="contained"
                    onPress={handleEditProfile}
                >
                    Editar Perfil
                </Button>
                <Button
                    style={styles.smallButton}
                    mode="contained"
                    onPress={handleUpdatePassword}
                >
                    Actualizar Contraseña
                </Button>
                <Button
                    style={styles.buttonExit}
                    mode="contained"
                    onPress={handleLogOut}
                >
                    Salir
                </Button>
            </ScrollView>
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
    card: {
        width: "100%",
        backgroundColor: "F0F0F0",
        marginBottom: 15
    },
    ScrollView: {
        width: "100%",
        margin: 0,
        padding: 0
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonExit: {
        height: 40,
        marginTop: '20%',
        marginBottom: 8,
        backgroundColor: '#D12B35',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        height: 40,
        width: 200,
        marginBottom: '5%',
        backgroundColor: '#4DC639',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    smallButton: {
        marginBottom: 8,
        height: 40,
    },
});

export default Repositories;
