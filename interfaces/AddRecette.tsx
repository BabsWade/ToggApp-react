import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addRecipe } from '@/database'; // Assure-toi que le chemin est correct
import { Recette } from '@/types/Recette';
import { StackNavigationProp } from '@react-navigation/stack';

type AddRecetteProps = {
  navigation: StackNavigationProp<any>;
};

const AddRecette: React.FC<AddRecetteProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [image, setImage] = useState<string>(''); // Pour simplifier, tu peux commencer avec une chaîne vide
  const [category, setCategory] = useState<string>('entrée'); // Catégorie par défaut

  const handleAddRecipe = async () => {
    if (!name || !userName) {
      Alert.alert("Erreur", "Le nom et l'utilisateur sont requis.");
      return;
    }

    const newRecipe: Recette = {
      id: Date.now().toString(), // Générer un ID unique simple
      name,
      ingredients: [], // Tu peux éventuellement ajouter des champs pour les ingrédients
      instructions: "", // Et des instructions
      image: image || require('@/assets/images/default-recette.jpg'), // Image par défaut si aucune donnée n'est fournie
      category,
      userName,
    };

    try {
      await addRecipe(newRecipe);
      Alert.alert("Succès", "Recette ajoutée avec succès !");
      navigation.goBack(); // Retourne à la page précédente après l'ajout
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'ajout de la recette.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom de la recette"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de l'utilisateur"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de l'image"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Catégorie"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Ajouter Recette" onPress={handleAddRecipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F3F3',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AddRecette;
