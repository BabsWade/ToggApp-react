// DetailRecette.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailRecette: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la Recette</Text>
      <Text style={styles.description}>Ici vous pouvez voir les détails d'une recette sélectionnée.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailRecette;
