import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Recette } from '@/types/Recette';

const DetailsRecette = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recette } = route.params; // Récupère la recette passée via la navigation
  const [recipes, setRecipes] = useState<Recette[]>([]); // État pour stocker les recettes
  const [currentRecette, setCurrentRecette] = useState<Recette | null>(recette); // Recette affichée

  // Charger les recettes depuis AsyncStorage
  const loadRecipes = async () => {
    const storedRecipes = await AsyncStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      setRecipes([]); // Pas de recettes stockées, initialiser avec une liste vide
    }
  };

  // Recharger les recettes à chaque fois que l'écran de détails devient actif
  useFocusEffect(
    React.useCallback(() => {
      loadRecipes();
    }, [])
  );

  // Gérer la suppression de la recette
  const handleDelete = async () => {
    Alert.alert(
      "Supprimer la recette",
      "Êtes-vous sûr de vouloir supprimer cette recette ?",
      [
        { text: "Annuler" },
        { text: "Supprimer", onPress: async () => {
          // Filtrer les recettes pour supprimer celle choisie
          const updatedRecipes = recipes.filter(recipe => recipe.id !== currentRecette?.id);
          setRecipes(updatedRecipes); // Mettre à jour l'état avec les recettes restantes
          await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Sauvegarder les recettes mises à jour
          navigation.goBack(); // Retourner à l'écran précédent après la suppression
        }} ,
      ]
    );
  };

  // Lorsque `recette` dans `route.params` change (mise à jour après modification dans l'écran d'édition), mettre à jour `currentRecette`
  useEffect(() => {
    if (recette) {
      setCurrentRecette(recette); // Mettre à jour la recette actuelle à partir de `route.params`
    }
  }, [recette]); // `recette` est une dépendance pour que l'effet s'exécute quand il change

  return (
    <View style={styles.containerMain}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Affichage du nom de la recette */}
        
        <View style={styles.containerImageTitre}>
        <Text style={styles.title}>{currentRecette?.name}</Text>
        <Image
        
          source={typeof currentRecette?.image === 'string' ? { uri: currentRecette?.image } : currentRecette?.image}
          style={styles.image}
        />
        </View>
        {/* Affichage de l'image de la recette */}
       

      <View style={styles.containerIngredient}>
          {/* Affichage des ingrédients */}
          <Text style={styles.subtitleIngredient}>Ingrédients</Text>
        <Text style={styles.textIngredient}>{currentRecette?.ingredients}</Text>
      </View>
        <View style={styles.containerInstruction}>
 {/* Affichage des instructions */}
 <Text style={styles.subtitle}>Instructions</Text>
        <Text style={styles.text}>{currentRecette?.instructions}</Text>
        </View>
       
<View style={styles.containerCategorie}>
 {/* Affichage de la catégorie */}
 <Text style={styles.subtitle}>Catégorie</Text>
        <Text style={styles.text}>{currentRecette?.category}</Text>
</View>
       

        {/* Retour à l'écran principal */}
        <View style={styles.buttonContainer}>
          <MaterialIcons
            name="arrow-back"
            size={30}
            color="#c92749"
            onPress={() => navigation.goBack()}
          />
        </View>
        
      </ScrollView>

      {/* Boutons en dehors du ScrollView */}
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.navigate('ModifierRecette', { recette: currentRecette })} // Passe la recette à l'écran d'édition
        >
          <Icon name="edit" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainerDelete}>
        <TouchableOpacity
          style={styles.roundButtonDelete}
          onPress={handleDelete} // Appel de la fonction de suppression
        >
          <Icon name="delete" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    containerImageTitre: {
    padding: 20,
  },
  containerInstruction: {
    padding: 20,
  },
  containerCategorie: {
    padding: 20,
  },
    containerIngredient: {
    backgroundColor: '#C92749',
   marginRight: 20,
   padding: 20,
   borderTopRightRadius: 30,
   borderBottomRightRadius: 30,
  },
  containerMain:{
    flex: 1,
  
    backgroundColor: '#F3F3F3',
  },
  scrollViewContent: {
    paddingBottom: 80, // Assurez-vous qu'il y a assez d'espace en bas pour les boutons
  },
  buttonContainer1: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    alignItems: 'flex-end',
  },
  buttonContainerDelete: {
    position: 'absolute',
    left: 15,
    bottom: 15,
    alignItems: 'flex-start',
  },
  roundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFB700',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  roundButtonDelete: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C92749', // Rouge pour la suppression
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#C92749',
  },
  subtitleIngredient: {
    fontSize: 18,
    fontWeight: 'bold',
    
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: '#494949',
    marginTop: 10,
  },
  textIngredient: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 15,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default DetailsRecette;
