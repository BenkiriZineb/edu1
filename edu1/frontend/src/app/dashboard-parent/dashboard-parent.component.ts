import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Matiere, Cours, Note, Quiz, Message, Notification, Parent, Eleve } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { EducationService } from '../services/education.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-parent',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.css']
})
export class DashboardParentComponent implements OnInit {
  parent: Parent | null = null;
  enfants: Eleve[] = [];
  
  // Données pour chaque enfant
  matieresEnfants: { [key: number]: Matiere[] } = {};
  coursEnfants: { [key: number]: Cours[] } = {};
  notesEnfants: { [key: number]: Note[] } = {};
  quizEnfants: { [key: number]: Quiz[] } = {};
  
  // Matières globales pour les méthodes helper
  matieres: Matiere[] = [];
  
  // Messages et notifications
  messages: Message[] = [];
  notifications: Notification[] = [];
  
  // État d'interface
  selectedEnfant: Eleve | null = null;
  showEnfantDetails = false;

  constructor(
    private authService: AuthService,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.role === 'parent') {
      this.parent = user as Parent;
      this.enfants = this.parent.enfants;
      if (this.enfants.length > 0) {
        this.selectedEnfant = this.enfants[0];
      }
      this.chargerDonnees();
    } else {
      this.router.navigate(['/login']);
    }
  }

  chargerDonnees(): void {
    if (!this.parent) return;

    // Charger toutes les matières pour les méthodes helper
    this.educationService.getMatieres().subscribe(matieres => {
      this.matieres = matieres;
    });

    // Charger les données pour chaque enfant
    this.enfants.forEach(enfant => {
      this.chargerDonneesEnfant(enfant);
    });

    // Charger les messages
    this.educationService.getMessages(`${this.parent.prenom} ${this.parent.nom}`).subscribe(messages => {
      this.messages = messages;
    });

    // Charger les notifications
    this.educationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  chargerDonneesEnfant(enfant: Eleve): void {
    // Charger les matières
    this.educationService.getMatieres(enfant.niveau).subscribe(matieres => {
      this.matieresEnfants[enfant.id] = matieres;
    });

    // Charger les cours
    this.educationService.getCours().subscribe(cours => {
      this.coursEnfants[enfant.id] = cours.filter(c => c.niveau === enfant.niveau);
    });

    // Charger les notes
    this.educationService.getNotes(enfant.id).subscribe(notes => {
      this.notesEnfants[enfant.id] = notes;
    });

    // Charger les quiz
    this.educationService.getQuiz().subscribe(quiz => {
      this.quizEnfants[enfant.id] = quiz.filter(q => 
        this.matieresEnfants[enfant.id]?.some(m => m.nom === q.matiere)
      );
    });
  }

  // Sélection d'enfant
  selectEnfant(enfant: Eleve): void {
    this.selectedEnfant = enfant;
    this.showEnfantDetails = true;
  }

  // Getters pour éviter les erreurs de compilation
  get notificationsNonLues(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  get hasNotificationsNonLues(): boolean {
    return this.notificationsNonLues > 0;
  }

  get notesEnfantSelectionne(): Note[] {
    if (!this.selectedEnfant) return [];
    return this.notesEnfants[this.selectedEnfant.id] || [];
  }

  get coursEnfantSelectionne(): Cours[] {
    if (!this.selectedEnfant) return [];
    return this.coursEnfants[this.selectedEnfant.id] || [];
  }

  get matieresEnfantSelectionne(): Matiere[] {
    if (!this.selectedEnfant) return [];
    return this.matieresEnfants[this.selectedEnfant.id] || [];
  }

  // Statistiques par enfant
  getMoyenneEnfant(eleveId: number): number {
    const notes = this.notesEnfants[eleveId] || [];
    if (notes.length === 0) return 0;

    const total = notes.reduce((sum, note) => sum + (note.valeur / note.noteMaximale) * 20, 0);
    return Math.round((total / notes.length) * 100) / 100;
  }

  getMoyenneMatiereEnfant(eleveId: number, matiere: string): number {
    const notes = this.notesEnfants[eleveId] || [];
    const notesMatiere = notes.filter(n => n.matiereId === this.getMatiereId(matiere));
    if (notesMatiere.length === 0) return 0;

    const total = notesMatiere.reduce((sum, note) => sum + (note.valeur / note.noteMaximale) * 20, 0);
    return Math.round((total / notesMatiere.length) * 100) / 100;
  }

  getCouleurNote(note: number): string {
    if (note >= 16) return '#4CAF50'; // Vert
    if (note >= 12) return '#FF9800'; // Orange
    return '#F44336'; // Rouge
  }

  // Activités récentes
  getActivitesRecentes(): any[] {
    const activites: any[] = [];
    
    this.enfants.forEach(enfant => {
      const notes = this.notesEnfants[enfant.id] || [];
      const cours = this.coursEnfants[enfant.id] || [];
      
      notes.forEach(note => {
        activites.push({
          type: 'note',
          enfant: enfant,
          date: note.date,
          description: `Nouvelle note en ${this.getMatiereNom(note.matiereId)}: ${note.valeur}/${note.noteMaximale}`,
          data: note
        });
      });
      
      cours.forEach(cours => {
        activites.push({
          type: 'cours',
          enfant: enfant,
          date: cours.dateCreation,
          description: `Nouveau cours: ${cours.titre}`,
          data: cours
        });
      });
    });
    
    return activites
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }

  // Progression par enfant
  getProgressionEnfant(eleveId: number): { matiere: string; moyenne: number; couleur: string }[] {
    const matieres = this.matieresEnfants[eleveId] || [];
    return matieres.map(matiere => {
      const moyenne = this.getMoyenneMatiereEnfant(eleveId, matiere.nom);
      return {
        matiere: matiere.nom,
        moyenne: moyenne,
        couleur: matiere.couleur
      };
    });
  }

  // Messages des professeurs
  getMessagesProfesseurs(): Message[] {
    return this.messages.filter(m => m.expediteur.includes('M.') || m.expediteur.includes('Mme'));
  }

  marquerNotificationCommeLue(id: number): void {
    this.educationService.marquerNotificationCommeLue(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.lu = true;
      }
    });
  }

  // Méthodes helper pour la gestion des matières
  getMatiereId(matiereNom: string): number | undefined {
    const matiere = this.matieres.find(m => m.nom === matiereNom);
    return matiere?.id;
  }

  getMatiereNom(matiereId?: number): string {
    if (!matiereId) return 'Matière inconnue';
    const matiere = this.matieres.find(m => m.id === matiereId);
    return matiere ? matiere.nom : 'Matière inconnue';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 