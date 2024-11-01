export interface Recette {
    id: string;
    name: string;
    ingredients: string[]; // Peut être vide par défaut
    instructions: string;
    image: string;
    category: string;
    isFavoritets: boolean;
    userName: string;
}
