// src/app/subjects/subjects.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from '../models/user.model';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  level: string = '';
  levelName: string = '';
  matieres: Matiere[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.loadLevelData();
    });
  }

  loadLevelData() {
    this.loading = true;
    
    // Définir le nom du niveau
    this.levelName = this.getLevelName(this.level);
    
    // Charger les matières selon le niveau
    this.matieres = this.getMatieresByLevel(this.level);
    
    this.loading = false;
  }

  getLevelName(levelCode: string): string {
    const levelNames: { [key: string]: string } = {
      'ps': 'Petite Section',
      'ms': 'Moyenne Section', 
      'gs': 'Grande Section',
      'ci': 'Cours d\'Initiation',
      'cp': 'Cours Préparatoire',
      'ce1': 'Cours Élémentaire 1',
      'ce2': 'Cours Élémentaire 2',
      'cm1': 'Cours Moyen 1',
      'cm2': 'Cours Moyen 2',
      '1ac': '1ère année collège',
      '2ac': '2ème année collège',
      '3ac': '3ème année collège',
      'tc': 'Tronc Commun',
      '1bac': '1ère année baccalauréat',
      '2bac': '2ème année baccalauréat'
    };
    
    return levelNames[levelCode] || levelCode;
  }

  // Fonction helper pour créer une matière avec toutes les propriétés
  private createMatiere(id: number, nom: string, description: string, niveau: string, enseignant: string, couleur: string): Matiere {
    return { id, nom, description, niveau, enseignant, couleur };
  }

  getMatieresByLevel(level: string): Matiere[] {
    const matieresByLevel: { [key: string]: Matiere[] } = {
      // Préscolaire
      'ps': [
        this.createMatiere(1, 'Éveil et Découverte', 'Activités d\'éveil et de découverte du monde', 'ps', 'Mme. Fatima', '#FF6B6B'),
        this.createMatiere(2, 'Expression Orale', 'Développement du langage et communication', 'ps', 'Mme. Aicha', '#4ECDC4'),
        this.createMatiere(3, 'Activités Manuelles', 'Dessin, peinture, modelage', 'ps', 'Mme. Khadija', '#45B7D1'),
        this.createMatiere(4, 'Psychomotricité', 'Développement moteur et coordination', 'ps', 'M. Hassan', '#96CEB4')
      ],
      'ms': [
        this.createMatiere(5, 'Éveil et Découverte', 'Activités d\'éveil et de découverte du monde', 'ms', 'Mme. Fatima', '#FF6B6B'),
        this.createMatiere(6, 'Expression Orale', 'Développement du langage et communication', 'ms', 'Mme. Aicha', '#4ECDC4'),
        this.createMatiere(7, 'Activités Manuelles', 'Dessin, peinture, modelage', 'ms', 'Mme. Khadija', '#45B7D1'),
        this.createMatiere(8, 'Psychomotricité', 'Développement moteur et coordination', 'ms', 'M. Hassan', '#96CEB4'),
        this.createMatiere(9, 'Initiation aux Mathématiques', 'Nombres, formes, grandeurs', 'ms', 'M. Ahmed', '#FFA726')
      ],
      'gs': [
        this.createMatiere(10, 'Éveil et Découverte', 'Activités d\'éveil et de découverte du monde', 'gs', 'Mme. Fatima', '#FF6B6B'),
        this.createMatiere(11, 'Expression Orale', 'Développement du langage et communication', 'gs', 'Mme. Aicha', '#4ECDC4'),
        this.createMatiere(12, 'Activités Manuelles', 'Dessin, peinture, modelage', 'gs', 'Mme. Khadija', '#45B7D1'),
        this.createMatiere(13, 'Psychomotricité', 'Développement moteur et coordination', 'gs', 'M. Hassan', '#96CEB4'),
        this.createMatiere(14, 'Initiation aux Mathématiques', 'Nombres, formes, grandeurs', 'gs', 'M. Ahmed', '#FFA726'),
        this.createMatiere(15, 'Préparation à la Lecture', 'Préparation à l\'apprentissage de la lecture', 'gs', 'Mme. Amina', '#9C27B0')
      ],

      // Primaire
      'ci': [
        this.createMatiere(16, 'Arabe', 'Langue arabe et lecture', 'ci', 'M. Rachid', '#2196F3'),
        this.createMatiere(17, 'Français', 'Langue française et lecture', 'ci', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(18, 'Mathématiques', 'Nombres et calculs', 'ci', 'M. Ahmed', '#FF9800'),
        this.createMatiere(19, 'Éveil Scientifique', 'Découverte du monde', 'ci', 'Mme. Leila', '#795548'),
        this.createMatiere(20, 'Éducation Islamique', 'Culture religieuse', 'ci', 'M. Youssef', '#607D8B'),
        this.createMatiere(21, 'Activités Artistiques', 'Dessin, chant, activités créatives', 'ci', 'Mme. Samira', '#E91E63')
      ],
      'cp': [
        this.createMatiere(22, 'Arabe', 'Langue arabe et lecture', 'cp', 'M. Rachid', '#2196F3'),
        this.createMatiere(23, 'Français', 'Langue française et lecture', 'cp', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(24, 'Mathématiques', 'Nombres et calculs', 'cp', 'M. Ahmed', '#FF9800'),
        this.createMatiere(25, 'Éveil Scientifique', 'Découverte du monde', 'cp', 'Mme. Leila', '#795548'),
        this.createMatiere(26, 'Éducation Islamique', 'Culture religieuse', 'cp', 'M. Youssef', '#607D8B'),
        this.createMatiere(27, 'Activités Artistiques', 'Dessin, chant, activités créatives', 'cp', 'Mme. Samira', '#E91E63')
      ],
      'ce1': [
        this.createMatiere(28, 'Arabe', 'Langue arabe et lecture', 'ce1', 'M. Rachid', '#2196F3'),
        this.createMatiere(29, 'Français', 'Langue française et lecture', 'ce1', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(30, 'Mathématiques', 'Nombres et calculs', 'ce1', 'M. Ahmed', '#FF9800'),
        this.createMatiere(31, 'Éveil Scientifique', 'Découverte du monde', 'ce1', 'Mme. Leila', '#795548'),
        this.createMatiere(32, 'Éducation Islamique', 'Culture religieuse', 'ce1', 'M. Youssef', '#607D8B'),
        this.createMatiere(33, 'Activités Artistiques', 'Dessin, chant, activités créatives', 'ce1', 'Mme. Samira', '#E91E63')
      ],
      'ce2': [
        this.createMatiere(34, 'Arabe', 'Langue arabe et lecture', 'ce2', 'M. Rachid', '#2196F3'),
        this.createMatiere(35, 'Français', 'Langue française et lecture', 'ce2', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(36, 'Mathématiques', 'Nombres et calculs', 'ce2', 'M. Ahmed', '#FF9800'),
        this.createMatiere(37, 'Éveil Scientifique', 'Découverte du monde', 'ce2', 'Mme. Leila', '#795548'),
        this.createMatiere(38, 'Éducation Islamique', 'Culture religieuse', 'ce2', 'M. Youssef', '#607D8B'),
        this.createMatiere(39, 'Activités Artistiques', 'Dessin, chant, activités créatives', 'ce2', 'Mme. Samira', '#E91E63')
      ],
      'cm1': [
        this.createMatiere(40, 'Arabe', 'Langue arabe et lecture', 'cm1', 'M. Rachid', '#2196F3'),
        this.createMatiere(41, 'Français', 'Langue française et lecture', 'cm1', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(42, 'Mathématiques', 'Nombres et calculs', 'cm1', 'M. Ahmed', '#FF9800'),
        this.createMatiere(43, 'Sciences', 'Sciences de la vie et de la terre', 'cm1', 'Mme. Leila', '#795548'),
        this.createMatiere(44, 'Histoire-Géographie', 'Histoire et géographie', 'cm1', 'M. Karim', '#8BC34A'),
        this.createMatiere(45, 'Éducation Islamique', 'Culture religieuse', 'cm1', 'M. Youssef', '#607D8B'),
        this.createMatiere(46, 'Activités Artistiques', 'Dessin, chant, activités créatives', 'cm1', 'Mme. Samira', '#E91E63')
      ],
      'cm2': [
        this.createMatiere(47, 'Arabe', 'Langue arabe et lecture', 'cm2', 'M. Rachid', '#2196F3'),
        this.createMatiere(48, 'Français', 'Langue française et lecture', 'cm2', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(49, 'Mathématiques', 'Nombres et calculs', 'cm2', 'M. Ahmed', '#FF9800'),
        this.createMatiere(50, 'Sciences', 'Sciences de la vie et de la terre', 'cm2', 'Mme. Leila', '#795548'),
        this.createMatiere(51, 'Histoire-Géographie', 'Histoire et géographie', 'cm2', 'M. Karim', '#8BC34A'),
        this.createMatiere(52, 'Éducation Islamique', 'Culture religieuse', 'cm2', 'M. Youssef', '#607D8B'),
        this.createMatiere(53, 'Activités Artistiques', 'Dessin, chant, activités créatives', 'cm2', 'Mme. Samira', '#E91E63')
      ],

      // Collège
      '1ac': [
        this.createMatiere(54, 'Arabe', 'Langue arabe et littérature', '1ac', 'M. Rachid', '#2196F3'),
        this.createMatiere(55, 'Français', 'Langue française et littérature', '1ac', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(56, 'Anglais', 'Langue anglaise', '1ac', 'Mme. Sarah', '#FF5722'),
        this.createMatiere(57, 'Mathématiques', 'Algèbre et géométrie', '1ac', 'M. Ahmed', '#FF9800'),
        this.createMatiere(58, 'SVT', 'Sciences de la vie et de la terre', '1ac', 'Mme. Leila', '#795548'),
        this.createMatiere(59, 'Physique-Chimie', 'Physique et chimie', '1ac', 'M. Omar', '#673AB7'),
        this.createMatiere(60, 'Histoire-Géographie', 'Histoire et géographie', '1ac', 'M. Karim', '#8BC34A'),
        this.createMatiere(61, 'Technologie', 'Technologie et informatique', '1ac', 'M. Ali', '#00BCD4'),
        this.createMatiere(62, 'EPS', 'Éducation physique et sportive', '1ac', 'M. Hassan', '#96CEB4'),
        this.createMatiere(63, 'Éducation Islamique', 'Culture religieuse', '1ac', 'M. Youssef', '#607D8B')
      ],
      '2ac': [
        this.createMatiere(64, 'Arabe', 'Langue arabe et littérature', '2ac', 'M. Rachid', '#2196F3'),
        this.createMatiere(65, 'Français', 'Langue française et littérature', '2ac', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(66, 'Anglais', 'Langue anglaise', '2ac', 'Mme. Sarah', '#FF5722'),
        this.createMatiere(67, 'Mathématiques', 'Algèbre et géométrie', '2ac', 'M. Ahmed', '#FF9800'),
        this.createMatiere(68, 'SVT', 'Sciences de la vie et de la terre', '2ac', 'Mme. Leila', '#795548'),
        this.createMatiere(69, 'Physique-Chimie', 'Physique et chimie', '2ac', 'M. Omar', '#673AB7'),
        this.createMatiere(70, 'Histoire-Géographie', 'Histoire et géographie', '2ac', 'M. Karim', '#8BC34A'),
        this.createMatiere(71, 'Technologie', 'Technologie et informatique', '2ac', 'M. Ali', '#00BCD4'),
        this.createMatiere(72, 'EPS', 'Éducation physique et sportive', '2ac', 'M. Hassan', '#96CEB4'),
        this.createMatiere(73, 'Éducation Islamique', 'Culture religieuse', '2ac', 'M. Youssef', '#607D8B')
      ],
      '3ac': [
        this.createMatiere(74, 'Arabe', 'Langue arabe et littérature', '3ac', 'M. Rachid', '#2196F3'),
        this.createMatiere(75, 'Français', 'Langue française et littérature', '3ac', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(76, 'Anglais', 'Langue anglaise', '3ac', 'Mme. Sarah', '#FF5722'),
        this.createMatiere(77, 'Mathématiques', 'Algèbre et géométrie', '3ac', 'M. Ahmed', '#FF9800'),
        this.createMatiere(78, 'SVT', 'Sciences de la vie et de la terre', '3ac', 'Mme. Leila', '#795548'),
        this.createMatiere(79, 'Physique-Chimie', 'Physique et chimie', '3ac', 'M. Omar', '#673AB7'),
        this.createMatiere(80, 'Histoire-Géographie', 'Histoire et géographie', '3ac', 'M. Karim', '#8BC34A'),
        this.createMatiere(81, 'Technologie', 'Technologie et informatique', '3ac', 'M. Ali', '#00BCD4'),
        this.createMatiere(82, 'EPS', 'Éducation physique et sportive', '3ac', 'M. Hassan', '#96CEB4'),
        this.createMatiere(83, 'Éducation Islamique', 'Culture religieuse', '3ac', 'M. Youssef', '#607D8B')
      ],

      // Lycée
      'tc': [
        this.createMatiere(84, 'Arabe', 'Langue arabe et littérature', 'tc', 'M. Rachid', '#2196F3'),
        this.createMatiere(85, 'Français', 'Langue française et littérature', 'tc', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(86, 'Anglais', 'Langue anglaise', 'tc', 'Mme. Sarah', '#FF5722'),
        this.createMatiere(87, 'Mathématiques', 'Algèbre et géométrie', 'tc', 'M. Ahmed', '#FF9800'),
        this.createMatiere(88, 'SVT', 'Sciences de la vie et de la terre', 'tc', 'Mme. Leila', '#795548'),
        this.createMatiere(89, 'Physique-Chimie', 'Physique et chimie', 'tc', 'M. Omar', '#673AB7'),
        this.createMatiere(90, 'Histoire-Géographie', 'Histoire et géographie', 'tc', 'M. Karim', '#8BC34A'),
        this.createMatiere(91, 'Philosophie', 'Philosophie et pensée critique', 'tc', 'M. Jamal', '#9E9E9E'),
        this.createMatiere(92, 'EPS', 'Éducation physique et sportive', 'tc', 'M. Hassan', '#96CEB4'),
        this.createMatiere(93, 'Éducation Islamique', 'Culture religieuse', 'tc', 'M. Youssef', '#607D8B')
      ],
      '1bac': [
        this.createMatiere(94, 'Arabe', 'Langue arabe et littérature', '1bac', 'M. Rachid', '#2196F3'),
        this.createMatiere(95, 'Français', 'Langue française et littérature', '1bac', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(96, 'Anglais', 'Langue anglaise', '1bac', 'Mme. Sarah', '#FF5722'),
        this.createMatiere(97, 'Mathématiques', 'Algèbre et géométrie', '1bac', 'M. Ahmed', '#FF9800'),
        this.createMatiere(98, 'SVT', 'Sciences de la vie et de la terre', '1bac', 'Mme. Leila', '#795548'),
        this.createMatiere(99, 'Physique-Chimie', 'Physique et chimie', '1bac', 'M. Omar', '#673AB7'),
        this.createMatiere(100, 'Histoire-Géographie', 'Histoire et géographie', '1bac', 'M. Karim', '#8BC34A'),
        this.createMatiere(101, 'Philosophie', 'Philosophie et pensée critique', '1bac', 'M. Jamal', '#9E9E9E'),
        this.createMatiere(102, 'EPS', 'Éducation physique et sportive', '1bac', 'M. Hassan', '#96CEB4'),
        this.createMatiere(103, 'Éducation Islamique', 'Culture religieuse', '1bac', 'M. Youssef', '#607D8B')
      ],
      '2bac': [
        this.createMatiere(104, 'Arabe', 'Langue arabe et littérature', '2bac', 'M. Rachid', '#2196F3'),
        this.createMatiere(105, 'Français', 'Langue française et littérature', '2bac', 'Mme. Sophie', '#4CAF50'),
        this.createMatiere(106, 'Anglais', 'Langue anglaise', '2bac', 'Mme. Sarah', '#FF5722'),
        this.createMatiere(107, 'Mathématiques', 'Algèbre et géométrie', '2bac', 'M. Ahmed', '#FF9800'),
        this.createMatiere(108, 'SVT', 'Sciences de la vie et de la terre', '2bac', 'Mme. Leila', '#795548'),
        this.createMatiere(109, 'Physique-Chimie', 'Physique et chimie', '2bac', 'M. Omar', '#673AB7'),
        this.createMatiere(110, 'Histoire-Géographie', 'Histoire et géographie', '2bac', 'M. Karim', '#8BC34A'),
        this.createMatiere(111, 'Philosophie', 'Philosophie et pensée critique', '2bac', 'M. Jamal', '#9E9E9E'),
        this.createMatiere(112, 'EPS', 'Éducation physique et sportive', '2bac', 'M. Hassan', '#96CEB4'),
        this.createMatiere(113, 'Éducation Islamique', 'Culture religieuse', '2bac', 'M. Youssef', '#607D8B')
      ]
    };

    return matieresByLevel[level] || [];
  }

  goToMatiere(matiere: Matiere) {
    // Navigation vers les cours de la matière
    const matiereCode = this.getMatiereCode(matiere.nom);
    this.router.navigate(['/calendrier', this.level, matiereCode]);
  }

  getMatiereCode(nom: string): string {
    const matieresMap: { [key: string]: string } = {
      'Mathématiques': 'mathematiques',
      'Français': 'francais',
      'Arabe': 'arabe',
      'Sciences': 'sciences',
      'SVT': 'svt',
      'Physique-Chimie': 'physique',
      'Histoire-Géographie': 'histoire',
      'Anglais': 'anglais',
      'Éducation Islamique': 'islamique',
      'Technologie': 'technologie',
      'EPS': 'eps',
      'Activités Artistiques': 'art',
      'Philosophie': 'philosophie',
      'Éveil Scientifique': 'sciences'
    };
    return matieresMap[nom] || nom.toLowerCase().replace(/\s+/g, '-');
  }

  goBack() {
    this.router.navigate(['/calendrier']);
  }
}
