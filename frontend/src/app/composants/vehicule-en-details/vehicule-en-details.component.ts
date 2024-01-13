import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-vehicule-en-details',
  templateUrl: './vehicule-en-details.component.html',
  styleUrls: ['./vehicule-en-details.component.css'],
})
export class VehiculeEnDetailsComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Aujourd\'hui',
      '5 ans',
      '10 ans'
    ],
    datasets: [
      {
        data: [ 10, 20, 30 ],
        label: 'Véhicule électrique',
        fill: true,
        tension: 0.5,
        borderColor: '#3cca5c',
        backgroundColor: 'rgba(0,255,0,0.3)',
        pointBackgroundColor: 'rgba(0,255,0,0.3)'
      },
      {
        data: [ 0, 25, 50],
        label: 'Véhicule à essence',
        fill: true,
        tension: 0.5,
        borderColor: '#FFD174',
        backgroundColor: 'rgba(255, 209, 116,0.3)',
        pointBackgroundColor: '#FFD174'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
  };
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Véhicule électrique', backgroundColor: 'rgba(0,255,0,0.3)', borderColor: '#3cca5c',  pointBackgroundColor: 'rgba(0,255,0,0.3)'  },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Véhicule à essence' , borderColor: '#FFD174',backgroundColor: 'rgba(255, 209, 116,0.3)', pointBackgroundColor: '#FFD174' }
  ];


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Aujourd\'hui', '+1 an', '+2 ans', '+3 ans', '+4 ans', '+5 ans' ],
    datasets: [
      { data: [ 0, 20, 40, 60, 80, 100, 120 ], label: 'Véhicule électrique', backgroundColor: 'rgba(0,255,0,0.3)' },
      { data: [ 0, 40, 80, 120, 140, 160, 200 ], label: 'Véhicule à essence', backgroundColor: 'rgba(255, 209, 116,0.8)', }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {
  }

  ngOnInit() {
  }
}
