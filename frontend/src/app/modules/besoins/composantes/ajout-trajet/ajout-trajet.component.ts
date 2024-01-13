import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus, faBusinessTime } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ajout-trajet',
  templateUrl: './ajout-trajet.component.html',
  styleUrls: ['./ajout-trajet.component.css'],
})
export class AjoutTrajetComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faBusinessTime = faBusinessTime;

  ngOnInit(): void {
    console.log('Init AjoutTrajetComponent');
  }

  ngOnDestroy(): void {
    console.log('Destroy AjoutTrajetComponent');
  }
}
