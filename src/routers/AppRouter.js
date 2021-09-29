import {firebase} from "../firebase/firebase-config";
import React, { useEffect, useState } from "react";


import {
  BrowserRouter as Router,
  Switch,
//   Link,
//   useRouteMatch,
//   useParams
  Redirect
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";

import { HomeScreen } from "../components/home/HomeScreen";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";


export const AppRouter = () => {
    
    //creamos un observador es para mantener el login
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true); //bandera para la espera de informacion de firebase
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user?.uid){ //si es q obtengo el user xq alguiens e autentifico
                dispatch(login( user.uid, user.displayName ));
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);

            }
            setChecking(false);
        })
    }, [ dispatch, setChecking, setIsLoggedIn]) //se ejecuta una vez siempre q la pagina se recarga

    //Pagina de espera cuando este en checking en true
    if( checking ){
        return (
            <h1>Espere...</h1>
        )
    }


    return (
        <div>
            <Router>
                <div>
                    <Switch>

                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ HomeScreen }
                    />
                            
                    <Redirect to="/auth/login" />
                        
                    </Switch>
                </div>
                </Router>
        </div>
    )
}
