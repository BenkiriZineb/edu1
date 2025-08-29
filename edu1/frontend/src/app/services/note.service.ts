import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Note {
  id?: number;
  eleveId: number;
  coursId?: number;
  matiereId?: number;
  valeur: number;
  noteMaximale: number;
  commentaire?: string;
  date: string;
  type: 'DEVOIR' | 'EXAMEN' | 'QUIZ' | 'CONTROLE' | 'PARTICIPATION' | 'AUTRE';
}

export interface NoteStats {
  moyenne: number;
  noteMaximale: number;
  noteMinimale: number;
  totalNotes: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = `${environment.apiUrl}/api/notes`;

  constructor(private http: HttpClient) { }

  // === OPÉRATIONS CRUD DE BASE ===

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  updateNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // === OPÉRATIONS MÉTIER POUR LES ÉLÈVES ===

  getNotesByEleve(eleveId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}`);
  }

  getNotesByEleveAndMatiere(eleveId: number, matiereId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}/matiere/${matiereId}`);
  }

  getNotesByEleveAndCours(eleveId: number, coursId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}/cours/${coursId}`);
  }

  getNotesByEleveAndType(eleveId: number, type: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}/type/${type}`);
  }

  // === OPÉRATIONS MÉTIER POUR LES COURS ===

  getNotesByCours(coursId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/cours/${coursId}`);
  }

  getNotesByMatiere(matiereId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/matiere/${matiereId}`);
  }

  // === CALCULS DE MOYENNES ===

  getMoyenneEleve(eleveId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/eleve/${eleveId}/moyenne`);
  }

  getMoyenneEleveMatiere(eleveId: number, matiereId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/eleve/${eleveId}/matiere/${matiereId}/moyenne`);
  }

  getMoyenneCours(coursId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/cours/${coursId}/moyenne`);
  }

  getMoyenneMatiere(matiereId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/matiere/${matiereId}/moyenne`);
  }

  // === STATISTIQUES ===

  getStatsEleve(eleveId: number): Observable<NoteStats> {
    return this.http.get<NoteStats>(`${this.apiUrl}/eleve/${eleveId}/stats`);
  }

  getStatsEleveMatiere(eleveId: number, matiereId: number): Observable<NoteStats> {
    return this.http.get<NoteStats>(`${this.apiUrl}/eleve/${eleveId}/matiere/${matiereId}/stats`);
  }

  // === RECHERCHE PAR PÉRIODE ===

  getNotesByEleveAndDateRange(eleveId: number, dateDebut: string, dateFin: string): Observable<Note[]> {
    const params = { dateDebut, dateFin };
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}/periode`, { params });
  }

  // === VALIDATION ===

  validateNote(valeur: number, noteMaximale: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/validation`, { valeur, noteMaximale });
  }

  // === MÉTHODES UTILITAIRES ===

  calculerPourcentage(note: Note): number {
    if (note.valeur && note.noteMaximale && note.noteMaximale > 0) {
      return Math.round((note.valeur / note.noteMaximale) * 100 * 100) / 100;
    }
    return 0;
  }

  getCouleurNote(pourcentage: number): string {
    if (pourcentage >= 80) return '#4CAF50'; // Vert - Excellent
    if (pourcentage >= 60) return '#8BC34A'; // Vert clair - Bon
    if (pourcentage >= 40) return '#FF9800'; // Orange - Moyen
    if (pourcentage >= 20) return '#FF5722'; // Rouge foncé - Faible
    return '#F44336'; // Rouge - Très faible
  }

  getAppreciation(pourcentage: number): string {
    if (pourcentage >= 80) return 'Excellent';
    if (pourcentage >= 60) return 'Bon';
    if (pourcentage >= 40) return 'Moyen';
    if (pourcentage >= 20) return 'Faible';
    return 'Très faible';
  }

  // === MÉTHODES POUR LE DASHBOARD ÉLÈVE ===

  getNotesRecentes(eleveId: number, limit: number = 5): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}`);
  }

  getProgressionMatiere(eleveId: number, matiereId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}/matiere/${matiereId}`);
  }

  getHistoriqueNotes(eleveId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}`);
  }
}
