// AjoutRecette.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AjoutRecette: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une Recette</Text>
      <TextInput style={styles.input} placeholder="Nom de la recette" />
      <TextInput style={styles.input} placeholder="Ingrédients" multiline />
      <Button title="Ajouter" onPress={() => {/* Logique d'ajout ici */}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AjoutRecette;
