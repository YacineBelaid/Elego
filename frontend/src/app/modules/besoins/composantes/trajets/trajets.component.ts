import { Component, OnDestroy, OnInit } from '@angular/core';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faMapMarkerAlt,
  faMapPin,
  faLocationArrow,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  Itineraire,
  Periodicite,
  Type,
} from '../../interfaces/itineraire.interface';
import { Adresse, Lieu, TypeChargeur } from '../../interfaces/lieu.interface';
import { Trajet } from '../../interfaces/trajet.interface';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.css'],
})
export class TrajetsComponent implements OnInit, OnDestroy {
  faDotCircle = faDotCircle;
  faMapPin = faMapPin;
  faMapMarkerAlt = faMapMarkerAlt;
  faLocationArrow = faLocationArrow;
  faCircle = faCircle;

  itineraires: Array<Itineraire> = [];

  constructor() {}

  ngOnDestroy(): void {
    console.log('onDestroy Trajet Component');
  }

  ngOnInit(): void {
    console.log('onInit Trajets Component');
    this.buildMockedItinerary();
  }

  buildMockedItinerary(): void {
    const adresseMaison: Adresse = {
      adresse: '2627 Boulevard Lesvesque Est, Laval',
      requeteFaite: true,
      estValide: true,
    };

    const adresseUqam: Adresse = {
      adresse: '123 Rue Sherbrook Est, Montreal',
      requeteFaite: true,
      estValide: true,
    };

    const adresseGym: Adresse = {
      adresse: '456 Avenue Du Parc, Montreal',
      requeteFaite: true,
      estValide: true,
    };

    const maison: Lieu = {
      id: 'lieu-1',
      etiquette: 'Maison',
      chargeur: TypeChargeur.Regulier,
      adresse: adresseMaison,
      coordonnees: { longitude: 123456, latitude: 2345678 },
      estResidence: true,
    };

    const uqam: Lieu = {
      id: 'lieu-2',
      etiquette: 'UQAM',
      chargeur: TypeChargeur.Regulier,
      adresse: adresseUqam,
      coordonnees: { longitude: 123336, latitude: 2995678 },
      estResidence: false,
    };

    const gym: Lieu = {
      id: 'lieu-3',
      etiquette: 'GYM',
      chargeur: TypeChargeur.Regulier,
      adresse: adresseGym,
      coordonnees: { longitude: 123996, latitude: 2911678 },
      estResidence: false,
    };

    const trajetEcole: Trajet = {
      id: 'trajet-1',
      origine: maison,
      destination: uqam,
      heureDepart: 10,
      tempsADestination: 8,
    };

    const trajetGym: Trajet = {
      id: 'trajet-2',
      origine: uqam,
      destination: gym,
      heureDepart: 17,
      tempsADestination: 2,
    };

    const trajetRetour: Trajet = {
      id: 'trajet-3',
      origine: gym,
      destination: maison,
      heureDepart: 20,
      tempsADestination: null,
    };

    const itineraire1: Itineraire = {
      id: 'itinéraire-1',
      nom: 'Jour de semaine',
      trajets: [trajetEcole, trajetGym, trajetRetour],
      jour: null,
      periodicite: Periodicite.Hebdomadaire,
      frequence: 5,
      type: Type.Regulier,
      actif: true,
    };

    const itineraire2: Itineraire = {
      id: 'itinéraire-2',
      nom: 'Jour de semaine 2',
      trajets: [trajetEcole, trajetGym, trajetRetour, trajetGym],
      jour: null,
      periodicite: Periodicite.Hebdomadaire,
      frequence: 5,
      type: Type.Regulier,
      actif: true,
    };

    const itineraire3: Itineraire = {
      id: 'itinéraire-3',
      nom: 'Jour de semaine 3',
      trajets: [trajetEcole, trajetRetour],
      jour: null,
      periodicite: Periodicite.Hebdomadaire,
      frequence: 5,
      type: Type.Regulier,
      actif: true,
    };

    this.itineraires.push(itineraire1);
    this.itineraires.push(itineraire2);
    this.itineraires.push(itineraire3);
  }
}
