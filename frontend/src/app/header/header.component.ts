import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showMenu = false;

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
    this.showMenu = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.showMenu = false;
  }
}
