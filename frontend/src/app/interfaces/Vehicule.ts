/*export interface Vehicule {
  id: number;
  prixDeVente: number;
  dateDeSortie: string;
  marque: string;
  modele: string;
  categorie: string;
  type: string;
  autonomie: number;
  capaciteBatterie: number;
  puissanceMaxChargeur: number;
  tempsRecharge120V: number;
  nombreDePlaces: number;
  urlImage: string;
}*/

export interface Vehicule {
  vehicleId: number;
  price: number;
  year: string;
  brand: string;
  model: string;
  category: string;
  type: string;
  autonomy: number;
  batteryCapacity: number;
  maxChargingPower: number;
  chargingTime: number;
  seatsCount: number;
  imageUrl: string;
}
