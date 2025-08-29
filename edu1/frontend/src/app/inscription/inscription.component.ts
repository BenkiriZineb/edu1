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
  // Rôle actif pour l'affichage des onglets
  activeRole: string = 'ELEVE';

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

  // Données spécifiques à l'Élève (formulaire complet)
  eleveData = {
    niveauScolaire: '',
    parentId: undefined as number | undefined,
    nationalite: '',
    tele: '',
    parentEmail: '',
    parentNom: '',
    newParentNom: '',
    newParentPrenom: '',
    newParentTele: '',
    newParentEmail: '',
    nombreEnfants: ''
  };

  // Données spécifiques au Parent (formulaire complet)
  parentData = {
    nbr_enfant: 0,
    nationalite: '',
    tele: ''
  };

  // Données spécifiques au Professeur (formulaire complet)
  professeurData = {
    matieresEnseignees: [] as string[],
    nationalite: '',
    tele: '',
    filiere: '',
    matiere: ''
  };

  // Données spécifiques à l'Admin (formulaire complet)
  adminData = {
    nationalite: '',
    tele: '',
    niveauAcces: ''
  };

  // Choix pour la section parent de l'élève
  parentChoice: 'existing' | 'new' = 'existing';

  // Listes de données
  niveauxScolaires: string[] = [
    // Préscolaire
    'crèche',
    'maternelle petite section',
    'maternelle moyenne section', 
    'maternelle grande section',
    
    // Primaire
    'CP (Cours Préparatoire)',
    'CE1 (Cours Élémentaire 1ère année)',
    'CE2 (Cours Élémentaire 2ème année)',
    'CM1 (Cours Moyen 1ère année)',
    'CM2 (Cours Moyen 2ème année)',
    
    // Collège
    '6ème (Sixième)',
    '5ème (Cinquième)',
    '4ème (Quatrième)',
    '3ème (Troisième)',
    
    // Lycée
    '2nde (Seconde)',
    '1ère (Première)',
    'Terminale',
    
    // Supérieur
    'Bac +1',
    'Bac +2 (DUT, BTS)',
    'Bac +3 (Licence)',
    'Bac +4 (Master 1)',
    'Bac +5 (Master 2)',
    'Bac +6 (Doctorat)',
    'Bac +8 (HDR)'
  ];

  listeMatieres: string[] = [
    'Mathématiques', 'Français', 'Histoire-Géographie',
    'Sciences', 'Anglais', 'EPS', 'Arts plastiques'
  ];

  // Options pour les selects
  roles = [
    {value: 'ELEVE', label: 'Élève'},
    {value: 'PARENT', label: 'Parent'},
    {value: 'PROFESSEUR', label: 'Professeur'},
    {value: 'ADMIN', label: 'Administrateur'}
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

  // Méthode pour changer le rôle actif
  setActiveRole(role: string): void {
    this.activeRole = role;
    this.utilisateur.role = role;
    this.resetRoleSpecificData();
    this.clearMessages();
  }

  // Méthode pour changer le choix de parent
  setParentChoice(choice: 'existing' | 'new'): void {
    this.parentChoice = choice;
  }

  // Réinitialiser les données spécifiques au rôle
  resetRoleSpecificData(): void {
    this.eleveData = {
      niveauScolaire: '',
      parentId: undefined,
      nationalite: '',
      tele: '',
      parentEmail: '',
      parentNom: '',
      newParentNom: '',
      newParentPrenom: '',
      newParentTele: '',
      newParentEmail: '',
      nombreEnfants: ''
    };
    
    this.parentData = {
      nbr_enfant: 0,
      nationalite: '',
      tele: ''
    };
    
    this.professeurData = {
      matieresEnseignees: [],
      nationalite: '',
      tele: '',
      filiere: '',
      matiere: ''
    };

    this.adminData = {
      nationalite: '',
      tele: '',
      niveauAcces: ''
    };
  }

  // Effacer les messages
  clearMessages(): void {
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
    return this.activeRole !== 'PROFESSEUR' || 
           this.professeurData.matieresEnseignees.length > 0;
  }

  isFormValid(): boolean {
    // Validation de base - tous les champs communs requis
    if (!this.utilisateur.nom || !this.utilisateur.prenom || 
        !this.utilisateur.email || !this.utilisateur.mdp || 
        !this.utilisateur.sexe || !this.utilisateur.datedenaissance || 
        !this.utilisateur.adresse) {
      return false;
    }

    // Validation du mot de passe (minimum 6 caractères)
    if (this.utilisateur.mdp.length < 6) {
      return false;
    }

    // Validation spécifique par rôle
    switch (this.activeRole) {
      case 'ELEVE':
        // Validation de base pour l'élève
        const baseEleveValid = !!this.eleveData.niveauScolaire && 
               !!this.eleveData.nationalite && 
               !!this.eleveData.tele;
        
        // Validation du parent selon le choix
        if (this.parentChoice === 'existing') {
          return baseEleveValid && !!this.eleveData.parentEmail;
        } else if (this.parentChoice === 'new') {
          return baseEleveValid && 
                 !!this.eleveData.newParentNom && 
                 !!this.eleveData.newParentPrenom && 
                 !!this.eleveData.newParentTele && 
                 !!this.eleveData.newParentEmail;
        }
        
        return baseEleveValid;
      
      case 'PARENT':
        return this.parentData.nbr_enfant > 0 && 
               !!this.parentData.nationalite && 
               !!this.parentData.tele;
      
      case 'PROFESSEUR':
        return !!this.professeurData.nationalite && 
               !!this.professeurData.tele && 
               !!this.professeurData.filiere && 
               !!this.professeurData.matiere;
      
      case 'ADMIN':
        return !!this.adminData.nationalite && 
               !!this.adminData.tele && 
               !!this.adminData.niveauAcces;
      
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
      role: this.activeRole,
      sexe: this.utilisateur.sexe,
      datedenaissance: new Date(this.utilisateur.datedenaissance).toISOString().split('T')[0],
      adresse: this.utilisateur.adresse.trim()
    };

    // Ajouter seulement les données pertinentes selon le rôle
    switch (this.activeRole) {
      case 'ELEVE':
        return {
          ...baseData,
          niveauScolaire: this.eleveData.niveauScolaire,
          nationalite: this.eleveData.nationalite,
          tele: this.eleveData.tele,
          ...(this.eleveData.parentId && { parentId: this.eleveData.parentId }),
          // Données du parent si nouveau
          ...(this.parentChoice === 'new' && {
            parentNom: this.eleveData.newParentNom,
            parentPrenom: this.eleveData.newParentPrenom,
            parentTele: this.eleveData.newParentTele,
            parentEmail: this.eleveData.newParentEmail,
            nombreEnfants: this.eleveData.nombreEnfants
          }),
          // Données du parent existant
          ...(this.parentChoice === 'existing' && {
            parentEmail: this.eleveData.parentEmail,
            parentNom: this.eleveData.parentNom
          })
        };
      
      case 'PARENT':
        return {
          ...baseData,
          nbr_enfant: this.parentData.nbr_enfant,
          nationalite: this.parentData.nationalite,
          tele: this.parentData.tele
        };
      
      case 'PROFESSEUR':
        return {
          ...baseData,
          matieresEnseignees: this.professeurData.matieresEnseignees,
          nationalite: this.professeurData.nationalite,
          tele: this.professeurData.tele,
          filiere: this.professeurData.filiere,
          matiere: this.professeurData.matiere
        };

      case 'ADMIN':
        return {
          ...baseData,
          nationalite: this.adminData.nationalite,
          tele: this.adminData.tele,
          niveauAcces: this.adminData.niveauAcces
        };
      
      default:
        return baseData;
    }
  }

  onSubmit() {
    // 🔍 DÉBOGAGE AVANT ENVOI
    console.log('=== DÉBUT INSCRIPTION ===');
    console.log('Rôle actif:', this.activeRole);
    console.log('Utilisateur brut:', this.utilisateur);
    console.log('Données spécifiques au rôle:', this.getRoleSpecificData());
    
    // 🔍 DÉBOGAGE DE LA VALIDATION
    console.log('🔍 Validation du formulaire...');
    console.log('Nom:', this.utilisateur.nom);
    console.log('Prénom:', this.utilisateur.prenom);
    console.log('Email:', this.utilisateur.email);
    console.log('Mot de passe:', this.utilisateur.mdp?.length, 'caractères');
    console.log('Sexe:', this.utilisateur.sexe);
    console.log('Date de naissance:', this.utilisateur.datedenaissance);
    console.log('Adresse:', this.utilisateur.adresse);
    
    if (this.activeRole === 'ELEVE') {
      console.log('🔍 Validation spécifique ÉLÈVE:');
      console.log('Niveau scolaire:', this.eleveData.niveauScolaire);
      console.log('Nationalité:', this.eleveData.nationalite);
      console.log('Téléphone:', this.eleveData.tele);
      console.log('Choix parent:', this.parentChoice);
      if (this.parentChoice === 'existing') {
        console.log('Email parent existant:', this.eleveData.parentEmail);
      } else if (this.parentChoice === 'new') {
        console.log('Nouveau parent - Nom:', this.eleveData.newParentNom);
        console.log('Nouveau parent - Prénom:', this.eleveData.newParentPrenom);
        console.log('Nouveau parent - Téléphone:', this.eleveData.newParentTele);
        console.log('Nouveau parent - Email:', this.eleveData.newParentEmail);
      }
    }
    
    // ✅ Validation avec notre méthode personnalisée
    const isValid = this.isFormValid();
    console.log('✅ Résultat validation:', isValid);
    
    if (!isValid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires selon votre rôle.';
      this.successMessage = '';
      console.log('❌ Validation échouée');
      return;
    }

    // Nettoyer les données selon le rôle
    const userData = this.cleanUserData();
    console.log('Données nettoyées à envoyer:', userData);
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
         const apiUrl = 'http://localhost:8080/api/eleve/eleve';
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
        
        // Message de succès détaillé selon le rôle
        const roleMessages = {
          'ELEVE': 'Compte élève créé avec succès ! Vous pouvez maintenant accéder à vos cours.',
          'PARENT': 'Compte parent créé avec succès ! Vous pouvez maintenant suivre le parcours de vos enfants.',
          'PROFESSEUR': 'Compte professeur créé avec succès ! Vous pouvez maintenant gérer vos classes et matières.',
          'ADMIN': 'Compte administrateur créé avec succès ! Vous pouvez maintenant gérer la plateforme.'
        };
        
        this.successMessage = roleMessages[this.activeRole as keyof typeof roleMessages] || 
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

  // Méthode utilitaire pour obtenir les données spécifiques au rôle
  private getRoleSpecificData(): any {
    switch (this.activeRole) {
      case 'ELEVE':
        return this.eleveData;
      case 'PARENT':
        return this.parentData;
      case 'PROFESSEUR':
        return this.professeurData;
      case 'ADMIN':
        return this.adminData;
      default:
        return {};
    }
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
    this.resetRoleSpecificData();
    this.parentChoice = 'existing';
    console.log('Formulaire réinitialisé');
  }

  closeMessage(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.successMessage = '';
    } else {
      this.errorMessage = '';
    }
  }

  // Méthode de test pour diagnostiquer le problème
  testRole(role: string): void {
    console.log('🧪 Test de changement de rôle vers:', role);
    this.setActiveRole(role);
    console.log('✅ Rôle changé vers:', this.activeRole);
  }
}

