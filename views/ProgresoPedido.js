import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, H1, H3, Button, Text } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native'
import PedidosContext from '../context/pedidos/pedidosContext'


const ProgresoPedido = () => {

    const { idpedido } = useContext(PedidosContext);

    return (
        <Text>{idpedido}</Text>
    )
}

export default ProgresoPedido
