import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListeRecette from './interfaces/ListeRecette';      
import DetailRecette from './interfaces/DetailRecette';   
import AjoutRecette from './interfaces/AjoutRecette';   
import Favoris from './interfaces/Favoris';              

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListeRecette" component={ListeRecette} options={{ title: 'Recettes' }} />
      <Tab.Screen name="Favoris" component={Favoris} options={{ title: 'Favoris' }} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DetailRecette" component={DetailRecette} />
        <Stack.Screen name="AjoutRecette" component={AjoutRecette} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
