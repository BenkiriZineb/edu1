export interface PlanAbonnement {
  id: number;
  nom: string;
  type: 'gratuit' | 'basique' | 'premium' | 'famille';
  prix: number;
  duree: number; // en mois
  description: string;
  fonctionnalites: string[];
  couleur: string;
  populaire?: boolean;
  limiteEleves?: number; // pour les plans famille
  limiteCours?: number;
  supportVisioconference?: boolean;
  telechargementCours?: boolean;
  supportPrioritaire?: boolean;
}

export interface Abonnement {
  id: number;
  utilisateurId: number;
  planId: number;
  plan: PlanAbonnement;
  dateDebut: Date;
  dateFin: Date;
  statut: 'actif' | 'expire' | 'annule' | 'en_attente';
  montantPaye: number;
  methodePaiement: 'carte' | 'paypal' | 'virement' | 'especes';
  referencePaiement?: string;
  renouvellementAuto: boolean;
  dateCreation: Date;
  dateModification: Date;
}

export interface Paiement {
  id: number;
  abonnementId: number;
  montant: number;
  devise: 'MAD' | 'EUR' | 'USD';
  methode: 'carte' | 'paypal' | 'virement' | 'especes';
  statut: 'en_attente' | 'valide' | 'echoue' | 'rembourse';
  reference: string;
  datePaiement: Date;
  details?: {
    numeroCarte?: string;
    paypalEmail?: string;
    referenceVirement?: string;
  };
}

export interface Facture {
  id: number;
  abonnementId: number;
  numero: string;
  montant: number;
  tva: number;
  total: number;
  dateEmission: Date;
  dateEcheance: Date;
  statut: 'emise' | 'payee' | 'en_retard' | 'annulee';
  pdfUrl?: string;
}

export interface UtilisateurAbonnement {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'eleve' | 'parent' | 'enseignant';
  abonnementActuel?: Abonnement;
  historiqueAbonnements: Abonnement[];
  enfants?: number[]; // pour les parents
} 