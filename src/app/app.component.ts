import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-Angular-ANA';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Navegación iniciada, scroll a la parte superior
        window.scrollTo(0, 0);
      }
    });
  }

  // Método para desplazar el scroll a la parte superior
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
