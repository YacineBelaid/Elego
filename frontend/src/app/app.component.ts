import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider, transformer, fader, stepper } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader, slider, transformer, stepper],
})
export class AppComponent implements OnInit {
  title = 'SSVE';

  menuVisible = false;

  ngOnInit(): void {
    const importTE = async () => {
      await import('tw-elements');
    };
    importTE();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  onBurgerMenuClick() {
    let menu = document.querySelector('.menu_responsive');
    if (menu) {
      menu.classList.remove('invisible');
    }
  }

  onImageClick() {
    let menu = document.querySelector('.menu_responsive');
    if (menu) {
      menu.classList.add('invisible');
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
