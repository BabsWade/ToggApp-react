import { Recette } from "./types/Recette";

export type RootStackParamList = {
    Home: undefined;
    RecetteDetailsScreen: { recette: Recette }; // Paramètre attendu pour RecetteDetails
    AjouterCategorie: undefined;
    // Autres routes...
  };
  