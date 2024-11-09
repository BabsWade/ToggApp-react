import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recette } from '@/types/Recette';  // Assurez-vous que le type Recette est correctement importé

const Favoris: React.FC = () => {
  const navigation = useNavigation();
  const [favoris, setFavoris] = useState<Recette[]>([]);

  // Fonction pour charger les recettes favorites
  useEffect(() => {
    const loadFavoris = async () => {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      if (storedRecipes) {
        const allRecipes: Recette[] = JSON.parse(storedRecipes);
        // Filtrer les recettes favorites
        const favorisRecipes = allRecipes.filter(recipe => recipe.isFavoritets);
        setFavoris(favorisRecipes);
      }
    };

    loadFavoris();
  }, []); // Se lance au montage de l'écran

  const renderFavoriItem = ({ item }: { item: Recette }) => (
    <TouchableOpacity
      style={styles.favoriItem}
      onPress={() => navigation.navigate('AddRecetteScreen', { recette: item })} // Navigation vers l'écran de détails de la recette
    >
      <Text style={styles.titrePlat}>{item.name}</Text>
       {item.image ? (
      <Image source={{ uri: item.image }} style={styles.image} />
    ) : (
      <Text>Aucune image</Text>  // Si l'image n'est pas disponible
    )}
      
      <Text style={styles.sectionTitle}>Ingrédients</Text>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text style={styles.description}>{item.ingredients}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      {favoris.length > 0 ? (
        <FlatList
          data={favoris}
          renderItem={renderFavoriItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyMessage}>Aucun favoris trouvé.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriItem: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  titrePlat: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
  },
});

export default Favoris;
