import Swal from 'sweetalert2';

import { firebase } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";



//acciones asincronicas
export const startLoginEmailPassword = (email, password) => {
        
    return (dispatch) =>{ //callback 

        dispatch( startLoading() ); //accion para decir que ui->loading:true

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user} ) =>{

                dispatch( login(user.uid, user.displayName) )//despues de realizar el registro realizamos el login 
                dispatch( finishLoading() ); //accion para decir que ui->loading:true
                
            })
            .catch( e => {
                // console.log(e);
                dispatch( finishLoading() ); //accion para decir que ui->loading:true
                Swal.fire('Error', e.message, 'error');
            })
       
    }

}


//registrar usuario Firebase 
export const startRegisterWithEmailPasswordName = (email, password, name)=>{
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user} ) =>{
                await user.updateProfile({displayName:name}) //cargamos el nombre del usuario
                
                dispatch(
                    login(user.uid, user.displayName) //despues de realizar el registro realizamos el login
                )
            }).catch(e => {
                // console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.message,
                  })
            })
    }
}

//cerrar sesion de firebase
export const startLogout = () => {
    return async( dispatch ) => { //es asincrona porque tenemos q esperar a q responda firebase
        await firebase.auth().signOut();
        dispatch( logout() );//para borrarlo de nuestro redux
    }
}




//acciones sincronicas

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
    
})


export const logout = ()=>({
    type: types.logout
})