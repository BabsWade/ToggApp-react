import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recette } from '@/types/Recette';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '@/types';
import { useFocusEffect } from '@react-navigation/native';

// Typage des props de navigation
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recette[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tout');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const additionalCategories = [
    { key: 'tout', title: 'Tout' },
    { key: 'entrée', title: 'Entrée' },
    { key: 'boissons', title: 'Boissons' },
    { key: 'fastfood', title: 'Fast-food' },
    { key: 'patisserie', title: 'Pâtisserie' },
  ];

  // Chargement des recettes depuis AsyncStorage
  const loadRecipes = async () => {
    const storedRecipes = await AsyncStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      const dummyRecipes: Recette[] = [
        {
          id: '1',
          name: 'Salade',
          userName: 'User',
          image: require('@/assets/images/entree-salade.jpg'),
          category: 'entrée',
          ingredients: 'Laitue, tomates, oignon',
          instructions: 'Mélangez tous les ingrédients',
          isFavoritets: false,
        },
      ];
      setRecipes(dummyRecipes);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // Utiliser useFocusEffect pour rafraîchir la liste quand l'écran devient actif
  useFocusEffect(
    React.useCallback(() => {
      loadRecipes(); // Recharger les recettes à chaque fois que l'écran devient actif
    }, [])
  );

  // Gérer le like d'une recette
  const likeRecipe = async (id: string) => {
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.id === id) {
        return { ...recipe, isFavoritets: !recipe.isFavoritets }; // Toggle the favorite status
      }
      return recipe;
    });

    setRecipes(updatedRecipes);
    await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));  // Met à jour le stockage
  };

  // Gérer la suppression d'une recette
  const deleteRecipe = async (id: string) => {
    Alert.alert(
      "Supprimer la recette",
      "Êtes-vous sûr de vouloir supprimer cette recette ?",
      [
        { text: "Annuler" },
        { text: "Supprimer", onPress: async () => {
          const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
          setRecipes(updatedRecipes);
          await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        }},
      ]
    );
  };

  // Filtrer les recettes en fonction du texte de recherche
  const filteredRecipes = recipes.filter(recette =>
    recette.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Filtrer les recettes par catégorie
  const filteredCategoryRecipes = selectedCategory === 'tout'
    ? filteredRecipes
    : filteredRecipes.filter(recette => recette.category === selectedCategory);

  const renderRecipeItem = ({ item }: { item: Recette }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailsRecetteScreen', { recette: item })}>
      <ThemedView style={styles.cardContainer}>
        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cardImage} />
        <View style={styles.titleContainer}>
          <ThemedText style={styles.titleText}>{item.name}</ThemedText>
        </View>
        <View style={styles.ingredientsContainer}>
          <ThemedText style={styles.ingredientsText}>{item.ingredients}</ThemedText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('EditRecetteScreen', { recette: item })} style={styles.button}>
            <Icon name="edit" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteRecipe(item.id)} style={styles.button}>
            <Icon name="delete" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => likeRecipe(item.id)} style={styles.button}>
            <Icon name="thumb-up" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText style={styles.logoText}>TOGG</ThemedText>
      </View>

      <ThemedView style={styles.mainContent}>
        <View style={styles.header}>
          <ThemedText style={styles.titreText}>{recipes.length} Recettes</ThemedText>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une recette..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <View style={styles.categoriesTitre}>
          <ThemedText style={styles.titreText}>Catégories</ThemedText>
        </View>
        <View style={styles.additionalCategoriesContainer}>
          <FlatList
            data={additionalCategories}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategory === item.key && styles.activeCategoryButton]}
                onPress={() => setSelectedCategory(item.key)}
              >
                <ThemedText 
                  style={[styles.categoryButtonText, selectedCategory === item.key && styles.activeCategoryButtonText]}
                >
                  {item.title}
                </ThemedText>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>

        <FlatList
          data={filteredCategoryRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.buttonContainer1}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('AddRecetteScreen')} // Naviguer vers l'écran d'ajout de recette
          >
            <Icon name="add" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
 paddingBottom: 10, // Assure qu'il y ait un espace en bas pour les boutons
  },

  titreText:{
fontSize: 16,
fontWeight: 800,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    alignSelf: 'flex-start',  // Cette ligne garantit que le container s'ajuste au contenu
    backgroundColor: '#c92749', 
    borderRadius: 10,
    marginTop: -20, // Pour rapprocher le titre de l'image si nécessaire
    marginLeft: 10, // Espacement sur la gauche
  },
  titleText: {
    fontSize: 18,
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  ingredientsContainer: {
    padding: 10,
  },
  ingredientsText:{
fontSize: 12,
  },
  buttonContainer1: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    alignItems: 'flex-end',
  },
  button: {
    padding: 5,
    backgroundColor: '#ff4081', // Pink button background
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  logoContainer: {
    backgroundColor: '#c92749', 
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 20,
    width: '100%', 
    marginTop: 30,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  logoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24, 
    flexGrow: 1, 
    alignSelf: 'flex-start'
  },
  mainContent: {
    flex: 1, 
    padding: 15,
    backgroundColor: '#F3F3F3',
  },
  header: {
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  recipeInfo: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',         // Aligne les boutons horizontalement
    justifyContent: 'space-between', // Espace les boutons de manière égale
    alignItems: 'center',         // Centre les boutons verticalement
    paddingHorizontal: 20,        // Espace les boutons à gauche et à droite
    paddingVertical: 10,          // Espace les boutons par rapport aux ingrédients
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
   
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
  additionalCategoriesContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  categoryButton: {
    borderWidth: 0,
    borderColor: '#c92749',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#a9203b',
    color: '#ffffff',
  },
  activeCategoryButtonText: {
    color: '#ffffff',
  },
  categoryButtonText: {
    color: '#C92749',
    textAlign: 'center',
    fontSize: 14,
  },
  categoriesTitre: {
    marginBottom: 0,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titrePlat: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default HomeScreen;
