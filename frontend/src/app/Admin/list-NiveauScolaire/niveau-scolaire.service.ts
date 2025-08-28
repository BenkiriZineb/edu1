// niveau-scolaire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NiveauScolaire {
  id?: number;
  niveau_etude: string;
  anneeScolaire: string;
  classe: string;
  filiere: string;
}

@Injectable({
  providedIn: 'root'
})
export class NiveauScolaireService {
  private apiUrl = 'http://localhost:8080/api/niveaux';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Récupérer tous les niveaux
  getAll(): Observable<NiveauScolaire[]> {
    return this.http.get<NiveauScolaire[]>(this.apiUrl);
  }

  // Ajouter un niveau
  create(niveau: NiveauScolaire): Observable<NiveauScolaire> {
    return this.http.post<NiveauScolaire>(this.apiUrl, niveau, this.httpOptions);
  }

  // Supprimer un niveau par son ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Mettre à jour un niveau
  update(niveau: NiveauScolaire): Observable<NiveauScolaire> {
    return this.http.put<NiveauScolaire>(`${this.apiUrl}/${niveau.id}`, niveau, this.httpOptions);
  }
}
