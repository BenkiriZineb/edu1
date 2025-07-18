import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aproposdenous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aproposdenous.component.html',
  styleUrls: ['./aproposdenous.component.css']
})
export class AproposdenousComponent {
  infos = [
    {
      title: 'Notre mission',
      description: 'Offrir un enseignement numérique de qualité, accessible à tous, quel que soit l’endroit où ils vivent.',
      image: 'assets/images/mission.png'

    },
    {
      title: 'Notre équipe',
      description: 'Une équipe multidisciplinaire composée d’enseignants, développeurs, designers et pédagogues passionnés.',
      image: 'assets/images/equipe.png'
    },
    {
      title: 'Notre histoire',
      description: 'Depuis notre création, nous avons accompagné des milliers d’élèves dans leur réussite scolaire à distance.',
      image: 'assets/images/histoire.png'
    }
  ];
}
