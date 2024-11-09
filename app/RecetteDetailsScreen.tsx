import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Recette } from '@/types/Recette';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types';  // Assurez-vous que RootStackParamList est correctement importé

// Typage des paramètres de la route
type RecetteDetailsScreenRouteProp = RouteProp<RootStackParamList, 'RecetteDetailsScreen'>;

type RecetteDetailsScreenProps = {
  route: RecetteDetailsScreenRouteProp;
};

const RecetteDetailsScreen: React.FC<RecetteDetailsScreenProps> = ({ route }) => {
  const { recette } = route.params;  // Récupérer le paramètre 'recette'

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Affichage de l'image avec gestion de l'absence d'image */}
      {recette.image ? (
        <Image source={{ uri: recette.image }} style={styles.image} />
      ) : (
        <Image source={require('@/assets/images/entree-salade.jpg')} style={styles.image} /> // image par défaut
      )}

      <Text style={styles.title}>{recette.name}</Text>
      <Text style={styles.subtitle}>{recette.userName}</Text>
      

      {/* Ingrédients */}
      <Text style={styles.heading}>Ingrédients :</Text>
      <Text style={styles.ingredientsText}>{recette.ingredients || 'Ingrédients non fournis'}</Text>

      {/* Instructions */}
      <Text style={styles.heading}>Instructions :</Text>
      <Text style={styles.instructionsText}>{recette.instructions || 'Instructions non fournies'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientsText: {
    fontSize: 16,
    marginBottom: 16,
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default RecetteDetailsScreen;
