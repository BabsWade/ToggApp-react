// AjouterCategorieScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AjouterCategorieScreen = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    // Logique pour ajouter la catégorie (par exemple, stockage dans AsyncStorage)
    console.log(`Nouvelle catégorie ajoutée : ${categoryName}`);
    setCategoryName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom de la catégorie"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button title="Ajouter la catégorie" onPress={handleAddCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default AjouterCategorieScreen;
