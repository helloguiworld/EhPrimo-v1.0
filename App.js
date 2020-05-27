import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TestScreen from './src/screens/TestScreen';
import GameScreen from './src/screens/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(0);

  useEffect(() => {
    // Cria função assincrona para carregamento das fontes e atualização de estado
    async function loadFont() {
      await Font.loadAsync({
        'League Spartan': require('./assets/fonts/League_Spartan_Regular.ttf'),
        'Poppins': require('./assets/fonts/Poppins_Regular.ttf'),
      });
      setFontLoaded(1);
    }
    // Chama função criada
    loadFont();
  }, []);

  return (
    <>
      {   //Condiciona exibição conforme carregamento de fonte
        fontLoaded ? (
          <NavigationContainer>
            <Stack.Navigator mode="modal" initialRouteName="Test">
              <Stack.Screen name="Test" component={TestScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer >
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="large" color='#5050a8' />
          </View>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6'
  },
});
