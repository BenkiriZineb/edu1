import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.username || !this.password || !this.role) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // Pour la démo, on utilise des identifiants simples
    const success = this.authService.login(this.username, this.password, this.role);
    
    if (success) {
      this.errorMessage = '';
      if (this.role === 'eleve') {
        this.router.navigate(['/dashboard-eleve']);
      } else if (this.role === 'enseignant') {
        this.router.navigate(['/dashboard-enseignant']);
      } else if (this.role === 'parent') {
        this.router.navigate(['/dashboard-parent']);
      }
    } else {
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    }
  }

  // Méthodes pour faciliter les tests
  loginEleve() {
    this.username = 'eleve1';
    this.password = 'password';
    this.role = 'eleve';
    this.onSubmit();
  }

  loginEnseignant() {
    this.username = 'prof1';
    this.password = 'password';
    this.role = 'enseignant';
    this.onSubmit();
  }

  loginParent() {
    this.username = 'parent1';
    this.password = 'password';
    this.role = 'parent';
    this.onSubmit();
  }
} 