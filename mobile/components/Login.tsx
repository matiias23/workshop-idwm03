import React from "react";
import { View,StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    const toHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View>
          <View >
            <TouchableOpacity style={styles.buttonBack} onPress={() => toHome()}>
              <Icon name="arrow-left" size={20} color="black" weight="light" />
            </TouchableOpacity>
          </View>
          <View>
            <Text>sad</Text>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      buttonBack: {
        margin: 5
      },
    });
    

export default Login;