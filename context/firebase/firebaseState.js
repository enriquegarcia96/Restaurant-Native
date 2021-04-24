import React, { useReducer } from 'react';

import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer' ;
import FirebaseContext from './firebaseContext';

//--- types ---//
import { OBTENER_PRODUCTOS_EXITO } from '../../types'

const FirebaseState = (props) => {



    //console.log(firebase);

    //--- crear state Inicial ---//
    const initialState  = {
        menu: []
    }


    //--- useReducer con dispatch para ejecutar las funciones ---//
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState);


    //--- funcion que se ejecuta para traer los productos ---//
    const obtenerProductos = () => {
       // console.log('desde fireState');
        

        //--- consultar firebase, trae solo los productos que tiene existencia ---//
        firebase.db.collection('productos')
                    .where('existencia', '==', true)
                    .onSnapshot(manejarSnapshot);


        function manejarSnapshot (snapshot) {

            //--- docs para hacerder a los documentos ---//
            let platillos = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data()//data es el que tiene toda la informacion de firebase
                }
            });

                console.log(platillos);
            //--- Tenemos resultados de la base de datos ---//
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,//type: de firebaseReducer
                payload: platillos, //payload: es lo que cambia en el state
            });
        }
    }




    return(
        <FirebaseContext.Provider
            value={{//para debugiar
                menu: state.menu, //paso este state a los demas componentes
                firebase, //para que lo utilice los demas componentes
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;