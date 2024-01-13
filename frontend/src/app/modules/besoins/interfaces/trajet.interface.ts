import { Lieu } from './lieu.interface';

/*
 * etapes contient un minimum de 2 étapes (origine, destination) et typiquement
 * au moins un troisième lieu qui est le point de retour.
 */
export interface Trajet {
  id: string;
  origine: Lieu;
  destination: Lieu;
  heureDepart: number | null;
  tempsADestination: number | null;
}
