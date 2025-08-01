import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecole',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.css']
})
export class EcoleComponent {
  selectedNiveau: number | null = null;
  
  // Ajout du préscolaire (0) + classes 1-12
  niveaux = [
    { numero: 0, nom: 'Préscolaire' },
    ...Array.from({ length: 12 }, (_, i) => ({
      numero: i + 1,
      nom: `Classe ${i + 1}`
    }))
  ];

  infos = [
    { title: 'Inscription', desc: 'Comment transférer à l\'école, quels documents sont nécessaires', icon: '📝' },
    { title: 'Mentors', desc: 'Aide à l\'organisation du processus éducatif', icon: '🌟' },
    { title: 'Externe', desc: 'Deux cours en un an', icon: '📊' },
    { title: 'École • à l\'antenne', desc: 'Cours en ligne avec un enseignant en classe', icon: '🎥' },
    { title: 'Documents', desc: 'Permis et autres documents scolaires', icon: '📄' },
  ];

  constructor(private router: Router) {}

  selectNiveau(numero: number) {
    this.selectedNiveau = numero;
  }

  closeDetails() {
    this.selectedNiveau = null;
  }

  getNiveauText(numero: number): string {
    if (numero === 0) {
      return 'Préscolaire';
    } else if (numero <= 6) {
      return 'Primaire';
    } else if (numero <= 9) {
      return 'Collège';
    } else {
      return 'Lycée';
    }
  }

  getNiveauNom(numero: number): string {
    if (numero === 0) {
      return 'Préscolaire';
    } else if (numero <= 6) {
      return `Classe ${numero} - Primaire`;
    } else if (numero <= 9) {
      return `Classe ${numero} - Collège`;
    } else {
      return `Classe ${numero} - Lycée`;
    }
  }

  getProgramme(numero: number): string {
    if (numero === 0) {
      return 'Programme préscolaire marocain - Éveil et développement';
    } else if (numero <= 6) {
      return 'Programme national marocain - Cycle primaire';
    } else if (numero <= 9) {
      return 'Programme national marocain - Cycle collégial';
    } else {
      return 'Programme national marocain - Cycle lycéen';
    }
  }

  getEffectif(numero: number): number {
    if (numero === 0) {
      return 20;
    } else if (numero <= 6) {
      return 25;
    } else if (numero <= 9) {
      return 30;
    } else {
      return 35;
    }
  }

  getHoraires(numero: number): string {
    if (numero === 0) {
      return '8h30 - 15h30 (Lun-Ven)';
    } else if (numero <= 6) {
      return '8h00 - 16h00 (Lun-Ven)';
    } else if (numero <= 9) {
      return '8h00 - 17h00 (Lun-Ven)';
    } else {
      return '8h00 - 18h00 (Lun-Sam)';
    }
  }

  getFrais(numero: number): number {
    if (numero === 0) {
      return 6000;
    } else if (numero <= 6) {
      return 8000;
    } else if (numero <= 9) {
      return 12000;
    } else {
      return 15000;
    }
  }

  getMatieres(numero: number): any[] {
    if (numero === 0) {
      return [
        { nom: 'Éveil linguistique', icon: '🗣️' },
        { nom: 'Éveil mathématique', icon: '🔢' },
        { nom: 'Éveil scientifique', icon: '🔬' },
        { nom: 'Éveil artistique', icon: '🎨' },
        { nom: 'Éveil corporel', icon: '🏃' },
        { nom: 'Éducation religieuse', icon: '🕌' },
        { nom: 'Activités manuelles', icon: '✂️' },
        { nom: 'Jeux éducatifs', icon: '🧩' }
      ];
    } else if (numero <= 6) {
      return [
        { nom: 'Arabe', icon: '📖' },
        { nom: 'Français', icon: '🇫🇷' },
        { nom: 'Mathématiques', icon: '🔢' },
        { nom: 'Sciences', icon: '🔬' },
        { nom: 'Éducation Islamique', icon: '🕌' },
        { nom: 'Histoire-Géographie', icon: '🌍' },
        { nom: 'Éducation Artistique', icon: '🎨' },
        { nom: 'Éducation Physique', icon: '⚽' }
      ];
    } else if (numero <= 9) {
      return [
        { nom: 'Arabe', icon: '📖' },
        { nom: 'Français', icon: '🇫🇷' },
        { nom: 'Anglais', icon: '🇬🇧' },
        { nom: 'Mathématiques', icon: '🔢' },
        { nom: 'SVT', icon: '🧬' },
        { nom: 'Physique-Chimie', icon: '⚗️' },
        { nom: 'Histoire-Géographie', icon: '🌍' },
        { nom: 'Technologie', icon: '⚙️' },
        { nom: 'Éducation Islamique', icon: '🕌' },
        { nom: 'EPS', icon: '⚽' }
      ];
    } else {
      return [
        { nom: 'Arabe', icon: '📖' },
        { nom: 'Français', icon: '🇫🇷' },
        { nom: 'Anglais', icon: '🇬🇧' },
        { nom: 'Mathématiques', icon: '🔢' },
        { nom: 'SVT', icon: '🧬' },
        { nom: 'Physique-Chimie', icon: '⚗️' },
        { nom: 'Histoire-Géographie', icon: '🌍' },
        { nom: 'Philosophie', icon: '🤔' },
        { nom: 'Éducation Islamique', icon: '🕌' },
        { nom: 'EPS', icon: '⚽' }
      ];
    }
  }

  inscrireClasse(numero: number) {
    alert(`Inscription à la classe ${numero} - ${this.getNiveauText(numero)}`);
    // Ici vous pouvez rediriger vers le formulaire d'inscription
    this.router.navigate(['/profile']);
  }

  voirDetails(numero: number) {
    alert(`Détails complets de la classe ${numero} - ${this.getNiveauText(numero)}`);
    // Ici vous pouvez afficher une modal avec plus de détails
  }
}
