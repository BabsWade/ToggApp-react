import SQLite from 'react-native-sqlite-storage';
import { Recette } from './types/Recette';

const db = SQLite.openDatabase(
  {
    name: 'togg.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error("Erreur lors de l'ouverture de la base de données :", error);
  }
);

export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS recettes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ingredients TEXT, instructions TEXT, image TEXT, category TEXT, isFavoritets INTEGER, userName TEXT);'
    );
  });
};

export const getRecipes = (): Promise<Recette[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM recettes',
        [],
        (tx, results) => {
          const recipes: Recette[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            const item = results.rows.item(i);
            recipes.push({
              ...item,
              ingredients: item.ingredients ? JSON.parse(item.ingredients) : [], // Assurer un tableau par défaut
            });
          }
          resolve(recipes);
        },
        (tx, error) => {
          console.error("Erreur lors de la récupération des recettes :", error);
          reject(error);
        }
      );
    });
  });
};

export const addRecipe = (recipe: Recette): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO recettes (name, ingredients, instructions, image, category, isFavoritets, userName) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [recipe.name, JSON.stringify(recipe.ingredients), recipe.instructions, recipe.image, recipe.category, recipe.isFavoritets ? 1 : 0, recipe.userName],
        () => resolve(),
        (tx, error) => {
          console.error("Erreur lors de l'ajout de la recette :", error);
          reject(error);
        }
      );
    });
  });
};
