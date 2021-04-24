import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

//--- importar state de context ---//
import FirebaseState from './context/firebase/firebaseState';
import PedidosState from './context/pedidos/pedidosState';



const Stack = createStackNavigator();

const App =  () => {


  return(
    <>
      <FirebaseState>
        <PedidosState>
          <NavigationContainer>
            <Stack.Navigator

              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00',
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center',
                headerTintColor: '#000'
                
              }}
            >

                <Stack.Screen 
                    name='NuevaOrden'
                    component={NuevaOrden}
                    options={{
                      title: 'Nueva Orden'
                    }}
                />

                <Stack.Screen 
                  name='Menu'
                  component={Menu}
                  options={{
                    title: 'Nuestro Menu'
                  }}
                />

                <Stack.Screen 
                  name='DetallePlatillo'
                  component={DetallePlatillo}
                  options={{
                    title: 'Detalle Platillo'
                  }}
                />

                <Stack.Screen 
                  name='FormularioPlatillo'//para redireccionar
                  component={FormularioPlatillo}
                  options={{
                    title: 'Ordenar Platillo'
                  }}    
                />

                <Stack.Screen 
                  name='ResumenPedido'
                  component={ResumenPedido}
                  options={{
                    title: 'Resumen Pedido'
                  }}
                />

                <Stack.Screen 
                  name='ProgresoPedido'
                  component={ProgresoPedido}
                  options={{
                    title: 'Progreso de Pedido'
                  }}
                />

            </Stack.Navigator>
          </NavigationContainer>
        </PedidosState>

      </FirebaseState>
    </>
  )

};

const styles = StyleSheet.create({
 
});

export default App;
