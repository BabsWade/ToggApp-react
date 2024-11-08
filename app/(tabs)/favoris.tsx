import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Recette } from '/types/Recette';

const Favoris: React.FC = () => {
  const navigation = useNavigation();
  const [favoris, setFavoris] = useState<Recette[]>([]);

  const recettesFictives: Recette[] = [
    {
      id: '1',
      name: 'Salade César',
      userName: 'Chef John',
      image: require('@/assets/images/entree-salade.jpg'),
      instructions: 'Mélanger la laitue romaine, le poulet grillé, les croûtons et la sauce César.',
    },
    {
      id: '2',
      name: 'Pizza Margherita',
      userName: 'Mama Mia',
      image: require('@/assets/images/entree-salade.jpg'), // Assurez-vous que le chemin est correct
      instructions: 'Etaler la pâte à pizza, ajouter la sauce tomate, la mozzarella et le basilic, puis cuire au four.',
    },
    {
      id: '3',
      name: 'Tiramisu',
      userName: 'Dolce Vita',
      image: require('@/assets/images/entree-salade.jpg'), // Assurez-vous que le chemin est correct
      instructions: 'Mélanger le mascarpone, le café et les biscuits, puis laisser refroidir.',
    },
  ];

  useEffect(() => {
    setFavoris(recettesFictives);
  }, []);

  const renderFavoriItem = ({ item }: { item: Recette }) => (
    <TouchableOpacity
      style={styles.favoriItem}
      onPress={() => navigation.navigate('AddRecetteScreen', { recette: item })} // Navigation vers DetailRecette
    >
      <Text style={styles.titrePlat}>{item.name}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.sectionTitle}>Ingrédients</Text>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text style={styles.description}>{item.instructions}</Text>
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
