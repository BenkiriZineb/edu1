import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Matiere {
  id?: number;
  nom: string;
  coeficient: number;
  niveauScolaire: { id: number }; 
}

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
 
  private apiUrl = 'http://localhost:8080/api/matieres';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Récupérer les matières par niveau

getByNiveauId(niveauId: number): Observable<Matiere[]> {
  return this.http.get<Matiere[]>(`${this.apiUrl}/niveau/${niveauId}`);
}

  // Ajouter une matière
  create(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiUrl, matiere, this.httpOptions);
  }

  // Modifier une matière
  update(matiere: Matiere): Observable<Matiere> {
    if (!matiere.id) throw new Error('ID manquant pour modification');
    return this.http.put<Matiere>(`${this.apiUrl}/${matiere.id}`, matiere, this.httpOptions);
  }

  // Supprimer une matière
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
