import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recette } from '@/types/Recette';  // Assurez-vous que le type Recette est correctement importé

const Favoris: React.FC = () => {
  const navigation = useNavigation();
  const [favoris, setFavoris] = useState<Recette[]>([]);

  // Fonction pour charger les recipes favorites
  useEffect(() => {
    const loadFavoris = async () => {
      const storedRecette = await AsyncStorage.getItem('recipes');
      if (storedRecette) {
        const allRecette: Recette[] = JSON.parse(storedRecette);
        // Filtrer les recipes favorites
        const favorisRecette = allRecette.filter(recette => recette.isFavoritets);
        setFavoris(favorisRecette);
      }
    };

    loadFavoris();
  }, []); // Se lance au montage de l'écran

  const renderFavoriItem = ({ item }: { item: Recette }) => (
    <TouchableOpacity
      style={styles.favoriItem}
      onPress={() => navigation.navigate('DetailsRecette', { recette: item })} // Navigation vers l'écran de détails de la recette
    >
      <View style={styles.recipeDetails}>
   
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.image} />
    ) : (
      <Text>Aucune image</Text>  // Si l'image n'est pas disponible
    )}
     <Text style={styles.recipeName}>{item.name}</Text>
  </View>
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
    cardContainer: {
      flexDirection: 'row',           // Aligne l'image et le texte horizontalement
      alignItems: 'center',           // Centre verticalement les éléments
                         // Espacement interne de la carte
      backgroundColor: '#fff',        // Fond blanc
      borderRadius: 8,                // Coins arrondis
      marginBottom: 15,               // Espacement entre les cartes
    },
    recipeImage: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 10,              // Espacement entre l'image et le texte
    },
    recipeName: {
      fontWeight: 'bold',
    fontSize: 16,                    // Prend tout l'espace restant à droite de l'image
    },
    recipeDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginVertical: 0,
    },
   

  





  container: {
    flex: 1,
    padding: 25,
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
    padding: 5,
  },
  image: {
    width: 100,
      height: 100,
      borderRadius: 5,
      marginRight: 10,  
  },
  titrePlat: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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