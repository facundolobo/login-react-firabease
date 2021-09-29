import React from 'react'
import { AppRouter } from './routers/AppRouter'


import { Provider } from "react-redux";//importamos esto apra usar store en todla la aplicacion
import { store } from './store/store';


export const App = () => {
    return (
        <div>
            <Provider store={store}> {/* aplicamos el store */}
                <AppRouter/>
            </Provider>
        </div>
    )
}
