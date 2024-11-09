import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Importation d'ImagePicker
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recette } from '@/types/Recette';

const AddRecetteScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState(''); // Description du plat
  const [imageUri, setImageUri] = useState<string | null>(null); // URI de l'image

  // Fonction pour ouvrir la galerie et sélectionner une image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);  // Mettre à jour l'URI de l'image sélectionnée
    }
  };

  const handleSave = async () => {
    if (!name || !userName || !category || !ingredients || !instructions || !description) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const newRecipe: Recette = {
      id: Date.now().toString(),
      name,
      userName,
      image: imageUri, // Utilisation de l'URI de l'image
      category,
      ingredients,
      instructions,
      isFavoritets: false,
    };

    const storedRecipes = await AsyncStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    recipes.push(newRecipe);
    await AsyncStorage.setItem('recipes', JSON.stringify(recipes));

    navigation.goBack();
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
        placeholder="Nom du cuisinier"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Catégorie"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrédients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
      />
      <TextInput
        style={styles.input}
        placeholder="Description du plat"
        value={description}
        onChangeText={setDescription}
      />

      {/* Affichage de l'image si sélectionnée */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      {/* Bouton pour sélectionner une image */}
      <Button title="Sélectionner une image" onPress={pickImage} />

      <Button title="Ajouter la recette" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default AddRecetteScreen;
