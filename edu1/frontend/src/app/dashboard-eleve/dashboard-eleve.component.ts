import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Matiere, Cours, Note, Quiz, Message, Notification, Eleve } from '../models/user.model';
import { AuthBackendService } from '../services/auth-backend.service';
import { EducationService } from '../services/education.service';
import { NoteService, NoteStats } from '../services/note.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-eleve',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
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
  
  // Nouvelles propriétés pour les notes
  statsEleve: NoteStats | null = null;
  progressionParMatiere: Map<string, number> = new Map();
  notesParType: Map<string, number> = new Map();
  
  // Statut de la connexion backend
  backendStatus: 'connected' | 'disconnected' | 'loading' = 'loading';
  

  constructor(
    private authBackendService: AuthBackendService,
    private educationService: EducationService,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🔍 Dashboard Élève - Initialisation...');
    
    // Récupérer les informations de l'utilisateur connecté depuis le localStorage
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('👤 Utilisateur connecté depuis localStorage:', user);
        
        if (user && user.role === 'ELEVE') {
          // Créer un objet Eleve avec les vraies données
          this.eleve = {
            id: user.id,
            username: user.email, // Utiliser l'email comme username
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role.toLowerCase() as 'eleve',
            niveau: 'Terminale', // Valeur par défaut
            classe: 'S', // Valeur par défaut
            niveauScolaire: user.niveauScolaire || 'Non défini', // Récupérer le niveau scolaire
            niveauEtude: user.niveauEtude || 'Non défini', // Récupérer le niveau d'étude
            parentId: undefined // Utiliser undefined au lieu de null
          };
          
          console.log('✅ Élève créé avec les vraies données:', this.eleve);
          this.chargerDonnees();
        } else {
          console.log('❌ Utilisateur non trouvé ou mauvais rôle:', user);
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('❌ Erreur lors du parsing des données utilisateur:', error);
        this.router.navigate(['/login']);
      }
    } else {
      console.log('❌ Aucun utilisateur connecté trouvé');
      this.router.navigate(['/login']);
    }
  }

  chargerDonnees(): void {
    if (!this.eleve) return;
    
    console.log('📚 Chargement des données pour l\'élève:', this.eleve.nom);

    // Charger les matières du niveau de l'élève
    this.educationService.getMatieres(this.eleve.niveau).subscribe(matieres => {
      this.matieres = matieres;
      console.log('📖 Matières chargées:', matieres);
    });

    // Charger les cours
    this.educationService.getCours().subscribe(cours => {
      this.cours = cours.filter(c => c.niveau === this.eleve?.niveau);
      this.coursRecents = this.cours.slice(0, 3); // 3 cours les plus récents
    });

    // Charger les notes avec le nouveau service
    this.chargerNotesEleve();

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

  chargerNotesEleve(): void {
    if (!this.eleve) return;

    console.log('📊 Chargement des notes depuis le backend...');

    // Charger toutes les notes de l'élève depuis le backend
    this.noteService.getNotesByEleve(this.eleve.id).subscribe({
      next: (notes) => {
        console.log('✅ Notes chargées depuis le backend:', notes);
        this.backendStatus = 'connected';
        this.notes = notes;
        this.notesRecentes = notes.slice(0, 5);
        this.calculerMoyenne();
        this.calculerProgressionParMatiere();
        this.calculerNotesParType();
      },
      error: (error) => {
        console.warn('⚠️ Erreur backend, utilisation des données simulées:', error);
        this.backendStatus = 'disconnected';
        // Fallback vers les données simulées
        this.chargerNotesSimulees();
      }
    });

    // Charger les statistiques de l'élève
    this.noteService.getStatsEleve(this.eleve.id).subscribe({
      next: (stats) => {
        console.log('✅ Statistiques chargées depuis le backend:', stats);
        this.statsEleve = stats;
      },
      error: (error) => {
        console.warn('⚠️ Erreur statistiques backend:', error);
        // Les statistiques seront calculées localement
      }
    });
  }

  // Méthode de fallback vers les données simulées
  chargerNotesSimulees(): void {
    console.log('🔄 Chargement des notes simulées...');
    this.educationService.getNotes(this.eleve!.id).subscribe(notes => {
      this.notes = notes;
      this.notesRecentes = notes.slice(0, 5);
      this.calculerMoyenne();
      this.calculerProgressionParMatiere();
      this.calculerNotesParType();
    });
  }

  calculerProgressionParMatiere(): void {
    this.progressionParMatiere.clear();
    
    this.matieres.forEach(matiere => {
      const notesMatiere = this.notes.filter(n => n.matiereId === matiere.id);
      if (notesMatiere.length > 0) {
        const moyenne = this.noteService.calculerPourcentage(notesMatiere[0]);
        this.progressionParMatiere.set(matiere.nom, moyenne);
      }
    });
  }

  calculerNotesParType(): void {
    this.notesParType.clear();
    
    const types = ['DEVOIR', 'EXAMEN', 'QUIZ', 'CONTROLE', 'PARTICIPATION'];
    types.forEach(type => {
      const count = this.notes.filter(n => n.type === type).length;
      this.notesParType.set(type, count);
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

    const total = this.notes.reduce((sum, note) => {
      const pourcentage = this.noteService.calculerPourcentage(note);
      return sum + pourcentage;
    }, 0);
    
    this.moyenneGenerale = Math.round((total / this.notes.length) * 100) / 100;
  }

  getMoyenneMatiere(matiere: string): number {
    const notesMatiere = this.notes.filter(n => n.matiereId === this.matieres.find(m => m.nom === matiere)?.id);
    if (notesMatiere.length === 0) return 0;

    const total = notesMatiere.reduce((sum, note) => {
      const pourcentage = this.noteService.calculerPourcentage(note);
      return sum + pourcentage;
    }, 0);
    
    return Math.round((total / notesMatiere.length) * 100) / 100;
  }

  getCouleurNote(note: Note): string {
    const pourcentage = this.noteService.calculerPourcentage(note);
    return this.noteService.getCouleurNote(pourcentage);
  }

  getAppreciation(note: Note): string {
    const pourcentage = this.noteService.calculerPourcentage(note);
    return this.noteService.getAppreciation(pourcentage);
  }

  marquerNotificationCommeLue(id: number): void {
    this.educationService.marquerNotificationCommeLue(id).subscribe(() => {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.lu = true;
      }
    });
  }

  // Nouvelles méthodes pour la gestion des notes
  getNotesByType(type: string): Note[] {
    return this.notes.filter(n => n.type === type);
  }

  getProgressionMatiere(matiereNom: string): number {
    return this.progressionParMatiere.get(matiereNom) || 0;
  }

  getNombreNotesByType(type: string): number {
    return this.notesParType.get(type) || 0;
  }

  getMatiereNom(matiereId?: number): string {
    if (!matiereId) return 'Matière inconnue';
    const matiere = this.matieres.find(m => m.id === matiereId);
    return matiere ? matiere.nom : 'Matière inconnue';
  }

  // Méthodes helper pour créer des objets Note temporaires
  createTempNote(valeur: number, noteMaximale: number = 20): Note {
    return {
      eleveId: 0,
      valeur: valeur,
      noteMaximale: noteMaximale,
      date: new Date().toISOString().split('T')[0],
      type: 'DEVOIR'
    };
  }

  logout(): void {
    // Supprimer directement les données utilisateur
    localStorage.removeItem('user');
    console.log('👋 Utilisateur déconnecté');
    this.router.navigate(['/login']);
  }

  allerVersProfil(): void {
    console.log('🚀 Navigation vers la page profil...');
    this.router.navigate(['/profile']);
  }
} 