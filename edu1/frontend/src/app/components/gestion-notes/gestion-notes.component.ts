import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService, Note } from '../../services/note.service';

@Component({
  selector: 'app-gestion-notes',
  templateUrl: './gestion-notes.component.html',
  styleUrls: ['./gestion-notes.component.css']
})
export class GestionNotesComponent implements OnInit {
  notes: Note[] = [];
  noteForm: FormGroup;
  isEditing = false;
  editingNoteId: number | null = null;
  selectedEleveId: number = 1;
  selectedMatiereId: number = 1;
  selectedCoursId: number = 1;
  typesNote = ['DEVOIR', 'EXAMEN', 'QUIZ', 'CONTROLE', 'PARTICIPATION', 'AUTRE'];
  matieres = [
    { id: 1, nom: 'Mathématiques' },
    { id: 2, nom: 'Français' },
    { id: 3, nom: 'Histoire' },
    { id: 4, nom: 'Géographie' },
    { id: 5, nom: 'Sciences' }
  ];
  cours = [
    { id: 1, nom: 'Algèbre de base' },
    { id: 2, nom: 'Géométrie' },
    { id: 3, nom: 'Grammaire' },
    { id: 4, nom: 'Littérature' },
    { id: 5, nom: 'Histoire moderne' }
  ];
  eleves = [
    { id: 1, nom: 'Dupont', prenom: 'Jean' },
    { id: 2, nom: 'Martin', prenom: 'Marie' },
    { id: 3, nom: 'Bernard', prenom: 'Pierre' }
  ];

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      eleveId: ['', Validators.required],
      coursId: ['', Validators.required],
      matiereId: ['', Validators.required],
      valeur: ['', [Validators.required, Validators.min(0)]],
      noteMaximale: ['', [Validators.required, Validators.min(1)]],
      commentaire: [''],
      date: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerNotes();
    this.noteForm.patchValue({
      eleveId: this.selectedEleveId,
      coursId: this.selectedCoursId,
      matiereId: this.selectedMatiereId,
      date: new Date().toISOString().split('T')[0]
    });
  }

  chargerNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        console.log('Notes chargées:', notes);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notes:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      
      if (this.isEditing && this.editingNoteId) {
        // Mise à jour
        this.noteService.updateNote(this.editingNoteId, noteData).subscribe({
          next: (note) => {
            console.log('Note mise à jour:', note);
            this.chargerNotes();
            this.resetForm();
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
          }
        });
      } else {
        // Création
        this.noteService.createNote(noteData).subscribe({
          next: (note) => {
            console.log('Note créée:', note);
            this.chargerNotes();
            this.resetForm();
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
          }
        });
      }
    }
  }

  editerNote(note: Note): void {
    this.isEditing = true;
    this.editingNoteId = note.id || null;
    this.noteForm.patchValue({
      eleveId: note.eleveId,
      coursId: note.coursId,
      matiereId: note.matiereId,
      valeur: note.valeur,
      noteMaximale: note.noteMaximale,
      commentaire: note.commentaire,
      date: note.date,
      type: note.type
    });
  }

  supprimerNote(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      this.noteService.deleteNote(id).subscribe({
        next: () => {
          console.log('Note supprimée');
          this.chargerNotes();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.noteForm.reset();
    this.isEditing = false;
    this.editingNoteId = null;
    this.noteForm.patchValue({
      eleveId: this.selectedEleveId,
      coursId: this.selectedCoursId,
      matiereId: this.selectedMatiereId,
      date: new Date().toISOString().split('T')[0]
    });
  }

  filtrerParEleve(eleveId: number): void {
    this.selectedEleveId = eleveId;
    this.noteService.getNotesByEleve(eleveId).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error('Erreur lors du filtrage:', error);
      }
    });
  }

  filtrerParMatiere(matiereId: number): void {
    this.selectedMatiereId = matiereId;
    this.noteService.getNotesByMatiere(matiereId).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error('Erreur lors du filtrage:', error);
      }
    });
  }

  calculerPourcentage(note: Note): number {
    return this.noteService.calculerPourcentage(note);
  }

  getCouleurNote(note: Note): string {
    const pourcentage = this.calculerPourcentage(note);
    return this.noteService.getCouleurNote(pourcentage);
  }

  getAppreciation(note: Note): string {
    const pourcentage = this.calculerPourcentage(note);
    return this.noteService.getAppreciation(pourcentage);
  }

  getEleveNom(eleveId: number): string {
    const eleve = this.eleves.find(e => e.id === eleveId);
    return eleve ? `${eleve.prenom} ${eleve.nom}` : `Élève ${eleveId}`;
  }

  getMatiereNom(matiereId: number): string {
    const matiere = this.matieres.find(m => m.id === matiereId);
    return matiere ? matiere.nom : `Matière ${matiereId}`;
  }

  getCoursNom(coursId: number): string {
    const cours = this.cours.find(c => c.id === coursId);
    return cours ? cours.nom : `Cours ${coursId}`;
  }
}
