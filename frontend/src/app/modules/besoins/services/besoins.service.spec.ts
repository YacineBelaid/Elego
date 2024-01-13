import { TestBed } from '@angular/core/testing';
import { LieuData, TypeChargeur } from '../interfaces/lieu.interface';

import { BesoinsService } from './besoins.service';

const DUMMY_LIEU: LieuData = {
  adresse: {
    adresse: 'Quelque part',
    estValide: true,
    requeteFaite: true,
  },
  chargeur: TypeChargeur.Aucun,
  coordonnees: {
    latitude: 0,
    longitude: 0,
  },
  estResidence: false,
  etiquette: null,
};
const UUID_REGEX =
  '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';

describe('BesoinsService', () => {
  let service: BesoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BesoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit new Lieu when added', () => {
    service.lieux$.subscribe((lieu) => {
      const { id, ...lieuData } = lieu;
      expect(id).toMatch(UUID_REGEX);
      expect(lieuData).toEqual(DUMMY_LIEU);
    });
    const returnValue = service.addLieu(DUMMY_LIEU);
    expect(returnValue).toMatch(UUID_REGEX);
  });
});
