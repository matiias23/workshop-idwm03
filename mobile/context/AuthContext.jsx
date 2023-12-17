import React, {createContext, useReducer} from 'react';
import { authReducer } from './AuthReducer';
import userApi from '../api/userApi';

const authInitialState = {
    status: 'checking',
    token: null,
    email: null,
    errorMessage: '',
    rut:null
}

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signUp = async ({ email, fullname, birthyear, rut }) => {
        try {
          const {data} = await userApi.post('/Users/register', { email, fullname, birthyear, rut });       
          console.log('Respuesta del servidor:', data); 
            dispatch({
                type: 'signUp',
                payload: {
                token: data,
                email: data.email,
                rut: data.rut
            }
        });
          } 
        catch (error) {
          // Manejar errores de red u otros problemas
          console.error('Error durante la solicitud:', error.message);
      
          dispatch({
            type: 'setError',
            payload: {
              errorMessage: 'Hubo un problema durante el registro.'
            }
          });
        }
      };
      

    const signIn = async ({email, password}) => {
        try{ 
            const {data} = await userApi.post('/Users/login', { email, password });
            //console.log(data);
            dispatch({
                type: 'signUp',
                payload:{
                    token: data,
                    email: data.email,
                    rut: data.rut,
                } 
            });
            

        } catch (error){
            console.log(error.response, 'No se pudo procesar la solicitud');
            throw new Error('Error en el inicio de sesión');
        }
    }

    const logOut = async () => {
        dispatch({
            type: 'logout',
        })
    }

    const removeError = () => {
        dispatch({type: 'removeError'})
    }

    return(
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                logOut,
                removeError
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}