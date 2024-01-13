import { Component, OnInit } from '@angular/core';
import {
  faWrench,
  faCar,
  faUserCog,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-accueil',
  templateUrl: './admin-accueil.component.html',
  styleUrls: ['./admin-accueil.component.css'],
})
export class AdminAccueilComponent implements OnInit {
  constructor() {}
  faWrench = faWrench;
  faCar = faCar;
  faUserCog = faUserCog;
  faComments = faComments;

  ngOnInit(): void {}
}
