import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importation des composants
import ListeRecette from './interfaces/ListeRecette';  
import Favoris from '@/interfaces/Favoris';       
import RecetteDetailsScreen from '@/app/RecetteDetailsScreen'; 
import AjouterCategorieScreen from '@/app/AjouterCategorieScreen';  

import { RootStackParamList } from './types';  // Importation de RootStackParamList
import AddRecetteScreen from './app/AddRecetteScreen';
import EditRecetteScreen from './app/EditRecetteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();  // Utilisation du type ici
const Tab = createBottomTabNavigator();

// TabNavigator pour les écrans principaux
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListeRecette" component={ListeRecette} options={{ title: 'Recettes' }} />
      <Tab.Screen name="Favoris" component={Favoris} options={{ title: 'Favoris' }} />
    </Tab.Navigator>
  );
};

// Composant principal de l'application
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddRecette" component={AddRecetteScreen} />
        <Stack.Screen name="RecetteDetailsScreen" component={RecetteDetailsScreen} />
        <Stack.Screen name="AjouterCategorie" component={AjouterCategorieScreen} />
        <Stack.Screen name="EditRecetteScreen" component={EditRecetteScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
