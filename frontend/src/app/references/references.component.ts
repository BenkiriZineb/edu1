import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import nécessaire

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule], // ✅ Ajoute CommonModule ici
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent {
  references = [
    {
      title: 'Aide avec le site',
      description: `Des instructions étape par étape sur la façon de travailler avec le site vous aideront à commencer à apprendre et à utiliser efficacement tous ses outils.`,
      link: 'En savoir plus',
      image: 'assets/images/help-site.png'
    },
    {
      title: 'Questions fréquemment posées',
      description: `Comment fonctionne l’école à domicile ? Quelles matières sont étudiées ? Réponses aux questions les plus fréquentes des élèves et des parents.`,
      link: 'En savoir plus',
      image: 'assets/images/faq.png'
    },
    {
      title: 'Quoi de neuf?',
      description: `L’équipe de développement  travaille activement à l’amélioration de notre site. Dans cette section, nous présentons les dernières mises à jour du site et leur utilisation.`,
      link: 'En savoir plus',
      image: 'assets/images/updates.png'
    }
  ];
}
