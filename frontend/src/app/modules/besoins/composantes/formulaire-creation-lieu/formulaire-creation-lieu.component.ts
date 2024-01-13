import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BesoinsService } from '../../services/besoins.service';
import { TypeChargeur } from '../../interfaces/lieu.interface';

interface LieuCreationResult {
  success: boolean;
  id: string | null;
}

@Component({
  selector: 'app-formulaire-creation-lieu',
  templateUrl: './formulaire-creation-lieu.component.html',
  styleUrls: ['./formulaire-creation-lieu.component.css'],
})
export class FormulaireCreationLieuComponent {
  @ViewChild('formulaire') formulaire!: NgForm;
  @ViewChild('cancelButton') cancelButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;
  @Input() etiquette!: string;
  @Input() isResidence: boolean = false;
  @Input() adresse!: string;
  newPlaceId: string | null = null;

  @Output() placeCreated = new EventEmitter<LieuCreationResult>();

  onPlaceCreated(newId: string | null) {
    this.newPlaceId = newId;
  }

  constructor(private besoins: BesoinsService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Le formulaire est valide');
      const etiquette = form.value.etiquette;
      const isResidence = form.value.isResidence;
      const adresse = form.value.adresse;

      const newId = this.besoins.addLieu({
        etiquette: etiquette,
        chargeur: TypeChargeur.Aucun,
        adresse: {
          adresse: adresse,
          requeteFaite: true,
          estValide: true,
        },
        coordonnees: {
          longitude: 0,
          latitude: 0,
        },
        estResidence: isResidence,
      });
      // Émettre l'événement de sortie avec l'ID du nouveau lieu créé
      this.placeCreated.emit({ success: true, id: newId });
    } else {
      console.log('Le formulaire est invalide');
    }
  }

  onCancel() {
    // Émettre un événement pour indiquer l'annulation de la création du lieu
    this.placeCreated.emit({ success: false, id: null });
  }
}
