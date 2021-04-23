import React, { useReducer } from 'react';

import FirebaseReducer from './firebaseReducer' ;
import FirebaseContext from './firebaseContext';


const FirebaseState = (props) => {

    //--- crear state Inicial ---//
    const initialState  = {
        menu:[]
    }


    //--- useReducer con dispatch para ejecutar las funciones ---//
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)


    return(
        <FirebaseContext.Provider
            value={{//para debugiar
                menu: state.menu, //paso este state a los demas componentes
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;