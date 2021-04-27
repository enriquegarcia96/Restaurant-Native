import {
    SELECCIONAR_PRODUCTO, 
    CONFIRMAR_ORDENAR_PLATILLO, 
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'


export default ( state, action ) => {

    switch (action.type) {

        case  SELECCIONAR_PRODUCTO: 
            return{
                ...state,
                platillo: action.payload
            }

        case CONFIRMAR_ORDENAR_PLATILLO: 
            return{
                ...state,
                pedido: [...state.pedido, action.payload]
            }

        case MOSTRAR_RESUMEN: 
           return{
               ...state,
               total: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return{
                ...state,
                pedido: state.pedido.filter( articulo => articulo.id !== action.payload )
            }
        case PEDIDO_ORDENADO:
            return{
                ...state,
                //--- una vez que el pedido se complete vuelve a su estado original(desde cero) ---//
                pedido:[],// oculta el boton de pedido ( si tiene alguna )
                total: 0,
                idpedido: action.payload
            }

        default:
            return state;
    }
}