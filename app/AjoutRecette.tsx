import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recette } from '@/types/Recette'; // Assurez-vous que le type Recette est bien défini
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation

const AjoutRecette = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const navigation = useNavigation(); // Utiliser le hook useNavigation

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert('Aucune image sélectionnée', 'Vous n\'avez pas sélectionné d\'image.');
    }
  };

  const handleSaveAndGoBack = async () => {
    // Validation des champs
    if (!name || !userName || !category || !ingredients || !instructions) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Crée une nouvelle recette
    const newRecipe: Recette = {
      id: Date.now().toString(),
      name,
      userName,
      image: imageUri,
      category,
      ingredients,
      instructions,
      isFavoritets: false,
    };

    // Récupère les recipes existantes depuis AsyncStorage
    const storedRecette = await AsyncStorage.getItem('recipes');
    const recipes = storedRecette ? JSON.parse(storedRecette) : [];
    recipes.push(newRecipe); // Ajoute la nouvelle recette à la liste
    await AsyncStorage.setItem('recipes', JSON.stringify(recipes)); // Sauvegarde les recipes mises à jour

    // Affiche un toast de succès
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Recette ajoutée !',
      text2: 'Votre recette a été ajoutée avec succès.',
      visibilityTime: 3000,
      autoHide: true,
    });

    // Réinitialise les champs
    setName('');
    setUserName('');
    setCategory('');
    setIngredients('');
    setInstructions('');
    setImageUri(null);

    // Naviguer en arrière
    navigation.goBack(); // Retour à l'écran précédent
  };

  return (
    <ScrollView style={styles.container}>
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
      
      {/* Affichage de l'image si une image a été sélectionnée */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      {/* Si l'image n'est pas encore sélectionnée, afficher le bouton de sélection d'image */}
      {!imageUri && (
        <TouchableOpacity style={styles.selectImage} onPress={pickImage}>
          <MaterialIcons name="image" size={100} color="#F3F3F3" />
          <Text style={styles.buttonTextImage}>Ajouter une image</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleSaveAndGoBack}>
        <Text style={styles.buttonText}>Ajouter la recette</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F3F3F3',
  },
  input: {
    height: 50,
    borderColor: '#c92749',
    borderWidth: 0.5,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  selectImage: {
    borderWidth: 0.5,
    borderColor: '#c92749',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#c92749',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextImage: {
    color: '#494949',
    fontSize: 14,
  },
});

export default AjoutRecette;
