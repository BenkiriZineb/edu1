import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PlanAbonnement, Abonnement, Paiement, Facture, UtilisateurAbonnement } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private currentAbonnementSubject = new BehaviorSubject<Abonnement | null>(null);
  public currentAbonnement$ = this.currentAbonnementSubject.asObservable();

  // Plans d'abonnement disponibles
  private plans: PlanAbonnement[] = [
    {
      id: 1,
      nom: 'Gratuit',
      type: 'gratuit',
      prix: 0,
      duree: 1,
      description: 'Accès limité aux cours de base',
      fonctionnalites: [
        'Accès à 3 cours par mois',
        'Quiz de base',
        'Support communautaire'
      ],
      couleur: '#6c757d',
      limiteCours: 3
    },
    {
      id: 2,
      nom: 'Basique',
      type: 'basique',
      prix: 99,
      duree: 1,
      description: 'Accès complet pour un élève',
      fonctionnalites: [
        'Accès illimité aux cours',
        'Quiz et exercices',
        'Support par email',
        'Progression personnalisée',
        'Cours en vidéo'
      ],
      couleur: '#007bff',
      populaire: false,
      limiteEleves: 1,
      supportVisioconference: false,
      telechargementCours: false
    },
    {
      id: 3,
      nom: 'Premium',
      type: 'premium',
      prix: 199,
      duree: 1,
      description: 'Accès premium avec fonctionnalités avancées',
      fonctionnalites: [
        'Tout du plan Basique',
        'Classes virtuelles en direct',
        'Téléchargement des cours',
        'Support prioritaire',
        'Cours personnalisés',
        'Rapports détaillés'
      ],
      couleur: '#28a745',
      populaire: true,
      limiteEleves: 1,
      supportVisioconference: true,
      telechargementCours: true,
      supportPrioritaire: true
    },
    {
      id: 4,
      nom: 'Famille',
      type: 'famille',
      prix: 299,
      duree: 1,
      description: 'Accès pour toute la famille (jusqu\'à 4 enfants)',
      fonctionnalites: [
        'Tout du plan Premium',
        'Jusqu\'à 4 enfants',
        'Gestion centralisée',
        'Rapports familiaux',
        'Support dédié famille'
      ],
      couleur: '#dc3545',
      populaire: false,
      limiteEleves: 4,
      supportVisioconference: true,
      telechargementCours: true,
      supportPrioritaire: true
    }
  ];

  // Abonnements simulés
  private abonnements: Abonnement[] = [
    {
      id: 1,
      utilisateurId: 1,
      planId: 3,
      plan: this.plans[2], // Premium
      dateDebut: new Date('2024-01-01'),
      dateFin: new Date('2024-12-31'),
      statut: 'actif',
      montantPaye: 199,
      methodePaiement: 'carte',
      referencePaiement: 'PAY-123456',
      renouvellementAuto: true,
      dateCreation: new Date('2024-01-01'),
      dateModification: new Date('2024-01-01')
    }
  ];

  // Paiements simulés
  private paiements: Paiement[] = [
    {
      id: 1,
      abonnementId: 1,
      montant: 199,
      devise: 'MAD',
      methode: 'carte',
      statut: 'valide',
      reference: 'PAY-123456',
      datePaiement: new Date('2024-01-01'),
      details: {
        numeroCarte: '**** **** **** 1234'
      }
    }
  ];

  // Factures simulées
  private factures: Facture[] = [
    {
      id: 1,
      abonnementId: 1,
      numero: 'FACT-2024-001',
      montant: 199,
      tva: 39.8,
      total: 238.8,
      dateEmission: new Date('2024-01-01'),
      dateEcheance: new Date('2024-01-31'),
      statut: 'payee',
      pdfUrl: '/assets/factures/fact-2024-001.pdf'
    }
  ];

  constructor() {
    // Charger l'abonnement actuel depuis le localStorage
    const storedAbonnement = localStorage.getItem('currentAbonnement');
    if (storedAbonnement) {
      this.currentAbonnementSubject.next(JSON.parse(storedAbonnement));
    }
  }

  // Méthodes pour les plans
  getPlans(): Observable<PlanAbonnement[]> {
    return of(this.plans);
  }

  getPlanById(id: number): Observable<PlanAbonnement | undefined> {
    return of(this.plans.find(plan => plan.id === id));
  }

  // Méthodes pour les abonnements
  getAbonnementsUtilisateur(utilisateurId: number): Observable<Abonnement[]> {
    return of(this.abonnements.filter(ab => ab.utilisateurId === utilisateurId));
  }

  getAbonnementActuel(utilisateurId: number): Observable<Abonnement | null> {
    const abonnement = this.abonnements.find(ab => 
      ab.utilisateurId === utilisateurId && 
      (ab.statut === 'actif' || ab.statut === 'en_attente')
    );
    return of(abonnement || null);
  }

  souscrireAbonnement(utilisateurId: number, planId: number, methodePaiement: string): Observable<Abonnement> {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan non trouvé');
    }

    const nouvelAbonnement: Abonnement = {
      id: this.abonnements.length + 1,
      utilisateurId,
      planId,
      plan,
      dateDebut: new Date(),
      dateFin: new Date(new Date().setMonth(new Date().getMonth() + plan.duree)),
      statut: 'en_attente',
      montantPaye: plan.prix,
      methodePaiement: methodePaiement as any,
      referencePaiement: `PAY-${Date.now()}`,
      renouvellementAuto: true,
      dateCreation: new Date(),
      dateModification: new Date()
    };

    this.abonnements.push(nouvelAbonnement);
    this.currentAbonnementSubject.next(nouvelAbonnement);
    localStorage.setItem('currentAbonnement', JSON.stringify(nouvelAbonnement));

    return of(nouvelAbonnement);
  }

  annulerAbonnement(abonnementId: number): Observable<boolean> {
    const abonnement = this.abonnements.find(ab => ab.id === abonnementId);
    if (abonnement) {
      abonnement.statut = 'annule';
      abonnement.dateModification = new Date();
      this.currentAbonnementSubject.next(null);
      localStorage.removeItem('currentAbonnement');
      return of(true);
    }
    return of(false);
  }

  renouvelerAbonnement(abonnementId: number): Observable<Abonnement> {
    const abonnement = this.abonnements.find(ab => ab.id === abonnementId);
    if (!abonnement) {
      throw new Error('Abonnement non trouvé');
    }

    const nouveauPaiement: Paiement = {
      id: this.paiements.length + 1,
      abonnementId,
      montant: abonnement.plan.prix,
      devise: 'MAD',
      methode: abonnement.methodePaiement,
      statut: 'valide',
      reference: `PAY-${Date.now()}`,
      datePaiement: new Date()
    };

    this.paiements.push(nouveauPaiement);

    // Mettre à jour l'abonnement
    abonnement.dateDebut = new Date();
    abonnement.dateFin = new Date(new Date().setMonth(new Date().getMonth() + abonnement.plan.duree));
    abonnement.statut = 'actif';
    abonnement.dateModification = new Date();

    this.currentAbonnementSubject.next(abonnement);
    localStorage.setItem('currentAbonnement', JSON.stringify(abonnement));

    return of(abonnement);
  }

  // Méthodes pour les paiements
  getPaiementsAbonnement(abonnementId: number): Observable<Paiement[]> {
    return of(this.paiements.filter(p => p.abonnementId === abonnementId));
  }

  effectuerPaiement(paiement: Omit<Paiement, 'id' | 'datePaiement'>): Observable<Paiement> {
    const nouveauPaiement: Paiement = {
      ...paiement,
      id: this.paiements.length + 1,
      datePaiement: new Date()
    };

    this.paiements.push(nouveauPaiement);

    // Mettre à jour le statut de l'abonnement
    const abonnement = this.abonnements.find(ab => ab.id === paiement.abonnementId);
    if (abonnement) {
      abonnement.statut = 'actif';
      abonnement.dateModification = new Date();
    }

    return of(nouveauPaiement);
  }

  // Méthodes pour les factures
  getFacturesAbonnement(abonnementId: number): Observable<Facture[]> {
    return of(this.factures.filter(f => f.abonnementId === abonnementId));
  }

  genererFacture(abonnementId: number): Observable<Facture> {
    const abonnement = this.abonnements.find(ab => ab.id === abonnementId);
    if (!abonnement) {
      throw new Error('Abonnement non trouvé');
    }

    const nouvelleFacture: Facture = {
      id: this.factures.length + 1,
      abonnementId,
      numero: `FACT-${new Date().getFullYear()}-${String(this.factures.length + 1).padStart(3, '0')}`,
      montant: abonnement.montantPaye,
      tva: abonnement.montantPaye * 0.2, // 20% TVA
      total: abonnement.montantPaye * 1.2,
      dateEmission: new Date(),
      dateEcheance: new Date(new Date().setDate(new Date().getDate() + 30)),
      statut: 'emise'
    };

    this.factures.push(nouvelleFacture);
    return of(nouvelleFacture);
  }

  // Utilitaires
  isAbonnementActif(utilisateurId: number): Observable<boolean> {
    return new Observable(observer => {
      this.getAbonnementActuel(utilisateurId).subscribe(abonnement => {
        observer.next(abonnement !== null && abonnement.statut === 'actif');
        observer.complete();
      });
    });
  }

  getJoursRestants(abonnementId: number): Observable<number> {
    const abonnement = this.abonnements.find(ab => ab.id === abonnementId);
    if (!abonnement) {
      return of(0);
    }

    const maintenant = new Date();
    const fin = new Date(abonnement.dateFin);
    const difference = fin.getTime() - maintenant.getTime();
    const jours = Math.ceil(difference / (1000 * 3600 * 24));

    return of(jours > 0 ? jours : 0);
  }

  // Méthodes pour la gestion des utilisateurs avec abonnements
  getUtilisateursAvecAbonnements(): Observable<UtilisateurAbonnement[]> {
    // Simulation de données utilisateurs avec abonnements
    const utilisateurs: UtilisateurAbonnement[] = [
      {
        id: 1,
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@email.com',
        role: 'eleve',
        abonnementActuel: this.abonnements[0],
        historiqueAbonnements: this.abonnements
      }
    ];

    return of(utilisateurs);
  }
} 