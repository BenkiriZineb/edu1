import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utile.component.html',
  styleUrls: ['./utile.component.css']
})
export class UtileComponent {
  magazineItems = [
    { icon: '📚', title: "À propos de l'enseignement à domicile" },
    { icon: '👤', title: "Expérience personnelle" },
    { icon: '🚀', title: "École du futur" },
    { icon: '❓', title: "Questions éducatives" },
    { icon: '🧠', title: "Questions de psychologie" },
    { icon: '👶', title: "Enfants d'âge préscolaire" },
    { icon: '⏰', title: "Après les cours" },
    { icon: '📝', title: "Préparation pour l'OGE et l'USE" }
  ];

  faqItems = [
    { icon: '🏫', title: 'À propos de l\'école' },
    { icon: '🎯', title: 'Début de la formation' },
    { icon: '📋', title: 'Devoirs et évaluations' },
    { icon: '💳', title: 'Formats de paiement et de formation' },
    { icon: '📞', title: 'Comment contacter l\'administration' },
    { icon: '👨‍👩‍👧‍👦', title: 'Questions qui concernent les parents' },
    { icon: '📝', title: 'Inscription officielle' },
    { icon: '📖', title: 'Processus d\'apprentissage' },
    { icon: '✅', title: 'Contrôle et certification' },
    { icon: '👨‍🏫', title: 'Interaction avec les enseignants' },
    { icon: '🔧', title: 'Support technique' }
  ];

  additionalResources = [
    {
      icon: '🏠',
      title: 'École à la maison',
      description: 'Série documentaire sur l\'éducation familiale',
      external: false
    },
    {
      icon: '📚',
      title: 'Bibliothèque de matériel M.I. Lazareva',
      description: 'Articles, interviews et vidéos du fondateur de l\'Internet Lesson',
      external: true
    },
    {
      icon: '🧮',
      title: 'Mathématiques scolaires pour les parents',
      description: 'Livre de M.I. Lazareva et Yu.V. Grebenyuk',
      external: false
    },
    {
      icon: '📖',
      title: 'Glossaire',
      description: 'Manuel de termes pour les étudiants',
      external: false
    }
  ];
}

