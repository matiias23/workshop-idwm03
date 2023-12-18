import React ,{ useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, Card, Text, } from "react-native-paper";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Commit } from "../models/Commit";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

const Commits = ({ navigation, route }) =>{
    const [commits, setCommits] = useState<Commit[]>([]);
    const [isLoading, setIsLoading]= useState<boolean>(false);
    

    useEffect(() => {
        //console.log(route.params);
        const  selectedRepository= route.params?.name;
       
        setIsLoading(true);
        axios.get(`http://192.168.1.83:5023/Repositories/${selectedRepository}`)
            .then((response) =>{
                setCommits(response.data);
            })
            .catch((err) =>{
                console.log(err);
            })
            .finally(() =>{
                setIsLoading(false);
            });
    }, [route.params]);

    if(isLoading){
        return( 
        <SafeAreaView style={styles.loading}>
            <ActivityIndicator animating={true} size={"large"} />
        </SafeAreaView>
    );
    }

    const toRepositories = () => {
        navigation.navigate('Repositories')
    };
    

return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => toRepositories()}>
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
    },
});

export default Commits;