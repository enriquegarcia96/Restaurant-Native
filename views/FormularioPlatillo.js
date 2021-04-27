import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Container,
    Content,
    Form, 
    Input,
    Text,
    Grid,
    Col,
    Icon,
    Button,
    Footer,
    FooterTab
} from 'native-base';

import { useNavigation  } from '@react-navigation/native'
import PedidosContext from '../context/pedidos/pedidosContext';

import globalStyles from '../styles/global';

const FormularioPlatillo = () => {

    //--- state para cantidades ---//
    const [ cantidad, guardarCantidad ] = useState(1);
    const [ total, guardarTotal ] = useState(0);

    //--- context ---//
    const { platillo, guardarPedido  } = useContext(PedidosContext);
    const { precio } = platillo;

    //--- redireccionar ---//
    const navigation = useNavigation();


    //--- En cuanto el componente carga, calcular la cantidad a pagar ---//
    useEffect( () => {

        calcularTotal();

    },[cantidad] )//cuando el usuario agrege mas cosas; el total va canbiando (calculo atomaticamente)

    //--- Calcula la cantidad del platillo por su cantidad ---//
    const calcularTotal = () => {

        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);

    }


    //--- Decremento en uno ---//
    const decrementarUno = () => {

        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) -1;
            guardarCantidad(nuevaCantidad);
        }

    }

    //--- incrementa en uno la cantidad ---//
    const incrementarUno = () =>{
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }


    //--- Confirma si la orden es correcta ---//
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                text: 'Confirmar',
                onPress: () => {

                    //--- Almacenar el pedido al pedido principal ---//
                    const pedido = {
                        ...platillo,
                        cantidad,
                        total
                    }
                    //console.log(pedido)
                    guardarPedido(pedido);

                    //--- Navegar hacia el Resumen ---//
                    navigation.navigate('ResumenPedido');
                },

                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }


    return(
        <Container>
            <Content>
                <Form>
                    <Text style={ globalStyles.titulo } >Cantidad</Text>
                    <Grid>

                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 90, justifyContent: 'center' }}
                                onPress={ () => decrementarUno() }
                            >
                                <Icon style={{ fontSize: 40 }} name='remove' />
                            </Button>
                        </Col>

                        <Col>
                           <Input
                                style={{ textAlign: 'center', fontSize: 30 }}
                                value={ cantidad.toString() }
                                keyboardType='numeric'
                                onChangeText={ (cantidad) => guardarCantidad(cantidad) }

                           />
                        </Col>

                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 90, justifyContent: 'center', marginLeft: 48  }}
                                onPress={ () => incrementarUno() }
                            >
                                <Icon style={{ fontSize: 40 }} name='add' />
                            </Button>
                        </Col>
                    </Grid>

                    <Text style={globalStyles.cantidad2} >Subtotal: L. {total} </Text>
                </Form>
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        style={ globalStyles.boton }
                        onPress={ () => confirmarOrden() }
                    >
                        <Text style={ globalStyles.botonTexto } >Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    )
}


export default FormularioPlatillo