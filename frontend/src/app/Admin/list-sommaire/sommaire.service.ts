// sommaire.service.ts - Interface corrigée
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interface corrigée pour matcher le backend
export interface Sommaire {
  id?: number;          // Optional car absent lors de la création
  titre: string;        // Requis
  // Removed 'description' car pas dans le backend Java
  // Removed 'coursId' car le backend renvoie l'objet cours complet
  cours?: {            // Optional car peut être null
    id: number;
    nom?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SommaireService {
  getSommaireById(sommaireId: number) {
      throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/sommaires';

  constructor(private http: HttpClient) {}

  getSommairesByCours(coursId: number): Observable<Sommaire[]> {
    return this.http.get<Sommaire[]>(`${this.apiUrl}/cours/${coursId}`);
  }

  createSommaire(coursId: number, sommaire: Partial<Sommaire>): Observable<Sommaire> {
    // Envoyer seulement le titre pour matcher le backend
    const payload = {
      titre: sommaire.titre
    };
    return this.http.post<Sommaire>(`${this.apiUrl}/add/${coursId}`, payload);
  }

  updateSommaire(id: number, sommaire: Partial<Sommaire>): Observable<Sommaire> {
    const payload = {
      titre: sommaire.titre
    };
    return this.http.put<Sommaire>(`${this.apiUrl}/${id}`, payload);
  }

  deleteSommaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}