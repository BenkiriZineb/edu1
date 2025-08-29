import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveProfileService, ProfileEleveDTO } from './eleve-profile.service';

@Component({
  selector: 'app-eleve-profile',
  template: `
    <div class="profile-container" *ngIf="profile">
      <div class="profile-header">
        <h1>Profil de l'Élève</h1>
        <div class="profile-avatar">
          <img [src]="profile.photo || 'assets/default-avatar.png'" alt="Photo de profil">
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h2>Informations Personnelles</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Nom :</label>
              <span>{{ profile.nom }}</span>
            </div>
            <div class="info-item">
              <label>Prénom :</label>
              <span>{{ profile.prenom }}</span>
            </div>
            <div class="info-item">
              <label>Email :</label>
              <span>{{ profile.email }}</span>
            </div>
            <div class="info-item">
              <label>Date de naissance :</label>
              <span>{{ profile.datedenaissance | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="info-item">
              <label>Sexe :</label>
              <span>{{ profile.sexe === 'M' ? 'Masculin' : 'Féminin' }}</span>
            </div>
            <div class="info-item">
              <label>Adresse :</label>
              <span>{{ profile.adresse }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2>Informations Académiques</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Cours :</label>
              <span>{{ profile.coursNom || 'Non assigné' }}</span>
            </div>
            <div class="info-item">
              <label>Niveau scolaire :</label>
              <span>{{ profile.niveauScolaire || 'Non défini' }}</span>
            </div>
            <div class="info-item">
              <label>Matières :</label>
              <span>{{ profile.matieres || 'Aucune matière assignée' }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2>Informations Familiales</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Parent :</label>
              <span>{{ profile.parentNom || 'Non défini' }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2>Statut</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Rôle :</label>
              <span>{{ profile.role }}</span>
            </div>
            <div class="info-item">
              <label>Statut :</label>
              <span [class]="profile.actif ? 'status-active' : 'status-inactive'">
                {{ profile.actif ? 'Actif' : 'Inactif' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn btn-primary" (click)="editProfile()">
          <i class="fas fa-edit"></i> Modifier le profil
        </button>
        <button class="btn btn-secondary" (click)="goBack()">
          <i class="fas fa-arrow-left"></i> Retour
        </button>
      </div>
    </div>

    <div class="loading" *ngIf="loading">
      <div class="spinner"></div>
      <p>Chargement du profil...</p>
    </div>

    <div class="error" *ngIf="error">
      <h3>Erreur</h3>
      <p>{{ error }}</p>
      <button class="btn btn-primary" (click)="retry()">Réessayer</button>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .profile-header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }

    .profile-avatar img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #007bff;
    }

    .profile-section {
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .profile-section h2 {
      color: #333;
      margin-bottom: 15px;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 10px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-item label {
      font-weight: bold;
      color: #666;
      margin-bottom: 5px;
    }

    .info-item span {
      color: #333;
      padding: 8px;
      background: white;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }

    .status-active {
      color: #28a745;
      font-weight: bold;
    }

    .status-inactive {
      color: #dc3545;
      font-weight: bold;
    }

    .profile-actions {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #f0f0f0;
    }

    .btn {
      padding: 10px 20px;
      margin: 0 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    .loading, .error {
      text-align: center;
      padding: 40px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class EleveProfileComponent implements OnInit {
  profile: ProfileEleveDTO | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eleveProfileService: EleveProfileService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = null;

    // Récupérer l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.eleveProfileService.getProfileById(+id).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement du profil: ' + err.message;
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID de l\'élève non fourni';
      this.loading = false;
    }
  }

  editProfile(): void {
    // Navigation vers la page d'édition
    console.log('Navigation vers l\'édition du profil');
  }

  goBack(): void {
    // Navigation retour
    console.log('Navigation retour');
  }

  retry(): void {
    this.loadProfile();
  }
}
