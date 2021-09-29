import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//funcion para conbinar varios reducer
const reducers= combineReducers({
    auth: authReducer, //funcion de authReducer que llamaremos auth
    ui: uiReducer
})

//importar esto en el punto mas alto de la app abajo de index
export const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk)
        )
); //la funcion "createStore" solo recibe un reducer 