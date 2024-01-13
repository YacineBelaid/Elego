import { Criteres } from './criteres.interface';
import { Itineraire } from './itineraire.interface';
import { Lieu } from './lieu.interface';

/*
 * Note: L'interface ne devrait pas permettre une combinaison de besoins qui ne
 * correspond à aucun véhicule
 */
export interface Besoins {
  criteres: Criteres;
  lieux: Map<String, Lieu>; // Ignorez les types de collections
  itineraires: Map<String, Itineraire>;
}
