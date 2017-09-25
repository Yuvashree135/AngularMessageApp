import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ AuthService ]
})

export class HeaderComponent {

  constructor( private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'signin'])
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }
}
