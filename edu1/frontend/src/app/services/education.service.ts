import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Matiere, Cours, Note, Quiz, Message, Notification } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  
  // Données simulées
  private matieres: Matiere[] = [
    {
      id: 1,
      nom: 'Mathématiques',
      niveau: '6ème',
      description: 'Algèbre et géométrie',
      enseignant: 'M. Martin',
      couleur: '#FF6B6B'
    },
    {
      id: 2,
      nom: 'Français',
      niveau: '6ème',
      description: 'Grammaire et littérature',
      enseignant: 'Mme Dubois',
      couleur: '#4ECDC4'
    },
    {
      id: 3,
      nom: 'Histoire-Géographie',
      niveau: '6ème',
      description: 'Histoire et géographie',
      enseignant: 'M. Bernard',
      couleur: '#45B7D1'
    },
    {
      id: 4,
      nom: 'Sciences',
      niveau: '6ème',
      description: 'Physique et chimie',
      enseignant: 'Mme Leroy',
      couleur: '#96CEB4'
    }
  ];

  private cours: Cours[] = [
    {
      id: 1,
      titre: 'Introduction aux fractions',
      matiere: 'Mathématiques',
      niveau: '6ème',
      description: 'Apprentissage des fractions de base',
      dateCreation: new Date('2024-01-15'),
      contenu: 'Contenu du cours sur les fractions...',
      documents: ['fractions.pdf', 'exercices.pdf']
    },
    {
      id: 2,
      titre: 'La conjugaison du présent',
      matiere: 'Français',
      niveau: '6ème',
      description: 'Règles de conjugaison au présent',
      dateCreation: new Date('2024-01-10'),
      contenu: 'Contenu du cours sur la conjugaison...',
      documents: ['conjugaison.pdf']
    }
  ];

  private notes: Note[] = [
    {
      id: 1,
      eleveId: 1,
      matiereId: 1,
      valeur: 15,
      noteMaximale: 20,
      date: '2024-01-20',
      commentaire: 'Très bon travail !',
      type: 'DEVOIR'
    },
    {
      id: 2,
      eleveId: 1,
      matiereId: 2,
      valeur: 12,
      noteMaximale: 20,
      date: '2024-01-18',
      commentaire: 'Peut mieux faire',
      type: 'DEVOIR'
    }
  ];

  private quiz: Quiz[] = [
    {
      id: 1,
      titre: 'Quiz sur les fractions',
      matiere: 'Mathématiques',
      questions: [
        {
          id: 1,
          question: 'Qu\'est-ce qu\'une fraction ?',
          type: 'choix_multiple',
          reponses: ['Un nombre entier', 'Une partie d\'un tout', 'Un nombre décimal', 'Un nombre négatif'],
          bonneReponse: 1
        }
      ],
      dateCreation: new Date('2024-01-15'),
      duree: 30
    }
  ];

  private messages: Message[] = [
    {
      id: 1,
      expediteur: 'M. Martin',
      destinataire: 'Marie Dupont',
      sujet: 'Devoir de mathématiques',
      contenu: 'Votre devoir a été corrigé. Vous pouvez le récupérer.',
      date: new Date('2024-01-20'),
      lu: false
    }
  ];

  private notifications: Notification[] = [
    {
      id: 1,
      titre: 'Nouveau cours disponible',
      message: 'Un nouveau cours de mathématiques est disponible',
      type: 'info',
      date: new Date('2024-01-21'),
      lu: false
    },
    {
      id: 2,
      titre: 'Note ajoutée',
      message: 'Une nouvelle note a été ajoutée en français',
      type: 'success',
      date: new Date('2024-01-20'),
      lu: false
    }
  ];

  // Méthodes pour récupérer les données
  getMatieres(niveau?: string): Observable<Matiere[]> {
    if (niveau) {
      return of(this.matieres.filter(m => m.niveau === niveau));
    }
    return of(this.matieres);
  }

  getCours(matiere?: string): Observable<Cours[]> {
    if (matiere) {
      return of(this.cours.filter(c => c.matiere === matiere));
    }
    return of(this.cours);
  }

  getNotes(eleveId: number): Observable<Note[]> {
    return of(this.notes.filter(n => n.eleveId === eleveId));
  }

  getQuiz(matiere?: string): Observable<Quiz[]> {
    if (matiere) {
      return of(this.quiz.filter(q => q.matiere === matiere));
    }
    return of(this.quiz);
  }

  getMessages(destinataire: string): Observable<Message[]> {
    return of(this.messages.filter(m => m.destinataire === destinataire));
  }

  getNotifications(): Observable<Notification[]> {
    return of(this.notifications);
  }

  // Méthodes pour ajouter/modifier des données
  ajouterCours(cours: Cours): Observable<Cours> {
    cours.id = this.cours.length + 1;
    this.cours.push(cours);
    return of(cours);
  }

  ajouterNote(note: Note): Observable<Note> {
    note.id = this.notes.length + 1;
    this.notes.push(note);
    return of(note);
  }

  ajouterQuiz(quiz: Quiz): Observable<Quiz> {
    quiz.id = this.quiz.length + 1;
    this.quiz.push(quiz);
    return of(quiz);
  }

  marquerNotificationCommeLue(id: number): Observable<void> {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.lu = true;
    }
    return of(void 0);
  }
} 