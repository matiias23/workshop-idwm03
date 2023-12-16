
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'signUp':
        //console.log('Iniciando sesión:', action.payload);
        return{
            ...state,
                errorMessage:'',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
        }
        
    
    case 'notAuthenticated':
    case 'logout':
        return{
            ...state,
            errorMessage: [],
            status: 'not-authenticated',
            token: null,
            user: null
        }
        

    case 'addError':
        return{
            
        }
        
        
    case 'removeError':
        return{
            ...state,
            errorMessage: []
        }
            
      

    default:
        return state;
  }
}