import SQLite from 'react-native-sqlite-storage';

// Ouvrir la base de données
const openDatabase = () => {
  return SQLite.openDatabase(
    { name: 'recipes.db', location: 'default' },
    () => console.log('Base de données ouverte avec succès'),
    (err) => console.log('Erreur lors de l\'ouverture de la base de données: ', err)
  );
};

// Créer la table et insérer des données fictives
export const initializeDatabase = () => {
  const db = openDatabase();

  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, nom_plat TEXT, cuisinier TEXT)',
      [],
      () => console.log('Table créée avec succès'),
      (err) => console.log('Erreur lors de la création de la table: ', err)
    );

    // Insertion des données fictives
    tx.executeSql(
      'INSERT INTO recipes (nom_plat, cuisinier) VALUES (?, ?), (?, ?), (?, ?)',
      ['Pizza Margherita', 'Chef Luigi', 'Tarte Tatin', 'Chef Pierre', 'Burger Royale', 'Chef Clara'],
      () => console.log('Données insérées avec succès'),
      (err) => console.log('Erreur lors de l\'insertion des données: ', err)
    );
  });

  return db;
};

// Fonction pour récupérer les recipes
export const getRecette = (callback) => {
  const db = openDatabase();

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM recipes',
      [],
      (tx, results) => {
        const recipes = [];
        for (let i = 0; i < results.rows.length; i++) {
          recipes.push(results.rows.item(i));
        }
        callback(recipes);
      },
      (err) => console.log('Erreur lors de la récupération des recipes: ', err)
    );
  });
};
