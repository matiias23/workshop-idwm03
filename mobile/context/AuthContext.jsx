import React, {createContext, useReducer} from 'react';
import { authReducer } from './AuthReducer';
import userApi from '../api/userApi';

const authInitialState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signUp = ({name = "Felipe", email = "felipe@correo.com", password = "felipe1234"}) => {
        console.log(name);
    }

    const signIn = async ({email, password}) => {
        try{ 
            const {data} = await userApi.post('/Users/login', { email, password });
            //console.log(data);
            dispatch({
                type: 'signUp',
                payload:{
                    token: data,
                    user: data.user,
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