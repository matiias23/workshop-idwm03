import React,{useState, useContext} from "react"
import { Button, TextInput, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UpdatePassword = ({navigation}) =>{
    const { rut } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [hidePwd, setHidePwd] = useState(true);
    const [hideNewPwd, setHideNewPwd] = useState(true);
    const [hideConfirmNewPwd, setHideConfirmNewPwd] = useState(true);

    const toRepositories = () => {
        navigation.navigate('Repositories')
    };

    const handleShowPwd = (passwordType) => {
        switch (passwordType) {
          case 'current':
            setHidePwd(!hidePwd);
            break;
          case 'new':
            setHideNewPwd(!hideNewPwd);
            break;
          case 'confirm':
            setHideConfirmNewPwd(!hideConfirmNewPwd);
            break;
          default:
            break;
        }
      };

      const handleChangePassword = async () => {
        // Validar contraseñas y realizar solicitud al servidor
        if (currentPassword && newPassword && newPassword === confirmNewPassword) {
          try {
            // Realizar solicitud al servidor para actualizar la contraseña
            const response = await axios.put(`http://192.168.1.83:5023/Users/password/${rut}`, {
              currentPassword,
              newPassword,
            });
      
            // Verificar el estado de la respuesta y manejar según sea necesario
            if (response.status === 200) {
              // Contraseña actualizada con éxito
              console.log('Contraseña actualizada con éxito:', response.data);
              navigation.navigate('Repositories');
            } else {
              // Manejar errores aquí si la respuesta no es exitosa
              console.error('Error al actualizar la contraseña:', response.statusText);
            }
          } catch (error) {
            // Manejar errores de red u otros errores durante la solicitud
            console.error('Error durante la solicitud:', error.message);
          }
        } else {
          // Mostrar mensaje de error si las contraseñas no son válidas
          console.error('Las contraseñas no son válidas.');
        }
      };
      

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.buttonBack} onPress={() => toRepositories()}>
            <Icon name="arrow-left" size={20} color="black" weight="light" />
            </TouchableOpacity>
            <Text variant="displayMedium">Actualizar Contraseña</Text>
            <TextInput
            label="Contraseña Actual"
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            secureTextEntry={hidePwd}
            mode="outlined"
            style={styles.textInput}
            right={
            <TextInput.Icon 
            icon={hidePwd ? "eye": "eye-off"} 
            onPress={() => handleShowPwd('current')} /> }
            />
            <TextInput
            label="Nueva Contraseña"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={hideNewPwd}
            mode="outlined"
            style={styles.textInput}
            right={
            <TextInput.Icon 
            icon={hideNewPwd ? "eye": "eye-off"} 
            onPress={() => handleShowPwd('new')} /> }
            />
            <TextInput
            label="Confirmar Nueva Contraseña"
            value={confirmNewPassword}
            onChangeText={(text) => setConfirmNewPassword(text)}
            secureTextEntry={hideConfirmNewPwd}
            mode="outlined"
            style={styles.textInput}
            right={
            <TextInput.Icon 
            icon={hideConfirmNewPwd ? "eye": "eye-off"} 
            onPress={() => handleShowPwd('confirm')} /> }
            />
            <Button mode="contained" style={styles.button} onPress={handleChangePassword}>
            Actualizar Contraseña
            </Button>


        </SafeAreaView>
        
    );
    
}

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

export default UpdatePassword;