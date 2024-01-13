import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faRoute,
  faCalendar,
  faLocationArrow,
  faPlus,
  faBars,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gestion-trajets',
  templateUrl: './gestion-trajets.component.html',
  styleUrls: ['./gestion-trajets.component.css'],
})
export class GestionTrajetsComponent implements OnInit, OnDestroy {
  faRoute = faRoute;
  faCalendar = faCalendar;
  faLocationArrow = faLocationArrow;
  faPlus = faPlus;
  faBars = faBars;
  faAngleDown = faAngleDown;
  menuShow = false;
  openTab = 1;

  ngOnInit(): void {
    console.log('Init Gestion Trajet Component');
  }

  ngOnDestroy(): void {
    console.log('Destroy Gestion Trajet Component');
  }

  toggleNavbar() {
    this.menuShow = !this.menuShow;
  }

  toggleTabs(tabNumber: number) {
    console.log(tabNumber);
    this.openTab = tabNumber;
  }
}
