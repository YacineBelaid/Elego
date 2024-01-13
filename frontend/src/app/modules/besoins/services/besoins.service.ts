import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Criteres } from '../interfaces/criteres.interface';
import { LieuData, Lieu } from '../interfaces/lieu.interface';
import { Trajet } from '../interfaces/trajet.interface';
import { v4 } from 'uuid';

const CRITERES_PAR_DEFAUT: Criteres = {
  budgetMin: 0,
  budgetMax: Infinity,
  nombreSieges: [],
  typeVehicule: [],
};

const INFINITY_MAGIC_NUMBER = 10000000000;

const CLE_BESOINS_CRITERES = 'besoins/criteres';
const CLE_BESOINS_LIEUX = 'besoins/lieux';
const CLE_BESOINS_TRAJETS = 'besoins/trajets';

@Injectable({
  providedIn: 'root',
})
export class BesoinsService {
  private criteres: Criteres;
  private lieux: Map<String, Lieu>;
  private trajets: Map<String, Trajet>;

  private sourceCriteres = new ReplaySubject<Criteres>();
  private sourceLieux = new ReplaySubject<Lieu>();
  private sourceTrajets = new ReplaySubject<Trajet>();

  public criteres$ = this.sourceCriteres.asObservable();
  public lieux$ = this.sourceLieux.asObservable();
  public trajets$ = this.sourceTrajets.asObservable();

  constructor() {
    const criteresJson = localStorage.getItem(CLE_BESOINS_CRITERES);
    const lieuxJson = localStorage.getItem(CLE_BESOINS_LIEUX);
    const trajetsJson = localStorage.getItem(CLE_BESOINS_TRAJETS);
    this.criteres = criteresJson
      ? JSON.parse(criteresJson)
      : CRITERES_PAR_DEFAUT;
    if (this.criteres.budgetMin === INFINITY_MAGIC_NUMBER) {
      this.criteres.budgetMin = Infinity;
    }
    if (this.criteres.budgetMax === INFINITY_MAGIC_NUMBER) {
      this.criteres.budgetMax = Infinity;
    }
    this.lieux = lieuxJson ? new Map(JSON.parse(lieuxJson)) : new Map();
    this.trajets = trajetsJson ? new Map(JSON.parse(trajetsJson)) : new Map();
    this.sourceCriteres.next(this.criteres);
    for (const entree of this.lieux) {
      this.sourceLieux.next(entree[1]);
    }
    for (const entree of this.trajets) {
      this.sourceTrajets.next(entree[1]);
    }
  }

  setCriteres(nouveauxCriteres: Criteres) {
    this.criteres = nouveauxCriteres;
    let criteresJson = { ...this.criteres };
    if (criteresJson.budgetMin === Infinity) {
      criteresJson.budgetMin = INFINITY_MAGIC_NUMBER;
    }
    if (criteresJson.budgetMax === Infinity) {
      criteresJson.budgetMax = INFINITY_MAGIC_NUMBER;
    }
    localStorage.setItem(CLE_BESOINS_CRITERES, JSON.stringify(criteresJson));
    this.sourceCriteres.next(this.criteres);
  }

  /**
   * Ajoute un lieu aux besoins à partir de ses données et retourne l'uuid de ce lieu.
   */
  addLieu(lieu: LieuData): string {
    let id: string;
    do {
      id = v4();
    } while (this.lieux.has(id));
    let nouveauLieu: Lieu = { id, ...lieu };
    this.lieux.set(nouveauLieu.id, nouveauLieu);
    this.sourceLieux.next(nouveauLieu);
    return id;
  }
}
