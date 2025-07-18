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
  sections = [
    {
      title: 'MAGAZINE',
      items: [
        "À propos de l’enseignement à domicile",
        "Expérience personnelle",
        "École du futur",
        "Questions éducatives",
        "Questions de psychologie",
        "Enfants d’âge préscolaire",
        "Après les cours",
        "Préparation pour l’OGE et l’USE"
      ]
    },
    {
      title: 'Q & R',
      items: [
        'À propos de l’école ',
        'Début de la formation',
        'Devoirs et évaluations',
        'Formats de paiement et de formation',
        'Comment contacter l’administration',
        'Questions qui concernent les parents',
        'Inscription officielle',
        'Processus d’apprentissage',
        'Contrôle et certification',
        'Interaction avec les enseignants',
        'Support technique'
      ]
    },
    {
      title: 'École à la maison',
      description: 'Série documentaire sur l’éducation familiale'
    },
    {
      title: 'Bibliothèque de matériel M.I. Lazareva',
      description: 'Articles, interviews et vidéos du fondateur de l’Internet Lesson',
      external: true
    },
    {
      title: 'Mathématiques scolaires pour les parents',
      description: 'Livre de M.I. Lazareva et Yu.V. Grebenyuk'
    },
    {
      title: 'Glossaire',
      description: 'Manuel de termes pour les étudiants'
    }
  ];
}

