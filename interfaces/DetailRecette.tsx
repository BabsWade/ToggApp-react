import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Recette } from '@/types/Recette';

type DetailRecetteProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { recette: Recette } }, 'params'>;
};

const DetailRecette: React.FC<DetailRecetteProps> = ({ route }) => {
  const { recette } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titrePlat}>{recette.name}</Text>
      <Image source={recette.image} style={styles.image} />

      <Text style={styles.sectionTitle}>Ingrédients</Text>
      <Text style={styles.userName}>{recette.userName}</Text>

      <Text style={styles.description}>{recette.instructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F3F3',
  },
  titrePlat: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailRecette;
