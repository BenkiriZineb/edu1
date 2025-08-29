import { Component, OnInit, Input } from '@angular/core';
import { NoteService, Note, NoteStats } from '../../services/note.service';

@Component({
  selector: 'app-statistiques-notes',
  templateUrl: './statistiques-notes.component.html',
  styleUrls: ['./statistiques-notes.component.css']
})
export class StatistiquesNotesComponent implements OnInit {
  @Input() eleveId?: number;
  @Input() matiereId?: number;
  
  notes: Note[] = [];
  stats: NoteStats | null = null;
  progressionParMatiere: any[] = [];
  notesParType: any[] = [];
  evolutionTemporelle: any[] = [];
  
  isLoading = false;
  error: string | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.chargerStatistiques();
  }

  ngOnChanges(): void {
    this.chargerStatistiques();
  }

  chargerStatistiques(): void {
    this.isLoading = true;
    this.error = null;

    if (this.eleveId && this.matiereId) {
      // Statistiques pour un élève dans une matière spécifique
      this.chargerStatsEleveMatiere();
    } else if (this.eleveId) {
      // Statistiques pour un élève
      this.chargerStatsEleve();
    } else {
      // Statistiques globales
      this.chargerStatsGlobales();
    }
  }

  private chargerStatsEleveMatiere(): void {
    // Statistiques détaillées pour un élève dans une matière
    this.noteService.getStatsEleveMatiere(this.eleveId!, this.matiereId!).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.chargerProgressionMatiere();
        this.chargerNotesParType();
        this.chargerEvolutionTemporelle();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.isLoading = false;
        console.error('Erreur stats élève-matière:', error);
      }
    });
  }

  private chargerStatsEleve(): void {
    // Statistiques pour un élève
    this.noteService.getStatsEleve(this.eleveId!).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.chargerProgressionParMatiere();
        this.chargerNotesParType();
        this.chargerEvolutionTemporelle();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des statistiques';
        this.isLoading = false;
        console.error('Erreur stats élève:', error);
      }
    });
  }

  private chargerStatsGlobales(): void {
    // Statistiques globales
    this.noteService.getAllNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.calculerStatsGlobales();
        this.chargerNotesParType();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des notes';
        this.isLoading = false;
        console.error('Erreur notes globales:', error);
      }
    });
  }

  private chargerProgressionParMatiere(): void {
    if (!this.eleveId) return;

    // Simuler la progression par matière (à remplacer par l'API réelle)
    this.progressionParMatiere = [
      { matiere: 'Mathématiques', progression: 85, couleur: '#4CAF50' },
      { matiere: 'Français', progression: 72, couleur: '#2196F3' },
      { matiere: 'Histoire', progression: 68, couleur: '#FF9800' },
      { matiere: 'Sciences', progression: 91, couleur: '#9C27B0' }
    ];
  }

  private chargerProgressionParMatiere(): void {
    if (!this.eleveId) return;

    // Simuler la progression par matière (à remplacer par l'API réelle)
    this.progressionParMatiere = [
      { matiere: 'Mathématiques', progression: 85, couleur: '#4CAF50' },
      { matiere: 'Français', progression: 72, couleur: '#2196F3' },
      { matiere: 'Histoire', progression: 68, couleur: '#FF9800' },
      { matiere: 'Sciences', progression: 91, couleur: '#9C27B0' }
    ];
  }

  private chargerNotesParType(): void {
    if (!this.eleveId) return;

    // Simuler les notes par type (à remplacer par l'API réelle)
    this.notesParType = [
      { type: 'DEVOIR', moyenne: 78, nombre: 12, couleur: '#4CAF50' },
      { type: 'EXAMEN', moyenne: 82, nombre: 6, couleur: '#2196F3' },
      { type: 'QUIZ', moyenne: 91, nombre: 8, couleur: '#FF9800' },
      { type: 'CONTROLE', moyenne: 75, nombre: 10, couleur: '#9C27B0' }
    ];
  }

  private chargerEvolutionTemporelle(): void {
    if (!this.eleveId) return;

    // Simuler l'évolution temporelle (à remplacer par l'API réelle)
    this.evolutionTemporelle = [
      { mois: 'Jan', moyenne: 75 },
      { mois: 'Fév', moyenne: 78 },
      { mois: 'Mar', moyenne: 82 },
      { mois: 'Avr', moyenne: 79 },
      { mois: 'Mai', moyenne: 85 },
      { mois: 'Juin', moyenne: 88 }
    ];
  }

  private calculerStatsGlobales(): void {
    if (this.notes.length === 0) return;

    const totalNotes = this.notes.length;
    const moyennes = this.notes.map(note => 
      this.noteService.calculerPourcentage(note)
    );
    
    const moyenneGlobale = moyennes.reduce((a, b) => a + b, 0) / totalNotes;
    const noteMax = Math.max(...moyennes);
    const noteMin = Math.min(...moyennes);

    this.stats = {
      moyenne: Math.round(moyenneGlobale * 100) / 100,
      noteMaximale: noteMax,
      noteMinimale: noteMin,
      totalNotes: totalNotes
    };
  }

  getCouleurNote(pourcentage: number): string {
    return this.noteService.getCouleurNote(pourcentage);
  }

  getAppreciation(pourcentage: number): string {
    return this.noteService.getAppreciation(pourcentage);
  }

  getNiveauPerformance(pourcentage: number): string {
    if (pourcentage >= 90) return 'Excellent';
    if (pourcentage >= 80) return 'Très bien';
    if (pourcentage >= 70) return 'Bien';
    if (pourcentage >= 60) return 'Assez bien';
    if (pourcentage >= 50) return 'Passable';
    return 'Insuffisant';
  }

  getIconePerformance(pourcentage: number): string {
    if (pourcentage >= 90) return '🏆';
    if (pourcentage >= 80) return '⭐';
    if (pourcentage >= 70) return '👍';
    if (pourcentage >= 60) return '✅';
    if (pourcentage >= 50) return '⚠️';
    return '❌';
  }

  getCouleurPerformance(pourcentage: number): string {
    if (pourcentage >= 90) return '#4CAF50';
    if (pourcentage >= 80) return '#8BC34A';
    if (pourcentage >= 70) return '#FFC107';
    if (pourcentage >= 60) return '#FF9800';
    if (pourcentage >= 50) return '#FF5722';
    return '#F44336';
  }

  rafraichir(): void {
    this.chargerStatistiques();
  }
}
