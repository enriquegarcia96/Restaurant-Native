import React, {useContext, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
   Container,
   List,
   Content,
   Thumbnail,
   Text,
   Left,
   Body,
   H1,
   Footer,
   FooterTab,
   ListItem,
   Button,
} from 'native-base';

import { useNavigation  } from '@react-navigation/native'
import PedidosContext from '../context/pedidos/pedidosContext';

import globalStyles from '../styles/global';
import Firebase from '../firebase';


const ResumenPedido = () => {

    const navigation = useNavigation();

    //--- context de pedido ---//
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidosContext);


    useEffect( () => {

        calcularTotal();

    },[pedido] )

    const calcularTotal = () =>{

        let nuevoTotal =0;
        nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => nuevoTotal + articulo.total, 0 );

        mostrarResumen(nuevoTotal);
    }

    //--- redirecciona a progreso pedido ---//
    const progresoPedido =  () => {

        Alert.alert(
            '¡Revisa tu pedido!',
            'Una vez que realizes tu pedido, no podras cambiarlo.',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        //--- crear un objeto ---//
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        }

                        //--- Escribir el pedido en firebase ---//
                        try {

                            //* Tomo el id del pedido, muy importante
                            const pedido = await Firebase.db.collection('ordenes').add(pedidoObj);
                            //console.log(pedido.id)
                            pedidoRealizado(pedido.id);

                            //--- Redireccionar a progreso ---//
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                {
                    text: 'Revisar', style: 'cancel'
                }
            ]
        )

    }

    //--- Eliminar un producto del arreglo de pedido ---//
    const confirmarEliminacion = (id) => {

        Alert.alert(
            '¿Deseas eliminar este articulo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () =>{

                        //--- Eliminar del state ---//
                        eliminarProducto(id);
                    }
                },
                {
                    text: 'Cancelar', style: 'cancel'
                }
            ]
        )
    }


    return (
        <Container style={ globalStyles.contenedor } >
            <Content globalStyles={ globalStyles.contenido } >
                <H1 style={ globalStyles.titulo } >Resumen Pedido</H1>
                { pedido.map( (platillo,i ) => {

                    const { cantidad, nombre, imagen, id, precio } = platillo;

                    return(
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: imagen }} />
                                </Left>

                                <Body>
                                    <Text style={{ color: '#fff', fontFamily: 'OldStandardTT-Bold' }} >{nombre}</Text>
                                    <Text style={{ color: '#fff', fontFamily: 'OldStandardTT-Bold' }} >Cantidad: {cantidad}</Text>
                                    <Text style={{ color: '#fff', fontFamily: 'OldStandardTT-Bold' }} >Precio: L. {precio}</Text>

                                    <Button 
                                        onPress={ () =>  confirmarEliminacion(id) }
                                        full
                                        danger
                                        style={{ marginTop: 20 }}
                                    >
                                        <Text style={[ globalStyles.botonTexto, { color:'#FFF' } ]} >Eliminar</Text>
                                    </Button>

                                </Body>

                            </ListItem>
                        </List>         
                    )
                } )}


                <Text style={ globalStyles.cantidad} >Total a Pagar: L {total} </Text>

                <Button
                    onPress={ () => navigation.navigate('Menu') }
                    style={ { marginTop: 30 }  }
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color:'#FFF' }]} >Seguir Pidiendo</Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => progresoPedido() }
                        style={ [globalStyles.boton, { marginTop: 1 } ] }
                        full
                    >
                    <Text style={globalStyles.botonTexto} >Ordenar Pedido</Text>
                    </Button>                    
                </FooterTab>
            </Footer>

        </Container>
    )
}

export default ResumenPedido

