import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbarAdmin.component.html',
  styleUrls: ['./navbarAdmin.component.css']
})
export class NavbarAdminComponent {
  // Propriétés pour gérer l'état du menu mobile (optionnel)
  isMobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Gère la déconnexion de l'utilisateur
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Basculer le menu mobile (optionnel)
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Vérifie si la route actuelle est la route principale de l'admin
   */
  isAdminHome(): boolean {
    return this.router.url === '/admin/home';
  }
}