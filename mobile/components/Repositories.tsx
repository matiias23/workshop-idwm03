import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView,  } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Repository } from "../models/Repository";
import axios from "axios";

const Repositories = ({ navigation }) => {
    const [repositories, setRepositores] = useState<Repository[]>([]);
    const [isLoading, setIsLoading]= useState<boolean>(false);
    const url = "http://192.168.1.83:5023/Repositories"

    const toHome = () => {
        navigation.navigate('Home');
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then((response) =>{
                setRepositores(response.data);
            })
            .catch((err) =>{
                console.log(err);
            })
            .finally(() =>{
                setIsLoading(false);
            });
    }, []);

    if(isLoading){
        return( 
        <SafeAreaView style={styles.loading}>
            <ActivityIndicator animating={true} size={"large"} />
        </SafeAreaView>
    );
    }

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
                onPress={() => console.log("aasda")}
                mode={"contained"}
                >
                    Ver más
                </Button>
            </Card.Actions>
        </Card>
        ))}     
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
        width:"100%",
        margin:0,
        padding:0
    },
    loading: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
});

export default Repositories;