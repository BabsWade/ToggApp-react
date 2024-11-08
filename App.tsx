import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importation des composants
import ListeRecette from './interfaces/ListeRecette';      
import DetailRecette from './interfaces/DetailRecette';   
import AjoutRecette from './app/AjoutRecette';   
import Favoris from '@/interfaces/Favoris';     
import AddRecetteScreen from './app/(tabs)/AddRecetteScreen';  // Assurez-vous que le chemin est correct
import RecetteDetailsScreen from './app/RecetteDetailsScreen'; // Assurez-vous que le chemin est correct

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TabNavigator pour les écrans principaux
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListeRecette" component={ListeRecette} options={{ title: 'Recettes' }} />
      <Tab.Screen name="Favoris" component={Favoris} options={{ title: 'Favoris' }} />
      {/* Si tu veux afficher l'écran AjoutRecette dans le tab, mets-le ici */}
      <Tab.Screen name="AjoutRecette" component={AjoutRecette} options={{ title: 'AjoutRecette' }} />
    </Tab.Navigator>
  );
};

// Composant principal de l'application
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Accueil avec TabNavigator */}
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />

        {/* Écrans supplémentaires dans le Stack Navigator */}
        <Stack.Screen name="DetailRecette" component={DetailRecette} />
        <Stack.Screen name="AddRecette" component={AddRecetteScreen} />
        <Stack.Screen name="RecetteDetails" component={RecetteDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
