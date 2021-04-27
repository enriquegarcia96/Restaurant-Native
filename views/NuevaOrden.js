import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native'


import globalStyles from '../styles/global';

const NuevaOrden = () => {

    const navigation = useNavigation()

    return (

        <Container style={globalStyles.contenedor}>
            <Text style={styles.firma} >Enrique S. García</Text>
            <View style={[globalStyles.contenido, styles.contenido]}>
                <Button
                    style={globalStyles.boton}
                    rounded
                    block
                    onPress={ () => navigation.navigate('Menu') }
                >
                    <Text style={globalStyles.botonTexto} >Crear Nueva Orden</Text>
                </Button>
            </View>
        </Container>
    
    )
}


const styles = StyleSheet.create({

    contenido:{
        flexDirection: 'column',
        justifyContent: 'center'
    },
    firma: {
        color: '#FFF',
        fontFamily: 'Parisienne-Regular',
        textAlign: 'center',
        fontSize: 30,
        position:'absolute',
        margin: 70
    }

})

export default NuevaOrden
