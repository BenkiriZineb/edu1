export interface User {
  id: number;
  username: string;
  email: string;
  role: 'eleve' | 'enseignant' | 'parent';
  nom: string;
  prenom: string;
  avatar?: string;
  datedenaissance?: string; // Date de naissance
  sexe?: string; // Sexe
  adresse?: string; // Adresse
}

export interface Eleve extends User {
  niveau: string;
  classe: string;
  niveauScolaire?: string; // Le niveau scolaire sélectionné (ex: "6ème (Sixième)")
  niveauEtude?: string; // Le niveau d'étude (PRESCOLAIRE, PRIMAIRE, COLLEGE, LYCEE, SUPERIEUR)
  parentId?: number;
}

export interface Enseignant extends User {
  matieres: string[];
  classes: string[];
}

export interface Parent extends User {
  enfants: Eleve[];
}

export interface Matiere {
  id: number;
  nom: string;
  niveau: string;
  description: string;
  enseignant: string;
  couleur: string;
}

export interface Cours {
  id: number;
  titre: string;
  matiere: string;
  niveau: string;
  description: string;
  dateCreation: Date;
  contenu: string;
  documents?: string[];
}

export interface Note {
  id?: number;
  eleveId: number;
  coursId?: number;
  matiereId?: number;
  valeur: number;
  noteMaximale: number;
  commentaire?: string;
  date: string;
  type: 'DEVOIR' | 'EXAMEN' | 'QUIZ' | 'CONTROLE' | 'PARTICIPATION' | 'AUTRE';
}

export interface Quiz {
  id: number;
  titre: string;
  matiere: string;
  questions: Question[];
  dateCreation: Date;
  duree: number; // en minutes
}

export interface Question {
  id: number;
  question: string;
  type: 'choix_multiple' | 'vrai_faux' | 'texte';
  reponses?: string[];
  bonneReponse?: string | number;
}

export interface Message {
  id: number;
  expediteur: string;
  destinataire: string;
  sujet: string;
  contenu: string;
  date: Date;
  lu: boolean;
}

export interface Notification {
  id: number;
  titre: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: Date;
  lu: boolean;
} 