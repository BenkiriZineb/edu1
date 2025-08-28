import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cours {
  id?: number;
  nom: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8080/api/cours';

  constructor(private http: HttpClient) {}

  getCoursByMatiere(matiereId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/matiere/${matiereId}`);
  }

  addCours(matiereId: number, cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.apiUrl}/add/${matiereId}`, cours);
  }
  updateCours(cours: Cours): Observable<Cours> {
  return this.http.put<Cours>(`${this.apiUrl}/${cours.id}`, cours);
}

deleteCours(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

  getCoursById(id: number): Observable<Cours> {
  return this.http.get<Cours>(`${this.apiUrl}/${id}`);
}
}
