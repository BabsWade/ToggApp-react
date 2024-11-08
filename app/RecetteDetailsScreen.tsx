import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Recette } from '@/types/Recette';

type RecetteDetailsScreenProps = {
  route: any;
};

const RecetteDetailsScreen: React.FC<RecetteDetailsScreenProps> = ({ route }) => {
  const { recette }: { recette: Recette } = route.params;  // Récupérer les paramètres passés

  return (
    <View style={styles.container}>
      <Image source={{ uri: recette.image }} style={styles.image} />
      <Text style={styles.title}>{recette.name}</Text>
      <Text style={styles.subtitle}>{recette.userName}</Text>
      <Text style={styles.description}>{recette.description}</Text>

      <Text style={styles.heading}>Ingrédients :</Text>
      <Text>{recette.ingredients}</Text>

      <Text style={styles.heading}>Instructions :</Text>
      <Text>{recette.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default RecetteDetailsScreen;
