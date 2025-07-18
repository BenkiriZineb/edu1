import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ecole',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.css']
})
export class EcoleComponent {
  niveaux = Array.from({ length: 12 }, (_, i) => ({
    numero: i + 1
  }));

  infos = [
    { title: 'Inscription', desc: 'Comment transférer à l’école, quels documents sont nécessaires', icon: '📝' },
    { title: 'Mentors', desc: 'Aide à l’organisation du processus éducatif', icon: '🌟' },
    { title: 'Externe', desc: 'Deux cours en un an', icon: '📊' },
    { title: 'École • à l\'antenne', desc: 'Cours en ligne avec un enseignant en classe', icon: '🎥' },
    { title: 'Documents', desc: 'Permis et autres documents scolaires', icon: '📄' },
  ];
}
