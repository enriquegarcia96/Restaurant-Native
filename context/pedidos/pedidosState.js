import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer' ;
import PedidosContext from './pedidosContext';

import { 
    SELECCIONAR_PRODUCTO, 
    CONFIRMAR_ORDENAR_PLATILLO, 
    MOSTRAR_RESUMEN, 
    ELIMINAR_PRODUCTO, 
    PEDIDO_ORDENADO
} from '../../types';


const PedidosState = (props) => {


    //--- crear state Inicial ---//
    const initialState  = {
        pedido: [], // puede ordenar multiples pedidos el cliente
        platillo: null,
        total: 0,
        idpedido: ''
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

    //--- Cuando el usuario confirma un platillo ---//
    const guardarPedido = (pedido) =>{
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    //--- Mustra el total a Pagar en el resumen ---//
    const mostrarResumen = total =>{

        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total

        })
    }

    //--- Elimina un articulo del carrito --//
    const eliminarProducto = (id) => {

        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const pedidoRealizado = (id) => {

        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }


    return(
        <PedidosContext.Provider
            value={{//para debugiar
                pedido: state.pedido, //paso lo state a los demas componentes
                platillo: state.platillo,
                total: state.total,
                idpedido: state.idpedido,
                seleccionarPlatillo,// funciones para que los demas componentes los utilicen
                guardarPedido, 
                mostrarResumen, 
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState;