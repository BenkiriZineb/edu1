import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materiel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materiels.component.html',
  styleUrls: ['./materiels.component.css']
})
export class MaterielComponent {
  materiels = [
    {
      titre: 'Bibliothèque de leçons vidéo',
      description: 'Cours vidéo, notes, simulateurs et tests sur le programme scolaire de la 1re à la 12eme année.',
      link: 'En savoir plus'

    },
    {
      titre: 'Matériel pour l’été',
      description: 'Bibliographie, cahiers d’exercices, recueil de devoirs pour la 1ère année.',
      link: 'En savoir plus'

    },
    {
      titre: 'Manuels scolaires',
      description: 'Liste des supports pédagogiques pour les élèves de la 1re à la 12eme année de l’école à domicile .',
      link: 'En savoir plus'

    },
    {
      titre: 'Critères d’évaluation',
      description: 'Critères d’évaluation des travaux écrits adoptés dans Home School.',
      link: 'En savoir plus'

    },
    {
      titre: 'Archives des notes',
      description: 'Archives de vos notes des années scolaires précédentes dans l’école à domicile .',
      link: 'En savoir plus'

    },
    {
      titre: 'Préparation à l’OGE/USE',
      description: 'Matériel actuel pouvant être utilisé pour se préparer à l’examen d’État unifié.',
      link: 'En savoir plus'

    },
    {
      titre: 'Formulaires de devoirs',
      description: 'Cliquez pour télécharger tous les formulaires nécessaires aux travaux écrits.',
      link: 'Télécharger'
    }
  ];
}
