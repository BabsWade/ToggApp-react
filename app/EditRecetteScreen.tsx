import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Recette } from '@/types/Recette';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const EditRecetteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recette } = route.params;

  const [name, setName] = useState(recette.name);
  const [ingredients, setIngredients] = useState(recette.ingredients);
  const [instructions, setInstructions] = useState(recette.instructions);
  const [category, setCategory] = useState(recette.category);
  const [image, setImage] = useState(recette.image); // Image à éditer ou à ajouter
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Demande d'accès à la galerie et sélection d'une image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Stocke l'URI de l'image
    } else {
      Alert.alert('Aucune image sélectionnée', 'Vous n\'avez pas sélectionné d\'image.');
    }
  };

  useEffect(() => {
    if (!recette) {
      navigation.goBack(); // Si aucune recette n'est passée, on revient à l'écran précédent
    }
  }, [recette]);

  const saveRecipe = async () => {
    if (!name || !ingredients || !instructions || !category) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    const updatedRecipe: Recette = {
      ...recette,
      name,
      ingredients,
      instructions,
      category,
      image: imageUri || image, // Sauvegarde l'image sélectionnée ou l'image d'origine
    };

    const storedRecipes = await AsyncStorage.getItem('recipes');
    let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    const index = recipes.findIndex((r: Recette) => r.id === recette.id);
    if (index > -1) {
      recipes[index] = updatedRecipe; // Met à jour la recette
      await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
      navigation.goBack(); // Retourne à l'écran principal après la sauvegarde
    } else {
      Alert.alert("Erreur", "Recette non trouvée.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Champ pour le nom de la recette */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom de la recette"
      />

      {/* Champ pour les ingrédients */}
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Ingrédients"
      />

      {/* Champ pour les instructions */}
      <TextInput
        style={styles.input}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Instructions"
      />

      {/* Champ pour la catégorie */}
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Catégorie"
      />

      {/* Prévisualisation de l'image sélectionnée */}
      {(imageUri || image) && (
        <Image
          source={{ uri: imageUri || (typeof image === 'string' ? image : image.uri) }}
          style={styles.imagePreview}
        />
      )}

      {/* Bouton pour sélectionner une nouvelle image */}
      <TouchableOpacity style={styles.selectImage} onPress={pickImage}>
        <MaterialIcons name="image" size={100} color="#F3F3F3" />
        <Text style={styles.buttonTextImage}>
          {imageUri || image ? 'Modifier l\'image' : 'Ajouter une image'}
        </Text>
      </TouchableOpacity>

      {/* Bouton pour enregistrer la recette */}
      <TouchableOpacity style={styles.addButton} onPress={saveRecipe}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
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
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'cover',
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

export default EditRecetteScreen;
