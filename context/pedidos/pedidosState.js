import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer' ;
import PedidosContext from './pedidosContext';


const PedidosState = (props) => {


    //--- crear state Inicial ---//
    const initialState  = {
        pedido: [] // puede ordenar multiples pedidos el cliente
    }


    //--- useReducer con dispatch para ejecutar las funciones ---//
    const [ state, dispatch ] = useReducer(PedidosReducer, initialState)


    return(
        <PedidosContext.Provider
            value={{//para debugiar
                pedido: state.pedido, //paso este state a los demas componentes
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState;