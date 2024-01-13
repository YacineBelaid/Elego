import { Trajet } from './trajet.interface';

export enum Periodicite {
  Annuelle,
  Mensuelle,
  Hebdomadaire,
}

export enum Type {
  Regulier,
  Agenda,
  Import,
}

export enum Jours {
  Lundi,
  Mardi,
  Mercredi,
  Jeudi,
  Vendredi,
  Samedi,
  Dimanche,
}

/*
 * etapes contient un minimum de 2 étapes (origine, destination) et typiquement
 * au moins un troisième lieu qui est le point de retour.
 */
export interface Itineraire {
  id: string;
  nom: string;
  trajets: Array<Trajet>;
  jour: Jours | null;
  periodicite: Periodicite;
  frequence: number;
  type: Type;
  actif: boolean;
}
