// src/app/inscription/utilisateur.model.ts - Version cohérente avec le backend Java

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  mdp?: string; // Optionnel, utilisé seulement à la création
  datedenaissance: string; // LocalDate du backend -> string en frontend (format: yyyy-MM-dd)
  sexe: string; // 'M' ou 'F'
  adresse: string;
  role: UserRole;
  actif: boolean;
}

// Énumérations cohérentes avec le backend
export enum UserRole {
  ELEVE = 'ELEVE',
  PROFESSEUR = 'PROFESSEUR',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN'
}

export enum StatutComptes {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  EN_ATTENTE = 'EN_ATTENTE',
  SUSPENDU = 'SUSPENDU'
}

// Fonctions utilitaires pour l'affichage
export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case UserRole.ELEVE: return 'Élève';
    case UserRole.PROFESSEUR: return 'Professeur';
    case UserRole.PARENT: return 'Parent';
    case UserRole.ADMIN: return 'Administrateur';
    default: return role;
  }
}



export function getSexeLabel(sexe: string): string {
  switch (sexe) {
    case 'M': return 'Masculin';
    case 'F': return 'Féminin';
    default: return sexe;
  }
}

// Fonction pour valider un utilisateur
export function isValidUtilisateur(user: Partial<Utilisateur>): boolean {
  return !!(
    user.nom?.trim() &&
    user.prenom?.trim() &&
    user.email?.trim() &&
    user.datedenaissance &&
    user.sexe &&
    user.adresse?.trim() &&
    user.role &&
    user.actif
  );
}

// Fonction pour formater la date pour l'affichage
export function formatDateForDisplay(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('fr-FR');
  } catch {
    return dateString;
  }
}

// Fonction pour calculer l'âge
export function calculateAge(datedenaissance: string): number {
  const today = new Date();
  const birthDate = new Date(datedenaissance);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}