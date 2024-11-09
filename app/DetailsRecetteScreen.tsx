import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Recette } from '@/types/Recette';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DetailsRecetteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recette } = route.params; // Récupère la recette passée via la navigation

  useEffect(() => {
    if (!recette) {
      navigation.goBack(); // Si aucune recette n'est passée, on retourne à l'écran précédent
    }
  }, [recette]);

  return (
    <ScrollView style={styles.container}>
      {/* Affichage du nom de la recette */}
      <Text style={styles.title}>{recette?.name}</Text>

      {/* Affichage de l'image de la recette */}
      <Image
        source={typeof recette.image === 'string' ? { uri: recette.image } : recette.image}
        style={styles.image}
      />

      {/* Affichage des ingrédients */}
      <Text style={styles.subtitle}>Ingrédients</Text>
      <Text style={styles.text}>{recette?.ingredients}</Text>

      {/* Affichage des instructions */}
      <Text style={styles.subtitle}>Instructions</Text>
      <Text style={styles.text}>{recette?.instructions}</Text>

      {/* Affichage de la catégorie */}
      <Text style={styles.subtitle}>Catégorie</Text>
      <Text style={styles.text}>{recette?.category}</Text>

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
    color: '#c92749',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#494949',
  },
  text: {
    fontSize: 16,
    color: '#494949',
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

export default DetailsRecetteScreen;
