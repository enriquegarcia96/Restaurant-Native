import { StyleSheet } from 'react-native';


const globalStyles = StyleSheet.create({

    contenedor: {
        flex: 1,
        backgroundColor: '#222831'
    },
    contenido:{
        marginHorizontal: '2.5%',
        flex: 1,
    },
    boton:{
        backgroundColor: '#393e46'
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontFamily: 'OldStandardTT-Regular',
        color: '#eeeeee',
        
    },
    titulo:{
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 27,
        color: '#fdfdfd',
        fontFamily: 'CodaCaption-ExtraBold'
    },
    imagen:{
        height: 240,
        width: '100%'
    },
    cantidad: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontFamily : 'Vidaloka-Regular',
        color:'#fdfdfd' 
    },
    cantidad2: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontFamily : 'Vidaloka-Regular',
        color:'#252525' 
    }

})


export default globalStyles;