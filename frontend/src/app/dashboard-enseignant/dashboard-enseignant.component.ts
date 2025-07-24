import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Matiere, Cours, Note, Quiz, Message, Notification, Enseignant, Eleve } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { EducationService } from '../services/education.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-enseignant',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './dashboard-enseignant.component.html',
  styleUrls: ['./dashboard-enseignant.component.css']
})
export class DashboardEnseignantComponent implements OnInit {
  enseignant: Enseignant | null = null;
  matieres: Matiere[] = [];
  cours: Cours[] = [];
  notes: Note[] = [];
  quiz: Quiz[] = [];
  messages: Message[] = [];
  notifications: Notification[] = [];
  
  // Données pour la gestion
  classes: string[] = [];
  eleves: Eleve[] = [];
  
  // Formulaires
  nouveauCours: Partial<Cours> = {};
  nouveauQuiz: Partial<Quiz> = {};
  nouvelleNote: Partial<Note> = {};
  
  // États d'interface
  showCoursForm = false;
  showQuizForm = false;
  showNoteForm = false;
  selectedClasse = '';
  selectedMatiere = '';
  selectedEleve = '';

  constructor(
    private authService: AuthService,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'enseignant') {
      this.enseignant = user as Enseignant;
      this.chargerDonnees();
    } else {
      this.router.navigate(['/login']);
    }
  }

  chargerDonnees(): void {
    if (!this.enseignant) return;

    // Charger les matières de l'enseignant
    this.educationService.getMatieres().subscribe(matieres => {
      this.matieres = matieres.filter(m => this.enseignant?.matieres.includes(m.nom));
    });

    // Charger les cours
    this.educationService.getCours().subscribe(cours => {
      this.cours = cours.filter(c => this.enseignant?.matieres.includes(c.matiere));
    });

    // Charger les notes
    this.educationService.getNotes(0).subscribe(notes => {
      this.notes = notes.filter(n => this.enseignant?.matieres.includes(n.matiere));
    });

    // Charger les quiz
    this.educationService.getQuiz().subscribe(quiz => {
      this.quiz = quiz.filter(q => this.enseignant?.matieres.includes(q.matiere));
    });

    // Charger les messages
    this.educationService.getMessages(this.enseignant.nom).subscribe(messages => {
      this.messages = messages;
    });

    // Charger les notifications
    this.educationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });

    // Simuler les classes et élèves
    this.classes = this.enseignant.classes;
    this.eleves = [
      {
        id: 1,
        username: 'eleve1',
        email: 'eleve1@ecole.com',
        role: 'eleve',
        nom: 'Dupont',
        prenom: 'Marie',
        niveau: '6ème',
        classe: '6A'
      },
      {
        id: 2,
        username: 'eleve2',
        email: 'eleve2@ecole.com',
        role: 'eleve',
        nom: 'Martin',
        prenom: 'Pierre',
        niveau: '6ème',
        classe: '6A'
      }
    ];
  }

  // Getters pour éviter les erreurs de compilation
  get notificationsNonLues(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  get hasNotificationsNonLues(): boolean {
    return this.notificationsNonLues > 0;
  }

  // Gestion des cours
  ajouterCours(): void {
    if (this.nouveauCours.titre && this.nouveauCours.matiere && this.nouveauCours.niveau) {
      const cours: Cours = {
        id: 0,
        titre: this.nouveauCours.titre!,
        matiere: this.nouveauCours.matiere!,
        niveau: this.nouveauCours.niveau!,
        description: this.nouveauCours.description || '',
        dateCreation: new Date(),
        contenu: this.nouveauCours.contenu || '',
        documents: this.nouveauCours.documents || []
      };

      this.educationService.ajouterCours(cours).subscribe(nouveauCours => {
        this.cours.unshift(nouveauCours);
        this.nouveauCours = {};
        this.showCoursForm = false;
      });
    }
  }

  supprimerCours(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.cours = this.cours.filter(c => c.id !== id);
    }
  }

  // Gestion des quiz
  ajouterQuiz(): void {
    if (this.nouveauQuiz.titre && this.nouveauQuiz.matiere) {
      const quiz: Quiz = {
        id: 0,
        titre: this.nouveauQuiz.titre!,
        matiere: this.nouveauQuiz.matiere!,
        questions: this.nouveauQuiz.questions || [],
        dateCreation: new Date(),
        duree: this.nouveauQuiz.duree || 30
      };

      this.educationService.ajouterQuiz(quiz).subscribe(nouveauQuiz => {
        this.quiz.unshift(nouveauQuiz);
        this.nouveauQuiz = {};
        this.showQuizForm = false;
      });
    }
  }

  // Gestion des notes
  ajouterNote(): void {
    if (this.nouvelleNote.eleveId && this.nouvelleNote.matiere && this.nouvelleNote.note && this.nouvelleNote.maxNote) {
      const note: Note = {
        id: 0,
        eleveId: this.nouvelleNote.eleveId!,
        matiere: this.nouvelleNote.matiere!,
        note: this.nouvelleNote.note!,
        maxNote: this.nouvelleNote.maxNote!,
        date: new Date(),
        commentaire: this.nouvelleNote.commentaire || ''
      };

      this.educationService.ajouterNote(note).subscribe(nouvelleNote => {
        this.notes.unshift(nouvelleNote);
        this.nouvelleNote = {};
        this.showNoteForm = false;
      });
    }
  }

  // Statistiques
  getNombreEleves(): number {
    return this.eleves.length;
  }

  getMoyenneClasse(matiere: string): number {
    const notesMatiere = this.notes.filter(n => n.matiere === matiere);
    if (notesMatiere.length === 0) return 0;

    const total = notesMatiere.reduce((sum, note) => sum + (note.note / note.maxNote) * 20, 0);
    return Math.round((total / notesMatiere.length) * 100) / 100;
  }

  getCoursRecents(): Cours[] {
    return this.cours.slice(0, 3);
  }

  getNotesRecentes(): Note[] {
    return this.notes.slice(0, 5);
  }

  // Utilitaires
  getEleveName(eleveId: number): string {
    const eleve = this.eleves.find(e => e.id === eleveId);
    return eleve ? `${eleve.prenom} ${eleve.nom}` : 'Élève inconnu';
  }

  // Méthodes pour éviter les erreurs de compilation dans le template
  getElevesByClasse(classe: string): Eleve[] {
    return this.eleves.filter(e => e.classe === classe);
  }

  getElevesCountByClasse(classe: string): number {
    return this.eleves.filter(e => e.classe === classe).length;
  }

  getNotesByMatiere(matiere: string): Note[] {
    return this.notes.filter(n => n.matiere === matiere);
  }

  getNotesCountByMatiere(matiere: string): number {
    return this.notes.filter(n => n.matiere === matiere).length;
  }

  marquerNotificationCommeLue(id: number): void {
    this.educationService.marquerNotificationCommeLue(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.lu = true;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 