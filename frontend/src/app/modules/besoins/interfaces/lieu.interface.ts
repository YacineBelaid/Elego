export enum TypeChargeur {
  Aucun,
  Regulier, // 120v
  Rapide, // 240v
  // autres, potentiellement
}
// Ces valeurs proviendront d'un API, pas besoin de valider
export interface Coordonnees {
  longitude: number;
  latitude: number;
}

export interface Adresse {
  adresse: string; // Seule une chaîne correspondant à une adresse de rue valide peut être persistée, pas d'autre validation requise.
  requeteFaite: boolean; // Requête d'auto-complétion en cours
  estValide: boolean; // La chaîne correspond à un choix valide d'auto-complétion
}

export interface LieuData {
  etiquette: string | null;
  chargeur: TypeChargeur;
  adresse: Adresse | null;
  coordonnees: Coordonnees | null;
  estResidence: boolean;
}

// Note: On refuse de créer un Lieu pour une adresse invalide, mais une adresse
// n'est pas nécessaire si on choisi un point sur la carte
export interface Lieu extends LieuData {
  id: string;
}