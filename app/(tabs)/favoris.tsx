import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favoris: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      {/* Ajoute ici la logique pour afficher les recettes favorites */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Favoris;
