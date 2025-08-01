import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanAbonnement, Abonnement } from '../models/subscription.model';
import { SubscriptionService } from '../services/subscription.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  plans: PlanAbonnement[] = [];
  abonnementActuel: Abonnement | null = null;
  selectedPlan: PlanAbonnement | null = null;
  methodePaiement: string = 'carte';
  isLoading = false;
  errorMessage = '';
  
  // Variables pour les tests
  showTestPanel = false;
  testMessage = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerPlans();
    this.chargerAbonnementActuel();
  }

  chargerPlans(): void {
    this.subscriptionService.getPlans().subscribe(plans => {
      this.plans = plans;
    });
  }

  chargerAbonnementActuel(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.subscriptionService.getAbonnementActuel(user.id).subscribe(abonnement => {
        this.abonnementActuel = abonnement;
      });
    }
  }

  selectPlan(plan: PlanAbonnement): void {
    this.selectedPlan = plan;
    this.errorMessage = '';
  }

  souscrire(): void {
    if (!this.selectedPlan) {
      this.errorMessage = 'Veuillez sélectionner un plan.';
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.subscriptionService.souscrireAbonnement(
      user.id,
      this.selectedPlan.id,
      this.methodePaiement
    ).subscribe({
      next: (abonnement) => {
        this.isLoading = false;
        this.abonnementActuel = abonnement;
        this.testMessage = `✅ Abonnement créé avec succès ! ID: ${abonnement.id}`;
        // Pour la démo, on ne redirige pas vers le paiement
        // this.router.navigate(['/paiement', abonnement.id]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la souscription. Veuillez réessayer.';
        console.error('Erreur souscription:', error);
      }
    });
  }

  annulerAbonnement(): void {
    if (!this.abonnementActuel) return;

    if (confirm('Êtes-vous sûr de vouloir annuler votre abonnement ?')) {
      this.subscriptionService.annulerAbonnement(this.abonnementActuel.id).subscribe({
        next: (success) => {
          if (success) {
            this.abonnementActuel = null;
            this.testMessage = '✅ Abonnement annulé avec succès.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de l\'annulation.';
          console.error('Erreur annulation:', error);
        }
      });
    }
  }

  renouvelerAbonnement(): void {
    if (!this.abonnementActuel) return;

    this.isLoading = true;
    this.subscriptionService.renouvelerAbonnement(this.abonnementActuel.id).subscribe({
      next: (abonnement) => {
        this.isLoading = false;
        this.abonnementActuel = abonnement;
        this.testMessage = '✅ Abonnement renouvelé avec succès !';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du renouvellement.';
        console.error('Erreur renouvellement:', error);
      }
    });
  }

  getJoursRestants(): number {
    if (!this.abonnementActuel) return 0;
    
    const maintenant = new Date();
    const fin = new Date(this.abonnementActuel.dateFin);
    const difference = fin.getTime() - maintenant.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }

  isPlanGratuit(plan: PlanAbonnement): boolean {
    return plan.type === 'gratuit';
  }

  getPrixFormate(prix: number): string {
    return prix === 0 ? 'Gratuit' : `${prix} MAD/mois`;
  }

  // Méthodes de test
  toggleTestPanel(): void {
    this.showTestPanel = !this.showTestPanel;
  }

  testSouscriptionGratuite(): void {
    this.selectedPlan = this.plans.find(p => p.type === 'gratuit') || null;
    if (this.selectedPlan) {
      this.souscrire();
    }
  }

  testSouscriptionPremium(): void {
    this.selectedPlan = this.plans.find(p => p.type === 'premium') || null;
    if (this.selectedPlan) {
      this.souscrire();
    }
  }

  testUtilisateurSansAbonnement(): void {
    // Simuler un utilisateur sans abonnement
    this.abonnementActuel = null;
    this.testMessage = '🔄 Mode test : Utilisateur sans abonnement';
  }

  testUtilisateurAvecAbonnement(): void {
    // Recharger l'abonnement actuel
    this.chargerAbonnementActuel();
    this.testMessage = '🔄 Mode test : Abonnement actuel rechargé';
  }

  clearTestMessage(): void {
    this.testMessage = '';
    this.errorMessage = '';
  }
} 