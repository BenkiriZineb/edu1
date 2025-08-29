import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthBackendService, LoginRequest } from '../services/auth-backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  role = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private authBackendService: AuthBackendService
  ) {}

  onSubmit() {
    if (!this.username || !this.password || !this.role) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Préparer les données de connexion
    const loginRequest: LoginRequest = {
      email: this.username,
      password: this.password,
      role: this.role.toUpperCase()
    };

    // Appeler le backend
    this.authBackendService.login(loginRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          // Connexion réussie
          console.log('Connexion réussie:', response);
          
          // Stocker les informations de l'utilisateur (optionnel)
          localStorage.setItem('user', JSON.stringify({
            id: response.id,
            nom: response.nom,
            prenom: response.prenom,
            email: response.email,
            role: response.role,
            token: response.token
          }));

          // Rediriger selon le rôle
          if (response.role === 'ELEVE') {
            this.router.navigate(['/dashboard-eleve']);
          } else if (response.role === 'PROFESSEUR') {
            this.router.navigate(['/dashboard-enseignant']);
          } else if (response.role === 'PARENT') {
            this.router.navigate(['/dashboard-parent']);
          } else if (response.role === 'ADMIN') {
            this.router.navigate(['/dashboard-admin']);
          }
        } else {
          // Connexion échouée
          this.errorMessage = response.message || 'Identifiants incorrects.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Erreur de connexion au serveur. Veuillez réessayer.';
      }
    });
  }

  // Méthodes pour faciliter les tests
  loginEleve() {
    this.username = 'test.eleve@example.com';
    this.password = '123456';
    this.role = 'eleve';
    this.onSubmit();
  }

  loginEnseignant() {
    this.username = 'prof1@example.com';
    this.password = 'password';
    this.role = 'enseignant';
  }

  loginParent() {
    this.username = 'parent1@example.com';
    this.password = 'password';
    this.role = 'parent';
  }
} 