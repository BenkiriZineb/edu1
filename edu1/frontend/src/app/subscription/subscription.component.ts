import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  
  // Données des plans d'abonnement
  plans = [
    {
      id: 'free',
      name: 'Plan Gratuit',
      price: 0,
      period: 'mois',
      features: [
        'Accès aux cours de base',
        'Support communautaire',
        '5 cours par mois',
        'Accès limité aux ressources'
      ],
      limitations: [
        'Pas de support premium',
        'Pas de certificats'
      ]
    },
    {
      id: 'student',
      name: 'Plan Étudiant',
      price: 99,
      period: 'mois',
      annualPrice: 949,
      savings: 20,
      features: [
        'Accès illimité aux cours',
        'Support prioritaire',
        'Ressources exclusives',
        'Certificats de fin de cours',
        'Suivi de progression',
        'Accès mobile illimité',
        'Tutorat en groupe (2h/mois)'
      ]
    },
    {
      id: 'family',
      name: 'Plan Famille',
      price: 199,
      period: 'mois',
      annualPrice: 1789,
      savings: 25,
      features: [
        'Jusqu\'à 4 comptes enfants',
        'Tous les avantages du plan étudiant',
        'Tableau de bord parent',
        'Rapports de progression',
        'Communication avec les enseignants',
        'Accès aux ressources familiales',
        'Support dédié famille'
      ]
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: 299,
      period: 'mois',
      annualPrice: 2509,
      savings: 30,
      features: [
        'Tous les avantages du plan famille',
        'Cours particuliers (4h/mois)',
        'Accès aux examens blancs',
        'Bibliothèque numérique complète',
        'Support 24/7',
        'Accès aux événements exclusifs',
        'Consultation avec des experts'
      ]
    }
  ];

  // FAQ
  faqs: FAQ[] = [
    {
      question: 'Puis-je annuler mon abonnement à tout moment ?',
      answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. L\'accès sera maintenu jusqu\'à la fin de la période payée.',
      isOpen: false
    },
    {
      question: 'Les prix incluent-ils la TVA ?',
      answer: 'Oui, tous nos prix sont affichés TTC (Toutes Taxes Comprises) conformément à la réglementation marocaine.',
      isOpen: false
    },
    {
      question: 'Puis-je changer de plan en cours d\'abonnement ?',
      answer: 'Oui, vous pouvez passer à un plan supérieur à tout moment. Pour un plan inférieur, le changement prendra effet au prochain cycle de facturation.',
      isOpen: false
    },
    {
      question: 'Y a-t-il des frais cachés ?',
      answer: 'Non, nos prix sont transparents. Aucun frais caché, pas de frais d\'activation ou de résiliation.',
      isOpen: false
    },
    {
      question: 'Comment fonctionne la garantie satisfait ou remboursé ?',
      answer: 'Nous offrons une garantie de 30 jours. Si vous n\'êtes pas satisfait, nous vous remboursons intégralement.',
      isOpen: false
    },
    {
      question: 'Puis-je partager mon compte avec ma famille ?',
      answer: 'Le partage de compte est autorisé uniquement pour le plan Famille et Premium, dans les limites définies par chaque plan.',
      isOpen: false
    }
  ];

  constructor() { }

  // Sélection d'un plan
  selectPlan(planId: string): void {
    console.log('Plan sélectionné:', planId);
    
    // Ici vous pouvez ajouter la logique de redirection vers le processus de paiement
    // ou vers la page d'inscription avec le plan présélectionné
    
    switch (planId) {
      case 'free':
        // Rediriger vers l'inscription gratuite
        this.goToInscription(planId);
        break;
      case 'student':
      case 'family':
      case 'premium':
        // Rediriger vers le processus de paiement
        this.goToPayment(planId);
        break;
      default:
        console.log('Plan non reconnu');
    }
  }

  // Redirection vers l'inscription
  private goToInscription(planId: string): void {
    // Stocker le plan sélectionné dans le localStorage ou un service
    localStorage.setItem('selectedPlan', planId);
    
    // Rediriger vers la page d'inscription
    window.location.href = '/inscription';
  }

  // Redirection vers le processus de paiement
  private goToPayment(planId: string): void {
    // Stocker le plan sélectionné
    localStorage.setItem('selectedPlan', planId);
    
    // Ici vous pouvez rediriger vers votre système de paiement
    // ou afficher un modal de paiement
    alert(`Redirection vers le processus de paiement pour le plan ${planId}`);
    
    // Exemple de redirection vers un système de paiement
    // window.location.href = `/payment?plan=${planId}`;
  }

  // Toggle FAQ
  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  // Scroll vers les plans
  scrollToPlans(): void {
    const plansElement = document.querySelector('.plans-container');
    if (plansElement) {
      plansElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Calcul des économies annuelles
  calculateAnnualSavings(monthlyPrice: number, annualPrice: number): number {
    const monthlyTotal = monthlyPrice * 12;
    return monthlyTotal - annualPrice;
  }

  // Formatage des prix
  formatPrice(price: number): string {
    return price.toLocaleString('fr-MA');
  }

  // Vérifier si un plan est populaire
  isPopularPlan(planId: string): boolean {
    return planId === 'student';
  }

  // Vérifier si un plan est premium
  isPremiumPlan(planId: string): boolean {
    return planId === 'premium';
  }
} 