import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProfileEleveDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  datedenaissance: string;
  sexe: string;
  adresse: string;
  role: string;
  actif: boolean;
  coursNom?: string;
  niveauScolaire?: string;
  parentNom?: string;
  matieres?: string;
  telephone?: string;
  photo?: string;
  bio?: string;
}

export interface Eleve {
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  adresse: string;
  role: string;
  sexe?: string;
  datedenaissance?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EleveProfileService {
  private baseUrl = 'http://localhost:8080/api/eleve';

  constructor(private http: HttpClient) { }

  /**
   * Récupère le profil d'un élève par son ID
   */
  getProfileById(id: number): Observable<ProfileEleveDTO> {
    return this.http.get<ProfileEleveDTO>(`${this.baseUrl}/profile/${id}`);
  }

  /**
   * Récupère le profil d'un élève par son email
   */
  getProfileByEmail(email: string): Observable<ProfileEleveDTO> {
    return this.http.get<ProfileEleveDTO>(`${this.baseUrl}/profile/email/${email}`);
  }

  /**
   * Met à jour le profil d'un élève
   */
  updateProfile(id: number, profileData: Partial<ProfileEleveDTO>): Observable<ProfileEleveDTO> {
    return this.http.put<ProfileEleveDTO>(`${this.baseUrl}/profile/${id}`, profileData);
  }

  /**
   * Inscrit un nouvel élève
   */
  inscrireEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(`${this.baseUrl}/inscription`, eleve);
  }
}
