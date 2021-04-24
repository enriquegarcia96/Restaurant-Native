import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer' ;
import PedidosContext from './pedidosContext';

import { SELECCIONAR_PRODUCTO } from '../../types';


const PedidosState = (props) => {


    //--- crear state Inicial ---//
    const initialState  = {
        pedido: [], // puede ordenar multiples pedidos el cliente
        platillo: null
    }


    //--- useReducer con dispatch para ejecutar las funciones ---//
    const [ state, dispatch ] = useReducer(PedidosReducer, initialState);


    //--- Selecciona el producto que el usuario desea ordenar ---//
    const seleccionarPlatillo = ( platillo ) => {

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo, //payload: es lo que cambia el state
        })

    }


    return(
        <PedidosContext.Provider
            value={{//para debugiar
                pedido: state.pedido, //paso este state a los demas componentes
                platillo: state.platillo,
                seleccionarPlatillo,
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState;