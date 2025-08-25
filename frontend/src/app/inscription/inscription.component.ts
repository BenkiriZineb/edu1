import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    role: '',
    sexe: '',
    datedenaissance: '',
    adresse: ''
  };

  // Données spécifiques par rôle
  eleveData = {
    niveauScolaire: '',
    parentId: undefined as number | undefined
  };

  parentData = {
    nbr_enfant: 0
  };

  professeurData = {
    matieresEnseignees: [] as string[]
  };

  // Listes de données
  niveauxScolaires: string[] = [
    'CP', 'CE1', 'CE2', 'CM1', 'CM2',
    '6ème', '5ème', '4ème', '3ème',
    'Seconde', 'Première', 'Terminale'
  ];

  listeMatieres: string[] = [
    'Mathématiques', 'Français', 'Histoire-Géographie',
    'Sciences', 'Anglais', 'EPS', 'Arts plastiques'
  ];

  // Options pour les selects
  roles = [
    {value: 'ELEVE', label: 'Élève'},
    {value: 'PARENT', label: 'Parent'},
    {value: 'PROFESSEUR', label: 'Professeur'}
  ];

  sexes = [
    {value: 'M', label: 'Masculin'},
    {value: 'F', label: 'Féminin'},
    {value: 'AUTRE', label: 'Autre'}
  ];

  // États du formulaire
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  onRoleChange(): void {
    // Réinitialiser les données spécifiques au rôle
    this.eleveData = { niveauScolaire: '', parentId: undefined };
    this.parentData = { nbr_enfant: 0 };
    this.professeurData = { matieresEnseignees: [] };
    
    // Effacer les messages
    this.errorMessage = '';
    this.successMessage = '';
  }

  onMatiereChange(matiere: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    
    if (isChecked) {
      if (!this.professeurData.matieresEnseignees.includes(matiere)) {
        this.professeurData.matieresEnseignees.push(matiere);
      }
    } else {
      const index = this.professeurData.matieresEnseignees.indexOf(matiere);
      if (index > -1) {
        this.professeurData.matieresEnseignees.splice(index, 1);
      }
    }
  }

  get hasSelectedMatieres(): boolean {
    return this.utilisateur.role !== 'PROFESSEUR' || 
           this.professeurData.matieresEnseignees.length > 0;
  }

  isFormValid(): boolean {
    // Validation de base - tous les champs communs requis
    if (!this.utilisateur.nom || !this.utilisateur.prenom || 
        !this.utilisateur.email || !this.utilisateur.mdp || 
        !this.utilisateur.role || !this.utilisateur.sexe ||
        !this.utilisateur.datedenaissance || !this.utilisateur.adresse) {
      return false;
    }

    // Validation du mot de passe (minimum 6 caractères)
    if (this.utilisateur.mdp.length < 6) {
      return false;
    }

    // Validation spécifique par rôle
    switch (this.utilisateur.role) {
      case 'ELEVE':
        return !!this.eleveData.niveauScolaire;
      
      case 'PARENT':
        return this.parentData.nbr_enfant > 0;
      
      case 'PROFESSEUR':
        return this.professeurData.matieresEnseignees.length > 0;
      
      default:
        return false;
    }
  }

  // Méthode pour nettoyer les données avant envoi
  private cleanUserData(): any {
    const baseData = {
      nom: this.utilisateur.nom,
      prenom: this.utilisateur.prenom,
      email: this.utilisateur.email,
      mdp: this.utilisateur.mdp,
      role: this.utilisateur.role,
      sexe: this.utilisateur.sexe,
     /// datedenaissance: this.utilisateur.datedenaissance,
     datedenaissance: new Date(this.utilisateur.datedenaissance).toISOString().split('T')[0],
      adresse: this.utilisateur.adresse.trim()
    };

    // Ajouter seulement les données pertinentes selon le rôle
    switch (this.utilisateur.role) {
      case 'ELEVE':
        return {
          ...baseData,
          niveauScolaire: this.eleveData.niveauScolaire,
          ...(this.eleveData.parentId && { parentId: this.eleveData.parentId })
        };
      
      case 'PARENT':
        return {
          ...baseData,
          nbr_enfant: this.parentData.nbr_enfant
        };
      
      case 'PROFESSEUR':
        return {
          ...baseData,
          matieresEnseignees: this.professeurData.matieresEnseignees
        };
      
      default:
        return baseData;
    }
  }

  onSubmit() {
    // 🔍 DÉBOGAGE AVANT ENVOI
    console.log('=== DÉBUT INSCRIPTION ===');
    console.log('Utilisateur brut:', this.utilisateur);
    console.log('Sexe sélectionné:', this.utilisateur.sexe);
    console.log('Date de naissance:', this.utilisateur.datedenaissance);
    console.log('Adresse:', this.utilisateur.adresse);
    
    // ✅ Validation avec notre méthode personnalisée
    if (!this.isFormValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires selon votre rôle.';
      this.successMessage = '';
      console.log('❌ Validation échouée');
      console.log('Champs manquants:');
      console.log('- Nom:', this.utilisateur.nom ? '✅' : '❌');
      console.log('- Prénom:', this.utilisateur.prenom ? '✅' : '❌');
      console.log('- Email:', this.utilisateur.email ? '✅' : '❌');
      console.log('- Mot de passe:', this.utilisateur.mdp ? '✅' : '❌');
      console.log('- Rôle:', this.utilisateur.role ? '✅' : '❌');
      console.log('- Sexe:', this.utilisateur.sexe ? '✅' : '❌');
      console.log('- Date de naissance:', this.utilisateur.datedenaissance ? '✅' : '❌');
      console.log('- Adresse:', this.utilisateur.adresse ? '✅' : '❌');
      return;
    }

    // Nettoyer les données selon le rôle
    const userData = this.cleanUserData();
    console.log('Données nettoyées à envoyer:', userData);
    console.log('Sexe dans les données nettoyées:', userData.sexe);
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const apiUrl = 'http://localhost:8080/api/inscription/inscription';
    console.log('URL appelée:', apiUrl);
    
    this.http.post(apiUrl, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('✅ SUCCÈS - Réponse complète:', response);
        console.log('✅ Utilisateur enregistré avec ID:', response.id);
        console.log('✅ Sexe dans la réponse:', response.sexe);
        
        // Message de succès détaillé selon le rôle
        const roleMessages = {
          'ELEVE': 'Compte élève créé avec succès ! Vous pouvez maintenant accéder à vos cours.',
          'PARENT': 'Compte parent créé avec succès ! Vous pouvez maintenant suivre le parcours de vos enfants.',
          'PROFESSEUR': 'Compte professeur créé avec succès ! Vous pouvez maintenant gérer vos classes et matières.'
        };
        
        this.successMessage = roleMessages[this.utilisateur.role as keyof typeof roleMessages] || 
                             'Compte créé avec succès ! Vous pouvez maintenant vous connecter.';
        
        if (response.id) {
          this.successMessage += ` (ID: ${response.id})`;
        }
        
        this.resetForm();
      },
      error: (error: any) => {
        this.isLoading = false;
        
        // 🔍 DÉBOGAGE DÉTAILLÉ DE L'ERREUR
        console.error('❌ ERREUR COMPLÈTE:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ Status Text:', error.statusText);
        console.error('❌ Error Body:', error.error);
        console.error('❌ Message:', error.message);
        
        if (error.status === 0) {
          this.errorMessage = 'Serveur Spring Boot non accessible ! Vérifiez qu\'il tourne sur le port 8080';
        } else if (error.status === 404) {
          this.errorMessage = 'Endpoint non trouvé ! Vérifiez l\'URL: ' + apiUrl;
        } else if (error.status === 400) {
          this.errorMessage = 'Données invalides: ' + (error.error?.message || error.error || 'Format incorrect');
        } else if (error.status === 500) {
          this.errorMessage = 'Erreur serveur: ' + (error.error?.message || error.error || 'Erreur interne du serveur');
        } else if (error.status === 409) {
          this.errorMessage = 'Un compte avec cet email existe déjà.';
        } else {
          this.errorMessage = `Erreur ${error.status}: ${error.error?.message || error.error || error.message}`;
        }
      }
    });
  }

  resetForm() {
    this.utilisateur = {
      nom: '',
      prenom: '',
      email: '',
      mdp: '',
      role: '',
      sexe: '',
      datedenaissance: '',
      adresse: ''
    };
    this.onRoleChange();
    console.log('Formulaire réinitialisé');
  }

  closeMessage(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.successMessage = '';
    } else {
      this.errorMessage = '';
    }
  }
}

