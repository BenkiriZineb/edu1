import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Matiere, Cours, Note, Quiz, Message, Notification, Eleve } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { EducationService } from '../services/education.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-eleve',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard-eleve.component.html',
  styleUrls: ['./dashboard-eleve.component.css']
})
export class DashboardEleveComponent implements OnInit {
  eleve: Eleve | null = null;
  matieres: Matiere[] = [];
  cours: Cours[] = [];
  notes: Note[] = [];
  quiz: Quiz[] = [];
  messages: Message[] = [];
  notifications: Notification[] = [];
  
  // Statistiques
  moyenneGenerale: number = 0;
  coursRecents: Cours[] = [];
  notesRecentes: Note[] = [];

  constructor(
    private authService: AuthService,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'eleve') {
      this.eleve = user as Eleve;
      this.chargerDonnees();
    } else {
      this.router.navigate(['/login']);
    }
  }

  chargerDonnees(): void {
    if (!this.eleve) return;

    // Charger les matières du niveau de l'élève
    this.educationService.getMatieres(this.eleve.niveau).subscribe(matieres => {
      this.matieres = matieres;
    });

    // Charger les cours
    this.educationService.getCours().subscribe(cours => {
      this.cours = cours.filter(c => c.niveau === this.eleve?.niveau);
      this.coursRecents = this.cours.slice(0, 3); // 3 cours les plus récents
    });

    // Charger les notes
    this.educationService.getNotes(this.eleve.id).subscribe(notes => {
      this.notes = notes;
      this.notesRecentes = notes.slice(0, 5); // 5 notes les plus récentes
      this.calculerMoyenne();
    });

    // Charger les quiz
    this.educationService.getQuiz().subscribe(quiz => {
      this.quiz = quiz.filter(q => this.matieres.some(m => m.nom === q.matiere));
    });

    // Charger les messages
    this.educationService.getMessages(`${this.eleve.prenom} ${this.eleve.nom}`).subscribe(messages => {
      this.messages = messages;
    });

    // Charger les notifications
    this.educationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  // Getters pour éviter les erreurs de compilation
  get notificationsNonLues(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  get hasNotificationsNonLues(): boolean {
    return this.notificationsNonLues > 0;
  }

  calculerMoyenne(): void {
    if (this.notes.length === 0) {
      this.moyenneGenerale = 0;
      return;
    }

    const total = this.notes.reduce((sum, note) => sum + (note.note / note.maxNote) * 20, 0);
    this.moyenneGenerale = Math.round((total / this.notes.length) * 100) / 100;
  }

  getMoyenneMatiere(matiere: string): number {
    const notesMatiere = this.notes.filter(n => n.matiere === matiere);
    if (notesMatiere.length === 0) return 0;

    const total = notesMatiere.reduce((sum, note) => sum + (note.note / note.maxNote) * 20, 0);
    return Math.round((total / notesMatiere.length) * 100) / 100;
  }

  getCouleurNote(note: number): string {
    if (note >= 16) return '#4CAF50'; // Vert
    if (note >= 12) return '#FF9800'; // Orange
    return '#F44336'; // Rouge
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