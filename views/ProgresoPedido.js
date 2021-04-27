import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, H1, H3, Button, Text } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native'
import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import Countdown from 'react-countdown'



const ProgresoPedido = () => {

    const navigation = useNavigation();

    const { idpedido } = useContext(PedidosContext);

    const [ tiempo, guardarTiempo ] = useState(0);
    const [ completado, guardarCompletado ] = useState(false);



    useEffect( () => {

        const obtenerProducto = () => {

            firebase.db.collection('ordenes')
                        .doc(idpedido)
                        .onSnapshot(function(doc){
                            //console.log(doc.data().tiempoEntrega)
                            guardarTiempo(doc.data().tiempoEntrega);
                            guardarCompletado(doc.data().completado);
                        })
        }
        obtenerProducto();
    },[]);




    //--- Muestra el countDown en la pantalla ---//
    const renderer = ({ minutes , seconds}) => {
        return(
            <Text style={[styles.tiempo, { color: '#fcfefe' }] } >{minutes}:{seconds}</Text>
        )
    }


    return (
        <Container style={ globalStyles.contenedor }>
            <View style={ [ globalStyles.contenido, { marginTop: 50 } ] }>

                { tiempo === 0 && (
                    <>
                       <Text style={{ textAlign: 'center', color: '#fbfbfb', fontFamily: 'OldStandardTT-Bold', fontSize: 20 }} >Hemos recibido tu orden...</Text> 
                       <Text style={{ textAlign: 'center', color: '#fbfbfb', fontFamily: 'OldStandardTT-Bold', fontSize: 20  }} >Estamos calculando el tiempo de entrega.</Text> 
                    </>
                ) }


                {/** Ya actualizaron el pedido para */}
                { !completado && tiempo > 0 && (
                    <>
                        <Text style={{ color: '#fcfefe', textAlign: 'center', fontFamily: 'OldStandardTT-Bold', fontSize: 20 }} >Su orden estara lista en:</Text> 

                        <Text style={{ textAlign: 'center' }} >
                            <Countdown 
                                date={ Date.now() + tiempo * 60000 }
                                renderer={ renderer }
                            />
                        </Text>

                    </>
                ) }


                { completado && (
                    <>
                        <H1 style={ [styles.textoCompletado, { color: '#fcfefe' }] } >Orden Lista</H1>
                        <H3 style={ [styles.textoCompletado, { color:'#fcfefe' }] } >Por favor, pase a recoger su pedido</H3>

                        <Button style={[ globalStyles.boton, { marginTop: 100 } ]} 
                            rounded
                            block
                            dark
                            onPress={ () => navigation.navigate('NuevaOrden') }
                        >
                            <Text style={ globalStyles.botonTexto } >Comenzar Una Orden Nueva</Text>
                        </Button>
                    </>
                ) }

            </View>
        </Container>
    )
}


const styles = StyleSheet.create({

    tiempo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 70,
        marginTop: 33,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }


})


export default ProgresoPedido
