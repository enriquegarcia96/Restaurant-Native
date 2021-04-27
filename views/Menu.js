import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import {  useNavigation } from '@react-navigation/native';

import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body
} from 'native-base';

import globalStyles from '../styles/global';



import FirebaseContext from '../context/firebase/firebaseContext';
import  PedidosContext from '../context/pedidos/pedidosContext'
import pedidosReducer from '../context/pedidos/pedidosReducer';

const Menu = () => {

    //-- Context de Firebase ---//
    const {menu, obtenerProductos } = useContext(FirebaseContext);

    //--- Context de pedido ---//
    const { seleccionarPlatillo } =  useContext(PedidosContext);

    //--- Hook para redireccionar ---//
    const navigation = useNavigation();

    useEffect( () => {
        obtenerProductos()

        //console.log(menu)
    }, [] )


    const mostrarHeading = ( categoria, i ) => {

        if (i > 0) {
            //--- compara la categoria para poder agruparlo ---//
            const categoriaAnterior = menu[i - 1].categoria;

            if (categoriaAnterior !== categoria  ) {

                return(
                    <Separator style={styles.separador} >
                        <Text style={ styles.separadorTexto } >{categoria}</Text>
                    </Separator>
                )
            }

        }else{

            return(
                <Separator style={styles.separador} >
                    <Text style={ styles.separadorTexto } >{categoria}</Text>
                </Separator>
            )
        }
    }
    

    return (
        <Container style={ globalStyles.contenedor }>
            <Content style={{ backgroundColor: '#FFF' }} >
                <List>
                    {menu.map( (platillo, i) => {
                        const { imagen, nombre, descripcion, categoria,precio, id } = platillo;

                        return(
                            <Fragment key={id} >

                                { mostrarHeading(categoria, i ) }

                                <ListItem 
                                    onPress={ () => {

                                        //--- Eliminar algunas propiedades del platillo ---//
                                        const { existencia, ...platillo2 } = platillo;

                                        seleccionarPlatillo(platillo2)//le paso el platillo
                                        navigation.navigate('DetallePlatillo');
                                    } }
                                >
                                    
                                    <Thumbnail large  source={{ uri: imagen }} />
                                    
                                    <Body>

                                        <Text style={{ fontFamily: 'CodaCaption-ExtraBold' }} >{nombre}</Text>

                                        <Text
                                            note
                                            numberOfLines={2}
                                            style={{ fontFamily: 'Vidaloka-Regular' }}
                                        >
                                            {descripcion}
                                        </Text>

                                        <Text style={{ fontFamily: 'OldStandardTT-Italic' }} >Precio: L.{precio}</Text>

                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    } )}
                </List>

            </Content>

        </Container>        
    )
}

const styles = StyleSheet.create({

    separador: {
        backgroundColor: '#222831',

    },
    separadorTexto: {
        color: '#d72323',
        fontFamily: 'FreckleFace-Regular',
        textTransform: 'uppercase',
        fontSize: 19
    }

})


export default Menu
