import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Eleve } from '../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  eleve: Eleve | null = null;
  activeTab: string = 'info';
  isLoading: boolean = false;
  isEditing: boolean = false;
  originalEleve: Eleve | null = null;
  
  // Nouvelles propriétés pour améliorer l'UX
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  messageText: string = '';
  
  // Statistiques du profil
  profileStats = {
    completionPercentage: 0,
    lastUpdated: null as Date | null,
    totalCourses: 0,
    averageGrade: 0
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('📱 Profile Component - Initialisation...');
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;

    const userData = localStorage.getItem('user');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('👤 Utilisateur connecté depuis localStorage:', user);

        if (user && user.role === 'ELEVE') {
          this.http.get(`http://localhost:8080/api/eleve/profile/email/${user.email}`).subscribe({
            next: (profileData: any) => {
              console.log('✅ Profil récupéré depuis le backend:', profileData);
              
              this.eleve = {
                id: profileData.id,
                username: profileData.email,
                nom: profileData.nom,
                prenom: profileData.prenom,
                email: profileData.email,
                role: profileData.role.toLowerCase() as 'eleve',
                niveau: profileData.niveauScolaire || 'Terminale',
                classe: profileData.niveauEtude || 'S',
                niveauScolaire: profileData.niveauScolaire || 'Non défini',
                niveauEtude: profileData.niveauEtude || 'Non défini',
                parentId: profileData.parentId || undefined,
                datedenaissance: profileData.datedenaissance || undefined,
                sexe: profileData.sexe || undefined,
                adresse: profileData.adresse || undefined
              };

              // Sauvegarder une copie pour l'édition
              this.originalEleve = JSON.parse(JSON.stringify(this.eleve));
              
              // Calculer les statistiques
              this.calculateProfileStats();
              
              console.log('✅ Profil élève chargé avec les vraies données du backend:', this.eleve);
              this.isLoading = false;
            },
            error: (error) => {
              console.error('❌ Erreur lors de la récupération du profil depuis le backend:', error);
              
              // Fallback vers localStorage
                                 this.eleve = {
                     id: user.id,
                     username: user.email,
                     nom: user.nom,
                     prenom: user.prenom,
                     email: user.email,
                     role: user.role.toLowerCase() as 'eleve',
                     niveau: user.niveauScolaire || 'Terminale',
                     classe: user.niveauEtude || 'S',
                     niveauScolaire: user.niveauScolaire || 'Non défini',
                     niveauEtude: user.niveauEtude || 'Non défini',
                     parentId: user.parentId || undefined,
                     datedenaissance: user.datedenaissance || undefined,
                     sexe: user.sexe || undefined,
                     adresse: user.adresse || undefined
                   };
              
              this.originalEleve = { ...this.eleve };
              this.calculateProfileStats();
              
              console.log('✅ Profil élève chargé depuis localStorage (fallback):', this.eleve);
              this.isLoading = false;
            }
          });
        } else {
          console.log('❌ Utilisateur non trouvé ou mauvais rôle:', user);
          this.router.navigate(['/login']);
          this.isLoading = false;
        }
      } catch (error) {
        console.error('❌ Erreur lors du parsing des données utilisateur:', error);
        this.router.navigate(['/login']);
        this.isLoading = false;
      }
    } else {
      console.log('❌ Aucun utilisateur connecté trouvé');
      this.router.navigate(['/login']);
      this.isLoading = false;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    console.log('📑 Onglet actif:', tab);
  }

  getInitials(): string {
    if (!this.eleve) return '?';
    
    const prenom = this.eleve.prenom || '';
    const nom = this.eleve.nom || '';
    
    if (prenom && nom) {
      return (prenom.charAt(0) + nom.charAt(0)).toUpperCase();
    } else if (prenom) {
      return prenom.charAt(0).toUpperCase();
    } else if (nom) {
      return nom.charAt(0).toUpperCase();
    }
    
    return '?';
  }

  changePhoto(): void {
    console.log('📸 Changement de photo demandé');
    
    // Créer un input file caché
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log('📸 Fichier sélectionné:', file.name);
        this.showMessage('Photo sélectionnée ! Fonctionnalité de téléchargement à implémenter.', 'success');
      }
    };
    
    input.click();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      console.log('✏️ Mode édition activé');
    } else {
      console.log('✏️ Mode édition désactivé');
      // Restaurer les données originales si pas de sauvegarde
      if (this.originalEleve) {
        this.eleve = { ...this.originalEleve };
      }
    }
  }

  saveProfile(): void {
    if (!this.eleve) return;
    
    console.log('💾 Sauvegarde du profil:', this.eleve);
    this.isLoading = true;
    
    // Ici vous pourriez appeler le service pour sauvegarder
    // this.profileService.updateProfile(this.eleve).subscribe(...)
    
    // Simulation de sauvegarde
    setTimeout(() => {
      this.isLoading = false;
      this.isEditing = false;
      
      // Mettre à jour les données originales
      this.originalEleve = JSON.parse(JSON.stringify(this.eleve));
      
      // Mettre à jour les statistiques
      this.calculateProfileStats();
      
      this.showMessage('Profil sauvegardé avec succès !', 'success');
      console.log('✅ Profil sauvegardé');
    }, 1000);
  }

  cancelEdit(): void {
    if (this.originalEleve) {
      this.eleve = { ...this.originalEleve };
    }
    this.isEditing = false;
    console.log('❌ Édition annulée');
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.messageText = message;
    
    if (type === 'success') {
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
    } else {
      this.showSuccessMessage = false;
      this.showErrorMessage = true;
    }
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
    }, 3000);
  }

  calculateProfileStats(): void {
    if (!this.eleve) return;
    
    let completed = 0;
    let total = 9; // Augmenté pour inclure les nouveaux champs
    
    if (this.eleve.nom) completed++;
    if (this.eleve.prenom) completed++;
    if (this.eleve.email) completed++;
    if (this.eleve.datedenaissance) completed++;
    if (this.eleve.sexe) completed++;
    if (this.eleve.adresse) completed++;
    if (this.eleve.niveauScolaire && this.eleve.niveauScolaire !== 'Non défini') completed++;
    if (this.eleve.niveauEtude && this.eleve.niveauEtude !== 'Non défini') completed++;
    if (this.eleve.parentId) completed++;
    
    this.profileStats.completionPercentage = Math.round((completed / total) * 100);
    this.profileStats.lastUpdated = new Date();
    this.profileStats.totalCourses = this.eleve.niveau ? 1 : 0;
    this.profileStats.averageGrade = 85; // Exemple
  }

  getProfileCompletionColor(): string {
    const percentage = this.profileStats.completionPercentage;
    
    if (percentage >= 80) return '#28a745'; // Vert
    if (percentage >= 60) return '#ffc107'; // Jaune
    if (percentage >= 40) return '#fd7e14'; // Orange
    return '#dc3545'; // Rouge
  }

  getProfileCompletionText(): string {
    const percentage = this.profileStats.completionPercentage;
    
    if (percentage >= 80) return 'Excellent !';
    if (percentage >= 60) return 'Bien !';
    if (percentage >= 40) return 'À améliorer';
    return 'Incomplet';
  }

  // Getters pour le template
  get isProfileComplete(): boolean {
    if (!this.eleve) return false;
    
    return !!(
      this.eleve.nom &&
      this.eleve.prenom &&
      this.eleve.email &&
      this.eleve.datedenaissance &&
      this.eleve.sexe &&
      this.eleve.adresse &&
      this.eleve.niveauScolaire &&
      this.eleve.niveauScolaire !== 'Non défini'
    );
  }

  get hasUnsavedChanges(): boolean {
    if (!this.eleve || !this.originalEleve) return false;
    
    return JSON.stringify(this.eleve) !== JSON.stringify(this.originalEleve);
  }

  retourDashboard(): void {
    console.log('🚀 Retour au dashboard...');
    this.router.navigate(['/dashboard-eleve']);
  }
}
