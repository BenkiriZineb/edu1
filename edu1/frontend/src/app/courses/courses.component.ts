import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Chapitre {
  id: number;
  titre: string;
  description: string;
  cours: Cours[];
  isExpanded: boolean;
}

interface Cours {
  id: number;
  titre: string;
  description: string;
  duree: string;
  type: 'video' | 'pdf' | 'quiz' | 'exercice';
  statut: 'disponible' | 'verrouille' | 'termine';
  icone: string;
}

interface Section {
  id: number;
  titre: string;
  description: string;
  duree: string;
  type: 'video' | 'pdf' | 'quiz' | 'exercice';
  isExpanded: boolean;
  ressources: Ressource[];
}

interface Ressource {
  id: number;
  titre: string;
  type: 'video' | 'pdf' | 'quiz' | 'exercice';
  url: string;
  duree: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CoursesComponent implements OnInit {
  level!: string;
  matiere!: string;
  matiereName!: string;
  chapitres: Chapitre[] = [];
  selectedCours: Cours | null = null;
  selectedChapitre: Chapitre | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.level = this.route.snapshot.paramMap.get('level') || '';
    this.matiere = this.route.snapshot.paramMap.get('matiere') || '';
    this.loadMatiereData();
  }

  loadMatiereData() {
    this.loading = true;
    // Simuler un chargement
    setTimeout(() => {
      this.matiereName = this.getMatiereName(this.matiere);
      this.chapitres = this.getChapitresByMatiere(this.matiere);
      this.loading = false;
    }, 500);
  }

  getAllCours(): Cours[] {
    const allCours: Cours[] = [];
    this.chapitres.forEach(chapitre => {
      allCours.push(...chapitre.cours);
    });
    return allCours;
  }

  selectCours(cours: Cours) {
    this.selectedCours = cours;
    this.selectedChapitre = null; // Reset selected chapitre when selecting a new cours
  }

  selectChapitre(chapitre: Chapitre) {
    this.selectedChapitre = chapitre;
  }

  getChapitresForSelectedCours(): Chapitre[] {
    if (!this.selectedCours) return [];
    
    // Find the chapitre that contains the selected cours
    return this.chapitres.filter(chapitre => 
      chapitre.cours.some(cours => cours.id === this.selectedCours?.id)
    );
  }

  getCoursSections(cours: Cours): Section[] {
    // Simuler des sections pour chaque cours
    return [
      {
        id: 1,
        titre: 'Introduction',
        description: 'Présentation générale du cours et des objectifs d\'apprentissage.',
        duree: '15 min',
        type: 'video',
        isExpanded: true,
        ressources: [
          {
            id: 1,
            titre: 'Vidéo d\'introduction',
            type: 'video',
            url: '/video/intro',
            duree: '10 min'
          },
          {
            id: 2,
            titre: 'PDF de présentation',
            type: 'pdf',
            url: '/pdf/intro',
            duree: '5 min'
          }
        ]
      },
      {
        id: 2,
        titre: 'Théorie et concepts',
        description: 'Explication des concepts fondamentaux et de la théorie.',
        duree: '30 min',
        type: 'video',
        isExpanded: false,
        ressources: [
          {
            id: 3,
            titre: 'Cours théorique',
            type: 'video',
            url: '/video/theorie',
            duree: '20 min'
          },
          {
            id: 4,
            titre: 'Support de cours',
            type: 'pdf',
            url: '/pdf/theorie',
            duree: '10 min'
          }
        ]
      },
      {
        id: 3,
        titre: 'Exercices pratiques',
        description: 'Mise en pratique des concepts appris avec des exercices.',
        duree: '25 min',
        type: 'exercice',
        isExpanded: false,
        ressources: [
          {
            id: 5,
            titre: 'Exercices guidés',
            type: 'exercice',
            url: '/exercice/pratique',
            duree: '15 min'
          },
          {
            id: 6,
            titre: 'Quiz d\'évaluation',
            type: 'quiz',
            url: '/quiz/evaluation',
            duree: '10 min'
          }
        ]
      }
    ];
  }

  toggleSection(section: Section) {
    section.isExpanded = !section.isExpanded;
  }

  ouvrirSection(section: Section) {
    console.log('Ouverture de la section:', section.titre);
    // Ici vous pouvez naviguer vers la section ou ouvrir le contenu
  }

  telechargerSection(section: Section) {
    console.log('Téléchargement de la section:', section.titre);
    // Ici vous pouvez implémenter le téléchargement
  }

  getCoursProgression(cours: Cours | null): number {
    if (!cours) return 0;
    // Simuler une progression aléatoire pour la démo
    return Math.floor(Math.random() * 100);
  }

  getMatiereName(matiereCode: string): string {
    const matieres: { [key: string]: string } = {
      'mathematiques': 'Mathématiques',
      'francais': 'Français',
      'arabe': 'Arabe',
      'sciences': 'Sciences',
      'histoire': 'Histoire-Géographie',
      'anglais': 'Anglais',
      'islamique': 'Éducation Islamique',
      'physique': 'Physique-Chimie',
      'svt': 'SVT',
      'technologie': 'Technologie',
      'eps': 'EPS',
      'art': 'Arts Plastiques'
    };
    return matieres[matiereCode] || matiereCode;
  }

  getLevelName(): string {
    const levels: { [key: string]: string } = {
      'ps': 'Petite Section',
      'ms': 'Moyenne Section', 
      'gs': 'Grande Section',
      'ci': 'Cours d\'Initiation',
      'cp': 'Cours Préparatoire',
      'ce1': 'Cours Élémentaire 1',
      'ce2': 'Cours Élémentaire 2',
      'cm1': 'Cours Moyen 1',
      'cm2': 'Cours Moyen 2',
      '1ac': '1ère Année Collège',
      '2ac': '2ème Année Collège',
      '3ac': '3ème Année Collège',
      'tc': 'Tronc Commun',
      '1bac': '1ère Année Bac',
      '2bac': '2ème Année Bac'
    };
    return levels[this.level] || this.level;
  }

  getChapitresByMatiere(matiereCode: string): Chapitre[] {
    const chapitresData: { [key: string]: Chapitre[] } = {
      'mathematiques': [
        {
          id: 1,
          titre: 'Nombres et calculs',
          description: 'Opérations sur les nombres entiers et décimaux',
          isExpanded: true,
          cours: [
            {
              id: 1,
              titre: 'Les nombres entiers',
              description: 'Lecture, écriture et comparaison des nombres entiers',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-plus'
            },
            {
              id: 2,
              titre: 'Addition et soustraction',
              description: 'Techniques de calcul mental et posé',
              duree: '60 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-plus'
            },
            {
              id: 3,
              titre: 'Multiplication et division',
              description: 'Tables de multiplication et division euclidienne',
              duree: '75 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-times'
            },
            {
              id: 4,
              titre: 'Les fractions',
              description: 'Comparaison et opérations sur les fractions',
              duree: '50 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-divide'
            },
            {
              id: 5,
              titre: 'Les nombres décimaux',
              description: 'Lecture, écriture et opérations sur les décimaux',
              duree: '55 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-percentage'
            }
          ]
        },
        {
          id: 2,
          titre: 'Géométrie',
          description: 'Figures géométriques et mesures',
          isExpanded: false,
          cours: [
            {
              id: 6,
              titre: 'Figures planes',
              description: 'Carré, rectangle, triangle, cercle',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-square'
            },
            {
              id: 7,
              titre: 'Périmètre et aire',
              description: 'Calcul des périmètres et aires',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-ruler'
            },
            {
              id: 8,
              titre: 'Solides géométriques',
              description: 'Cube, pavé, cylindre, cône',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-cube'
            },
            {
              id: 9,
              titre: 'Symétrie axiale',
              description: 'Figures symétriques et axes de symétrie',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-mirror'
            }
          ]
        },
        {
          id: 3,
          titre: 'Grandeurs et mesures',
          description: 'Longueurs, masses, capacités, durées',
          isExpanded: false,
          cours: [
            {
              id: 10,
              titre: 'Unités de longueur',
              description: 'Mètre, centimètre, kilomètre',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-ruler-horizontal'
            },
            {
              id: 11,
              titre: 'Unités de masse',
              description: 'Kilogramme, gramme, tonne',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-weight-hanging'
            },
            {
              id: 12,
              titre: 'Unités de capacité',
              description: 'Litre, centilitre, millilitre',
              duree: '25 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-tint'
            },
            {
              id: 13,
              titre: 'Mesure du temps',
              description: 'Heures, minutes, secondes',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-clock'
            }
          ]
        },
        {
          id: 4,
          titre: 'Résolution de problèmes',
          description: 'Problèmes mathématiques',
          isExpanded: false,
          cours: [
            {
              id: 14,
              titre: 'Problèmes additifs',
              description: 'Résolution de problèmes d\'addition et soustraction',
              duree: '40 min',
              type: 'exercice',
              statut: 'disponible',
              icone: 'fas fa-calculator'
            },
            {
              id: 15,
              titre: 'Problèmes multiplicatifs',
              description: 'Résolution de problèmes de multiplication et division',
              duree: '45 min',
              type: 'exercice',
              statut: 'disponible',
              icone: 'fas fa-calculator'
            },
            {
              id: 16,
              titre: 'Quiz final',
              description: 'Évaluation des connaissances',
              duree: '20 min',
              type: 'quiz',
              statut: 'verrouille',
              icone: 'fas fa-question-circle'
            }
          ]
        }
      ],
      'francais': [
        {
          id: 1,
          titre: 'Lecture et compréhension',
          description: 'Compréhension de textes variés',
          isExpanded: true,
          cours: [
            {
              id: 17,
              titre: 'Lecture à haute voix',
              description: 'Techniques de lecture fluide et expressive',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-book-open'
            },
            {
              id: 18,
              titre: 'Compréhension de texte',
              description: 'Stratégies de compréhension et d\'analyse',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-search'
            },
            {
              id: 19,
              titre: 'Textes documentaires',
              description: 'Lecture et analyse de textes informatifs',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-file-alt'
            },
            {
              id: 20,
              titre: 'Textes narratifs',
              description: 'Lecture et analyse de récits',
              duree: '50 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-book'
            }
          ]
        },
        {
          id: 2,
          titre: 'Grammaire',
          description: 'Étude de la langue française',
          isExpanded: false,
          cours: [
            {
              id: 21,
              titre: 'Classes grammaticales',
              description: 'Nom, verbe, adjectif, déterminant',
              duree: '50 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-language'
            },
            {
              id: 22,
              titre: 'Conjugaison',
              description: 'Temps verbaux du présent, passé, futur',
              duree: '55 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-magic'
            },
            {
              id: 23,
              titre: 'Accord sujet-verbe',
              description: 'Règles d\'accord et exceptions',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-link'
            },
            {
              id: 24,
              titre: 'Les pronoms',
              description: 'Pronoms personnels, possessifs, démonstratifs',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-user'
            }
          ]
        },
        {
          id: 3,
          titre: 'Expression écrite',
          description: 'Production de textes',
          isExpanded: false,
          cours: [
            {
              id: 25,
              titre: 'Rédaction de phrases',
              description: 'Construction de phrases correctes et variées',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-pen'
            },
            {
              id: 26,
              titre: 'Récit personnel',
              description: 'Écriture d\'un récit de vie',
              duree: '50 min',
              type: 'exercice',
              statut: 'disponible',
              icone: 'fas fa-edit'
            },
            {
              id: 27,
              titre: 'Description',
              description: 'Écriture de textes descriptifs',
              duree: '45 min',
              type: 'exercice',
              statut: 'disponible',
              icone: 'fas fa-paint-brush'
            },
            {
              id: 28,
              titre: 'Lettre',
              description: 'Rédaction de lettres formelles et informelles',
              duree: '40 min',
              type: 'exercice',
              statut: 'disponible',
              icone: 'fas fa-envelope'
            }
          ]
        }
      ],
      'arabe': [
        {
          id: 1,
          titre: 'Lecture et écriture',
          description: 'Maîtrise de l\'alphabet arabe',
          isExpanded: true,
          cours: [
            {
              id: 29,
              titre: 'L\'alphabet arabe',
              description: 'Apprentissage des 28 lettres de l\'alphabet',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-font'
            },
            {
              id: 30,
              titre: 'Lecture de mots',
              description: 'Lecture de mots simples et complexes',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-book'
            },
            {
              id: 31,
              titre: 'Écriture arabe',
              description: 'Calligraphie arabe et règles d\'écriture',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-pen-fancy'
            },
            {
              id: 32,
              titre: 'Les voyelles',
              description: 'Voyelles courtes et longues en arabe',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-volume-up'
            }
          ]
        },
        {
          id: 2,
          titre: 'Grammaire arabe',
          description: 'Règles grammaticales de base',
          isExpanded: false,
          cours: [
            {
              id: 33,
              titre: 'Les noms',
              description: 'Genre et nombre en arabe',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-tags'
            },
            {
              id: 34,
              titre: 'Les verbes',
              description: 'Conjugaison des verbes arabes',
              duree: '50 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-running'
            },
            {
              id: 35,
              titre: 'Les adjectifs',
              description: 'Accord des adjectifs en arabe',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-star'
            },
            {
              id: 36,
              titre: 'Les prépositions',
              description: 'Utilisation des prépositions arabes',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-arrow-right'
            }
          ]
        },
        {
          id: 3,
          titre: 'Expression orale',
          description: 'Communication en arabe',
          isExpanded: false,
          cours: [
            {
              id: 37,
              titre: 'Conversation de base',
              description: 'Dialogues simples en arabe',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-comments'
            },
            {
              id: 38,
              titre: 'Vocabulaire thématique',
              description: 'Mots et expressions par thèmes',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-list'
            },
            {
              id: 39,
              titre: 'Prononciation',
              description: 'Sons spécifiques de l\'arabe',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-microphone'
            }
          ]
        }
      ],
      'sciences': [
        {
          id: 1,
          titre: 'Le monde vivant',
          description: 'Les êtres vivants et leur environnement',
          isExpanded: true,
          cours: [
            {
              id: 40,
              titre: 'Les animaux',
              description: 'Classification et modes de vie des animaux',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-paw'
            },
            {
              id: 41,
              titre: 'Les plantes',
              description: 'Cycle de vie et besoins des végétaux',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-seedling'
            },
            {
              id: 42,
              titre: 'Les écosystèmes',
              description: 'Interactions dans la nature',
              duree: '50 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-tree'
            },
            {
              id: 43,
              titre: 'La chaîne alimentaire',
              description: 'Relations alimentaires entre êtres vivants',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-link'
            }
          ]
        },
        {
          id: 2,
          titre: 'Le corps humain',
          description: 'Anatomie et physiologie',
          isExpanded: false,
          cours: [
            {
              id: 44,
              titre: 'Les organes des sens',
              description: 'Vue, ouïe, toucher, goût, odorat',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-eye'
            },
            {
              id: 45,
              titre: 'L\'alimentation',
              description: 'Équilibre alimentaire et nutrition',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-apple-alt'
            },
            {
              id: 46,
              titre: 'L\'hygiène',
              description: 'Règles d\'hygiène corporelle',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-shower'
            },
            {
              id: 47,
              titre: 'La respiration',
              description: 'Système respiratoire et respiration',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-lungs'
            }
          ]
        },
        {
          id: 3,
          titre: 'Matière et énergie',
          description: 'Propriétés de la matière',
          isExpanded: false,
          cours: [
            {
              id: 48,
              titre: 'Les états de la matière',
              description: 'Solide, liquide, gazeux',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-atom'
            },
            {
              id: 49,
              titre: 'Les changements d\'état',
              description: 'Fusion, solidification, évaporation',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-thermometer-half'
            },
            {
              id: 50,
              titre: 'L\'électricité',
              description: 'Circuits électriques simples',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-bolt'
            },
            {
              id: 51,
              titre: 'La lumière',
              description: 'Sources de lumière et ombres',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-lightbulb'
            }
          ]
        }
      ],
      'histoire': [
        {
          id: 1,
          titre: 'Histoire du Maroc',
          description: 'Les grandes périodes historiques',
          isExpanded: true,
          cours: [
            {
              id: 52,
              titre: 'Les dynasties marocaines',
              description: 'De l\'Antiquité à nos jours',
              duree: '50 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-crown'
            },
            {
              id: 53,
              titre: 'Les grandes villes historiques',
              description: 'Fès, Marrakech, Meknès, Rabat',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-city'
            },
            {
              id: 54,
              titre: 'Le Maroc moderne',
              description: 'Indépendance et développement',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-flag'
            },
            {
              id: 55,
              titre: 'Les monuments historiques',
              description: 'Patrimoine architectural marocain',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-mosque'
            }
          ]
        },
        {
          id: 2,
          titre: 'Géographie du Maroc',
          description: 'Relief, climat, ressources',
          isExpanded: false,
          cours: [
            {
              id: 56,
              titre: 'Le relief marocain',
              description: 'Montagnes, plaines, désert',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-mountain'
            },
            {
              id: 57,
              titre: 'Les régions naturelles',
              description: 'Diversité géographique du Maroc',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-map'
            },
            {
              id: 58,
              titre: 'Le climat',
              description: 'Climats du Maroc et saisons',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-cloud-sun'
            },
            {
              id: 59,
              titre: 'Les ressources naturelles',
              description: 'Agriculture, mines, pêche',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-gem'
            }
          ]
        }
      ],
      'anglais': [
        {
          id: 1,
          titre: 'Communication de base',
          description: 'Expressions quotidiennes',
          isExpanded: true,
          cours: [
            {
              id: 60,
              titre: 'Se présenter',
              description: 'Hello, my name is...',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-user'
            },
            {
              id: 61,
              titre: 'Les couleurs',
              description: 'Red, blue, green, yellow...',
              duree: '25 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-palette'
            },
            {
              id: 62,
              titre: 'Les nombres',
              description: 'Counting from 1 to 20',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-sort-numeric-up'
            },
            {
              id: 63,
              titre: 'Les jours de la semaine',
              description: 'Monday, Tuesday, Wednesday...',
              duree: '25 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-calendar-day'
            }
          ]
        },
        {
          id: 2,
          titre: 'Vocabulaire thématique',
          description: 'Mots par thèmes',
          isExpanded: false,
          cours: [
            {
              id: 64,
              titre: 'La famille',
              description: 'Family members vocabulary',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-users'
            },
            {
              id: 65,
              titre: 'Les animaux',
              description: 'Animals vocabulary',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-dog'
            },
            {
              id: 66,
              titre: 'Les vêtements',
              description: 'Clothes vocabulary',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-tshirt'
            },
            {
              id: 67,
              titre: 'La nourriture',
              description: 'Food vocabulary',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-utensils'
            }
          ]
        }
      ],
      'islamique': [
        {
          id: 1,
          titre: 'Les piliers de l\'Islam',
          description: 'Fondements de la religion musulmane',
          isExpanded: true,
          cours: [
            {
              id: 68,
              titre: 'La profession de foi',
              description: 'Chahada et ses significations',
              duree: '40 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-star'
            },
            {
              id: 69,
              titre: 'La prière',
              description: 'Les cinq prières quotidiennes',
              duree: '45 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-pray'
            },
            {
              id: 70,
              titre: 'Le jeûne',
              description: 'Ramadan et ses vertus',
              duree: '35 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-sun'
            },
            {
              id: 71,
              titre: 'La zakat',
              description: 'L\'aumône légale',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-hand-holding-heart'
            }
          ]
        },
        {
          id: 2,
          titre: 'Les valeurs islamiques',
          description: 'Éthique et comportement',
          isExpanded: false,
          cours: [
            {
              id: 72,
              titre: 'Le respect',
              description: 'Respect des parents et des aînés',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-heart'
            },
            {
              id: 73,
              titre: 'L\'honnêteté',
              description: 'Dire la vérité et être honnête',
              duree: '25 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-handshake'
            },
            {
              id: 74,
              titre: 'La générosité',
              description: 'Partager et aider les autres',
              duree: '30 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-gift'
            },
            {
              id: 75,
              titre: 'La patience',
              description: 'Endurer les difficultés',
              duree: '25 min',
              type: 'video',
              statut: 'disponible',
              icone: 'fas fa-clock'
            }
          ]
        }
      ]
    };

    return chapitresData[matiereCode] || [
      {
        id: 1,
        titre: 'Introduction',
        description: 'Première approche de la matière',
        isExpanded: true,
        cours: [
          {
            id: 1,
            titre: 'Cours d\'introduction',
            description: 'Découverte de la matière',
            duree: '45 min',
            type: 'video',
            statut: 'disponible',
            icone: 'fas fa-play'
          }
        ]
      }
    ];
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'video': return 'Vidéo';
      case 'pdf': return 'PDF';
      case 'quiz': return 'Quiz';
      case 'exercice': return 'Exercice';
      default: return 'Cours';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'video': return 'fas fa-play';
      case 'pdf': return 'fas fa-file-pdf';
      case 'quiz': return 'fas fa-question-circle';
      case 'exercice': return 'fas fa-pencil-alt';
      default: return 'fas fa-file';
    }
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'disponible': return 'status-available';
      case 'verrouille': return 'status-locked';
      case 'termine': return 'status-completed';
      default: return '';
    }
  }

  ouvrirCours(cours: Cours) {
    if (cours.statut === 'disponible' || cours.statut === 'termine') {
      console.log('Ouverture du cours:', cours.titre);
    }
  }

  goBack() {
    this.router.navigate(['/calendrier', this.level]);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  trackByCours(index: number, cours: Cours): number {
    return cours.id;
  }

  trackBySection(index: number, section: Section): number {
    return section.id;
  }

  trackByChapitre(index: number, chapitre: Chapitre): number {
    return chapitre.id;
  }
}
