import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, TabBar } from 'react-native-tab-view';

interface Recette {
  id: string;
  name: string;
  category: string;
  image: string;
  userName: string;
}

interface ListeRecetteProps {
  navigation: any; // Peut être amélioré avec une type de navigation spécifique
}

const ListeRecette: React.FC<ListeRecetteProps> = ({ navigation }) => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'all', title: 'Toutes' },
    { key: 'entrées', title: 'Entrées' },
    { key: 'plats', title: 'Plats Principaux' },
    { key: 'desserts', title: 'Desserts' },
  ]);

  const fetchRecettes = async () => {
    const storedRecettes = await AsyncStorage.getItem('recettes');
    setRecettes(storedRecettes ? JSON.parse(storedRecettes) : []);
  };

  useEffect(() => {
    fetchRecettes();
  }, []);

  const filteredRecettes = recettes.filter(recette =>
    recette.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderScene = ({ route }: { route: { key: string } }) => {
    const categoryRecettes = route.key === 'all' 
      ? filteredRecettes 
      : filteredRecettes.filter(recette => recette.category === route.key);
    
    return (
      <FlatList
        data={categoryRecettes}
        renderItem={({ item }) => (
          <View style={styles.recetteItem}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailRecette', { recette: item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.recetteInfo}>
                <Text style={styles.recetteTitle}>{item.name}</Text>
                <Text style={styles.userName}>{item.userName}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalCount}>Total de recettes: {recettes.length}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une recette..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 400 }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue' }}
            style={{ backgroundColor: 'white' }}
          />
        )}
      />
      <Button title="Ajouter une recette" onPress={() => navigation.navigate('AjoutRecette')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  totalCount: {
    fontSize: 18,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recetteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  recetteInfo: {
    marginLeft: 10,
  },
  recetteTitle: {
    fontWeight: 'bold',
  },
  userName: {
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default ListeRecette;