import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recette } from '@/types/Recette';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';



type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
  
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recette[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tout');

  const additionalCategories = [
    { key: 'tout', title: 'Tout' },
    { key: 'entrée', title: 'Entrée' },
    { key: 'boissons', title: 'Boissons' },
    { key: 'fastfood', title: 'Fast-food' },
    { key: 'patisserie', title: 'Pâtisserie' },
  ];

  useEffect(() => {
    const loadRecipes = async () => {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      } else {
        const dummyRecipes: Recette[] = [
          {
            id: '1',
            name: 'Salade',
            userName: 'Khadoush delices',
            image: require('@/assets/images/entree-salade.jpg'),
            category: 'entrée',
            ingredients: ['Laitue romaine', 'Poulet', 'Croutons', 'Parmesan', 'Sauce César'],
            instructions: 'Mélanger tous les ingrédients dans un grand saladier.',
            isFavoritets: false,
          },
          {
            id: '2',
            name: 'Smoothie Tropical',
            userName: 'Khadoush delices',
            image: require('@/assets/images/smoothie.jpg'),
            category: 'boissons',
            ingredients: ['Banane', 'Mangue', 'Jus d\'orange', 'Yaourt'],
            instructions: 'Mixer tous les ingrédients jusqu\'à obtenir une consistance lisse.',
            isFavoritets: false,
          },
        ];
        setRecipes(dummyRecipes);
      }
    };

    loadRecipes();
  }, []);

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

  const filteredRecipes = recipes.filter(recette =>
    recette.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderRecipeItem = ({ item }: { item: Recette }) => (
    <ThemedView style={styles.recipeItem}>
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} />
      <View style={styles.recipeInfo}>
        <ThemedText style={styles.titrePlat}>{item.name}</ThemedText>
        <ThemedText>{item.userName}</ThemedText>
      </View>
      <TouchableOpacity
      onPress={() => navigation.navigate('RecetteDetails', { recette: item })} // Navigation vers la page des détails
    >
      <Icon name="info" size={24} color="blue" />
    </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
    
      <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </ThemedView>
  );

  const filteredCategoryRecipes = selectedCategory === 'tout'
    ? filteredRecipes
    : filteredRecipes.filter(recette => recette.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText style={styles.logoText}>ToggApp</ThemedText>
      </View>

      <ThemedView style={styles.mainContent}>
        <View style={styles.header}>
          <ThemedText style={styles.boldText}>{recipes.length} recettes</ThemedText>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une recette..."
          value={searchText}
          onChangeText={setSearchText}
        />
<View style={styles.categoriesTitre}>
          <ThemedText style={styles.boldText}>Catégories</ThemedText>
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

<View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.roundButton}
    onPress={() => navigation.navigate('Test')} // Redirige vers AddRecetteScreen
  >
    <Icon name="add" size={24} color="#ffffff" />
  </TouchableOpacity>
</View>

      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    position: 'absolute',
    right: 15,
    bottom: 15,
    alignItems: 'flex-end',
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
