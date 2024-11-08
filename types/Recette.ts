export type ImageSource = string | { uri: string } | number; // Pour gérer les URL et les images locales
export interface Recette {
    id: string;
    name: string;
    ingredients: string; // Optionnel
    instructions: string; // Optionnel
    image: any; // Utilisation du type défini
    category: string;
    isFavoritets?: boolean; // Optionnel
    userName: string;
    description: string;
}
